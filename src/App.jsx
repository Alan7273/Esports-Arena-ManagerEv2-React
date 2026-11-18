import Login from './pages/Login.jsx';
import SinPermisos from './pages/SinPermisos.jsx';
import RutaProtegida from './components/RutaProtegida.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Públicas */}
        <Route path='login' element={<Login />} />
        <Route path='sin-permisos' element={<SinPermisos />} />
        <Route index element={<Inicio />} />
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
  )
}