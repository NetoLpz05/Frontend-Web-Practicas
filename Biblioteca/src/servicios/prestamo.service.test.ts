import assert from 'node:assert/strict';
import { test } from 'node:test';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';
import { InMemoryPrestamoRepository } from '../infra/in-memory-prestamo.repository.js';
import { PrestamoService } from './prestamo.service.js';

test('crea un prestamo cuando los ejemplares estan disponibles', async () => {
  const servicio = new PrestamoService(new InMemoryPrestamoRepository());

  const prestamo = await servicio.crear({
    libroId: 'LIB-001',
    socioId: 'S-001',
    ejemplares: [1, 2],
  });

  assert.equal(prestamo.libroId, 'LIB-001');
  assert.equal(prestamo.socioId, 'S-001');
  assert.deepEqual(prestamo.ejemplares, [1, 2]);
  assert.equal(prestamo.estado, 'activo');
});

test('rechaza un prestamo si incluye un ejemplar ya prestado', async () => {
  const servicio = new PrestamoService(new InMemoryPrestamoRepository());

  await servicio.crear({
    libroId: 'LIB-001',
    socioId: 'S-001',
    ejemplares: [1, 2],
  });

  await assert.rejects(
    servicio.crear({
      libroId: 'LIB-001',
      socioId: 'S-002',
      ejemplares: [2, 3],
    }),
    (error: unknown) => {
      assert.ok(error instanceof EjemplarPrestadoError);
      assert.equal(error.ejemplar, 2);
      return true;
    },
  );
});
