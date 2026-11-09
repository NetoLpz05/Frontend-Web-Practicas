
import { useEffect, useState, type ReactNode } from 'react';
import * as servicio from '../servicios/sesion.ts';
import { SesionContext } from './SesionContextValue.ts';
import type { Sesion, Usuario } from '../tipos.ts';
function leerUsuario(): Usuario | null {
  const guardado = localStorage.getItem('usuario');
  return guardado ? (JSON.parse(guardado) as Usuario) : null;
}

export function ProveedorSesion({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(leerUsuario);

  useEffect(() => {
    const alTerminar = () => setUsuario(null);
    window.addEventListener('sesion-terminada', alTerminar);
    return () => window.removeEventListener('sesion-terminada', alTerminar);
  }, []);

  function guardar(sesion: Sesion) {
    localStorage.setItem('token', sesion.token);
    localStorage.setItem('usuario', JSON.stringify(sesion.usuario));
    setUsuario(sesion.usuario);
  }

  async function entrar(correo: string, password: string) {
    guardar(await servicio.entrar(correo, password));
  }

  async function registrar(nombre: string, correo: string, password: string) {
    guardar(await servicio.registrar(nombre, correo, password));
  }

  function salir() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  return (
    <SesionContext value={{ usuario, entrar, registrar, salir }}>
      {children}
    </SesionContext>
  );
}
