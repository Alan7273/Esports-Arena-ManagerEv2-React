import { ListGroup, Row } from "react-bootstrap";
import { useDatos } from "../context/DatosContext.js";
import { useTitulo } from "../hooks/useTitulo.js";
import TarjetaTorneo from "../components/TarjetaTorneo.jsx";

export default function Inicio() {
  const { torneos } = useDatos();
  useTitulo("Inicio");

  const destacados = torneos.filter((t) => t.estado === "abierto" || t.estado === "en_curso");
  const cierres = torneos
    .filter((t) => t.estado === "abierto")
    .sort((a, b) => new Date(a.fechaCierreInscripcion) - new Date(b.fechaCierreInscripcion));

  return (
    <>
      <section aria-labelledby="titulo-destacados" className="mb-5">
        <h1 id="titulo-destacados" className="mb-4">Torneos destacados</h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          {destacados.map((t) => <TarjetaTorneo key={t.id} torneo={t} />)}
        </Row>
      </section>

      <section aria-labelledby="titulo-cierres" className="mb-5">
        <h2 id="titulo-cierres" className="h4 mb-3">Próximos cierres de inscripción</h2>
        <ListGroup as="ul">
          {cierres.map((t) => (
            <ListGroup.Item as="li" key={t.id}>
              {t.nombre} - cierra el {t.fechaCierreInscripcion}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </section>

      <section aria-labelledby="titulo-video">
        <h2 id="titulo-video" className="h4 mb-3">Final de la última temporada</h2>
        <div className="ratio ratio-16x9">
          <video controls>
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            Tu navegador no soporta video embebido.
          </video>
        </div>
      </section>
    </>
  );
}