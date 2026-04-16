import type { TrendItem } from '../types'

export const sampleTrends: TrendItem[] = [
  {
    rank: 1,
    title: 'allbirds',
    titleZh: 'Allbirds',
    traffic: '200K+',
    started: '12 hours ago',
    summary: '美国鞋类品牌，因获得融资并传出向 AI 基础设施方向转型而引发关注。',
    explanation:
      'Allbirds 原本以环保鞋闻名，近期因融资和 AI 转型消息被大量讨论。“卖鞋公司做 AI”的反差感，是它冲上热搜的核心原因。',
    relatedQueries: ['allbirds stock', 'allbirds shoes ai'],
    sourceLinks: [
      {
        title: 'AP: Allbirds pivots toward AI infrastructure',
        url: 'https://example.com/allbirds',
        source: 'AP',
      },
    ],
  },
  {
    rank: 2,
    title: 'bayern - real madrid',
    titleZh: '拜仁慕尼黑 vs 皇家马德里',
    traffic: '1M+',
    started: '7 hours ago',
    summary: '欧冠豪门大战，比赛结果和晋级形势都很有讨论度。',
    explanation:
      '拜仁对皇马属于全球关注度极高的足球比赛，只要碰上欧冠淘汰赛，比赛过程、进球和晋级结果都会迅速带来搜索热度。',
    relatedQueries: ['bayern munich vs real madrid', 'bayern vs real madrid'],
    sourceLinks: [
      {
        title: 'BBC Sport match report',
        url: 'https://example.com/bayern-real-madrid',
        source: 'BBC Sport',
      },
    ],
  },
]
