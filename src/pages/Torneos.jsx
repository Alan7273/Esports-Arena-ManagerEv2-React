import { useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { useDatos } from "../context/DatosContext.js";
import { useTitulo } from "../hooks/useTitulo.js";
import TarjetaTorneo from "../components/TarjetaTorneo.jsx";

export default function Torneos() {
  const { torneos, juegos } = useDatos();
  useTitulo("Torneos");

  const [filtros, setFiltros] = useState({ juego: "", estado: "", nombre: "", desde: "", hasta: "" });
  const cambiar = (e) => setFiltros({ ...filtros, [e.target.name]: e.target.value });

  const { juego, estado, nombre, desde, hasta } = filtros;
  const errorFechas = desde && hasta && desde > hasta
    ? "La fecha inicial no puede ser posterior a la final."
    : "";
  const texto = nombre.trim().toLowerCase();

  const filtrados = torneos.filter((t) => {
    if (juego && t.juegoId !== juego) return false;
    if (estado && t.estado !== estado) return false;
    if (texto && !t.nombre.toLowerCase().includes(texto)) return false;
    if (!errorFechas) {
      if (desde && t.fechaInicio < desde) return false;
      if (hasta && t.fechaInicio > hasta) return false;
    }
    return true;
  });

  return (
    <section aria-labelledby="titulo-listado">
      <h2 id="titulo-listado" className="mb-4">Listado de torneos</h2>

      <Form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <Row className="g-3">
          <Col md={6} lg={4}>
            <Form.Group controlId="filtro-juego">
              <Form.Label>Juego</Form.Label>
              <Form.Select name="juego" value={juego} onChange={cambiar}>
                <option value="">Todos</option>
                {juegos.map((j) => <option key={j.id} value={j.id}>{j.nombre}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} lg={4}>
            <Form.Group controlId="filtro-estado">
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado" value={estado} onChange={cambiar}>
                <option value="">Todos</option>
                <option value="abierto">Abierto</option>
                <option value="en_curso">En curso</option>
                <option value="finalizado">Finalizado</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group controlId="filtro-nombre">
              <Form.Label>Buscar por nombre</Form.Label>
              <Form.Control type="text" name="nombre" autoComplete="off"
                placeholder="Ej: Copa Apertura" value={nombre} onChange={cambiar} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="filtro-fecha-inicio">
              <Form.Label>Desde</Form.Label>
              <Form.Control type="date" name="desde" value={desde} onChange={cambiar} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="filtro-fecha-fin">
              <Form.Label>Hasta</Form.Label>
              <Form.Control type="date" name="hasta" value={hasta} onChange={cambiar} />
            </Form.Group>
          </Col>
        </Row>
        {errorFechas && <Alert variant="danger" className="mt-3 mb-0 py-2">{errorFechas}</Alert>}
      </Form>

      {filtrados.length === 0
        ? <Alert variant="info">No hay torneos que coincidan con los filtros seleccionados.</Alert>
        : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {filtrados.map((t) => <TarjetaTorneo key={t.id} torneo={t} />)}
          </Row>
        )}
    </section>
  );
}