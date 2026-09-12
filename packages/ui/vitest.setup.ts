import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";
import * as matchers from "vitest-axe/matchers";

class FakeResizeObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
}

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = FakeResizeObserver as unknown as typeof ResizeObserver;
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => undefined;
}

expect.extend(matchers);
afterEach(() => cleanup());
