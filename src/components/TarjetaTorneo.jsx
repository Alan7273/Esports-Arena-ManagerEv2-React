import { Link } from "react-router-dom";
import { Button, Card, Col, ProgressBar } from "react-bootstrap";
import BadgeEstado from "./BadgeEstado.jsx";

export default function TarjetaTorneo({ torneo: t }) {
  const nombreJuego = (juegoId) => t.juegoNombre ?? t.juego?.nombre ?? `Juego #${juegoId}`;
  const porcentaje = t.cupoMax ? Math.round((t.cupoOcupado / t.cupoMax) * 100) : 0;
  return (
    <Col>
      <Card className={`h-100 tarjeta-torneo tarjeta-${t.estado}`}>
        <Card.Body className="d-flex flex-column">
          <BadgeEstado estado={t.estado} className="align-self-start mb-2" />
          <Card.Title as="h3" className="h5">{t.nombre}</Card.Title>
          <Card.Text as="div">
            <p className="mb-1">Juego: {nombreJuego(t.juegoId)}</p>
            <p className="mb-2">Modalidad: {t.modalidad}</p>
            <p className="mb-1">Cupos: {t.cupoOcupado}/{t.cupoMax}</p>
            <ProgressBar
              now={porcentaje}
              aria-label={`Cupos ocupados: ${t.cupoOcupado} de ${t.cupoMax}`}
              className="mb-3"
            />
            <p className="mb-0">Cierre de inscripción: {t.fechaCierreInscripcion}</p>
          </Card.Text>
          <Button as={Link} to={`/torneo/${t.id}`} variant="primary" className="mt-3 align-self-start">
            Ver detalle
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}