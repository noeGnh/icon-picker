import { DEFAULT_BROWSABLE_PREFIXES, DEFAULT_ICONIFY_API_BASE } from './constants'
import type { IconResult } from './types'

export interface BrowseCollectionOptions {
  limit?: number
  /** Override the Iconify API base URL, e.g. to point at a self-hosted instance. */
  apiBase?: string
}

const DEFAULT_BROWSE_LIMIT = 60

interface CollectionResponse {
  uncategorized?: string[]
  categories?: Record<string, string[]>
}

/**
 * Lists icons from a single Iconify collection, for showing a default set of
 * icons before the user has typed a search query. The Iconify API doesn't
 * support a `limit` on this endpoint (it always returns the full collection,
 * which can be thousands of icons) - this slices client-side instead.
 */
export async function browseCollection(
  prefix: string,
  options: BrowseCollectionOptions = {}
): Promise<IconResult[]> {
  const { limit = DEFAULT_BROWSE_LIMIT, apiBase = DEFAULT_ICONIFY_API_BASE } = options

  try {
    const response = await fetch(`${apiBase}/collection?prefix=${encodeURIComponent(prefix)}`)
    const data: CollectionResponse = await response.json()

    const names = [
      ...(data.uncategorized ?? []),
      ...Object.values(data.categories ?? {}).flat(),
    ]

    return names.slice(0, limit).map((icon) => ({ name: `${prefix}:${icon}`, prefix, icon }))
  } catch (error) {
    console.error(`Failed to browse collection ${prefix}`, error)
    return []
  }
}

/**
 * Lists icons from several collections at once (the Iconify API only takes
 * one prefix per request), splitting `limit` evenly between them so the
 * combined total stays predictable regardless of how many prefixes are given.
 */
export async function browseCollections(
  prefixes: string[],
  options: BrowseCollectionOptions = {}
): Promise<IconResult[]> {
  if (!prefixes.length) return []

  const totalLimit = options.limit ?? DEFAULT_BROWSE_LIMIT
  const perPrefixLimit = Math.max(1, Math.floor(totalLimit / prefixes.length))

  const results = await Promise.all(
    prefixes.map((prefix) => browseCollection(prefix, { ...options, limit: perPrefixLimit }))
  )

  return results.flat()
}

/** Picks a random prefix from a small curated pool of well-known collections. */
export function pickRandomPrefix(prefixes: string[] = DEFAULT_BROWSABLE_PREFIXES): string {
  return prefixes[Math.floor(Math.random() * prefixes.length)]!
}
