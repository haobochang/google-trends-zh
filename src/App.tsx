import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'

import './App.css'
import { trendsData } from './data/trendsData'
import { findTrendBySlug, slugifyTrendName } from './lib/trends'
import type { TrendItem } from './types'

function HomePage({ trends }: { trends: TrendItem[] }) {
  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">Google Trends · 美国区 · 过去 24 小时</p>
        <h1>Google 热搜中文站</h1>
        <p className="subtitle">
          每天展示 Google 搜索热点，并提供中文翻译、简要解释和可点击详情页。
        </p>
      </header>

      <section className="trend-grid" aria-label="今日热搜榜单">
        {trends.map((trend) => (
          <article className="trend-card" key={trend.rank}>
            <div className="trend-meta">
              <span className="rank">#{trend.rank}</span>
              <span>{trend.traffic}</span>
              <span>{trend.started}</span>
            </div>
            <h2>{trend.titleZh}</h2>
            <p className="trend-title-en">{trend.title}</p>
            <p className="trend-summary">{trend.summary}</p>
            <Link className="detail-link" to={`/trend/${slugifyTrendName(trend.title)}`}>
              查看详情
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}

function TrendDetailPage({ trends }: { trends: TrendItem[] }) {
  const { slug = '' } = useParams()
  const trend = findTrendBySlug(trends, slug)

  if (!trend) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="page detail-page">
      <Link className="back-link" to="/">
        返回今日榜单
      </Link>

      <article className="detail-card">
        <div className="trend-meta">
          <span className="rank">#{trend.rank}</span>
          <span>{trend.traffic}</span>
          <span>{trend.started}</span>
        </div>
        <p className="eyebrow">{trend.titleZh}</p>
        <h1>{trend.titleZh === 'Allbirds' ? 'Allbirds' : trend.titleZh}</h1>
        <p className="trend-title-en">{trend.title}</p>
        <p className="detail-summary">{trend.summary}</p>

        <section>
          <h2>为什么会上热搜？</h2>
          <p className="detail-body">{trend.explanation}</p>
        </section>

        {trend.relatedQueries.length > 0 && (
          <section>
            <h2>相关搜索</h2>
            <ul className="tag-list">
              {trend.relatedQueries.map((query) => (
                <li key={query}>{query}</li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2>参考来源</h2>
          <ul className="source-list">
            {trend.sourceLinks.map((source) => (
              <li key={source.url}>
                <a href={source.url} rel="noreferrer" target="_blank">
                  {source.source} · {source.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  )
}

function App({ trends = trendsData }: { trends?: TrendItem[] }) {
  return (
    <Routes>
      <Route element={<HomePage trends={trends} />} path="/" />
      <Route element={<TrendDetailPage trends={trends} />} path="/trend/:slug" />
    </Routes>
  )
}

export default App
