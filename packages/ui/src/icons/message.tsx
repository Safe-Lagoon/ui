import { Icon } from "./icon";
import type { IconProps } from "./types";

export function Message(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M4 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 4v-4H6a2 2 0 01-2-2V6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
