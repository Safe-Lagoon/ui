import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ScreenMirrorViewer } from "./screen-mirror-viewer";

const frames = [
  { id: "a", src: "a.png", alt: "frame a", timestamp: "12:00", appName: "TikTok" },
  { id: "b", src: "b.png", alt: "frame b", timestamp: "12:01", appName: "TikTok" },
];

describe("ScreenMirrorViewer", () => {
  it("uses a vertical 9:16 filmstrip and no progress slider", () => {
    const onActiveFrameChange = vi.fn();
    const { container, getByLabelText, getByText } = render(
      <ScreenMirrorViewer
        frames={frames}
        sessionLabel="Session 1"
        timelineLabel="Timeline"
        onActiveFrameChange={onActiveFrameChange}
      />,
    );

    expect(container.querySelector("[data-slot=screen-mirror-viewer]")).toBeTruthy();
    expect(container.querySelector("input[type=range]")).toBeNull();
    expect(getByText("Session 1")).toBeInTheDocument();
    expect(getByText("· TikTok")).toBeInTheDocument();
    expect(getByText("1 / 2")).toBeInTheDocument();
    const thumbs = container.querySelectorAll("[data-frame-id] img");
    expect(thumbs).toHaveLength(2);
    expect(thumbs[0]?.className).toMatch(/aspect-\[9\/16\]/);
    expect(getByText("Timeline").className).toMatch(/sr-only/);

    fireEvent.click(getByLabelText("Next frame"));
    expect(onActiveFrameChange).toHaveBeenCalledWith("b");
  });
});
