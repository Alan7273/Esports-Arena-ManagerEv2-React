import { useState } from "react";
import { Alert, Badge, Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDatos } from "../context/DatosContext.js";
import { useTitulo } from "../hooks/useTitulo.js";
import { validarPerfil } from "../utils/validaciones.js";

export default function Perfil() {
  const { jugadores, equipos, actualizarJugador } = useDatos();
  useTitulo("Mi perfil");

  const jugador = jugadores[0]; // simulado: jugador con sesión activa

  const [form, setForm] = useState({
    apodo: jugador.apodo, email: jugador.email, edad: "", pass: "", pass2: "",
  });
  const [errores, setErrores] = useState({ apodo: "", email: "", edad: "", password: "", password2: "" });
  const [confirmacion, setConfirmacion] = useState("");

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setConfirmacion("");
  };

  const enviar = (e) => {
    e.preventDefault();
    const datos = { ...form, apodo: form.apodo.trim(), email: form.email.trim() };
    const { ok, ...msgs } = validarPerfil(datos);
    setErrores(msgs);
    if (!ok) { setConfirmacion(""); return; }
    actualizarJugador(jugador.id, { apodo: datos.apodo, email: datos.email });
    setConfirmacion("Datos actualizados correctamente.");
  };

  const campo = (id, etiqueta, name, tipo, autoComplete, error, extra = {}) => (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Control type={tipo} name={name} autoComplete={autoComplete} required
        value={form[name]} onChange={cambiar} isInvalid={!!error} {...extra} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <>
      <h1 className="mb-4">Perfil de jugador</h1>

      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>Datos</Card.Header>
            <Card.Body>
              <p className="mb-1">Nombre: {jugador.nombre}</p>
              <p className="mb-1">Apodo: {jugador.apodo}</p>
              <p className="mb-0">Correo: {jugador.email}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>Estadísticas</Card.Header>
            <Card.Body>
              <p className="mb-0">
                Victorias: {jugador.estadisticas.victorias} — Derrotas: {jugador.estadisticas.derrotas}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>Equipos</Card.Header>
            <ListGroup as="ul" variant="flush">
              {jugador.equipos.length
                ? jugador.equipos.map((id) => (
                  <ListGroup.Item as="li" key={id}>{equipos.find((e) => e.id === id)?.nombre ?? id}</ListGroup.Item>))
                : <ListGroup.Item as="li">No pertenece a ningún equipo.</ListGroup.Item>}
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>Sanciones</Card.Header>
            <ListGroup as="ul" variant="flush">
              {jugador.sanciones.length
                ? jugador.sanciones.map((s) => (
                  <ListGroup.Item as="li" key={s.motivo} className="d-flex justify-content-between">
                    <span>{s.motivo}</span>
                    <Badge bg={s.vigente ? "danger" : "secondary"}>{s.vigente ? "Vigente" : "Cumplida"}</Badge>
                  </ListGroup.Item>))
                : <ListGroup.Item as="li">Sin sanciones registradas.</ListGroup.Item>}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <section style={{ maxWidth: 600 }}>
        <h2 className="h4 mb-3">Editar datos</h2>
        <Form onSubmit={enviar} noValidate>
          {campo("perfil-apodo", "Apodo", "apodo", "text", "username", errores.apodo)}
          {campo("perfil-email", "Correo", "email", "email", "email", errores.email)}
          {campo("perfil-edad", "Edad", "edad", "number", "off", errores.edad, { min: 13, max: 99 })}
          {campo("perfil-password", "Nueva contraseña", "pass", "password", "new-password", errores.password)}
          {campo("perfil-password2", "Confirmar contraseña", "pass2", "password", "new-password", errores.password2)}
          <Button type="submit" variant="primary">Guardar cambios</Button>
          {confirmacion && <Alert variant="success" className="mt-3">{confirmacion}</Alert>}
        </Form>
      </section>
    </>
  );
}