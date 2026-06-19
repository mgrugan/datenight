import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Absolute base for the GitHub Pages project site (https://<user>.github.io/datenight/).
  // Using an absolute path (not "./") means assets resolve correctly even when the
  // URL is visited without a trailing slash.
  base: "/datenight/",
});
