#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import textwrap
from pathlib import Path
from typing import Any

import feedparser
from deep_translator import GoogleTranslator

RSS_URL = 'https://trends.google.com/trending/rss?geo=US'
OUTPUT = Path(__file__).resolve().parents[1] / 'src' / 'data' / 'trendsData.ts'
MAX_ITEMS = 10

MANUAL_TRANSLATIONS = {
    'allbirds': 'Allbirds',
    'bayern - real madrid': '拜仁慕尼黑 vs 皇家马德里',
    'magic vs 76ers': '魔术 vs 76人',
    'arsenal vs sporting': '阿森纳 vs 葡萄牙体育',
    'la galaxy - toluca': '洛杉矶银河 vs 托卢卡',
    'la galaxy vs toluca': '洛杉矶银河 vs 托卢卡',
    'radio personality': '电台主持人 / 广播名嘴',
    'deni avdija': '丹尼·阿夫迪亚',
    'carnival tequila lawsuit verdict': '嘉年华邮轮“龙舌兰诉讼”判决',
}

translator = GoogleTranslator(source='auto', target='zh-CN')


def translate_text(text: str) -> str:
    text = (text or '').strip()
    if not text:
        return ''
    lowered = text.lower()
    if lowered in MANUAL_TRANSLATIONS:
        return MANUAL_TRANSLATIONS[lowered]
    try:
        return translator.translate(text)
    except Exception:
        return text


def clean_text(text: str) -> str:
    return re.sub(r'\s+', ' ', (text or '')).strip()


def pick_news_items(entry: Any) -> list[dict[str, str]]:
    title = clean_text(entry.get('ht_news_item_title', ''))
    url = clean_text(entry.get('ht_news_item_url', ''))
    source = clean_text(entry.get('ht_news_item_source', ''))
    if not title or not url:
        return []

    return [
        {
            'title': title,
            'url': url,
            'source': source or 'Unknown source',
            'titleZh': translate_text(title),
        }
    ]


def make_summary(title_zh: str, news_items: list[dict[str, str]]) -> str:
    if news_items:
        return f"相关新闻主要集中在：{news_items[0]['titleZh']}。"
    return f"{title_zh} 在 Google Trends 上出现明显搜索热度上升。"


def make_explanation(title_zh: str, news_items: list[dict[str, str]]) -> str:
    if not news_items:
        return f"{title_zh} 当天在 Google 搜索中迅速升温，但当前可用新闻线索有限，建议结合后续报道继续观察。"

    headlines = '；'.join(item['titleZh'] for item in news_items[:2])
    sources = '、'.join(dict.fromkeys(item['source'] for item in news_items[:3]))
    return (
        f"Google Trends 显示“{title_zh}”在当天搜索量快速上升。"
        f"从相关新闻看，讨论主要围绕：{headlines}。"
        f"这些报道来自 {sources} 等媒体，因此带动了集中搜索。"
    )


def build_entry(rank: int, entry: Any) -> dict[str, Any]:
    title = clean_text(entry.get('title', ''))
    title_zh = translate_text(title)
    traffic = clean_text(entry.get('ht_approx_traffic', '')) or '—'
    started = clean_text(entry.get('published', '')) or clean_text(entry.get('pubDate', '')) or '—'
    news_items = pick_news_items(entry)

    return {
        'rank': rank,
        'title': title,
        'titleZh': title_zh,
        'traffic': traffic,
        'started': started,
        'summary': make_summary(title_zh, news_items),
        'explanation': make_explanation(title_zh, news_items),
        'relatedQueries': [],
        'sourceLinks': [
            {
                'title': item['title'],
                'url': item['url'],
                'source': item['source'],
            }
            for item in news_items
        ],
    }


def main() -> None:
    feed = feedparser.parse(RSS_URL)
    entries = feed.entries[:MAX_ITEMS]
    trends = [build_entry(index + 1, entry) for index, entry in enumerate(entries)]
    output = (
        "import type { TrendItem } from '../types'\n\n"
        + 'export const trendsData: TrendItem[] = '
        + json.dumps(trends, ensure_ascii=False, indent=2)
        + '\n'
    )
    OUTPUT.write_text(output, encoding='utf-8')
    print(f'Generated {len(trends)} trends -> {OUTPUT}')


if __name__ == '__main__':
    main()
