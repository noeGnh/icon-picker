<script setup lang="ts">
  import { onClickOutside, useElementSize } from '@vueuse/core'
  import { buildIcon, loadIcon } from '@iconify/vue'
  import { useTemplateRef } from 'vue'
  import { RecycleScroller } from 'vue-virtual-scroller'
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

  import {
    browseCollection,
    browseCollections,
    debounce,
    getSanitizedSvgFromCache,
    isIconSelected as coreIsIconSelected,
    pickRandomPrefix,
    resolveIconSvgValue,
    searchIcons,
    toggleIconSelection,
    type IconResult,
    type InputSize,
    type Theme,
    type ValueType,
  } from '@arkn/icon-picker-core'
  import ItemIcon from './Icon.vue'

  export interface Props {
    searchPlaceholder?: string
    placeholder?: string
    modelValue: string | string[] | null
    multiple?: boolean
    /** Restrict search to these Iconify collection prefixes (e.g. "tabler", "carbon"). Searches all collections when omitted. */
    iconLibrary?: string | string[]
    selectedIconBgColor?: string
    selectedIconColor?: string
    displaySearch?: boolean
    multipleLimit?: number
    disabled?: boolean
    selectedItemsToDisplay?: number
    clearable?: boolean
    valueType?: ValueType
    includeIcons?: string[]
    excludeIcons?: string[]
    emptyText?: string
    inputSize?: InputSize
    theme?: Theme
  }

  const props = withDefaults(defineProps<Props>(), {
    searchPlaceholder: 'Search',
    placeholder: undefined,
    multiple: false,
    iconLibrary: undefined,
    selectedIconBgColor: '#e8edfc',
    selectedIconColor: '#2b5fe0',
    displaySearch: true,
    multipleLimit: Infinity,
    disabled: false,
    selectedItemsToDisplay: 9,
    clearable: false,
    valueType: 'name',
    includeIcons: () => [],
    excludeIcons: () => [],
    emptyText: 'Nothing to show',
    inputSize: 'medium',
    theme: 'light',
  })

  const emits = defineEmits(['change', 'update:modelValue'])

  const selectedIconBgColor = ref(props.selectedIconBgColor)
  const searchQuery = ref<string>('')
  const open = ref<boolean>(false)
  const filteredIcons = ref<IconResult[]>([])
  const isLoading = ref<boolean>(false)

  const normalizedPrefixes = computed(() => {
    if (!props.iconLibrary) return undefined
    const list = Array.isArray(props.iconLibrary) ? props.iconLibrary : [props.iconLibrary]
    // An empty array (e.g. every library toggle deselected) means "no
    // restriction", same as omitting the prop - [] is truthy in JS, so
    // `!props.iconLibrary` alone doesn't catch it.
    return list.length ? list : undefined
  })

  const applyLocalFilters = (results: IconResult[]) => {
    return results.filter((icon) => {
      const belongsToIncludes =
        !props.includeIcons || !props.includeIcons.length || props.includeIcons.includes(icon.name)
      const doesNotBelongToExcludes =
        !props.excludeIcons || !props.excludeIcons.length || !props.excludeIcons.includes(icon.name)
      return belongsToIncludes && doesNotBelongToExcludes
    })
  }

  // Stable for the component's lifetime so clearing the search box doesn't
  // re-randomize the default set shown.
  const randomDefaultPrefix = ref<string>()

  /** Shown before the user has typed anything, instead of a blank state. */
  const loadDefaultIcons = async () => {
    const prefixes = normalizedPrefixes.value
    let results: IconResult[]

    if (!prefixes) {
      if (!randomDefaultPrefix.value) randomDefaultPrefix.value = pickRandomPrefix()
      results = await browseCollection(randomDefaultPrefix.value)
    } else if (prefixes.length === 1) {
      results = await browseCollection(prefixes[0]!)
    } else {
      results = await browseCollections(prefixes)
    }

    filteredIcons.value = applyLocalFilters(results)
  }

  const runSearch = async (query: string) => {
    isLoading.value = true
    try {
      if (!query.trim()) {
        await loadDefaultIcons()
        return
      }
      const results = await searchIcons(query, { prefixes: normalizedPrefixes.value })
      filteredIcons.value = applyLocalFilters(results)
    } finally {
      isLoading.value = false
    }
  }

  const debouncedSearch = debounce(runSearch, 300)
  watch(searchQuery, (query) => debouncedSearch(query))

  // Initial default load, and reload when the library scope changes while no
  // search is active.
  watch(
    normalizedPrefixes,
    () => {
      if (!searchQuery.value.trim()) runSearch('')
    },
    { immediate: true, deep: true }
  )

  const statusText = computed(() => {
    if (isLoading.value) return 'Loading…'
    const count = filteredIcons.value.length
    if (!count) return ''
    return searchQuery.value.trim()
      ? `${count} result${count === 1 ? '' : 's'}`
      : `${count} icon${count === 1 ? '' : 's'}`
  })

  const clearSearch = () => {
    searchQuery.value = ''
  }

  /** Resolves the value to store for a freshly selected icon (async for valueType: 'svg'). */
  const getResolvedValue = async (icon: IconResult): Promise<string | undefined> => {
    if (props.valueType === 'name') return icon.name
    return resolveIconSvgValue(icon.name, { loadIcon, buildIcon })
  }

  const applyToggle = (candidateValue: string) => {
    const next = toggleIconSelection(props.modelValue, candidateValue, {
      multiple: props.multiple,
      multipleLimit: props.multipleLimit,
      clearable: props.clearable,
    })
    if (typeof next === 'undefined') return
    emits('update:modelValue', next)
    emits('change', next)
  }

  const onGridItemSelected = async (icon: IconResult) => {
    const value = await getResolvedValue(icon)
    if (typeof value === 'undefined') return
    applyToggle(value)
  }

  /** Removing an already-selected value never needs re-resolving - it's already known. */
  const onBadgeRemove = (value: string) => {
    applyToggle(value)
  }

  const clearAll = () => {
    const next = props.multiple ? [] : null
    emits('update:modelValue', next)
    emits('change', next)
  }

  const isGridIconSelected = (icon: IconResult): boolean => {
    if (props.valueType === 'name') {
      return coreIsIconSelected(props.modelValue, icon.name, props.multiple)
    }
    // 'svg' mode is best-effort: only icons already resolved once (cached)
    // can be matched against an opaque stored SVG string.
    const cached = getSanitizedSvgFromCache(icon.name)
    if (!cached) return false
    return coreIsIconSelected(props.modelValue, cached, props.multiple)
  }

  const picker = useTemplateRef<HTMLDivElement>('picker')
  onClickOutside(picker, () => (open.value = false))

  const toggleOpen = () => {
    if (props.disabled) return
    open.value = !open.value
  }

  const onPickerKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && open.value) {
      event.stopPropagation()
      open.value = false
    }
  }

  const scroller = useTemplateRef<HTMLDivElement>('scroller')
  const { width } = useElementSize(scroller)

  /** Column count adapts to the picker's own width instead of a fixed 4, so
   * narrow (sidebar) and wide embeddings both keep a comfortable cell size. */
  const columnCount = computed(() => {
    if (!width.value) return 4
    return Math.max(3, Math.min(8, Math.floor(width.value / 34)))
  })
  const itemSecondarySize = computed(() =>
    columnCount.value ? width.value / columnCount.value : 0
  )

  const slots = useSlots()
  const hasSlot = (name: string) => {
    return !!slots[name]
  }
