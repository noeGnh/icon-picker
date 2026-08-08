import { describe, expect, it } from 'vitest'

import { getSanitizedSvgFromCache, setSanitizedSvgInCache } from '../sanitize-cache'

describe('sanitize-cache', () => {
  it('returns undefined for a key that was never cached', () => {
    expect(getSanitizedSvgFromCache('cache-test-unknown')).toBeUndefined()
  })

  it('stores and retrieves an entry by key', () => {
    setSanitizedSvgInCache('cache-test-basic', '<svg><circle r="5"/></svg>')
    expect(getSanitizedSvgFromCache('cache-test-basic')).toContain('circle')
  })

  it('sanitizes SVG content before storing it, and returns the sanitized value', () => {
    const sanitized = setSanitizedSvgInCache(
      'cache-test-xss',
      '<svg><script>window.__pwned = true</script><circle r="5"/></svg>'
    )

    expect(sanitized).not.toContain('<script')
    expect(sanitized).toContain('circle')
    expect(getSanitizedSvgFromCache('cache-test-xss')).not.toContain('<script')
  })

  it('evicts the least recently used entry once the cache is full', () => {
    for (let i = 0; i < 500; i++) {
      setSanitizedSvgInCache(`lru-test-${i}`, `<svg data-i="${i}"/>`)
    }

    // Touch the very first entry so it counts as most-recently-used.
    getSanitizedSvgFromCache('lru-test-0')

    // Push the cache one entry past its capacity.
    setSanitizedSvgInCache('lru-test-500', '<svg data-i="500"/>')

    expect(getSanitizedSvgFromCache('lru-test-0')).toBeDefined()
    expect(getSanitizedSvgFromCache('lru-test-1')).toBeUndefined()
    expect(getSanitizedSvgFromCache('lru-test-500')).toBeDefined()
  })
})
