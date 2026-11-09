import type { ComponentProps } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  AiChat,
  formatAiChatDayName,
  formatAiChatDayNames,
  parseAiChatDayToken,
  type AiChatResultBlock,
  type AiChatSendContext,
} from "./ai-chat";
import {
  SCREENSHOT_ORIGINS,
  asksForApprove,
  asksForOk,
  fallbackReplies,
  formatAssistantMarkdown,
  isAllowedScreenshotUrl,
  isApproveReply,
  parseReplies,
  replySendText,
} from "./ai-chat-markdown";
import {
  formatVoiceClock,
  joinVoicePrompt,
  pickVoiceMime,
  voiceFilename,
  voiceSupported,
} from "./ai-chat-voice";

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
    const html = formatAssistantMarkdown("Hello **Noah**\n\n[Open](https://example.com)");
    expect(html).toContain('dir="auto"');
    expect(html).toContain("ai-chat-md-link");
    expect(html).toContain("<strong>");
  });

  it("parses <replies> chips and strips them from the body", () => {
    const parsed = parseReplies("Ready.\n<replies>\nReply OK\nReply Approve\n</replies>");
    expect(parsed.text).toBe("Ready.");
    expect(parsed.replies).toEqual(["Reply OK", "Reply Approve"]);
  });

  it("infers Reply Approve / Reply OK chips", () => {
    expect(asksForApprove("Please approve this change.")).toBe(true);
    expect(asksForOk("Shall I proceed?")).toBe(true);
    expect(fallbackReplies("Please approve this change.")).toEqual(["Reply Approve"]);
    expect(fallbackReplies("Shall I proceed?")).toEqual(["Reply OK"]);
    expect(isApproveReply("Reply Approve")).toBe(true);
    expect(replySendText("Reply OK")).toBe("OK");
  });

  it("allows only presigned gallery screenshot URLs", () => {
    expect(SCREENSHOT_ORIGINS).toHaveLength(4);
    expect(
      isAllowedScreenshotUrl(
        "https://safelagoon-gallery.s3.amazonaws.com/shots/emma.png",
      ),
    ).toBe(true);
    expect(
      isAllowedScreenshotUrl(
        new URL("https://s3.eu-west-1.amazonaws.com/safelagoon-gallery/a.webp"),
      ),
    ).toBe(true);
    expect(isAllowedScreenshotUrl("https://example.com/shot.png")).toBe(false);
    expect(isAllowedScreenshotUrl("http://safelagoon-gallery.s3.amazonaws.com/a.png")).toBe(false);
    expect(isAllowedScreenshotUrl("https://safelagoon-gallery.s3.amazonaws.com/")).toBe(false);
    expect(isAllowedScreenshotUrl(null)).toBe(false);
  });
});

