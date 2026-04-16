export interface TrendSourceLink {
  title: string
  url: string
  source: string
}

export interface TrendItem {
  rank: number
  title: string
  titleZh: string
  traffic: string
  started: string
  summary: string
  explanation: string
  relatedQueries: string[]
  sourceLinks: TrendSourceLink[]
}