</script>

<template>
  <div
    ref="picker"
    :class="`v3ip__custom-select v3ip__${props.inputSize} v3ip__${props.theme}`"
    @keydown="onPickerKeydown">
    <div
      class="v3ip__selected"
      :class="{ open: open, disabled: props.disabled }"
      role="button"
      :aria-expanded="open"
      :tabindex="props.disabled ? -1 : 0"
      @click="toggleOpen"
      @keydown.enter.prevent="toggleOpen"
      @keydown.space.prevent="toggleOpen">
      <template
        v-if="
          (!props.multiple && props.modelValue) ||
          (props.multiple && props.modelValue?.length)
        ">
        <div v-if="props.multiple" class="multiple">
          <template v-if="Array.isArray(props.modelValue)">
            <template
              v-for="(value, i) in (props.modelValue as string[]) || []"
              :key="i">
              <ItemIcon
                v-if="i < props.selectedItemsToDisplay"
                class="item"
                :data="value"
                :size="18"
                :color="props.theme == 'dark' ? '#e5e7eb' : '#222'"
                @click.stop="onBadgeRemove(value)" />
            </template>
            <div
              v-if="props.modelValue?.length > props.selectedItemsToDisplay"
              class="item">
              <b>
                +{{ props.modelValue?.length - props.selectedItemsToDisplay }}
              </b>
            </div>
          </template>
          <button
            v-if="Array.isArray(props.modelValue) && props.modelValue.length"
            type="button"
            class="v3ip__clear-all"
            title="Clear all"
            @click.stop="clearAll">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <ItemIcon
          v-else
          :data="props.modelValue as string"
          :size="18"
          :color="props.theme == 'dark' ? '#e5e7eb' : '#222'"
          @click.stop="onBadgeRemove(props.modelValue as string)" />
      </template>
      <span v-else class="placeholder">{{ props.placeholder }}</span>
      <span class="v3ip__chevron" :class="{ open }">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </span>
    </div>
    <transition name="fade">
      <div v-show="open">
        <div v-show="props.displaySearch" class="v3ip__search">
          <svg class="v3ip__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            v-model="searchQuery"
            type="text"
            name="search"
            aria-label="Search icons"
            :placeholder="props.searchPlaceholder" />
          <button
            v-if="searchQuery"
            type="button"
            class="v3ip__clear"
            title="Clear search"
            @click="clearSearch">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div v-if="statusText" class="v3ip__meta">{{ statusText }}</div>
        <template v-if="filteredIcons && filteredIcons.length">
          <RecycleScroller
            ref="scroller"
            class="v3ip__items"
            key-field="name"
            :items="filteredIcons"
            :item-size="34"
            :grid-items="columnCount"
            :item-secondary-size="itemSecondarySize">
            <template #default="{ item }">
              <button
                type="button"
                :class="{ active: isGridIconSelected(item) }"
                :title="item.name"
                :aria-pressed="isGridIconSelected(item)"
                @click="onGridItemSelected(item)">
                <ItemIcon
                  :data="item.name"
                  :size="18"
                  :color="
                    isGridIconSelected(item)
                      ? props.selectedIconColor
                      : props.theme == 'dark'
                        ? '#e5e7eb'
                        : '#222'
                  " />
              </button>
            </template>
          </RecycleScroller>
        </template>
        <div v-else class="v3ip__empty">
          <slot v-if="hasSlot('empty')" name="empty" />
          <div v-else class="default-text">
            <small>{{ props.emptyText }}</small>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .v3ip__custom-select {
    --v3ip-surface: #ffffff;
    --v3ip-ground: #f4f4f5;
    --v3ip-ink: #111114;
    --v3ip-muted: #8a8a90;
    --v3ip-line: #e3e3e6;
    --v3ip-accent: #2b5fe0;
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    min-width: 200px;
    font-family: ui-sans-serif, -apple-system, 'Segoe UI', system-ui, sans-serif;
    font-size: 13.5px;
  }

  .v3ip__custom-select .v3ip__selected {
    background-color: var(--v3ip-surface);
    border-radius: 4px;
    border: 1px solid var(--v3ip-line);
    color: var(--v3ip-ink);
    padding: 0 0.5em 0 0.75em;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .v3ip__custom-select .v3ip__selected:focus-visible {
    outline: 2px solid var(--v3ip-accent);
    outline-offset: 1px;
  }

  .v3ip__custom-select.v3ip__small { min-height: 26px; }
  .v3ip__custom-select.v3ip__medium { min-height: 32px; }
  .v3ip__custom-select.v3ip__large { min-height: 40px; }

  .v3ip__custom-select .v3ip__selected .multiple {
    align-items: center;
    display: flex;
    gap: 5px;
    flex: 1;
    min-width: 0;
  }

  .v3ip__custom-select .v3ip__selected .multiple .item {
    display: flex;
  }

  .v3ip__custom-select .v3ip__selected .placeholder {
    color: var(--v3ip-muted);
    flex: 1;
  }

  .v3ip__custom-select .v3ip__selected.open {
    border-color: var(--v3ip-accent);
  }

  .v3ip__custom-select .v3ip__selected.disabled {
    cursor: default;
    background-color: var(--v3ip-ground);
    color: var(--v3ip-muted);
  }

  .v3ip__chevron {
    display: flex;
    align-items: center;
    color: var(--v3ip-muted);
    flex-shrink: 0;
    transition: transform 0.15s ease;
  }
  .v3ip__chevron svg { width: 13px; height: 13px; }
  .v3ip__chevron.open { transform: rotate(180deg); }

  .v3ip__clear-all,
  .v3ip__clear {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--v3ip-muted);
    cursor: pointer;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    flex-shrink: 0;
  }
  .v3ip__clear-all:hover,
  .v3ip__clear:hover {
    color: var(--v3ip-ink);
    background: var(--v3ip-ground);
  }
  .v3ip__clear-all svg,
  .v3ip__clear svg { width: 12px; height: 12px; }
  .v3ip__clear-all:focus-visible,
  .v3ip__clear:focus-visible { outline: 2px solid var(--v3ip-accent); outline-offset: 1px; }
  .v3ip__clear-all { margin-left: auto; }

  .v3ip__custom-select .v3ip__items {
    color: var(--v3ip-ink);
    border-radius: 0 0 4px 4px;
    overflow: hidden;
    border: 1px solid var(--v3ip-line);
    border-top: none;
    position: absolute;
    background-color: var(--v3ip-surface);
    left: 0;
    right: 0;
    z-index: 1;
    max-height: 216px;
    overflow-y: auto;
    display: flex;
    box-shadow: 0 6px 16px rgba(17, 17, 20, 0.08);
  }

  .v3ip__custom-select .v3ip__items button {
    all: unset;
    box-sizing: border-box;
    color: var(--v3ip-ink);
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    border-radius: 3px;
  }

  .v3ip__custom-select .v3ip__items button:hover {
    background-color: var(--v3ip-ground);
  }

  .v3ip__custom-select .v3ip__items button:focus-visible {
    outline: 2px solid var(--v3ip-accent);
    outline-offset: -2px;
  }

  .v3ip__custom-select .v3ip__items button.active {
    box-shadow: inset 0 0 0 1.5px var(--v3ip-accent);
    background-color: v-bind(selectedIconBgColor);
  }

  .v3ip__search {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    border: 1px solid var(--v3ip-line);
    border-top: none;
    background: var(--v3ip-surface);
  }

  .v3ip__search-icon {
    position: absolute;
    left: 9px;
    width: 13px;
    height: 13px;
    color: var(--v3ip-muted);
    pointer-events: none;
  }

  .v3ip__search input {
    width: 100%;
    border-radius: 0;
    line-height: 28px;
    border: none;
    padding: 0 28px 0 28px;
    background: transparent;
    color: var(--v3ip-ink);
    font: inherit;
  }

  .v3ip__search input:focus-visible {
    outline: 0;
  }

  .v3ip__search input::placeholder {
    color: var(--v3ip-muted);
  }

  .v3ip__meta {
    padding: 5px 10px;
    font-size: 11px;
    color: var(--v3ip-muted);
    background: var(--v3ip-surface);
    border-left: 1px solid var(--v3ip-line);
    border-right: 1px solid var(--v3ip-line);
    position: relative;
    z-index: 1;
    font-variant-numeric: tabular-nums;
  }

  .v3ip__empty {
    border-radius: 0 0 4px 4px;
    border: 1px solid var(--v3ip-line);
    border-top: none;
    background-color: var(--v3ip-surface);
    padding: 22px 10px;
    position: relative;
    z-index: 1;
    box-shadow: 0 6px 16px rgba(17, 17, 20, 0.08);
  }

  .v3ip__empty > .default-text {
    text-align: center;
    color: var(--v3ip-muted);
  }
</style>

<style scoped>
  .v3ip__dark.v3ip__custom-select {
    --v3ip-surface: #18181b;
    --v3ip-ground: #232327;
    --v3ip-ink: #f2f2f3;
    --v3ip-muted: #97979d;
    --v3ip-line: #2c2c31;
    --v3ip-accent: #6488ea;
  }
</style>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
