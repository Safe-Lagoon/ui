import { marked } from "marked";
import DOMPurify from "dompurify";

const REPLIES_BLOCK = /<replies\b[^>]*>[\s\S]*?<\/replies>/gi;
const REPLIES_UNCLOSED = /<replies\b[^>]*>[\s\S]*$/i;
const IMAGE_EXT = /\.(avif|gif|jpe?g|png|webp)$/i;
const MD_IMAGE = /^!\[[^\]]*\]\([^)]*\)$/;

/** Presigned AI Shield screenshots only. Host match is exact; path must continue past prefix. */
export const SCREENSHOT_ORIGINS = [
  { host: "safelagoon-gallery.s3.amazonaws.com", pathPrefix: "/" },
  { host: "safelagoon-gallery.s3.eu-west-1.amazonaws.com", pathPrefix: "/" },
  { host: "s3.amazonaws.com", pathPrefix: "/safelagoon-gallery/" },
  { host: "s3.eu-west-1.amazonaws.com", pathPrefix: "/safelagoon-gallery/" },
] as const;

let markedConfigured = false;

function parseHttpUrl(value: string): URL | null {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export function isAllowedScreenshotUrl(raw: unknown): boolean {
  const href =
    typeof raw === "string" ? raw : raw instanceof URL ? raw.href : "";
  const url = parseHttpUrl(href);
  if (!url || url.protocol !== "https:" || url.username || url.password || url.port) return false;
  if (!IMAGE_EXT.test(url.pathname)) return false;

  const host = url.hostname.toLowerCase();
  const path = url.pathname;
  return SCREENSHOT_ORIGINS.some(
    (entry) =>
      host === entry.host.toLowerCase() &&
      path.startsWith(entry.pathPrefix) &&
      path.length > entry.pathPrefix.length,
  );
}

function escapeAttr(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeText(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderShot(href: string, alt: string) {
  const url = parseHttpUrl(href);
  if (!url) return "";
  const safeHref = escapeAttr(url.href);
  return `<a class="shot" href="${safeHref}" target="_blank" rel="noopener noreferrer"><img src="${safeHref}" alt="${escapeAttr(alt || "Screenshot")}" loading="lazy" referrerpolicy="no-referrer"></a>`;
}

function stripTags(value: string) {
  return String(value || "").replace(/<[^>]+>/g, "");
}

function markdownAlt(value: string) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return undefined;
  const match = trimmed.match(/^!\[([^\]]*)\]\([^)]*\)$/);
  if (match) return match[1]?.trim() || undefined;
  if (/^<a\b[^>]*>[\s\S]*<\/a>$/.test(trimmed) || /^<img\b[^>]*\/?>$/.test(trimmed)) {
    const alt = trimmed.match(/\balt="([^"]*)"/)?.[1];
    const fallback = stripTags(trimmed).trim();
    return alt || fallback || undefined;
  }
}

function linkLabel(value: string) {
  const text = String(value ?? "");
  if (MD_IMAGE.test(text.trim())) return markdownAlt(text) || "Open link";
  return markdownAlt(text) || stripTags(text).trim() || text.trim() || "Open link";
}

function renderLink(href: string, label: string) {
  const url = parseHttpUrl(href);
  const safeLabel = escapeText(label || "Open link");
  if (!url) return safeLabel;
  return `<a class="ai-chat-md-link" href="${escapeAttr(url.href)}" target="_blank" rel="noopener noreferrer">${safeLabel}</a>`;
}

function configureMarked() {
  if (markedConfigured) return;
  marked.use({
    gfm: true,
    breaks: true,
    renderer: {
      paragraph({ tokens }) {
        return `<p dir="auto">${this.parser.parseInline(tokens)}</p>\n`;
      },
      image({ href, text }) {
        return isAllowedScreenshotUrl(href) ? renderShot(href, text) : renderLink(href, text || "Open link");
      },
      link({ href, text }) {
        const label = linkLabel(text);
        return isAllowedScreenshotUrl(href) ? renderShot(href, label) : renderLink(href, label);
      },
    },
  });
  markedConfigured = true;
}

function fallbackHtml(value: string) {
  return `<p dir="auto">${escapeText(value || "").replace(/\n/g, "<br>")}</p>`;
}

export function parseReplies(text: string) {
  const replies: string[] = [];
  const seen = new Set<string>();
  const source = String(text || "");

  source.replace(/<replies\b[^>]*>([\s\S]*?)<\/replies>/gi, (_match, body: string) => {
    String(body)
      .split(/\r?\n/)
      .forEach((line) => {
        const cleaned = String(line || "")
          .replace(/^[\s*`\-]+/, "")
          .replace(/[`*]+$/g, "")
          .trim();
        if (!cleaned || cleaned.length > 40) return;
        const key = cleaned.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        replies.push(cleaned);
      });
    return "";
  });

  return {
    text: source
      .replace(REPLIES_BLOCK, "")
      .replace(REPLIES_UNCLOSED, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/^\s+|\s+$/g, ""),
    replies: replies.slice(0, 4),
  };
}

