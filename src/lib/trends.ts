import type { TrendItem } from '../types'

export function slugifyTrendName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function findTrendBySlug(trends: TrendItem[], slug: string): TrendItem | undefined {
  return trends.find((trend) => slugifyTrendName(trend.title) === slug)
}
