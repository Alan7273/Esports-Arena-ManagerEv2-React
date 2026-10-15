import { Link } from "react-router-dom";
import { useDatos } from "../context/DatosContext.js";
import { formatearEstado } from "../utils/formato.js";

export default function TarjetaTorneo({ torneo: t }) {
    const { nombreJuego } = useDatos();
    return (
        <article className="card">
            <span className={`badge ${t.estado}`}>`{formatearEstado(t.estado)}</span>
            <h3>{t.nombre}</h3>
            <p>Juego: {nombreJuego(t.juegoId)}</p>
            <p>Modalidad: {t.modalidad}</p>
            <p>Cupos: {t.cupoOcupado}/{t.cupoMax}</p>
            <p>Cierre de inscripcion: {t.fechaCierreInscripcion}</p>
            <link to={`/torneo/${t.id}`}>Ver detalle</link>
        </article>
    );
}