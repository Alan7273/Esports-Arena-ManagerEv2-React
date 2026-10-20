import { formatearEstado, colorEstado, etiquetaPosicion, fechaHoy } from "./formato.js";

describe("formato", () => {
  it("formatearEstado reemplaza el guion bajo", () => {
    expect(formatearEstado("en_curso")).toBe("en curso");
  });

  it("colorEstado devuelve la variante de Bootstrap", () => {
    expect(colorEstado("abierto")).toBe("success");
    expect(colorEstado("en_curso")).toBe("warning");
    expect(colorEstado("finalizado")).toBe("secondary");
    expect(colorEstado("otro")).toBe("secondary");
  });

  it("etiquetaPosicion usa medallas en el podio", () => {
    expect(etiquetaPosicion(1)).toBe("🥇 1° lugar");
    expect(etiquetaPosicion(4)).toBe("4° lugar");
  });

  it("fechaHoy devuelve AAAA-MM-DD", () => {
    expect(fechaHoy()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});