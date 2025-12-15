import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import { imageService } from "@unpic/astro/service";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["jpeg-js"],
    },
    server: {
      allowedHosts: ["mannishly-tactile-emerson.ngrok-free.dev"],
      host: "0.0.0.0",
      hmr: {
        protocol: "wss",
        host: "mannishly-tactile-emerson.ngrok-free.dev",
        clientPort: 443,
      },
    },
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes("/admin") && !page.includes("/api/"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es-ES",
        },
      },
    }),
  ],
  site: "https://educarsano.com",
  output: "server",
  server: {
    headers: {
      "X-Frame-Options": "ALLOWALL",
      "Content-Security-Policy": "frame-ancestors 'self' http://localhost:3000",
    },
  },
  image: {
    service: imageService({
      fallbackService: "cloudinary",
      placeholder: "blurhash",
      layout: "constrained",
    }),
  },
  adapter: netlify({}),
});
