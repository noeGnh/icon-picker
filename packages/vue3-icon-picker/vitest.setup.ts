// jsdom doesn't implement ResizeObserver, which Picker.vue relies on (via
// @vueuse/core's useElementSize) to size the virtualized icon grid. Report a
// fake, non-zero size synchronously on observe() so components gated behind
// a first measurement can render.
class ResizeObserverMock {
  #callback: ResizeObserverCallback

  constructor(callback: ResizeObserverCallback) {
    this.#callback = callback
  }

  observe(target: Element) {
    this.#callback(
      [
        {
          target,
          contentRect: { width: 600, height: 600, top: 0, left: 0, right: 600, bottom: 600, x: 0, y: 0 },
        } as ResizeObserverEntry,
      ],
      this as unknown as ResizeObserver
    )
  }

  unobserve() {}
  disconnect() {}
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
}
