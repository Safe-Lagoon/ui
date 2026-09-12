"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type EmojiAvatar = {
  id: string;
  mark: string;
  bg: string;
};

export const DEFAULT_CHILD_AVATARS: EmojiAvatar[] = [
  { id: "1", mark: "🦊", bg: "#b97cff" },
  { id: "2", mark: "🐼", bg: "#2f77ee" },
  { id: "3", mark: "🦁", bg: "#f5a524" },
  { id: "4", mark: "🐸", bg: "#30a46c" },
  { id: "5", mark: "🐰", bg: "#e5484d" },
  { id: "6", mark: "🦄", bg: "#7829d2" },
];

export interface EmojiAvatarPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items?: EmojiAvatar[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  label?: string;
}

export function EmojiAvatarPicker({
  items = DEFAULT_CHILD_AVATARS,
  value,
  defaultValue,
  onValueChange,
  label = "Avatar",
  className,
  ...props
}: EmojiAvatarPickerProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id ?? "");
  const selected = value ?? internal;

  return (
    <div
      role="radiogroup"
      aria-label={label}
      data-slot="emoji-avatar-picker"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {items.map((item) => {
        const on = item.id === selected;
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={`Avatar ${item.id}`}
            className={cn(
              "grid size-12 place-items-center rounded-full text-[22px] text-white transition-shadow",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              on ? "shadow-[0_0_0_2px_#fff,0_0_0_4px_#b97cff]" : "border-2 border-transparent",
            )}
            style={{ background: item.bg }}
            onClick={() => {
              if (value === undefined) setInternal(item.id);
              if (item.id !== selected) onValueChange?.(item.id);
            }}
          >
            {item.mark}
          </button>
        );
      })}
    </div>
  );
}
