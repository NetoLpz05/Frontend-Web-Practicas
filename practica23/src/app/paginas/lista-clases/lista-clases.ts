import { TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FiltroCategoria } from '../../componentes/filtro-categoria/filtro-categoria';
import { TarjetaClase } from '../../componentes/tarjeta-clase/tarjeta-clase';
import { Catalogo } from '../../servicios/catalogo';
import { RouterLink } from '@angular/router';
import { API_URL } from '../../config';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-lista-clases',
  imports: [TarjetaClase, FiltroCategoria, TitleCasePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './lista-clases.html',
  styleUrl: './lista-clases.css',
})
export class ListaClases {
  protected readonly catalogo = inject(Catalogo);
  protected readonly apiUrl = API_URL;
  protected readonly busqueda = new FormControl(this.catalogo.termino(), { nonNullable: true });

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.busqueda.valueChanges
      .pipe(
        debounceTime(300),
        map((termino) => termino.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((termino) => this.catalogo.buscar(termino));
  }
}
