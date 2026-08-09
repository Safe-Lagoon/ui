"use client";

import * as React from "react";
import {
  ArrowUp,
  ChevronRight,
  Copy,
  History,
  Lightbulb,
  Maximize2,
  Plus,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Spinner } from "../ui/spinner";
import {
  buildSessionSummary,
  createEmptySession,
  DEFAULT_AI_CHAT_STORAGE_KEY,
  formatSessionAge,
  loadAiChatStorage,
  normalizeStorageState,
  purgeExpiredSessions,
  saveAiChatStorage,
  type AiChatRemoteStorage,
  type AiChatStorageState,
  type StoredAiChatSession,
} from "./ai-chat-storage";

export interface AiChatSuggestedPrompt {
  id: string;
  label: string;
  category?: string;
  categoryIcon?: React.ReactNode;
}

export interface AiChatQuickAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface AiChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  reasoning?: string;
}

export interface AiChatProps {
  placeholder?: string;
  disclaimer?: string;
  disclaimerLinkLabel?: string;
  onDisclaimerLinkClick?: () => void;
  suggestedPrompts?: AiChatSuggestedPrompt[];
  quickActions?: AiChatQuickAction[];
  messages?: AiChatMessage[];
  defaultMessages?: AiChatMessage[];
  onMessagesChange?: (messages: AiChatMessage[]) => void;
  isLoading?: boolean;
  onSend?: (message: string) => void | Promise<string | AiChatMessage | void>;
  onQuickAction?: (actionId: string) => void;
  onClose?: () => void;
  onExpand?: () => void;
  expandLabel?: string;
  closeLabel?: string;
  copyLabel?: string;
  copiedLabel?: string;
  thumbsUpLabel?: string;
  thumbsDownLabel?: string;
  reasoningLabel?: string;
  sendLabel?: string;
  sessionHistoryLabel?: string;
  newSessionLabel?: string;
  noSessionsLabel?: string;
  /** Where session history is persisted. `local` uses browser localStorage; `remote` uses `remoteStorage`. */
  storage?: "local" | "remote";
  /** Required when `storage="remote"`. Wire to your backend API. */
  remoteStorage?: AiChatRemoteStorage;
  /** localStorage key when `storage="local"`. Pass `false` to disable persistence. */
  sessionStorageKey?: string | false;
  sessionRetentionDays?: number;
  onSessionChange?: (sessionId: string) => void;
  className?: string;
}

export type {
  AiChatRemoteStorage,
  AiChatStorageState,
  StoredAiChatSession,
} from "./ai-chat-storage";

const MIN_TEXTAREA_HEIGHT = 56;
const MAX_TEXTAREA_HEIGHT = 200;

