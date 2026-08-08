import { Icon } from "./icon";
import type { IconProps } from "./types";

export function ArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}
