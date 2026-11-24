const API_URL = import.meta.env.VITE_API_URL
const CLAVE_TOKEN = 'token'

// AuthProvider registra aquí qué hacer cuando el backend responde 401
let alNoAutorizado = () => {}
export function registrarAlNoAutorizado(fn) {
    alNoAutorizado = fn 
}

export async function solicitar(ruta, opciones = {}) {
    const token = localStorage.getItem(CLAVE_TOKEN)

    const res = await fetch(`${API_URL}${ruta}`, {
        ...opciones,
        headers: {
            'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...opciones.headers
    },
})

// 401 fuera del login: el token venció o es inválido, se cierra la sesión
if (res.status === 401 && !ruta.includes('/auth/')) {
    // Sin token: el gateway exige sesión para leer datos, no es una sesión vencida
    if (!token) throw new Error('Inicia sesión para ver esta información.')
    alNoAutorizado()
    throw new Error('Sesión expirada. Inicia sesión nuevamente.')
}

// 403: la sesión es válida, pero el rol no tiene permiso
if (res.status === 403) {
    throw new Error('No tienes permisos para realizar esta acción.')
}

if (!res.ok){
    const cuerpo = await res.json().catch(() => ({}))
    throw new Error(cuerpo.mensaje || cuerpo.message || `Error ${res.status}`)
}
return res.status === 204 ? null : res.json()

}