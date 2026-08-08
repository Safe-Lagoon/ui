import { Icon } from "./icon";
import { BRAND_BLUE, BRAND_LILAC, type IconProps } from "./types";

export function FeatureFree(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.8 6.2 18l.9-5.4L3.2 8.7l5.4-.8L12 3z"
        fill={BRAND_LILAC}
        stroke={BRAND_BLUE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
