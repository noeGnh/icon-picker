import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

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
})
