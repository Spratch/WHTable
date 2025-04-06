import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import libCss from "vite-plugin-libcss";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "whtable",
      formats: ["es"],
      fileName: (format) => `whtable.${format}.js`
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
    tailwindcss(),
    dts({
      include: ["src/**/*.ts", "src/**/*.tsx"],
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json"
    }),
    libCss()
  ]
});
