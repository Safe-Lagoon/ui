import { readFileSync } from "node:fs";
import { join } from "node:path";
import { demos } from "@/registry/demos";

type ComponentPreviewProps = {
  name: keyof typeof demos;
};

export function ComponentPreview({ name }: ComponentPreviewProps) {
  const Demo = demos[name];
  if (!Demo) return <p>Demo not found: {name}</p>;

  let code = "";
  try {
    code = readFileSync(join(process.cwd(), "registry/demos", `${name}.tsx`), "utf-8");
  } catch {
    code = "// Source unavailable";
  }

  return (
    <div className="my-6 overflow-hidden rounded-[10px] border border-border-soft">
      <div className="border-b border-border-soft bg-muted/30 p-6 flex items-center justify-center min-h-[120px]">
        <Demo />
      </div>
      <pre className="overflow-x-auto bg-ink p-4 text-body-14 text-white">
        <code>{code}</code>
      </pre>
    </div>
  );
}
