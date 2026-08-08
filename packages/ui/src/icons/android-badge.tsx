import { Icon } from "./icon";
import type { IconProps } from "./types";

export function AndroidBadge(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4.5" fill="#3DDC84" />
      <g transform="translate(12 12.25) scale(0.58) translate(-12 -12)">
        <path
          fill="#fff"
          d="M17.6 9.48 19.57 7.5a.75.75 0 1 0-1.06-1.06L17.46 7.44C16.09 6.56 14.32 6 12.5 6S8.91 6.56 7.54 7.44L5.49 6.44a.75.75 0 1 0-1.06 1.06L6.4 9.48C4.56 10.73 3.5 12.77 3.5 15v.75c0 .69.56 1.25 1.25 1.25H5a1 1 0 0 0 1-1V15a5.5 5.5 0 0 1 11 0v.75a1 1 0 0 0 1 1h.25c.69 0 1.25-.56 1.25-1.25V15c0-2.23-1.06-4.27-2.9-5.52ZM9.25 13.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm5.5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
        />
      </g>
    </Icon>
  );
}
