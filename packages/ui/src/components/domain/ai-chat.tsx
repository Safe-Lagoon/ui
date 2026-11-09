"use client";

import * as React from "react";
import {
  ArrowUp,
  ChevronRight,
  Copy,
  History,
  Lightbulb,
  Maximize2,
  Mic,
  Plus,
  Square,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Spinner } from "../ui/spinner";
import {
  formatAiChatDayName,
  formatAiChatDayNames,
  parseAiChatDayToken,
} from "./ai-chat-days";
import {
  inferAiChatReplies,
  isApproveReplyChip,
  normalizeReplyChip,
  renderAiChatMarkdown,
  stripAiChatReplies,
} from "./ai-chat-markdown";
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
import {
  useAiChatVoice,
  type AiChatVoiceCopy,
} from "./ai-chat-voice";

export interface AiChatSuggestedPrompt {
  id: string;
  label: string;
  category?: string;
  categoryLabel?: string;
  categoryIcon?: React.ReactNode;
}

export interface AiChatQuickAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface AiChatTool {
  id: string;
  name?: string;
  status?: string;
  label?: string;
}

export interface AiChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  reasoning?: string;
  replies?: string[];
  tools?: AiChatTool[];
}

export interface AiChatSendOptions {
  onDelta?: (delta: string) => void;
  onTool?: (tool: AiChatTool) => void;
}

export type AiChatSendResult = string | (AiChatMessage & { restoreDraft?: boolean }) | void;

export interface AiChatFeedback {
  rating: "up" | "down";
  request: string;
  response: string;
}

export interface AiChatApproval {
  title: string;
  body?: string;
  /** String rows render as a bidi-safe list. React nodes (schedule cards) render in the child slot. */
  preview?: React.ReactNode[];
  confirmLabel: string;
  dismissLabel?: string;
  busy?: boolean;
  confirmDisabled?: boolean;
  onConfirm: () => void;
  onDismiss?: () => void;
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
  onSend?: (message: string, options: AiChatSendOptions) => void | Promise<AiChatSendResult>;
  onApprove?: () => void;
  onTranscribe?: (audio: Blob) => Promise<string>;
  onQuickAction?: (actionId: string) => void;
  onFeedback?: (feedback: AiChatFeedback) => void;
  approval?: AiChatApproval | null;
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
  emptyTitle?: string;
  emptyDescription?: string;
  voiceLabel?: string;
  voiceStopLabel?: string;
  voiceCancelLabel?: string;
  clearAllSessionsLabel?: string;
  clearAllConfirmTitle?: string;
  clearAllConfirmDescription?: string;
  clearAllConfirmLabel?: string;
  clearAllCancelLabel?: string;
  clearAllErrorLabel?: string;
  deleteSessionLabel?: string;
  voiceCopy?: AiChatVoiceCopy;
  /** Where session history is persisted. `local` uses browser localStorage; `remote` uses `remoteStorage`. */
  storage?: "local" | "remote";
  /** Required when `storage="remote"`. Wire to your backend API. */
  remoteStorage?: AiChatRemoteStorage;
  /** localStorage key when `storage="local"`. Pass `false` to disable persistence. */
  sessionStorageKey?: string | false;
  sessionRetentionDays?: number;
  onSessionChange?: (sessionId: string) => void;
  retryLabel?: string;
  /** Status line rendered on the in-flight assistant turn (and instead of the spinner while set). */
  statusSlot?: React.ReactNode;
  className?: string;
}

export type {
  AiChatRemoteStorage,
  AiChatStorageState,
  StoredAiChatSession,
} from "./ai-chat-storage";
export type { AiChatVoiceCopy } from "./ai-chat-voice";
export {
  formatAiChatDayName,
  formatAiChatDayNames,
  parseAiChatDayToken,
};

