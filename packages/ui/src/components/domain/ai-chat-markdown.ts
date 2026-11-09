import { marked } from "marked";
import DOMPurify from "dompurify";

const REPLIES_BLOCK = /<replies\b[^>]*>[\s\S]*?<\/replies>/gi;
const REPLIES_UNCLOSED = /<replies\b[^>]*>[\s\S]*$/i;
const IMAGE_EXT = /\.(avif|gif|jpe?g|png|webp)$/i;
const MD_IMAGE = /^!\[[^\]]*\]\([^)]*\)$/;

const GALLERY_HOSTS = [
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

function isGalleryShot(href: string) {
  const url = parseHttpUrl(href);
  if (!url || url.protocol !== "https:" || url.username || url.password || url.port) return false;
  if (!IMAGE_EXT.test(url.pathname)) return false;

  const host = url.hostname.toLowerCase();
  const path = url.pathname;
  return GALLERY_HOSTS.some(
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
        return isGalleryShot(href) ? renderShot(href, text) : renderLink(href, text || "Open link");
      },
      link({ href, text }) {
        const label = linkLabel(text);
        return isGalleryShot(href) ? renderShot(href, label) : renderLink(href, label);
      },
    },
  });
  markedConfigured = true;
}

function fallbackHtml(value: string) {
  return `<p dir="auto">${escapeText(value || "").replace(/\n/g, "<br>")}</p>`;
}

export function stripAiChatReplies(content: string) {
  const replies: string[] = [];
  const seen = new Set<string>();
  const source = String(content || "");

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

export function isReplyOkPrompt(content: string) {
  const text = String(content || "").toLowerCase();
  if (!text) return false;
  if (
    /\breply\s+ok\b/.test(text) ||
    /\b(type|say|press|tap|send|respond(?:\s+with)?)\s+ok\b/.test(text) ||
    /\bok\b.{0,60}\b(continue|proceed|confirm)\b/.test(text) ||
    /\b(continue|proceed|confirm).{0,60}\bok\b/.test(text) ||
    /\b(shall|should|can|may) i proceed\b/.test(text) ||
    /\b(want me to|shall i|should i) (go ahead|continue|proceed)\b/.test(text) ||
    /\bgo ahead\?/.test(text)
  ) {
    return true;
  }

  const question = trailingQuestion(text).toLowerCase();
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

export function isReplyApprovePrompt(content: string) {
  const text = String(content || "").toLowerCase();
  if (!text) return false;
  return (
    /\breply\s+approve\b/.test(text) ||
    /\b(type|say|press|tap|send|respond(?:\s+with)?)\s+approve\b/.test(text) ||
    /\bplease approve\b/.test(text) ||
    /\bapprove (this|the|it)\b/.test(text)
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

export function inferAiChatReplies(content: string) {
  if (isReplyApprovePrompt(content)) return ["Reply Approve"];
  if (isReplyOkPrompt(content)) return ["Reply OK"];
  return choiceReplies(content);
}

export function normalizeReplyChip(label: string) {
  return /^reply ok$/i.test(label.trim()) ? "OK" : label;
}

export function isApproveReplyChip(label: string) {
  return /^reply approve$/i.test(label.trim());
}

function prepareMarkdown(content: string) {
  return String(content || "")
    .replace(/\r\n/g, "\n")
    .replace(/[\f\u2028\u2029]+/g, "\n\n")
    .replace(/([^\n])[ \t]*\n?(?=\*\*[^*\n]{1,80}\*\*\s*[–—-])/g, "$1\n\n");
}

export function renderAiChatMarkdown(content: string) {
  const text = prepareMarkdown(stripAiChatReplies(content).text);
  if (typeof window === "undefined") return fallbackHtml(text);

  configureMarked();
  let html = String(marked.parse(text, { async: false }));
  html = /<p\b/i.test(html)
    ? html.replace(/<p\b(?![^>]*\bdir=)/gi, `<p dir="auto"`)
    : `<p dir="auto">${html}</p>`;

  return DOMPurify.sanitize(`<div>${html}</div>`, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "loading", "referrerpolicy", "dir"],
    FORBID_TAGS: ["style", "script"],
  });
}
