import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const ENLACES = [
  { seccion: "", to: "/", texto: "Inicio" },
  { seccion: "torneos", to: "/torneos", texto: "Torneos" },
  { seccion: "inscripcion", to: "/inscripcion", texto: "Inscripción", roles: ["JUGADOR", "ADMIN"] },
  { seccion: "equipo", to: "/equipo", texto: "Mi equipo", roles: ["JUGADOR", "ADMIN"] },
];

export default function Layout() {
  const { pathname } = useLocation();
  const seccionActual = pathname.split("/")[1] ?? "";
  const { usuario, logout, tieneRol } = useAuth();
  const navigate = useNavigate();

  const salir = () => {
    logout();
    navigate("/login");
  };

  const enlacesVisibles = ENLACES.filter(
    (e) => !e.roles || tieneRol(...e.roles)
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">eSports Arena Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-principal" />
          <Navbar.Collapse id="menu-principal">
            <Nav className="ms-auto">
              {enlacesVisibles.map((e) => (
                <Nav.Link
                  key={e.seccion}
                  as={Link}
                  to={e.to}
                  active={e.seccion === seccionActual}
                >
                  {e.texto}
                </Nav.Link>
              ))}

              {usuario ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/perfil"
                    active={seccionActual === "perfil"}
                  >
                    {usuario.username}
                  </Nav.Link>
                  <Nav.Link as="button" onClick={salir}>
                    Cerrar sesión
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  as={Link}
                  to="/login"
                  active={seccionActual === "login"}
                >
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