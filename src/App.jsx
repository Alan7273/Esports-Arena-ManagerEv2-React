import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
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
        <Route index element={<Inicio />} />
        <Route path='torneos' element={<Torneos />} />
        <Route path='torneo' element={<TorneoDetalle />} />
        <Route path='torneo/:id' element={<TorneoDetalle />} />
        <Route path='inscripcion' element={<Inscripcion />} />
        <Route path='equipo' element={<Equipo />} />
        <Route path='perfil' element={<Perfil />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  )
}
