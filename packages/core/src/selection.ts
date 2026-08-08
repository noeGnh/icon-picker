export function isIconSelected(
  value: string | string[] | null,
  candidateValue: string,
  multiple: boolean
): boolean {
  if (multiple) {
    return Array.isArray(value) && value.includes(candidateValue)
  }
  return value === candidateValue
}

export interface ToggleSelectionOptions {
  multiple: boolean
  multipleLimit: number
  clearable: boolean
}

/**
 * Returns the next value after toggling `candidateValue` in/out of `value`.
 * Returns `undefined` when the toggle is a no-op (multi-select limit reached,
 * or re-clicking a selected icon in single-select mode while not clearable) -
 * callers should skip emitting/calling onChange in that case.
 */
export function toggleIconSelection(
  value: string | string[] | null,
  candidateValue: string,
  { multiple, multipleLimit, clearable }: ToggleSelectionOptions
): string | string[] | null | undefined {
  if (multiple) {
    const current = Array.isArray(value) ? value : []
    const index = current.indexOf(candidateValue)

    if (index > -1) {
      const next = [...current]
      next.splice(index, 1)
      return next
    }

    if (current.length >= multipleLimit) return undefined
    return [...current, candidateValue]
  }

  if (value === candidateValue) {
    return clearable ? null : undefined
  }

  return candidateValue
}
