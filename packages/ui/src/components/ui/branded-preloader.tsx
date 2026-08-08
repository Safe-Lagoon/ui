import * as React from "react";
import { cn } from "../../lib/utils";

export interface BrandedPreloaderProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number;
  label?: string;
}

function BrandedPreloader({
  className,
  size = 64,
  label = "Loading",
  ...props
}: BrandedPreloaderProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="status"
      aria-label={label}
      className={cn("text-brand-blue", className)}
      {...props}
    >
      <defs>
        <linearGradient id="sl-lagoon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2f77ee" />
          <stop offset="50%" stopColor="#689ffa" />
          <stop offset="100%" stopColor="#b97cff" />
        </linearGradient>
      </defs>

      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.15"
      />

      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke="url(#sl-lagoon-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="120 56"
        className="origin-center animate-spin"
        style={{ transformOrigin: "32px 32px" }}
      />

      <path
        d="M18 40 C24 34, 28 30, 32 30 C36 30, 40 34, 46 40"
        fill="none"
        stroke="url(#sl-lagoon-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="animate-pulse"
      />

      <circle cx="32" cy="24" r="4" fill="#b97cff" className="animate-pulse" />
    </svg>
  );
}

export { BrandedPreloader };
