import { Icon } from "./icon";
import type { IconProps } from "./types";

export function Camera(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M4 8h3l2-3h6l2 3h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
}
