import {
  getSanitizedSvgFromCache,
  isSVG,
  setSanitizedSvgInCache,
} from '@arkn/icon-picker-core'
import { Icon as IconifyIcon } from '@iconify/react'
import React, { useMemo } from 'react'
import type { IconProps } from '../../types'
import styles from './Icon.module.css'

const Icon: React.FC<IconProps> = ({
  data,
  color,
  size = 24,
  style: restStyle,
  className: restClassName,
  ...restProps
}) => {
  const computedSize = typeof size === 'number' ? `${size}px` : size || 'unset'

  const isRawSvg = useMemo(() => !!data && isSVG(data), [data])

  const sanitizedSvg = useMemo(() => {
    if (!data || !isRawSvg) return ''
    return getSanitizedSvgFromCache(data) ?? setSanitizedSvgInCache(data, data)
  }, [data, isRawSvg])

  if (data && !isRawSvg) {
    return (
      <IconifyIcon
        icon={data}
        color={color}
        width={size}
        height={size}
        className={restClassName}
        style={restStyle}
        {...(restProps as Record<string, unknown>)}
      />
    )
  }

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
      dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
    />
  )
}

export default Icon
