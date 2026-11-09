import { create } from 'zustand';
import { traerMisInscripciones } from '../servicios/gimnasio.ts';
import { mensajeDeError } from '../servicios/api.ts';
import type { Inscripcion } from '../tipos.ts';

interface EstadoInscripciones {
  lista: Inscripcion[];
  cargando: boolean;
  error: string | null;
  cargar: () => Promise<void>;
  vaciar: () => void;
}

let solicitudActual = 0;

export const useInscripciones = create<EstadoInscripciones>()((set) => ({
  lista: [],
  cargando: true,
  error: null,

  cargar: async () => {
    const solicitud = ++solicitudActual;
    set({ cargando: true, error: null });
    try {
      const lista = await traerMisInscripciones();
      if (solicitud === solicitudActual) set({ lista });
    } catch (e) {
      if (solicitud === solicitudActual) {
        set({ error: mensajeDeError(e, 'No se pudieron cargar tus inscripciones.') });
      }
    } finally {
      if (solicitud === solicitudActual) set({ cargando: false });
    }
  },

  vaciar: () => {
    solicitudActual++;
    set({ lista: [], cargando: false, error: null });
  },
}));
