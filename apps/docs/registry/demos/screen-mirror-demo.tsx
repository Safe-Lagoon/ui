"use client";

import * as React from "react";
import { ScreenMirrorViewer } from "@safelagoon/ui";

const frames = [
  {
    id: "f1",
    src: "https://picsum.photos/seed/mirror1/1280/720",
    alt: "Session frame 1",
    timestamp: "14:02:11",
    appName: "YouTube",
  },
  {
    id: "f2",
    src: "https://picsum.photos/seed/mirror2/1280/720",
    alt: "Session frame 2",
    timestamp: "14:04:36",
    appName: "YouTube",
  },
  {
    id: "f3",
    src: "https://picsum.photos/seed/mirror3/1280/720",
    alt: "Session frame 3",
    timestamp: "14:07:02",
    appName: "Chrome",
  },
  {
    id: "f4",
    src: "https://picsum.photos/seed/mirror4/1280/720",
    alt: "Session frame 4",
    timestamp: "14:09:48",
    appName: "Chrome",
  },
  {
    id: "f5",
    src: "https://picsum.photos/seed/mirror5/1280/720",
    alt: "Session frame 5",
    timestamp: "14:12:15",
    appName: "TikTok",
  },
];

export default function ScreenMirrorDemo() {
  const [activeFrameId, setActiveFrameId] = React.useState(frames[0]?.id);

  return (
    <ScreenMirrorViewer
      frames={frames}
      activeFrameId={activeFrameId}
      onActiveFrameChange={setActiveFrameId}
      sessionLabel="Screen mirror session"
      timelineLabel="Session timeline"
    />
  );
}
