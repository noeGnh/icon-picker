<script setup lang="ts">
  import {
    getSanitizedSvgFromCache,
    isSVG,
    setSanitizedSvgInCache,
  } from '@arkn/icon-picker-core'
  import { Icon as IconifyIcon } from '@iconify/vue'
  import { computed } from 'vue'

  export interface Props {
    /** An Iconify identifier ("prefix:name", e.g. "tabler:home") or a raw SVG string. */
    data: string | null
    color?: string
    size?: number | string
  }

  const props = withDefaults(defineProps<Props>(), {
    color: undefined,
    size: 24,
  })

  const color = computed(() => props.color)
  const size = computed(() =>
    typeof props.size === 'number' ? props.size + 'px' : props.size || 'unset'
  )

  const isRawSvg = computed(() => !!props.data && isSVG(props.data))

  const sanitizedSvg = computed(() => {
    if (!props.data || !isRawSvg.value) return ''
    return getSanitizedSvgFromCache(props.data) ?? setSanitizedSvgInCache(props.data, props.data)
  })
</script>

<template>
  <i v-if="isRawSvg" v-html="sanitizedSvg"></i>
  <IconifyIcon v-else-if="data" :icon="data" :color="props.color" :width="props.size" :height="props.size" />
</template>

<style scoped>
  i :deep(svg) {
    display: block;
    width: v-bind(size);
    height: v-bind(size);
    color: v-bind(color);
    fill: v-bind(color);
  }
</style>
