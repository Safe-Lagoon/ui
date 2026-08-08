import type { FoundationColorGroup } from "@/lib/foundation-colors";

function ColorSwatch({
  name,
  token,
  className,
  hex,
  description,
  bordered = false,
}: FoundationColorGroup["colors"][number]) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-border-soft bg-background">
      <div
        className={[
          "h-20 w-full",
          className,
          bordered ? "border-b border-border-soft" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      <div className="space-y-1 p-3">
        <p className="text-body-14-semibold text-foreground">{name}</p>
        <p className="font-mono text-body-14 text-muted-foreground">{hex}</p>
        <p className="font-mono text-body-14 text-muted-foreground">{token}</p>
        {description ? <p className="text-body-14 text-muted-foreground">{description}</p> : null}
      </div>
    </div>
  );
}

type ColorSwatchGridProps = {
  groups: FoundationColorGroup[];
};

export function ColorSwatchGrid({ groups }: ColorSwatchGridProps) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.title}>
          <h3 className="mb-4 text-body-18-semibold text-foreground">{group.title}</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {group.colors.map((color) => (
              <ColorSwatch key={color.token} {...color} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
