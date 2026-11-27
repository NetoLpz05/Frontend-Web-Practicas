import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, map, of, startWith, switchMap } from 'rxjs';
import type { Categoria, Clase } from '../modelos/clase';
import { ClasesApi } from './clases-api';
import { mensajeDeApi } from './errores';

interface EstadoCatalogo {
  clases: Clase[];
  cargando: boolean;
  error: string | null;
}

const CARGANDO: EstadoCatalogo = { clases: [], cargando: true, error: null };

@Injectable({ providedIn: 'root' })
export class Catalogo {
  private readonly api = inject(ClasesApi);
  private readonly termino$ = new BehaviorSubject('');
  private readonly estado = toSignal(
    this.termino$.pipe(
      switchMap((termino) =>
        this.api.buscar(termino).pipe(
          map(
            (clases): EstadoCatalogo => ({
              clases,
              cargando: false,
              error: null,
            }),
          ),
          startWith(CARGANDO),
          catchError((error: unknown) =>
            of<EstadoCatalogo>({
              clases: [],
              cargando: false,
              error: mensajeDeApi(error),
            }),
          ),
        ),
      ),
    ),
    { initialValue: CARGANDO },
  );

  readonly termino = toSignal(this.termino$, { initialValue: '' });
  private readonly clases = computed(() => this.estado().clases);

  readonly cargando = computed(() => this.estado().cargando);
  readonly error = computed(() => this.estado().error);

  /** La categoría del filtro. 'todas' es el valor de "sin filtro". */
  readonly categoria = signal<Categoria | 'todas'>('todas');

  /** La clase que se eligió con un clic. null = ninguna. */
  readonly seleccionada = signal<Clase | null>(null);

  // --- lo derivado (igual que en la Práctica 20) ---------------------------

  readonly visibles = computed(() => {
    const cat = this.categoria();
    const todas = this.clases();
    return cat === 'todas' ? todas : todas.filter((c) => c.categoria === cat);
  });

  readonly minutosTotales = computed(() =>
    this.visibles().reduce((suma, c) => suma + c.duracionMin, 0),
  );

  // --- las acciones (igual que en la Práctica 20) --------------------------

  filtrar(categoria: Categoria | 'todas'): void {
    this.categoria.set(categoria);
    const elegida = this.seleccionada();
    if (elegida && categoria !== 'todas' && elegida.categoria !== categoria) {
      this.seleccionada.set(null);
    }
  }

  buscar(termino: string): void {
    this.seleccionada.set(null);
    this.termino$.next(termino.trim());
  }

  recargar(): void {
    this.seleccionada.set(null);
    this.termino$.next(this.termino$.value);
  }

  seleccionar(clase: Clase): void {
    this.seleccionada.update((actual) => (actual?.id === clase.id ? null : clase));
  }
}
