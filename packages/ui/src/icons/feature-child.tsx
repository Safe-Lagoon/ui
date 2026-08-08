import { Icon } from "./icon";
import { BRAND_BLUE, BRAND_LILAC, type IconProps } from "./types";

export function FeatureChild(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="3.5" fill={BRAND_BLUE} />
      <path
        d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke={BRAND_LILAC}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
}
