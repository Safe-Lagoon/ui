"use client";

import { cn } from "@safelagoon/ui";
import { useEffect, useState } from "react";
import { highlightCode, type CodeLang } from "@/lib/highlight-code";

type CodeBlockProps = {
  code: string;
  lang?: CodeLang;
  className?: string;
};

function inferLang(code: string): CodeLang {
  const trimmed = code.trim();
  if (/^(npm|pnpm|npx|yarn)\s/.test(trimmed)) return "bash";
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "json";
  return "tsx";
}

export function CodeBlock({ code, lang, className }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);
  const resolvedLang = lang ?? inferLang(code);
  const trimmedCode = code.trimEnd();

  useEffect(() => {
    let cancelled = false;

    highlightCode(trimmedCode, resolvedLang).then((result) => {
      if (!cancelled) setHtml(result);
    });

    return () => {
      cancelled = true;
    };
  }, [trimmedCode, resolvedLang]);

  if (!html) {
    return (
      <pre
        className={cn(
          "code-block overflow-x-auto rounded-[10px] bg-ink p-4 text-[#eceff1]",
          className,
        )}
      >
        <code>{trimmedCode}</code>
      </pre>
    );
  }

  return (
    <div
      className={cn(
        "code-block overflow-x-auto rounded-[10px] bg-ink p-4 text-[#eceff1]",
        className,
      )}
      // Shiki emits a themed <pre><code> tree.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
