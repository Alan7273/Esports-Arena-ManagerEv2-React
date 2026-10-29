import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDatos } from "../context/DatosContext.js";
import { useTitulo } from "../hooks/useTitulo.js";
import { fechaHoy } from "../utils/formato.js";
import { validarInscripcion } from "../utils/validaciones.js";

export default function Inscripcion() {
  const { torneos, equipos, juegos, jugadores, inscribirEquipo } = useDatos();
  useTitulo("Inscripción");

  const [torneoId, setTorneoId] = useState("");
  const [equipoId, setEquipoId] = useState("");
  const [tocado, setTocado] = useState(false);
  const [confirmacion, setConfirmacion] = useState("");

  const torneo = torneos.find((x) => x.id === torneoId);
  const equipo = equipos.find((x) => x.id === equipoId);
  const resultado = validarInscripcion({ torneo, equipo, juegos, jugadores, hoy: fechaHoy() });

  const alCambiar = (setter) => (e) => {
    setter(e.target.value);
    setTocado(true);
    setConfirmacion("");
  };

  const enviar = (e) => {
    e.preventDefault();
    setTocado(true);
    if (!resultado.ok) return;
    inscribirEquipo(torneo.id, equipo.id);
    setTorneoId("");
    setEquipoId("");
    setTocado(false);
    setConfirmacion("Inscripción registrada correctamente.");
  };

  return (
    <section style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Inscripción a torneo</h2>
      <Form onSubmit={enviar} noValidate>
        <Form.Group className="mb-3" controlId="insc-tipo">
          <Form.Label>Tipo de participante</Form.Label>
          <Form.Select name="tipo" defaultValue="equipo">
            <option value="equipo">Equipo</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="insc-torneo">
          <Form.Label>Torneo</Form.Label>
          <Form.Select name="torneo" required value={torneoId} onChange={alCambiar(setTorneoId)}
            isInvalid={tocado && !!resultado.torneo}>
            <option value="">Selecciona un torneo</option>
            {torneos.map((t) => <option key={t.id} value={t.id}>{t.nombre}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{resultado.torneo}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="insc-equipo">
          <Form.Label>Equipo</Form.Label>
          <Form.Select name="equipo" required value={equipoId} onChange={alCambiar(setEquipoId)}
            isInvalid={tocado && !!resultado.equipo}>
            <option value="">Selecciona un equipo</option>
            {equipos.map((eq) => <option key={eq.id} value={eq.id}>{eq.nombre}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{resultado.equipo}</Form.Control.Feedback>
        </Form.Group>

        {resultado.ok && (
          <Alert variant="info">Vas a inscribir a &quot;{equipo.nombre}&quot; en &quot;{torneo.nombre}&quot;.</Alert>
        )}

        <Button type="submit" variant="primary">Confirmar inscripción</Button>
        {confirmacion && <Alert variant="success" className="mt-3">{confirmacion}</Alert>}
      </Form>
    </section>
  );
}