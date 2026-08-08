import DOMPurify from 'dompurify'

const cache = new Map<string, string>()
const MAX_CACHE_SIZE = 500

export function getIconFromCache(iconId: string): string | undefined {
  const value = cache.get(iconId)
  if (typeof value !== 'undefined') {
    // Refresh insertion order so this entry counts as most-recently-used.
    cache.delete(iconId)
    cache.set(iconId, value)
  }
  return value
}

export function setIconInCache(iconId: string, svg: string): void {
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldestKey = cache.keys().next().value
    if (oldestKey) cache.delete(oldestKey)
  }
  cache.set(iconId, DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true } }))
}
