"use client";

import * as React from "react";
import { MediaGallery } from "@safelagoon/ui";

const items = [
  {
    id: "1",
    src: "https://picsum.photos/seed/sl1/800/800",
    alt: "Park photo",
    capturedAt: "09:14",
  },
  {
    id: "2",
    src: "https://picsum.photos/seed/sl2/800/800",
    alt: "School gate",
    capturedAt: "12:41",
    aiShieldLabel: "AI Shield",
  },
  {
    id: "3",
    src: "https://picsum.photos/seed/sl3/800/800",
    alt: "Chat screenshot",
    capturedAt: "16:08",
    flagged: true,
    flaggedLabel: "Flagged",
  },
  {
    id: "4",
    src: "https://picsum.photos/seed/sl4/800/800",
    alt: "Bus stop",
    capturedAt: "17:22",
  },
];

export default function GalleryDemo() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  return (
    <MediaGallery
      items={items}
      selectable
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
    />
  );
}
