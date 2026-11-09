import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatBubble, ConversationView } from "./chat-bubble";

describe("ChatBubble", () => {
  it("renders senderLabel above the bubble for both sent and received", () => {
    const { getByText, rerender } = render(
      <ChatBubble message="hey" timestamp="12:01" senderLabel="Alex" variant="sent" />,
    );
    const sender = getByText("Alex");
    expect(sender.tagName).toBe("P");
    expect(sender.className).toMatch(/text-\[12px\]/);
    expect(sender.className).toMatch(/text-muted-foreground/);
    expect(sender.parentElement?.className).toMatch(/items-end/);
    expect(getByText("hey").parentElement?.className).toMatch(/bg-lilac/);

    rerender(<ChatBubble message="yo" timestamp="12:02" senderLabel="Sam" variant="received" />);
    expect(getByText("Sam").parentElement?.className).toMatch(/items-start/);
    expect(getByText("yo").parentElement?.className).toMatch(/bg-white/);
  });
});

describe("ConversationView", () => {
  it("fills the parent instead of pinning a 300px min-height", () => {
    const { container, getByText, queryByText } = render(
      <ConversationView
        emptyLabel="No messages"
        messages={[{ id: "1", message: "hi", timestamp: "now", senderLabel: "Alex" }]}
      />,
    );
    expect(queryByText("No messages")).toBeNull();
    expect(getByText("Alex")).toBeInTheDocument();
    expect(container.firstElementChild?.className).toMatch(/min-h-0/);
    expect(container.firstElementChild?.className).not.toMatch(/min-h-\[300px\]/);
  });
});
