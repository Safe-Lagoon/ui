import { describe, expect, it } from "vitest";
import {
  buildSessionSummary,
  createEmptySession,
  formatSessionAge,
  normalizeStorageState,
  purgeExpiredSessions,
} from "./ai-chat-storage";

describe("ai-chat-storage", () => {
  it("formats relative session age", () => {
    const now = Date.parse("2026-08-09T12:00:00.000Z");
    expect(formatSessionAge(now - 30_000, now)).toBe("now");
    expect(formatSessionAge(now - 5 * 60_000, now)).toBe("5m");
    expect(formatSessionAge(now - 3 * 60 * 60_000, now)).toBe("3h");
    expect(formatSessionAge(now - 2 * 24 * 60 * 60_000, now)).toBe("2d");
    expect(formatSessionAge(now - 35 * 24 * 60 * 60_000, now)).toBe("5w");
  });

  it("builds one-line summary from first user message", () => {
    expect(
      buildSessionSummary([
        { id: "1", role: "assistant", content: "Hi" },
        { id: "2", role: "user", content: "How much screen time today?" },
      ]),
    ).toBe("How much screen time today?");

    const long = "a".repeat(90);
    expect(buildSessionSummary([{ id: "1", role: "user", content: long }])).toBe(`${"a".repeat(69)}…`);
  });

  it("purges sessions older than retention window", () => {
    const now = Date.now();
    const sessions = [
      { ...createEmptySession(now - 40 * 24 * 60 * 60_000), id: "old" },
      { ...createEmptySession(now - 1 * 24 * 60 * 60_000), id: "fresh" },
    ];

    const kept = purgeExpiredSessions(sessions, 30 * 24 * 60 * 60_000, now);
    expect(kept.map((session) => session.id)).toEqual(["fresh"]);
  });

  it("normalizes loaded storage and drops expired sessions", () => {
    const now = Date.now();
    const normalized = normalizeStorageState(
      {
        version: 1,
        activeSessionId: "old",
        sessions: [
          { ...createEmptySession(now - 40 * 24 * 60 * 60_000), id: "old" },
          { ...createEmptySession(now - 1 * 24 * 60 * 60_000), id: "fresh" },
        ],
      },
      30 * 24 * 60 * 60_000,
      now,
    );

    expect(normalized?.activeSessionId).toBe("fresh");
    expect(normalized?.sessions.map((session) => session.id)).toEqual(["fresh"]);
  });
});
