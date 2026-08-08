import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// vue-virtual-scroller measures real DOM layout to decide how many rows to
// render, which jsdom always reports as zero. Since the virtualization
// itself isn't what we're testing here, stub it with a component that just
// renders every item through the default slot - but still replicate the
// real library's keyField validation (it throws if an item is missing the
// configured key field), since that's exactly the kind of thing a too-loose
// stub would otherwise hide.
vi.mock('vue-virtual-scroller', () => ({
  RecycleScroller: {
    name: 'RecycleScroller',
    props: { items: { type: Array, default: () => [] }, keyField: { type: String, default: 'id' } },
    setup(props: { items: Record<string, unknown>[]; keyField: string }) {
      for (const item of props.items) {
        if (item[props.keyField] === undefined) {
          throw new Error(`Key is undefined on item (keyField is '${props.keyField}')`)
        }
      }
    },
    template: `
      <div>
        <template v-for="item in items" :key="item[keyField]">
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

import Picker from '../components/Picker.vue'

const SEARCH_RESULTS = [{ name: 'tabler:home', prefix: 'tabler', icon: 'home' }]
const DEFAULT_BROWSE_RESULTS = [{ name: 'tabler:activity', prefix: 'tabler', icon: 'activity' }]

async function mountAndWaitForDefaults(props: Record<string, unknown>) {
  const wrapper = mount(Picker, { props })
  await flushPromises()
  return wrapper
}

async function typeAndDebounce(wrapper: ReturnType<typeof mount>, query: string) {
  await wrapper.find('input[name="search"]').setValue(query)
  vi.advanceTimersByTime(300)
  await flushPromises()
}

describe('Picker search + selection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    searchIconsMock.mockReset().mockResolvedValue(SEARCH_RESULTS)
    browseCollectionMock.mockReset().mockResolvedValue(DEFAULT_BROWSE_RESULTS)
    browseCollectionsMock.mockReset().mockResolvedValue(DEFAULT_BROWSE_RESULTS)
    pickRandomPrefixMock.mockReset().mockReturnValue('tabler')
    loadIconMock.mockReset()
    buildIconMock.mockReset()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('debounces the search query before calling searchIcons', async () => {
    const wrapper = await mountAndWaitForDefaults({ modelValue: null })

    await wrapper.find('input[name="search"]').setValue('home')
    expect(searchIconsMock).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    await flushPromises()

    expect(searchIconsMock).toHaveBeenCalledWith('home', { prefixes: undefined })
    expect(wrapper.find('.v3ip__items > div').exists()).toBe(true)
  })

  it('restricts the search to the given iconLibrary prefixes', async () => {
    const wrapper = await mountAndWaitForDefaults({ modelValue: null, iconLibrary: ['tabler', 'carbon'] })
    await typeAndDebounce(wrapper, 'home')

    expect(searchIconsMock).toHaveBeenCalledWith('home', { prefixes: ['tabler', 'carbon'] })
  })

  it('name mode (default): selecting an icon emits its identifier directly', async () => {
    const wrapper = await mountAndWaitForDefaults({ modelValue: null })
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

    const wrapper = await mountAndWaitForDefaults({ modelValue: null, valueType: 'svg' })
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
    const wrapper = await mountAndWaitForDefaults({ modelValue: ['tabler:home'], multiple: true })
    await typeAndDebounce(wrapper, 'home')

    await wrapper.find('.v3ip__items > div').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
  })

  it('shows emptyText when the query has no results', async () => {
    searchIconsMock.mockResolvedValue([])
    const wrapper = await mountAndWaitForDefaults({ modelValue: null, emptyText: 'No icons' })
    await typeAndDebounce(wrapper, 'zzz')

    expect(wrapper.find('.v3ip__empty').text()).toContain('No icons')
  })

  describe('default icons (before typing anything)', () => {
    it('browses a random prefix when no iconLibrary is set', async () => {
      await mountAndWaitForDefaults({ modelValue: null })

      expect(pickRandomPrefixMock).toHaveBeenCalled()
      expect(browseCollectionMock).toHaveBeenCalledWith('tabler')
    })

    it('treats an empty iconLibrary array the same as no restriction (regression: [] is truthy in JS)', async () => {
      const wrapper = await mountAndWaitForDefaults({ modelValue: null, iconLibrary: [] })

      expect(pickRandomPrefixMock).toHaveBeenCalled()
      expect(browseCollectionMock).toHaveBeenCalledWith('tabler')
      expect(browseCollectionsMock).not.toHaveBeenCalled()
      expect(wrapper.find('.v3ip__items > div').exists()).toBe(true)
    })

    it('browses the given collection when iconLibrary is a single prefix', async () => {
      await mountAndWaitForDefaults({ modelValue: null, iconLibrary: 'carbon' })

      expect(pickRandomPrefixMock).not.toHaveBeenCalled()
      expect(browseCollectionMock).toHaveBeenCalledWith('carbon')
      expect(browseCollectionsMock).not.toHaveBeenCalled()
    })

    it('browses all given collections when iconLibrary has several prefixes', async () => {
      await mountAndWaitForDefaults({ modelValue: null, iconLibrary: ['tabler', 'carbon'] })

      expect(browseCollectionsMock).toHaveBeenCalledWith(['tabler', 'carbon'])
      expect(browseCollectionMock).not.toHaveBeenCalled()
    })

    it('reloads the default set when clearing the search box', async () => {
      const wrapper = await mountAndWaitForDefaults({ modelValue: null, iconLibrary: 'carbon' })
      await typeAndDebounce(wrapper, 'home')
      expect(searchIconsMock).toHaveBeenCalled()

      browseCollectionMock.mockClear()
      await typeAndDebounce(wrapper, '')

      expect(browseCollectionMock).toHaveBeenCalledWith('carbon')
    })

    it('keeps the same random prefix across reloads instead of re-randomizing', async () => {
      pickRandomPrefixMock.mockReturnValue('fluent')
      const wrapper = await mountAndWaitForDefaults({ modelValue: null })
      expect(browseCollectionMock).toHaveBeenLastCalledWith('fluent')

      browseCollectionMock.mockClear()
      await typeAndDebounce(wrapper, 'home')
      await typeAndDebounce(wrapper, '')

      expect(pickRandomPrefixMock).toHaveBeenCalledTimes(1)
      expect(browseCollectionMock).toHaveBeenCalledWith('fluent')
    })
  })
})
