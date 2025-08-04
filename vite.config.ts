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
    nodePolyfills({ 
      protocolImports: true,
      // Explicitly exclude stream-browserify
      exclude: ["stream-browserify", "stream"]
    }),
    netlifyPlugin(),
    // Custom plugin to prevent stream-browserify resolution
    {
      name: 'prevent-stream-browserify',
      resolveId(id) {
        if (id === 'stream-browserify' || id === 'stream-browserify/web') {
          return 'node:stream';
        }
        if (id === 'stream/web') {
          return 'node:stream/web';
        }
        return null;
      }
    }
  ],

  build: {
    target: "esnext",
    modulePreload: { polyfill: true },
    rollupOptions: {
      external: ["stream-browserify"],
    },
  },

  optimizeDeps: {
    include: ["buffer", "process", "path-browserify", "istextorbinary"],
    esbuildOptions: { target: "esnext", supported: { "top-level-await": true } },
    exclude: ["stream-browserify", "stream-browserify/web"]
  },

  resolve: {
    alias: {
      // Force all stream imports to use Node.js built-ins
      "stream": "node:stream",
      "stream/web": "node:stream/web", 
      "stream-browserify": "node:stream",
      "stream-browserify/web": "node:stream/web",
      // Browser polyfills
      "path": "path-browserify",
      "buffer": "buffer",
    },
  },

  ssr: {
    target: "node",
    resolve: {
      conditions: ["node"],
      alias: {
        "stream": "node:stream",
        "stream/web": "node:stream/web",
        "stream-browserify": "node:stream",
        "stream-browserify/web": "node:stream/web",
        "path": "path-browserify", 
        "buffer": "buffer",
      },
    },
    external: ["stream-browserify"],
  },
}));
