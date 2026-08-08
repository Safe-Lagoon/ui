"use client";

import Link from "next/link";
import { Button } from "@safelagoon/ui";

export function HomeCta() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Button asChild variant="primary">
        <Link href="/docs">Browse components</Link>
      </Button>
      <Button asChild variant="secondary-blue">
        <a href="https://github.com/Safe-Lagoon/ui" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </Button>
    </div>
  );
}
