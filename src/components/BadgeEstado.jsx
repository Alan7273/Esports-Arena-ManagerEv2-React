import { Badge } from "react-bootstrap";
import { colorEstado, formatearEstado } from "../utils/formato.js";

export default function BadgeEstado({ estado, className }) {
  return (
    <Badge
      bg={colorEstado(estado)}
      text={estado === "en_curso" ? "dark" : undefined}
      className={className}
    >
      {formatearEstado(estado)}
    </Badge>
  );
}