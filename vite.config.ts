import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import UnoCSS from "unocss/vite"; // ✅ enable UnoCSS

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    UnoCSS(),         // ✅ this generates "virtual:uno.css"
    netlifyPlugin(),
  ],
});
