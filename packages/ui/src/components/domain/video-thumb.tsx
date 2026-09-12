import * as React from "react";
import { cn } from "../../lib/utils";

export interface VideoThumbProps extends React.HTMLAttributes<HTMLSpanElement> {
  src: string;
  duration?: string;
  alt?: string;
}

/** 96×54 YouTube row thumb — proto `.sr-thumb`. */
export function VideoThumb({ src, duration, alt = "", className, ...props }: VideoThumbProps) {
  return (
    <span
      data-slot="video-thumb"
      className={cn("relative h-[54px] w-24 shrink-0 overflow-hidden rounded-md bg-[#2d2c32]", className)}
      {...props}
    >
      <img src={src} alt={alt} className="size-full object-cover" />
      <span className="absolute inset-0 grid place-items-center bg-black/28 text-[11px] text-white" aria-hidden>
        ▶
      </span>
      {duration ? (
        <span className="absolute bottom-1 end-1 rounded-[4px] bg-black/70 px-[5px] py-px text-[10px] font-bold text-white">
          {duration}
        </span>
      ) : null}
    </span>
  );
}

/** @deprecated Use VideoThumb */
export const YtThumb = VideoThumb;
