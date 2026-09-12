"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import {
  ScreenMirrorViewer,
  type ScreenMirrorFrame,
  type ScreenMirrorViewerProps,
} from "./screen-mirror-viewer";

export type SessionFilmstripFrame = ScreenMirrorFrame;

export interface SessionFilmstripProps extends ScreenMirrorViewerProps {
  frames: SessionFilmstripFrame[];
}

export function SessionFilmstrip({ className, sessionLabel = "Session", ...props }: SessionFilmstripProps) {
  return (
    <div data-slot="session-filmstrip">
      <ScreenMirrorViewer
        sessionLabel={sessionLabel}
        className={cn("rounded-[14px] border border-border-soft bg-card p-3", className)}
        {...props}
      />
    </div>
  );
}
