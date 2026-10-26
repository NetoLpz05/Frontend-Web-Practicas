interface FiltrosProps {
    categoria: string[];
    activa: string;
    onCambiar: (categoria: string) => void;
}

export function Filtro({ categoria, activa, onCambiar }: FiltrosProps) {
    return (
        <nav className="filtros">
            {categoria.map((c) => (
                <button
                    key={c}
                    className={c === activa ? 'filtros__boton--activo' : 'filtros__boton'}
                    onClick={() => onCambiar(c)}
                >
                    {c}
                </button>
            ))}
        </nav>
    )
}



