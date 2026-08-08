import { Icon } from "./icon";
import { BRAND_BLUE, BRAND_LILAC, type IconProps } from "./types";

export function FeatureSocial(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8" cy="10" r="3" fill={BRAND_BLUE} />
      <circle cx="16" cy="10" r="3" fill={BRAND_LILAC} />
      <path
        d="M4 20c0-2.2 1.8-4 4-4M20 20c0-2.2-1.8-4-4-4"
        stroke={BRAND_BLUE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 20c0-2.2-1.8-4-4-4"
        stroke={BRAND_LILAC}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
}