const MIN_TEXTAREA_HEIGHT = 56;
const MAX_TEXTAREA_HEIGHT = 200;
const BUBBLE_CLASS =
  "ai-chat-bubble block min-w-0 max-w-full overflow-x-auto overflow-y-hidden text-body-16 text-foreground [&_p]:my-2 first:[&_p]:mt-0 last:[&_p]:mb-0 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:ps-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:ps-5 [&_table]:my-2.5 [&_table]:w-max [&_table]:border-collapse [&_table]:text-[13px] [&_th]:whitespace-nowrap [&_td]:whitespace-nowrap [&_th]:border [&_td]:border [&_th]:border-border-soft [&_td]:border-border-soft [&_th]:bg-background [&_th]:px-2.5 [&_th]:py-1.5 [&_th]:text-start [&_th]:font-semibold [&_td]:px-2.5 [&_td]:py-1.5 [&_pre]:w-max [&_img]:max-w-full [&_img]:rounded-xl [&_blockquote]:my-2 [&_blockquote]:border-s-2 [&_blockquote]:border-border-soft [&_blockquote]:ps-3 [&_blockquote]:text-muted-foreground";

function toAssistantMessage(
  content: string,
  extra?: Partial<AiChatMessage>,
): AiChatMessage {
  const parsed = stripAiChatReplies(content);
  return {
    id: extra?.id ?? `assistant-${Date.now()}`,
    role: "assistant",
    content: parsed.text,
    replies:
      extra?.replies ?? (parsed.replies.length ? parsed.replies : inferAiChatReplies(parsed.text)),
    tools: extra?.tools,
    reasoning: extra?.reasoning,
  };
}

function isPreviewLeaf(node: React.ReactNode): node is string | number {
  return typeof node === "string" || typeof node === "number";
}

