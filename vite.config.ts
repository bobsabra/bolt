import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";

// ✅ Only ONE export default. Keep all plugins in this single config.
export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    netlifyPlugin(),
  ],
});
