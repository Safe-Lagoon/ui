"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo?: React.ReactNode;
  sections?: FooterSection[];
  languages?: FooterLink[];
  social?: React.ReactNode;
  copyright?: string;
  legal?: FooterLink[];
  className?: string;
}

export function Footer({
  logo,
  sections = [],
  languages = [],
  social,
  copyright,
  legal = [],
  className,
}: FooterProps) {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  return (
    <footer className={cn("bg-footer text-white", className)}>
      <div className="mx-auto max-w-[1360px] px-5 py-12">
        <div className="mb-8">{logo}</div>
        <div className="hidden gap-12 md:grid md:grid-cols-4">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-body-18-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-body-16 text-white/80 hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="md:hidden">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-white/20">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-start text-body-18-semibold"
                onClick={() => setExpanded(expanded === section.title ? null : section.title)}
              >
                {section.title}
                <ChevronDown className={cn("size-4 transition-transform", expanded === section.title && "rotate-180")} />
              </button>
              {expanded === section.title ? (
                <ul className="pb-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-body-16 text-white/80">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
        {languages.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-4">
            {languages.map((lang) => (
              <a key={lang.href} href={lang.href} className="text-body-16 text-white/80 hover:text-white">
                {lang.label}
              </a>
            ))}
          </div>
        ) : null}
        {social ? <div className="mt-8">{social}</div> : null}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/20 pt-8 md:flex-row md:items-center md:justify-between">
          {legal.map((link) => (
            <a key={link.href} href={link.href} className="text-body-14 text-white/70 hover:text-white">
              {link.label}
            </a>
          ))}
          {copyright ? <p className="text-body-14 text-white/60">{copyright}</p> : null}
        </div>
      </div>
    </footer>
  );
}
