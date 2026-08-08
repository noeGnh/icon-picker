<script setup lang="ts">
  const selection = ref(null)
  const darkMode = ref<boolean>(false)
  const clearable = ref<boolean>(false)
  const multipleSelection = ref<boolean>(false)
  const selectedLibraries = ref<string[]>(['tabler'])
  const inputSize = ref<'small' | 'medium' | 'large'>('medium')

  // Iconify collection prefixes - see https://icon-sets.iconify.design for the full list.
  const iconLibraries = [
    'ant-design',
    'carbon',
    'fa',
    'fluent',
    'ion',
    'material-symbols',
    'tabler',
  ]

  const isSelected = (lib: string) => {
    return selectedLibraries.value.find((l: string) => l == lib)
  }

  const toggleSelectedLibraries = (lib: string) => {
    const index = selectedLibraries.value.findIndex((l: string) => l == lib)

    if (index > -1) {
      selectedLibraries.value.splice(index, 1)
    } else {
      selectedLibraries.value.push(lib)
    }
  }

  const toggleMultipleSelection = () => {
    selection.value = null
    multipleSelection.value = !multipleSelection.value

    if (multipleSelection.value) clearable.value = false
  }

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
  }

  const toggleClearable = () => {
    if (multipleSelection.value) return
    clearable.value = !clearable.value
  }
</script>

<template>
  <div class="playground" :class="{ dark: darkMode }">
    <section class="playground-card">
      <p class="eyebrow">vue3-icon-picker</p>
      <h1>Playground</h1>

      <div class="control-group">
        <p class="control-label">Libraries</p>
        <div class="chips">
          <button
            v-for="lib in iconLibraries"
            :key="lib"
            type="button"
            class="chip"
            :class="{ selected: isSelected(lib) }"
            @click="toggleSelectedLibraries(lib)">
            {{ lib }}
          </button>
        </div>
      </div>

      <div class="control-row">
        <div class="control-group">
          <p class="control-label">Size</p>
          <div class="chips">
            <button
              type="button"
              class="chip"
              :class="{ selected: inputSize == 'small' }"
              @click="inputSize = 'small'">
              Small
            </button>
            <button
              type="button"
              class="chip"
              :class="{ selected: inputSize == 'medium' }"
              @click="inputSize = 'medium'">
              Medium
            </button>
            <button
              type="button"
              class="chip"
              :class="{ selected: inputSize == 'large' }"
              @click="inputSize = 'large'">
              Large
            </button>
          </div>
        </div>

        <div class="control-group">
          <p class="control-label">Options</p>
          <div class="chips">
            <button
              type="button"
              class="chip"
              :class="{ selected: multipleSelection }"
              @click="toggleMultipleSelection()">
              Multiple
            </button>
            <button
              type="button"
              class="chip"
              :class="{ selected: darkMode }"
              @click="toggleDarkMode()">
              Dark mode
            </button>
            <button
              type="button"
              class="chip"
              :class="{ selected: clearable, disabled: multipleSelection }"
              :disabled="multipleSelection"
              @click="toggleClearable()">
              Clearable
            </button>
          </div>
        </div>
      </div>

      <div class="picker-stage">
        <Vue3IconPicker
          v-model="selection"
          :icon-library="selectedLibraries"
          :multiple="multipleSelection"
          :clearable="clearable"
          placeholder="Select icon(s)"
          style="width: 100%; max-width: 320px"
          :input-size="inputSize"
          :theme="darkMode ? 'dark' : 'light'" />
      </div>
    </section>
  </div>
</template>

<style>
  /* Same Compact Dock tokens as the picker itself
   * (packages/vue3-icon-picker/src/components/Picker.vue) - the playground
   * should look like it belongs to the same product, not a separate,
   * dated test harness bolted onto it. */
  .playground {
    --pg-surface: #ffffff;
    --pg-ground: #f4f4f5;
    --pg-ink: #111114;
    --pg-muted: #8a8a90;
    --pg-line: #e3e3e6;
    --pg-accent: #2b5fe0;
    --pg-radius: 3px;
  }
  .playground.dark {
    --pg-surface: #18181b;
    --pg-ground: #0e0e10;
    --pg-ink: #f2f2f3;
    --pg-muted: #97979d;
    --pg-line: #2c2c31;
    --pg-accent: #6488ea;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
  }

  .playground {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 48px 20px;
    background: var(--pg-ground);
    color: var(--pg-ink);
    font-family: ui-sans-serif, -apple-system, 'Segoe UI', system-ui, sans-serif;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }

  .playground-card {
    width: 100%;
    max-width: 420px;
    background: var(--pg-surface);
    border: 1px solid var(--pg-line);
    border-radius: 8px;
    padding: 28px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  }

  .eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--pg-accent);
    margin: 0 0 6px;
  }

  h1 {
    font-size: 20px;
    letter-spacing: -0.01em;
    margin: 0 0 28px;
  }

  .control-group {
    margin-bottom: 20px;
  }

  .control-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .control-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--pg-muted);
    margin: 0 0 8px;
  }

  .chips {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .chip {
    all: unset;
    font: inherit;
    font-size: 12px;
    border: 1px solid var(--pg-line);
    border-radius: var(--pg-radius);
    padding: 5px 10px;
    color: var(--pg-ink);
    background: var(--pg-surface);
    cursor: pointer;
  }

  .chip:hover {
    background: var(--pg-ground);
  }

  .chip:focus-visible {
    outline: 2px solid var(--pg-accent);
    outline-offset: 1px;
  }

  .chip.selected {
    background: var(--pg-accent);
    border-color: var(--pg-accent);
    color: #ffffff;
  }

  .chip.disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .picker-stage {
    margin-top: 8px;
    padding-top: 24px;
    border-top: 1px solid var(--pg-line);
    display: flex;
    justify-content: center;
  }
</style>
