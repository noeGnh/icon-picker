// jsdom doesn't implement ResizeObserver, which Picker.vue relies on (via
// @vueuse/core's useElementSize) to size the virtualized icon grid.
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
}
