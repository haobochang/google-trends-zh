import { describe, expect, it } from 'vitest'

import { findTrendBySlug, slugifyTrendName } from './trends'
import { sampleTrends } from '../data/sampleTrends'

describe('slugifyTrendName', () => {
  it('converts trend names into stable slugs', () => {
    expect(slugifyTrendName('Bayern - Real Madrid')).toBe('bayern-real-madrid')
  })
})

describe('findTrendBySlug', () => {
  it('finds a trend using its slug', () => {
    expect(findTrendBySlug(sampleTrends, 'allbirds')?.title).toBe('allbirds')
  })

  it('returns undefined for unknown slugs', () => {
    expect(findTrendBySlug(sampleTrends, 'missing-item')).toBeUndefined()
  })
})
