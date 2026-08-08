import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Grid, type CellComponentProps } from 'react-window'
import { buildIcon, loadIcon } from '@iconify/react'
import {
  browseCollection,
  browseCollections,
  getSanitizedSvgFromCache,
  isIconSelected as coreIsIconSelected,
  pickRandomPrefix,
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
  selectedIconBgColor = 'transparent',
  selectedIconColor = '#2b5fe0',
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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // Bumped on every committed result set and used as the Grid's key below -
  // forces react-window to fully remount instead of recycling its DOM pool
  // across drastically different item counts (e.g. going from a 6000+ item
  // default browse to a 30-item search), which was observed to occasionally
  // leave stale pooled cells rendered on screen.
  const [resultVersion, setResultVersion] = useState(0)
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

  // An empty array (e.g. every library toggle deselected) means "no
  // restriction", same as omitting the prop - [] is truthy in JS, so
  // `iconLibrary ? ... : undefined` alone doesn't catch it.
  const normalizedPrefixesList = iconLibrary
    ? Array.isArray(iconLibrary)
      ? iconLibrary
      : [iconLibrary]
    : []
  const normalizedPrefixes = normalizedPrefixesList.length ? normalizedPrefixesList : undefined

  // Stable for the component's lifetime so clearing the search box doesn't
  // re-randomize the default set shown.
  const randomDefaultPrefixRef = useRef<string | undefined>(undefined)

  const applyLocalFilters = (results: IconResult[]) =>
    results.filter((icon) => {
      const belongsToIncludes = !includeIcons?.length || includeIcons.includes(icon.name)
      const doesNotBelongToExcludes = !excludeIcons?.length || !excludeIcons.includes(icon.name)
      return belongsToIncludes && doesNotBelongToExcludes
    })

  /** Shown before the user has typed anything, instead of a blank state. */
  const fetchDefaultIcons = async (): Promise<IconResult[]> => {
    if (!normalizedPrefixes) {
      if (!randomDefaultPrefixRef.current) randomDefaultPrefixRef.current = pickRandomPrefix()
      return browseCollection(randomDefaultPrefixRef.current)
    } else if (normalizedPrefixes.length === 1) {
      return browseCollection(normalizedPrefixes[0]!)
    }
    return browseCollections(normalizedPrefixes)
  }

  // The default-load (on mount/prefix change) and the debounced search below
  // both write to `filteredIcons` asynchronously - without this guard,
  // whichever network response happens to land last wins, even if it's the
  // stale one (e.g. a slow initial default-collection fetch resolving after
  // a fast search response, silently clobbering the search results).
  const latestRequestIdRef = useRef(0)

  const runSearch = async (query: string) => {
    const requestId = ++latestRequestIdRef.current
    setIsLoading(true)
    try {
      const results = query.trim()
        ? await searchIcons(query, { prefixes: normalizedPrefixes })
        : await fetchDefaultIcons()
      if (requestId !== latestRequestIdRef.current) return // superseded by a newer request
      setFilteredIcons(applyLocalFilters(results))
      setResultVersion((v) => v + 1)
    } finally {
      if (requestId === latestRequestIdRef.current) setIsLoading(false)
    }
  }

  // Initial default load, and reload when the library scope changes while no
  // search is active. Deferred via setTimeout (rather than called directly)
  // so the state update happens after an async boundary, same as the search
  // effect below - keeps calling code outside the effect's synchronous body.
  useEffect(() => {
    if (searchQuery.trim()) return
    const timeoutId = setTimeout(() => runSearch(''), 0)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(normalizedPrefixes)])

  // Debounce by cancelling the previous scheduled search in the effect
  // cleanup, rather than wrapping in a stateful debounce() helper - refs
  // shouldn't be mutated during render, and this reads the latest
  // includeIcons/excludeIcons via the closure instead.
  useEffect(() => {
    const timeoutId = setTimeout(() => runSearch(searchQuery), 300)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, JSON.stringify(normalizedPrefixes), JSON.stringify(includeIcons), JSON.stringify(excludeIcons)])

  // Only a transient loading cue, not a persistent result count - the
  // Compact Dock direction hides that kind of metadata entirely to stay
  // minimal, so nothing is shown once a result set has settled.
  const statusText = isLoading ? 'Loading…' : ''

  const clearSearch = () => setSearchQuery('')

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

  const clearAll = useCallback(() => {
    onChange(multiple ? [] : null)
  }, [multiple, onChange])

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

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  const onPickerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && open) {
      event.stopPropagation()
      setOpen(false)
    }
  }

  // Virtual grid settings - column count adapts to the picker's own width
  // instead of a fixed value, so narrow (sidebar) and wide embeddings both
  // keep a comfortable cell size - capped at 6 to match the Compact Dock
  // direction's density (a higher cap made typical widths pack in 8
  // columns, noticeably busier than the approved design).
  const columnCount = scrollerWidth ? Math.max(3, Math.min(6, Math.floor(scrollerWidth / 50))) : 6
  const columnWidth = scrollerWidth / columnCount || 50
  const rowHeight = 30
  const rowCount = Math.ceil(filteredIcons.length / columnCount)

  const Cell = ({ ariaAttributes, columnIndex, rowIndex, style }: CellComponentProps) => {
    const index = rowIndex * columnCount + columnIndex
    if (index >= filteredIcons.length) return null

    const item = filteredIcons[index]!

    return (
      <button
        type="button"
        {...ariaAttributes}
        style={style}
        className={`${styles.r3ipGridItem} ${isGridIconSelected(item) ? styles.active : ''}`}
        title={item.name}
        aria-pressed={isGridIconSelected(item)}
        onClick={() => onGridItemSelected(item)}>
        <ItemIcon
          data={item.name}
          size={14}
          color={
            isGridIconSelected(item)
              ? selectedIconColor
              : theme === 'dark'
                ? '#f2f2f3'
                : '#111114'
          }
        />
      </button>
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
      }
      onKeyDown={onPickerKeyDown}>
      <div
        className={`${styles.r3ipSelected} ${open ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
        role="button"
        aria-expanded={open}
        tabIndex={disabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={onTriggerKeyDown}>
        {((!multiple && value) || (multiple && Array.isArray(value) && value.length)) ? (
          <>
            {multiple ? (
              <div className={styles.multiple}>
                {Array.isArray(value) &&
                  value.map((val, i) => (
                    <React.Fragment key={i}>
                      {i < selectedItemsToDisplay && (
                        <span className={styles.r3ipBadge}>
                          <ItemIcon
                            className={styles.r3ipBadgeIcon}
                            data={val}
                            size={12}
                            color={theme === 'dark' ? '#f2f2f3' : '#111114'}
                          />
                          <button
                            type="button"
                            className={styles.r3ipBadgeRemove}
                            title="Remove"
                            onClick={(e) => {
                              e.stopPropagation()
                              onBadgeRemove(val)
                            }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                {Array.isArray(value) && value.length > selectedItemsToDisplay && (
                  <div className={styles.item}>
                    <b>+{value.length - selectedItemsToDisplay}</b>
                  </div>
                )}
                {Array.isArray(value) && value.length > 0 && (
                  <button
                    type="button"
                    className={styles.r3ipClearAll}
                    title="Clear all"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearAll()
                    }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                )}
              </div>
            ) : (
              <span className={styles.r3ipBadge}>
                <ItemIcon
                  className={styles.r3ipBadgeIcon}
                  data={value as string}
                  size={12}
                  color={theme === 'dark' ? '#f2f2f3' : '#111114'}
                />
                <button
                  type="button"
                  className={styles.r3ipBadgeRemove}
                  title="Remove"
                  onClick={(e) => {
                    e.stopPropagation()
                    onBadgeRemove(value as string)
                  }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </span>
            )}
          </>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        <span className={`${styles.r3ipChevron} ${open ? styles.open : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </span>
      </div>

      <div className={`${styles.r3ipDropdown} ${open ? styles.r3ipDropdownOpen : ''}`}>
        {displaySearch && (
          <div className={styles.r3ipSearch}>
            <svg className={styles.r3ipSearchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              name="search"
              aria-label="Search icons"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button type="button" className={styles.r3ipClear} title="Clear search" onClick={clearSearch}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            )}
          </div>
        )}

        {statusText && <div className={styles.r3ipMeta}>{statusText}</div>}

        {filteredIcons && filteredIcons.length ? (
          <div ref={scrollerRef} className={styles.r3ipItems}>
            {scrollerWidth > 0 && (
              <Grid
                key={resultVersion}
                cellComponent={Cell}
                cellProps={{}}
                columnCount={columnCount}
                columnWidth={columnWidth - 5}
                rowCount={rowCount}
                rowHeight={rowHeight}
                style={{ height: Math.min(216, rowCount * rowHeight), width: scrollerWidth }}
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
