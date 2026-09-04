import {type EstadoPrestamo, type Prestamo, type Libro, 
    LibroNoEncontradoError, SinEjemplaresError} from './tipos';

export const DIAS_DE_PRESTAMO = 14;
export const MULTA_POR_DIA = 5;
const UN_DIA = 86_400_000; // Milisegundos en un día

export interface Mostrador{
    libros: Libro[],
    prestamos: Prestamo[]
}

export function disponiblesDe(m: Mostrador, libroId: string): number{
    const prestados = m.prestamos.filter(
        (p) => p.libroId === libroId && p.devueltoEn === undefined
    ).length;
    
    const ejemplares = m.libros.find((l) => l.id === libroId)?.ejemplares ?? 0;
    return Math.max(0, ejemplares - prestados);
}

export function prestar(m: Mostrador, libroId: string, socio: string, hoy: Date): Prestamo{
    const libro = m.libros.find((l) => l.id === libroId);
    if(libro === undefined){
        throw new LibroNoEncontradoError(`No se encontró el libro con id ${libroId}`);
    }

    if(disponiblesDe(m, libroId) === 0){
        throw new SinEjemplaresError(`No hay ejemplares disponibles del libro ${libro.titulo}`);
    }

    const prestamo: Prestamo = {
        folio: `P-${String(m.prestamos.length + 1).padStart(4, '0')}`,
        libroId: libro.id,
        socio,
        venceEn: new Date(hoy.getTime() + DIAS_DE_PRESTAMO * UN_DIA)
    };

    m.prestamos.push(prestamo);
    return prestamo;
}

export function estadoDe(p: Prestamo, hoy: Date): EstadoPrestamo{
    if (p.devueltoEn !== undefined) {
        return p.devueltoEn.getTime() > p.venceEn.getTime() ? 'vencido' : 'devuelto';
    }

    return hoy.getTime() > p.venceEn.getTime() ? 'vencido' : 'activo';
}

export function multaDe(p: Prestamo, estado: EstadoPrestamo, hoy: Date): number{
    const referencia = p.devueltoEn ?? hoy;
    const dias = Math.max(0, Math.ceil((referencia.getTime() - p.venceEn.getTime()) / UN_DIA));

    switch(estado){
        case 'activo':
            return 0;
        case 'devuelto':
        case 'vencido':
            return dias * MULTA_POR_DIA;
        default:
            const _exhaustivo: never = estado;
            return _exhaustivo;
    }
}