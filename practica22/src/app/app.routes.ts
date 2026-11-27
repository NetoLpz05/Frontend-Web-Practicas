import { Routes } from '@angular/router';
import { Panel } from './paginas/panel/panel';
import { soloAdmin } from './sesion/solo-admin';
import { sinCambiosPendientes } from './guardias/sin-cambios-pendientes';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./paginas/login/login').then((m) => m.Login),
    title: 'Iniciar sesión · Admin',
  },
  {
    path: '',
    component: Panel,
    canActivate: [soloAdmin],
    canActivateChild: [soloAdmin],
    children: [
      {
        path: 'clases',
        loadComponent: () =>
          import('./paginas/lista-clases/lista-clases').then((m) => m.ListaClases),
        title: 'Clases · Admin',
      },
      {
        path: 'clases/nueva',
        loadComponent: () =>
          import('./paginas/formulario-clase/formulario-clase').then((m) => m.FormularioClase),
        title: 'Nueva clase · Admin',
        canDeactivate: [sinCambiosPendientes],
      },
      {
        path: 'clases/:id/editar',
        loadComponent: () =>
          import('./paginas/formulario-clase/formulario-clase').then((m) => m.FormularioClase),
        title: 'Editar clase · Admin',
        canDeactivate: [sinCambiosPendientes],
      },
      {
        path: 'horarios',
        loadComponent: () => import('./paginas/horarios/horarios').then((m) => m.Horarios),
        title: 'Horarios · Admin',
      },
      {
        path: 'miembros',
        loadComponent: () => import('./paginas/miembros/miembros').then((m) => m.Miembros),
        title: 'Miembros · Admin',
      },
      { path: '', redirectTo: 'clases', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];