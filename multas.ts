type EstadoPrestamo = 'activo' | 'devuelto' | 'vencido';

interface Prestamo {
    multa: number;
    ejemplar: number;
    estado: EstadoPrestamo;
    socio?: string;
}

function calcularMulta(prestamo: Prestamo): number {
    const cargoFijo = 50;
    return prestamo.multa + cargoFijo;
}

function generarRecibo(prestamo: Prestamo): string {
    const nombreSocio = prestamo.socio ?? "Socio General";
    return `Recibo - Socio: ${nombreSocio} | Multa a pagar: $${calcularMulta(prestamo)}`;
}

const prestamo: Prestamo = {
    multa: 100,
    ejemplar: 1,
    estado: 'vencido'
};

console.log(generarRecibo(prestamo));