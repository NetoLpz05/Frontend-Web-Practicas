import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CATEGORIAS, type Categoria, type ClaseNueva } from '../../modelos/clase';
import { multiploDe } from '../../validadores/multiplo-de';
import { HttpErrorResponse } from '@angular/common/http';
import { Catalogo } from '../../servicios/catalogo';
import { ClasesApi } from '../../servicios/clases-api';
import { mensajeDeApi, mensajesDelCuerpo } from '../../servicios/errores';


const IMAGENES = Array.from({ length: 8 }, (_, i) => `/img/clase-0${i + 1}.jpg`);

@Component({
  selector: 'app-formulario-clase',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-clase.html',
  styleUrl: './formulario-clase.css',
})
export class FormularioClase {
  private readonly api = inject(ClasesApi);
  private readonly catalogo = inject(Catalogo);
  private readonly router = inject(Router);

  protected readonly categorias = CATEGORIAS;
  protected readonly imagenes = IMAGENES;

  readonly id = input<string>();

  protected readonly guardando = signal(false);
  protected readonly cargandoClase = signal(false);
  protected readonly erroresServidor = signal<string[]>([]);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    categoria: ['fuerza' as Categoria, Validators.required],
    descripcion: ['', [Validators.required, Validators.maxLength(255)]],
    duracionMin: [45, [Validators.required, Validators.min(10), multiploDe(5)]],
    imagen: [IMAGENES[0], Validators.required],
  });

  private guardado = false;

  puedeSalir(): boolean {
    return this.guardado || !this.form.dirty;
  }

  protected get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    const id = this.id();
    if (!id) return;
    this.cargandoClase.set(true);
    this.api.obtener(Number(id)).subscribe({
      next: (clase) => {
        this.form.patchValue(clase);
        this.cargandoClase.set(false);
      },
      error: (e) => {
        this.erroresServidor.set([mensajeDeApi(e)]);
        this.cargandoClase.set(false);
      },
    });
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.guardando() || this.cargandoClase()) return;

    this.guardando.set(true);
    this.erroresServidor.set([]);

    const datos: ClaseNueva = this.form.getRawValue();
    const id = this.id();

    const peticion = id ? this.api.actualizar(Number(id), datos) : this.api.crear(datos);

    peticion.subscribe({
      next: (clase) => {
        this.guardado = true;
        this.catalogo.recargar();
        this.router.navigate(['/clases']);
      },
      error: (e: HttpErrorResponse) => {
        const mensajes = e.status === 400 ? mensajesDelCuerpo(e.error) : [];
        this.erroresServidor.set(mensajes.length ? mensajes : [mensajeDeApi(e)]);
        this.guardando.set(false);
      },
    });
  }

  protected eliminar(): void {
    if (this.guardando() || this.cargandoClase()) return;
    const id = Number(this.id());
    if (!confirm(`¿Eliminar «${this.f.nombre.value}»? Se borran también sus horarios.`)) return;

    this.guardando.set(true);
    this.erroresServidor.set([]);
    this.api.eliminar(id).subscribe({
      next: () => {
        this.catalogo.recargar();
        this.router.navigate(['/clases']);
      },
      error: (e) => {
        this.erroresServidor.set([mensajeDeApi(e)]);
        this.guardando.set(false);
      },
    });
  }
}
