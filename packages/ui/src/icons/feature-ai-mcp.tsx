import { Icon } from "./icon";
import { BRAND_BLUE, BRAND_LILAC, type IconProps } from "./types";

export function FeatureAiMcp(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="2.75" fill={BRAND_LILAC} />
      <circle
        cx="6"
        cy="7"
        r="2"
        fill={BRAND_BLUE}
        fillOpacity="0.15"
        stroke={BRAND_BLUE}
        strokeWidth="1.75"
      />
      <circle
        cx="18"
        cy="7"
        r="2"
        fill={BRAND_BLUE}
        fillOpacity="0.15"
        stroke={BRAND_BLUE}
        strokeWidth="1.75"
      />
      <circle
        cx="6"
        cy="17"
        r="2"
        fill={BRAND_BLUE}
        fillOpacity="0.15"
        stroke={BRAND_BLUE}
        strokeWidth="1.75"
      />
      <circle
        cx="18"
        cy="17"
        r="2"
        fill={BRAND_BLUE}
        fillOpacity="0.15"
        stroke={BRAND_BLUE}
        strokeWidth="1.75"
      />
      <path
        d="M9.6 9.6 7.8 7.8M14.4 9.6l1.8-1.8M9.6 14.4 7.8 16.2M14.4 14.4l1.8 1.8"
        stroke={BRAND_BLUE}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Icon>
  );
}
