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
    node?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [currentId]);

  if (!frames.length) {
    return emptyTitle ? (
      <EmptyState title={emptyTitle} description={emptyDescription} className={className} />
    ) : null;
  }

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < frames.length - 1;
  const progress = frames.length > 1 ? (activeIndex / (frames.length - 1)) * 100 : 100;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-body-14 text-muted-foreground">
          <MonitorSmartphone className="size-4 shrink-0" aria-hidden />
          {sessionLabel ? <span>{sessionLabel}</span> : null}
        </div>
        {activeFrame ? (
          <time className="text-body-14 text-muted-foreground">{activeFrame.timestamp}</time>
        ) : null}
      </div>

      <div className="relative overflow-hidden rounded-[10px] border border-border-soft bg-muted/20">
        {activeFrame ? (
          <img
            src={activeFrame.src}
            alt={activeFrame.alt}
            className="aspect-video w-full object-contain bg-ink/95"
          />
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
      </div>

      {activeFrame?.appName ? (
        <p className="text-body-14 text-muted-foreground">{activeFrame.appName}</p>
      ) : null}

      <div className="space-y-2">
        {timelineLabel ? (
          <div className="flex items-center justify-between gap-2">
            <span className="text-body-14-semibold text-foreground">{timelineLabel}</span>
            <span className="text-body-14 text-muted-foreground">
              {activeIndex + 1} / {frames.length}
            </span>
          </div>
        ) : null}

        <div className="relative h-2 rounded-full bg-muted">
          <div
            className="absolute inset-y-0 start-0 rounded-full bg-brand-blue transition-all"
            style={{ width: `${progress}%` }}
            aria-hidden
          />
          <input
            type="range"
            min={0}
            max={Math.max(frames.length - 1, 0)}
            value={activeIndex}
            onChange={(event) => goTo(Number(event.target.value))}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
            aria-label={timelineLabel ?? "Session timeline"}
          />
        </div>

        <div
          ref={filmstripRef}
          className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  "flex w-28 shrink-0 flex-col gap-1 rounded-[10px] border p-1 text-start transition-colors",
                  isActive
                    ? "border-brand-blue bg-brand-blue-100/40"
                    : "border-border-soft bg-background hover:border-brand-blue-300",
                )}
              >
                <img
                  src={frame.src}
                  alt={frame.alt}
                  className="aspect-video w-full rounded-[6px] object-cover"
                />
                <span className="truncate px-1 text-body-14 text-muted-foreground">
                  {frame.timestamp}
                </span>
                <span className="sr-only">
                  Frame {index + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
