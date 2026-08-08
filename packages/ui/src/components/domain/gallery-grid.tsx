"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  thumbnailSrc?: string;
}

export interface GalleryGridProps {
  items: GalleryItem[];
  className?: string;
}

export function GalleryGrid({ items, className }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  return (
    <>
      <div className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4", className)}>
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-square overflow-hidden rounded-[10px] border border-border-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <img
              src={item.thumbnailSrc ?? item.src}
              alt={item.alt}
              className="size-full object-cover transition-transform group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null ? (
        <MediaLightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      ) : null}
    </>
  );
}

export interface MediaLightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  closeLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
}

export function MediaLightbox({
  items,
  index,
  onClose,
  onIndexChange,
  closeLabel = "Close",
  previousLabel = "Previous",
  nextLabel = "Next",
}: MediaLightboxProps) {
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onIndexChange(index - 1);
      if (e.key === "ArrowRight" && hasNext) onIndexChange(index + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, hasPrev, hasNext, onClose, onIndexChange]);

  if (!item) return null;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
        <DialogTitle className="sr-only">{item.alt}</DialogTitle>
        <div className="relative flex items-center justify-center">
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[85vh] w-full rounded-[10px] object-contain"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute end-2 top-2 bg-background/80"
            aria-label={closeLabel}
            onClick={onClose}
          >
            <X />
          </Button>
          {hasPrev ? (
            <Button
              variant="ghost"
              size="icon"
              className="absolute start-2 top-1/2 -translate-y-1/2 bg-background/80"
              aria-label={previousLabel}
              onClick={() => onIndexChange(index - 1)}
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
              onClick={() => onIndexChange(index + 1)}
            >
              <ChevronRight />
            </Button>
          ) : null}
        </div>
        <p className="text-center text-body-14 text-white">
          {index + 1} / {items.length}
        </p>
      </DialogContent>
    </Dialog>
  );
}
