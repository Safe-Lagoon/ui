import { fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AiChat } from "./ai-chat";
import type { AiChatRemoteStorage, AiChatStorageState, StoredAiChatSession } from "./ai-chat-storage";

const NOW = Date.parse("2026-11-09T12:00:00.000Z");

function stored(
  id: string,
  extra: Partial<StoredAiChatSession> = {},
): StoredAiChatSession {
  return {
    id,
    createdAt: NOW,
    updatedAt: NOW,
    summary: "",
    messages: [],
    ...extra,
  };
}

function remoteState(
  activeSessionId: string,
  sessions: StoredAiChatSession[],
): AiChatStorageState {
  return { version: 1, activeSessionId, sessions };
}

function mockRemote(
  state: AiChatStorageState | null,
  extras: Partial<AiChatRemoteStorage> = {},
): AiChatRemoteStorage {
  return {
    load: vi.fn(async () => state),
    save: vi.fn(async () => undefined),
    ...extras,
  };
}

afterEach(() => {
  localStorage.clear();
});

describe("AiChat remote active-session restore", () => {
  it("restores a matching activeSessionId from remote storage", async () => {
    const onSessionChange = vi.fn();
    const remoteStorage = mockRemote(
      remoteState("sess-active", [
        stored("sess-other", {
          summary: "Other chat",
          messages: [{ id: "u0", role: "user", content: "ignore me" }],
        }),
        stored("sess-active", {
          summary: "How much screen time today?",
          messages: [
            { id: "u1", role: "user", content: "How much screen time today?" },
            { id: "a1", role: "assistant", content: "About two hours." },
          ],
        }),
      ]),
    );

    const { findByText } = render(
      <AiChat storage="remote" remoteStorage={remoteStorage} onSessionChange={onSessionChange} />,
    );

    expect(await findByText("How much screen time today?")).toBeInTheDocument();
    expect(await findByText("About two hours.")).toBeInTheDocument();
    await waitFor(() => expect(onSessionChange).toHaveBeenCalledWith("sess-active"));
    expect(remoteStorage.loadSession).toBeUndefined();
  });

  it("hydrates a matching session with no messages via loadSession", async () => {
    const onSessionChange = vi.fn();
    const loadSession = vi.fn(async (id: string) =>
      stored(id, {
        summary: "Bedtime for Noah?",
        messages: [
          { id: "u1", role: "user", content: "Bedtime for Noah?" },
          { id: "a1", role: "assistant", content: "21:00 on school nights." },
        ],
      }),
    );
    const remoteStorage = mockRemote(
      remoteState(
        "stub",
        [
          stored("stub", { summary: "Bedtime for Noah?" }),
          stored("other", {
            summary: "Other chat",
            messages: [{ id: "u0", role: "user", content: "ignore me" }],
          }),
        ],
      ),
      { loadSession },
    );

    const { findByText } = render(
      <AiChat storage="remote" remoteStorage={remoteStorage} onSessionChange={onSessionChange} />,
    );

    expect(await findByText("Bedtime for Noah?")).toBeInTheDocument();
    expect(await findByText("21:00 on school nights.")).toBeInTheDocument();
    await waitFor(() => expect(loadSession).toHaveBeenCalledWith("stub"));
    expect(onSessionChange).toHaveBeenCalledWith("stub");
  });

  it.each([
    ["null", async () => null],
    [
      "throw",
      async () => {
        throw new Error("unavailable");
      },
    ],
  ] as const)(
    "loadSession returning %s boots a fresh empty session with no old id",
    async (_label, loadSessionImpl) => {
      const onSessionChange = vi.fn();
      const loadSession = vi.fn(loadSessionImpl);
      const remoteStorage = mockRemote(
        remoteState("old-id", [stored("old-id", { summary: "Yesterday's chat" })]),
        { loadSession },
      );

      const { findByRole, queryByText } = render(
        <AiChat storage="remote" remoteStorage={remoteStorage} onSessionChange={onSessionChange} />,
      );

      expect(await findByRole("button", { name: "Chat sessions" })).toBeInTheDocument();
      await waitFor(() => expect(loadSession).toHaveBeenCalledWith("old-id"));
      await waitFor(() => expect(onSessionChange).toHaveBeenCalled());
      const nextId = onSessionChange.mock.calls.at(-1)?.[0] as string;
      expect(nextId).toBeTruthy();
      expect(nextId).not.toBe("old-id");
      expect(queryByText("Yesterday's chat")).not.toBeInTheDocument();

      fireEvent.click(await findByRole("button", { name: "Chat sessions" }));
      expect(await findByRole("button", { name: /Yesterday's chat/ })).toBeInTheDocument();
    },
  );

  it("boots an empty session when the active id has no kept match", async () => {
    const onSessionChange = vi.fn();
    const loadSession = vi.fn(async () => stored("gone", { messages: [{ id: "u1", role: "user", content: "should not hydrate" }] }));
    const remoteStorage = mockRemote(
      remoteState("gone", [
        stored("gone"),
        stored("kept", {
          summary: "Kept chat",
          messages: [{ id: "u1", role: "user", content: "Kept chat" }],
        }),
      ]),
      { loadSession },
    );

    const { findByRole, queryByText } = render(
      <AiChat storage="remote" remoteStorage={remoteStorage} onSessionChange={onSessionChange} />,
    );

    expect(await findByRole("button", { name: "Chat sessions" })).toBeInTheDocument();
    await waitFor(() => expect(onSessionChange).toHaveBeenCalled());
    expect(onSessionChange.mock.calls.at(-1)?.[0]).not.toBe("gone");
    expect(loadSession).not.toHaveBeenCalled();
    expect(queryByText("should not hydrate")).not.toBeInTheDocument();
    expect(queryByText("Kept chat")).not.toBeInTheDocument();

    fireEvent.click(await findByRole("button", { name: "Chat sessions" }));
    expect(await findByRole("button", { name: /Kept chat/ })).toBeInTheDocument();
  });

  it("keeps an untitled session that has a summary in the kept filter", async () => {
    const onSessionChange = vi.fn();
    const remoteStorage = mockRemote(
      remoteState("gone", [
        stored("gone"),
        stored("untitled", { summary: "Untitled" }),
        stored("named", {
          summary: "Named chat",
          messages: [{ id: "u1", role: "user", content: "Named chat" }],
        }),
      ]),
    );

    const { findByRole, queryByText } = render(
      <AiChat storage="remote" remoteStorage={remoteStorage} onSessionChange={onSessionChange} />,
    );

    expect(await findByRole("button", { name: "Chat sessions" })).toBeInTheDocument();
    await waitFor(() => expect(onSessionChange).toHaveBeenCalled());
    expect(onSessionChange.mock.calls.at(-1)?.[0]).not.toBe("untitled");
    expect(queryByText("Untitled")).not.toBeInTheDocument();

    fireEvent.click(await findByRole("button", { name: "Chat sessions" }));
    expect(await findByRole("button", { name: /Untitled/ })).toBeInTheDocument();
    expect(await findByRole("button", { name: /Named chat/ })).toBeInTheDocument();
  });

  it("drops an untitled-placeholder candidate whose hydrate fails and boots a fresh session", async () => {
    const onSessionChange = vi.fn();
    const loadSession = vi.fn(async () => null);
    const remoteStorage = mockRemote(
      remoteState("placeholder", [
        stored("placeholder", { summary: "\u00a0" }),
        stored("named", {
          summary: "Named chat",
          messages: [{ id: "u1", role: "user", content: "Named chat" }],
        }),
      ]),
      { loadSession },
    );

    const { findByRole, getAllByText, queryByRole } = render(
      <AiChat storage="remote" remoteStorage={remoteStorage} onSessionChange={onSessionChange} />,
    );

    expect(await findByRole("button", { name: "Chat sessions" })).toBeInTheDocument();
    await waitFor(() => expect(loadSession).toHaveBeenCalledWith("placeholder"));
    await waitFor(() => expect(onSessionChange).toHaveBeenCalled());
    expect(onSessionChange.mock.calls.at(-1)?.[0]).not.toBe("placeholder");

    fireEvent.click(await findByRole("button", { name: "Chat sessions" }));
    expect(await findByRole("button", { name: /Named chat/ })).toBeInTheDocument();
    // Header "New chat" + the fresh empty session row. The NBSP placeholder is gone.
    expect(getAllByText("New chat")).toHaveLength(2);
    expect(queryByRole("button", { name: /^\s+$/ })).toBeNull();
  });

  it("keeps a titled candidate in the list when hydrate fails", async () => {
    const onSessionChange = vi.fn();
    const loadSession = vi.fn(async () => {
      throw new Error("unavailable");
    });
    const remoteStorage = mockRemote(
      remoteState("titled", [stored("titled", { summary: "School night bedtime" })]),
      { loadSession },
    );

    const { findByRole } = render(
      <AiChat storage="remote" remoteStorage={remoteStorage} onSessionChange={onSessionChange} />,
    );

    expect(await findByRole("button", { name: "Chat sessions" })).toBeInTheDocument();
    await waitFor(() => expect(loadSession).toHaveBeenCalledWith("titled"));
    await waitFor(() => expect(onSessionChange).toHaveBeenCalled());
    expect(onSessionChange.mock.calls.at(-1)?.[0]).not.toBe("titled");

    fireEvent.click(await findByRole("button", { name: "Chat sessions" }));
    expect(await findByRole("button", { name: /School night bedtime/ })).toBeInTheDocument();
  });
});

describe("AiChat local storage", () => {
  it("is unchanged: restores the matching local session without loadSession or the kept filter", async () => {
    localStorage.setItem(
      "safelagoon-ai-chat",
      JSON.stringify(
        remoteState("local-active", [
          stored("local-active", {
            summary: "Local chat",
            messages: [{ id: "u1", role: "user", content: "local hello" }],
          }),
          stored("local-empty"),
        ]),
      ),
    );
    const onSessionChange = vi.fn();

    const { findByText, findByRole, getAllByText } = render(
      <AiChat storage="local" onSessionChange={onSessionChange} />,
    );

    expect(await findByText("local hello")).toBeInTheDocument();
    expect(onSessionChange).not.toHaveBeenCalled();

    fireEvent.click(await findByRole("button", { name: "Chat sessions" }));
    expect(await findByRole("button", { name: /Local chat/ })).toBeInTheDocument();
    // Header "New chat" plus the empty session row that the remote kept-filter would drop.
    expect(getAllByText("New chat")).toHaveLength(2);
  });
});
