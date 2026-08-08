import { ColorSwatchGrid } from "@/components/color-swatch-grid";
import { DocPageHeader } from "@/components/doc-page-header";
import { foundationColorGroups } from "@/lib/foundation-colors";

export default function FoundationsPage() {
  return (
    <article>
      <DocPageHeader
        title="Foundations"
        iconSlug="foundations"
        description="Design tokens from the Figma identity file."
        showDivider
      />

      <section className="mb-10">
        <h2 className="mb-4 text-h3 text-foreground">Colors</h2>
        <ColorSwatchGrid groups={foundationColorGroups} />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-h3 text-foreground">Typography</h2>
        <div className="space-y-4 rounded-[10px] border border-border-soft p-6">
          <p className="text-h1 text-foreground">Heading 1 — text-h1</p>
          <p className="text-h2 text-foreground">Heading 2 — text-h2</p>
          <p className="text-h3 text-foreground">Heading 3 — text-h3</p>
          <p className="text-body-16 text-muted-foreground">Body 16 — text-body-16</p>
          <p className="text-body-14 text-muted-foreground">Body 14 — text-body-14</p>
          <p className="text-h3-serif text-foreground">Serif heading — text-h3-serif</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-h3 text-foreground">Radius</h2>
        <div className="flex flex-wrap gap-4">
          {[
            { label: "sm — 6px", className: "rounded-sm" },
            { label: "md — 10px", className: "rounded-md" },
            { label: "lg — 14px", className: "rounded-lg" },
            { label: "xl — 20px", className: "rounded-xl" },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex size-20 items-center justify-center border-2 border-brand-blue bg-brand-blue-100 p-2 text-center text-body-14 text-brand-blue ${item.className}`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
