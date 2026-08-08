import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import Picker from '../components/Picker.vue'

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
    const wrapper = mount(Picker, {
      props: { modelValue: null, iconLibrary: 'all' },
    })

    // Wait for the icons list fetch (prepareData) to resolve and the grid to render.
    await flushPromises()

    const cell = wrapper.find('.v3ip__items > div')
    expect(cell.exists()).toBe(true)

    // At this point the grid cell's own background fetch (via the nested
    // Icon component) is already pending and unresolved.
    expect(pendingIconFetches.length).toBeGreaterThan(0)

    await cell.trigger('click')

    // Selection isn't synchronous anymore (resolveIconValue awaits its own
    // fetch on a cache miss), so nothing should be emitted yet.
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    resolvePendingIconFetches()
    await flushPromises()

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeDefined()
    expect(emitted![0][0]).toBeTypeOf('string')
    expect(emitted![0][0]).toContain('circle')
  })
})
