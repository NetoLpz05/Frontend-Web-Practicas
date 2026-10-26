import { useState } from "react";
import { type Producto } from "./datos.ts";
import { Layout }  from "./Layout.tsx";
import { Encabezado } from "./Encabezado.tsx";
import { PiePagina } from "./PiePagina.tsx";
import { Catalogo }  from "./Catalogo.tsx";
import { Filtro } from "./Filtro.tsx";
import { Cargando } from "./Cargando.tsx";
import { MensajeError } from "./MensajeError.tsx";
import { useProductos } from "./hooks/useProductos.ts";
import { crearPedido } from "./servicios/tienda.ts";
import { FormularioPago } from "./FormularioPago.tsx";

export default function App() {
  const { productos, cargando, error, reintentar } = useProductos();
  const [categoria, setCategoria] = useState("todas");
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [folio, setFolio] = useState<string | null>(null);

  const categorias = ['todas', ...new Set(productos.map((p) => p.categoria))];
  const visibles = categoria === 'todas' ? productos : productos.filter((p) => p.categoria === categoria);
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);

  function agregar(producto: Producto) {
    setCarrito((anterior) => [...anterior, producto]);
  }

  async function pagar(correo:string, telefono: string) {
    const pedido = await crearPedido({ correo, telefono, productos: carrito.map((p) => p.id)});
    setFolio(pedido.folio);
    setCarrito([]);
    reintentar();
  }

  return (
    <Layout encabezado={<Encabezado piezas={carrito.length} />} pie={<PiePagina piezas={carrito.length} total={total} />}>
      <section className="portada">
        <h1>Catalogo de temporada</h1>
        <p>{visibles.length} productos disponibles</p>
        {cargando && <Cargando />}
        {error && <MensajeError mensaje={error} onReintentar={reintentar} />}
        {!cargando && !error &&(
          <>
          <Filtro categoria={categorias} activa={categoria} onCambiar={setCategoria} />
          <Catalogo productos={visibles} onAgregar={agregar} />
          </>
        )}

        {folio && <p className="confirmacion">Pedido {folio} confirmado. Te avisaremos el detalle del pago a tu correo.</p>}
        { carrito.length > 0 && <FormularioPago total={total} onPagar={pagar} />}
        
      </section>
    </Layout>
  )
}