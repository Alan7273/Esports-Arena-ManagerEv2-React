const ESTADOS = {
  ABIERTO: 'abierto', ACTIVO: 'abierto', EN_CURSO: 'en_curso',
  CERRADO: 'finalizado', CANCELADO: 'finalizado',
}

export const aJuego = (j) => ({
  id: j.juegosId, nombre: j.nombrejuegos, minIntegrantes: j.jugadores_por_equipo,
})

export const aTorneo = (t) => ({
  id: t.torneoId,
  nombre: t.nombretorneo,
  juegoId: t.juegoId,
  modalidad: t.modalidadTorneo,
  estado: ESTADOS[(t.estadoTorneo ?? '').toUpperCase()] ?? 'abierto',
  fechaInicio: t.fechaInicio,
  fechaFin: t.fechaFin,
  cupoMax: t.cupoMaximo,
  // el backend no tiene fecha de cierre de inscripción: usamos la de inicio
  fechaCierreInscripcion: t.fechaInicio,
})

export const aEquipo = (e) => ({
  id: e.equipoId, nombre: e.nombreequipo,
  capitanId: e.capitanId, juegoId: e.juegoprincipalId,
})

export const aJugador = (u) => ({
  id: u.usuarioId, apodo: u.nickname, nombre: u.nombreusuario, email: u.correo,
})

export const aPartida = (p) => ({
  id: p.partidaId, torneoId: p.torneoId, ronda: p.ronda,
  equipos: [p.participanteAId, p.participanteBId],
  fecha: p.fechaHora?.replace('T', ' ').slice(0, 16), estado: p.estadopartida,
})

export const aPosicion = (r) => ({
  participanteId: r.participanteId, pos: r.posicion, puntos: r.puntos,
})

export const aPremio = (p) => ({
  torneoId: p.torneoId, posicion: p.posicion, premio: p.descripcion,
})