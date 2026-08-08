import { Icon } from "./icon";
import type { IconProps } from "./types";

export function ChevronUp(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}
