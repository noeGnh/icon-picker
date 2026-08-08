import { fireEvent, render, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import Picker from '../components/Picker/Picker'

// react-window measures real DOM layout to decide how many cells to render,
// which jsdom always reports as zero. Since the virtualization itself isn't
// what we're testing here, stub it with a component that just renders every
// cell directly.
vi.mock('react-window', () => ({
  Grid: (props: any) => {
    const { cellComponent: Cell, cellProps, columnCount, rowCount } = props
    const cells = []
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        cells.push(
          <Cell
            key={`${rowIndex}-${columnIndex}`}
            ariaAttributes={{ 'aria-colindex': columnIndex, role: 'gridcell' }}
            columnIndex={columnIndex}
            rowIndex={rowIndex}
            style={{}}
            {...cellProps}
          />
        )
      }
    }
    return <div>{cells}</div>
  },
}))

const ICON_SVG = '<svg><circle r="5"/></svg>'

describe('Picker selection', () => {
  let pendingIconFetches: Array<(value: Response) => void>

  beforeEach(() => {
    localStorage.clear()
    pendingIconFetches = []

    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('icons-list.json')) {
          return Promise.resolve({ ok: true, json: async () => ['fa_HomeOutline'] } as Response)
        }

        // Individual icon SVGs never resolve on their own in this test -
        // resolution is driven explicitly via resolvePendingIconFetches().
        return new Promise<Response>((resolve) => {
          pendingIconFetches.push(resolve)
        })
      })
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function resolvePendingIconFetches() {
    const resolvers = pendingIconFetches.splice(0)
    resolvers.forEach((resolve) => resolve({ ok: true, text: async () => ICON_SVG } as Response))
  }

  it('resolves a defined value even when clicked before its icon has finished loading', async () => {
    const onChange = vi.fn()
    const { container } = render(
      <Picker value={null} onChange={onChange} iconLibrary="all" />
    )

    // Wait for the icons list fetch (prepareData) to resolve and the grid to render.
    const cell = await waitFor(() => {
      const el = container.querySelector('[class*="r3ipGridItem"]')
      expect(el).not.toBeNull()
      return el!
    })

    // At this point the grid cell's own background fetch (via the nested
    // Icon component) is already pending and unresolved.
    expect(pendingIconFetches.length).toBeGreaterThan(0)

    fireEvent.click(cell)

    // Selection isn't synchronous anymore (resolveIconValue awaits its own
    // fetch on a cache miss), so nothing should be called yet.
    expect(onChange).not.toHaveBeenCalled()

    resolvePendingIconFetches()

    await waitFor(() => expect(onChange).toHaveBeenCalled())

    const value = onChange.mock.calls[0][0]
    expect(typeof value).toBe('string')
    expect(value).toContain('circle')
  })
})
