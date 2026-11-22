import { Badge } from "react-bootstrap";
import { colorEstado, formatearEstado } from "../utils/formato.js";

// La clase estado-* agrega el símbolo (●, ▶, ■) definido en componentes.css:
// el estado no depende solo del color.
export default function BadgeEstado({ estado, className = "" }) {
  return (
    <Badge bg={colorEstado(estado)} className={`estado-${estado} ${className}`.trim()}>
      {formatearEstado(estado)}
    </Badge>
  );
}