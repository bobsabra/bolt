import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import UnoCSS from "unocss/vite";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig(() => ({
  plugins: [
    remix(),
    tsconfigPaths(),
    UnoCSS(),
    // Safe to include; we’ll pin SSR resolution to Node so it won’t leak into SSR.
    nodePolyfills({ protocolImports: true }),
    netlifyPlugin(),
  ],

  build: {
    target: "esnext",
    modulePreload: { polyfill: true },
  },

  optimizeDeps: {
    include: ["buffer", "process", "path-browserify", "istextorbinary"],
    esbuildOptions: { target: "esnext", supported: { "top-level-await": true } },
  },

  resolve: {
    alias: {
      // Always force Node built-ins if anything imports these paths.
      "stream/web": "node:stream/web",
      stream: "node:stream",
      "stream-browserify": "node:stream",
      "stream-browserify/web": "node:stream/web",

      // Browser shims for actual browser code
      path: "path-browserify",
      buffer: "buffer",
    },
  },

  ssr: {
    target: "node",
    resolve: {
      // Prefer node conditions when resolving exports
      conditions: ["node"],
    },
  },
}));
