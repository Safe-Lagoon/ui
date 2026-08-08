import { HomeCta } from "@/components/home-cta";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="text-h1 text-brand-blue">Safe Lagoon UI</h1>
      <p className="text-body-20 max-w-2xl text-muted-foreground">
        React component library for Safe Lagoon portals. Built on shadcn/ui, styled with the Figma brandbook.
      </p>
      <HomeCta />
    </main>
  );
}
