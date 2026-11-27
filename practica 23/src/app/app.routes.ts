import { Routes } from '@angular/router';
import { ListaClases } from './paginas/lista-clases/lista-clases';
import { Horarios } from './paginas/horarios/horarios';
import { Miembros } from './paginas/miembros/miembros';
import { sinCambiosPendientes } from './guardias/sin-cambios-pendientes';

export const routes: Routes = [
  {
    path: 'clases',
    component: ListaClases,
    title: 'Clases · Admin',
  },
  {
    path: 'clases/nueva',
    loadComponent: () =>
      import('./paginas/formulario-clase/formulario-clase')
        .then((m) => m.FormularioClase),
    title: 'Nueva clase · Admin',
    canDeactivate: [sinCambiosPendientes],
  },
  {
    path: 'clases/:id/editar',
    loadComponent: () =>
      import('./paginas/formulario-clase/formulario-clase')
        .then((m) => m.FormularioClase),
    title: 'Editar clase · Admin',
    canDeactivate: [sinCambiosPendientes],
  },
  { path: 'horarios', component: Horarios, title: 'Horarios · Admin' },
  { path: 'miembros', component: Miembros, title: 'Miembros · Admin' },

  { path: '', redirectTo: 'clases', pathMatch: 'full' },
  { path: '**', redirectTo: 'clases' },
];
