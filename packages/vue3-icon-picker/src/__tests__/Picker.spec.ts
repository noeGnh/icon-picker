import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// vue-virtual-scroller measures real DOM layout to decide how many rows to
// render, which jsdom always reports as zero. Since the virtualization
// itself isn't what we're testing here, stub it with a component that just
// renders every item through the default slot.
vi.mock('vue-virtual-scroller', () => ({
  RecycleScroller: {
    name: 'RecycleScroller',
    props: ['items'],
    template: `
      <div>
        <template v-for="item in items" :key="item.name">
          <slot :item="item" />
        </template>
      </div>
    `,
  },
}))

const { loadIconMock, buildIconMock } = vi.hoisted(() => ({
  loadIconMock: vi.fn(),
  buildIconMock: vi.fn(),
}))

// Stub the official Icon component too, so grid cells (rendered via our own
// Icon.vue, which delegates to this for non-raw-SVG values) never make a
// real network call in tests.
vi.mock('@iconify/vue', () => ({
  Icon: {
    name: 'IconifyIconStub',
    props: ['icon', 'color', 'width', 'height'],
    template: '<span class="iconify-stub" />',
  },
  loadIcon: loadIconMock,
  buildIcon: buildIconMock,
}))

const { searchIconsMock } = vi.hoisted(() => ({ searchIconsMock: vi.fn() }))

vi.mock('@arkn/icon-picker-core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@arkn/icon-picker-core')>()
  return { ...actual, searchIcons: searchIconsMock }
})

import Picker from '../components/Picker.vue'

const SEARCH_RESULTS = [{ name: 'tabler:home', prefix: 'tabler', icon: 'home' }]

async function typeAndDebounce(wrapper: ReturnType<typeof mount>, query: string) {
  await wrapper.find('input[name="search"]').setValue(query)
  vi.advanceTimersByTime(300)
  await flushPromises()
}

describe('Picker search + selection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    searchIconsMock.mockReset().mockResolvedValue(SEARCH_RESULTS)
    loadIconMock.mockReset()
    buildIconMock.mockReset()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('debounces the search query before calling searchIcons', async () => {
    const wrapper = mount(Picker, { props: { modelValue: null } })

    await wrapper.find('input[name="search"]').setValue('home')
    expect(searchIconsMock).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    await flushPromises()

    expect(searchIconsMock).toHaveBeenCalledWith('home', { prefixes: undefined })
    expect(wrapper.find('.v3ip__items > div').exists()).toBe(true)
  })

  it('restricts the search to the given iconLibrary prefixes', async () => {
    const wrapper = mount(Picker, { props: { modelValue: null, iconLibrary: ['tabler', 'carbon'] } })
    await typeAndDebounce(wrapper, 'home')

    expect(searchIconsMock).toHaveBeenCalledWith('home', { prefixes: ['tabler', 'carbon'] })
  })

  it('name mode (default): selecting an icon emits its identifier directly', async () => {
    const wrapper = mount(Picker, { props: { modelValue: null } })
    await typeAndDebounce(wrapper, 'home')

    await wrapper.find('.v3ip__items > div').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tabler:home'])
    expect(loadIconMock).not.toHaveBeenCalled()
  })

  it('svg mode: does not emit until the icon has finished resolving (race-condition guard)', async () => {
    let resolveLoad!: (value: unknown) => void
    loadIconMock.mockReturnValue(new Promise((resolve) => (resolveLoad = resolve)))
    buildIconMock.mockReturnValue({
      attributes: { viewBox: '0 0 24 24' },
      body: '<path d="M0 0"/>',
    })

    const wrapper = mount(Picker, { props: { modelValue: null, valueType: 'svg' } })
    await typeAndDebounce(wrapper, 'home')

    await wrapper.find('.v3ip__items > div').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    resolveLoad({})
    await flushPromises()

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeDefined()
    expect(emitted![0][0]).toContain('path')
  })

  it('multi-select: toggles an icon off when clicked again', async () => {
    const wrapper = mount(Picker, {
      props: { modelValue: ['tabler:home'], multiple: true },
    })
    await typeAndDebounce(wrapper, 'home')

    await wrapper.find('.v3ip__items > div').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
  })

  it('shows emptyText when the query has no results', async () => {
    searchIconsMock.mockResolvedValue([])
    const wrapper = mount(Picker, { props: { modelValue: null, emptyText: 'No icons' } })
    await typeAndDebounce(wrapper, 'zzz')

    expect(wrapper.find('.v3ip__empty').text()).toContain('No icons')
  })
})
