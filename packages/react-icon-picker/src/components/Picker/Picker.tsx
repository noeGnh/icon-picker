import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Grid, type CellComponentProps } from 'react-window'
import { buildIcon, loadIcon } from '@iconify/react'
import {
  getSanitizedSvgFromCache,
  isIconSelected as coreIsIconSelected,
  resolveIconSvgValue,
  searchIcons,
  toggleIconSelection,
  type IconResult,
} from '@arkn/icon-picker-core'
import type { IconPickerProps } from '../../types'
import { Icon as ItemIcon } from '../Icon'
import styles from './Picker.module.css'

const Picker: React.FC<IconPickerProps> = ({
  value,
  onChange,
  searchPlaceholder = 'Search',
  placeholder,
  multiple = false,
  iconLibrary,
  selectedIconBgColor = '#d3d3d3',
  selectedIconColor = '#000000',
  displaySearch = true,
  multipleLimit = Infinity,
  disabled = false,
  selectedItemsToDisplay = 9,
  clearable = false,
  valueType = 'name',
  includeIcons = [],
  excludeIcons = [],
  emptyText = 'Nothing to show',
  inputSize = 'medium',
  theme = 'light',
  emptySlot,
  style: restStyle,
  className: restClassName,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [filteredIcons, setFilteredIcons] = useState<IconResult[]>([])
  const pickerRef = useRef<HTMLDivElement>(null)
  const scrollerObserverRef = useRef<ResizeObserver | null>(null)
  const [scrollerWidth, setScrollerWidth] = useState(0)

  // Callback ref instead of a plain useRef: the scroller element only exists
  // once there are results to render (conditional render), which can happen
  // after `open` last changed - an effect keyed on `open` could miss it and
  // never measure the grid until the dropdown is closed and reopened.
  const scrollerRef = useCallback((node: HTMLDivElement | null) => {
    scrollerObserverRef.current?.disconnect()
    scrollerObserverRef.current = null

    if (node) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setScrollerWidth(entry.contentRect.width)
        }
      })
      observer.observe(node)
      scrollerObserverRef.current = observer
    }
  }, [])

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const normalizedPrefixes = iconLibrary
    ? Array.isArray(iconLibrary)
      ? iconLibrary
      : [iconLibrary]
    : undefined

  // Debounce by cancelling the previous scheduled search in the effect
  // cleanup, rather than wrapping in a stateful debounce() helper - refs
  // shouldn't be mutated during render, and this reads the latest
  // includeIcons/excludeIcons via the closure instead.
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setFilteredIcons([])
        return
      }

      const results = await searchIcons(searchQuery, { prefixes: normalizedPrefixes })

      setFilteredIcons(
        results.filter((icon) => {
          const belongsToIncludes = !includeIcons?.length || includeIcons.includes(icon.name)
          const doesNotBelongToExcludes =
            !excludeIcons?.length || !excludeIcons.includes(icon.name)
          return belongsToIncludes && doesNotBelongToExcludes
        })
      )
    }, 300)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, JSON.stringify(normalizedPrefixes), JSON.stringify(includeIcons), JSON.stringify(excludeIcons)])

  /** Resolves the value to store for a freshly selected icon (async for valueType: 'svg'). */
  const getResolvedValue = useCallback(
    async (icon: IconResult): Promise<string | undefined> => {
      if (valueType === 'name') return icon.name
      return resolveIconSvgValue(icon.name, { loadIcon, buildIcon })
    },
    [valueType]
  )

  const applyToggle = useCallback(
    (candidateValue: string) => {
      const next = toggleIconSelection(value, candidateValue, {
        multiple,
        multipleLimit,
        clearable,
      })
      if (typeof next === 'undefined') return
      onChange(next)
    },
    [value, multiple, multipleLimit, clearable, onChange]
  )

  const onGridItemSelected = useCallback(
    async (icon: IconResult) => {
      const resolved = await getResolvedValue(icon)
      if (typeof resolved === 'undefined') return
      applyToggle(resolved)
    },
    [getResolvedValue, applyToggle]
  )

  /** Removing an already-selected value never needs re-resolving - it's already known. */
  const onBadgeRemove = useCallback(
    (badgeValue: string) => {
      applyToggle(badgeValue)
    },
    [applyToggle]
  )

  const isGridIconSelected = useCallback(
    (icon: IconResult): boolean => {
      if (valueType === 'name') {
        return coreIsIconSelected(value, icon.name, multiple)
      }
      // 'svg' mode is best-effort: only icons already resolved once (cached)
      // can be matched against an opaque stored SVG string.
      const cached = getSanitizedSvgFromCache(icon.name)
      if (!cached) return false
      return coreIsIconSelected(value, cached, multiple)
    },
    [valueType, value, multiple]
  )

  const handleToggle = () => {
    if (!disabled) {
      setOpen(!open)
    }
  }

  // Virtual grid settings
  const columnCount = 4
  const columnWidth = scrollerWidth / columnCount || 50
  const rowHeight = 40
  const rowCount = Math.ceil(filteredIcons.length / columnCount)

  const Cell = ({ ariaAttributes, columnIndex, rowIndex, style }: CellComponentProps) => {
    const index = rowIndex * columnCount + columnIndex
    if (index >= filteredIcons.length) return null

    const item = filteredIcons[index]!

    return (
      <div
        {...ariaAttributes}
        style={style}
        className={`${styles.r3ipGridItem} ${isGridIconSelected(item) ? styles.active : ''}`}
        onClick={() => onGridItemSelected(item)}>
        <ItemIcon
          data={item.name}
          size={24}
          color={
            isGridIconSelected(item)
              ? selectedIconColor
              : theme === 'dark'
                ? '#e5e7eb'
                : '#222'
          }
        />
      </div>
    )
  }

  return (
    <div
      ref={pickerRef}
      className={`${styles.r3ipCustomSelect} ${styles[`r3ip${inputSize.charAt(0).toUpperCase() + inputSize.slice(1)}`]} ${styles[`r3ip${theme.charAt(0).toUpperCase() + theme.slice(1)}`]} ${restClassName}`}
      style={
        {
          '--selected-icon-bg-color': selectedIconBgColor,
          ...restStyle,
        } as React.CSSProperties
      }>
      <div
        className={`${styles.r3ipSelected} ${open ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
        onClick={handleToggle}>
        {((!multiple && value) || (multiple && Array.isArray(value) && value.length)) ? (
          <>
            {multiple ? (
              <div className={styles.multiple}>
                {Array.isArray(value) &&
                  value.map((val, i) => (
                    <React.Fragment key={i}>
                      {i < selectedItemsToDisplay && (
                        <div className={styles.item}>
                          <ItemIcon
                            data={val}
                            size={20}
                            color={theme === 'dark' ? '#e5e7eb' : '#222'}
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation()
                              onBadgeRemove(val)
                            }}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                {Array.isArray(value) && value.length > selectedItemsToDisplay && (
                  <div className={styles.item}>
                    <b>+{value.length - selectedItemsToDisplay}</b>
                  </div>
                )}
              </div>
            ) : (
              <ItemIcon
                data={value as string}
                size={20}
                color={theme === 'dark' ? '#e5e7eb' : '#222'}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  onBadgeRemove(value as string)
                }}
              />
            )}
          </>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
      </div>

      <div className={`${styles.r3ipDropdown} ${open ? styles.r3ipDropdownOpen : ''}`}>
        {displaySearch && (
          <div className={styles.r3ipSearch}>
            <input
              type="text"
              name="search"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {filteredIcons && filteredIcons.length ? (
          <div ref={scrollerRef} className={styles.r3ipItems}>
            {scrollerWidth > 0 && (
              <Grid
                cellComponent={Cell}
                cellProps={{}}
                columnCount={columnCount}
                columnWidth={columnWidth - 5}
                rowCount={rowCount}
                rowHeight={rowHeight}
                style={{ height: Math.min(225, rowCount * rowHeight), width: scrollerWidth }}
              />
            )}
          </div>
        ) : (
          <div className={styles.r3ipEmpty}>
            {emptySlot || (
              <div className={styles.defaultText}>
                <small>{emptyText}</small>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Picker
