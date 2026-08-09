import type { AiChatMessage } from "./ai-chat";

export const DEFAULT_AI_CHAT_STORAGE_KEY = "safelagoon-ai-chat";
export const DEFAULT_SESSION_RETENTION_MS = 30 * 24 * 60 * 60 * 1000;

export type StoredAiChatSession = {
  id: string;
  createdAt: number;
  updatedAt: number;
  summary: string;
  messages: AiChatMessage[];
};

export type AiChatStorageState = {
  version: 1;
  activeSessionId: string;
  sessions: StoredAiChatSession[];
};

export function createSessionId() {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createEmptySession(now = Date.now()): StoredAiChatSession {
  return {
    id: createSessionId(),
    createdAt: now,
    updatedAt: now,
    summary: "",
    messages: [],
  };
}

export function formatSessionAge(timestamp: number, now = Date.now()) {
  const diffMs = Math.max(0, now - timestamp);
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  if (weeks < 52) return `${weeks}w`;
  return `${Math.floor(days / 365)}y`;
}

export function buildSessionSummary(messages: AiChatMessage[]) {
  const firstUser = messages.find((message) => message.role === "user");
  if (!firstUser) return "";
  const line = firstUser.content.replace(/\s+/g, " ").trim();
  if (line.length <= 72) return line;
  return `${line.slice(0, 69)}…`;
}

export function purgeExpiredSessions(
  sessions: StoredAiChatSession[],
  retentionMs: number,
  now = Date.now(),
) {
  return sessions.filter((session) => now - session.updatedAt <= retentionMs);
}

export type AiChatRemoteStorage = {
  /** Load sessions from the server. Return null when the user has no saved history. */
  load: () => Promise<AiChatStorageState | null>;
  /** Persist the full session list and active session id. */
  save: (state: AiChatStorageState) => Promise<void>;
};

export function normalizeStorageState(
  state: AiChatStorageState | null,
  retentionMs = DEFAULT_SESSION_RETENTION_MS,
  now = Date.now(),
): AiChatStorageState | null {
  if (!state || state.version !== 1 || !Array.isArray(state.sessions)) return null;

  const sessions = purgeExpiredSessions(state.sessions, retentionMs, now);
  if (sessions.length === 0) return null;

  const activeSessionId = sessions.some((session) => session.id === state.activeSessionId)
    ? state.activeSessionId
    : sessions[0]!.id;

  return { version: 1, activeSessionId, sessions };
}

export function loadAiChatStorage(
  key: string,
  retentionMs = DEFAULT_SESSION_RETENTION_MS,
): AiChatStorageState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as AiChatStorageState;
    return normalizeStorageState(parsed, retentionMs);
  } catch {
    return null;
  }
}

export function saveAiChatStorage(key: string, state: AiChatStorageState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(state));
}
