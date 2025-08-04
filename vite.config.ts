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
    // Only polyfill the browser build
    !ssrBuild && nodePolyfills({ protocolImports: true }),
    netlifyPlugin(),
  ].filter(Boolean),

  build: {
    target: "esnext",
    modulePreload: { polyfill: true },
  },

  optimizeDeps: ssrBuild
    ? {}
    : {
        include: ["buffer", "process", "path-browserify", "istextorbinary"],
        esbuildOptions: { target: "esnext", supported: { "top-level-await": true } },
      },

  resolve: {
    alias: ssrBuild
      ? {
          // Force Node built-ins during SSR
          stream: "node:stream",
          "stream/web": "node:stream/web",
          "stream-browserify": "node:stream",
          "stream-browserify/web": "node:stream/web",
        }
      : {
          path: "path-browserify",
          buffer: "buffer",
        },
  },

  ssr: { target: "node" },
}));
