import type { PrestamoRepository } from '../dominio/prestamo.repository.js';
import type { Prestamo } from '../dominio/prestamo.entity.js';

export class InMemoryPrestamoRepository implements PrestamoRepository {
  // El almacen: la llave es el folio, el valor es el prestamo completo.
  private readonly datos = new Map<string, Prestamo>();

  // TODO 2: implementar los cinco metodos
  async findById(folio: string): Promise<Prestamo | null> {
    return this.datos.get(folio) ?? null;
  }

  async findAll(): Promise<Prestamo[]> {
    return [...this.datos.values()];
  }

  async save(prestamo: Prestamo): Promise<Prestamo> {
    this.datos.set(prestamo.folio, prestamo);
    return prestamo;
  }

  async delete(folio: string): Promise<void> {
    this.datos.delete(folio);
  }

  async findByLibro(libroId: string): Promise<Prestamo[]> {
    return [...this.datos.values()].filter((p) => p.libroId === libroId);
  }
}
