export function validarInscripcion({ torneo, equipo, juegos, jugadores, hoy }) {
    const errTorneo = [];
    const errEquipo = [];
    const nombreJuego = (id) => juegos.find(j) => j.id === id)?.nombre ?? '-';

    if(!torneo) errTorneo.push('Selecione un torneo');
    if(!equipo) errEquipo.push('Selecione un equipo');

    if(torneo) {
        if (torneo.estado !== 'abierto') {
            errTorneo.push('El torneo no se encuentra abierto para inscripciones');
        }
    } else if (hoy > torneo.fechaCierreInscripcion) {
        errTorneo.push('El plazo para inscripciones para este torneo ha finalizado');
    }
    if (torneo.cupoOcupado >= torneo.cupoMax) {
        errTorneo.push('El torneo no tiene cupos disponibles');
    }
    if (torneo.modalidad !== 'Equipos') {
        errTorneo.push('este torneo es individual y no admite equipos.');
    }

    if (torneo && equipo) {
        if (torneo.participantes.includes(equipo.id)) {
            errEquipo.push(`El equipo ${equipo.nombre} ya se encuentra inscrito en el torneo ${torneo.nombre}`);
        }
        if (equipo.juegoId !== torneo.juegoId) {
            errEquipo.push('el equipo juego ${nombreJuego(equipo.juegoId)}, pero el torneo es de ${nombreJuego(torneo.juegoId)}.');
        }
        const juego = juegos.find((j) => j.id === torneo.juegoId);
        if (juego && equipo.jugadores.length < juego.minJugadores) {
            errEquipo.push(`El equipo ${equipo.nombre} no cumple con el mínimo de jugadores requeridos para el juego ${nombreJuego(juego.id)}. Se requieren al menos ${juego.minJugadores} jugadores.`);
        }
        if (!equipo.activo) {
            errEquipo.push(`El equipo ${equipo.nombre} no está activo y no puede inscribirse en el torneo.`);
        }
        const capitan = jugadores.find((j) => j.id === equipo.capitanId);
        if (capitan && capitan.sanciones.some((s) => s.tipo === s.vigente)) {
            errEquipo.push(`El capitán del equipo ${equipo.nombre} tiene sanciones vigentes y no puede inscribirse en el torneo.`);
        }
    }

    return {
        torneo: errTorneo.join(' '),
        equipo: errEquipo.join(' '),
        ok: errTorneo.length === 0 && errEquipo.length === 0,
    };
}

export function validarEquipo({ nombre, capitanId, equipos}) {
    const errores = { nombre: '', capitanId: ''};
    if(!nombre) {
        errores.nombre = 'El nombre del equipo es obligatorio';
    } else if (equipos.some((e) => e.nombre.toLowerCase() === nombre.toLowerCase())) {
        errores.nombre = 'Ya existe un equipo con ese nombre';
    }
    if(!capitanId) {
        errores.capitanId = 'El capitán del equipo es obligatorio';
        return { ...errores, ok: !errores.nombre && !errores.capitanId };
    }

    export function validarPerfil({ apodo, email, edad, pass, pass2 }) {
        const e = { apodo: '', email: '', edad: '', pass: '', pass2: '' };

        if(!apodo) e.apodo = 'El apodo es obligatorio';
        else if (/\s/.test(apodo)) e.apodo = 'El apodo no puede contener espacios';
        else if (apodo.length < 3 || apodo.length > 15) e.apodo = 'El apodo debe tener entre 3 y 15 caracteres';
        
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'El email no es válido';

        const edadNum = Number (edad);
        if (edad === '' || !Number.isInteger(edadNum) || edadNum < 13 || edadNum > 99) {
            e.edad = 'La edad debe ser un número entero entre 13 y 99';
        }

        if(pass.length < 8) e.pass = 'La contraseña debe tener al menos 8 caracteres';
        if(pass !== pass2) e.pass2 = 'Las contraseñas no coinciden';

        return {...e, ok: Object.values(e).every((m) => m === '')}; 
    }
}
