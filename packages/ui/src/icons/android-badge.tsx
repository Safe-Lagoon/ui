import { Icon } from "./icon";
import type { IconProps } from "./types";

export function AndroidBadge(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#3DDC84" />
      <path
        d="M8 10.5a1 1 0 011-1h6a1 1 0 011 1v5a1 1 0 01-1 1H9a1 1 0 01-1-1v-5z"
        fill="white"
      />
      <circle cx="9.5" cy="9" r="0.75" fill="white" />
      <circle cx="14.5" cy="9" r="0.75" fill="white" />
      <path
        d="M7 12.5l-1.5 2M17 12.5l1.5 2"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Icon>
  );
}
