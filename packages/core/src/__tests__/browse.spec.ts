import { afterEach, describe, expect, it, vi } from 'vitest'

import { browseCollection, browseCollections, pickRandomPrefix } from '../browse'
import { DEFAULT_BROWSABLE_PREFIXES } from '../constants'

describe('browseCollection', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('flattens a flat (uncategorized) collection response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({ uncategorized: ['home', 'search'] }),
      } as Response)
    )

    const results = await browseCollection('tabler')

    expect(results).toEqual([
      { name: 'tabler:home', prefix: 'tabler', icon: 'home' },
      { name: 'tabler:search', prefix: 'tabler', icon: 'search' },
    ])
  })

  it('flattens a categorized collection response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({
          categories: { Actions: ['3d-rotation'], Alerts: ['warning'] },
        }),
      } as Response)
    )

    const results = await browseCollection('material-symbols')

    expect(results.map((r) => r.name)).toEqual([
      'material-symbols:3d-rotation',
      'material-symbols:warning',
    ])
  })

  it('slices client-side when a limit is given (the API ignores limit itself)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({ uncategorized: ['a', 'b', 'c', 'd', 'e'] }),
      } as Response)
    )

    const results = await browseCollection('tabler', { limit: 2 })

    expect(results).toHaveLength(2)
  })

  it('returns the full collection when no limit is given', async () => {
    const manyIcons = Array.from({ length: 500 }, (_, i) => `icon-${i}`)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ json: async () => ({ uncategorized: manyIcons }) } as Response)
    )

    const results = await browseCollection('tabler')

    expect(results).toHaveLength(500)
  })

  it('returns an empty array and logs instead of throwing on a network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(await browseCollection('tabler')).toEqual([])
    expect(errorSpy).toHaveBeenCalled()

    errorSpy.mockRestore()
  })
})

describe('browseCollections', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetches each prefix separately (the API has no multi-prefix support) and merges results', async () => {
    const fetchMock = vi.fn((url: string) => {
      const prefix = new URL(url).searchParams.get('prefix')
      return Promise.resolve({
        json: async () => ({ uncategorized: [`${prefix}-icon-1`, `${prefix}-icon-2`] }),
      } as Response)
    })
    vi.stubGlobal('fetch', fetchMock)

    const results = await browseCollections(['tabler', 'carbon'], { limit: 10 })

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(new Set(results.map((r) => r.prefix))).toEqual(new Set(['carbon', 'tabler']))
  })

  it('splits the total limit evenly across prefixes', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({
          uncategorized: Array.from({ length: 100 }, (_, i) => `icon-${i}`),
        }),
      } as Response)
    )

    const results = await browseCollections(['tabler', 'carbon', 'fa'], { limit: 30 })

    expect(results).toHaveLength(30)
  })

  it('returns the full collections when no limit is given', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        const prefix = new URL(url).searchParams.get('prefix')
        return Promise.resolve({
          json: async () => ({
            uncategorized: Array.from({ length: 100 }, (_, i) => `${prefix}-${i}`),
          }),
        } as Response)
      })
    )

    const results = await browseCollections(['tabler', 'carbon'])

    expect(results).toHaveLength(200)
  })

  it('returns an empty array for an empty prefix list without calling fetch', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    expect(await browseCollections([])).toEqual([])
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

describe('pickRandomPrefix', () => {
  it('picks from the default curated pool', () => {
    for (let i = 0; i < 20; i++) {
      expect(DEFAULT_BROWSABLE_PREFIXES).toContain(pickRandomPrefix())
    }
  })

  it('picks from a custom pool when given one', () => {
    expect(pickRandomPrefix(['only-option'])).toBe('only-option')
  })
})
