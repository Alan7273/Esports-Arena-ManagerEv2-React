import { useState } from "react";
import { Alert, Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDatos } from "../context/DatosContext.js";
import { useTitulo } from "../hooks/useTitulo.js";
import { validarEquipo } from "../utils/validaciones.js";

export default function Equipo() {
  const { juegos, jugadores, equipos, crearEquipo } = useDatos();
  useTitulo("Mi equipo");

  const FORM_VACIO = { nombre: "", juegoId: juegos[0].id, capitanId: "" };
  const NUEVO_VACIO = { jugadorId: jugadores[0]?.id ?? "", rol: "" };

  const [form, setForm] = useState(FORM_VACIO);
  const [nuevo, setNuevo] = useState(NUEVO_VACIO);
  const [integrantes, setIntegrantes] = useState([]);
  const [errores, setErrores] = useState({ nombre: "", capitan: "", integrantes: "" });
  const [confirmacion, setConfirmacion] = useState("");

  const cambiarForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const apodo = (id) => jugadores.find((j) => j.id === id)?.apodo ?? id;

  const agregar = () => {
    if (!nuevo.jugadorId) return;
    if (integrantes.some((i) => i.jugadorId === nuevo.jugadorId)) {
      setErrores({ ...errores, integrantes: "Ese jugador ya está en el equipo." });
      return;
    }
    setErrores({ ...errores, integrantes: "" });
    setIntegrantes([...integrantes, { jugadorId: nuevo.jugadorId, rol: nuevo.rol.trim() || "Jugador" }]);
    setNuevo({ ...nuevo, rol: "" });
  };

  const quitar = (jugadorId) => setIntegrantes(integrantes.filter((i) => i.jugadorId !== jugadorId));

  const enviar = (e) => {
    e.preventDefault();
    setConfirmacion("");
    const nombre = form.nombre.trim();
    const r = validarEquipo({ nombre, capitanId: form.capitanId, equipos });
    setErrores({ nombre: r.nombre, capitan: r.capitan, integrantes: "" });
    if (!r.ok) return;

    crearEquipo({ nombre, juegoId: form.juegoId, capitanId: form.capitanId, integrantes });
    setConfirmacion(`Equipo "${nombre}" creado con éxito.`);
    setForm(FORM_VACIO);
    setNuevo(NUEVO_VACIO);
    setIntegrantes([]);
  };

  return (
    <section style={{ maxWidth: 700 }}>
      <h2 className="mb-4">Crear / gestionar equipo</h2>
      <Form onSubmit={enviar} onChange={() => setConfirmacion("")} noValidate>
        <Form.Group className="mb-3" controlId="equipo-nombre">
          <Form.Label>Nombre del equipo</Form.Label>
          <Form.Control type="text" name="nombre" autoComplete="off" required
            value={form.nombre} onChange={cambiarForm} isInvalid={!!errores.nombre} />
          <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="equipo-juego">
          <Form.Label>Juego principal</Form.Label>
          <Form.Select name="juegoId" required value={form.juegoId} onChange={cambiarForm}>
            {juegos.map((j) => <option key={j.id} value={j.id}>{j.nombre}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="equipo-capitan">
          <Form.Label>Capitán</Form.Label>
          <Form.Select name="capitanId" required value={form.capitanId} onChange={cambiarForm}
            isInvalid={!!errores.capitan}>
            <option value="">Selecciona un capitán</option>
            {jugadores.map((j) => <option key={j.id} value={j.id}>{j.apodo}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errores.capitan}</Form.Control.Feedback>
        </Form.Group>

        <fieldset className="border rounded p-3 mb-3">
          <legend className="float-none w-auto px-2 fs-6">Integrantes</legend>
          <Row className="g-2 align-items-end">
            <Col md={5}>
              <Form.Group controlId="equipo-nuevo-jugador">
                <Form.Label>Jugador</Form.Label>
                <Form.Select value={nuevo.jugadorId}
                  onChange={(e) => setNuevo({ ...nuevo, jugadorId: e.target.value })}>
                  {jugadores.map((j) => <option key={j.id} value={j.id}>{j.apodo}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="equipo-nuevo-rol">
                <Form.Label>Rol</Form.Label>
                <Form.Control type="text" placeholder="Ej: Soporte" autoComplete="off"
                  value={nuevo.rol} onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value })} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Button type="button" variant="outline-primary" className="w-100" onClick={agregar}>
                Agregar integrante
              </Button>
            </Col>
          </Row>
          {errores.integrantes && <Alert variant="danger" className="mt-3 mb-0 py-2">{errores.integrantes}</Alert>}
          <ListGroup as="ul" className="mt-3">
            {integrantes.map((i) => (
              <ListGroup.Item as="li" key={i.jugadorId}
                className="d-flex justify-content-between align-items-center">
                <span>{apodo(i.jugadorId)} — {i.rol}</span>
                <Button type="button" size="sm" variant="outline-danger" onClick={() => quitar(i.jugadorId)}>
                  Quitar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </fieldset>

        <Button type="submit" variant="primary">Guardar equipo</Button>
        {confirmacion && <Alert variant="success" className="mt-3">{confirmacion}</Alert>}
      </Form>
    </section>
  );
}