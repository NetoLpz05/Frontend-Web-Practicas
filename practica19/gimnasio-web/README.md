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
