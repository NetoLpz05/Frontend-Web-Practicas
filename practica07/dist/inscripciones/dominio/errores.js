"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InscripcionDuplicadaError = exports.CupoLlenoError = exports.MiembroNoEncontradoError = exports.HorarioNoEncontradoError = void 0;
class HorarioNoEncontradoError extends Error {
    constructor(horarioId) {
        super(`No existe el horario ${horarioId}`);
    }
}
exports.HorarioNoEncontradoError = HorarioNoEncontradoError;
class MiembroNoEncontradoError extends Error {
    constructor(miembroId) {
        super(`No existe el miembro ${miembroId}`);
    }
}
exports.MiembroNoEncontradoError = MiembroNoEncontradoError;
class CupoLlenoError extends Error {
    constructor(horarioId, cupoMaximo) {
        super(`El horario ${horarioId} ya tiene ${cupoMaximo} inscripciones confirmadas`);
    }
}
exports.CupoLlenoError = CupoLlenoError;
class InscripcionDuplicadaError extends Error {
    constructor(horarioId, miembroId) {
        super(`El miembro ${miembroId} ya esta inscrito en el horario ${horarioId}`);
    }
}
exports.InscripcionDuplicadaError = InscripcionDuplicadaError;
//# sourceMappingURL=errores.js.map