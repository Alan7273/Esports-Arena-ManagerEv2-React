import { solicitar } from './api'
import { aEquipo } from './mapeadores'

export const listarEquipos = () => solicitar('/api/v1/equipos').then((l) => l.map(aEquipo))

export const crearEquipo = ({ nombre, juegoId, capitanId }) =>
  solicitar('/api/v1/equipos', {
    method: 'POST',
    body: JSON.stringify({
      nombreequipo: nombre,
      capitanId: Number(capitanId),
      juegoprincipalId: Number(juegoId),
      estadoequipo: 'ACTIVO',
    }),
  }).then(aEquipo)

export const agregarMiembro = (equipoId, usuarioId, rol) =>
  solicitar(`/api/v1/equipos/${equipoId}/miembros`, {
    method: 'POST',
    body: JSON.stringify({ usuarioId: Number(usuarioId), rolDentroEquipo: rol }),
  })