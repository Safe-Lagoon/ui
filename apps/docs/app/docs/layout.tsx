import Link from "next/link";
import type { ReactNode } from "react";
import "./docs.css";

const nav = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/foundations", label: "Foundations" },
  { href: "/docs/components/button", label: "Button" },
  { href: "/docs/components/input", label: "Input" },
  { href: "/docs/components/checkbox", label: "Checkbox" },
  { href: "/docs/components/dialog", label: "Dialog" },
  { href: "/docs/components/tabs", label: "Tabs" },
  { href: "/docs/components/table", label: "Table" },
  { href: "/docs/components/log-card", label: "Log Card" },
  { href: "/docs/components/profile-card", label: "Profile Card" },
  { href: "/docs/components/rule-card", label: "Rule Card" },
  { href: "/docs/components/schedule-grid", label: "Schedule Grid" },
  { href: "/docs/components/sign-in-form", label: "Sign In Form" },
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-shell mx-auto flex min-h-screen max-w-7xl gap-8 px-6 py-8">
      <aside className="hidden w-64 shrink-0 md:block">
        <Link href="/" className="mb-6 block text-lg font-bold text-brand-blue">
          Safe Lagoon UI
        </Link>
        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 flex-1 docs-content">{children}</main>
    </div>
  );
}
