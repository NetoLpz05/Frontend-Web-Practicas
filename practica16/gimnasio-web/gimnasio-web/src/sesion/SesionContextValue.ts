import { createContext } from 'react';
import type { Usuario } from '../tipos.ts';

export interface ValorSesion {
  usuario: Usuario | null;
  entrar: (correo: string, password: string) => Promise<void>;
  registrar: (nombre: string, correo: string, password: string) => Promise<void>;
  salir: () => void;
}

export const SesionContext = createContext<ValorSesion | null>(null);
