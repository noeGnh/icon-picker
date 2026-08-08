import { DEFAULT_BROWSABLE_PREFIXES, DEFAULT_ICONIFY_API_BASE } from './constants'
import type { IconResult } from './types'

export interface BrowseCollectionOptions {
  /** Caps the number of icons returned. Unset by default - the whole collection is returned (virtualized rendering handles large lists fine, and this matches browsing a full library like before the Iconify migration). */
  limit?: number
  /** Override the Iconify API base URL, e.g. to point at a self-hosted instance. */
  apiBase?: string
}

interface CollectionResponse {
  uncategorized?: string[]
  categories?: Record<string, string[]>
}

/**
 * Lists icons from a single Iconify collection, for showing a default set of
 * icons before the user has typed a search query. The Iconify API doesn't
 * support a `limit` on this endpoint (it always returns the full collection) -
 * this slices client-side instead, only when a `limit` is explicitly given.
 */
export async function browseCollection(
  prefix: string,
  options: BrowseCollectionOptions = {}
): Promise<IconResult[]> {
  const { limit, apiBase = DEFAULT_ICONIFY_API_BASE } = options

  try {
    const response = await fetch(`${apiBase}/collection?prefix=${encodeURIComponent(prefix)}`)
    const data: CollectionResponse = await response.json()

    const names = [
      ...(data.uncategorized ?? []),
      ...Object.values(data.categories ?? {}).flat(),
    ]

    const sliced = typeof limit === 'number' ? names.slice(0, limit) : names

    return sliced.map((icon) => ({ name: `${prefix}:${icon}`, prefix, icon }))
  } catch (error) {
    console.error(`Failed to browse collection ${prefix}`, error)
    return []
  }
}

/**
 * Lists icons from several collections at once (the Iconify API only takes
 * one prefix per request). When `limit` is given, it's split evenly between
 * prefixes so the combined total stays predictable.
 */
export async function browseCollections(
  prefixes: string[],
  options: BrowseCollectionOptions = {}
): Promise<IconResult[]> {
  if (!prefixes.length) return []

  const perPrefixLimit =
    typeof options.limit === 'number'
      ? Math.max(1, Math.floor(options.limit / prefixes.length))
      : undefined

  const results = await Promise.all(
    prefixes.map((prefix) => browseCollection(prefix, { ...options, limit: perPrefixLimit }))
  )

  return results.flat()
}

/** Picks a random prefix from a small curated pool of well-known collections. */
export function pickRandomPrefix(prefixes: string[] = DEFAULT_BROWSABLE_PREFIXES): string {
  return prefixes[Math.floor(Math.random() * prefixes.length)]!
}
