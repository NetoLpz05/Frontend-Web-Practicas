import { ClasesService } from './clases.service';
import type { Clase } from './clases.service';
export declare class ClasesController {
    private readonly clasesService;
    constructor(clasesService: ClasesService);
    listar(): Clase[];
    crear(cuerpo: {
        nombre: string;
    }): Clase;
}
