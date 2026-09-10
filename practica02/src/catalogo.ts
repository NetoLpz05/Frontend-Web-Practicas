import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import type {Libro} from './dominio/tipos';

function esLibro(valor: unknown): valor is Libro{
    if(typeof valor !== 'object' || valor === null){
        return false;
    }
    const o = valor as Record<string, unknown>;
    if (typeof o.id !== 'string' || typeof o.titulo !== 'string' || typeof o.autor !== 'string' || 
        typeof o.ejemplares !== 'number'){
        return false;
    }

    if('anio' in o && o.anio !== undefined && typeof o.anio !== 'number'){
        return false;
    }

    return true;
}

interface CatalogoCargado{
    libros: Libro[],
    descartados: number;
}

export function cargarCatalogo(ruta: string): CatalogoCargado{
    const rutaAbsoluta = resolve(process.cwd(), ruta);
    const texto = readFileSync(rutaAbsoluta, {encoding: 'utf-8'});
    const crudo = JSON.parse(texto);

    if(typeof crudo !== 'object' || crudo === null){
        throw new Error('El archivo no contiene un objeto válido');
    }

    const posibles = (crudo as Record<string, unknown>).libros;
    if(!Array.isArray(posibles)){
        throw new Error('El archivo no contiene un arreglo de libros');
    }

    const libros = posibles.filter(esLibro);
    return {libros, descartados: posibles.length - libros.length};
    
}