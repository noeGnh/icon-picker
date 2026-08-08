import { describe, expect, it, vi } from 'vitest'

import { resolveIconSvgValue } from '../resolve-svg'

describe('resolveIconSvgValue', () => {
  it('builds, sanitizes and caches an svg string from the injected loaders', async () => {
    const loadIcon = vi.fn().mockResolvedValue({ body: '<path d="M0 0"/>' })
    const buildIcon = vi.fn().mockReturnValue({
      attributes: { viewBox: '0 0 24 24' },
      body: '<path d="M0 0"/><script>window.__pwned = true</script>',
    })

    const svg = await resolveIconSvgValue('tabler:resolve-svg-test', { loadIcon, buildIcon })

    expect(svg).toContain('viewBox="0 0 24 24"')
    expect(svg).toContain('path')
    expect(svg).not.toContain('<script')
    expect(loadIcon).toHaveBeenCalledWith('tabler:resolve-svg-test')
  })

  it('returns undefined and logs instead of throwing when loading fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const loadIcon = vi.fn().mockRejectedValue(new Error('not found'))
    const buildIcon = vi.fn()

    const svg = await resolveIconSvgValue('tabler:missing', { loadIcon, buildIcon })

    expect(svg).toBeUndefined()
    expect(errorSpy).toHaveBeenCalled()
    errorSpy.mockRestore()
  })

  it('returns the cached value on a second call without loading again', async () => {
    const loadIcon = vi.fn().mockResolvedValue({ body: '<path d="M1 1"/>' })
    const buildIcon = vi
      .fn()
      .mockReturnValue({ attributes: { viewBox: '0 0 24 24' }, body: '<path d="M1 1"/>' })

    await resolveIconSvgValue('tabler:resolve-svg-cache-test', { loadIcon, buildIcon })
    await resolveIconSvgValue('tabler:resolve-svg-cache-test', { loadIcon, buildIcon })

    expect(loadIcon).toHaveBeenCalledTimes(1)
  })
})
