import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig(({ mode }) => ({
  plugins: [glsl({ compress: mode !== "development" })],
}));
