"use client";

import * as React from "react";
import {
  ActivityDaySection,
  ActivityStack,
  AlertShot,
  FilterChips,
  SessionFilmstrip,
  type ActivityStackKind,
} from "@safelagoon/ui";

const KINDS: { kind: ActivityStackKind; title: string; meta: string; count?: number }[] = [
  { kind: "apps", title: "Played on phone", meta: "14:02–15:40 · 6 apps", count: 6 },
  { kind: "youtube", title: "YouTube", meta: "session 18 min · 3 videos", count: 3 },
  { kind: "internet", title: "wikipedia.org and 2 more sites", meta: "16:02 · allowed", count: 3 },
  { kind: "gallery", title: "Gallery", meta: "12 new photos", count: 12 },
  { kind: "screentime", title: "Screen mirror", meta: "TikTok · 11 min", count: 8 },
  { kind: "places", title: "Home", meta: "arrived · Home zone" },
  { kind: "chats", title: "June", meta: "WhatsApp · 4 messages", count: 4 },
  { kind: "aishield", title: "example-risk.site", meta: "/path/page — blocked by filter" },
];

const WIDTHS = [1280, 820, 390] as const;

export default function FeedStacksDemo() {
  const [filter, setFilter] = React.useState("all");
  const rows = KINDS.filter((row) => filter === "all" || filter === "critical" || row.kind === filter);
  const visible = filter === "critical" ? rows.filter((row) => row.kind === "aishield") : rows;

  return (
    <div className="space-y-8">
      {WIDTHS.map((width) => (
        <div key={width} className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Feed · {width}
          </p>
          <div
            className="space-y-3 overflow-hidden rounded-[14px] border border-border-soft bg-muted p-3"
            style={{ width: Math.min(width, 720) }}
          >
            <FilterChips
              value={filter}
              onValueChange={setFilter}
              items={[
                { id: "all", label: "All" },
                { id: "critical", label: "Critical", count: 1 },
                { id: "internet", label: "Internet" },
                { id: "apps", label: "Apps" },
                { id: "youtube", label: "YouTube" },
                { id: "gallery", label: "Gallery" },
                { id: "places", label: "Places" },
                { id: "aishield", label: "AI Shield" },
                { id: "chats", label: "Chats" },
              ]}
            />
            <ActivityDaySection title="Today · 6 Sep 2026" defaultExpanded>
              {visible.slice(0, 4).map((row) => (
                <ActivityStack
                  key={row.kind}
                  kind={row.kind}
                  title={row.title}
                  meta={row.meta}
                  count={row.count}
                  alert={row.kind === "aishield"}
                />
              ))}
            </ActivityDaySection>
            <ActivityDaySection title="4 Sep · 12 events" count={12} collapsedLabel="Older than yesterday — collapsed" />
          </div>
        </div>
      ))}

      <div className="grid gap-4 lg:grid-cols-2">
        <AlertShot
          title="AI Shield"
          meta="Today · 14:08"
          categories={["Adult", "Violence"]}
          terms={["keyword"]}
          categoriesLabel="Categories"
          termsLabel="Terms"
        />
        <SessionFilmstrip
          frames={[
            { id: "1", src: "https://picsum.photos/seed/film1/390/844", alt: "Frame 1", timestamp: "14:02" },
            { id: "2", src: "https://picsum.photos/seed/film2/390/844", alt: "Frame 2", timestamp: "14:04" },
            { id: "3", src: "https://picsum.photos/seed/film3/390/844", alt: "Frame 3", timestamp: "14:07" },
          ]}
          sessionLabel="TikTok session"
          timelineLabel="Filmstrip"
        />
      </div>
    </div>
  );
}
