import { solicitar } from './api'
import { aJugador } from './mapeadores'

export const listarJugadores = () => solicitar('/api/v1/usuarios').then((l) => l.map(aJugador))

export const actualizarJugador = (id, cambios) =>
  solicitar(`/api/v1/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(cambios) })