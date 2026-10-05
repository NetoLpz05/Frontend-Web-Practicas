import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { aInscripcionDto } from './dto/inscripcion-respuesta.dto';
import { CrearInscripcionDto } from './dto/crear-inscripcion.dto';
import type { Response } from 'express';

@Controller('inscripciones')
export class InscripcionesController {
    constructor(private readonly sercivio: InscripcionesService){}

    @Get()
    async listar(){
        const lista = await this.sercivio.listar();
        return lista.map(aInscripcionDto);
    }

    @Get(':id')
    async buscar(@Param('id', ParseIntPipe) id: number){
        const inscripcion = await this.sercivio.buscar(id);
        if (!inscripcion){
            throw new NotFoundException(`No se encontró la inscripción con id ${id}`)
        }
        return aInscripcionDto(inscripcion);
    }

    @Post()
    @HttpCode(201)
    async crear(@Body() dto: CrearInscripcionDto,
        @Res({passthrough: true}) res: Response){
        const inscripcion = await this.sercivio.crear(dto);
        res.setHeader('Location', `/inscripciones/${inscripcion.id}`)
        return aInscripcionDto(inscripcion);
    }

    @Delete(':id')
    async cancelar(@Param('id', ParseIntPipe) id: number){
        const cancelada = await this.sercivio.cancelar(id);
        if (!cancelada){
            throw new NotFoundException(`No se encontró la inscripción con id ${id}`)
        }
        return aInscripcionDto(cancelada);
    }

}
