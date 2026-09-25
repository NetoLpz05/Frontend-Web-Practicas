import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly clases;
    constructor(appService: AppService);
    getHello(): string;
    getClases(): {
        identificador: number;
        nombre: string;
    }[];
    agregarClase(clase: {
        identificador: number;
        nombre: string;
    }): {
        identificador: number;
        nombre: string;
    };
}
