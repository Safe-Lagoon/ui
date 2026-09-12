"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export type ActivityStackKind =
  | "apps"
  | "screentime"
  | "gallery"
  | "internet"
  | "youtube"
  | "places"
  | "aishield"
  | "chats";

export type ActivityStackPreview = {
  src?: string;
  alt?: string;
  label?: string;
  tone?: string;
};

export interface ActivityStackProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  title: React.ReactNode;
  meta?: React.ReactNode;
  time?: React.ReactNode;
  count?: number;
  alert?: boolean;
  kind?: ActivityStackKind;
  previews?: ActivityStackPreview[];
  accent?: string;
  alertLabel?: string;
}

const KIND_ACCENT: Record<ActivityStackKind, string> = {
  apps: "#7FC15D",
  screentime: "#7829d2",
  gallery: "#b97cff",
  internet: "#2F77EE",
  youtube: "#E53935",
  places: "#2F77EE",
  aishield: "#E53935",
  chats: "#2F77EE",
};

const APPS_TONES = ["#7FC15D", "#30a46c", "#5fca89"];
const GALLERY_TONES = ["#b97cff", "#7829d2", "#2F77EE", "#eceff1"];
const CHAT_TONES = ["#2F77EE", "#7829d2", "#E53935"];
const INTERNET_TONES = ["#2F77EE99", "#2F77EE", "#1d4ed8"];
const YOUTUBE_TONES = ["#E5393599", "#E53935", "#b71c1c"];
const AISHIELD_TONES = ["#f5c4c0", "#E5393599", "#E53935"];

/** Proto `.stack .layer { border: 2px solid #fff; box-shadow: 0 1px 2px rgba(45,44,50,.12) }` */
const LAYER_RING: React.CSSProperties = {
  border: "2px solid #fff",
  boxShadow: "0 1px 2px rgba(45, 44, 50, 0.12)",
};

