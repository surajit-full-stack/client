import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  server:{
    watch:{
      // usePolling:true
    },
    host:true,
    strictPort:true,
    port:5173
  }
});
