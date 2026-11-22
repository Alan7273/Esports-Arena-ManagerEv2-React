import { Link } from "react-router-dom";

export default function SinPermisos() {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h2>Acceso denegado</h2>
      <p>No tienes permisos para ver esta página.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}