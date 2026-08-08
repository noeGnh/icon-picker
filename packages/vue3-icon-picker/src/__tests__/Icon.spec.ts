import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

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
})
