import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const typographySizes = [
  "h1",
  "h1-serif",
  "h2",
  "h3",
  "h3-serif",
  "h4",
  "body-14",
  "body-16",
  "body-16-semibold",
  "body-18",
  "body-18-semibold",
  "body-18-bold",
  "body-20",
  "body-20-medium",
  "body-24-medium",
  "body-32-medium",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...typographySizes] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
