import { notFound } from "next/navigation";
import { ComponentPreview } from "@/components/component-preview";
import { docPages } from "@/lib/doc-pages";

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = docPages[slug];
  if (!page) notFound();

  return (
    <article>
      <h1>{page.title}</h1>
      <p>{page.description}</p>
      {page.preview ? <ComponentPreview name={page.preview} /> : null}
      <h2>Usage</h2>
      <pre>{page.code}</pre>
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
