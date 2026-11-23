import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import useAuth from "../hooks/useAuth.js";                                   // <- CAMBIO

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();                                            // <- CAMBIO
  const { usuario, logout, tieneRol } = useAuth();                           // <- CAMBIO
  const seccionActual = pathname.split("/")[1] ?? "";

  const salir = () => {                                                      // <- CAMBIO
    logout();
    navigate("/login");
  };

  // Cada enlace: a quién se le muestra                                      // <- CAMBIO (reemplaza ENLACES fijo)
  const enlaces = [
    { seccion: "", to: "/", texto: "Inicio", visible: !!usuario },
    { seccion: "torneos", to: "/torneos", texto: "Torneos", visible: !!usuario },
    { seccion: "inscripcion", to: "/inscripcion", texto: "Inscripción", visible: tieneRol("JUGADOR", "ADMIN") },
    { seccion: "equipo", to: "/equipo", texto: "Mi equipo", visible: tieneRol("JUGADOR", "ADMIN") },
    { seccion: "perfil", to: "/perfil", texto: "Mi perfil", visible: !!usuario },
  ].filter((e) => e.visible);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/"><h1>eSports Arena Manager</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-principal" />
          <Navbar.Collapse id="menu-principal">
            <Nav className="ms-auto">
              {enlaces.map((e) => (
                <Nav.Link key={e.seccion} as={Link} to={e.to} active={e.seccion === seccionActual}>
                  {e.texto}
                </Nav.Link>
              ))}
              {usuario ? (                                                   // <- CAMBIO
                <Nav.Link as="button" onClick={salir}>
                  Cerrar sesión ({usuario.username})
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login" active={seccionActual === "login"}>
                  Iniciar sesión
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container as="main" className="flex-grow-1 pb-5">
        <Outlet />
      </Container>

      <footer className="bg-dark text-light text-center py-3">
        <small>&copy; eSports Arena Manager - Proyecto Semestral - 2026-2</small>
      </footer>
    </div>
  );
}