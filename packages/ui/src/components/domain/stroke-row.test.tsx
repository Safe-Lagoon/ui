import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StrokeRow } from "./stroke-row";

describe("StrokeRow", () => {
  it("keeps a button row clickable", () => {
    const onClick = vi.fn();
    const { getByRole } = render(<StrokeRow title="Calls" onClick={onClick} />);
    fireEvent.click(getByRole("button", { name: "Calls" }));
    expect(onClick).toHaveBeenCalled();
  });

  it("hosts a labelled, disableable switch when toggle is set", () => {
    const onCheckedChange = vi.fn();
    const { getByRole } = render(
      <StrokeRow
        title="Push"
        toggle
        toggleDisabled
        toggleLabel="Enable push"
        checked={false}
        onCheckedChange={onCheckedChange}
      />,
    );
    const sw = getByRole("switch", { name: "Enable push" });
    expect(sw).toBeDisabled();
    fireEvent.click(sw);
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(getByRole("group")).toHaveAttribute("data-slot", "stroke-row");
  });
});
