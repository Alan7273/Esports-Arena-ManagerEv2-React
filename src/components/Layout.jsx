import { Link, Outlet, useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

const ENLACES = [
    { seccion: "", to: "/", texto: "Inicio" },
    { seccion: "torneos", to: "/torneos", texto: "Torneos" },
    { seccion: "torneo", to: "/torneo/t1", texto: "Inicio" },
    { seccion: "inscripcion", to: "/inscripcion", texto: "Inscripcion" },
    { seccion: "equipo", to: "/equipo", texto: "Mi equipo" },
    { seccion: "perfil", to:"/perfil", texto: "Mi perfil" },
];

export default function Layout() {
  const { pathname } = useLocation();
  const seccionActual = pathname.split("/")[1] ?? "";

  return (
  <div className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">eSports Arena Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-principal" />
          <Navbar.Collapse id="menu-principal">
            <Nav className="ms-auto">
              {ENLACES.map((e) => (
                <Nav.Link key={e.seccion} as={Link} to={e.to} active={e.seccion === seccionActual}>
                  {e.texto}
                </Nav.Link>
              ))}
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