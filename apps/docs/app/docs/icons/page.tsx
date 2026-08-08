import { CodeBlock } from "@/components/code-block";
import { DocPageHeader } from "@/components/doc-page-header";
import { IconGallery } from "@/components/icon-gallery";

export default function IconsPage() {
  return (
    <article>
      <DocPageHeader
        title="Icons"
        iconSlug="icons"
        description={
          <>
            Tree-shakeable SVG icons from <code>@safelagoon/ui/icons</code>. Click a name to copy the
            export; use &ldquo;Copy import&rdquo; for a ready-to-paste import line.
          </>
        }
        showDivider
      />

      <section className="mb-10">
        <h2 className="mb-3 text-h3 text-foreground">Usage</h2>
        <CodeBlock
          lang="tsx"
          code={`import { LogoMark, FeatureGps, ChevronRight } from "@safelagoon/ui/icons";

<FeatureGps className="size-6 text-brand-blue" aria-hidden />`}
        />
      </section>

      <IconGallery />
    </article>
  );
}
