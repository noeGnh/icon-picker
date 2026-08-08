import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

// Stub the official Icon component so this test never makes a real network call.
vi.mock('@iconify/react', () => ({
  Icon: ({ icon }: { icon: string }) => <span className="iconify-stub" data-icon={icon} />,
}))

import Icon from '../components/Icon/Icon'

describe('Icon', () => {
  it('renders a benign svg passed directly as the data prop', () => {
    const { container } = render(
      <Icon data='<svg viewBox="0 0 24 24"><circle r="5"/></svg>' />
    )

    expect(container.innerHTML).toContain('circle')
  })

  it('sanitizes a malicious svg passed directly as the data prop', () => {
    const { container } = render(
      <Icon data='<svg><script>window.__pwned = true</script><circle r="5"/></svg>' />
    )

    expect(container.innerHTML).not.toContain('<script')
    expect(container.innerHTML).toContain('circle')
  })

  it('delegates an Iconify identifier to the official Icon component', () => {
    const { container } = render(<Icon data="tabler:home" />)

    const stub = container.querySelector('.iconify-stub')
    expect(stub).not.toBeNull()
    expect(stub?.getAttribute('data-icon')).toBe('tabler:home')
  })
})
