import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatSplitLayout } from "./chat-split-layout";

describe("ChatSplitLayout", () => {
  it("lets the thread pane flex instead of pinning 260px", () => {
    const { container, getByText } = render(
      <ChatSplitLayout threads={<p>threads</p>} conversation={<p>chat</p>} />,
    );
    const aside = container.querySelector("aside");
    expect(getByText("threads")).toBeInTheDocument();
    expect(aside?.className).toMatch(/flex-1/);
    expect(aside?.className).not.toMatch(/w-\[260px\]/);
  });
});
