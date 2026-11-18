import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  // O Next exige "jsx": "preserve" no tsconfig, e com isso o Vite deixaria o JSX sem transformar
  // e os testes de componentes nem rodariam. Nos testes, transformamos o JSX por conta própria.
  oxc: { jsx: { runtime: "automatic", importSource: "react" } },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // O Next só funciona por completo dentro do próprio servidor; nos testes usamos
      // substitutos simples para imagem e navegação (ver src/tests/stubs).
      "next/image": path.resolve(__dirname, "./src/tests/stubs/next-image.tsx"),
      "next/navigation": path.resolve(__dirname, "./src/tests/stubs/next-navigation.ts"),
    },
  },
});
