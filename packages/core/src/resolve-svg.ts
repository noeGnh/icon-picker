import { getSanitizedSvgFromCache, setSanitizedSvgInCache } from './sanitize-cache'

export interface IconifyBuildResult {
  attributes: { viewBox: string }
  body: string
}

export interface IconifyLoaders<IconData> {
  loadIcon: (name: string) => Promise<IconData>
  buildIcon: (icon: IconData) => IconifyBuildResult
}

/**
 * Resolves an Iconify icon name to a portable, sanitized <svg> string,
 * caching the result. Used for valueType: 'svg', where the picker needs to
 * store a self-contained value instead of an Iconify identifier.
 *
 * `loadIcon`/`buildIcon` are injected from @iconify/vue or @iconify/react so
 * this stays framework-agnostic.
 */
export async function resolveIconSvgValue<IconData>(
  name: string,
  { loadIcon, buildIcon }: IconifyLoaders<IconData>
): Promise<string | undefined> {
  const cached = getSanitizedSvgFromCache(name)
  if (cached) return cached

  try {
    const iconData = await loadIcon(name)
    const built = buildIcon(iconData)
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${built.attributes.viewBox}">${built.body}</svg>`
    return setSanitizedSvgInCache(name, svg)
  } catch (error) {
    console.error(`Failed to load icon ${name}`, error)
    return undefined
  }
}
