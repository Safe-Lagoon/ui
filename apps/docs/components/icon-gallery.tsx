"use client";

import { cn } from "@safelagoon/ui";
import { createElement, useMemo, useState } from "react";
import { iconCatalog, iconCategories, iconImportStatement } from "@/lib/icon-catalog";

export function IconGallery() {
  const [query, setQuery] = useState("");
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return iconCatalog;

    return iconCatalog.filter(
      (icon) =>
        icon.name.toLowerCase().includes(normalized) ||
        icon.category.toLowerCase().includes(normalized),
    );
  }, [query]);

  async function copyName(name: string) {
    await navigator.clipboard.writeText(name);
    setCopiedName(name);
    window.setTimeout(() => setCopiedName((current) => (current === name ? null : current)), 1500);
  }

  async function copyImport(icon: (typeof iconCatalog)[number]) {
    await navigator.clipboard.writeText(iconImportStatement(icon));
    setCopiedName(`${icon.name}-import`);
    window.setTimeout(
      () => setCopiedName((current) => (current === `${icon.name}-import` ? null : current)),
      1500,
    );
  }

  return (
    <div className="space-y-8">
      <div className="max-w-md">
        <label htmlFor="icon-search" className="mb-2 block text-body-14-semibold text-foreground">
          Search
        </label>
        <input
          id="icon-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter by name or category…"
          className="w-full rounded-md border border-border-soft bg-background px-3 py-2 text-body-14 text-foreground outline-none ring-brand-blue focus-visible:ring-2"
        />
      </div>

      {iconCategories.map((category) => {
        const icons = filtered.filter((icon) => icon.category === category);
        if (icons.length === 0) return null;

        return (
          <section key={category}>
            <h2 className="mb-4 text-h3 text-foreground">{category}</h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {icons.map((icon) => {
                const isCopied = copiedName === icon.name;
                const isImportCopied = copiedName === `${icon.name}-import`;

                return (
                  <li key={icon.name}>
                    <div className="flex h-full flex-col overflow-hidden rounded-[10px] border border-border-soft bg-background">
                      {icon.previewMode === "component" ? (
                        <div className="flex flex-1 flex-col items-center gap-3 px-3 py-4">
                          <div className="flex size-12 items-center justify-center rounded-md bg-muted/50">
                            {createElement(icon.component)}
                          </div>
                          <button
                            type="button"
                            onClick={() => copyName(icon.name)}
                            className="text-center transition-colors hover:text-brand-blue"
                            title={`Copy ${icon.name}`}
                          >
                            <code className="text-body-14 text-foreground">{icon.name}</code>
                          </button>
                          <span
                            className={cn(
                              "text-body-14 text-muted-foreground",
                              isCopied ? "text-brand-blue" : "invisible",
                            )}
                          >
                            Copied
                          </span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => copyName(icon.name)}
                          className="flex flex-1 flex-col items-center gap-3 px-3 py-4 transition-colors hover:bg-muted/40"
                          title={`Copy ${icon.name}`}
                        >
                          <span className="flex size-12 items-center justify-center rounded-md bg-muted/50 text-brand-blue">
                            {createElement(icon.component, {
                              className: "size-6",
                              "aria-hidden": true,
                            })}
                          </span>
                          <code className="text-center text-body-14 text-foreground">{icon.name}</code>
                          <span
                            className={cn(
                              "text-body-14 text-muted-foreground",
                              isCopied ? "text-brand-blue" : "invisible",
                            )}
                          >
                            Copied
                          </span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => copyImport(icon)}
                        className="border-t border-border-soft px-3 py-2 text-body-14 text-brand-blue transition-colors hover:bg-muted/30"
                      >
                        {isImportCopied ? "Import copied" : "Copy import"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {filtered.length === 0 ? (
        <p className="text-body-16 text-muted-foreground">No icons match your search.</p>
      ) : null}
    </div>
  );
}
