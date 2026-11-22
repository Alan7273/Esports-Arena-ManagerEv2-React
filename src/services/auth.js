import { solicitar } from './api'

export const iniciarSesion = (username, password) =>
  solicitar('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })

export const registrarUsuario = (username, password) =>
  solicitar('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })