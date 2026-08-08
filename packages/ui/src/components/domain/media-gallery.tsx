"use client";

import * as React from "react";
import { ShieldAlert } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Checkbox } from "../brand/checkbox";
import { EmptyState } from "./empty-state";
import { GalleryGrid, MediaLightbox, type GalleryItem } from "./gallery-grid";

export type MediaGalleryItem = GalleryItem & {
  capturedAt?: string;
  flagged?: boolean;
  flaggedLabel?: string;
  aiShieldLabel?: string;
};

export interface MediaGalleryProps {
  items: MediaGalleryItem[];
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  closeLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
}

export function MediaGallery({
  items,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  emptyTitle,
  emptyDescription,
  className,
  closeLabel,
  previousLabel,
  nextLabel,
}: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const toggleSelection = (id: string) => {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((itemId) => itemId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  if (!items.length && emptyTitle) {
    return <EmptyState title={emptyTitle} description={emptyDescription} className={className} />;
  }

  return (
    <>
      <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4", className)}>
        {items.map((item, index) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <div key={item.id} className="group relative">
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-[10px] border border-border-soft",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isSelected && "ring-2 ring-brand-blue ring-offset-2",
                )}
              >
                <img
                  src={item.thumbnailSrc ?? item.src}
                  alt={item.alt}
                  className="size-full object-cover transition-transform group-hover:scale-105"
                />
                {item.capturedAt ? (
                  <span className="absolute bottom-2 start-2 rounded-md bg-black/60 px-2 py-0.5 text-body-14 text-white">
                    {item.capturedAt}
                  </span>
                ) : null}
                {item.flagged ? (
                  <Badge
                    variant="destructive"
                    className="absolute end-2 top-2 gap-1 shadow-sm"
                  >
                    <ShieldAlert className="size-3" aria-hidden />
                    {item.flaggedLabel}
                  </Badge>
                ) : item.aiShieldLabel ? (
                  <Badge className="absolute end-2 top-2 bg-violet text-white shadow-sm">
                    {item.aiShieldLabel}
                  </Badge>
                ) : null}
              </button>
              {selectable ? (
                <div
                  className="absolute start-2 top-2 rounded-md bg-background/90 p-1 shadow-sm"
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => event.stopPropagation()}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleSelection(item.id)}
                    aria-label={item.alt}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {lightboxIndex !== null ? (
        <MediaLightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
          closeLabel={closeLabel}
          previousLabel={previousLabel}
          nextLabel={nextLabel}
        />
      ) : null}
    </>
  );
}

export { GalleryGrid, MediaLightbox, type GalleryItem };
