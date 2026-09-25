import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly clases = [
    { identificador: 1, nombre: 'Yoga' },
    { identificador: 2, nombre: 'Spinning' },
  ];

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('clases')
  getClases() {
    return this.clases;
  }

  @Post('clases')
  agregarClase(@Body() clase: { identificador: number; nombre: string }) {
    this.clases.push(clase);
    return clase;
  }
}
