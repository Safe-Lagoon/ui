import { Icon } from "./icon";
import type { IconProps } from "./types";

export function Location(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2" fill="currentColor" />
    </Icon>
  );
}
