export declare class HorarioNoEncontradoError extends Error {
    constructor(horarioId: number);
}
export declare class MiembroNoEncontradoError extends Error {
    constructor(miembroId: number);
}
export declare class CupoLlenoError extends Error {
    constructor(horarioId: number, cupoMaximo: number);
}
export declare class InscripcionDuplicadaError extends Error {
    constructor(horarioId: number, miembroId: number);
}
