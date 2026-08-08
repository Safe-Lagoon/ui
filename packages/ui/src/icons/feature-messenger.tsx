import { Icon } from "./icon";
import { BRAND_BLUE, BRAND_LILAC, type IconProps } from "./types";

export function FeatureMessenger(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M4 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 4v-4H6a2 2 0 01-2-2V6z"
        fill={BRAND_BLUE}
        fillOpacity="0.15"
        stroke={BRAND_BLUE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="11" r="1" fill={BRAND_LILAC} />
      <circle cx="12" cy="11" r="1" fill={BRAND_LILAC} />
      <circle cx="15" cy="11" r="1" fill={BRAND_LILAC} />
    </Icon>
  );
}
