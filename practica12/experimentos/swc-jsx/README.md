# Experimento: compilación JSX con SWC

Este ejercicio está aislado del proyecto Vite. Desde esta carpeta:

```sh
npm install
npm run compile
```

## Intento sin configuración

La primera llamada entrega el archivo `.jsx` a SWC sin habilitar el parser JSX.
SWC falla al encontrar el primer `<` del `return` con `Expression expected`.
Para compilar JSX hay que activar `jsc.parser.jsx`.

## Runtime clásico

Con `jsc.transform.react.runtime: "classic"`, SWC conserva el `import React` y
convierte el JSX en llamadas a `React.createElement(...)`. El elemento padre
recibe como argumentos sus tres elementos hijos.

## Runtime automático

Con `runtime: "automatic"`, SWC importa `jsx`/`jsxs` desde
`react/jsx-runtime` y crea el árbol con esas funciones. No es necesario importar
React sólo para poder escribir JSX en este modo. 

El script imprime las dos salidas completas para compararlas. La aplicación
principal usa TypeScript con `"jsx": "react-jsx"` en `tsconfig.app.json`, que es
el runtime automático.
