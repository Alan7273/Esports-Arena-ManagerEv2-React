import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import RutaProtegida from './components/RutaProtegida.jsx';
import Login from './pages/Login.jsx';
import SinPermisos from './pages/SinPermisos.jsx';
import Inicio from './pages/Inicio.jsx';
import Torneos from './pages/Torneos.jsx';
import TorneoDetalle from './pages/TorneoDetalle.jsx';
import Inscripcion from './pages/Inscripcion.jsx';
import Equipo from './pages/Equipo.jsx';
import Perfil from './pages/Perfil.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Públicas: no necesitan sesión */}
        <Route path='login' element={<Login />} />
        <Route path='sin-permisos' element={<SinPermisos />} />

        {/* Cualquier usuario con sesión (el gateway exige token para todo lo demás) */}
        <Route element={<RutaProtegida />}>
          <Route index element={<Inicio />} />
          <Route path='torneos' element={<Torneos />} />
          <Route path='torneo/:id' element={<TorneoDetalle />} />
          <Route path='perfil' element={<Perfil />} />
        </Route>

        {/* Solo jugadores y administradores */}
        <Route element={<RutaProtegida roles={['JUGADOR', 'ADMIN']} />}>
          <Route path='inscripcion' element={<Inscripcion />} />
          <Route path='equipo' element={<Equipo />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  )
}