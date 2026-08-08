import { Icon } from "./icon";
import type { IconProps } from "./types";

export function Settings(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
}
