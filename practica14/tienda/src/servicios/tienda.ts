import axios from "axios";
import { api } from "./api.ts";
import type { Producto } from "../datos.ts";

interface Sobre<T> {
    data: T;
}

export interface Pedido {
    correo: string;
    telefono: string;
    productos: string[];
}

export async function traerProductos(): Promise<Producto[]> {
    const respuesta = await api.get<Sobre<Producto[]>>("/productos");
    return respuesta.data.data;
}

export async function crearPedido(pedido: Pedido): Promise<{folio: string; total: number;}> {
    try {
        const respuesta = await api.post<Sobre<{folio: string; total: number;}>>("/pedidos", pedido);
        return respuesta.data.data;
    } catch (e) {
        const mensaje = axios.isAxiosError(e) ? e.response?.data?.mensaje : undefined;
        throw new Error(Array.isArray(mensaje) ? mensaje.join(", ") : mensaje ?? "No se pudo completar el pago");
    }
}