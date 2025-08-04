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
    // Enhanced node polyfills for runtime compatibility
    nodePolyfills({ 
      protocolImports: true,
      // Include all necessary polyfills for runtime
      include: ['buffer', 'process', 'util', 'stream', 'events'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
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
      // Force all stream imports to use Node.js built-ins
      "stream": "node:stream",
      "stream/web": "node:stream/web", 
      // Browser polyfills
      "path": "path-browserify",
      "buffer": "buffer",
    },
  },

  ssr: {
    target: "node",
    resolve: {
      conditions: ["node"],
    },
    // Don't externalize these - we want them bundled with polyfills
    noExternal: ["buffer"],
  },

  define: {
    // Ensure Buffer is available globally at runtime
    global: 'globalThis',
  },
}));
