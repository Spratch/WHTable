import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "wh-table",
      fileName: (format) => `wh-table.${format}.js`
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "tailwindcss",
        "@tailwindcss/vite",
        "tailwindcss-react-aria-components",
        "react-aria-components"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-aria-components": "ReactAriaComponents"
        }
      }
    }
  },
  plugins: [
    react(),
    dts({
      include: ["src/**/*.ts", "src/**/*.tsx"],
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json"
    })
  ]
});
