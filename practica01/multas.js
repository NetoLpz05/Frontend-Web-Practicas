"use strict";
function calcularMulta(prestamo) {
    const cargoFijo = 50;
    return prestamo.multa + cargoFijo;
}
const prestamo = {
    multa: 350,
    ejemplar: 14,
    estado: 'activo',
    socioNombre: 'María Pérez'
};
function generarRecibo(p) {
    const nombre = p.socioNombre ?? 'socio desconocido';
    const total = calcularMulta(p);
    return `Recibo - ejemplar ${p.ejemplar} | socio: ${nombre} | multa: ${total}`;
}
console.log(generarRecibo(prestamo));
