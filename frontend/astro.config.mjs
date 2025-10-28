import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import { imageService } from "@unpic/astro/service";
import netlify from "@astrojs/netlify";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["jpeg-js"],
    },
  },
  integrations: [react()],
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
  // adapter: netlify({
  // adapter: netlify({ isr: { expiration: 60 * 60 } }), // comentar para dev
  // }),
});
