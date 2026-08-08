"use client";

import * as React from "react";
import { cn } from "@safelagoon/ui";
import { CodeBlock } from "@/components/code-block";
import { useDocsPreview } from "@/components/docs-preview-context";
import { DemoRenderer } from "@/components/demo-renderer";
import { demoSources } from "@/registry/demo-sources";
import type { DemoName } from "@/registry/demo-names";

type ComponentPreviewProps = {
  name: DemoName;
  title?: string;
};

export function ComponentPreview({ name, title }: ComponentPreviewProps) {
  const preview = useDocsPreview();
  const previewWidth = preview?.previewWidth;
  const [code, setCode] = React.useState("");

  React.useEffect(() => {
    setCode(demoSources[name] ?? "// Source unavailable");
  }, [name]);

  return (
    <section className="my-6">
      {title ? <h3 className="mb-3 text-body-16-semibold text-foreground">{title}</h3> : null}
      <div
        className={cn(
          "mx-auto w-full transition-[max-width] duration-200",
          previewWidth && "rounded-[10px] ring-1 ring-border-soft ring-offset-2 ring-offset-background",
        )}
        style={previewWidth ? { maxWidth: previewWidth } : undefined}
      >
        <div className="overflow-hidden rounded-[10px] border border-border-soft">
          <div className="border-b border-border-soft bg-muted/30 p-6">
            <DemoRenderer name={name} />
          </div>
          <CodeBlock code={code} className="rounded-none border-0" />
        </div>
      </div>
      {previewWidth ? (
        <p className="mt-2 text-center text-body-14 text-muted-foreground">{previewWidth}px preview</p>
      ) : null}
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
