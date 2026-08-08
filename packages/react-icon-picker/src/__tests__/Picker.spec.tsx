import { fireEvent, render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

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

const { loadIconMock, buildIconMock } = vi.hoisted(() => ({
  loadIconMock: vi.fn(),
  buildIconMock: vi.fn(),
}))

// Stub the official Icon component so grid cells never make a real network call.
vi.mock('@iconify/react', () => ({
  Icon: ({ icon }: { icon: string }) => <span className="iconify-stub" data-icon={icon} />,
  loadIcon: loadIconMock,
  buildIcon: buildIconMock,
}))

const { searchIconsMock, browseCollectionMock, browseCollectionsMock, pickRandomPrefixMock } = vi.hoisted(() => ({
  searchIconsMock: vi.fn(),
  browseCollectionMock: vi.fn(),
  browseCollectionsMock: vi.fn(),
  pickRandomPrefixMock: vi.fn(),
}))

vi.mock('@arkn/icon-picker-core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@arkn/icon-picker-core')>()
  return {
    ...actual,
    searchIcons: searchIconsMock,
    browseCollection: browseCollectionMock,
    browseCollections: browseCollectionsMock,
    pickRandomPrefix: pickRandomPrefixMock,
  }
})

import Picker from '../components/Picker/Picker'

const SEARCH_RESULTS = [{ name: 'tabler:home', prefix: 'tabler', icon: 'home' }]
const DEFAULT_BROWSE_RESULTS = [{ name: 'tabler:activity', prefix: 'tabler', icon: 'activity' }]

async function search(container: HTMLElement, query: string) {
  const input = container.querySelector('input[name="search"]') as HTMLInputElement
  fireEvent.change(input, { target: { value: query } })
  if (!query.trim()) {
    await waitFor(() => expect(browseCollectionMock.mock.calls.length + browseCollectionsMock.mock.calls.length).toBeGreaterThan(0))
    return
  }
  await waitFor(() => expect(searchIconsMock).toHaveBeenCalled())
}

async function findGridCell(container: HTMLElement) {
  return waitFor(() => {
    const el = container.querySelector('[class*="r3ipGridItem"]')
    expect(el).not.toBeNull()
    return el as Element
  })
}

/** Waits until a grid cell actually renders the given icon, not just that a
 * mock was called - avoids racing a still-in-flight previous update. */
async function waitForIcon(container: HTMLElement, iconName: string) {
  return waitFor(() => {
    expect(container.querySelector(`[data-icon="${iconName}"]`)).not.toBeNull()
  })
}

