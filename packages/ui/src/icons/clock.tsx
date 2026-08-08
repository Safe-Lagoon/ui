import { Icon } from "./icon";
import type { IconProps } from "./types";

export function Clock(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}
