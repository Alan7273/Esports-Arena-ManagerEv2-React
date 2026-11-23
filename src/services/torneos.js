import { solicitar } from './api'
import { aTorneo, aPartida, aPosicion, aPremio } from './mapeadores'

export const listarTorneos = () => solicitar('/api/v1/torneos').then((l) => l.map(aTorneo))
export const obtenerTorneo = (id) => solicitar(`/api/v1/torneos/${id}`).then(aTorneo)

export const listarPartidas = () => solicitar('/api/v1/partidas').then((l) => l.map(aPartida))
export const listarRanking = (torneoId) =>
  solicitar(`/api/v1/rankings/${torneoId}`).then((l) => l.map(aPosicion))
export const listarPremios = () => solicitar('/api/v1/premios').then((l) => l.map(aPremio))