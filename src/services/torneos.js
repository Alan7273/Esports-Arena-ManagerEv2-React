import { solicitar } from './api'
import { aTorneo, aPartida, aPosicion, aPremio } from './mapeadores'

export const listarTorneos = () => solicitar('/api/v1/torneos').then((l) => l.map(aTorneo))
export const obtenerTorneo = (id) => solicitar(`/api/v1/torneos/${id}`).then(aTorneo)

export const listarPartidas = () => solicitar('/api/v1/partidas').then((l) => l.map(aPartida))
export const listarRanking = (torneoId) =>
  solicitar(`/api/v1/rankings/${torneoId}`).then((l) => l.map(aPosicion))
export const listarPremios = () => solicitar('/api/v1/premios').then((l) => l.map(aPremio))

// Estados de inscripción que ya no ocupan cupo
export const INSCRIPCION_INACTIVA = ['CANCELADA', 'CANCELADO', 'RECHAZADO']

// El backend no entrega cupos ocupados ni nombre del juego dentro del torneo:
// se calculan cruzando torneos con inscripciones y juegos
export const conCupos = (torneos, juegos, inscripciones) =>
  torneos.map((t) => ({
    ...t,
    juegoNombre: juegos.find((j) => j.id === t.juegoId)?.nombre,
    cupoOcupado: inscripciones.filter(
      (i) => i.torneoId === t.id && !INSCRIPCION_INACTIVA.includes(i.estado)).length,
  }))
