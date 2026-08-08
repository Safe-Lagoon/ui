export type CodeLang = "tsx" | "typescript" | "bash" | "json" | "css" | "javascript";

type WebHighlighter = Awaited<
  ReturnType<(typeof import("shiki/bundle/web"))["createHighlighter"]>
>;

let highlighterPromise: Promise<WebHighlighter> | null = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    const { createHighlighter } = await import("shiki/bundle/web");
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: ["tsx", "typescript", "javascript", "bash", "json", "css"],
    });
  }
  return highlighterPromise;
}

export async function highlightCode(code: string, lang: CodeLang): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    theme: "github-dark",
  });
}
