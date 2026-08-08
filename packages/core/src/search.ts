import { DEFAULT_ICONIFY_API_BASE } from './constants'
import type { IconResult } from './types'

export interface SearchIconsOptions {
  /** Restrict results to these Iconify collection prefixes, e.g. ['tabler', 'carbon']. */
  prefixes?: string[]
  limit?: number
  /** Override the Iconify API base URL, e.g. to point at a self-hosted instance. */
  apiBase?: string
}

const DEFAULT_LIMIT = 64

/**
 * Searches icons across the Iconify API (or a self-hosted instance via `apiBase`).
 * Returns an empty array for a blank query without hitting the network.
 */
export async function searchIcons(
  query: string,
  options: SearchIconsOptions = {}
): Promise<IconResult[]> {
  const trimmed = query.trim()
  if (!trimmed) return []

  const { prefixes, limit = DEFAULT_LIMIT, apiBase = DEFAULT_ICONIFY_API_BASE } = options

  const params = new URLSearchParams({ query: trimmed, limit: String(limit) })
  if (prefixes && prefixes.length) {
    params.set('prefixes', prefixes.join(','))
  }

  try {
    const response = await fetch(`${apiBase}/search?${params.toString()}`)
    const data: { icons?: string[] } = await response.json()

    return (data.icons ?? []).flatMap((name): IconResult[] => {
      const [prefix, icon] = name.split(':')
      if (!prefix || !icon) return []
      return [{ name, prefix, icon }]
    })
  } catch (error) {
    console.error('Failed to search icons', error)
    return []
  }
}

/** Delays calling `fn` until `delay` ms have passed since the last call. */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return (...args: Args) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
