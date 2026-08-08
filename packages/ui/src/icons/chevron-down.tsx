import { Icon } from "./icon";
import type { IconProps } from "./types";

export function ChevronDown(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}