function trailingQuestion(content: string) {
  return (
    String(content || "")
      .replace(/\s+/g, " ")
      .trim()
      .match(/([^.!?][^?!]*)\?\s*$/)?.[1]
      ?.trim() ?? ""
  );
}

function isWhQuestion(question: string) {
  return (
    !/^\s*how about\b/.test(question) &&
    /^\s*(what|which|who|whom|whose|when|where|why|how)\b/.test(question)
  );
}

export function asksForOk(text: string) {
  const source = String(text || "").toLowerCase();
  if (!source) return false;
  if (
    /\breply\s+ok\b/.test(source) ||
    /\b(type|say|press|tap|send|respond(?:\s+with)?)\s+ok\b/.test(source) ||
    /\bok\b.{0,60}\b(continue|proceed|confirm)\b/.test(source) ||
    /\b(continue|proceed|confirm).{0,60}\bok\b/.test(source) ||
    /\b(shall|should|can|may) i proceed\b/.test(source) ||
    /\b(want me to|shall i|should i) (go ahead|continue|proceed)\b/.test(source) ||
    /\bgo ahead\?/.test(source)
  ) {
    return true;
  }

  const question = trailingQuestion(source).toLowerCase();
  if (!question || isWhQuestion(question)) return false;

  return (
    /\b(add|apply|create|set|enable|disable|delete|remove|lock|unlock|block|unblock|save|update|change|switch|keep|use)\s+(this|these|that|them|it)\b/.test(
      question,
    ) ||
    /\b(shall|should)\s+i\b/.test(question) ||
    /\b(can|may)\s+i\s+(proceed|go ahead|add|apply|create|delete|remove|lock|unlock|block|enable|disable|set|change|update|save)\b/.test(
      question,
    ) ||
    /\b(want|need|like)\s+me\s+to\b/.test(question) ||
    /\bdo you (want|need|like)\b/.test(question) ||
    /\b(does|is|are) (this|that|it|these)\b/.test(question) ||
    /\b(looks?|sounds?) (good|right|ok|okay|fine)\b/.test(question) ||
    /\b(work for you|make sense|all (good|set)|ready to|go ahead|proceed|confirm)\b/.test(question) ||
    /\b(ok|okay) to\b/.test(question)
  );
}

export function asksForApprove(text: string) {
  const source = String(text || "").toLowerCase();
  if (!source) return false;
  return (
    /\breply\s+approve\b/.test(source) ||
    /\b(type|say|press|tap|send|respond(?:\s+with)?)\s+approve\b/.test(source) ||
    /\bplease approve\b/.test(source) ||
    /\bapprove (this|the|it)\b/.test(source)
  );
}

function choiceReplies(content: string) {
  const question =
    String(content || "")
      .replace(/\s+/g, " ")
      .trim()
      .match(/([^.!?\n][^!?\n]*)\?\s*$/)?.[1]
      ?.trim() ?? "";
  if (!question) return [];

  const options = (question.split(/[:—–]\s*/).pop()?.trim() ?? "")
    .split(/\s*,\s*|\s+\bor\b\s+/i)
    .map((part) => part.replace(/^[\s"'“]+|[\s"'”.]+$/g, "").trim())
    .filter(Boolean);

  if (
    options.length < 2 ||
    options.length > 4 ||
    options.some((part) => part.length > 28 || part.split(/\s+/).length > 3) ||
    options.some((part) =>
      /\b(what|which|who|when|where|why|how|would|should|could|please|like|want)\b/i.test(part),
    )
  ) {
    return [];
  }

  return options;
}

export function fallbackReplies(text: string) {
  if (asksForApprove(text)) return ["Reply Approve"];
  if (asksForOk(text)) return ["Reply OK"];
  return choiceReplies(text);
}

function prepareMarkdown(content: string) {
  return String(content || "")
    .replace(/\r\n/g, "\n")
    .replace(/[\f\u2028\u2029]+/g, "\n\n")
    .replace(/([^\n])[ \t]*\n?(?=\*\*[^*\n]{1,80}\*\*\s*[–—-])/g, "$1\n\n");
}

export function formatAssistantMarkdown(text: string) {
  const source = prepareMarkdown(parseReplies(text).text);
  if (typeof window === "undefined") return fallbackHtml(source);

  configureMarked();
  let html = String(marked.parse(source, { async: false }));
  html = /<p\b/i.test(html)
    ? html.replace(/<p\b(?![^>]*\bdir=)/gi, `<p dir="auto"`)
    : `<p dir="auto">${html}</p>`;

  return DOMPurify.sanitize(`<div>${html}</div>`, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "loading", "referrerpolicy", "dir"],
    FORBID_TAGS: ["style", "script"],
  });
}

export function replySendText(label: string) {
  return /^reply ok$/i.test(label.trim()) ? "OK" : label;
}

export function isApproveReply(label: string) {
  return /^reply approve$/i.test(label.trim());
}
