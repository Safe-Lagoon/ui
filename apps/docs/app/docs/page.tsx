import Link from "next/link";

export default function DocsHomePage() {
  return (
    <article>
      <h1>Introduction</h1>
      <p>
        <code>@safelagoon/ui</code> is a shadcn-based React component library skinned with the Safe Lagoon
        Figma brandbook.
      </p>
      <h2>Install</h2>
      <pre>{`npm install @safelagoon/ui`}</pre>
      <h2>Setup</h2>
      <pre>{`import { ThemeProvider } from "@safelagoon/ui";
import "@safelagoon/ui/styles.css";`}</pre>
      <h2>shadcn CLI</h2>
      <pre>{`npx shadcn@latest add @Safe-Lagoon/ui/button`}</pre>
      <p>
        Browse components in the sidebar, or view the{" "}
        <Link href="https://github.com/Safe-Lagoon/ui" className="text-brand-blue underline">
          GitHub repository
        </Link>
        .
      </p>
    </article>
  );
}
