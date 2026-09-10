//Mapper de entidad a DTO
export function aResponseDTO(prestamo) {
    return {
        folio: prestamo.folio,
        libroId: prestamo.libroId,
        ejemplares: prestamo.ejemplares,
        socioId: prestamo.socioId,
        estado: prestamo.estado,
        creadoEn: prestamo.creadoEn.toISOString()
    };
}
