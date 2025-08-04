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
      "stream/web": "node:stream/web",
      stream: "node:stream",
      path: "path-browserify",
      buffer: "buffer",
    },
  },

  ssr: {
    target: "node",
    resolve: {
      conditions: ["node"],
    },
  },
}));
