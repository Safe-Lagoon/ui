import { Icon } from "./icon";
import { BRAND_BLUE, BRAND_LILAC, type IconProps } from "./types";

export function FeatureWeb(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" stroke={BRAND_BLUE} strokeWidth="2" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke={BRAND_LILAC} strokeWidth="1.5" />
      <path d="M3 12h18M5.5 7h13M5.5 17h13" stroke={BRAND_BLUE} strokeWidth="1.5" />
    </Icon>
  );
}
