import { useParams } from "react-router-dom";
import { Alert, Card, ListGroup, Table } from "react-bootstrap";
import useApi from "../hooks/useApi.js";
import { obtenerTorneo, listarPartidas, listarRanking, listarPremios, INSCRIPCION_INACTIVA } from "../services/torneos.js";
import { listarJuegos } from "../services/juegos.js";
import { listarInscripciones } from "../services/inscripciones.js";
import EstadoCarga from "../components/EstadoCarga.jsx";
import { useTitulo } from "../hooks/useTitulo.js";
import { etiquetaPosicion, CLASE_PODIO } from "../utils/formato.js";
import BadgeEstado from "../components/BadgeEstado.jsx";

export default function TorneoDetalle() {
  const { id } = useParams();

  // Un torneo se arma con datos de 7 servicios distintos, pedidos en paralelo
  const { datos, cargando, error } = useApi(async () => {         // <- CAMBIO (todo este bloque)
    const [torneo, partidas, posiciones, premios, juegos, inscripciones] =
      await Promise.all([
        obtenerTorneo(id),
        listarPartidas(),
        listarRanking(id).catch(() => []),   // si aún no hay ranking, la tabla queda vacía
        listarPremios(),
        listarJuegos(),
        listarInscripciones(),
      ]);
    const tid = Number(id);
    return {
      t: torneo,
      partidas: partidas.filter((p) => p.torneoId === tid),
      posiciones,
      premios: premios.filter((p) => p.torneoId === tid),
      juegos,
      inscripciones: inscripciones.filter((i) => i.torneoId === tid),
      participantes: inscripciones.filter(
        (i) => i.torneoId === tid && !INSCRIPCION_INACTIVA.includes(i.estado)),
    };
  }, [id]);

  const t = datos?.t;                                              // <- CAMBIO
  useTitulo(t ? t.nombre : "Detalle de torneo");

  if (cargando || error) return <EstadoCarga cargando={cargando} error={error} />;   // <- CAMBIO
  if (!t) return <Alert variant="warning">Torneo no encontrado.</Alert>;

  const { partidas, premios, juegos, inscripciones, participantes } = datos;                // <- CAMBIO
  const nombreJuego = (jid) => juegos.find((j) => j.id === jid)?.nombre ?? "-";       // <- CAMBIO
  // El participante es un equipo o, en torneos individuales, un jugador: el nombre viene de la inscripción
  const nombreParticipante = (pid) =>
    inscripciones.find((i) => (t.modalidad === "Individual" ? i.usuarioId : i.equipoId) === pid)
      ?.nombreJugador ?? `#${pid}`;
  const posiciones = datos.posiciones.slice().sort((a, b) => a.pos - b.pos);          // <- CAMBIO

  return (
    <>
      <section className="mb-4">
        <h2 className="mb-3">{t.nombre}</h2>
        <Card body>
          <p className="mb-1">Juego: {nombreJuego(t.juegoId)} - Modalidad: {t.modalidad}</p>
          <p className="mb-1">Cupos disponibles: {t.cupoMax - participantes.length} de {t.cupoMax}</p>  {/* <- CAMBIO */}
          <p className="mb-0">Estado: <BadgeEstado estado={t.estado} /></p>
        </Card>
      </section>

      <section className="mb-4">
        <h3 className="h4 mb-3">Participantes inscritos</h3>
        <ListGroup as="ul">
          {participantes.length                                                           /* <- CAMBIO */
            ? participantes.map((p) => (
              <ListGroup.Item as="li" key={p.inscripcionId}>
                {p.nombreJugador ?? nombreParticipante(p.equipoId)}
              </ListGroup.Item>))
            : <ListGroup.Item as="li">Aún no hay participantes inscritos.</ListGroup.Item>}
        </ListGroup>
      </section>

      <section className="mb-4">
        <h3 className="h4 mb-3">Calendario de partidas</h3>
        <Table striped bordered hover responsive>
          <thead><tr><th>Ronda</th><th>Enfrentamiento</th><th>Fecha</th><th>Estado</th></tr></thead>
          <tbody>
            {partidas.length                                                              /* <- CAMBIO */
              ? partidas.map((p) => (
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
          {premios.length                                                                 /* <- CAMBIO */
            ? premios.map((p) => (
              <ListGroup.Item as="li" key={p.posicion}>Puesto {p.posicion}: {p.premio}</ListGroup.Item>))
            : <ListGroup.Item as="li">Premios aún no definidos.</ListGroup.Item>}
        </ListGroup>
      </section>
    </>
  );
}