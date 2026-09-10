import type { Repository } from './repository.js';
import type { Prestamo } from './prestamo.entity.js';

export interface PrestamoRepository extends Repository<Prestamo, string> {
  findByLibro(libroId: string): Promise<Prestamo[]>;
}
