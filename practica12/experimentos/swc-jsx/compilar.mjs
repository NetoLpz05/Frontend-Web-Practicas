import { readFileSync } from "node:fs";
import { transformSync } from "@swc/core";

const source = readFileSync(new URL("./src/Componente.jsx", import.meta.url), "utf8");

console.log("=== Intento sin configuración ===");
try {
  transformSync(source, { filename: "Componente.jsx" });
  console.log("SWC aceptó JSX sin configuración.");
} catch (error) {
  console.log(error.message.split("\n")[0]);
}

for (const runtime of ["classic", "automatic"]) {
  const { code } = transformSync(source, {
    filename: "Componente.jsx",
    jsc: {
      parser: { syntax: "ecmascript", jsx: true },
      transform: { react: { runtime } },
    },
    module: { type: "es6" },
  });

  console.log(`\n=== Runtime ${runtime} ===`);
  console.log(code);
}
