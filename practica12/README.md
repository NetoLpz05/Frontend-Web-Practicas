# Práctica de React, TypeScript y JSX

Proyecto creado con Vite usando la plantilla de React y TypeScript. Para
instalar las dependencias y arrancar el servidor de desarrollo:

```sh
npm install
npm run dev
```

## 1. Compilación de JSX con SWC

El experimento independiente está en `experimentos/swc-jsx`. Ejecuta:

```sh
cd experimentos/swc-jsx
npm install
npm run compile
```

El script primero pasa el componente a SWC sin habilitar el parser JSX, lo que
produce `Expression expected`. Luego compila con los runtimes `classic` y
`automatic`; el [README del experimento](./experimentos/swc-jsx/README.md)
describe y compara las salidas.

## 2. Estructura de Vite

- [index.html](./index.html) contiene el contenedor vacío `<div id="root">`.
- [src/main.tsx](./src/main.tsx) obtiene ese contenedor y monta `<App />` con
  `createRoot` de React DOM.
- [src/index.css](./src/index.css) contiene los estilos de la práctica y
  reemplaza los estilos de ejemplo de Vite.
- La opción `jsx: "react-jsx"` de `tsconfig.app.json` configura el runtime JSX
  automático para TypeScript.

## 3. React sin JSX

[src/EjemploSinJSX.ts](./src/EjemploSinJSX.ts) construye todo el ejemplo con
`createElement` de React: un título y una tarjeta con tres elementos hijos.
`App` lo incluye para mostrarlo junto a los componentes escritos con JSX.

## 4. Primer componente y tarjetas

[src/Saludo.tsx](./src/Saludo.tsx) define la interfaz `SaludoProps` y un
componente que recibe `nombre`; [src/App.tsx](./src/App.tsx) lo usa. El
componente [TarjetaPerfil](./src/TarjetaPerfil.tsx) muestra tarjetas tipadas
con información del equipo.