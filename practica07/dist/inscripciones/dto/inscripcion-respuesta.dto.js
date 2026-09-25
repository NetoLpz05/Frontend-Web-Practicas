"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aInscripcionDto = aInscripcionDto;
function aInscripcionDto(i) {
    return {
        id: i.id,
        horarioId: i.horarioId,
        miembroId: i.miembroId,
        estado: i.estado,
        creadaEn: i.creadaEn.toISOString(),
    };
}
//# sourceMappingURL=inscripcion-respuesta.dto.js.map