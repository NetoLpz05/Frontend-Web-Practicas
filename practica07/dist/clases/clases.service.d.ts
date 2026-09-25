export interface Clase {
    id: number;
    nombre: string;
}
export declare class ClasesService {
    listar(): Clase[];
    crear(nombre: string): Clase;
}
