import { Icon } from "./icon";
import { BRAND_BLUE, BRAND_LILAC, type IconProps } from "./types";

export function FeatureScreenTime(props: IconProps) {
  return (
    <Icon {...props}>
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="2"
        stroke={BRAND_BLUE}
        strokeWidth="2"
      />
      <path
        d="M9 19h6"
        stroke={BRAND_BLUE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.5" stroke={BRAND_LILAC} strokeWidth="2" />
      <path
        d="M12 12V9.5"
        stroke={BRAND_LILAC}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 12l2 1.5"
        stroke={BRAND_BLUE}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
}