function StackLayers({
  kind,
  previews = [],
  accent,
}: {
  kind?: ActivityStackKind;
  previews?: ActivityStackPreview[];
  accent: string;
}) {
  const slots = kind === "gallery" ? 4 : 3;
  const shown = previews.slice(0, slots);
  while (shown.length < slots) {
    shown.push({ label: shown.length === 0 ? "·" : "" });
  }

  if (kind === "screentime") {
    return (
      <span className="relative h-[52px] w-16 shrink-0" aria-hidden>
        {shown.map((preview, index) => (
          <span
            key={`${preview.src ?? preview.label ?? "p"}-${index}`}
            data-stack-layer=""
            className="absolute top-0.5 h-12 w-7 overflow-hidden rounded-[8px]"
            style={{
              ...LAYER_RING,
              insetInlineStart: `${index * 14}px`,
              background: preview.src ? undefined : preview.tone ?? accent,
              zIndex: index,
            }}
          >
            {preview.src ? (
              <img src={preview.src} alt="" className="size-full object-cover" />
            ) : (
              <span className="absolute inset-x-1 top-2 bottom-1 rounded-sm bg-white/35" />
            )}
          </span>
        ))}
      </span>
    );
  }

  if (kind === "gallery") {
    return (
      <span className="relative grid size-12 shrink-0 grid-cols-2 gap-0.5 overflow-hidden rounded-md" aria-hidden>
        {shown.slice(0, 4).map((preview, index) => (
          <span
            key={`${preview.src ?? preview.label ?? "g"}-${index}`}
            className="overflow-hidden rounded-sm"
            style={{ background: preview.tone ?? GALLERY_TONES[index] ?? accent }}
          >
            {preview.src ? <img src={preview.src} alt="" className="size-full object-cover" /> : null}
          </span>
        ))}
      </span>
    );
  }

  if (kind === "chats") {
    return (
      <span className="relative h-[52px] w-16 shrink-0" aria-hidden>
        {shown.map((preview, index) => (
          <span
            key={`${preview.src ?? preview.label ?? "c"}-${index}`}
            data-stack-layer=""
            className="absolute top-2.5 size-8 overflow-hidden rounded-full"
            style={{
              ...LAYER_RING,
              insetInlineStart: `${index * 14}px`,
              background: preview.tone ?? CHAT_TONES[index] ?? accent,
              zIndex: index,
            }}
          >
            {preview.src ? (
              <img src={preview.src} alt="" className="size-full object-cover" />
            ) : (
              <span className="flex size-full items-center justify-center text-[10px] font-bold text-white">
                {(preview.label ?? "?").slice(0, 1)}
              </span>
            )}
          </span>
        ))}
      </span>
    );
  }

  if (kind === "places") {
    return (
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-blue-soft" aria-hidden>
        <span className="text-[22px]">📍</span>
      </span>
    );
  }

  const cardClass = kind === "apps" ? "size-9 rounded-[10px]" : "h-11 w-10 rounded-[8px]";
  const step = kind === "apps" ? 12 : 8;
  const tones =
    kind === "apps"
      ? APPS_TONES
      : kind === "internet"
        ? INTERNET_TONES
        : kind === "youtube"
          ? YOUTUBE_TONES
          : kind === "aishield"
            ? AISHIELD_TONES
            : [accent];

  return (
    <span className="relative h-[52px] w-16 shrink-0" aria-hidden>
      {shown.map((preview, index) => (
        <span
          key={`${preview.src ?? preview.label ?? "s"}-${index}`}
          data-stack-layer=""
          className={cn(
            "absolute overflow-hidden",
            cardClass,
            kind === "aishield" && index === 2 && "blur-[0.6px]",
          )}
          style={{
            ...LAYER_RING,
            insetInlineStart: `${index * step}px`,
            top: kind === "apps" ? 8 : 4,
            background: preview.src ? undefined : preview.tone ?? tones[index] ?? accent,
            zIndex: index + 1,
          }}
        >
          {preview.src ? (
            <img
              src={preview.src}
              alt=""
              className={cn("size-full object-cover", kind === "aishield" && "opacity-80")}
            />
          ) : preview.label ? (
            <span className="flex size-full items-center justify-center text-[10px] font-bold text-white">
              {preview.label.slice(0, 2)}
            </span>
          ) : null}
        </span>
      ))}
    </span>
  );
}

export function ActivityStack({
  title,
  meta,
  time,
  count,
  alert = false,
  kind,
  previews,
  accent,
  alertLabel = "Needs review",
  className,
  type = "button",
  ...props
}: ActivityStackProps) {
  const resolvedAccent = accent ?? (kind ? KIND_ACCENT[kind] : "#2F77EE");

  return (
    <button
      type={type}
      data-slot="activity-stack"
      data-kind={kind}
      data-alert={alert || undefined}
      className={cn(
        "grid min-h-16 w-full grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-2.5 border-b border-border-soft px-3.5 py-2.5 text-start",
        "rounded-none border-x-0 border-t-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        "last:border-b-0",
        alert ? "bg-destructive-soft hover:bg-[#fce8e6]" : "hover:bg-[#fafbfc]",
        className,
      )}
      {...props}
    >
      <StackLayers kind={kind} previews={previews} accent={resolvedAccent} />
      <span className="flex min-w-0 flex-col gap-0.5">
        {alert ? (
          <span className="inline-flex w-fit rounded-[4px] bg-destructive px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
            {alertLabel}
          </span>
        ) : null}
        <span className="block text-[13.5px] font-semibold text-ink">{title}</span>
        {meta ? <span className="block text-[12.5px] text-muted-foreground">{meta}</span> : null}
      </span>
      <span className="flex shrink-0 items-center gap-2.5 text-[12px] text-muted-foreground">
        {time ? <span>{time}</span> : null}
        {count != null ? <span className="font-semibold text-ink">{count}</span> : null}
        <ChevronRight className="size-4 shrink-0 opacity-40" aria-hidden />
      </span>
    </button>
  );
}
