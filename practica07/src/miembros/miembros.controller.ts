import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';
import type { CrearMiembroDto } from './dto/crear-miembro.dto';
import { MiembrosService } from './miembros.service';

@Controller('miembros')
export class MiembrosController {
  constructor(private readonly miembrosService: MiembrosService) {}

  @Get()
  listar() {
    return this.miembrosService.listar();
  }

  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number) {
    const miembro = await this.miembrosService.buscar(id);
    if (!miembro) {
      throw new NotFoundException(`No se encontró el miembro con id ${id}`);
    }
    return miembro;
  }

  @Post()
  crear(@Body() datos: CrearMiembroDto) {
    return this.miembrosService.crear(datos);
  }

  @Patch(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: ActualizarMiembroDto,
  ) {
    const miembro = await this.miembrosService.actualizar(id, datos);
    if (!miembro) {
      throw new NotFoundException(`No se encontró el miembro con id ${id}`);
    }
    return miembro;
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    const miembro = await this.miembrosService.eliminar(id);
    if (!miembro) {
      throw new NotFoundException(`No se encontró el miembro con id ${id}`);
    }
    return miembro;
  }
}