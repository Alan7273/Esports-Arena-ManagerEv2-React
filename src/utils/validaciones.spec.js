import { validarInscripcion, validarEquipo, validarPerfil } from "./validaciones.js";
import { juegos, jugadores, equipos, torneos } from "../data/datos.js";

describe("validarInscripcion", () => {
  const hoy = "2026-10-13";
  const [t1, t2, t3] = torneos;
  const [e1, e2] = equipos;

  it("exige seleccionar torneo y equipo", () => {
    const r = validarInscripcion({ torneo: undefined, equipo: undefined, juegos, jugadores, hoy });
    expect(r.torneo).toContain("Selecciona un torneo");
    expect(r.equipo).toContain("Selecciona un equipo");
    expect(r.ok).toBeFalse();
  });

  it("rechaza torneos que no están abiertos", () => {
    const r = validarInscripcion({ torneo: t2, equipo: e1, juegos, jugadores, hoy });
    expect(r.torneo).toContain("no está abierto");
  });

  it("rechaza torneos individuales", () => {
    const r = validarInscripcion({ torneo: t3, equipo: e1, juegos, jugadores, hoy });
    expect(r.torneo).toContain("individual");
  });

  it("rechaza inscripciones fuera de plazo", () => {
    const r = validarInscripcion({ torneo: t1, equipo: e1, juegos, jugadores, hoy: "2026-12-01" });
    expect(r.torneo).toContain("ya cerró");
  });

  it("rechaza equipo ya inscrito, con pocos integrantes", () => {
    const r = validarInscripcion({ torneo: t1, equipo: e1, juegos, jugadores, hoy });
    expect(r.equipo).toContain("ya está inscrito");
    expect(r.equipo).toContain("mínimo 5");
  });

  it("rechaza equipo de otro juego, inactivo y con capitán sancionado", () => {
    const r = validarInscripcion({ torneo: t1, equipo: e2, juegos, jugadores, hoy });
    expect(r.equipo).toContain("Rocket League");
    expect(r.equipo).toContain("inactivo");
    expect(r.equipo).toContain("sanción vigente");
    expect(r.ok).toBeFalse();
  });

  it("acepta una inscripción válida", () => {
    const equipoValido = {
      id: "e9", nombre: "Nuevo", juegoId: "g1", capitanId: "j2", activo: true,
      integrantes: [1, 2, 3, 4, 5].map((n) => ({ jugadorId: "j" + n, rol: "Jugador" })),
    };
    const r = validarInscripcion({ torneo: t1, equipo: equipoValido, juegos, jugadores, hoy });
    expect(r.ok).toBeTrue();
  });
});

describe("validarEquipo", () => {
  it("exige nombre y capitán", () => {
    const r = validarEquipo({ nombre: "", capitanId: "", equipos });
    expect(r.nombre).toContain("obligatorio");
    expect(r.capitan).toContain("capitán");
    expect(r.ok).toBeFalse();
  });

  it("rechaza nombres repetidos sin importar mayúsculas", () => {
    const r = validarEquipo({ nombre: "los halcones", capitanId: "j1", equipos });
    expect(r.nombre).toContain("Ya existe");
  });

  it("acepta datos válidos", () => {
    expect(validarEquipo({ nombre: "Otro", capitanId: "j1", equipos }).ok).toBeTrue();
  });
});

describe("validarPerfil", () => {
  const base = { apodo: "shadow99", email: "a@b.cl", edad: "20", pass: "12345678", pass2: "12345678" };

  it("acepta datos válidos", () => {
    expect(validarPerfil(base).ok).toBeTrue();
  });

  it("valida apodo, correo, edad y contraseñas", () => {
    expect(validarPerfil({ ...base, apodo: "a b" }).apodo).toContain("espacios");
    expect(validarPerfil({ ...base, apodo: "ab" }).apodo).toContain("entre 3 y 15");
    expect(validarPerfil({ ...base, email: "malo" }).email).toContain("inválido");
    expect(validarPerfil({ ...base, edad: "12" }).edad).toContain("entre 13 y 99");
    expect(validarPerfil({ ...base, pass: "123", pass2: "123" }).password).toContain("8 caracteres");
    expect(validarPerfil({ ...base, pass2: "otra" }).password2).toContain("no coinciden");
  });
});