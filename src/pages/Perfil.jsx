import { useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import useApi from "../hooks/useApi.js";
import useAuth from "../hooks/useAuth.js";
import { listarJugadores, actualizarJugador } from "../services/usuarios.js";
import { listarEquipos } from "../services/equipos.js";
import { listarSanciones } from "../services/sanciones.js";
import EstadoCarga from "../components/EstadoCarga.jsx";
import { useTitulo } from "../hooks/useTitulo.js";

export default function Perfil() {
  const { usuario } = useAuth();                                                 
  const { datos, cargando, error, recargar } = useApi(                            
    () => Promise.all([listarJugadores(), listarEquipos(), listarSanciones()])
  );
  const [jugadores = [], equipos = [], sanciones = []] = datos ?? [];             
  useTitulo("Mi perfil");

  // El jugador de la sesión es el que tiene como nickname el usuario con el que entraste
  const jugador = jugadores.find((j) => j.apodo === usuario.username);            

  const [form, setForm] = useState({ nombre: "", email: "" });                   
  const [errores, setErrores] = useState({ nombre: "", email: "" });              
  const [confirmacion, setConfirmacion] = useState("");
  const [errorApi, setErrorApi] = useState("");                                   

  // Cuando llega el jugador, se rellena el formulario
  useEffect(() => {                                                               
    if (jugador) setForm({ nombre: jugador.nombre ?? "", email: jugador.email ?? "" });
  }, [jugador?.id]);                                                              // eslint-disable-line react-hooks/exhaustive-deps

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setConfirmacion("");
  };

  const enviar = async (e) => {                                                   // <- CAMBIO (async y validación propia)
    e.preventDefault();
    setErrorApi("");
    const nombre = form.nombre.trim();
    const email = form.email.trim();
    const msgs = {
      nombre: nombre ? "" : "El nombre es obligatorio.",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Correo con formato inválido.",
    };
    setErrores(msgs);
    if (msgs.nombre || msgs.email) { setConfirmacion(""); return; }
    try {
      await actualizarJugador(jugador.id, { nombreusuario: nombre, correo: email });
      setConfirmacion("Datos actualizados correctamente.");
      recargar();
    } catch (err) {
      setErrorApi(err.message);
    }
  };

  const campo = (id, etiqueta, name, tipo, autoComplete, error, extra = {}) => (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Control type={tipo} name={name} autoComplete={autoComplete} required
        value={form[name] ?? ""} onChange={cambiar} isInvalid={!!error} {...extra} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );

  if (cargando || error) return <EstadoCarga cargando={cargando} error={error} />;   
  if (!jugador) {                                                                 
    return (
      <Alert variant="warning">
        No hay un jugador asociado a «{usuario.username}». Pide a un administrador que cree
        en Usuarios un jugador con ese mismo nickname.
      </Alert>
    );
  }

  const misEquipos = equipos.filter((e) => e.capitanId === jugador.id);
  const misSanciones = sanciones.filter((s) => s.usuarioId === jugador.id);
  const misRoles = usuario.roles.map((r) => r.replace("ROLE_", ""));

  return (
    <>
      <h2 className="mb-4">Perfil de jugador</h2>

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
            <Card.Header>Mi sesión</Card.Header>                                   {/* <- CAMBIO */}
            <Card.Body>
              <p className="mb-1">Usuario: {usuario.username}</p>
              <p className="mb-0">
                Roles: {misRoles.map((r) => <Badge key={r} bg="primary" className="me-1">{r}</Badge>)}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>Equipos que capitaneo</Card.Header>                      {/* <- CAMBIO */}
            <ListGroup as="ul" variant="flush">
              {misEquipos.length
                ? misEquipos.map((e) => (
                  <ListGroup.Item as="li" key={e.id}>{e.nombre}</ListGroup.Item>))
                : <ListGroup.Item as="li">No capitanea ningún equipo.</ListGroup.Item>}
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>Sanciones</Card.Header>
            <ListGroup as="ul" variant="flush">
              {misSanciones.length                                                 /* <- CAMBIO */
                ? misSanciones.map((s) => (
                  <ListGroup.Item as="li" key={s.sancionId} className="d-flex justify-content-between">
                    <span>{s.motivo}</span>
                    <Badge bg={s.estadoSancion === "ACTIVA" ? "danger" : "secondary"}>
                      {s.estadoSancion === "ACTIVA" ? "Vigente" : "Cumplida"}
                    </Badge>
                  </ListGroup.Item>))
                : <ListGroup.Item as="li">Sin sanciones registradas.</ListGroup.Item>}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <section style={{ maxWidth: 600 }}>
        <h3 className="h4 mb-3">Editar datos</h3>
        <Form onSubmit={enviar} noValidate>
          {campo("perfil-apodo", "Apodo", "apodo", "text", "username", "", { disabled: true, value: jugador.apodo })}  {/* <- CAMBIO */}
          {campo("perfil-nombre", "Nombre", "nombre", "text", "name", errores.nombre)}                                   {/* <- CAMBIO */}
          {campo("perfil-email", "Correo", "email", "email", "email", errores.email)}
          {errorApi && <Alert variant="danger">{errorApi}</Alert>}
          <Button type="submit" variant="primary">Guardar cambios</Button>
          {confirmacion && <Alert variant="success" className="mt-3">{confirmacion}</Alert>}
        </Form>
      </section>
    </>
  );
}