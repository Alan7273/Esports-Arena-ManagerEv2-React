export function formatearEstado(estado) {
    return estado.replace('_', ' ');
}


export function fechaHoy() {
    const d = new Date();
    const mes = Strng(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
}

export function etiquetaPosicion(pos) {
    const medallas = {1: '🥇1° lugar', 2: '🥈2° lugar', 3: '🥉3° lugar'};
    return medallas[pos] || `${pos}° lugar`;
}

export const CLASES_PODIO = {
    1: 'fila_podio fila_oro',
    2: 'fila_podio fila_plata',
    3: 'fila_podio fila_bronce',
};