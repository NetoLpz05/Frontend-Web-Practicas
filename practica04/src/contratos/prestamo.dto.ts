import type {Prestamo, EstadoPrestamo} from '../dominio/prestamo.entity.js';

//Lo que el clienbte recibe
export interface PrestamoResponseDTO {
    folio: string;
    libroId: string;
    ejemplares: number[];
    socioId: string;
    estado: EstadoPrestamo;
    creadoEn: string;
}

//Lo que el cliente manda
export interface CrearPrestamoRequestDTO {
    libroId: string;
    ejemplares: number[];
    socioId: string;
}

//Forma de los errores que son parte del contrato
export interface ErrorResponseDTO{
    error: string;
    mensaje: string;
    detalles ?: string;
}

//Mapper de entidad a DTO

export function aResponseDTO(prestamo: Prestamo): PrestamoResponseDTO {
    return {
        folio: prestamo.folio,
        libroId: prestamo.libroId,
        ejemplares: prestamo.ejemplares,
        socioId: prestamo.socioId,
        estado: prestamo.estado,
        creadoEn: prestamo.creadoEn.toISOString()
    };
}