import type { CanDeactivateFn } from '@angular/router';
import type { FormularioClase } from '../paginas/formulario-clase/formulario-clase';

export const sinCambiosPendientes: CanDeactivateFn<FormularioClase> = (formulario) =>
  formulario.puedeSalir() || confirm('Hay cambios sin guardar. ¿Salir de todos modos?');

