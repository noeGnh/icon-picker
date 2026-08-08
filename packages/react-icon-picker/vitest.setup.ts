import '@testing-library/jest-dom/vitest'

// jsdom doesn't implement ResizeObserver, which Picker.tsx relies on to size
// the virtualized icon grid.
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
}
