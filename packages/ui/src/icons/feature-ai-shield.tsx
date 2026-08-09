import { Icon } from "./icon";
import { BRAND_BLUE, BRAND_LILAC, type IconProps } from "./types";

export function FeatureAiShield(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M12 2.5 19.5 5.7v5.8c0 4.2-2.8 7.1-7.5 8.8C6.3 18.6 3.5 15.7 3.5 11.5V5.7L12 2.5z"
        fill={BRAND_BLUE}
        fillOpacity="0.12"
        stroke={BRAND_BLUE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.5v5M9.5 10h5"
        stroke={BRAND_LILAC}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="10" r="1" fill={BRAND_LILAC} />
    </Icon>
  );
}
