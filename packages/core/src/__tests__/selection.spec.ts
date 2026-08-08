import { describe, expect, it } from 'vitest'

import { isIconSelected, toggleIconSelection } from '../selection'

describe('isIconSelected', () => {
  it('single-select: matches by strict equality', () => {
    expect(isIconSelected('tabler:home', 'tabler:home', false)).toBe(true)
    expect(isIconSelected('tabler:home', 'tabler:search', false)).toBe(false)
    expect(isIconSelected(null, 'tabler:home', false)).toBe(false)
  })

  it('multi-select: matches when the array contains the candidate', () => {
    expect(isIconSelected(['tabler:home', 'tabler:search'], 'tabler:home', true)).toBe(true)
    expect(isIconSelected(['tabler:search'], 'tabler:home', true)).toBe(false)
    expect(isIconSelected(null, 'tabler:home', true)).toBe(false)
  })
})

describe('toggleIconSelection', () => {
  const opts = { multiple: false, multipleLimit: Infinity, clearable: false }

  it('single-select: selects a new value', () => {
    expect(toggleIconSelection(null, 'tabler:home', opts)).toBe('tabler:home')
  })

  it('single-select: re-clicking the selected value is a no-op when not clearable', () => {
    expect(toggleIconSelection('tabler:home', 'tabler:home', opts)).toBeUndefined()
  })

  it('single-select: re-clicking the selected value clears it when clearable', () => {
    expect(
      toggleIconSelection('tabler:home', 'tabler:home', { ...opts, clearable: true })
    ).toBeNull()
  })

  it('multi-select: does not mutate the input array (regression: Vue used to mutate props.modelValue directly)', () => {
    const original = ['tabler:home']
    const next = toggleIconSelection(original, 'tabler:search', {
      multiple: true,
      multipleLimit: Infinity,
      clearable: false,
    })

    expect(original).toEqual(['tabler:home'])
    expect(next).toEqual(['tabler:home', 'tabler:search'])
  })

  it('multi-select: removes an already-selected value', () => {
    const next = toggleIconSelection(['tabler:home', 'tabler:search'], 'tabler:home', {
      multiple: true,
      multipleLimit: Infinity,
      clearable: false,
    })

    expect(next).toEqual(['tabler:search'])
  })

  it('multi-select: refuses to add past the limit', () => {
    const next = toggleIconSelection(['tabler:home'], 'tabler:search', {
      multiple: true,
      multipleLimit: 1,
      clearable: false,
    })

    expect(next).toBeUndefined()
  })

  it('multi-select: removal is always allowed even at the limit', () => {
    const next = toggleIconSelection(['tabler:home'], 'tabler:home', {
      multiple: true,
      multipleLimit: 1,
      clearable: false,
    })

    expect(next).toEqual([])
  })
})
