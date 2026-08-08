<script setup lang="ts">
  import { onClickOutside, useElementSize } from '@vueuse/core'
  import { buildIcon, loadIcon } from '@iconify/vue'
  import { useTemplateRef } from 'vue'
  import { RecycleScroller } from 'vue-virtual-scroller'
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

  import {
    debounce,
    getSanitizedSvgFromCache,
    isIconSelected as coreIsIconSelected,
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
    selectedIconBgColor: '#d3d3d3',
    selectedIconColor: '#000000',
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

  const normalizedPrefixes = computed(() => {
    if (!props.iconLibrary) return undefined
    return Array.isArray(props.iconLibrary) ? props.iconLibrary : [props.iconLibrary]
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

  const runSearch = async (query: string) => {
    if (!query.trim()) {
      filteredIcons.value = []
      return
    }
    const results = await searchIcons(query, { prefixes: normalizedPrefixes.value })
    filteredIcons.value = applyLocalFilters(results)
  }

  const debouncedSearch = debounce(runSearch, 300)
  watch(searchQuery, (query) => debouncedSearch(query))

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

  const scroller = useTemplateRef<HTMLDivElement>('scroller')
  const { width } = useElementSize(scroller)

  const slots = useSlots()
  const hasSlot = (name: string) => {
    return !!slots[name]
  }
</script>

<template>
  <div
    ref="picker"
    :class="`v3ip__custom-select v3ip__${props.inputSize} v3ip__${props.theme}`">
    <div
      class="v3ip__selected"
      :class="{ open: open, disabled: props.disabled }"
      @click="open = props.disabled ? false : !open">
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
                :size="20"
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
        </div>
        <ItemIcon
          v-else
          :data="props.modelValue as string"
          :size="20"
          :color="props.theme == 'dark' ? '#e5e7eb' : '#222'"
          @click.stop="onBadgeRemove(props.modelValue as string)" />
      </template>
      <span v-else class="placeholder">{{ props.placeholder }}</span>
    </div>
    <transition name="fade">
      <div v-show="open">
        <div v-show="props.displaySearch" class="v3ip__search">
          <input
            v-model="searchQuery"
            type="text"
            name="search"
            :placeholder="props.searchPlaceholder" />
        </div>
        <template v-if="filteredIcons && filteredIcons.length">
          <RecycleScroller
            ref="scroller"
            class="v3ip__items"
            :items="filteredIcons"
            :item-size="40"
            :grid-items="4"
            :item-secondary-size="width / 4">
            <template #default="{ item }">
              <div
                :key="item.name"
                :class="{ active: isGridIconSelected(item) }"
                @click="onGridItemSelected(item)">
                <ItemIcon
                  :data="item.name"
                  :size="24"
                  :color="
                    isGridIconSelected(item)
                      ? props.selectedIconColor
                      : props.theme == 'dark'
                        ? '#e5e7eb'
                        : '#222'
                  " />
              </div>
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
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    min-width: 200px;
  }

  .v3ip__custom-select .v3ip__selected {
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid rgb(224, 224, 230);
    color: #333639;
    padding-left: 1em;
    padding-right: 1.4em;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
  }

  .v3ip__custom-select.v3ip__small {
    height: 24px;
    line-height: 24px;
  }

  .v3ip__custom-select.v3ip__small .v3ip__selected {
    min-height: 24px;
  }

  .v3ip__custom-select.v3ip__medium {
    height: 34px;
    line-height: 34px;
  }

  .v3ip__custom-select.v3ip__medium .v3ip__selected {
    min-height: 34px;
  }

  .v3ip__custom-select.v3ip__large {
    height: 40px;
    line-height: 40px;
  }

  .v3ip__custom-select.v3ip__large .v3ip__selected {
    min-height: 40px;
  }

  .v3ip__custom-select .v3ip__selected .multiple {
    align-items: center;
    display: flex;
  }

  .v3ip__custom-select .v3ip__selected .multiple .item {
    display: inline-block;
    margin-right: 10px;
  }

  .v3ip__custom-select .v3ip__selected .placeholder {
    color: silver;
  }

  .v3ip__custom-select .v3ip__selected.open {
    border: 1px solid #c2c2c2;
    border-radius: 6px 6px 0px 0px;
  }

  .v3ip__custom-select .v3ip__selected.open:after {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .v3ip__custom-select.v3ip__small .v3ip__selected.open:after {
    top: 5px;
  }

  .v3ip__custom-select.v3ip__medium .v3ip__selected.open:after {
    top: 10px;
  }

  .v3ip__custom-select.v3ip__large .v3ip__selected.open:after {
    top: 14px;
  }

  .v3ip__custom-select .v3ip__selected:after {
    position: absolute;
    content: '';
    right: 1em;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: #333639 transparent transparent transparent;
  }

  .v3ip__custom-select.v3ip__small .v3ip__selected:after {
    top: 12px;
  }

  .v3ip__custom-select.v3ip__medium .v3ip__selected:after {
    top: 16px;
  }

  .v3ip__custom-select.v3ip__large .v3ip__selected:after {
    top: 20px;
  }

  .v3ip__custom-select .v3ip__selected.disabled {
    cursor: default;
    background-color: whitesmoke;
  }

  .v3ip__custom-select .v3ip__items {
    color: #222;
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    border-right: 1px solid #c2c2c2;
    border-left: 1px solid #c2c2c2;
    border-bottom: 1px solid #c2c2c2;
    position: absolute;
    background-color: #fff;
    left: 0;
    right: 0;
    z-index: 1;
    max-height: 225px;
    overflow-y: auto;
    display: flex;
  }

  .v3ip__custom-select .v3ip__items div {
    color: #222;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
  }

  .v3ip__custom-select .v3ip__items div:hover {
    background-color: rgb(243, 243, 245);
  }

  .v3ip__custom-select .v3ip__items div.active {
    background-color: v-bind(selectedIconBgColor);
  }

  .v3ip__search {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
  .v3ip__search input,
  .v3ip__search input:focus-visible {
    width: 100%;
    border-radius: 0;
    line-height: 30px;
    border: 0.5px solid #c2c2c2;
    border-top: none;
    padding-right: 1em;
    padding-left: 1em;
    background: #fff;
  }

  .v3ip__search input:focus-visible {
    border: 0.5px solid #c2c2c2;
    border-top: none;
    outline: 0;
  }

  .v3ip__search input::placeholder {
    color: #c2c2c2;
  }

  .v3ip__empty {
    border-radius: 0px 0px 6px 6px;
    border-right: 1px solid #c2c2c2;
    border-left: 1px solid #c2c2c2;
    border-bottom: 1px solid #c2c2c2;
    background-color: #fff;
    padding-bottom: 5px;
    padding-top: 5px;
    position: relative;
    z-index: 1;
  }

  .v3ip__empty > .default-text {
    text-align: center;
  }
</style>

<style scoped>
  .v3ip__dark.v3ip__custom-select .v3ip__selected {
    background-color: #1f1f23;
    border-color: #3a3a3f;
    color: #e5e7eb;
  }

  .v3ip__dark.v3ip__custom-select .v3ip__selected .placeholder {
    color: #9ca3af;
  }

  .v3ip__dark.v3ip__custom-select .v3ip__selected.open {
    border-color: #52525b;
  }

  .v3ip__dark.v3ip__custom-select .v3ip__selected:after {
    border-color: #e5e7eb transparent transparent transparent;
  }

  .v3ip__dark.v3ip__custom-select .v3ip__selected.disabled {
    background-color: #2a2a2e;
    color: #6b7280;
    cursor: not-allowed;
  }

  .v3ip__dark.v3ip__custom-select .v3ip__items {
    background-color: #1f1f23;
    border-color: #3a3a3f;
    color: #e5e7eb;
  }

  .v3ip__dark.v3ip__custom-select .v3ip__items div {
    color: #e5e7eb;
  }

  .v3ip__dark.v3ip__custom-select .v3ip__items div:hover {
    background-color: #2a2a2e;
  }

  .v3ip__dark.v3ip__custom-select .v3ip__items div.active {
    background-color: v-bind(selectedIconBgColor);
  }

  .v3ip__dark .v3ip__search input,
  .v3ip__dark .v3ip__search input:focus-visible {
    background-color: #1f1f23;
    border-color: #3a3a3f;
    color: #e5e7eb;
  }

  .v3ip__dark .v3ip__search input::placeholder {
    color: #9ca3af;
  }

  .v3ip__dark .v3ip__empty {
    background-color: #1f1f23;
    border-color: #3a3a3f;
    color: #9ca3af;
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
