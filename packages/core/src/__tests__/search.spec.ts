import { afterEach, describe, expect, it, vi } from 'vitest'

import { debounce, searchIcons } from '../search'

describe('searchIcons', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('returns an empty array for a blank query without calling fetch', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    expect(await searchIcons('   ')).toEqual([])
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('parses "prefix:name" results into IconResult objects', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ icons: ['tabler:home', 'carbon:home'] }),
    } as Response)
    vi.stubGlobal('fetch', fetchMock)

    const results = await searchIcons('home')

    expect(results).toEqual([
      { name: 'tabler:home', prefix: 'tabler', icon: 'home' },
      { name: 'carbon:home', prefix: 'carbon', icon: 'home' },
    ])
  })

  it('restricts results to the given prefixes via the query string', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ icons: [] }),
    } as Response)
    vi.stubGlobal('fetch', fetchMock)

    await searchIcons('home', { prefixes: ['tabler', 'carbon'] })

    const calledUrl = fetchMock.mock.calls[0][0] as string
    expect(calledUrl).toContain('prefixes=tabler%2Ccarbon')
  })

  it('returns an empty array and logs instead of throwing on a network error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network down'))
    )
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(await searchIcons('home')).toEqual([])
    expect(errorSpy).toHaveBeenCalled()

    errorSpy.mockRestore()
  })
})

describe('debounce', () => {
  it('only calls fn once for a burst of calls, with the latest arguments', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced('a')
    debounced('b')
    debounced('c')

    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('c')
  })
})
