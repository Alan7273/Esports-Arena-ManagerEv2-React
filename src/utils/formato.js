export function formatearEstado(estado) {
    return estado.replace('_', ' ');
}

export function colorEstado(estado) {
    const colores = { abierto: "success", en_curso: "warning", finalizado: "secondary" };
    return colores[estado] ?? "secondary";
}
export function fechaHoy() {
    const d = new Date();
    const mes = Strng(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mes}-${dia}`;
}

export function etiquetaPosicion(pos) {
    const medallas = { 1: "🥇1° lugar", 2: "🥈2° lugar", 3: "🥉3° lugar" };
    return medallas[pos] || `${pos}° lugar`;
}

export const CLASE_PODIO = {
    1: "table-warning",
    2: "table secondary",
    3: "table-danger",
};