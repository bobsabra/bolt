import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import UnoCSS from "unocss/vite";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// Vite config
export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    UnoCSS(),                 // for virtual:uno.css
   nodePolyfills({ protocolImports: true }),
    netlifyPlugin(),
  ],
  resolve: {
    alias: {
      path: "path-browserify", // ✅ fixes `istextorbinary` using `path`
      buffer: "buffer",
    },
  },
  optimizeDeps: {
    include: [
      "buffer",
      "process",
      "path-browserify",
      "istextorbinary",
    ],
  },
});
