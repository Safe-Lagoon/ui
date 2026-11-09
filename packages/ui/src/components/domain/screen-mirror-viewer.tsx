"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MonitorSmartphone } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import { EmptyState } from "./empty-state";

export type ScreenMirrorFrame = {
  id: string;
  src: string;
  alt: string;
  timestamp: string;
  appName?: string;
};

export interface ScreenMirrorViewerProps {
  frames: ScreenMirrorFrame[];
  activeFrameId?: string;
  onActiveFrameChange?: (frameId: string) => void;
  sessionLabel?: string;
  timelineLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export function ScreenMirrorViewer({
  frames,
  activeFrameId,
  onActiveFrameChange,
  sessionLabel,
  timelineLabel,
  previousLabel = "Previous frame",
  nextLabel = "Next frame",
  emptyTitle,
  emptyDescription,
  className,
}: ScreenMirrorViewerProps) {
  const [internalId, setInternalId] = React.useState(frames[0]?.id);
  const filmstripRef = React.useRef<HTMLDivElement>(null);

  const currentId = activeFrameId ?? internalId ?? frames[0]?.id;
  const activeIndex = Math.max(
    0,
    frames.findIndex((frame) => frame.id === currentId),
  );
  const activeFrame = frames[activeIndex];

  const setActive = (frameId: string) => {
    if (onActiveFrameChange) onActiveFrameChange(frameId);
    else setInternalId(frameId);
  };

  const goTo = (index: number) => {
    const frame = frames[index];
    if (frame) setActive(frame.id);
  };

  React.useEffect(() => {
    const node = filmstripRef.current?.querySelector<HTMLElement>(`[data-frame-id="${currentId}"]`);
    node?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [currentId]);

  if (!frames.length) {
    return emptyTitle ? (
      <EmptyState title={emptyTitle} description={emptyDescription} className={className} />
    ) : null;
  }

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < frames.length - 1;

  return (
    <div
      data-slot="screen-mirror-viewer"
      className={cn("flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden", className)}
    >
      <div className="flex shrink-0 items-center justify-between gap-3 pb-3">
        <div className="flex min-w-0 items-center gap-2 text-body-14 text-muted-foreground">
          <MonitorSmartphone className="size-4 shrink-0" aria-hidden />
          {sessionLabel ? <span className="truncate">{sessionLabel}</span> : null}
          {activeFrame?.appName ? <span className="truncate">· {activeFrame.appName}</span> : null}
        </div>
        <div className="flex shrink-0 items-center gap-3 text-body-14 text-muted-foreground">
          {activeFrame ? <time>{activeFrame.timestamp}</time> : null}
          <span>
            {activeIndex + 1} / {frames.length}
          </span>
        </div>
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 gap-3 overflow-hidden">
        <div
          ref={filmstripRef}
          className="flex w-[88px] shrink-0 flex-col gap-2 overflow-y-auto pr-0.5 [-ms-overflow-style:none] [scrollbar-width:thin]"
        >
          {frames.map((frame, index) => {
            const isActive = frame.id === currentId;
            return (
              <button
                key={frame.id}
                type="button"
                data-frame-id={frame.id}
                onClick={() => setActive(frame.id)}
                className={cn(
                  "flex w-full shrink-0 flex-col gap-1 rounded-[10px] border p-1 text-start transition-colors",
                  isActive
                    ? "border-brand-blue bg-brand-blue-100/40"
                    : "border-border-soft bg-background hover:border-brand-blue-300",
                )}
              >
                <img
                  src={frame.src}
                  alt={frame.alt}
                  className="aspect-[9/16] w-full rounded-[6px] bg-ink/80 object-cover"
                />
                <span className="truncate px-0.5 text-[11px] leading-none text-muted-foreground">
                  {frame.timestamp}
                </span>
                <span className="sr-only">Frame {index + 1}</span>
              </button>
            );
          })}
        </div>
        <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-[10px] border border-border-soft bg-ink/95">
          {activeFrame ? (
            <img src={activeFrame.src} alt={activeFrame.alt} className="size-full object-contain" />
          ) : null}
          {hasPrev ? (
            <Button
              variant="ghost"
              size="icon"
              className="absolute start-2 top-1/2 -translate-y-1/2 bg-background/80"
              aria-label={previousLabel}
              onClick={() => goTo(activeIndex - 1)}
            >
              <ChevronLeft />
            </Button>
          ) : null}
          {hasNext ? (
            <Button
              variant="ghost"
              size="icon"
              className="absolute end-2 top-1/2 -translate-y-1/2 bg-background/80"
              aria-label={nextLabel}
              onClick={() => goTo(activeIndex + 1)}
            >
              <ChevronRight />
            </Button>
          ) : null}
          {timelineLabel ? <span className="sr-only">{timelineLabel}</span> : null}
        </div>
      </div>
    </div>
  );
}
