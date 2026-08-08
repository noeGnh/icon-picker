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

const { searchIconsMock } = vi.hoisted(() => ({ searchIconsMock: vi.fn() }))

vi.mock('@arkn/icon-picker-core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@arkn/icon-picker-core')>()
  return { ...actual, searchIcons: searchIconsMock }
})

import Picker from '../components/Picker/Picker'

const SEARCH_RESULTS = [{ name: 'tabler:home', prefix: 'tabler', icon: 'home' }]

async function search(container: HTMLElement, query: string) {
  const input = container.querySelector('input[name="search"]') as HTMLInputElement
  fireEvent.change(input, { target: { value: query } })
  await waitFor(() => expect(searchIconsMock).toHaveBeenCalled())
}

async function findGridCell(container: HTMLElement) {
  return waitFor(() => {
    const el = container.querySelector('[class*="r3ipGridItem"]')
    expect(el).not.toBeNull()
    return el as Element
  })
}

describe('Picker search + selection', () => {
  beforeEach(() => {
    searchIconsMock.mockReset().mockResolvedValue(SEARCH_RESULTS)
    loadIconMock.mockReset()
    buildIconMock.mockReset()
  })

  it('debounces then calls searchIcons with the typed query', async () => {
    const { container } = render(<Picker value={null} onChange={vi.fn()} />)
    await search(container, 'home')

    expect(searchIconsMock).toHaveBeenCalledWith('home', { prefixes: undefined })
    await findGridCell(container)
  })

  it('restricts the search to the given iconLibrary prefixes', async () => {
    const { container } = render(
      <Picker value={null} onChange={vi.fn()} iconLibrary={['tabler', 'carbon']} />
    )
    await search(container, 'home')

    expect(searchIconsMock).toHaveBeenCalledWith('home', { prefixes: ['tabler', 'carbon'] })
  })

  it('name mode (default): selecting an icon calls onChange with its identifier directly', async () => {
    const onChange = vi.fn()
    const { container } = render(<Picker value={null} onChange={onChange} />)
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
    await search(container, 'home')

    fireEvent.click(await findGridCell(container))

    await waitFor(() => expect(onChange).toHaveBeenCalledWith([]))
  })

  it('shows emptyText when the query has no results', async () => {
    searchIconsMock.mockResolvedValue([])
    const { container, getByText } = render(
      <Picker value={null} onChange={vi.fn()} emptyText="No icons" />
    )
    await search(container, 'zzz')

    await waitFor(() => expect(getByText('No icons')).toBeTruthy())
  })
})
