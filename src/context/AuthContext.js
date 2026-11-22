import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

// roles opcional: si no lo pasas, basta con estar logueado
export default function RutaProtegida({ roles }) {
  const { usuario, tieneRol } = useAuth()
  const location = useLocation()

  if (!usuario) {
    // No logueado: al login, recordando a dónde iba
    return <Navigate to="/login" state={{ desde: location }} replace />
  }
  if (roles && !tieneRol(...roles)) {
    // Logueado pero sin el rol: página de "sin permisos"
    return <Navigate to="/sin-permisos" replace />
  }
  return <Outlet />
}