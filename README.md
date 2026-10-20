# eSports Arena Manager (React)

Aplicación web para gestionar torneos de eSports: ver torneos, inscribir equipos, crear equipos y administrar el perfil de un jugador. Proyecto de **Evaluación Parcial 2**, desarrollado con **React + Vite**, **React Bootstrap** y pruebas unitarias con **Jasmine + Karma**.

> **Integrantes:** Alan Cubillos, Jorge Gonzalez, Martín Espinoza.
> **Asignatura / Sección:** Desarrollo Fullstack II - 003D.
> **Docente:** Cesar Alexander Carrasco Carre.

---

## Índice

1. [Descripción del proyecto](#1-descripción-del-proyecto)
2. [Tecnologías](#2-tecnologías)
3. [Instalación y ejecución](#3-instalación-y-ejecución)
4. [Diseño y estructura del proyecto](#4-diseño-y-estructura-del-proyecto-ie211--ie213)
5. [Componentes, propiedades y estados](#5-componentes-propiedades-y-estados-ie212--ie214)
6. [Diseño responsivo con Bootstrap](#6-diseño-responsivo-con-bootstrap)
7. [Pruebas unitarias](#7-pruebas-unitarias-ie221--ie222)
8. [Proceso de testeo](#8-proceso-de-testeo-ie231--ie232)
9. [Reglas de negocio](#9-reglas-de-negocio)
10. [Correspondencia con la rúbrica](#10-correspondencia-con-la-rúbrica)

---

## 1. Descripción del proyecto

**eSports Arena Manager** permite:

| Funcionalidad | Página | Ruta |
|---|---|---|
| Ver torneos destacados, próximos cierres y video de la última final | Inicio | `/` |
| Listar todos los torneos | Torneos | `/torneos` |
| Ver detalle de un torneo (participantes, calendario, posiciones, premios) | Detalle | `/torneo/:id` |
| Inscribir un equipo a un torneo con validaciones | Inscripción | `/inscripcion` |
| Crear un equipo con integrantes y roles | Mi equipo | `/equipo` |
| Ver y editar datos del jugador (estadísticas, equipos, sanciones) | Mi perfil | `/perfil` |

Los datos son simulados (archivo `src/data/datos.js`) y se mantienen en memoria mediante Context API; no hay backend.

## 2. Tecnologías

| Herramienta | Uso |
|---|---|
| React 19 | Librería de componentes |
| Vite 8 | Bundler y servidor de desarrollo |
| React Router DOM 7 | Navegación entre páginas (SPA) |
| Bootstrap 5 + React Bootstrap | Estilos y diseño responsivo |
| Jasmine 4 | Framework de pruebas (`describe`, `it`, `expect`) |
| Karma 6 + karma-chrome-launcher | Ejecutor de pruebas en Chrome |
| karma-esbuild | Transpila JSX/ES modules para Karma |
| Oxlint | Análisis estático (lint) |

## 3. Instalación y ejecución

**Requisitos:** Node.js 18 o superior y Google Chrome (lo usa Karma).

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar en modo desarrollo
npm run dev          # http://localhost:5173

# 3. Compilar para producción
npm run build
npm run preview

# 4. Ejecutar pruebas unitarias
npm test             # una sola vez (ChromeHeadless)
npm run test:watch   # queda escuchando cambios

# 5. Lint
npm run lint
```

## 4. Diseño y estructura del proyecto (IE2.1.1 / IE2.1.3)

El proyecto se diseñó como **SPA (Single Page Application)** con React. Se separan las responsabilidades en carpetas: páginas, componentes reutilizables, estado global, utilidades puras (lógica testeable) y datos.

```
Esports-Arena-ManagerEv2-React/
├── index.html
├── vite.config.js            # Configuración de Vite + plugin React
├── karma.conf.cjs            # Configuración de Karma + Jasmine + esbuild
├── package.json
└── src/
    ├── main.jsx              # Punto de entrada: BrowserRouter + DatosProvider + Bootstrap
    ├── App.jsx               # Definición de rutas
    ├── components/           # Componentes reutilizables
    │   ├── Layout.jsx        #   Navbar + <Outlet/> + footer
    │   ├── TarjetaTorneo.jsx #   Card de un torneo
    │   └── BadgeEstado.jsx   #   Badge de color según estado
    ├── pages/                # Una por ruta
    │   ├── Inicio.jsx
    │   ├── Torneos.jsx
    │   ├── TorneoDetalle.jsx
    │   ├── Inscripcion.jsx
    │   ├── Equipo.jsx
    │   └── Perfil.jsx
    ├── context/              # Estado global (Context API)
    │   ├── DatosContext.js   #   createContext + hook useDatos()
    │   └── DatosProvider.jsx #   Provider con useState y acciones
    ├── hooks/
    │   └── useTitulo.js      # Hook propio: cambia document.title
    ├── utils/                # Lógica pura, sin React (fácil de testear)
    │   ├── validaciones.js   #   validarInscripcion / validarEquipo / validarPerfil
    │   ├── validaciones.spec.js
    │   ├── formato.js        #   formatearEstado, colorEstado, etiquetaPosicion, fechaHoy
    │   └── formato.spec.js
    ├── data/
    │   └── datos.js          # Datos simulados: juegos, jugadores, equipos, torneos
    └── style/                # Hojas de estilo
```

### Arquitectura en capas

```
main.jsx
  └─ BrowserRouter            (rutas)
      └─ DatosProvider        (estado global: jugadores, equipos, torneos)
          └─ App → Layout → <Outlet/> → Página
                                          ├─ usa useDatos()   (leer/modificar estado)
                                          ├─ usa useTitulo()  (título de la pestaña)
                                          └─ usa utils/*      (validar y formatear)
```

### Decisiones de diseño

- **Lógica fuera de los componentes:** las validaciones y formatos están en `utils/` como funciones puras. Así se testean sin renderizar React.
- **Estado compartido con Context API:** evita pasar props por muchos niveles; `DatosProvider` expone los datos y las acciones (`inscribirEquipo`, `crearEquipo`, `actualizarJugador`).
- **Componentes reutilizables:** `TarjetaTorneo` y `BadgeEstado` se usan en varias páginas.
- **Hook personalizado:** `useTitulo` encapsula un `useEffect` reutilizable.
- **Accesibilidad:** secciones con `aria-labelledby`, `controlId` en cada campo de formulario y mensajes de error asociados.

## 5. Componentes, propiedades y estados (IE2.1.2 / IE2.1.4)

### Propiedades (props)

| Componente | Props | Descripción |
|---|---|---|
| `TarjetaTorneo` | `torneo` | Objeto torneo a mostrar; incluye botón a `/torneo/:id` |
| `BadgeEstado` | `estado`, `className` | Muestra el estado con color (`abierto` verde, `en_curso` amarillo, `finalizado` gris) |
| `DatosProvider` | `children` | Envuelve la app y entrega el contexto |

### Estados locales (`useState`)

| Página | Estados | Para qué sirven |
|---|---|---|
| `Inscripcion` | `torneoId`, `equipoId`, `tocado`, `confirmacion` | Selección del formulario, mostrar errores solo tras interactuar, mensaje de éxito |
| `Equipo` | `form`, `nuevo`, `integrantes`, `errores`, `confirmacion` | Datos del equipo, integrante en edición, lista de integrantes agregados |
| `Perfil` | `form`, `errores`, `confirmacion` | Formulario de edición con validación |

### Estado global (Context API)

`DatosProvider` mantiene `jugadores`, `equipos` y `torneos` con `useState` y entrega:

| Función | Efecto |
|---|---|
| `inscribirEquipo(torneoId, equipoId)` | Suma un cupo y agrega el equipo a `participantes` |
| `crearEquipo({...})` | Crea el equipo y lo asocia a sus jugadores |
| `actualizarJugador(id, cambios)` | Actualiza apodo/correo del jugador |
| `nombreJuego(id)` / `nombreParticipante(id)` | Helpers para mostrar nombres |

### Efectos y hooks

- `useEffect` (dentro de `useTitulo`) actualiza el título del documento cuando cambia el texto.
- `useParams` lee el `:id` del torneo en `TorneoDetalle`.
- `useLocation` marca el enlace activo del menú en `Layout`.

### Formularios controlados

Los campos están ligados al estado (`value` + `onChange`) y muestran errores con `isInvalid` y `Form.Control.Feedback` de React Bootstrap.

## 6. Diseño responsivo con Bootstrap

- **Navbar** con `expand="lg"`: se colapsa en un menú hamburguesa en pantallas pequeñas.
- **Grilla** (`Row` / `Col`) con breakpoints: las tarjetas de torneos pasan de 1 columna (móvil) a 2 (`md`) y 3 (`lg`) con `Row xs={1} md={2} lg={3}`.
- **Tablas** con `responsive` para scroll horizontal en móvil.
- **Video** embebido con `ratio ratio-16x9`.
- **Layout** con `min-vh-100` y `flex-grow-1` para dejar el footer siempre abajo.
- Componentes Bootstrap usados: `Navbar`, `Card`, `Badge`, `Button`, `Form`, `Alert`, `ListGroup`, `Table`, `Container`.

## 7. Pruebas

Las pruebas están en `src/utils/*.spec.js` y se ejecutan con Karma y Datos.js:

```bash
npm test
```

Karma las compila con esbuild y las corre en ChromeHeadless con Jasmine. Resultado esperado:

```
Executed 16 of 16 SUCCESS
```

Qué cubren:

- `formato.spec.js`: `formatearEstado`, `colorEstado`, `etiquetaPosicion`, `fechaHoy`.
- `validaciones.spec.js`: `validarInscripcion`, `validarEquipo`, `validarPerfil`.

> Las pruebas usan el torneo `t1` de `datos.js`. Para que pasen, su `fechaCierreInscripcion` debe ser posterior a `2026-10-13` (por ejemplo `2026-11-20`).


### `src/utils/formato.spec.js` (4 pruebas)

| # | Prueba | Verifica |
|---|---|---|
| 1 | `formatearEstado` reemplaza el guion bajo | `"en_curso"` → `"en curso"` |
| 2 | `colorEstado` devuelve variante de Bootstrap | Los 3 estados y un valor desconocido |
| 3 | `etiquetaPosicion` usa medallas | Podio con medalla, resto con número |
| 4 | `fechaHoy` devuelve `AAAA-MM-DD` | Formato mediante expresión regular |

### `src/utils/validaciones.spec.js` (12 pruebas)

| # | Grupo | Prueba | Verifica |
|---|---|---|---|
| 5 | `validarInscripcion` | Exige torneo y equipo | Mensajes de selección obligatoria |
| 6 | `validarInscripcion` | Torneo no abierto | Rechaza `en_curso` / `finalizado` |
| 7 | `validarInscripcion` | Torneo individual | No admite equipos |
| 8 | `validarInscripcion` | Fuera de plazo | Rechaza si `hoy` > fecha de cierre |
| 9 | `validarInscripcion` | Equipo ya inscrito / pocos integrantes | Duplicados y mínimo de integrantes |
| 10 | `validarInscripcion` | Otro juego, inactivo y capitán sancionado | Múltiples errores simultáneos |
| 11 | `validarInscripcion` | Inscripción válida | `ok === true` |
| 12 | `validarEquipo` | Exige nombre y capitán | Campos obligatorios |
| 13 | `validarEquipo` | Nombre repetido (sin distinguir mayúsculas) | Unicidad |
| 14 | `validarEquipo` | Datos válidos | `ok === true` |
| 15 | `validarPerfil` | Datos válidos | `ok === true` |
| 16 | `validarPerfil` | Apodo, correo, edad y contraseñas | Cada regla de validación |

**Total: 16 pruebas** (la rúbrica exige 10 como mínimo).

### Aporte a la calidad del código

- Cubren las **reglas de negocio críticas** (quién puede inscribirse y en qué condiciones).
- Detectan regresiones al modificar validaciones.
- Documentan el comportamiento esperado con ejemplos ejecutables.
- Cubren casos felices y casos de error (borde).

## 8. Proceso de testeo (IE2.3.1 / IE2.3.2)

### Entorno configurado

`karma.conf.cjs` (usa `.cjs` porque `package.json` tiene `"type": "module"`):

| Opción | Valor | Motivo |
|---|---|---|
| `frameworks` | `['jasmine']` | Aporta `describe`, `it`, `expect` y espías |
| `files` | `src/**/*.spec.js*` como módulos | Carga solo los archivos de prueba |
| `preprocessors` | `esbuild` | Traduce JSX y resuelve los `import` |
| `browsers` | `ChromeHeadless` | Corre sin ventana (sirve en servidores/CI) |
| `singleRun` | `true` | Ejecuta una vez y termina |
| `reporters` | `progress` | Resultados en la terminal |

### Flujo de testeo

```
Escribir *.spec.js → npm test → Karma abre ChromeHeadless
   → esbuild compila los specs → Jasmine ejecuta → reporte (OK / FAILED)
```

### Conceptos aplicados

| Concepto | Explicación | Dónde se ve |
|---|---|---|
| **Prueba unitaria** | Verifica una unidad aislada (una función) | Funciones de `utils/` |
| **Suite (`describe`)** | Agrupa pruebas relacionadas | `describe("validarEquipo", ...)` |
| **Spec (`it`)** | Un caso de prueba | Cada `it(...)` |
| **Matcher** | Comparación del resultado | `toBe`, `toContain`, `toBeTrue`, `toBeFalse`, `toMatch` |
| **Arrange / Act / Assert** | Preparar datos, ejecutar, verificar | Cada spec |
| **Función pura** | Mismo input → mismo output, sin efectos | Por eso `utils/` es fácil de testear |
| **Fixtures** | Datos de entrada reutilizables | `datos.js` importado en los specs |
| **Casos borde** | Valores límite o inválidos | Edad 12, apodo con espacios, plazo vencido |

### Mocks y espías

Jasmine permite simular dependencias con `spyOn(...)` y `jasmine.createSpy(...)`. En este proyecto la lógica probada es pura y recibe sus datos por parámetro (se pasan objetos simulados desde `datos.js` o creados en la prueba, como `equipoValido`). Para probar funciones con dependencias externas, por ejemplo `fechaHoy`, se puede usar `jasmine.clock().mockDate(new Date(2026, 9, 19))` para fijar la fecha.

### Análisis de resultados y cobertura

- Resultado esperado de `npm test`: `Executed 16 of 16 SUCCESS`.
- Para medir **cobertura** se puede agregar `karma-coverage` y el reporter `coverage` a `karma.conf.cjs`, y revisar el porcentaje de líneas y ramas de `utils/`.

## 9. Reglas de negocio

### Inscripción a torneo

Un equipo puede inscribirse si se cumple **todo** lo siguiente:

- El torneo está en estado `abierto` y la fecha de hoy no supera `fechaCierreInscripcion`.
- El torneo tiene cupos disponibles y es de modalidad `Equipos`.
- El equipo no está ya inscrito, está activo y juega el mismo juego del torneo.
- El equipo tiene al menos los integrantes mínimos que exige el juego (Valorant: 5, LoL: 5, Rocket League: 3).
- El capitán del equipo no tiene una sanción vigente.

### Creación de equipo

- Nombre obligatorio y único (sin distinguir mayúsculas).
- Capitán obligatorio. Si el capitán no está en la lista, se agrega automáticamente.
- No se puede repetir un jugador en la lista de integrantes.

### Perfil

- Apodo: sin espacios, entre 3 y 15 caracteres.
- Correo con formato válido.
- Edad: entero entre 13 y 99.
- Contraseña de mínimo 8 caracteres y confirmación idéntica.
