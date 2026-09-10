import express from 'express';
import { PrestamoService } from '../servicios/prestamo.service.js';
import { InMemoryPrestamoRepository } from '../infra/in-memory-prestamo.repository.js';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';
import { ValidacionError } from './errores-http.js';
import { validarCrearPrestamo } from './validar.js';
import { aResponseDto } from '../dto/prestamo-response.dto.js';
import type { ErrorResponseDTO } from '../contratos/prestamo.dto.js';

const PUERTO = 3000;
const repositorio = new InMemoryPrestamoRepository();
const servicio = new PrestamoService(repositorio);

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode}`);
  });
  next();
});
app.use(express.static('publico'));
app.use(express.static('publico/cliente'));
app.use(express.static('dist/cliente'));

app.get('/api/prestamos', async (req, res, next) => {
  try {
    const libroId = typeof req.query.libroId === 'string' ? req.query.libroId.trim() : '';
    if (libroId === '') {
      const error: ErrorResponseDTO = {
        error: 'PARAMETRO_FALTANTE',
        mensaje: 'Se requiere el parametro libroId',
      };
      res.status(400).json(error);
      return;
    }

    const prestamos = await servicio.listarPorLibro(libroId);
    res.status(200).json(prestamos.map(aResponseDto));
  } catch (error) {
    next(error);
  }
});

app.post('/api/prestamos', async (req, res, next) => {
  try {
    const dto = validarCrearPrestamo(req.body);
    const prestamo = await servicio.crear(dto);
    res.status(201).location(`/api/prestamos/${prestamo.folio}`).json(aResponseDto(prestamo));
  } catch (error) {
    next(error);
  }
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof ValidacionError) {
    const error: ErrorResponseDTO = {
      error: 'VALIDACION',
      mensaje: err.message,
      detalles: err.detalles.join('; '),
    };
    res.status(400).json(error);
    return;
  }

  if (err instanceof EjemplarPrestadoError) {
    const error: ErrorResponseDTO = {
      error: 'EJEMPLAR_PRESTADO',
      mensaje: err.message,
    };
    res.status(409).json(error);
    return;
  }

  console.error('Error no controlado:', err);
  res.status(500).json({
    error: 'ERROR_INTERNO',
    mensaje: 'Ocurrio un error interno',
  });
});

app.listen(PUERTO, () => {
  console.log(`\n API -> http://localhost:${PUERTO}/api/prestamos`);
  console.log(`   Cliente -> http://localhost:${PUERTO}/\n`);
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
