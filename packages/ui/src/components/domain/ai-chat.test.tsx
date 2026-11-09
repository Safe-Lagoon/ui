import type { ComponentProps } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AiChat, formatAiChatDayName, formatAiChatDayNames, parseAiChatDayToken } from "./ai-chat";
import { inferAiChatReplies, isApproveReplyChip, renderAiChatMarkdown } from "./ai-chat-markdown";
import { formatAiChatVoiceTimer } from "./ai-chat-voice";

function renderChat(props: Partial<ComponentProps<typeof AiChat>> = {}) {
  return render(<AiChat sessionStorageKey={false} {...props} />);
}

describe("formatAiChatDayName", () => {
  it("localizes JS weekday indexes, including Hebrew", () => {
    expect(formatAiChatDayName(0, "en")).toMatch(/sunday/i);
    expect(formatAiChatDayName(1, "en")).toMatch(/monday/i);
    expect(formatAiChatDayNames([0, 4], "en").join(" ")).toMatch(/sunday/i);
    expect(formatAiChatDayName(0, "he")).toMatch(/יום/);
    expect(parseAiChatDayToken("Thu")).toBe(4);
    expect(parseAiChatDayToken("not-a-day")).toBeUndefined();
  });
});

describe("ai-chat markdown + bidi", () => {
  it("wraps paragraphs in dir=auto and keeps GFM links", () => {
    const html = renderAiChatMarkdown("Hello **Noah**\n\n[Open](https://example.com)");
    expect(html).toContain('dir="auto"');
    expect(html).toContain("ai-chat-md-link");
    expect(html).toContain("<strong>");
  });

  it("infers Reply Approve / Reply OK chips", () => {
    expect(inferAiChatReplies("Please approve this change.")).toEqual(["Reply Approve"]);
    expect(inferAiChatReplies("Shall I proceed?")).toEqual(["Reply OK"]);
    expect(isApproveReplyChip("Reply Approve")).toBe(true);
  });
});

