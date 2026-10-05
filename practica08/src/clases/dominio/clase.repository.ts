import type { Clase } from './entidades';

export interface ClaseRepository {
  listar(): Promise<Clase[]>;
  crear(nombre: string): Promise<Clase>;
}