"use client";

import { cn } from "@safelagoon/ui";
import { Check, ChevronRight, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@safelagoon/ui";
import { highlightCode, type CodeLang } from "@/lib/highlight-code";

type CodeBlockProps = {
  code: string;
  lang?: CodeLang;
  className?: string;
  defaultExpanded?: boolean;
};

function inferLang(code: string): CodeLang {
  const trimmed = code.trim();
  if (/^(npm|pnpm|npx|yarn)\s/.test(trimmed)) return "bash";
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "json";
  return "tsx";
}

function CodeContent({
  code,
  html,
  className,
}: {
  code: string;
  html: string | null;
  className?: string;
}) {
  if (!html) {
    return (
      <pre
        className={cn(
          "code-block overflow-x-auto p-4 pt-0 text-[#eceff1]",
          className,
        )}
      >
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className={cn(
        "code-block overflow-x-auto p-4 pt-0 text-[#eceff1]",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function CodeBlock({
  code,
  lang,
  className,
  defaultExpanded = false,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [hasOpened, setHasOpened] = useState(defaultExpanded);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const resolvedLang = lang ?? inferLang(code);
  const trimmedCode = code.trimEnd();
  const lineCount = trimmedCode ? trimmedCode.split("\n").length : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!hasOpened || !trimmedCode) {
      setHtml(null);
      return;
    }

    let cancelled = false;

    highlightCode(trimmedCode, resolvedLang).then((result) => {
      if (!cancelled) setHtml(result);
    });

    return () => {
      cancelled = true;
    };
  }, [trimmedCode, resolvedLang, hasOpened]);

  async function handleCopy(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (!trimmedCode) return;
    await navigator.clipboard.writeText(trimmedCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  const triggerLabel = expanded
    ? "Hide code"
    : mounted && lineCount > 0
      ? `Show code (${lineCount} ${lineCount === 1 ? "line" : "lines"})`
      : "Show code";

  return (
    <Collapsible
      open={expanded}
      onOpenChange={(open) => {
        setExpanded(open);
        if (open) setHasOpened(true);
      }}
      className={cn("group/code relative rounded-[10px] bg-ink", className)}
    >
      <div className="relative flex items-center pe-12">
        <CollapsibleTrigger
          className={cn(
            "flex min-h-10 flex-1 items-center gap-2 px-4 py-2.5 text-start text-body-14 text-[#eceff1]/70",
            "transition-colors hover:text-[#eceff1]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
          )}
        >
          <ChevronRight
            className={cn("size-4 shrink-0 transition-transform duration-200", expanded && "rotate-90")}
            aria-hidden
          />
          <span>{triggerLabel}</span>
        </CollapsibleTrigger>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!trimmedCode}
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "absolute end-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-md",
            "bg-white/10 text-[#eceff1] backdrop-blur-sm transition-colors",
            "hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
            "disabled:pointer-events-none disabled:opacity-40",
          )}
        >
          {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        </button>
      </div>

      <CollapsibleContent className="overflow-hidden">
        {hasOpened && trimmedCode ? (
          <div className="relative border-t border-white/10">
            <CodeContent code={trimmedCode} html={html} />
          </div>
        ) : null}
      </CollapsibleContent>
    </Collapsible>
  );
}
