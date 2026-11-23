import { Link } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import BadgeEstado from "./BadgeEstado.jsx";                          // <- CAMBIO (ya no se importa useDatos)

export default function TarjetaTorneo({ torneo: t }) {
  return (
    <Col>
      <Card className="h-100 shadow-sm">
        <Card.Body className="d-flex flex-column">
          <BadgeEstado estado={t.estado} className="align-self-start mb-2" />
          <Card.Title as="h3" className="h5">{t.nombre}</Card.Title>
          <Card.Text as="div">
            <p className="mb-1">Juego: {t.juegoNombre}</p>             {/* <- CAMBIO */}
            <p className="mb-1">Modalidad: {t.modalidad}</p>
            <p className="mb-1">Cupo máximo: {t.cupoMax}</p>           {/* <- CAMBIO */}
            <p className="mb-0">Cierre de inscripción: {t.fechaCierreInscripcion}</p>
          </Card.Text>
          <Button as={Link} to={`/torneo/${t.id}`} variant="primary" className="mt-auto align-self-start">
            Ver detalle
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}