import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import {
  CupoLlenoError,
  ErrorDominio,
  HorarioNoEncontradoError,
  InscripcionDuplicadaError,
  MiembroNoEncontradoError,
} from '../../inscripciones/dominio/errores';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const statusCode = this.statusCode(exception);
    const message = this.message(exception);

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }

  private statusCode(exception: unknown): number {
    if (exception instanceof HorarioNoEncontradoError || exception instanceof MiembroNoEncontradoError) {
      return 404;
    }
    if (exception instanceof CupoLlenoError || exception instanceof InscripcionDuplicadaError) {
      return 409;
    }
    if (exception instanceof ErrorDominio) {
      return 400;
    }
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return 500;
  }

  private message(exception: unknown): string | string[] {
    if (exception instanceof ErrorDominio) {
      return exception.message;
    }
    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      if (typeof body === 'string') return body;
      if (typeof body === 'object' && body !== null && 'message' in body) {
        const message = body.message;
        if (typeof message === 'string' || Array.isArray(message)) return message;
      }
      return exception.message;
    }
    return 'Internal server error';
  }
}