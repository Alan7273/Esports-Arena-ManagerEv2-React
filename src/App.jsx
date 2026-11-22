import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import RutaProtegida from './components/RutaProtegida.jsx';
import Inicio from './pages/Inicio.jsx';
import Torneos from './pages/Torneos.jsx';
import TorneoDetalle from './pages/TorneoDetalle.jsx';
import Inscripcion from './pages/Inscripcion.jsx';
import Equipo from './pages/Equipo.jsx';
import Perfil from './pages/Perfil.jsx';
import Login from './pages/Login.jsx';
import SinPermisos from './pages/SinPermisos.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Públicas */}
        <Route index element={<Inicio />} />
        <Route path='login' element={<Login />} />
        <Route path='sin-permisos' element={<SinPermisos />} />
        <Route path='torneos' element={<Torneos />} />
        <Route path='torneo/:id' element={<TorneoDetalle />} />

        {/* Requieren estar logueado */}
        <Route element={<RutaProtegida />}>
          <Route path='perfil' element={<Perfil />} />
        </Route>

        {/* Requieren rol específico */}
        <Route element={<RutaProtegida roles={['JUGADOR', 'ADMIN']} />}>
          <Route path='inscripcion' element={<Inscripcion />} />
          <Route path='equipo' element={<Equipo />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
}