describe('Picker search + selection', () => {
  beforeEach(() => {
    searchIconsMock.mockReset().mockResolvedValue(SEARCH_RESULTS)
    browseCollectionMock.mockReset().mockResolvedValue(DEFAULT_BROWSE_RESULTS)
    browseCollectionsMock.mockReset().mockResolvedValue(DEFAULT_BROWSE_RESULTS)
    pickRandomPrefixMock.mockReset().mockReturnValue('tabler')
    loadIconMock.mockReset()
    buildIconMock.mockReset()
  })

  it('debounces then calls searchIcons with the typed query', async () => {
    const { container } = render(<Picker value={null} onChange={vi.fn()} />)
    await findGridCell(container) // wait out the initial default load
    await search(container, 'home')

    expect(searchIconsMock).toHaveBeenCalledWith('home', { prefixes: undefined })
    await findGridCell(container)
  })

  it('restricts the search to the given iconLibrary prefixes', async () => {
    const { container } = render(
      <Picker value={null} onChange={vi.fn()} iconLibrary={['tabler', 'carbon']} />
    )
    await findGridCell(container)
    await search(container, 'home')

    expect(searchIconsMock).toHaveBeenCalledWith('home', { prefixes: ['tabler', 'carbon'] })
  })

  it('name mode (default): selecting an icon calls onChange with its identifier directly', async () => {
    const onChange = vi.fn()
    const { container } = render(<Picker value={null} onChange={onChange} />)
    await findGridCell(container)
    await search(container, 'home')

    fireEvent.click(await findGridCell(container))

    await waitFor(() => expect(onChange).toHaveBeenCalledWith('tabler:home'))
    expect(loadIconMock).not.toHaveBeenCalled()
  })

  it('svg mode: does not call onChange until the icon has finished resolving (race-condition guard)', async () => {
    let resolveLoad!: (value: unknown) => void
    loadIconMock.mockReturnValue(new Promise((resolve) => (resolveLoad = resolve)))
    buildIconMock.mockReturnValue({
      attributes: { viewBox: '0 0 24 24' },
      body: '<path d="M0 0"/>',
    })

    const onChange = vi.fn()
    const { container } = render(<Picker value={null} onChange={onChange} valueType="svg" />)
    await findGridCell(container)
    await search(container, 'home')

    fireEvent.click(await findGridCell(container))
    expect(onChange).not.toHaveBeenCalled()

    resolveLoad({})

    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(onChange.mock.calls[0][0]).toContain('path')
  })

  it('multi-select: toggles an icon off when clicked again', async () => {
    const onChange = vi.fn()
    const { container } = render(
      <Picker value={['tabler:home']} onChange={onChange} multiple />
    )
    await findGridCell(container)
    await search(container, 'home')

    fireEvent.click(await findGridCell(container))

    await waitFor(() => expect(onChange).toHaveBeenCalledWith([]))
  })

  it('shows emptyText when the query has no results', async () => {
    searchIconsMock.mockResolvedValue([])
    const { container, getByText } = render(
      <Picker value={null} onChange={vi.fn()} emptyText="No icons" />
    )
    await findGridCell(container)
    await search(container, 'zzz')

    await waitFor(() => expect(getByText('No icons')).toBeTruthy())
  })

  describe('default icons (before typing anything)', () => {
    it('browses a random prefix when no iconLibrary is set', async () => {
      const { container } = render(<Picker value={null} onChange={vi.fn()} />)
      await findGridCell(container)

      expect(pickRandomPrefixMock).toHaveBeenCalled()
      expect(browseCollectionMock).toHaveBeenCalledWith('tabler')
    })

    it('treats an empty iconLibrary array the same as no restriction (regression: [] is truthy in JS)', async () => {
      const { container } = render(<Picker value={null} onChange={vi.fn()} iconLibrary={[]} />)
      await findGridCell(container)

      expect(pickRandomPrefixMock).toHaveBeenCalled()
      expect(browseCollectionMock).toHaveBeenCalledWith('tabler')
      expect(browseCollectionsMock).not.toHaveBeenCalled()
    })

    it('browses the given collection when iconLibrary is a single prefix', async () => {
      const { container } = render(<Picker value={null} onChange={vi.fn()} iconLibrary="carbon" />)
      await findGridCell(container)

      expect(pickRandomPrefixMock).not.toHaveBeenCalled()
      expect(browseCollectionMock).toHaveBeenCalledWith('carbon')
      expect(browseCollectionsMock).not.toHaveBeenCalled()
    })

    it('browses all given collections when iconLibrary has several prefixes', async () => {
      const { container } = render(
        <Picker value={null} onChange={vi.fn()} iconLibrary={['tabler', 'carbon']} />
      )
      await findGridCell(container)

      expect(browseCollectionsMock).toHaveBeenCalledWith(['tabler', 'carbon'])
      expect(browseCollectionMock).not.toHaveBeenCalled()
    })

    it('reloads the default set when clearing the search box', async () => {
      const { container } = render(<Picker value={null} onChange={vi.fn()} iconLibrary="carbon" />)
      await waitForIcon(container, 'tabler:activity') // default browse settled

      const input = container.querySelector('input[name="search"]') as HTMLInputElement
      fireEvent.change(input, { target: { value: 'home' } })
      await waitForIcon(container, 'tabler:home') // search fully settled

      browseCollectionMock.mockClear()
      fireEvent.change(input, { target: { value: '' } })
      await waitForIcon(container, 'tabler:activity') // default reloaded

      expect(browseCollectionMock).toHaveBeenCalledWith('carbon')
    })

    it('keeps the same random prefix across reloads instead of re-randomizing', async () => {
      pickRandomPrefixMock.mockReturnValue('fluent')
      const { container } = render(<Picker value={null} onChange={vi.fn()} />)
      await waitForIcon(container, 'tabler:activity') // default browse settled
      expect(browseCollectionMock).toHaveBeenLastCalledWith('fluent')

      browseCollectionMock.mockClear()
      const input = container.querySelector('input[name="search"]') as HTMLInputElement
      fireEvent.change(input, { target: { value: 'home' } })
      await waitForIcon(container, 'tabler:home')

      fireEvent.change(input, { target: { value: '' } })
      await waitForIcon(container, 'tabler:activity')

      expect(pickRandomPrefixMock).toHaveBeenCalledTimes(1)
      expect(browseCollectionMock).toHaveBeenCalledWith('fluent')
    })
  })
})
