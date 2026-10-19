import { createElement } from "react";

export function EjemploSinJSX() {
  return createElement(
    "section",
    { className: "ejemplo-sin-jsx" },
    createElement("h2", { className: "ejemplo-sin-jsx__titulo" }, "Tarjeta sin JSX"),
    createElement(
      "article",
      { className: "tarjeta" },
      createElement("h3", { className: "tarjeta__nombre" }, "Ada Lovelace"),
      createElement("p", { className: "tarjeta__carrera" }, "Matemática y escritora"),
      createElement("p", { className: "tarjeta__semestre" }, "Pionera de la programación"),
    ),
  );
}
