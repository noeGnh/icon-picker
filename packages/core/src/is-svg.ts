/**
 * Checks if the given string is a well-formed SVG document.
 *
 * This only validates that the string parses as XML with an <svg> root - it
 * says nothing about safety. Sanitize before rendering (see sanitize-cache.ts).
 */
export function isSVG(input: string): boolean {
  const svgRegex = /^\s*<svg\b[^>]*>[\s\S]*<\/svg>\s*$/i

  try {
    if (!svgRegex.test(input)) return false

    const parser = new DOMParser()
    const doc = parser.parseFromString(input, 'image/svg+xml')

    if (doc.getElementsByTagName('parsererror').length > 0) return false

    const svgElements = doc.getElementsByTagName('svg')
    return svgElements.length > 0 && svgElements[0]?.parentNode === doc
  } catch {
    return false
  }
}
