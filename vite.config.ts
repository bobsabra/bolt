// vite.config.ts
import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import UnoCSS from "unocss/vite";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig(({ ssrBuild }) => ({
  plugins: [
    remix(),
    tsconfigPaths(),
    UnoCSS(),
    // ❌ Do NOT run polyfills on SSR – they rewrite node:stream/web
    !ssrBuild && nodePolyfills({ protocolImports: true }),
    netlifyPlugin(),
  ].filter(Boolean),

  build: {
    target: "esnext",
    modulePreload: { polyfill: true },
  },

  optimizeDeps: ssrBuild
    ? {} // no client deps/polyfills during SSR pre-bundle
    : {
        include: ["buffer", "process", "path-browserify", "istextorbinary"],
        esbuildOptions: { target: "esnext", supported: { "top-level-await": true } },
      },

  resolve: {
    // ❌ No browser aliases for SSR
    alias: ssrBuild
      ? {}
      : {
          path: "path-browserify",
          buffer: "buffer",
        },
  },
}));
