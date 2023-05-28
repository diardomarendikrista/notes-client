import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths(), VitePWA({ manifest: manifest })],
});

const manifest = {
  name: "Petek Notes",
  short_name: "Petek Notes",
  description: "Simple Notes Application",
  start_url: "./index.html",
  display: "standalone",
  background_color: "#fff",
  theme_color: "#4caf50",
  icons: [
    {
      src: "/icons/icon.png",
      sizes: "48x48",
      type: "image/png",
    },
    {
      src: "/icons/icon.png",
      sizes: "72x72",
      type: "image/png",
    },
    {
      src: "/icons/icon.png",
      sizes: "96x96",
      type: "image/png",
    },
    {
      src: "/icons/icon.png",
      sizes: "144x144",
      type: "image/png",
    },
    {
      src: "/icons/icon.png",
      sizes: "168x168",
      type: "image/png",
    },
    {
      src: "/icons/icon.png",
      sizes: "192x192",
      type: "image/png",
    },
  ],
};
