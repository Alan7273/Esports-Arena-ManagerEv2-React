import { useCallback, useEffect, useState } from 'react'

export default function useApi(fn, deps = []) {
  const [estado, setEstado] = useState({ datos: undefined, cargando: true, error: '' })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const recargar = useCallback(() => {
    setEstado((e) => ({ ...e, cargando: true, error: '' }))
    fn()
      .then((datos) => setEstado({ datos, cargando: false, error: '' }))
      .catch((err) => setEstado({ datos: undefined, cargando: false, error: err.message }))
  }, deps)

  useEffect(() => { recargar() }, [recargar])
  return { ...estado, recargar }
}