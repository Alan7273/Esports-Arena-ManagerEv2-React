import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useTitulo } from "../hooks/useTitulo.js";

export default function SinPermisos() {
  useTitulo("Sin permisos");
  return (
    <section aria-labelledby="titulo-permisos">
      <h1 id="titulo-permisos" className="mb-3">Sin permisos</h1>
      <Alert variant="danger">No tienes el rol necesario para ver esta página.</Alert>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}