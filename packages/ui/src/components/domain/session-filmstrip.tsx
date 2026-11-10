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
    <div
      data-slot="session-filmstrip"
      className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
    >
      <ScreenMirrorViewer
        sessionLabel={sessionLabel}
        className={cn("min-h-0 flex-1", className)}
        {...props}
      />
    </div>
  );
}
