export type FoundationColor = {
  name: string;
  token: string;
  className: string;
  hex: string;
  description?: string;
  bordered?: boolean;
};

export type FoundationColorGroup = {
  title: string;
  colors: FoundationColor[];
};

export const foundationColorGroups: FoundationColorGroup[] = [
  {
    title: "Primary & accent",
    colors: [
      { name: "Lilac", token: "lilac", className: "bg-lilac", hex: "#B97CFF", description: "Primary CTA" },
      { name: "Lilac Hover", token: "lilac-hover", className: "bg-lilac-hover", hex: "#A357FB" },
      { name: "Lilac Active", token: "lilac-active", className: "bg-lilac-active", hex: "#9132FF" },
      { name: "Lilac 300", token: "lilac-300", className: "bg-lilac-300", hex: "#D9B8FF" },
      { name: "Brand Blue", token: "brand-blue", className: "bg-brand-blue", hex: "#2F77EE", description: "Links, accent" },
      { name: "Blue 400", token: "brand-blue-400", className: "bg-brand-blue-400", hex: "#689FFA" },
      { name: "Blue 300", token: "brand-blue-300", className: "bg-brand-blue-300", hex: "#A4C6FE" },
      { name: "Blue 100", token: "brand-blue-100", className: "bg-brand-blue-100", hex: "#D9E7FF", bordered: true },
    ],
  },
  {
    title: "Violet & green",
    colors: [
      { name: "Violet", token: "violet", className: "bg-violet", hex: "#7829D2" },
      { name: "Violet Active", token: "violet-active", className: "bg-violet-active", hex: "#5909B5" },
      { name: "Green", token: "green", className: "bg-green", hex: "#7FC15D" },
      { name: "Green 300", token: "green-300", className: "bg-green-300", hex: "#BEEDA6", bordered: true },
      { name: "Green 100", token: "green-100", className: "bg-green-100", hex: "#E5F8DB", bordered: true },
      { name: "Success", token: "success", className: "bg-success", hex: "#5FCA89" },
    ],
  },
  {
    title: "Neutrals & surfaces",
    colors: [
      { name: "Ink", token: "ink", className: "bg-ink", hex: "#2D2C32" },
      { name: "Foreground", token: "fg", className: "bg-fg", hex: "#333333" },
      { name: "Muted FG", token: "muted-fg", className: "bg-muted-fg", hex: "#546E7A" },
      { name: "Border", token: "border", className: "bg-border", hex: "#B0BEC5", bordered: true },
      { name: "Border Soft", token: "border-soft", className: "bg-border-soft", hex: "#DAE4E9", bordered: true },
      { name: "Surface", token: "surface", className: "bg-surface", hex: "#ECEFF1", bordered: true },
      { name: "Footer", token: "footer", className: "bg-footer", hex: "#061E47" },
    ],
  },
  {
    title: "Semantic",
    colors: [
      { name: "Primary", token: "primary", className: "bg-primary", hex: "#B97CFF", description: "Maps to lilac" },
      { name: "Accent", token: "accent", className: "bg-accent", hex: "#2F77EE", description: "Maps to brand blue" },
      { name: "Destructive", token: "destructive", className: "bg-destructive", hex: "#E53935" },
      { name: "Muted", token: "muted", className: "bg-muted", hex: "#ECEFF1", bordered: true },
      { name: "Background", token: "background", className: "bg-background", hex: "#FFFFFF", bordered: true },
    ],
  },
];
