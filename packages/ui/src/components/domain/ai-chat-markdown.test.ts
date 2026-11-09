import { describe, expect, it } from "vitest";
import { formatAssistantMarkdown } from "./ai-chat-markdown";

/**
 * Golden HTML captured from marked@15.0.12 + the current renderer/DOMPurify
 * pipeline. marked@18 must keep these strings identical.
 */
const GOLDEN: Record<string, { source: string; html: string }> = {
  gfm_link: {
    source: "Hello **Noah**\n\n[Open](https://example.com)",
    html: `<div><p dir="auto">Hello <strong>Noah</strong></p>\n<p dir="auto"><a class="ai-chat-md-link" href="https://example.com/" target="_blank" rel="noopener noreferrer">Open</a></p>\n</div>`,
  },
  br: {
    source: "Line one\nLine two",
    html: `<div><p dir="auto">Line one<br>Line two</p>\n</div>`,
  },
  list: {
    source: "- one\n- two",
    html: `<div><p dir="auto"></p><ul>\n<li>one</li>\n<li>two</li>\n</ul>\n<p></p></div>`,
  },
  table: {
    source: "| A | B |\n| --- | --- |\n| 1 | 2 |",
    html: `<div><p dir="auto"><table>\n<thead>\n<tr>\n<th>A</th>\n<th>B</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>1</td>\n<td>2</td>\n</tr>\n</tbody></table>\n</p></div>`,
  },
  shot: {
    source: "See ![Emma](https://safelagoon-gallery.s3.amazonaws.com/shots/emma.png)",
    html: `<div><p dir="auto">See <a class="shot" href="https://safelagoon-gallery.s3.amazonaws.com/shots/emma.png" target="_blank" rel="noopener noreferrer"><img src="https://safelagoon-gallery.s3.amazonaws.com/shots/emma.png" alt="Emma" loading="lazy" referrerpolicy="no-referrer"></a></p>\n</div>`,
  },
  offsite_img: {
    source: "See ![x](https://example.com/x.png)",
    html: `<div><p dir="auto">See <a class="ai-chat-md-link" href="https://example.com/x.png" target="_blank" rel="noopener noreferrer">x</a></p>\n</div>`,
  },
  replies: {
    source: "Ready.\n<replies>\nReply OK\n</replies>",
    html: `<div><p dir="auto">Ready.</p>\n</div>`,
  },
  heading: {
    source: "**Bedtime** — weekdays",
    html: `<div><p dir="auto"><strong>Bedtime</strong> — weekdays</p>\n</div>`,
  },
  quote: {
    source: "> note",
    html: `<div><blockquote>\n<p dir="auto">note</p>\n</blockquote>\n</div>`,
  },
  code: {
    source: "use `lock`",
    html: `<div><p dir="auto">use <code>lock</code></p>\n</div>`,
  },
  mixed: {
    source: "Emma has **1h 42m** today.\n\n- Instagram\n- TikTok",
    html: `<div><p dir="auto">Emma has <strong>1h 42m</strong> today.</p>\n<ul>\n<li>Instagram</li>\n<li>TikTok</li>\n</ul>\n</div>`,
  },
};

describe("formatAssistantMarkdown golden HTML", () => {
  it.each(Object.entries(GOLDEN))("%s matches marked@15 output", (_name, fixture) => {
    expect(formatAssistantMarkdown(fixture.source)).toBe(fixture.html);
  });
});
