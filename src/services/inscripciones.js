import { solicitar } from './api'

export const listarInscripciones = () => solicitar('/api/v1/inscripciones')

export const crearInscripcion = ({ torneoId, equipo }) =>
  solicitar('/api/v1/inscripciones', {
    method: 'POST',
    body: JSON.stringify({
      torneoId: Number(torneoId),
      equipoId: equipo.id,
      usuarioId: equipo.capitanId,
      tipoParticipante: 'EQUIPO',        // confirma los valores permitidos en Swagger
      nombreJugador: equipo.nombre,
      estado: 'PENDIENTE',
      fechaInscripcion: new Date().toISOString().slice(0, 10),
    }),
  })