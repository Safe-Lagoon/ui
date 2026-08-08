import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Button } from "./components/brand/button";

describe("Button", () => {
  it("renders children", () => {
    const { getByRole } = render(<Button>Click me</Button>);
    expect(getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Button>Accessible</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Input", () => {
  it("shows error message", async () => {
    const { Input } = await import("./components/brand/input");
    const { getByRole, getByText } = render(<Input error="Required field" aria-label="email" />);
    expect(getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    expect(getByText("Required field")).toBeInTheDocument();
  });
});
