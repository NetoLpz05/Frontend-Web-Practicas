import {cargarCatalogo} from './catalogo';
import {pedirOpcion, pedirTexto} from './entrada';
import {disponiblesDe, prestar, multaDe, estadoDe, type Mostrador} from './dominio/prestamos';
import {LibroNoEncontradoError, SinEjemplaresError} from './dominio/tipos';

const OPCIONES = [
    {valor: 'prestar', etiqueta: 'Prestar libro'},
    {valor: 'catalogo', etiqueta: 'Ver catálogo'},
    {valor: 'prestamos', etiqueta: 'Ver prestamos'},
    {valor: 'salir', etiqueta: 'Salir'}
] as const;

type Opcion = (typeof OPCIONES)[number]['valor'];

function esOpcion(valor: string): valor is Opcion{  
    return OPCIONES.some((o) => o.valor === valor);
}

const fecha = (d: Date): string => d.toISOString().slice(0, 10); //YYYY-MM-DD

function verCatalogo(m: Mostrador): void{
    console.log('\nCatálogo de libros:');

    for(const l of m.libros){
        const disponibles = disponiblesDe(m, l.id);
        console.log(`- ${l.titulo} (${l.autor}, ${l.anio ?? 'Año desconocido'}) - ${disponibles} ejemplares disponibles`);
    }

    console.log('');
}

function verPrestamos(m: Mostrador, hoy: Date): void{
    console.log('\nPréstamos:');

    for(const p of m.prestamos){
        const estado = estadoDe(p,hoy);
        const multa = multaDe(p, estado, hoy);
        console.log(`- Folio: ${p.folio}, Libro: ${p.libroId}, Socio: ${p.socio}, Vence en: ${fecha(p.venceEn)}, Devuelto en: ${p.devueltoEn ? fecha(p.devueltoEn) : 'No devuelto'}, Estado: ${estado}, Multa: $${multa}`);
    }
}

async function hacerPrestamo(m: Mostrador, hoy: Date): Promise<void>{
    const libroId = await pedirTexto('Ingrese el ID del libro a prestar:');
    if (libroId === undefined){
        console.log('No se ingresó un ID válido.');
        return;
    }
    
    try{
        const p = prestar(m, libroId.toUpperCase(), 'Socio1', hoy);
        console.log(`Préstamo realizado con éxito. Folio: ${p.folio}, Vence en: ${fecha(p.venceEn)}`);
    }
    catch (error) {
        if (error instanceof LibroNoEncontradoError) {
            console.log('El libro no fue encontrado.');
        }
        else if (error instanceof SinEjemplaresError) {
            console.log('No hay ejemplares disponibles del libro.');
        }
        else {
            console.error('Error al realizar el préstamo:', error);
        }
    }
}

async function main(): Promise<void>{
    const {libros, descartados} = cargarCatalogo('./datos/catalogo.json');
    console.log('\n === MOSTRADOR BIBLIOTECA ===');
    console.log(`Se cargaron ${libros.length} libros del catálogo. Se descartaron ${descartados} entradas inválidas.\n`);

    if (descartados > 0){
        console.log('Se descartaron las siguientes entradas inválidas:');
        console.log(`- ${descartados} entradas no válidas en el catálogo.\n`);
    }

    const hoy = new Date();
    const m:Mostrador = {libros, prestamos: []};

    for(;;){
        const elegido = await pedirOpcion('Seleccione una opción:', OPCIONES);
        if(elegido === undefined || !esOpcion(elegido)){
            console.log('No se seleccionó una opción válida. Intente de nuevo.');
            continue;
        }

        switch(elegido){
            case 'prestar':
                await hacerPrestamo(m, hoy);
                break;
            case 'catalogo':
                verCatalogo(m);
                break;
            case 'prestamos':
                verPrestamos(m, hoy);
                break;
            case 'salir':
                console.log('Saliendo del programa.');
                return;
            default:
                console.error('Opción no reconocida:', elegido);
        }
    }
}

void main();