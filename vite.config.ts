/// <reference types="vitest/config" />
import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "src"),
        },
    },

    plugins: [react(), svgr(), tailwindcss()],

    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/test/setup.ts",
    },

    base: "/",
})
