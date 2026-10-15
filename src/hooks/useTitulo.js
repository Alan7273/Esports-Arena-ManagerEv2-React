import {useEffect} from 'react';

export function useTitulo(texto) {
    useEffect(() => {
        document.title = 'eSport Arena Manager -  + ${texto} ';
    }, [texto]);
}