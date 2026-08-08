import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const stylesDir = join(root, "src/styles");

mkdirSync(dist, { recursive: true });

const files = ["theme.css", "typography.css", "base.css"];
const combined = files
  .map((file) => readFileSync(join(stylesDir, file), "utf-8"))
  .join("\n");

writeFileSync(join(dist, "styles.css"), combined);
