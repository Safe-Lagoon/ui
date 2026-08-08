"use client";

import * as React from "react";
import {
  ArrowUp,
  ChevronRight,
  Copy,
  Lightbulb,
  Maximize2,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { Spinner } from "../ui/spinner";

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
  className?: string;
}

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
  className,
}: AiChatProps) {
  const [internalMessages, setInternalMessages] = React.useState(defaultMessages);
  const [input, setInput] = React.useState("");
  const [internalLoading, setInternalLoading] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const messages = messagesProp ?? internalMessages;
  const isLoading = isLoadingProp ?? internalLoading;
  const hasMessages = messages.length > 0;

  const setMessages = React.useCallback(
    (next: AiChatMessage[] | ((prev: AiChatMessage[]) => AiChatMessage[])) => {
      if (messagesProp === undefined) {
        setInternalMessages((prev) => {
          const resolved = typeof next === "function" ? next(prev) : next;
          onMessagesChange?.(resolved);
          return resolved;
        });
        return;
      }

      const resolved = typeof next === "function" ? next(messagesProp) : next;
      onMessagesChange?.(resolved);
    },
    [messagesProp, onMessagesChange],
  );

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
    [isLoading, onSend, setMessages],
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handlePromptClick = (prompt: AiChatSuggestedPrompt) => {
    setInput(prompt.label);
    void sendMessage(prompt.label);
  };

  const handleCopy = async (messageId: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={cn("relative flex h-full min-h-0 flex-col bg-background", className)}>
      {onExpand || onClose ? (
        <div className="absolute end-3 top-3 z-10 flex items-center gap-1">
          {onExpand ? (
            <Button variant="ghost" size="icon" className="size-9 bg-background/80 backdrop-blur" aria-label={expandLabel} onClick={onExpand}>
              <Maximize2 className="size-4" />
            </Button>
          ) : null}
          {onClose ? (
            <Button variant="ghost" size="icon" className="size-9 bg-background/80 backdrop-blur" aria-label={closeLabel} onClick={onClose}>
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
                className="min-h-[56px] w-full resize-none bg-transparent text-body-16 text-foreground outline-none placeholder:text-muted-foreground"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage(input);
                  }
                }}
              />
              <div className="mt-3 flex items-center justify-end">
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