function renderBoldText(content: string) {
  const parts = content.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function AiChat({
  placeholder = "Ask about screen time, apps, location, or rules…",
  disclaimer,
  disclaimerLinkLabel,
  onDisclaimerLinkClick,
  suggestedPrompts = [],
  messages: messagesProp,
  defaultMessages = [],
  onMessagesChange,
  isLoading: isLoadingProp,
  onSend,
  onClose,
  onExpand,
  expandLabel = "Expand",
  closeLabel = "Close chat",
  copyLabel = "Copy",
  copiedLabel = "Copied",
  thumbsUpLabel = "Helpful",
  thumbsDownLabel = "Not helpful",
  reasoningLabel = "Reasoning",
  sendLabel = "Send message",
  sessionHistoryLabel = "Chat sessions",
  newSessionLabel = "New chat",
  noSessionsLabel = "No previous chats",
  storage = "local",
  remoteStorage,
  sessionStorageKey = DEFAULT_AI_CHAT_STORAGE_KEY,
  sessionRetentionDays = 30,
  onSessionChange,
  className,
}: AiChatProps) {
  const retentionMs = sessionRetentionDays * 24 * 60 * 60 * 1000;
  const storageKey = sessionStorageKey === false ? null : sessionStorageKey;
  const persistSessions =
    messagesProp === undefined &&
    ((storage === "local" && storageKey !== null) ||
      (storage === "remote" && remoteStorage !== undefined));

  const [internalMessages, setInternalMessages] = React.useState(defaultMessages);
  const [input, setInput] = React.useState("");
  const [internalLoading, setInternalLoading] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [sessionsOpen, setSessionsOpen] = React.useState(false);
  const [sessions, setSessions] = React.useState<StoredAiChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = React.useState("");
  const [storageReady, setStorageReady] = React.useState(!persistSessions);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const messages = messagesProp ?? internalMessages;
  const isLoading = isLoadingProp ?? internalLoading;
  const hasMessages = messages.length > 0;

  const resetTextareaHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
  }, []);

  const adjustTextareaHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(
      Math.max(textarea.scrollHeight, MIN_TEXTAREA_HEIGHT),
      MAX_TEXTAREA_HEIGHT,
    )}px`;
  }, []);

  const writeStorage = React.useCallback(
    (state: AiChatStorageState) => {
      const normalized = normalizeStorageState(state, retentionMs);
      if (!normalized) return null;

      if (storage === "local" && storageKey) {
        saveAiChatStorage(storageKey, normalized);
        return normalized;
      }

      if (storage === "remote" && remoteStorage) {
        void remoteStorage.save(normalized).catch(() => undefined);
        return normalized;
      }

      return null;
    },
    [remoteStorage, retentionMs, storage, storageKey],
  );

  const applySessionState = React.useCallback(
    (nextSessions: StoredAiChatSession[], nextActiveSessionId: string) => {
      const purged = purgeExpiredSessions(nextSessions, retentionMs);
      const activeSessionId = purged.some((session) => session.id === nextActiveSessionId)
        ? nextActiveSessionId
        : (purged[0]?.id ?? nextActiveSessionId);

      writeStorage({
        version: 1,
        activeSessionId,
        sessions: purged,
      });

      setSessions(purged);
      setActiveSessionId(activeSessionId);
      return { sessions: purged, activeSessionId };
    },
    [retentionMs, writeStorage],
  );

  const setMessages = React.useCallback(
    (next: AiChatMessage[] | ((prev: AiChatMessage[]) => AiChatMessage[])) => {
      const apply = (prev: AiChatMessage[]) => {
        const resolved = typeof next === "function" ? next(prev) : next;

        if (persistSessions && activeSessionId) {
          setSessions((prevSessions) => {
            const nextSessions = prevSessions.map((session) =>
              session.id === activeSessionId
                ? {
                    ...session,
                    messages: resolved,
                    updatedAt: Date.now(),
                    summary: buildSessionSummary(resolved) || session.summary,
                  }
                : session,
            );
            const normalized = writeStorage({
              version: 1,
              activeSessionId,
              sessions: nextSessions,
            });
            return normalized?.sessions ?? nextSessions;
          });
        }

        return resolved;
      };

      if (messagesProp === undefined) {
        setInternalMessages((prev) => {
          const resolved = apply(prev);
          onMessagesChange?.(resolved);
          return resolved;
        });
        return;
      }

      const resolved = apply(messagesProp);
      onMessagesChange?.(resolved);
    },
    [
      activeSessionId,
      messagesProp,
      onMessagesChange,
      persistSessions,
      writeStorage,
    ],
  );

  React.useEffect(() => {
    if (!persistSessions) {
      setStorageReady(true);
      return;
    }

    let cancelled = false;

    async function initStorage() {
      let loaded: AiChatStorageState | null = null;

      if (storage === "local" && storageKey) {
        loaded = loadAiChatStorage(storageKey, retentionMs);
      } else if (storage === "remote" && remoteStorage) {
        try {
          loaded = normalizeStorageState(await remoteStorage.load(), retentionMs);
        } catch {
          loaded = null;
        }
      }

      if (cancelled) return;

      if (loaded) {
        const active = loaded.sessions.find((session) => session.id === loaded.activeSessionId);
        setSessions(loaded.sessions);
        setActiveSessionId(loaded.activeSessionId);
        setInternalMessages(active?.messages ?? []);
      } else {
        const session = createEmptySession();
        setSessions([session]);
        setActiveSessionId(session.id);
        setInternalMessages([]);
        writeStorage({
          version: 1,
          activeSessionId: session.id,
          sessions: [session],
        });
      }

      setStorageReady(true);
    }

    void initStorage();

    return () => {
      cancelled = true;
    };
  }, [persistSessions, remoteStorage, retentionMs, storage, storageKey, writeStorage]);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  React.useEffect(() => {
    adjustTextareaHeight();
  }, [adjustTextareaHeight, input]);

  const sendMessage = React.useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage: AiChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      resetTextareaHeight();
      setInternalLoading(true);

      try {
        const result = await onSend?.(trimmed);
        if (typeof result === "string") {
          setMessages((prev) => [
            ...prev,
            { id: `assistant-${Date.now()}`, role: "assistant", content: result },
          ]);
        } else if (result && typeof result === "object") {
          setMessages((prev) => [...prev, result]);
        }
      } finally {
        setInternalLoading(false);
      }
    },
    [isLoading, onSend, resetTextareaHeight, setMessages],
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handlePromptClick = (prompt: AiChatSuggestedPrompt) => {
    void sendMessage(prompt.label);
  };

  const handleCopy = async (messageId: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewSession = () => {
    if (!persistSessions) return;

    const session = createEmptySession();
    applySessionState([session, ...sessions], session.id);
    setInternalMessages([]);
    onMessagesChange?.([]);
    onSessionChange?.(session.id);
    setSessionsOpen(false);
    resetTextareaHeight();
  };

  const handleSelectSession = (sessionId: string) => {
    if (!persistSessions) return;

    const selected = sessions.find((session) => session.id === sessionId);
    if (!selected) return;

    applySessionState(sessions, sessionId);
    setInternalMessages(selected.messages);
    onMessagesChange?.(selected.messages);
    onSessionChange?.(sessionId);
    setSessionsOpen(false);
    resetTextareaHeight();
  };

  const sortedSessions = React.useMemo(
    () => [...sessions].sort((a, b) => b.updatedAt - a.updatedAt),
    [sessions],
  );

  if (!storageReady) {
    return <div className={cn("flex h-full min-h-0 flex-col bg-background", className)} />;
  }

  return (
    <div className={cn("relative flex h-full min-h-0 flex-col bg-background", className)}>
      {onExpand || onClose ? (
        <div className="absolute end-3 top-3 z-10 flex items-center gap-1">
          {onExpand ? (
            <Button
              variant="ghost"
              size="icon"
              className="size-9 bg-background/80 backdrop-blur"
              aria-label={expandLabel}
              onClick={onExpand}
            >
              <Maximize2 className="size-4" />
            </Button>
          ) : null}
          {onClose ? (
            <Button
              variant="ghost"
              size="icon"
              className="size-9 bg-background/80 backdrop-blur"
              aria-label={closeLabel}
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          ) : null}
        </div>
      ) : null}

      <ScrollArea className="h-0 min-h-0 flex-1">
        <div className="mx-auto flex w-full max-w-3xl flex-col px-5 pb-4 pt-12">
          {!hasMessages && !isLoading ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="flex max-w-2xl flex-wrap justify-center gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    className="rounded-full border border-border-soft bg-background px-4 py-2.5 text-body-14 text-foreground shadow-sm transition-colors hover:border-lilac/50 hover:bg-gradient-to-r hover:from-lilac-300/15 hover:to-brand-blue-100/40 hover:text-foreground"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 pb-4">
              {messages.map((message) =>
                message.role === "user" ? (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-xl bg-muted px-4 py-3 text-body-16 text-foreground">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="space-y-3">
                    {message.reasoning ? (
                      <Collapsible>
                        <CollapsibleTrigger className="inline-flex items-center gap-2 text-body-14 text-muted-foreground hover:text-foreground">
                          <Lightbulb className="size-4" aria-hidden />
                          <span>{reasoningLabel}</span>
                          <ChevronRight className="size-4" aria-hidden />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 text-body-14 text-muted-foreground">
                          {message.reasoning}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : null}
                    <div className="text-body-16 text-foreground">{renderBoldText(message.content)}</div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label={copiedId === message.id ? copiedLabel : copyLabel}
                        onClick={() => void handleCopy(message.id, message.content.replace(/\*\*/g, ""))}
                      >
                        <Copy className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8" aria-label={thumbsUpLabel}>
                        <ThumbsUp className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8" aria-label={thumbsDownLabel}>
                        <ThumbsDown className="size-4" />
                      </Button>
                    </div>
                  </div>
                ),
              )}
              {isLoading ? (
                <div className="flex items-center gap-2 text-body-14 text-muted-foreground">
                  <Spinner className="size-4" />
                  <span>{reasoningLabel}…</span>
                </div>
              ) : null}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="shrink-0 bg-background px-5 pb-4 pt-3">
        <div className="mx-auto w-full max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl border border-border-soft bg-background p-4 shadow-[0_-4px_24px_rgba(185,124,255,0.08)] focus-within:border-lilac/40 focus-within:ring-2 focus-within:ring-lilac/20">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={placeholder}
                rows={2}
                style={{ height: MIN_TEXTAREA_HEIGHT }}
                className="w-full resize-none overflow-y-auto bg-transparent text-body-16 text-foreground outline-none placeholder:text-muted-foreground"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage(input);
                  }
                }}
              />
              <div className="mt-3 flex items-end gap-2">
                {persistSessions ? (
                  <Popover open={sessionsOpen} onOpenChange={setSessionsOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-10 shrink-0 rounded-full border border-border-soft"
                        aria-label={sessionHistoryLabel}
                      >
                        <History className="size-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" side="top" className="w-80 p-0">
                      <div className="border-b border-border-soft p-2">
                        <Button
                          type="button"
                          variant="ghost"
                          className="w-full justify-start gap-2"
                          onClick={handleNewSession}
                        >
                          <Plus className="size-4" aria-hidden />
                          {newSessionLabel}
                        </Button>
                      </div>
                      <ScrollArea className="max-h-64">
                        <div className="p-1">
                          {sortedSessions.length === 0 ? (
                            <p className="px-3 py-4 text-body-14 text-muted-foreground">{noSessionsLabel}</p>
                          ) : (
                            sortedSessions.map((session) => {
                              const isActive = session.id === activeSessionId;
                              const label = session.summary || newSessionLabel;

                              return (
                                <button
                                  key={session.id}
                                  type="button"
                                  className={cn(
                                    "flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-start transition-colors hover:bg-muted",
                                    isActive && "bg-muted",
                                  )}
                                  onClick={() => handleSelectSession(session.id)}
                                >
                                  <span className="shrink-0 text-body-14-semibold text-muted-foreground">
                                    {formatSessionAge(session.createdAt)}
                                  </span>
                                  <span className="min-w-0 truncate text-body-14 text-foreground">{label}</span>
                                </button>
                              );
                            })
                          )}
                        </div>
                      </ScrollArea>
                    </PopoverContent>
                  </Popover>
                ) : null}
                <div className="ms-auto">
                  <Button
                    type="submit"
                    size="icon"
                    variant="primary"
                    aria-label={sendLabel}
                    disabled={!input.trim() || isLoading}
                    className="size-10 rounded-xl"
                  >
                    <ArrowUp className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {disclaimer ? (
            <p className="mt-2 text-center text-body-14 text-muted-foreground">
              {disclaimer}{" "}
              {disclaimerLinkLabel ? (
                <button
                  type="button"
                  className="text-brand-blue underline-offset-2 hover:underline"
                  onClick={onDisclaimerLinkClick}
                >
                  {disclaimerLinkLabel}
                </button>
              ) : null}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
