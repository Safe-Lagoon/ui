import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { DocPageHeader } from "@/components/doc-page-header";

export default function DocsHomePage() {
  return (
    <article>
      <DocPageHeader
        title="Introduction"
        iconSlug="introduction"
        description={
          <>
            <code>@safelagoon/ui</code> is a shadcn-based React component library skinned with the Safe
            Lagoon Figma brandbook.
          </>
        }
        showDivider
      />

      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-h3 text-foreground">Install</h2>
          <CodeBlock code="npm install @safelagoon/ui" />
        </div>
        <div>
          <h2 className="mb-3 text-h3 text-foreground">Setup</h2>
          <CodeBlock
            code={`import { ThemeProvider } from "@safelagoon/ui";
import "@safelagoon/ui/styles.css";`}
          />
        </div>
        <div>
          <h2 className="mb-3 text-h3 text-foreground">shadcn CLI</h2>
          <CodeBlock code="npx shadcn@latest add @Safe-Lagoon/ui/button" />
        </div>
        <p className="text-body-16 text-muted-foreground">
          Browse components in the sidebar, or view the{" "}
          <Link href="https://github.com/Safe-Lagoon/ui" className="text-brand-blue underline">
            GitHub repository
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
