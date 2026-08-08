"use client";

import { CodeBlock } from "@/components/code-block";
import { DemoRenderer } from "@/components/demo-renderer";
import { demoSources } from "@/registry/demo-sources";
import type { DemoName } from "@/registry/demo-names";

type ComponentPreviewProps = {
  name: DemoName;
  title?: string;
};

export function ComponentPreview({ name, title }: ComponentPreviewProps) {
  const code = demoSources[name] ?? "// Source unavailable";

  return (
    <section className="my-6">
      {title ? <h3 className="mb-3 text-body-16-semibold text-foreground">{title}</h3> : null}
      <div className="overflow-hidden rounded-[10px] border border-border-soft">
        <div className="flex min-h-[120px] items-center justify-center border-b border-border-soft bg-muted/30 p-6">
          <DemoRenderer name={name} />
        </div>
        <CodeBlock code={code} className="rounded-none border-0" />
      </div>
    </section>
  );
}

type ComponentPreviewListProps = {
  examples: Array<{ title: string; preview: DemoName }>;
};

export function ComponentPreviewList({ examples }: ComponentPreviewListProps) {
  return (
    <>
      {examples.map((example) => (
        <ComponentPreview key={`${example.preview}-${example.title}`} name={example.preview} title={example.title} />
      ))}
    </>
  );
}
