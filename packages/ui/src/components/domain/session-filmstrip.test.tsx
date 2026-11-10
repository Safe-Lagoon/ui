import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SessionFilmstrip } from "./session-filmstrip";

describe("SessionFilmstrip", () => {
  it("fills the parent without card chrome", () => {
    const { container, getByText } = render(
      <SessionFilmstrip
        frames={[{ id: "a", src: "a.png", alt: "frame a", timestamp: "12:00" }]}
      />,
    );
    const root = container.querySelector("[data-slot=session-filmstrip]");
    expect(root?.className).toMatch(/flex-1/);
    expect(root?.className).toMatch(/overflow-hidden/);
    expect(root?.className).not.toMatch(/rounded-\[14px\]/);
    expect(getByText("Session")).toBeInTheDocument();
  });
});
