import { createContext, useContext } from "react";

export const DatosContext = createContext(null);

export function useDatos(){
    const ctx = useContext(DatosContext);
    if (!ctx) throw new Error("useDatos debe usarse dentro de <DatosProvider>")
    return ctx;
}