import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { ComponentPreviewList } from "@/components/component-preview";
import { DocPageHeader } from "@/components/doc-page-header";
import { PropsTable } from "@/components/props-table";
import { getDocProps } from "@/lib/doc-props";
import { docPages } from "@/lib/doc-pages";

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = docPages[slug];
  if (!page) notFound();

  const props = getDocProps(slug);

  return (
    <article>
      <DocPageHeader
        title={page.title}
        description={page.description}
        iconSlug={slug}
        showDivider
      />

      {props.length > 0 ? (
        <section className="mb-10">
          <h2 className="mb-4 text-h3 text-foreground">Props</h2>
          <PropsTable props={props} />
        </section>
      ) : null}

      {page.examples.length > 0 ? (
        <section className="mb-10">
          <h2 className="mb-4 text-h3 text-foreground">Examples</h2>
          <ComponentPreviewList examples={page.examples} />
        </section>
      ) : null}

      {page.code ? (
        <section>
          <h2 className="mb-4 text-h3 text-foreground">Usage</h2>
          <CodeBlock code={page.code} />
        </section>
      ) : null}
    </article>
  );
}

export function generateStaticParams() {
  return Object.keys(docPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = docPages[slug];
  if (!page) return {};
  return { title: `${page.title} | Safe Lagoon UI`, description: page.description };
}
