import { solicitar } from './api'

export const listarTorneos = () => solicitar('/api/v1/torneos')
export const obtenerTorneo = (id) => solicitar(`/api/v1/torneos/${id}`)
export const crearTorneo = (dto) => solicitar('/api/v1/torneos', { method: 'POST', body: JSON.stringify(dto) })
export const eliminarTorneo = (id) => solicitar(`/api/v1/torneos/${id}`, { method: 'DELETE' })