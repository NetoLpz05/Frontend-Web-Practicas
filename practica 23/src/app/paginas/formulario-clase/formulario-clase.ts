import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { API_URL } from '../../config';
import { CATEGORIAS, type Categoria, type ClaseNueva } from '../../modelos/clase';
import { multiploDe } from '../../validadores/multiplo-de';
import { ClasesApi } from '../../servicios/clases-api';
import { Catalogo } from '../../servicios/catalogo';
import { mensajeDeApi, mensajesDelCuerpo } from '../../servicios/errores';


const IMAGENES = Array.from({ length: 8 }, (_, i) => `/img/clase-0${i + 1}.jpg`);

@Component({
  selector: 'app-formulario-clase',
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './formulario-clase.html',
  styleUrl: './formulario-clase.css',
})
export class FormularioClase {
  protected readonly categorias = CATEGORIAS;
  protected readonly imagenes = IMAGENES;
  protected readonly apiUrl = API_URL;

  protected readonly listo = signal<ClaseNueva | null>(null);
  protected readonly guardando = signal(false);
  protected readonly erroresServidor = signal<string[]>([]);

  private readonly api = inject(ClasesApi);
  private readonly catalogo = inject(Catalogo);
  private readonly router = inject(Router);
  protected readonly id = this.catalogo.seleccionada()?.id ?? null;


  protected readonly form = inject(FormBuilder).nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],

    categoria: ['fuerza' as Categoria, Validators.required],
    descripcion: ['', [Validators.required, Validators.maxLength(255)]],

    duracionMin: [45, [Validators.required, Validators.min(10), multiploDe(5)]],
    imagen: [IMAGENES[0], [Validators.required, Validators.maxLength(120)]],
  });

  protected get f() {
    return this.form.controls;
  }
  
  private guardado = false;

  puedeSalir(): boolean {
    return this.guardado || !this.form.dirty;
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.listo.set(null);
      return;
    }

    this.guardando.set(true);
    this.erroresServidor.set([]);

    const datos = this.form.getRawValue();
    const id = this.id;
    const peticion = id ? this.api.actualizar(id, datos) : this.api.crear(datos);

    peticion.subscribe({
      next: () => {
        this.guardado = true;
        this.catalogo.recargar();
        this.router.navigate(['/clases']);
      },
      error: (e: HttpErrorResponse) => {
        const mensajes = mensajesDelCuerpo(e.error);
        this.erroresServidor.set(
          mensajes.length ? mensajes : [mensajeDeApi(e)],
        );
        this.guardando.set(false);
      },
    });
  }

  protected eliminar(): void {
    const clase = this.catalogo.seleccionada();
    if (!clase) return;

    if (!confirm(`¿Eliminar «${clase.nombre}»? Se borrarán también sus horarios.`)) return;

    this.guardando.set(true);
    this.erroresServidor.set([]);

    this.api.eliminar(clase.id).subscribe({
      next: () => {
        this.catalogo.recargar();
        this.router.navigate(['/clases']);
      },
      error: (e) => {
        this.erroresServidor.set(mensajesDelCuerpo(e.error).length
          ? mensajesDelCuerpo(e.error)
          : [mensajeDeApi(e)]);
        this.guardando.set(false);
      },
      complete: () => this.guardando.set(false),
    });
  }
}
