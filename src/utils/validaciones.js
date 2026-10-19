export function validarInscripcion({ torneo, equipo, juegos, jugadores, hoy }) {
  const errTorneo = [];
  const errEquipo = [];
  const nombreJuego = (id) => juegos.find((j) => j.id === id)?.nombre ?? "—";

  if (!torneo) errTorneo.push("Selecciona un torneo.");
  if (!equipo) errEquipo.push("Selecciona un equipo.");

  if (torneo) {
    if (torneo.estado !== "abierto") {
      errTorneo.push("Este torneo no está abierto a inscripciones.");
    } else if (hoy > torneo.fechaCierreInscripcion) {
      errTorneo.push("El plazo de inscripción para este torneo ya cerró.");
    }
    if (torneo.cupoOcupado >= torneo.cupoMax) {
      errTorneo.push("El torneo no tiene cupos disponibles.");
    }
    if (torneo.modalidad !== "Equipos") {
      errTorneo.push("Este torneo es individual y no admite equipos.");
    }
  }

  if (torneo && equipo) {
    if (torneo.participantes.includes(equipo.id)) {
      errEquipo.push("Este equipo ya está inscrito en el torneo.");
    }
    if (equipo.juegoId !== torneo.juegoId) {
      errEquipo.push(`El equipo juega ${nombreJuego(equipo.juegoId)}, pero el torneo es de ${nombreJuego(torneo.juegoId)}.`);
    }
    const juego = juegos.find((j) => j.id === torneo.juegoId);
    if (juego && equipo.integrantes.length < juego.minIntegrantes) {
      errEquipo.push(`El juego exige mínimo ${juego.minIntegrantes} integrantes.`);
    }
    if (!equipo.activo) {
      errEquipo.push("El equipo está inactivo y no puede inscribirse.");
    }
    const capitan = jugadores.find((j) => j.id === equipo.capitanId);
    if (capitan && capitan.sanciones.some((s) => s.vigente)) {
      errEquipo.push(`El capitán ${capitan.apodo} tiene una sanción vigente que bloquea la inscripción.`);
    }
  }

  return {
    torneo: errTorneo.join(" "),
    equipo: errEquipo.join(" "),
    ok: errTorneo.length === 0 && errEquipo.length === 0,
  };
}

export function validarEquipo({ nombre, capitanId, equipos }) {
  const errores = { nombre: "", capitan: "" };
  if (!nombre) {
    errores.nombre = "El nombre del equipo es obligatorio.";
  } else if (equipos.some((e) => e.nombre.toLowerCase() === nombre.toLowerCase())) {
    errores.nombre = "Ya existe un equipo con ese nombre.";
  }
  if (!capitanId) errores.capitan = "Debes seleccionar un capitán.";
  return { ...errores, ok: !errores.nombre && !errores.capitan };
}

export function validarPerfil({ apodo, email, edad, pass, pass2 }) {
  const e = { apodo: "", email: "", edad: "", password: "", password2: "" };

  if (!apodo) e.apodo = "El apodo es obligatorio.";
  else if (/\s/.test(apodo)) e.apodo = "El apodo no puede contener espacios.";
  else if (apodo.length < 3 || apodo.length > 15) e.apodo = "Debe tener entre 3 y 15 caracteres.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Correo con formato inválido.";

  const edadNum = Number(edad);
  if (edad === "" || !Number.isInteger(edadNum) || edadNum < 13 || edadNum > 99) {
    e.edad = "La edad debe ser un número entero entre 13 y 99.";
  }

  if (pass.length < 8) e.password = "La contraseña debe tener mínimo 8 caracteres.";
  if (pass !== pass2) e.password2 = "Las contraseñas no coinciden.";

  return { ...e, ok: Object.values(e).every((m) => m === "") };
}