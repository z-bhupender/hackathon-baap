import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0", // Allow external access
    port: process.env.PORT || 10000, // Use Render's assigned port
    strictPort: true,
    allowedHosts: ["hackathon-baap.onrender.com"], // Your Render domain
  },
  preview: {
    port: process.env.PORT || 10000,
    strictPort: true,
  },
});
