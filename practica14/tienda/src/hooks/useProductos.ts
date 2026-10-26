import { useEffect, useState } from "react";
import { traerProductos } from "../servicios/tienda";
import type { Producto } from "../datos.ts";

export function useProductos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [intento, setIntento] = useState(0);

    useEffect(() => {
        let vigente = true;

        traerProductos()
            .then(((lista) => {if (vigente) setProductos(lista);}))
            .catch(() => {if (vigente) setError("No se pudo conectar a la tienda")})
            .finally(() => {if (vigente) setCargando(false)});

            return () => {vigente = false;};
   }, [intento]);
   
   function reintentar() {
        setCargando(true);
        setError(null);
        setIntento((i) => i + 1);
   }

   return { productos, cargando, error, reintentar };
}