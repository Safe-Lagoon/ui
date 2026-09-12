"use client";

import * as React from "react";
import { DotCrumbs } from "@safelagoon/ui";
import { cn } from "@safelagoon/ui";
import { AppShellPageHeader, useAppShellNavigation } from "@safelagoon/ui/blocks";
import type { PortalScreen } from "./portal-screen-model";

const CRUMB_HREF: Record<string, PortalScreen> = {
  Activity: "/feed",
  Rules: "/rules",
  Settings: "/settings",
  Chats: "/feed/chats",
  Family: "/settings/family",
  Security: "/settings/security",
  Supervisors: "/settings/supervisors",
  Help: "/settings/help",
  Places: "/rules/places",
};

export function PageHead({
  title,
  crumbs,
  onGo,
}: {
  title?: string;
  crumbs?: Array<string | { label: string; href?: PortalScreen }>;
  onGo: (screen: PortalScreen) => void;
}) {
  const items = crumbs?.map((item, index, all) => {
    if (typeof item === "string") {
      const href = index < all.length - 1 ? CRUMB_HREF[item] : undefined;
      return href ? { label: item, href } : { label: item };
    }
    return item;
  });
  return (
    <AppShellPageHeader
      title={title}
      breadcrumbs={
        items ? (
          <DotCrumbs items={items} onNavigate={(href) => onGo(href as PortalScreen)} />
        ) : undefined
      }
    />
  );
}

export function PanelGrid({ children }: { children: React.ReactNode }) {
  const mode = useAppShellNavigation()?.shellMode ?? "desktop";
  return (
    <div
      className={cn(
        "mb-5 grid",
        mode === "phone" && "grid-cols-1 gap-3",
        mode === "tablet" && "grid-cols-2 gap-3.5",
        mode === "desktop" && "grid-cols-3 gap-3.5",
      )}
    >
      {children}
    </div>
  );
}

export function AppMark({ kind, mark }: { kind: string; mark: string }) {
  const bg: Record<string, string> = {
    tiktok: "#111",
    roblox: "#e2231a",
    minecraft: "#5d9b32",
    youtube: "#ff0000",
  };
  return (
    <span
      className="grid size-10 shrink-0 place-items-center rounded-[10px] text-[14px] font-bold text-white"
      style={{ background: bg[kind] ?? "#111" }}
      aria-hidden
    >
      {mark}
    </span>
  );
}

export function YtThumb({ src, duration }: { src: string; duration?: string }) {
  return (
    <span className="relative h-[54px] w-24 shrink-0 overflow-hidden rounded-md bg-muted">
      <img src={src} alt="" className="size-full object-cover" />
      <span className="absolute inset-0 grid place-items-center bg-black/28 text-white" aria-hidden>
        ▶
      </span>
      {duration ? (
        <span className="absolute bottom-1 end-1 rounded-[4px] bg-black/70 px-1 text-[10px] font-bold text-white">
          {duration}
        </span>
      ) : null}
    </span>
  );
}

export function PortalSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="h-10 w-full rounded-[10px] border border-border bg-card px-3 text-[14px] text-ink focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(47,119,238,0.18)] focus:outline-none"
      {...props}
    />
  );
}

export function ToggleRow({ title, sub, defaultOn }: { title: string; sub?: string; defaultOn: boolean }) {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border-soft py-2.5 last:border-b-0">
      <div>
        <div className="text-[15px] font-semibold text-ink">{title}</div>
        {sub ? <div className="text-[13px] text-muted-foreground">{sub}</div> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={title}
        className={cn("relative h-6 w-11 rounded-full", on ? "bg-lilac" : "bg-border")}
        onClick={() => setOn((value) => !value)}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform",
            on ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}

export function PayCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={!!selected}
      className={cn(
        "w-full rounded-[10px] border px-3.5 py-3 text-start text-[13px] font-semibold",
        selected ? "border-lilac bg-lilac-soft" : "border-border-soft bg-card",
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
