import { Icon } from "./icon";
import type { IconProps } from "./types";

export function ArrowLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}