export function AiChat({
  placeholder = "Ask about screen time, apps, or rules…",
  disclaimer,
  disclaimerLinkLabel,
  onDisclaimerLinkClick,
  suggestedPrompts = [],
  quickActions = [],
  messages: messagesProp,
  defaultMessages = [],
  onMessagesChange,
  isLoading: isLoadingProp,
  onSend,
  onApprove,
  onTranscribe,
  onQuickAction,
  onFeedback,
  approval = null,
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
  emptyTitle = "What can I help with?",
  emptyDescription = "Ask about a child's screen time, apps, or rules.",
  voiceLabel = "Start voice prompt",
  voiceStopLabel = "Stop and send voice prompt",
  voiceCancelLabel = "Cancel",
  clearAllSessionsLabel = "Clear all chats",
  clearAllConfirmTitle,
  clearAllConfirmDescription = "This will permanently delete every chat. This cannot be undone.",
  clearAllConfirmLabel = "Delete all",
  clearAllCancelLabel = "Cancel",
  clearAllErrorLabel = "Could not delete chats. Your history is unchanged.",
  deleteSessionLabel = "Delete chat",
  voiceCopy,
  storage = "local",
  remoteStorage,
  sessionStorageKey = DEFAULT_AI_CHAT_STORAGE_KEY,
  sessionRetentionDays = 30,
  onSessionChange,
  retryLabel,
  statusSlot = null,
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
  const [clearAllOpen, setClearAllOpen] = React.useState(false);
  const [clearAllError, setClearAllError] = React.useState<string | null>(null);
  const clearAllCancelRef = React.useRef<HTMLButtonElement>(null);
  const promptCategories = React.useMemo(() => {
    const order: string[] = [];
    const grouped = new Map<
      string,
      { id: string; label: string; icon: React.ReactNode; prompts: AiChatSuggestedPrompt[] }
    >();
    for (const prompt of suggestedPrompts) {
      const category = prompt.category;
      if (!category) continue;
      if (!grouped.has(category)) {
        grouped.set(category, {
          id: category,
          label: prompt.categoryLabel || category,
          icon: prompt.categoryIcon ?? null,
          prompts: [],
        });
        order.push(category);
      }
      grouped.get(category)!.prompts.push(prompt);
    }
    return order.map((id) => grouped.get(id)!);
  }, [suggestedPrompts]);
  const [activeCategoryId, setActiveCategoryId] = React.useState("");
  const [sessions, setSessions] = React.useState<StoredAiChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = React.useState("");
  const [storageReady, setStorageReady] = React.useState(!persistSessions);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const pendingAssistantId = React.useRef<string | null>(null);

  const messages = messagesProp ?? internalMessages;
  const isLoading = isLoadingProp ?? internalLoading;
  const hasApproval = !!approval;
  const hasMessages = messages.length > 0;
  const hasCategories = promptCategories.length > 0;
  const activeCategory = promptCategories.find((category) => category.id === activeCategoryId) ?? null;
  const showQuickActions = quickActions.length > 0 && !isLoading && !hasApproval && !hasCategories;

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
      const nextId = purged.some((session) => session.id === nextActiveSessionId)
        ? nextActiveSessionId
        : (purged[0]?.id ?? nextActiveSessionId);

      writeStorage({
        version: 1,
        activeSessionId: nextId,
        sessions: purged,
      });

      setSessions(purged);
      setActiveSessionId(nextId);
      return { sessions: purged, activeSessionId: nextId };
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
    [activeSessionId, messagesProp, onMessagesChange, persistSessions, writeStorage],
  );

  const patchMessage = React.useCallback(
    (id: string, updater: (message: AiChatMessage) => AiChatMessage) => {
      setMessages((prev) => prev.map((message) => (message.id === id ? updater(message) : message)));
    },
    [setMessages],
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
          loaded = normalizeStorageState(await remoteStorage.load(), Number.POSITIVE_INFINITY);
        } catch {
          loaded = null;
        }
      }

      if (cancelled) return;

      if (loaded) {
        const session = createEmptySession();
        const kept = loaded.sessions.filter((item) => item.messages.length > 0 || item.summary);
        if (cancelled) return;
        setSessions([session, ...kept]);
        setActiveSessionId(session.id);
        setInternalMessages([]);
        onSessionChange?.(session.id);
      } else {
        const session = createEmptySession();
        setSessions([session]);
        setActiveSessionId(session.id);
        setInternalMessages([]);
        onSessionChange?.(session.id);
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
    // Match 0.4.0: session bootstrap is keyed on storage identity, not the session callback.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- vendor parity
  }, [persistSessions, remoteStorage, retentionMs, storage, storageKey, writeStorage]);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, approval]);

  React.useEffect(() => {
    adjustTextareaHeight();
  }, [adjustTextareaHeight, input]);

  const sendMessage = React.useCallback(
    async (text: string, options?: { reuseAssistant?: boolean }) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading || hasApproval) return;

      const reuseAssistant = !!options?.reuseAssistant;
      let assistantId: string;
      let userId: string | undefined;

      if (reuseAssistant) {
        assistantId =
          [...messages].reverse().find((message) => message.role === "assistant")?.id ??
          `assistant-${Date.now()}`;
        pendingAssistantId.current = assistantId;
        setMessages((prev) => {
          const blank: AiChatMessage = { id: assistantId, role: "assistant", content: "", tools: [] };
          return prev.some((message) => message.id === assistantId)
            ? prev.map((message) => (message.id === assistantId ? blank : message))
            : [...prev, blank];
        });
      } else {
        const userMessage: AiChatMessage = {
          id: `user-${Date.now()}`,
          role: "user",
          content: trimmed,
        };
        userId = userMessage.id;
        assistantId = `assistant-${Date.now() + 1}`;
        pendingAssistantId.current = assistantId;
        const assistantMessage: AiChatMessage = {
          id: assistantId,
          role: "assistant",
          content: "",
          tools: [],
        };
        setMessages((prev) => [...prev, userMessage, assistantMessage]);
        setInput("");
        resetTextareaHeight();
      }

      setInternalLoading(true);

      try {
        const result = await onSend?.(trimmed, {
          onDelta: (delta) => {
            patchMessage(assistantId, (message) => ({
              ...message,
              content: `${message.content}${delta}`,
            }));
          },
          onTool: (tool) => {
            patchMessage(assistantId, (message) => {
              const tools = [...(message.tools ?? [])];
              const index = tools.findIndex((item) => item.id === tool.id);
              if (index >= 0) tools[index] = tool;
              else tools.push(tool);
              return { ...message, tools };
            });
          },
        });

        if (typeof result === "string") {
          patchMessage(assistantId, (message) =>
            toAssistantMessage(result, { id: assistantId, tools: message.tools }),
          );
        } else if (result && typeof result === "object") {
          const restoreDraft = !!result.restoreDraft;
          setMessages((prev) => {
            let next = prev.map((message) =>
              message.id === assistantId
                ? toAssistantMessage(result.content, {
                    ...result,
                    id: assistantId,
                    tools: result.tools ?? message.tools,
                    replies: restoreDraft ? [] : result.replies,
                  })
                : message,
            );
            if (restoreDraft && userId) next = next.filter((message) => message.id !== userId);
            return next;
          });
          if (restoreDraft) setInput(text);
        } else {
          patchMessage(assistantId, (message) =>
            toAssistantMessage(message.content, { id: assistantId, tools: message.tools }),
          );
        }
      } finally {
        pendingAssistantId.current = null;
        setInternalLoading(false);
      }
    },
    [hasApproval, isLoading, messages, onSend, patchMessage, resetTextareaHeight, setMessages],
  );

  const voice = useAiChatVoice({
    enabled: !isLoading && !hasApproval,
    input,
    onTranscribe,
    copy: voiceCopy,
    onSubmit: (text) => {
      setInput(text);
      void sendMessage(text);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handlePromptClick = (prompt: AiChatSuggestedPrompt) => {
    setActiveCategoryId("");
    void sendMessage(prompt.label);
  };

  const handleReplyClick = (label: string) => {
    if (isApproveReplyChip(label)) {
      onApprove?.();
      return;
    }
    if (retryLabel && label.trim() === String(retryLabel).trim()) {
      const lastUser = [...messages].reverse().find((message) => message.role === "user" && message.content);
      if (lastUser) void sendMessage(lastUser.content, { reuseAssistant: true });
      return;
    }
    void sendMessage(normalizeReplyChip(label));
  };

  const handleQuickAction = (action: AiChatQuickAction) => {
    onQuickAction?.(action.id);
    void sendMessage(action.label);
  };

  const feedbackPayload = (message: AiChatMessage): Omit<AiChatFeedback, "rating"> => {
    const index = messages.findIndex((item) => item.id === message.id);
    let request = "";
    for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
      if (messages[cursor]?.role === "user") {
        request = messages[cursor]!.content;
        break;
      }
    }
    return { request, response: message.content };
  };

  const handleCopy = async (messageId: string, content: string) => {
    await navigator.clipboard.writeText(stripAiChatReplies(content).text.replace(/\*\*/g, ""));
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

  const handleSelectSession = async (sessionId: string) => {
    if (!persistSessions) return;
    let selected = sessions.find((session) => session.id === sessionId);
    if (!selected) return;

    if (selected.messages.length === 0 && remoteStorage?.loadSession) {
      try {
        const loaded = await remoteStorage.loadSession(sessionId);
        if (loaded) {
          selected = loaded;
          setSessions((prev) => prev.map((session) => (session.id === sessionId ? loaded : session)));
        }
      } catch {
        /* keep stub */
      }
    }

    applySessionState(sessions, sessionId);
    setInternalMessages(selected.messages);
    onMessagesChange?.(selected.messages);
    onSessionChange?.(sessionId);
    setSessionsOpen(false);
    resetTextareaHeight();
  };

  const handleDeleteSession = async (event: React.MouseEvent, sessionId: string) => {
    event.stopPropagation();
    if (!persistSessions) return;
    try {
      await remoteStorage?.deleteSession?.(sessionId);
    } catch {
      /* local list still updates */
    }

    const remaining = sessions.filter((session) => session.id !== sessionId);
    if (remaining.length === 0) {
      const session = createEmptySession();
      applySessionState([session], session.id);
      setInternalMessages([]);
      onMessagesChange?.([]);
      onSessionChange?.(session.id);
      return;
    }

    const nextActiveId = sessionId === activeSessionId ? remaining[0]!.id : activeSessionId;
    applySessionState(remaining, nextActiveId);
    if (sessionId === activeSessionId) {
      const next = remaining.find((session) => session.id === nextActiveId);
      setInternalMessages(next?.messages ?? []);
      onMessagesChange?.(next?.messages ?? []);
      onSessionChange?.(nextActiveId);
    }
  };

  const handleClearAll = async () => {
    if (!persistSessions) return;
    try {
      if ((await remoteStorage?.clearAll?.()) === false) throw new Error("clearAll");
    } catch {
      setClearAllError(clearAllErrorLabel);
      return;
    }

    setClearAllError(null);
    const session = createEmptySession();
    applySessionState([session], session.id);
    setInternalMessages([]);
    onMessagesChange?.([]);
    onSessionChange?.(session.id);
    setSessionsOpen(false);
  };

  const requestClearAll = () => {
    if (!persistSessions) return;
    setSessionsOpen(false);
    setClearAllOpen(true);
  };

  const visibleSessions = React.useMemo(
    () =>
      [...sessions]
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .filter((session) => session.messages.length > 0 || session.summary),
    [sessions],
  );

  const previewLeaves = approval?.preview?.filter(isPreviewLeaf) ?? [];
  const previewCards = approval?.preview?.filter((item) => !isPreviewLeaf(item)) ?? [];

  if (!storageReady) {
    return <div className={cn("flex h-full min-h-0 flex-col", className)} />;
  }

  return (
    <div className={cn("relative flex h-full min-h-0 flex-col overflow-hidden", className)}>
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

      {!hasMessages && !isLoading ? (
        <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center px-6 py-6">
          <div className="w-full max-w-[560px] text-center">
            {emptyTitle ? (
              <h1 className="text-[28px] font-semibold tracking-tight text-brand-blue">{emptyTitle}</h1>
            ) : null}
            {emptyDescription ? (
              <p className="mt-2 text-body-16 text-muted-foreground">{emptyDescription}</p>
            ) : null}
            {hasCategories ? null : (
              <div className="hidden w-full grid-cols-1 gap-2.5 sm:grid sm:grid-cols-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    className="w-full rounded-2xl border border-border-soft bg-background px-4 py-3.5 text-start text-body-14 text-foreground transition-colors hover:border-lilac/50 hover:bg-lilac-300/10"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <ScrollArea className="ai-chat-thread h-0 min-h-0 min-w-0 w-full flex-1">
          <div className="flex w-full min-w-0 max-w-full flex-col px-6 pb-4 pt-4">
            <div className="flex w-full min-w-0 max-w-full flex-col gap-6 pb-4">
              {messages.map((message) =>
                message.role === "user" ? (
                  <div key={message.id} className="flex min-w-0 justify-end">
                    <div className="max-w-[85%] break-words rounded-xl bg-lilac px-4 py-3 text-body-16 text-white">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="min-w-0 max-w-full space-y-3">
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
                    {!message.content && statusSlot ? statusSlot : null}
                    {message.content ? (
                      <div
                        className={BUBBLE_CLASS}
                        dir="auto"
                        dangerouslySetInnerHTML={{ __html: renderAiChatMarkdown(message.content) }}
                      />
                    ) : null}
                    {message.replies && message.replies.length > 0 && !isLoading ? (
                      <div className="flex flex-wrap gap-1.5">
                        {message.replies.map((reply) => (
                          <Button
                            key={reply}
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-full px-3 text-[13px] font-semibold"
                            onClick={() => handleReplyClick(reply)}
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    ) : null}
                    {message.content ? (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          aria-label={copiedId === message.id ? copiedLabel : copyLabel}
                          onClick={() => void handleCopy(message.id, message.content)}
                        >
                          <Copy className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          aria-label={thumbsUpLabel}
                          onClick={() => onFeedback?.({ rating: "up", ...feedbackPayload(message) })}
                        >
                          <ThumbsUp className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          aria-label={thumbsDownLabel}
                          onClick={() => onFeedback?.({ rating: "down", ...feedbackPayload(message) })}
                        >
                          <ThumbsDown className="size-4" />
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ),
              )}
              {approval ? (
                <div
                  className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50 p-4"
                  data-slot="chat-approval"
                >
                  <p className="text-body-14-semibold text-foreground" dir="auto">
                    {approval.title}
                  </p>
                  {approval.body ? (
                    <p className="text-body-14 text-muted-foreground" dir="auto">
                      {approval.body}
                    </p>
                  ) : null}
                  {previewLeaves.length > 0 ? (
                    <ul className="list-disc space-y-1 ps-5 text-body-14 text-muted-foreground">
                      {previewLeaves.map((item) => (
                        <li key={String(item)} dir="auto">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {previewCards.map((card, index) => (
                    <div key={index} data-slot="chat-schedule-card-slot">
                      {card}
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={approval.busy || approval.confirmDisabled}
                      onClick={approval.onConfirm}
                    >
                      {approval.confirmLabel}
                    </Button>
                    {approval.onDismiss ? (
                      <Button
                        variant="tertiary"
                        size="sm"
                        disabled={approval.busy}
                        onClick={approval.onDismiss}
                      >
                        {approval.dismissLabel ?? "Dismiss"}
                      </Button>
                    ) : null}
                  </div>
                </div>
              ) : null}
              {isLoading && !approval && !statusSlot ? (
                <div className="flex items-center gap-2 text-body-14 text-muted-foreground">
                  <Spinner className="size-4" />
                  <span>{reasoningLabel}…</span>
                </div>
              ) : null}
              <div ref={bottomRef} />
            </div>
          </div>
        </ScrollArea>
      )}

      {clearAllError ? (
        <p className="px-6 pb-1 text-body-14 text-destructive" role="alert">
          {clearAllError}
        </p>
      ) : null}

      <div className="shrink-0 px-6 pb-4 pt-2">
        <div className="w-full">
          {hasCategories && !voice.recording ? (
            <div className="mb-3 flex w-full flex-col items-stretch gap-2">
              {activeCategory ? (
                <div
                  className="overflow-hidden rounded-2xl border border-border-soft bg-background text-start shadow-[0_1px_2px_rgba(45,44,50,0.06)]"
                  data-slot="ai-chat-prompt-list"
                >
                  {activeCategory.prompts.map((prompt, index) => (
                    <button
                      key={prompt.id}
                      type="button"
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-3.5 text-start text-[15px] text-foreground transition-colors hover:bg-muted/70",
                        index > 0 && "border-t border-border-soft",
                      )}
                      onClick={() => handlePromptClick(prompt)}
                    >
                      <span className="min-w-0 flex-1">{prompt.label}</span>
                      <ArrowUp className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    </button>
                  ))}
                </div>
              ) : null}
              <div className="flex flex-wrap justify-start gap-2" data-slot="ai-chat-prompt-categories">
                {promptCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={category.id === activeCategoryId}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-body-14 transition-colors",
                      category.id === activeCategoryId
                        ? "border-border bg-muted font-medium text-foreground"
                        : "border-border-soft bg-background text-foreground hover:bg-muted",
                    )}
                    onClick={() =>
                      setActiveCategoryId(category.id === activeCategoryId ? "" : category.id)
                    }
                  >
                    {category.icon ? (
                      <span className="inline-flex [&_svg]:size-3.5" aria-hidden>
                        {category.icon}
                      </span>
                    ) : null}
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {showQuickActions && !voice.recording ? (
            <div className="mb-3 flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  className="rounded-full border border-border-soft bg-background px-3 py-1.5 text-body-14 text-foreground transition-colors hover:border-lilac/50 hover:bg-muted"
                  onClick={() => handleQuickAction(action)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          ) : null}

          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl border border-border-soft bg-background p-4 shadow-[0_-4px_24px_rgba(185,124,255,0.08)] focus-within:border-lilac/40 focus-within:ring-2 focus-within:ring-lilac/20">
              {voice.recording ? (
                <div className="space-y-2" data-slot="chat-voice-panel">
                  <div className="flex items-center gap-2">
                    <span className="size-2 animate-pulse rounded-full bg-brand-blue" aria-hidden />
                    <span className="text-body-14-semibold text-foreground">{voice.status}</span>
                    <span className="text-body-14 text-muted-foreground">{voice.timer}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="ms-auto size-8"
                      aria-label={voiceCancelLabel}
                      onClick={() => voice.cancel()}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                  <canvas ref={voice.canvasRef} className="h-[68px] w-full" aria-hidden />
                  <p className="text-body-14 text-muted-foreground">{voice.live}</p>
                </div>
              ) : (
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
              )}
              {voice.error ? (
                <p className="mt-2 text-body-14 text-destructive">{voice.error}</p>
              ) : null}
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
                          {visibleSessions.length === 0 ? (
                            <p className="px-3 py-4 text-body-14 text-muted-foreground">
                              {noSessionsLabel}
                            </p>
                          ) : (
                            visibleSessions.map((session) => {
                              const isActive = session.id === activeSessionId;
                              const label = session.summary || newSessionLabel;
                              return (
                                <div
                                  key={session.id}
                                  className={cn(
                                    "flex w-full items-center gap-1 rounded-[10px] pe-1 transition-colors hover:bg-muted",
                                    isActive && "bg-muted",
                                  )}
                                >
                                  <button
                                    type="button"
                                    className="min-w-0 flex-1 px-3 py-2.5 text-start"
                                    onClick={() => void handleSelectSession(session.id)}
                                  >
                                    <span className="block truncate text-body-14 text-foreground">
                                      {label}
                                    </span>
                                    <span className="text-body-14 text-muted-foreground">
                                      {formatSessionAge(session.updatedAt)}
                                    </span>
                                  </button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="size-8 shrink-0"
                                    aria-label={deleteSessionLabel}
                                    onClick={(event) => void handleDeleteSession(event, session.id)}
                                  >
                                    <Trash2 className="size-3.5" />
                                  </Button>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </ScrollArea>
                      {visibleSessions.length > 0 ? (
                        <div className="border-t border-border-soft p-2">
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full justify-start text-destructive hover:text-destructive"
                            onClick={() => void requestClearAll()}
                          >
                            {clearAllSessionsLabel}
                          </Button>
                        </div>
                      ) : null}
                    </PopoverContent>
                  </Popover>
                ) : null}
                <div className="ms-auto flex items-center gap-2">
                  {voice.supported ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-10 shrink-0 rounded-full border border-border-soft"
                      aria-label={voice.recording ? voiceStopLabel : voiceLabel}
                      aria-pressed={voice.recording}
                      disabled={!voice.supported || isLoading || hasApproval || voice.busy}
                      onClick={() => voice.toggle()}
                    >
                      {voice.recording ? (
                        <Square className="size-3.5 fill-current" />
                      ) : (
                        <Mic className="size-4" />
                      )}
                    </Button>
                  ) : null}
                  <Button
                    type="submit"
                    size="icon"
                    variant="primary"
                    aria-label={sendLabel}
                    disabled={!input.trim() || isLoading || hasApproval || voice.recording}
                    className="size-10 rounded-full"
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

      <Dialog open={clearAllOpen} onOpenChange={setClearAllOpen}>
        <DialogContent
          className="[&>button:last-child]:end-4 [&>button:last-child]:right-auto [&>button:last-child]:start-auto"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            clearAllCancelRef.current?.focus();
          }}
        >
          <DialogHeader className="text-start sm:text-start">
            <DialogTitle>{clearAllConfirmTitle ?? clearAllSessionsLabel}</DialogTitle>
            <DialogDescription>{clearAllConfirmDescription}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              ref={clearAllCancelRef}
              type="button"
              variant="outline"
              onClick={() => setClearAllOpen(false)}
            >
              {clearAllCancelLabel}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setClearAllOpen(false);
                void handleClearAll();
              }}
            >
              {clearAllConfirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
