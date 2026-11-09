import { Link } from 'react-router';
import { useInscripciones } from '../estado/inscripciones.ts';
import { urlImagen } from '../servicios/api.ts';
import { Cargando } from '../componentes/Cargando.tsx';
import { MensajeError } from '../componentes/MensajeError.tsx';

export default function PaginaMisInscripciones() {
  const { lista: inscripciones, cargando, error, cargar } = useInscripciones();

  if (cargando) return <Cargando />;
  if (error) return <MensajeError mensaje={error} onReintentar={cargar} />;

  return (
    <>
      <section className="pagina__encabezado">
        <h1>Mis inscripciones</h1>
        <p className="pagina__bajada">
          {inscripciones.length === 0
            ? 'Todavía no estás inscrito a ninguna clase.'
            : `${inscripciones.length} clase(s) esta semana.`}
        </p>
      </section>
      <ul className="inscripciones">
        {inscripciones.map((inscripcion) => (
          <li key={inscripcion.id} className="inscripcion">
            <img className="inscripcion__imagen" src={urlImagen(inscripcion.clase.imagen)} alt="" loading="lazy" />
            <div>
              <Link to={`/clases/${inscripcion.clase.id}`} className="inscripcion__clase">
                {inscripcion.clase.nombre}
              </Link>
              <div className="inscripcion__meta">
                {inscripcion.horario.dia} · {inscripcion.horario.horaInicio} · {inscripcion.horario.entrenador}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
