import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearClaseDto } from './dto/crear-clase.dto';
import { ClasesService } from './clases.service';
import type { Clase } from './dominio/entidades';

@Controller('clases')
export class ClasesController {
    constructor(private readonly clasesService: ClasesService) {}

    @Get()
    listar(): Promise<Clase[]> {
        return this.clasesService.listar();
    }

    @Post()
    crear(@Body() cuerpo: CrearClaseDto): Promise<Clase> {
        return this.clasesService.crear(cuerpo.nombre);
    }
}
