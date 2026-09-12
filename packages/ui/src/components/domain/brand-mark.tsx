import * as React from "react";
import { cn } from "../../lib/utils";

export type BrandMarkSize = "sidebar" | "auth";

export interface BrandMarkProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: BrandMarkSize;
  label?: string;
  hideLabel?: boolean;
}

const sizeClass: Record<BrandMarkSize, { wrap: string; mark: string }> = {
  sidebar: {
    wrap: "gap-2.5 px-2 py-1 text-[15px]",
    mark: "size-7 rounded-lg text-[14px]",
  },
  auth: {
    wrap: "gap-2.5 text-[18px]",
    mark: "size-9 rounded-[10px] text-[16px]",
  },
};

/** Proto ✦ + “Safe Lagoon”. Sidebar 28px / auth 36px. */
export function BrandMark({
  size = "sidebar",
  label = "Safe Lagoon",
  hideLabel,
  className,
  ...props
}: BrandMarkProps) {
  const tones = sizeClass[size];
  return (
    <div
      data-slot="brand-mark"
      data-size={size}
      className={cn("flex items-center font-semibold text-brand-blue", tones.wrap, className)}
      {...props}
    >
      <span
        className={cn("grid shrink-0 place-items-center bg-brand-blue font-bold text-white", tones.mark)}
        aria-hidden
      >
        ✦
      </span>
      {hideLabel ? <span className="sr-only">{label}</span> : label}
    </div>
  );
}
