import { useParams } from "react-router-dom";
import { useDatos } from "../context/DatosContext.js";
import { useTitulo } from "../hooks/useTitulo.js";

export default function TorneoDetalle() {
    const { id } = useParams();
    const { torneos, nombreJuego, nombreParticipante } = useDatos();
}