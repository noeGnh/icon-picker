import { describe, expect, it } from 'vitest'

import { getIconFromCache, setIconInCache } from '../cache'

describe('cache', () => {
  it('returns undefined for an icon that was never cached', () => {
    expect(getIconFromCache('cache-test-unknown')).toBeUndefined()
  })

  it('stores and retrieves an icon by id', () => {
    setIconInCache('cache-test-basic', '<svg><circle r="5"/></svg>')
    expect(getIconFromCache('cache-test-basic')).toContain('circle')
  })

  it('sanitizes SVG content before storing it', () => {
    setIconInCache(
      'cache-test-xss',
      '<svg><script>window.__pwned = true</script><circle r="5"/></svg>'
    )

    const cached = getIconFromCache('cache-test-xss')
    expect(cached).not.toContain('<script')
    expect(cached).toContain('circle')
  })

  it('evicts the least recently used entry once the cache is full', () => {
    for (let i = 0; i < 500; i++) {
      setIconInCache(`lru-test-${i}`, `<svg data-i="${i}"/>`)
    }

    // Touch the very first entry so it counts as most-recently-used.
    getIconFromCache('lru-test-0')

    // Push the cache one entry past its capacity.
    setIconInCache('lru-test-500', '<svg data-i="500"/>')

    expect(getIconFromCache('lru-test-0')).toBeDefined()
    expect(getIconFromCache('lru-test-1')).toBeUndefined()
    expect(getIconFromCache('lru-test-500')).toBeDefined()
  })
})
