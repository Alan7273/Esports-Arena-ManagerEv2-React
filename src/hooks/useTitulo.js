import {useEffect} from "react";

export function useTitulo(texto) {
    useEffect(() => {
        document.title = <h1>`eSports Arena Manager - ${texto}`</h1>;
    }, [texto]);
}