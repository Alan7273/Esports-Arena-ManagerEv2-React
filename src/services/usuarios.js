import { solicitar } from './api'
import { aJugador } from './mapeadores'

export const listarJugadores = () => solicitar('/api/v1/usuarios').then((l) => l.map(aJugador))