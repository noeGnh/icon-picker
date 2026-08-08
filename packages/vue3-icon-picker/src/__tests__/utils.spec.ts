import { describe, expect, it } from 'vitest'

import { isSVG, isURL } from '../utils'

describe('isSVG', () => {
  it('accepts a well-formed svg document', () => {
    expect(isSVG('<svg viewBox="0 0 24 24"><circle r="5"/></svg>')).toBe(true)
  })

  it('accepts svg content with surrounding whitespace', () => {
    expect(isSVG('  <svg><circle r="5"/></svg>  \n')).toBe(true)
  })

  it('rejects a plain string', () => {
    expect(isSVG('not an svg')).toBe(false)
  })

  it('rejects an empty string', () => {
    expect(isSVG('')).toBe(false)
  })

  it('rejects malformed xml', () => {
    expect(isSVG('<svg><circle r="5"></svg>')).toBe(false)
  })

  it('rejects trailing content after the closing tag', () => {
    expect(isSVG('<svg><circle r="5"/></svg>extra')).toBe(false)
  })
})

describe('isURL', () => {
  it('accepts an absolute http(s) url', () => {
    expect(isURL('https://example.com/icon.svg')).toBe(true)
  })

  it('accepts a protocol-relative url', () => {
    expect(isURL('//example.com/icon.svg')).toBe(true)
  })

  it('accepts a localhost url', () => {
    expect(isURL('//localhost:3000/icon.svg')).toBe(true)
  })

  it('rejects a plain icon name', () => {
    expect(isURL('home-outline')).toBe(false)
  })

  it('rejects a non-string value', () => {
    // @ts-expect-error deliberately passing a non-string value
    expect(isURL(42)).toBe(false)
  })
})
