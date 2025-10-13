import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import relativeLinks from "astro-relative-links";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [relativeLinks()]
});