import { useParams } from "react-router-dom";
import { Alert, Card, ListGroup, Table } from "react-bootstrap";
import { useDatos } from "../context/DatosContext.js";
import { useTitulo } from "../hooks/useTitulo.js";
import { etiquetaPosicion, CLASE_PODIO } from "../utils/formato.js";
import BadgeEstado from "../components/BadgeEstado.jsx";

export default function TorneoDetalle() {
  const { id } = useParams();
  const { torneos, nombreJuego, nombreParticipante } = useDatos();
  const t = torneos.find((x) => x.id === (id || torneos[0].id));
  useTitulo(t ? t.nombre : "Detalle de torneo");

  if (!t) return <Alert variant="warning">Torneo no encontrado.</Alert>;

  const posiciones = t.posiciones.slice().sort((a, b) => a.pos - b.pos);

  return (
    <>
      <section className="mb-4">
        <h2 className="mb-3">{t.nombre}</h2>
        <Card body>
          <p className="mb-1">Juego: {nombreJuego(t.juegoId)} - Modalidad: {t.modalidad}</p>
          <p className="mb-1">Cupos disponibles: {t.cupoMax - t.cupoOcupado} de {t.cupoMax}</p>
          <p className="mb-0">Estado: <BadgeEstado estado={t.estado} /></p>
        </Card>
      </section>

      <section className="mb-4">
        <h3 className="h4 mb-3">Participantes inscritos</h3>
        <ListGroup as="ul">
          {t.participantes.length
            ? t.participantes.map((p) => (
              <ListGroup.Item as="li" key={p}>{nombreParticipante(p)}</ListGroup.Item>))
            : <ListGroup.Item as="li">Aún no hay participantes inscritos.</ListGroup.Item>}
        </ListGroup>
      </section>

      <section className="mb-4">
        <h3 className="h4 mb-3">Calendario de partidas</h3>
        <Table striped bordered hover responsive>
          <thead><tr><th>Ronda</th><th>Enfrentamiento</th><th>Fecha</th><th>Estado</th></tr></thead>
          <tbody>
            {t.partidas.length
              ? t.partidas.map((p) => (
                <tr key={p.id}>
                  <td>Ronda {p.ronda}</td>
                  <td>{p.equipos.map(nombreParticipante).join(" vs ")}</td>
                  <td>{p.fecha}</td>
                  <td>{p.estado}</td>
                </tr>))
              : <tr><td colSpan="4">Calendario aún no publicado.</td></tr>}
          </tbody>
        </Table>
      </section>

      <section className="mb-4">
        <h3 className="h4 mb-3">Tabla de posiciones</h3>
        <Table bordered responsive>
          <thead><tr><th>Posición</th><th>Participante</th><th>Puntos</th></tr></thead>
          <tbody>
            {posiciones.length
              ? posiciones.map((p) => (
                <tr key={p.participanteId} className={CLASE_PODIO[p.pos] || ""}>
                  <td>{etiquetaPosicion(p.pos)}</td>
                  <td>{nombreParticipante(p.participanteId)}</td>
                  <td>{p.puntos}</td>
                </tr>))
              : <tr><td colSpan="3">Tabla de posiciones no disponible aún.</td></tr>}
          </tbody>
        </Table>
      </section>

      <section>
        <h3 className="h4 mb-3">Premios</h3>
        <ListGroup as="ul">
          {t.premios.map((p) => (
            <ListGroup.Item as="li" key={p.posicion}>Puesto {p.posicion}: {p.premio}</ListGroup.Item>))}
        </ListGroup>
      </section>
    </>
  );
}