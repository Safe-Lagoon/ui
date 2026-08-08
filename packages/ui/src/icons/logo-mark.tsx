import * as React from "react";
import { Icon } from "./icon";
import { BRAND_BLUE, BRAND_LILAC, type IconProps } from "./types";

export function LogoMark(props: IconProps) {
  return (
    <Icon viewBox="0 0 32 32" {...props}>
      <defs>
        <linearGradient id="sl-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BRAND_BLUE} />
          <stop offset="100%" stopColor={BRAND_LILAC} />
        </linearGradient>
      </defs>
      <path
        d="M4 22 C8 16, 12 12, 16 12 C20 12, 24 16, 28 22"
        stroke="url(#sl-logo-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6 24 C10 19, 13 16, 16 16 C19 16, 22 19, 26 24"
        stroke={BRAND_BLUE}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <circle cx="16" cy="9" r="3" fill={BRAND_LILAC} />
      <path
        d="M16 6 V3"
        stroke={BRAND_BLUE}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
}
