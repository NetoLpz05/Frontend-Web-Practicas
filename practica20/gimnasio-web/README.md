# Gimnasio Titanes

Aplicación web con React, TypeScript y Vite para consultar las clases del gimnasio e iniciar sesión con la API.

## Requisitos

- Node.js y npm.
- `gimnasio-backend` ejecutándose en `http://localhost:3000`.

## Desarrollo

```sh
npm install
npm run dev
```

Para usar otra URL de API, crea `.env.local` con:

```ini
VITE_API_URL=http://localhost:3000
```

La aplicación inicia sesión mediante `/auth/login`, guarda el JWT y el usuario en `localStorage`, y adjunta el token como `Bearer` en las peticiones Axios.

## Verificación

```sh
npm run build
npm run lint
```

## Práctica Angular 20

La práctica de Signals se conserva como aplicación Angular independiente en
`gimnasio-web\practica-angular-p20`, junto a la carpeta de la aplicación React.
No modifica las rutas ni las dependencias de React. Desde la carpeta exterior
`gimnasio-web`, ejecuta:

```sh
cd practica-angular-p20
npm install
npm start
```

Abre `http://localhost:4200/` para consultar el catálogo, filtrar por categoría
y ver el detalle de una clase.
