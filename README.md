# eSports Arena Manager — Frontend React (EP2)

Aplicación web para gestionar torneos de eSports: ver torneos, filtrarlos, revisar su detalle, inscribir equipos, crear equipos y administrar el perfil de un jugador.

Es la migración del frontend de la **EP1** (HTML5 + CSS3 + JavaScript vanilla) a **React**, usando Vite como herramienta de desarrollo, Bootstrap para el diseño y Karma + Jasmine para las pruebas.

> Proyecto semestral — Desarrollo FullStack I — Evaluación Parcial 2 (EP2).
> No usa backend: los datos son simulados y viven en memoria mientras la página está abierta.

---

## Tecnologías

| Herramienta | Versión | Para qué se usa |
|---|---|---|
| Node.js + npm | 20 o superior | Entorno y gestor de paquetes |
| Vite | ^8.3.0 | Servidor de desarrollo y build |
| React / React DOM | ^19.2.8 | Interfaz de usuario |
| react-router-dom | ^7.18.4 | Navegación entre páginas (`BrowserRouter`) |
| Bootstrap | ^5.3.8 | Estilos y diseño responsive |
| react-bootstrap | ^2.10.10 | Componentes de Bootstrap para React |
| Karma | ^6.4.4 | Ejecuta las pruebas en el navegador |
| Jasmine (`jasmine-core`, `karma-jasmine`) | ^4.6.1 / ^5.1.0 | Framework de pruebas |
| karma-esbuild | ^2.3.0 | Compila JSX e imports para Karma |
| karma-chrome-launcher | ^3.2.0 | Abre Chrome para las pruebas |
| Oxlint | ^1.81.0 | Revisión de código (lint) |

---

## Requisitos previos

- **Node.js 20 o superior** y npm.
- **Google Chrome** instalado (lo necesita Karma para correr las pruebas).

---

## Instalación y uso

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

Abre `http://localhost:5173` en el navegador.

### Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la carpeta `dist/` para probar el build |
| `npm run lint` | Revisa el código con Oxlint |
| `npm test` | Corre las pruebas una vez (Karma + Jasmine, ChromeHeadless) |
| `npm run test:watch` | Corre las pruebas y se repite al guardar cambios |
| `npm run repaso` | Ejecuta `repaso-js/repaso.js` (requiere que esa carpeta exista) |

> **Importante:** en `package.json` los scripts de prueba deben indicar el archivo de configuración, porque Karma 6.4.4 no detecta solo los archivos `.cjs`:
>
> ```json
> "test": "karma start karma.conf.cjs",
> "test:watch": "karma start karma.conf.cjs --no-single-run --auto-watch"
> ```
>
> Sin eso, `npm test` arranca sin configuración (puerto 9876, sin navegador) y se queda pegado.

Si Karma no encuentra Chrome, define la ruta del ejecutable (ejemplo en PowerShell):

```powershell
$env:CHROME_BIN = "C:\Program Files\Google\Chrome\Application\chrome.exe"
npm test
```

---

## Rutas de la aplicación

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Inicio | Torneos destacados, próximos cierres de inscripción y video |
| `/torneos` | Torneos | Listado con filtros por juego, estado, nombre y rango de fechas |
| `/torneo` y `/torneo/:id` | Detalle de torneo | Participantes, calendario, tabla de posiciones y premios |
| `/inscripcion` | Inscripción | Inscribir un equipo en un torneo con validaciones |
| `/equipo` | Mi equipo | Crear un equipo y agregar integrantes |
| `/perfil` | Mi perfil | Datos del jugador, estadísticas, sanciones y edición de datos |
| cualquier otra | — | Redirige a `/` |

Si `/torneo` se abre sin `id`, se muestra el primer torneo.

---

## Estructura del proyecto

```
Esports-Arena-ManagerEv2-React/
├── index.html                 # Punto de entrada HTML (div#root)
├── package.json
├── vite.config.js
├── karma.conf.cjs             # Configuración de Karma (.cjs porque el proyecto es "type": "module")
├── .oxlintrc.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx               # BrowserRouter + DatosProvider + CSS de Bootstrap
    ├── App.jsx                # Definición de rutas
    ├── data/
    │   └── datos.js           # Datos simulados: juegos, jugadores, equipos, torneos
    ├── context/
    │   ├── DatosContext.js    # Contexto + hook useDatos()
    │   └── DatosProvider.jsx  # Estado compartido y acciones
    ├── components/
    │   ├── Layout.jsx         # Navbar, contenido (Outlet) y footer
    │   ├── TarjetaTorneo.jsx  # Tarjeta de un torneo
    │   └── BadgeEstado.jsx    # Etiqueta de color según el estado
    ├── pages/
    │   ├── Inicio.jsx
    │   ├── Torneos.jsx
    │   ├── TorneoDetalle.jsx
    │   ├── Inscripcion.jsx
    │   ├── Equipo.jsx
    │   └── Perfil.jsx
    ├── hooks/
    │   └── useTitulo.js       # Cambia el título de la pestaña por página
    └── utils/
        ├── formato.js         # Formateo de estados, fechas y posiciones
        ├── formato.spec.js    # Pruebas de formato
        ├── validaciones.js    # Validaciones puras de inscripción, equipo y perfil
        └── validaciones.spec.js
```

---

## Cómo funciona

