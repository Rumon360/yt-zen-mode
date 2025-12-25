import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "Zen Mode - Youtube",
    description:
      "Zen Mode - Youtube is a browser extension helps you to watch videos in Zen mode. 😌",
    version: "0.1.0",
    permissions: ["tabs", "storage"],
  },
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  }),
  hooks: {
    "build:manifestGenerated": (wxt, manifest) => {
      manifest.content_scripts = manifest.content_scripts || [];
      manifest.content_scripts?.push({
        css: ["assets/reset.css"],
        matches: ["*://*.youtube.com/*"],
      });
    },
  },
});
