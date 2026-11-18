import { useState, useEffect, useCallback } from 'react'
import { AuthContext } from './AuthContext'
import { iniciarSesion } from '../services/auth'
import { registrarAlNoAutorizado } from '../services/api'

//(solo lectura, no valida la firma; eso lo hace el backend)
function leerPayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

// Devuelve el usuario si el token existe y no está vencido
function usuarioDesdeToken(token) {
  if (!token) return null
  const datos = leerPayload(token)
  if (!datos || datos.exp * 1000 < Date.now()) return null // exp viene en segundos
  return { username: datos.sub, roles: datos.roles ?? [] }
}

export default function AuthProvider({ children }) {
  // El estado inicial sale de localStorage: así la sesión sobrevive al recargar (F5)
  const [token, setToken] = useState(() => {
    const guardado = localStorage.getItem('token')
    return usuarioDesdeToken(guardado) ? guardado : null
  })
  const usuario = usuarioDesdeToken(token)

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
  }, [])

  const login = async (username, password) => {
    const respuesta = await iniciarSesion(username, password)
    localStorage.setItem('token', respuesta.token)
    setToken(respuesta.token)
  }

  const tieneRol = (...roles) =>
    !!usuario && roles.some((r) => usuario.roles.includes(`ROLE_${r}`))

  // Si el backend responde 401, cerramos sesión
  useEffect(() => {
    registrarAlNoAutorizado(logout)
  }, [logout])

  // Cierra sesión automáticamente cuando el token vence
  useEffect(() => {
    if (!token) return
    const datos = leerPayload(token)
    const ms = datos.exp * 1000 - Date.now()
    const id = setTimeout(logout, ms)
    return () => clearTimeout(id)
  }, [token, logout])

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, tieneRol }}>
      {children}
    </AuthContext.Provider>
  )
}