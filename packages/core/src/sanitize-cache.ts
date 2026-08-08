import DOMPurify from 'dompurify'

const cache = new Map<string, string>()
const MAX_CACHE_SIZE = 500

/**
 * Cache for sanitized raw SVG passed directly as a picker/icon value
 * (valueType: 'svg'). Icons loaded by name go through @iconify/vue's or
 * @iconify/react's own cache instead - this one only exists for the raw-SVG
 * escape hatch.
 */
export function getSanitizedSvgFromCache(key: string): string | undefined {
  const value = cache.get(key)
  if (typeof value !== 'undefined') {
    // Refresh insertion order so this entry counts as most-recently-used.
    cache.delete(key)
    cache.set(key, value)
  }
  return value
}

export function setSanitizedSvgInCache(key: string, svg: string): string {
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldestKey = cache.keys().next().value
    if (oldestKey) cache.delete(oldestKey)
  }

  const sanitized = DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true } })
  cache.set(key, sanitized)
  return sanitized
}
