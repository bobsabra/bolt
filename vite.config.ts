import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import UnoCSS from "unocss/vite";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    remix({
      serverBuildFile: "index.js",
    }),
    tsconfigPaths(),
    UnoCSS(),
    nodePolyfills({
      // Only polyfill what's needed
      include: ['buffer', 'path'],
      globals: {
        Buffer: true,
      },
    }),
    netlifyPlugin(),
  ],
  
  resolve: {
    alias: {
      path: "path-browserify",
    },
  },
  
  ssr: {
    noExternal: true,
  },
});
