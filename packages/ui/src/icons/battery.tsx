import { Icon } from "./icon";
import type { IconProps } from "./types";

export function Battery(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M21 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="6" y="10" width="8" height="4" rx="1" fill="currentColor" />
    </Icon>
  );
}
