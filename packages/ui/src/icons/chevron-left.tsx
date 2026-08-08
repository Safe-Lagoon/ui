import { Icon } from "./icon";
import type { IconProps } from "./types";

export function ChevronLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}
