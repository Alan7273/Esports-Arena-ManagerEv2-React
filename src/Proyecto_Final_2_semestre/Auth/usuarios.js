async function obtenerUsuario(id) {
    const res = await fetch(`${URL}/users/${id}`)
    if (!res.ok) {
        throw new Error(`Error ${res.status}`)
    }
    return await res.json()
}