import { Link } from "react-router-dom";
import { Alert, Button, ListGroup } from "react-bootstrap";
import useApi from "../hooks/useApi.js";
import useAuth from "../hooks/useAuth.js";
import { listarTorneos, listarPremios, listarRanking, conCupos } from "../services/torneos.js";
import { listarJuegos } from "../services/juegos.js";
import { listarInscripciones } from "../services/inscripciones.js";
import EstadoCarga from "../components/EstadoCarga.jsx";
import { useTitulo } from "../hooks/useTitulo.js";
import { etiquetaPosicion } from "../utils/formato.js";

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function fechaCorta(iso) {
  const [anio, mes, dia] = iso.split("T")[0].split("-");
  return `${Number(dia)} ${MESES[Number(mes) - 1]} ${anio}`;
}

const PASOS = [
  { titulo: "Forma tu equipo", texto: "Suma integrantes y asigna roles." },
  { titulo: "Reserva tu lugar", texto: "Inscríbete en un torneo abierto." },
  { titulo: "Sube al podio", texto: "Sigue el calendario y la tabla de posiciones." },
];

const SIN_DATOS = { juegos: [], torneos: [], premios: [], inscripciones: [], posiciones: [], destacado: null };

export default function Inicio() {
  useTitulo("Inicio");
  const { usuario } = useAuth();

  // Los datos salen del backend (el gateway exige sesión para leerlos)
  const { datos, cargando, error } = useApi(async () => {
    if (!usuario) return SIN_DATOS;
    const [torneosApi, juegos, inscripciones, premios] = await Promise.all([
      listarTorneos(), listarJuegos(), listarInscripciones(), listarPremios(),
    ]);
    const torneos = conCupos(torneosApi, juegos, inscripciones);
    const destacado = torneos.find((t) => t.estado === "abierto")
      ?? torneos.find((t) => t.estado === "en_curso") ?? torneos[0] ?? null;
    const posiciones = destacado ? await listarRanking(destacado.id).catch(() => []) : [];
    return { juegos, torneos, premios, inscripciones, posiciones, destacado };
  }, [usuario?.username]);

  if (cargando) return <EstadoCarga cargando />;
  const { juegos, torneos, premios, inscripciones, posiciones, destacado } = datos ?? SIN_DATOS;

  // En torneos individuales el participante es un jugador; en los demás, un equipo
  const nombreParticipante = (id) =>
    inscripciones.find((i) => i.torneoId === destacado?.id
      && (destacado.modalidad === "Individual" ? i.usuarioId : i.equipoId) === id)
      ?.nombreJugador ?? `#${id}`;

  const cierres = torneos
    .filter((t) => t.estado === "abierto")
    .sort((a, b) => new Date(a.fechaCierreInscripcion) - new Date(b.fechaCierreInscripcion));
  const libres = destacado ? destacado.cupoMax - destacado.cupoOcupado : 0;
  const lugares = destacado
    ? Array.from({ length: destacado.cupoMax }, (_, i) => i < destacado.cupoOcupado) : [];
  const premiosTorneo = destacado
    ? premios.filter((p) => p.torneoId === destacado.id).sort((a, b) => a.posicion - b.posicion) : [];
  const lider = posiciones.slice().sort((a, b) => a.pos - b.pos)[0];
  const [monto, ...extra] = (premiosTorneo[0]?.premio ?? "").split(" + ");

  return (
    <div className="ln-pagina">
      {!usuario && (
        <Alert variant="info" className="m-0 rounded-0 text-center">
          <Link to="/login">Inicia sesión</Link> para ver los torneos, cupos y premios.
        </Alert>
      )}
      {error && <Alert variant="danger" className="m-0 rounded-0 text-center">{error}</Alert>}
      <section className="ln-hero" aria-labelledby="titulo-hero">
        <svg className="ln-hex" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <g fill="none" strokeWidth=".25">
            <path d="M50 4l40 23v46L50 96 10 73V27z" stroke="#9146FF" />
            <path d="M50 14l31 18v36L50 86 19 68V32z" stroke="#4A3F6B" />
            <path d="M50 24l22 13v26L50 76 28 63V37z" stroke="#9146FF" />
          </g>
        </svg>

        <div className="ln-wrap ln-hero-grid">
          <div>
            <p className="ln-eyebrow">Temporada 2026 · Cupos limitados</p>
            <h1 id="titulo-hero" className="ln-titulo">
              Entra a<br />la <span>arena.</span>
            </h1>
            <p className="ln-suave ln-lead">
              {destacado
                ? `Solo ${destacado.cupoMax} ${destacado.modalidad === "Individual" ? "jugadores compiten" : "equipos compiten"} en la ${destacado.nombre}. Asegura tu lugar.`
                : "Forma tu equipo, inscríbete y compite por el podio."}
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Button as={Link} to="/torneos" variant="primary" className="ln-btn">Ver torneos</Button>
              <Button as={Link} to="/equipo" variant="outline-light" className="ln-btn">Crear mi equipo</Button>
            </div>
          </div>

          {destacado && (
          <aside className="ln-tarjeta ln-tarjeta-destacada" aria-label={`Lugares en ${destacado.nombre}`}>
            <div className="d-flex justify-content-between align-items-baseline gap-2">
              <span className="ln-eyebrow">{destacado.nombre}</span>
              <span className="ln-suave small">{destacado.cupoOcupado} de {destacado.cupoMax} lugares</span>
            </div>
            <ol className="ln-lugares" aria-label="Lugares del torneo">
              {lugares.map((ocupado, i) => (
                <li key={i} className={ocupado ? "ocupado" : ""}>
                  <span className="visually-hidden">{ocupado ? "Ocupado" : "Libre"}: </span>
                  {String(i + 1).padStart(2, "0")}
                </li>
              ))}
            </ol>
            <div className="ln-tarjeta-pie">
              <div>
                <div className="ln-suave small">Comienza</div>
                <div className="ln-fecha">{fechaCorta(destacado.fechaInicio)}</div>
              </div>
              <span className="ln-pill">● {libres} cupos libres</span>
            </div>
          </aside>
          )}
        </div>
      </section>

      {juegos.length > 0 && (
      <ul className="ln-wrap ln-franja" aria-label="Juegos disponibles">
        {juegos.map((j, i) => (
          <li key={j.id}>{i > 0 && <span aria-hidden="true">◆ </span>}{j.nombre}</li>
        ))}
      </ul>
      )}

      {destacado && premiosTorneo.length > 0 && (
      <section className="ln-wrap ln-sec" aria-labelledby="titulo-premios">
        <p className="ln-eyebrow">Premios</p>
        <h2 id="titulo-premios">Lo que está en juego</h2>
        <div className="ln-grid ln-grid-premios">
          <div className="ln-tarjeta ln-tarjeta-grande">
            <div className="ln-suave">1.er puesto · {destacado.nombre}</div>
            <div className="ln-monto">{monto}</div>
            {extra.length > 0 && <div className="ln-extra">+ {extra.join(" + ")}</div>}
          </div>
          <div className="d-grid gap-4">
            {premiosTorneo[1] && (
              <div className="ln-tarjeta">
                <div className="ln-suave small">{premiosTorneo[1].posicion}.º puesto</div>
                <div className="ln-valor">{premiosTorneo[1].premio}</div>
              </div>
            )}
            {lider && (
              <div className="ln-tarjeta">
                <div className="ln-suave small">Líder actual</div>
                <div className="ln-valor">{etiquetaPosicion(lider.pos)} · {nombreParticipante(lider.participanteId)} · {lider.puntos} pts</div>
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      <section className="ln-wrap ln-sec" aria-labelledby="titulo-pasos">
        <p className="ln-eyebrow">Tu camino</p>
        <h2 id="titulo-pasos">Tres pasos para competir</h2>
        <ol className="ln-grid ln-grid-3 ln-pasos">
          {PASOS.map((p, i) => (
            <li key={p.titulo}>
              <span className="ln-numero" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.titulo}</h3>
              <p className="ln-suave mb-0">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {juegos.length > 0 && (
      <section className="ln-wrap ln-sec" aria-labelledby="titulo-juegos">
        <p className="ln-eyebrow">Juegos</p>
        <h2 id="titulo-juegos">Elige tu campo de batalla</h2>
        <div className="ln-grid ln-grid-3">
          {juegos.map((j) => (
            <div key={j.id} className="ln-tarjeta">
              <h3>{j.nombre}</h3>
              <p className="ln-suave mb-0">Equipos de mínimo {j.minIntegrantes} integrantes</p>
            </div>
          ))}
        </div>
      </section>
      )}

      {usuario && !error && (
      <section className="ln-wrap ln-sec" aria-labelledby="titulo-cierres">
        <p className="ln-eyebrow">Agenda</p>
        <h2 id="titulo-cierres">Próximos cierres de inscripción</h2>
        <ListGroup as="ul" className="mt-4">
          {cierres.length
            ? cierres.map((t) => (
                <ListGroup.Item as="li" key={t.id}>{t.nombre} - cierra el {t.fechaCierreInscripcion}</ListGroup.Item>
              ))
            : <ListGroup.Item as="li">No hay inscripciones abiertas por ahora.</ListGroup.Item>}
        </ListGroup>
      </section>
      )}

      <section className="ln-wrap ln-sec" aria-labelledby="titulo-video">
        <p className="ln-eyebrow">Replay</p>
        <h2 id="titulo-video" className="mb-4">Final de la última temporada</h2>
        <div className="ratio ratio-16x9 ln-video">
          <video controls>
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            Tu navegador no soporta video embebido.
          </video>
        </div>
      </section>

      <section className="ln-wrap ln-sec ln-final" aria-labelledby="titulo-final">
        <div className="ln-tarjeta ln-tarjeta-destacada text-center">
          <p className="ln-eyebrow">{destacado ? `Quedan ${libres} lugares` : "Temporada 2026"}</p>
          <h2 id="titulo-final" className="ln-final-titulo">La arena te espera</h2>
          <Button as={Link} to="/inscripcion" variant="primary" className="ln-btn">Inscribir mi equipo</Button>
        </div>
      </section>
    </div>
  );
}
