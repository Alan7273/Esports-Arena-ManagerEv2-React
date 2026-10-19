import { useState } from "react";
import { DatosContext } from "./DatosContext";
import { 
    juegos,
    jugadores as jugadoresIniciales,
    equipos as equiposIniciales,
    torneos as torneosIniciales, 
 } from "../data/datos";

 export default function DatosProvider({ children }) {
    const [jugadores, setJugadores] = useState(jugadoresIniciales);
    const [equipos, setEquipos] = useState(equiposIniciales);
    const [torneos, setTorneos] = useState(torneosIniciales);


    const nombreJuego = (id) => juegos.find((j) => j.id === id)?.nombre ?? "-";

    const nombreParticipante = (id) => 
        equipos.find((e) => e.id === id)?.nombre ?? 
    jugadores.find((j) => j.id === id)?.apodo ??
    id;
    
    const inscribirEquipo = (torneoId, equipoId) =>
        setTorneos((prev) =>
        prev.map((t) => 
            t.id === torneoId ? { ...t, cupoOcupado: t.cupoOcupado + 1, participantes: [...t.participantes, equipoId] }: t)); 

    const crearEquipo = ({ nombre, juegoId, capitanId, integrantes }) => {
        const id = "e" + (equipos.length + 1);
        
        const lista = integrantes.some((i) => i.jugadorId === capitanId)
          ? integrantes
          : [{ jugadorId: capitanId, rol: "Capitan" }, ...integrantes];

        setEquipos((prev) => [...prev, { id, nombre, juegoId, capitanId, activo: true, integrantes: lista }]);
        setJugadores((prev) => prev.map((j) => lista.some((i) => i.jugadorId === j.id) && !j.equipos.includes(id) ? 
        { ...j, equipos: [...j.equipos, id] }: j));
    };

    const actualizarJugador = (id, cambios) =>
        setJugadores((prev) => prev.map((j) => (j.id === id ? { ...j, ...cambios } : j)));

    const valor = {
        juegos, jugadores, equipos, torneos,
        nombreJuego, nombreParticipante,
        inscribirEquipo, crearEquipo, actualizarJugador,
    };

    return <DatosContext.Provider value={valor}>{children}</DatosContext.Provider>;
}