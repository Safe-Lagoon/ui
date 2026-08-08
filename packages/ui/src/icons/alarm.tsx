import { Icon } from "./icon";
import type { IconProps } from "./types";

export function Alarm(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="13" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M12 10v4l2.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 4L3 6M21 4l-2 2M5 22l-2-2M21 22l-2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}
