import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import useApi from "../hooks/useApi.js";
import { listarTorneos } from "../services/torneos.js";
import { listarEquipos } from "../services/equipos.js";
import { crearInscripcion } from "../services/inscripciones.js";
import EstadoCarga from "../components/EstadoCarga.jsx";
import { useTitulo } from "../hooks/useTitulo.js";

export default function Inscripcion() {
  const { datos, cargando, error } = useApi(
    () => Promise.all([listarTorneos(), listarEquipos()])
  );
  const [torneos = [], equipos = []] = datos ?? [];
  useTitulo("Inscripción");

  const [torneoId, setTorneoId] = useState("");
  const [equipoId, setEquipoId] = useState("");
  const [errorForm, setErrorForm] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [enviando, setEnviando] = useState(false);

  const alCambiar = (setter) => (e) => {
    setter(e.target.value);
    setErrorForm("");
    setConfirmacion("");
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (!torneoId || !equipoId) {
      setErrorForm("Selecciona un torneo y un equipo.");
      return;
    }
    setEnviando(true);
    try {
      const equipo = equipos.find((x) => String(x.id) === equipoId);
      await crearInscripcion({ torneoId, equipo });
      setConfirmacion("Inscripción registrada correctamente.");
      setTorneoId("");
      setEquipoId("");
    } catch (err) {
      setErrorForm(err.message);   // el backend explica: cupo lleno, torneo cerrado, sanción activa...
    } finally {
      setEnviando(false);
    }
  };

  if (cargando || error) return <EstadoCarga cargando={cargando} error={error} />;

  return (
    <section style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Inscripción a torneo</h2>
      <Form onSubmit={enviar} noValidate>
        <Form.Group className="mb-3" controlId="insc-torneo">
          <Form.Label>Torneo</Form.Label>
          <Form.Select value={torneoId} onChange={alCambiar(setTorneoId)}>
            <option value="">Selecciona un torneo</option>
            {torneos.map((t) => <option key={t.id} value={t.id}>{t.nombre}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="insc-equipo">
          <Form.Label>Equipo</Form.Label>
          <Form.Select value={equipoId} onChange={alCambiar(setEquipoId)}>
            <option value="">Selecciona un equipo</option>
            {equipos.map((eq) => <option key={eq.id} value={eq.id}>{eq.nombre}</option>)}
          </Form.Select>
        </Form.Group>

        {errorForm && <Alert variant="danger">{errorForm}</Alert>}
        <Button type="submit" variant="primary" disabled={enviando}>
          {enviando ? "Enviando..." : "Confirmar inscripción"}
        </Button>
        {confirmacion && <Alert variant="success" className="mt-3">{confirmacion}</Alert>}
      </Form>
    </section>
  );
}