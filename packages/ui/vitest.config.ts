import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@safelagoon/ui/blocks": path.join(root, "src/blocks/index.ts"),
      "@safelagoon/ui/icons": path.join(root, "src/icons/index.ts"),
      "@safelagoon/ui": path.join(root, "src/index.ts"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