describe("AiChat approval cards", () => {
  it("renders Hebrew preview strings as a list (no dir=auto, no React-node slot)", () => {
    const onConfirm = vi.fn();
    const onDismiss = vi.fn();
    const { getByText, getByRole, queryByText } = renderChat({
      messages: [
        { id: "u1", role: "user", content: "Bedtime for נועה" },
        { id: "a1", role: "assistant", content: "Ready." },
      ],
      approval: {
        title: "Confirm this change",
        body: "Allow update_schedule?",
        preview: ["ראשון–חמישי · 21:00–07:00", "נועה"],
        confirmLabel: "Approve",
        dismissLabel: "Dismiss",
        onConfirm,
        onDismiss,
      },
    });

    const card = document.querySelector('[data-slot="chat-approval"]')!;
    expect(card).toBeTruthy();
    expect(getByText("Allow update_schedule?")).not.toHaveAttribute("dir");
    expect(getByText("ראשון–חמישי · 21:00–07:00").tagName).toBe("LI");
    expect(getByText("נועה").tagName).toBe("LI");
    expect(document.querySelector('[data-slot="chat-schedule-card-slot"]')).toBeNull();
    expect(queryByText("Allow update_schedule?")?.getAttribute("dir")).toBeNull();
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

describe("AiChat voice helpers", () => {
  it("maps mime types to prompt filenames and formats the clock", () => {
    expect(voiceFilename("audio/webm;codecs=opus")).toBe("prompt.webm");
    expect(voiceFilename("audio/mp4")).toBe("prompt.m4a");
    expect(voiceFilename("audio/ogg;codecs=opus")).toBe("prompt.ogg");
    expect(joinVoicePrompt("Lock", "Emma's phone")).toBe("Lock Emma's phone");
    expect(joinVoicePrompt("", "Lock Emma's phone")).toBe("Lock Emma's phone");
    expect(formatVoiceClock(0)).toBe("0:00");
    expect(formatVoiceClock(5_000)).toBe("0:05");
    expect(formatVoiceClock(75_000)).toBe("1:15");
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

    expect(pickVoiceMime()).toBeTruthy();
    expect(voiceSupported()).toBe(true);

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

  it("does not render stored tool chips (statusSlot replaced them)", () => {
    const { queryByText } = renderChat({
      messages: [
        {
          id: "a1",
          role: "assistant",
          content: "Done.",
          tools: [{ id: "schedules.list", label: "Checking schedules", busy: false }],
        },
      ],
    });

    expect(queryByText("Checking schedules")).not.toBeInTheDocument();
  });

  it("sends Reply Approve to onApprove and Reply OK as OK", async () => {
    const onApprove = vi.fn(async () => undefined);
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

  it("resends the last user prompt on retryLabel without appending a user row", async () => {
    const onSend = vi.fn(async () => "Again");
    const { getByRole } = renderChat({
      retryLabel: "Try again",
      onSend,
      messages: [
        { id: "u1", role: "user", content: "Lock Emma's phone" },
        { id: "a1", role: "assistant", content: "Failed.", replies: ["Try again"] },
      ],
    });

    fireEvent.click(getByRole("button", { name: "Try again" }));
    await waitFor(() =>
      expect(onSend).toHaveBeenCalledWith(
        "Lock Emma's phone",
        expect.objectContaining({
          onDelta: expect.any(Function),
          onTool: expect.any(Function),
        }),
      ),
    );
    expect(document.querySelectorAll("div.bg-lilac")).toHaveLength(1);
  });
});

describe("AiChat streaming send", () => {
  it("appends onDelta chunks onto the assistant bubble", async () => {
    const onSend = vi.fn(async (_text: string, ctx: AiChatSendContext) => {
      ctx.onDelta("Emma has ");
      ctx.onDelta("**1h 42m**");
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

  it("stores onTool chips on the in-flight assistant and restoreDraft pops the user turn", async () => {
    const onSend = vi.fn(async (_text: string, ctx: AiChatSendContext) => {
      ctx.onTool({ id: "schedules.list", label: "Checking schedules", busy: true });
      return {
        id: "restored",
        role: "assistant" as const,
        content: "Need a child first.",
        restoreDraft: true,
      };
    });
    const { getByPlaceholderText } = renderChat({ onSend });

    const composer = getByPlaceholderText(/Ask about screen time/) as HTMLTextAreaElement;
    fireEvent.change(composer, { target: { value: "Lock Emma's phone" } });
    fireEvent.submit(composer.closest("form")!);

    await waitFor(() => expect(onSend).toHaveBeenCalled());
    await waitFor(() => {
      expect((getByPlaceholderText(/Ask about screen time/) as HTMLTextAreaElement).value).toBe(
        "Lock Emma's phone",
      );
    });
    expect(document.querySelector("div.bg-lilac")).toBeNull();

    const ctx = onSend.mock.calls[0]?.[1] as AiChatSendContext;
    expect(typeof ctx.onDelta).toBe("function");
    expect(typeof ctx.onTool).toBe("function");
    expect(typeof ctx.onToolResult).toBe("function");
  });
});

const resultBlocks: AiChatResultBlock[] = [
  {
    id: "call_1",
    kind: "card",
    label: "First",
    data: { n: 1 },
    text: "Weekdays 21:00–07:00",
  },
  {
    id: "call_2",
    kind: "card",
    label: "Second",
    data: { n: 2 },
    text: "Noah · locked",
  },
];

describe("AiChat result blocks", () => {
  it("renders custom cards in order and falls back to markdown when the slot returns null", () => {
    const { getByText } = renderChat({
      messages: [
        {
          id: "a1",
          role: "assistant",
          content: "Here is the plan.",
          resultBlocks,
        },
      ],
      renderResultBlock: (block) =>
        block.id === "call_2" ? null : <article data-slot="custom-card">{block.label}</article>,
    });

    expect(getByText("Here is the plan.")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="ai-chat-result-block"]')).toHaveTextContent("First");
    expect(document.querySelector('[data-slot="ai-chat-result-fallback"]')?.textContent).toMatch(
      /Noah/,
    );
    const slots = [...document.querySelectorAll("[data-slot='ai-chat-result-block'], [data-slot='ai-chat-result-fallback']")];
    expect(slots.map((node) => node.getAttribute("data-slot"))).toEqual([
      "ai-chat-result-block",
      "ai-chat-result-fallback",
    ]);
  });

  it("uses markdown of block.text when renderResultBlock is omitted", () => {
    renderChat({
      messages: [
        {
          id: "a1",
          role: "assistant",
          content: "",
          resultBlocks: [{ id: "call_1", kind: "card", data: {}, text: "**Bedtime** set" }],
        },
      ],
    });

    const fallback = document.querySelector("[data-slot='ai-chat-result-fallback']");
    expect(fallback?.innerHTML).toContain("<strong>");
    expect(fallback?.textContent).toMatch(/Bedtime/);
  });

  it("renders the message footer slot and omits it when the slot returns null", () => {
    const { rerender, getByText } = renderChat({
      messages: [{ id: "a1", role: "assistant", content: "Done." }],
      renderMessageFooter: () => <span>Source: activity log</span>,
    });

    expect(getByText("Source: activity log")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='ai-chat-message-footer']")).toBeTruthy();

    rerender(
      <AiChat
        sessionStorageKey={false}
        messages={[{ id: "a1", role: "assistant", content: "Done." }]}
        renderMessageFooter={() => null}
      />,
    );
    expect(document.querySelector("[data-slot='ai-chat-message-footer']")).toBeNull();
  });

  it("preserves streamed result blocks through finalize and dedupes by id", async () => {
    const onSend = vi.fn(async (_text: string, ctx: AiChatSendContext) => {
      ctx.onToolResult({
        id: "call_1",
        kind: "card",
        data: { n: 1 },
        text: "stale",
      });
      ctx.onToolResult({
        id: "call_1",
        kind: "card",
        data: { n: 2 },
        text: "updated bedtime",
      });
      ctx.onToolResult({
        id: "call_2",
        kind: "card",
        data: {},
        text: "second card",
      });
      return "Pinned.";
    });

    const { getByPlaceholderText, getByRole, getByText } = renderChat({
      onSend,
      renderResultBlock: (block) => <span>{block.text}</span>,
    });

    const composer = getByPlaceholderText(/Ask about screen time/);
    fireEvent.change(composer, { target: { value: "Set bedtime" } });
    fireEvent.submit(composer.closest("form")!);

    await waitFor(() => expect(getByText("Pinned.")).toBeInTheDocument());
    expect(getByText("updated bedtime")).toBeInTheDocument();
    expect(getByText("second card")).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/stale/);
    expect(document.querySelectorAll("[data-slot='ai-chat-result-block']")).toHaveLength(2);
  });

  it("merges returned resultBlocks with in-flight ones by id", async () => {
    const onSend = vi.fn(async (_text: string, ctx: AiChatSendContext) => {
      ctx.onToolResult({
        id: "call_1",
        kind: "card",
        data: {},
        text: "streamed",
      });
      return {
        id: "a1",
        role: "assistant" as const,
        content: "Saved.",
        resultBlocks: [
          { id: "call_1", kind: "card", data: { ok: true }, text: "from-return" },
          { id: "call_3", kind: "card", data: {}, text: "extra" },
        ],
      };
    });

    const { getByPlaceholderText, getByText, queryByText } = renderChat({
      onSend,
      renderResultBlock: (block) => <span>{block.text}</span>,
    });

    fireEvent.change(getByPlaceholderText(/Ask about screen time/), {
      target: { value: "Apply it" },
    });
    fireEvent.submit(getByPlaceholderText(/Ask about screen time/).closest("form")!);

    await waitFor(() => expect(getByText("from-return")).toBeInTheDocument());
    expect(getByText("extra")).toBeInTheDocument();
    expect(queryByText("streamed")).not.toBeInTheDocument();
  });

  it("copies and reports feedback using block text", async () => {
    const writeText = vi.fn(async () => undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const onFeedback = vi.fn();
    const { getByRole } = renderChat({
      onFeedback,
      messages: [
        { id: "u1", role: "user", content: "Set bedtime" },
        {
          id: "a1",
          role: "assistant",
          content: "Done.",
          resultBlocks: [{ id: "call_1", kind: "card", data: {}, text: "Weekdays 21:00–07:00" }],
        },
      ],
    });

    fireEvent.click(getByRole("button", { name: "Copy" }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith("Done.\n\nWeekdays 21:00–07:00"),
    );

    fireEvent.click(getByRole("button", { name: "Helpful" }));
    expect(onFeedback).toHaveBeenCalledWith({
      rating: "up",
      request: "Set bedtime",
      response: "Done.\n\nWeekdays 21:00–07:00",
    });
  });

  it("applies scoped classNames to the thread, user bubble, and assistant card", () => {
    renderChat({
      classNames: {
        thread: "thread-slot",
        userBubble: "user-slot",
        assistantCard: "card-slot",
      },
      messages: [
        { id: "u1", role: "user", content: "Hi" },
        {
          id: "a1",
          role: "assistant",
          content: "Hello **Noah**",
          resultBlocks: [{ id: "call_1", kind: "card", data: {}, text: "A card" }],
        },
      ],
    });

    expect(document.querySelector(".ai-chat-thread")).toHaveClass("thread-slot");
    expect(document.querySelector("div.user-slot")).toHaveTextContent("Hi");
    expect(document.querySelectorAll(".card-slot").length).toBeGreaterThanOrEqual(2);
  });
});
