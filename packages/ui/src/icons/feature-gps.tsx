import { Icon } from "./icon";
import { BRAND_BLUE, BRAND_LILAC, type IconProps } from "./types";

export function FeatureGps(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="3" fill={BRAND_BLUE} />
      <path
        d="M12 2v4M12 18v4M2 12h4M18 12h4"
        stroke={BRAND_LILAC}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="8" stroke={BRAND_BLUE} strokeWidth="2" />
    </Icon>
  );
}
