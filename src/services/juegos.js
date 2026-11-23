import { solicitar } from './api'
import { aJuego } from './mapeadores'

export const listarJuegos = () => solicitar('/api/v1/juegos').then((l) => l.map(aJuego))