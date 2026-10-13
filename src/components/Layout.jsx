import { Link, Outlet, useLocation } from 'react-router-dom';

const ENLACES = [
    { seccion: '', to: '/', texto: 'Inicio' },
    { seccion: 'torneos', to: '/torneos', texto: 'Torneos' },
    { seccion: 'torneo', to: '/torneo/t1', texto: 'Inicio' },
    { seccion: 'inscripcion', to: '/inscripcion', texto: 'Inscripcion' },
    { seccion: 'equipo', to: '/equipo', texto: 'Mi equipo' },
    { seccion: 'perfil', to: '/', texto: 'Mi perfil' },
];

export default function Layout() {
  const { pathname } = useLocation();
  const seccionActual = pathname.split("/")[1] ?? "";

  return (
    <>
      <header>
        <span className="logo">eSports Arena Manager</span>
        <nav>
          <ul>
            {ENLACES.map((e) => (
              <li key={e.seccion}>
                <Link to={e.to} aria-current={e.seccion === seccionActual ? "page" : undefined}>
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>&copy; eSports Arena Manager - Proyecto Semestral - 2026-2</p>
      </footer>
    </>
  );
}