import { useContext } from 'react';
import { SesionContext } from './SesionContextValue.ts';

export function useSesion() {
  const valor = useContext(SesionContext);
  if (!valor) throw new Error('useSesion() tiene que usarse dentro de <ProveedorSesion>');
  return valor;
}
