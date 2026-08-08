import Link from "next/link";
import { Button } from "@safelagoon/ui";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="text-h1 text-brand-blue">Safe Lagoon UI</h1>
      <p className="text-body-20 text-muted-foreground max-w-2xl">
        React component library for Safe Lagoon portals. Built on shadcn/ui, styled with the Figma brandbook.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button asChild variant="primary">
          <Link href="/docs">Browse components</Link>
        </Button>
        <Button asChild variant="secondary-blue">
          <a href="https://github.com/Safe-Lagoon/ui" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </Button>
      </div>
    </main>
  );
}
