import { Icon } from "./icon";
import { BRAND_BLUE, BRAND_LILAC, type IconProps } from "./types";

export function FeatureApps(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="4" width="6" height="6" rx="1.5" fill={BRAND_BLUE} />
      <rect x="14" y="4" width="6" height="6" rx="1.5" fill={BRAND_LILAC} />
      <rect x="4" y="14" width="6" height="6" rx="1.5" fill={BRAND_LILAC} />
      <rect x="14" y="14" width="6" height="6" rx="1.5" fill={BRAND_BLUE} />
    </Icon>
  );
}
