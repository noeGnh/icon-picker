import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Grid, type CellComponentProps } from 'react-window'
import uniqBy from 'lodash.uniqby'
import { getIconFromCache, setIconInCache } from '../../cache'
import type { Icon, IconLibrary, IconPickerProps } from '../../types'
import { isSVG, useIconsLoader } from '../../utils'
import { Icon as ItemIcon } from '../Icon'
import styles from './Picker.module.css'

const Picker: React.FC<IconPickerProps> = ({
  value,
  onChange,
  searchPlaceholder = 'Search',
  placeholder,
  multiple = false,
  iconLibrary = 'fa',
  selectedIconBgColor = '#d3d3d3',
  selectedIconColor = '#000000',
  displaySearch = true,
  multipleLimit = Infinity,
  disabled = false,
  selectedItemsToDisplay = 9,
  clearable = false,
  valueType = 'svg',
  includeIcons = [],
  excludeIcons = [],
  includeSearch,
  excludeSearch,
  emptyText = 'Nothing to show',
  inputSize = 'medium',
  theme = 'light',
  emptySlot,
  style: restStyle,
  className: restClassName,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [scrollerWidth, setScrollerWidth] = useState(0)

  const { iconsList, prepareData } = useIconsLoader()

  // Load icons on mount
  useEffect(() => {
    prepareData()
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

  // Measure scroller width
  useEffect(() => {
    if (scrollerRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setScrollerWidth(entry.contentRect.width)
        }
      })

      observer.observe(scrollerRef.current)
      return () => observer.disconnect()
    }
  }, [open])

  const filteredIcons = useMemo(() => {
    return uniqBy(
      uniqBy(
        iconsList.filter((icon) => {
          const belongsToIconLibs =
            (typeof iconLibrary === 'string' && icon.library === iconLibrary) ||
            (Array.isArray(iconLibrary) &&
              iconLibrary.includes(icon.library as IconLibrary)) ||
            iconLibrary === 'all'

          const belongsToUserSearch =
            !searchQuery ||
            icon.name?.toLowerCase().includes(searchQuery.toLowerCase())

          const belongsToIncludes =
            !includeIcons || !includeIcons.length || includeIcons.includes(icon.name)

          const belongsToIncludeSearch =
            !includeSearch || icon.name?.toLowerCase().includes(includeSearch.toLowerCase())

          const doesNotBelongsToExcludes =
            !excludeIcons || !excludeIcons.length || !excludeIcons.includes(icon.name)

          const doesNotBelongsToExcludeSearch =
            !excludeSearch || !icon.name?.toLowerCase().includes(excludeSearch.toLowerCase())

          return (
            belongsToIconLibs &&
            belongsToUserSearch &&
            belongsToIncludes &&
            belongsToIncludeSearch &&
            doesNotBelongsToExcludes &&
            doesNotBelongsToExcludeSearch
          )
        }),
        'svgUrl'
      ),
      'name'
    )
  }, [
    iconsList,
    iconLibrary,
    searchQuery,
    includeIcons,
    excludeIcons,
    includeSearch,
    excludeSearch,
  ])

  const getValue = useCallback(
    (icon: Icon) => {
      return valueType === 'name' ? icon.name : getIconFromCache(icon.name)
    },
    [valueType]
  )

  /**
   * Resolves the value to store for a selected icon, fetching and caching its
   * SVG on demand if the grid cell's own background fetch hasn't resolved yet.
   * This avoids silently selecting `undefined` when a user clicks an icon
   * before its cache entry has been populated.
   */
  const resolveIconValue = useCallback(
    async (icon: Icon): Promise<string | undefined> => {
      if (valueType === 'name') return icon.name

      const cached = getIconFromCache(icon.name)
      if (cached) return cached

      try {
        const response = await fetch(icon.svgUrl)
        const svg = await response.text()
        setIconInCache(icon.name, svg)
        return getIconFromCache(icon.name)
      } catch (error) {
        console.error(`Failed to load icon ${icon.name}`, error)
        return undefined
      }
    },
    [valueType]
  )

  const getSvgCodeOrUrl = useCallback(
    (val: string) => {
      return valueType === 'name' && !isSVG(val)
        ? iconsList?.find((icon) => icon.name === val)?.svgUrl || ''
        : val
    },
    [valueType, iconsList]
  )

  const isIconSelected = useCallback(
    (icon: Icon) => {
      if (multiple) {
        if (value && Array.isArray(value) && value.length) {
          return value.findIndex((i: string) => i === getValue(icon)) > -1
        }
        return false
      } else {
        if (!value) return false
        return value === getValue(icon)
      }
    },
    [multiple, value, getValue]
  )

  const onSelected = useCallback(
    async (icon: Icon | undefined) => {
      if (!icon) return

      const iconValue = await resolveIconValue(icon)
      if (typeof iconValue === 'undefined') return

      if (multiple) {
        if (value && Array.isArray(value) && value.length) {
          const tempArray = [...value] as string[]
          const index = tempArray.findIndex((i: string) => i === iconValue)

          if (index > -1) {
            tempArray.splice(index, 1)
          } else {
            if (tempArray.length < multipleLimit) {
              tempArray.push(iconValue)
            }
          }
          onChange(tempArray)
        } else {
          if (multipleLimit > 0) {
            onChange([iconValue])
          }
        }
      } else {
        if (iconValue === value) {
          if (clearable) onChange(null)
        } else {
          onChange(iconValue)
        }
      }
    },
    [multiple, value, onChange, resolveIconValue, multipleLimit, clearable]
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
        className={`${styles.r3ipGridItem} ${isIconSelected(item) ? styles.active : ''}`}
        onClick={() => onSelected(item)}>
        <ItemIcon
          data={item.svgUrl}
          size={24}
          color={
            isIconSelected(item)
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
                            data={getSvgCodeOrUrl(val)}
                            size={20}
                            color={theme === 'dark' ? '#e5e7eb' : '#222'}
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation()
                              onSelected(
                                iconsList?.find((icon: Icon) => getValue(icon) === val)
                              )
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
                data={getSvgCodeOrUrl(value as string)}
                size={20}
                color={theme === 'dark' ? '#e5e7eb' : '#222'}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  onSelected(iconsList?.find((icon: Icon) => getValue(icon) === value))
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