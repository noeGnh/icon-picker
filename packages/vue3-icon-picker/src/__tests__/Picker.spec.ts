import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
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
    expect(wrapper.find('.v3ip__items > button').exists()).toBe(true)
  })

  it('restricts the search to the given iconLibrary prefixes', async () => {
    const wrapper = await mountAndWaitForDefaults({ modelValue: null, iconLibrary: ['tabler', 'carbon'] })
    await typeAndDebounce(wrapper, 'home')

    expect(searchIconsMock).toHaveBeenCalledWith('home', { prefixes: ['tabler', 'carbon'] })
  })

  it('name mode (default): selecting an icon emits its identifier directly', async () => {
    const wrapper = await mountAndWaitForDefaults({ modelValue: null })
    await typeAndDebounce(wrapper, 'home')

    await wrapper.find('.v3ip__items > button').trigger('click')

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

    await wrapper.find('.v3ip__items > button').trigger('click')
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

    await wrapper.find('.v3ip__items > button').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
  })

  it('shows emptyText when the query has no results', async () => {
    searchIconsMock.mockResolvedValue([])
    const wrapper = await mountAndWaitForDefaults({ modelValue: null, emptyText: 'No icons' })
    await typeAndDebounce(wrapper, 'zzz')

    expect(wrapper.find('.v3ip__empty').text()).toContain('No icons')
  })

  it('does not let a slow initial default-load overwrite a faster, newer search result (race condition regression)', async () => {
    let resolveDefaultBrowse!: (value: unknown) => void
    browseCollectionMock.mockReturnValue(new Promise((resolve) => (resolveDefaultBrowse = resolve)))

    // Mounting kicks off the initial default-load (browseCollection), which
    // we're deliberately leaving unresolved so it's still in flight below.
    const wrapper = mount(Picker, { props: { modelValue: null, iconLibrary: 'tabler' } })

    await wrapper.find('input[name="search"]').setValue('home')
    vi.advanceTimersByTime(300)
    await flushPromises()

    expect(wrapper.find('.v3ip__items > button').attributes('title')).toBe('tabler:home')

    // The slow default-load finally resolves, arriving after the search
    // already committed its (newer) results - it must not clobber them.
    resolveDefaultBrowse(DEFAULT_BROWSE_RESULTS)
    await flushPromises()

    expect(wrapper.find('.v3ip__items > button').attributes('title')).toBe('tabler:home')
  })

  it('shows a clear button once there is a query, which clears it and reloads the default set', async () => {
    const wrapper = await mountAndWaitForDefaults({ modelValue: null, iconLibrary: 'carbon' })

    expect(wrapper.find('.v3ip__clear').exists()).toBe(false)

    await typeAndDebounce(wrapper, 'home')
    expect(wrapper.find('.v3ip__clear').exists()).toBe(true)

    browseCollectionMock.mockClear()
    await wrapper.find('.v3ip__clear').trigger('click')
    vi.advanceTimersByTime(300)
    await flushPromises()

    expect((wrapper.find('input[name="search"]').element as HTMLInputElement).value).toBe('')
    expect(browseCollectionMock).toHaveBeenCalledWith('carbon')
  })

  it('does not show a persistent result/icon count once loading settles (Compact Dock hides it)', async () => {
    const wrapper = await mountAndWaitForDefaults({ modelValue: null })
    expect(wrapper.find('.v3ip__meta').exists()).toBe(false)

    await typeAndDebounce(wrapper, 'home')
    expect(wrapper.find('.v3ip__meta').exists()).toBe(false)
  })

  it('shows a transient loading status text while a search is in flight, then hides it', async () => {
    let resolveSearch!: (value: unknown) => void
    searchIconsMock.mockReturnValue(new Promise((resolve) => (resolveSearch = resolve)))

    const wrapper = await mountAndWaitForDefaults({ modelValue: null })
    await wrapper.find('input[name="search"]').setValue('home')
    vi.advanceTimersByTime(300)
    await nextTick()

    expect(wrapper.find('.v3ip__meta').text()).toBe('Loading…')

    resolveSearch(SEARCH_RESULTS)
    await flushPromises()

    expect(wrapper.find('.v3ip__meta').exists()).toBe(false)
  })

  it('closes the dropdown when Escape is pressed while open', async () => {
    const wrapper = await mountAndWaitForDefaults({ modelValue: null })

    await wrapper.find('.v3ip__selected').trigger('click')
    expect(wrapper.find('.v3ip__selected').classes()).toContain('open')

    await wrapper.find('.v3ip__custom-select').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('.v3ip__selected').classes()).not.toContain('open')
  })

  it('multi-select: shows a clear-all button that clears every selected value at once', async () => {
    const wrapper = await mountAndWaitForDefaults({
      modelValue: ['tabler:home', 'tabler:search'],
      multiple: true,
    })

    await wrapper.find('.v3ip__clear-all').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
    expect(wrapper.emitted('change')?.[0]).toEqual([[]])
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
      expect(wrapper.find('.v3ip__items > button').exists()).toBe(true)
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
