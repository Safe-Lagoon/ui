import { Icon } from "./icon";
import { BRAND_BLUE, BRAND_LILAC, type IconProps } from "./types";

export function FeatureGallery(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke={BRAND_BLUE} strokeWidth="2" />
      <path
        d="M5.5 9.5 7.5 7.5 9.5 9.5"
        stroke={BRAND_BLUE}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="6.5" r="0.75" fill={BRAND_BLUE} />
      <rect
        x="13"
        y="4"
        width="7"
        height="7"
        rx="1.5"
        fill={BRAND_LILAC}
        fillOpacity="0.18"
        stroke={BRAND_LILAC}
        strokeWidth="2"
      />
      <rect
        x="4"
        y="13"
        width="7"
        height="7"
        rx="1.5"
        fill={BRAND_LILAC}
        fillOpacity="0.18"
        stroke={BRAND_LILAC}
        strokeWidth="2"
      />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke={BRAND_BLUE} strokeWidth="2" />
      <path
        d="M15 18.5h3"
        stroke={BRAND_BLUE}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Icon>
  );
}
