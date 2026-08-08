import React, { useEffect, useState, useRef } from 'react'
import { getIconFromCache, setIconInCache } from '../../cache'
import { isSVG, isURL, useIconsLoader } from '../../utils'
import type { IconProps } from '../../types'
import styles from './Icon.module.css'

const Icon: React.FC<IconProps> = ({ data, color, size = 24, style: restStyle, className: restClassName, ...restProps }) => {
  const { prepareData } = useIconsLoader()
  const [svgCode, setSvgCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const computedSize = typeof size === 'number' ? `${size}px` : size || 'unset'

  const fetchData = async (url: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const filename = url.split('/').pop()
    const name = filename?.split('.').slice(0, -1).join('.') || 'icon'

    const cached = getIconFromCache(name)
    if (cached) {
      setSvgCode(cached)
      return
    }

    if (isLoading || !url) return

    setIsLoading(true)
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch(url, {
        signal: abortControllerRef.current.signal,
      })

      const svg = await response.text()

      setIconInCache(name, svg)
      setSvgCode(svg)
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error(`Failed to load icon ${name}`, error)
        setSvgCode(
          `<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="#eee"/></svg>`
        )
      }
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  useEffect(() => {
    const loadIcon = async () => {
      if (!data) {
        setSvgCode('')
        return
      }

      if (isURL(data)) {
        fetchData(data)
      } else if (isSVG(data)) {
        setSvgCode(data)
      } else {
        const iconsList = await prepareData()
        const url = iconsList?.find((icon) => icon.name === data)?.svgUrl || ''
        fetchData(url)
      }
    }

    loadIcon()

    // Cleanup: abort ongoing fetch on unmount or data change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [data])

  return (
    <i
      className={`${styles.reactIconPickerIcon} ${restClassName || ''}`}
      style={
        {
          display: 'inline-block',
          lineHeight: 0,
          '--icon-size': computedSize,
          '--icon-color': color,
          ...restStyle,
        } as React.CSSProperties
      }
      {...restProps}
      dangerouslySetInnerHTML={{ __html: svgCode }}
    />
  )
}

export default Icon