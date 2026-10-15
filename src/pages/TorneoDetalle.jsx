import { useParams } from "react-router-dom";
import { useDatos } from "../context/DatosContext.js";
import { useTitulo } from "../hooks/useTitulo.js";

export default function TorneoDetalle() {
    const { id } = useParams();
    const { torneos, nombreJuego, nombreParticipante } = useDatos();
    const t = torneos.find((x) => x.id === (id || torneos[0].id));
    useTitulo(t ? t.nombre : "Detalle de torneo");

    
}