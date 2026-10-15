import { useState } from "react";
import { DatosContext } from "./DatosContext";
import { 
    juegos,
    jugadores as jugadoresIniciales,
    equipos as equiposIniciales,
    torneos as torneosIniciales, 
 } from "../data/datos";

 export default function DatosProvider({ children }) {
    const nombreJuego = (id) => juegos.find((j) => j.id === id)?.nombre ?? "-";

    const nombreParticipante = (id) => 
        equipos.find((e) => e.id === id)?.nombre ?? 
    jugadores.find((j) => j.id === id)?.apodo ??
    id;
    
    const inscribirEquipo = (torneoId, equipoId) =>
        setTorneo((prev) =>
        prev.map((t) => 
            t.id === torneoId ? { ...t, cupoOcupado: t.cupoOcupado + 1, participantes: [...t.participantes, equipoId] }: t)); 
}