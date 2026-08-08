import { Icon } from "./icon";
import type { IconProps } from "./types";

export function Phone(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M8.5 14.5c1.5 2.5 3.5 4.5 6 6l2-2c.3-.3.8-.4 1.2-.2 1 .4 2.1.6 3.3.6.7 0 1.2.5 1.2 1.2V21c0 .7-.5 1.2-1.2 1.2C10.8 22.2 1.8 13.2 1.8 3.2 1.8 2.5 2.3 2 3 2h3.5c.7 0 1.2.5 1.2 1.2 0 1.2.2 2.3.6 3.3.2.4.1.9-.2 1.2l-2 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