### Estado compartido

`DatosProvider` guarda `jugadores`, `equipos` y `torneos` con `useState` y los entrega a toda la aplicación mediante el contexto. Cualquier componente los usa con:

```jsx
const { torneos, equipos, inscribirEquipo } = useDatos();
```

Acciones disponibles:

- `inscribirEquipo(torneoId, equipoId)`: agrega el equipo al torneo y suma un cupo ocupado.
- `crearEquipo({ nombre, juegoId, capitanId, integrantes })`: crea el equipo, agrega al capitán si falta y lo registra en cada jugador.
- `actualizarJugador(id, cambios)`: actualiza apodo y correo del jugador.
- `nombreJuego(id)` y `nombreParticipante(id)`: devuelven el nombre para mostrar.

Los datos se reinician al recargar la página (no hay persistencia).

### Validaciones (`src/utils/validaciones.js`)

Son funciones puras: reciben datos y devuelven mensajes de error, sin tocar el DOM. Por eso se pueden probar con Jasmine.

**Inscripción** — se rechaza si:
- No se eligió torneo o equipo.
- El torneo no está abierto, ya pasó la fecha de cierre, no tiene cupos o es individual.
- El equipo ya está inscrito, juega otro juego, no llega al mínimo de integrantes del juego, está inactivo o su capitán tiene una sanción vigente.

**Equipo** — el nombre es obligatorio y no puede repetirse (sin importar mayúsculas); el capitán es obligatorio.

**Perfil** — apodo de 3 a 15 caracteres sin espacios, correo con formato válido, edad entera entre 13 y 99, contraseña de al menos 8 caracteres y confirmación igual.

### Diseño

Todo el diseño usa Bootstrap y react-bootstrap (`Navbar`, `Card`, `Form`, `Table`, `Alert`, `Badge`, `ListGroup`, `Row/Col`). El menú se colapsa en pantallas pequeñas.

Los archivos de `src/style/` (si existen en tu copia) son restos de la plantilla de Vite y de la EP1: ningún archivo los importa, así que se pueden borrar.

---

## Pruebas

Las pruebas están en `src/utils/*.spec.js` y se ejecutan con:

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

### Lista de revisión manual

Con `npm run dev` y la consola del navegador abierta (F12), sin errores en rojo:

- **Menú:** cada enlace marca la sección activa; "Detalle de torneo" lleva a `/torneo/t1`.
- **Inicio:** se ven las tarjetas de torneos abiertos y en curso, la lista de cierres y el video.
- **Torneos:** los filtros funcionan; fechas invertidas muestran alerta; sin resultados muestra el aviso.
- **Detalle:** en `t1` se ve la fila del podio resaltada; en `t2` aparecen los mensajes de "aún no hay…".
- **Inscripción:** probar torneo cerrado, equipo ya inscrito, juego distinto, equipo inactivo y capitán sancionado.
- **Equipo:** guardar vacío, nombre repetido, agregar y quitar integrantes, guardar bien.
- **Perfil:** datos inválidos muestran errores por campo; datos correctos muestran el mensaje verde.
- **Persistencia entre páginas:** un equipo creado aparece luego en el selector de inscripción.

---

## Migración desde la EP1 (HTML) a React

| EP1 (HTML + JS) | EP2 (React) |
|---|---|
| `index.html` | `pages/Inicio.jsx` |
| `torneos.html` | `pages/Torneos.jsx` |
| `torneo-detalle.html?id=t1` | `pages/TorneoDetalle.jsx` en `/torneo/:id` |
| `inscripcion.html` | `pages/Inscripcion.jsx` |
| `equipo.html` | `pages/Equipo.jsx` |
| `perfil.html` | `pages/Perfil.jsx` |
| Encabezado y pie repetidos en cada HTML | `components/Layout.jsx` |
| `js/data.js` (arreglos globales mutables) | `data/datos.js` + `context/DatosProvider.jsx` |
| `js/app.js` (manipulación del DOM) | Componentes con `useState` y `utils/` |
| `css/estilos.css` | Bootstrap + react-bootstrap |

Mejoras respecto a la EP1:

- El estado se mantiene al navegar entre páginas (antes cada página recargaba los datos).
- Las validaciones están separadas de la interfaz y tienen pruebas automáticas.
- React escapa el texto, así que se elimina el riesgo de insertar HTML con `innerHTML`.
- Tras una inscripción exitosa el formulario se limpia.

---

## Solución de problemas

| Problema | Causa y solución |
|---|---|
| `Failed to resolve import "bootstrap/..."` o `react-bootstrap` | Faltan dependencias: `npm install` |
| `Failed to resolve import "./estilos.css"` | `main.jsx` no debe importar ese archivo; solo `bootstrap/dist/css/bootstrap.min.css` |
| Página en blanco | Abrir F12 → Console y revisar el error. Un caso típico es `DatosProvider.jsx` sin los tres `useState` |
| `npm test` queda pegado (puerto 9876, "No captured browser") | Usar `karma start karma.conf.cjs` en los scripts |
| `No binary for ChromeHeadless` | Instalar Chrome o definir `CHROME_BIN` |
| La inscripción siempre dice "plazo cerrado" | Las fechas del torneo `t1` en `datos.js` están en el pasado |

---

## Integrantes

_(Completar con los nombres del equipo.)_