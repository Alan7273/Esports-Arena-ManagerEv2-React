import { useSyncExternalStore } from 'react';

function suscribir(callback) {
    window.addEventListener('hashchange', callback);
    return () => window.removeEventListener('hashchange', callback);
}
function leerRuta() {
    return window.location.hash.replace(/^#/, '') || '/';
}
export function useRuta() {
    return useSyncExternalStore(suscribir, leerRuta, () => '/');
}