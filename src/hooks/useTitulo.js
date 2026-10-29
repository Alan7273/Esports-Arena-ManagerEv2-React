import {useEffect} from "react";

export function useTitulo(texto) {
    useEffect(() => {
        document.title = `eSports Arena Manager - ${texto}`;
    }, [texto]);
}