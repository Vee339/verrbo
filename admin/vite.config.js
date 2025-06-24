import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/verrbo/admin/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://verrbo-api.onrender.com/", // backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
