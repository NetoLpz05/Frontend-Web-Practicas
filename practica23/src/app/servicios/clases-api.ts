import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URL } from '../config';
import type { Clase, ClaseNueva, Sobre } from '../modelos/clase';

@Injectable({
  providedIn: 'root',
})
export class ClasesApi {
  private readonly http = inject(HttpClient);

  buscar(q: string) {
    let params = new HttpParams();
    const termino = q.trim();
    if (termino) params = params.set('q', termino);

    return this.http
      .get<Sobre<Clase[]>>(`${API_URL}/clases`, { params })
      .pipe(map((r) => r.data));
  }

  crear(datos: ClaseNueva) {
    return this.http
      .post<Sobre<Clase>>(`${API_URL}/clases`, datos)
      .pipe(map((r) => r.data));
  }

  obtener(id: number) {
    return this.http
      .get<Sobre<Clase>>(`${API_URL}/clases/${id}`)
      .pipe(map((r) => r.data));
  }

  actualizar(id: number, datos: ClaseNueva) {
    return this.http
      .patch<Sobre<Clase>>(`${API_URL}/clases/${id}`, datos)
      .pipe(map((r) => r.data));
  }

  eliminar(id: number) {
    return this.http
      .delete<Sobre<Clase>>(`${API_URL}/clases/${id}`)
      .pipe(map((r) => r.data));
  }
}