describe("AiChat approval cards", () => {
  it("renders Hebrew detail with dir=auto, tool copy, and schedule-card child slot", () => {
    const onConfirm = vi.fn();
    const onDismiss = vi.fn();
    const { getByText, getByRole } = renderChat({
      messages: [
        { id: "u1", role: "user", content: "Bedtime for נועה" },
        { id: "a1", role: "assistant", content: "Ready." },
      ],
      approval: {
        title: "Confirm this change",
        body: "Allow update_schedule?",
        preview: [
          "ראשון–חמישי · 21:00–07:00",
          <div key="card" data-slot="schedule-card">
            נועה
          </div>,
        ],
        confirmLabel: "Approve",
        dismissLabel: "Dismiss",
        onConfirm,
        onDismiss,
      },
    });

    const card = document.querySelector('[data-slot="chat-approval"]')!;
    expect(card).toBeTruthy();
    expect(getByText("Allow update_schedule?")).toHaveAttribute("dir", "auto");
    expect(getByText("ראשון–חמישי · 21:00–07:00")).toHaveAttribute("dir", "auto");
    expect(document.querySelector('[data-slot="chat-schedule-card-slot"] [data-slot="schedule-card"]')).toHaveTextContent(
      "נועה",
    );
    fireEvent.click(getByRole("button", { name: "Approve" }));
    fireEvent.click(getByRole("button", { name: "Dismiss" }));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("blocks send while an approval is pending", async () => {
    const onSend = vi.fn();
    const { getByPlaceholderText, getByRole } = renderChat({
      messages: [{ id: "a1", role: "assistant", content: "Confirm?" }],
      approval: {
        title: "Confirm this change",
        confirmLabel: "Approve",
        onConfirm: vi.fn(),
      },
      onSend,
    });

    fireEvent.change(getByPlaceholderText(/Ask about screen time/), { target: { value: "hello" } });
    expect(getByRole("button", { name: "Send message" })).toBeDisabled();
    fireEvent.submit(getByRole("button", { name: "Send message" }).closest("form")!);
    expect(onSend).not.toHaveBeenCalled();
  });
});

describe("AiChat voice input", () => {
  it("formats the recording timer", () => {
    expect(formatAiChatVoiceTimer(0)).toBe("0:00");
    expect(formatAiChatVoiceTimer(5_000)).toBe("0:05");
    expect(formatAiChatVoiceTimer(75_000)).toBe("1:15");
  });

  it("shows the mic when onTranscribe is provided in a secure context", () => {
    Object.defineProperty(window, "isSecureContext", { configurable: true, value: true });
    Object.defineProperty(window.navigator, "mediaDevices", {
      configurable: true,
      value: { getUserMedia: vi.fn() },
    });
    vi.stubGlobal(
      "MediaRecorder",
      class {
        static isTypeSupported() {
          return true;
        }
      },
    );

    const { getByRole } = renderChat({
      onTranscribe: async () => "Lock Emma's phone",
    });

    expect(getByRole("button", { name: "Start voice prompt" })).toHaveAttribute("aria-pressed", "false");
    vi.unstubAllGlobals();
  });
});

describe("AiChat clear-all confirm", () => {
  it("asks before wiping saved sessions", async () => {
    const clearAll = vi.fn(async () => undefined);
    const remoteStorage = {
      load: async () => ({
        version: 1 as const,
        activeSessionId: "old",
        sessions: [
          {
            id: "old",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            summary: "How much screen time today?",
            messages: [{ id: "u1", role: "user" as const, content: "How much screen time today?" }],
          },
        ],
      }),
      save: vi.fn(async () => undefined),
      clearAll,
    };

    const { getByRole, findByRole, findByText } = render(
      <AiChat storage="remote" remoteStorage={remoteStorage} />,
    );

    await findByText("What can I help with?");
    fireEvent.click(getByRole("button", { name: "Chat sessions" }));
    fireEvent.click(await findByRole("button", { name: "Clear all chats" }));
    expect(await findByText("This will permanently delete every chat. This cannot be undone.")).toBeInTheDocument();
    fireEvent.click(getByRole("button", { name: "Delete all" }));
    await waitFor(() => expect(clearAll).toHaveBeenCalledOnce());
  });
});

describe("AiChat status line and replies", () => {
  it("renders statusSlot on an empty assistant turn and hides the spinner", () => {
    const { getByText, queryByText } = renderChat({
      isLoading: true,
      reasoningLabel: "Thinking",
      statusSlot: <span>Checking Emma’s schedules</span>,
      messages: [
        { id: "u1", role: "user", content: "Bedtime?" },
        { id: "a1", role: "assistant", content: "" },
      ],
    });

    expect(getByText("Checking Emma’s schedules")).toBeInTheDocument();
    expect(queryByText("Thinking…")).not.toBeInTheDocument();
  });

  it("sends Reply Approve to onApprove and Reply OK as OK", async () => {
    const onApprove = vi.fn();
    const onSend = vi.fn(async () => "Done");
    const { getByRole } = renderChat({
      sessionStorageKey: false,
      onApprove,
      onSend,
      messages: [
        {
          id: "a1",
          role: "assistant",
          content: "Please approve this change.",
          replies: ["Reply Approve", "Reply OK"],
        },
      ],
    });

    fireEvent.click(getByRole("button", { name: "Reply Approve" }));
    expect(onApprove).toHaveBeenCalledOnce();
    expect(onSend).not.toHaveBeenCalled();

    fireEvent.click(getByRole("button", { name: "Reply OK" }));
    await waitFor(() => expect(onSend).toHaveBeenCalledWith("OK", expect.any(Object)));
  });
});

describe("AiChat streaming send", () => {
  it("appends onDelta chunks onto the assistant bubble", async () => {
    const onSend = vi.fn(async (_text, { onDelta }) => {
      onDelta?.("Emma has ");
      onDelta?.("**1h 42m**");
    });
    const { getByPlaceholderText, getByRole } = renderChat({ onSend });

    const composer = getByPlaceholderText(/Ask about screen time/);
    fireEvent.change(composer, {
      target: { value: "How much screen time did Emma use today?" },
    });
    await waitFor(() => expect(getByRole("button", { name: "Send message" })).toBeEnabled());
    fireEvent.submit(composer.closest("form")!);
    await waitFor(() => expect(onSend).toHaveBeenCalled());
    await waitFor(() => {
      const bubble = document.querySelector(".ai-chat-bubble");
      expect(bubble?.textContent).toMatch(/Emma has/);
      expect(bubble?.innerHTML).toContain("<strong>");
    });
  });
});
