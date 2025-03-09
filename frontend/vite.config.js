import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0", // Allow external access
    port: process.env.PORT || 5173, // Use Render's port or default to 5173
  },
});
