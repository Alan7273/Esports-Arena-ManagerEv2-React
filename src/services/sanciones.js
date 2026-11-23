import { solicitar } from './api'

export const listarSanciones = () => solicitar('/api/v1/sanciones')