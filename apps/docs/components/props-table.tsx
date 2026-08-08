import type { DocProp } from "@/lib/doc-props";

type PropsTableProps = {
  props: DocProp[];
};

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-[10px] border border-border-soft">
      <table className="w-full min-w-[640px] border-collapse text-start text-body-14">
        <thead>
          <tr className="border-b border-border-soft bg-muted/40">
            <th className="px-4 py-3 font-semibold text-foreground">Prop</th>
            <th className="px-4 py-3 font-semibold text-foreground">Type</th>
            <th className="px-4 py-3 font-semibold text-foreground">Default</th>
            <th className="px-4 py-3 font-semibold text-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-border-soft last:border-0">
              <td className="px-4 py-3 align-top">
                <code className="text-body-14-semibold text-brand-blue">{prop.name}</code>
                {prop.required ? (
                  <span className="ms-2 text-body-14 text-destructive">required</span>
                ) : null}
              </td>
              <td className="px-4 py-3 align-top">
                <code className="whitespace-pre-wrap text-body-14 text-muted-foreground">{prop.type}</code>
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">
                {prop.default ? <code>{prop.default}</code> : "—"}
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
