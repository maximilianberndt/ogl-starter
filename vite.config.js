import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import eslint from "vite-plugin-eslint";

export default defineConfig(({ mode }) => ({
  plugins: [
    glsl({ compress: mode !== "development" }),
    eslint(),
  ],
}));
