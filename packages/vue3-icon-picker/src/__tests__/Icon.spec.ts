import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

// Stub the official Icon component so this test never makes a real network call.
vi.mock('@iconify/vue', () => ({
  Icon: {
    name: 'IconifyIconStub',
    props: ['icon', 'color', 'width', 'height'],
    template: '<span class="iconify-stub" :data-icon="icon" />',
  },
}))

import Icon from '../components/Icon.vue'

describe('Icon', () => {
  it('renders a benign svg passed directly as the data prop', async () => {
    const wrapper = mount(Icon, {
      props: { data: '<svg viewBox="0 0 24 24"><circle r="5"/></svg>' },
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('circle')
  })

  it('sanitizes a malicious svg passed directly as the data prop', async () => {
    const wrapper = mount(Icon, {
      props: {
        data: '<svg><script>window.__pwned = true</script><circle r="5"/></svg>',
      },
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).not.toContain('<script')
    expect(wrapper.html()).toContain('circle')
  })

  it('delegates an Iconify identifier to the official Icon component', async () => {
    const wrapper = mount(Icon, { props: { data: 'tabler:home' } })
    await wrapper.vm.$nextTick()

    const stub = wrapper.find('.iconify-stub')
    expect(stub.exists()).toBe(true)
    expect(stub.attributes('data-icon')).toBe('tabler:home')
  })
})
