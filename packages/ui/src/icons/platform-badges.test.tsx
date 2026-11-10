import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AndroidBadge } from "./android-badge";
import { IOSBadge } from "./ios-badge";

describe("platform badges", () => {
  it("renders a muted currentColor 16px Android robot", () => {
    const { container } = render(<AndroidBadge />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 16 16");
    expect(container.querySelector("rect")).toBeNull();
    expect(container.querySelector("path")).toHaveAttribute("fill", "currentColor");
  });

  it("renders a muted currentColor 16px Apple mark", () => {
    const { container } = render(<IOSBadge />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 16 16");
    expect(container.querySelector("rect")).toBeNull();
    expect(container.querySelector("path")).toHaveAttribute("fill", "currentColor");
  });
});
