import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import UnoCSS from "unocss/vite";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";

export default defineConfig({
  plugins: [
    remix({
      serverBuildFile: "index.js",
    }),
    tsconfigPaths(),
    UnoCSS(),
    netlifyPlugin(),
  ],
  
  ssr: {
    noExternal: true,
  },
});
