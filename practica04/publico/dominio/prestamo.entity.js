/** Genera un folio sencillo. En produccion seria un UUID. */
let consecutivo = 100;
export function nuevoFolio() {
    consecutivo += 1;
    return `P-${consecutivo}`;
}
