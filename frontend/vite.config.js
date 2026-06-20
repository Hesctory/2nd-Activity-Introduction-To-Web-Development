import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During development the React app runs on http://localhost:5173 and any
// request to /api is proxied to the backend Web Service on port 3001.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
