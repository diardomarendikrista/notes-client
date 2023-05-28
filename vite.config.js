import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    jsconfigPaths(),
    VitePWA({
      injectRegister: "auto",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Petek Notes",
        short_name: "Petek Notes",
        description: "Simple Notes Application",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon-48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "icon-72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "icon-96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "icon-144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      server: {
        host: "localhost",
        port: 3000,
      },
    }),
  ],
});
