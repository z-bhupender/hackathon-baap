import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 10000,
    strictPort: true,
    allowedHosts: ["hackathon-baap.onrender.com"],
  },
  preview: {
    port: process.env.PORT || 10000,
    strictPort: true,
  },
});
