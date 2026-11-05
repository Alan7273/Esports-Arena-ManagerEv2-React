export const juegos = [
    {id: "g1", nombre: "Valorant", minIntegrantes: 5},
    {id: "g2", nombre: "League of Legends", minIntegrantes: 5},
    {id: "g3", nombre: "Rocket League", minIntegrantes: 3}
];

export const jugadores = [
    // ----  Los halcones (e1) ----
    { id: "j1", apodo: "shadow99", nombre: "Diego Rojas", email: "diego@mail.com", equipos: ["e1"], estadisticas: { victorias: 12, derrotas: 4 }, sanciones: [{ motivo: "Insultos en chat", vigente: false }] },
    { id: "j2", apodo: "nova_x", nombre: "Camila Soto", email: "camila@mail.com",  equipos: ["e1"], estadisticas: { victorias: 8, derrotas: 6 }, sanciones: [] },
    { id: "j4", apodo: "vexa", nombre: "Valentina Rivas", email: "valentina@mail.com", equipos: ["e1"], estadisticas: { victorias: 7, derrotas: 5 }, sanciones: [] },
    { id: "j5", apodo: "ryuzen", nombre: "Matías Fuentes", email: "matias@mail.com", equipos: ["e1"], estadisticas: { victorias: 9, derrotas: 7 }, sanciones: [] },
    { id: "j6", apodo: "lunaris", nombre: "Javiera Pinto", email: "javiera@mail.com", equipos: ["e1"], estadisticas: { victorias: 5, derrotas: 5 }, sanciones: [] },

    // ---- Team Fenix (e2) ----
    { id: "j3", apodo: "kriz", nombre: "Bastián Muñoz", email: "bastian@mail.com", equipos: ["e2"], estadisticas: { victorias: 3, derrotas: 9 }, sanciones: [{ motivo: "Abandono reiterado", vigente: true }] },

    // ---- Neon Wolves (e3) ----
    { id: "j7", apodo: "wolfgang", nombre: "Tomás Araya", email: "tomas@mail.com", equipos: ["e3"], estadisticas: { victorias: 10, derrotas: 6 }, sanciones: [] },
    { id: "j8", apodo: "zeta", nombre: "Francisca Lagos", email: "francisca@mail.com", equipos: ["e3"], estadisticas: { victorias: 6, derrotas: 4 }, sanciones: [] },
    { id: "j9", apodo: "kairo", nombre: "Nicolás Vega", email: "nicolas@mail.com", equipos: ["e3"], estadisticas: { victorias: 4, derrotas: 8 }, sanciones: [] },
    { id: "j10", apodo: "pixel", nombre: "Constanza Mora", email: "constanza@mail.com", equipos: ["e3"], estadisticas: { victorias: 8, derrotas: 3 }, sanciones: [] },
    { id: "j11", apodo: "drako", nombre: "Felipe Núñez", email: "felipe@mail.com", equipos: ["e3"], estadisticas: { victorias: 2, derrotas: 6 }, sanciones: [] },

    // ---- Crimson Vipers (e4) ----
    { id: "j12", apodo: "viper01", nombre: "Ignacio Reyes", email: "ignacio@mail.com", equipos: ["e4"], estadisticas: { victorias: 9, derrotas: 4 }, sanciones: [] },
    { id: "j13", apodo: "sofi_x", nombre: "Sofía Cárdenas", email: "sofia@mail.com", equipos: ["e4"], estadisticas: { victorias: 7, derrotas: 5 }, sanciones: [] },
    { id: "j14", apodo: "benja", nombre: "Benjamín Toro", email: "benjamin@mail.com", equipos: ["e4"], estadisticas: { victorias: 5, derrotas: 6 }, sanciones: [] },
    { id: "j15", apodo: "anto", nombre: "Antonia Fuentes", email: "antonia@mail.com", equipos: ["e4"], estadisticas: { victorias: 8, derrotas: 3 }, sanciones: [] },
    { id: "j16", apodo: "joaco", nombre: "Joaquín Parra", email: "joaquin@mail.com", equipos: ["e4"], estadisticas: { victorias: 6, derrotas: 6 }, sanciones: [] },

    // ---- Silent Ravens (e5) ----
    { id: "j17", apodo: "raven", nombre: "Martina Salas", email: "martina@mail.com", equipos: ["e5"], estadisticas: { victorias: 11, derrotas: 5 }, sanciones: [] },
    { id: "j18", apodo: "seba", nombre: "Sebastián Díaz", email: "sebastian@mail.com", equipos: ["e5"], estadisticas: { victorias: 4, derrotas: 7 }, sanciones: [] },
    { id: "j19", apodo: "isi", nombre: "Isidora Vera", email: "isidora@mail.com", equipos: ["e5"], estadisticas: { victorias: 7, derrotas: 4 }, sanciones: [] },
    { id: "j20", apodo: "cris", nombre: "Cristóbal León", email: "cristobal@mail.com", equipos: ["e5"], estadisticas: { victorias: 6, derrotas: 5 }, sanciones: [] },
    { id: "j21", apodo: "fer", nombre: "Fernanda Ibarra", email: "fernanda@mail.com", equipos: ["e5"], estadisticas: { victorias: 5, derrotas: 5 }, sanciones: [] },

    // ---- Iron Titans (e6) ----
    { id: "j22", apodo: "titan", nombre: "Agustín Castro", email: "agustin@mail.com", equipos: ["e6"], estadisticas: { victorias: 10, derrotas: 2 }, sanciones: [] },
    { id: "j23", apodo: "cata", nombre: "Catalina Bravo", email: "catalina@mail.com", equipos: ["e6"], estadisticas: { victorias: 8, derrotas: 6 }, sanciones: [] },
    { id: "j24", apodo: "vicho", nombre: "Vicente Rojas", email: "vicente@mail.com", equipos: ["e6"], estadisticas: { victorias: 3, derrotas: 8 }, sanciones: [] },
    { id: "j25", apodo: "emi", nombre: "Emilia Tapia", email: "emilia@mail.com", equipos: ["e6"], estadisticas: { victorias: 6, derrotas: 4 }, sanciones: [] },
    { id: "j26", apodo: "rod", nombre: "Rodrigo Silva", email: "rodrigo@mail.com", equipos: ["e6"], estadisticas: { victorias: 7, derrotas: 7 }, sanciones: [] },

    // ---- Pixel Pirates (e7) ----
    { id: "j27", apodo: "pirata", nombre: "Maite Campos", email: "maite@mail.com", equipos: ["e7"], estadisticas: { victorias: 5, derrotas: 3 }, sanciones: [] },
    { id: "j28", apodo: "lucas", nombre: "Lucas Herrera", email: "lucas@mail.com", equipos: ["e7"], estadisticas: { victorias: 9, derrotas: 6 }, sanciones: [] },
    { id: "j29", apodo: "paula", nombre: "Paula Navarro", email: "paula@mail.com", equipos: ["e7"], estadisticas: { victorias: 4, derrotas: 4 }, sanciones: [] },
    { id: "j30", apodo: "gabo", nombre: "Gabriel Soto", email: "gabriel@mail.com", equipos: ["e7"], estadisticas: { victorias: 6, derrotas: 5 }, sanciones: [] },
    { id: "j31", apodo: "dani", nombre: "Daniela Pizarro", email: "daniela@mail.com", equipos: ["e7"], estadisticas: { victorias: 7, derrotas: 2 }, sanciones: [] },

    // ---- Dragon Guard (e8) - LoL ----
    { id: "j32", apodo: "dragon", nombre: "Esteban Molina", email: "esteban@mail.com", equipos: ["e8"], estadisticas: { victorias: 14, derrotas: 6 }, sanciones: [] },
    { id: "j33", apodo: "caro", nombre: "Carolina Ortiz", email: "carolina@mail.com", equipos: ["e8"], estadisticas: { victorias: 10, derrotas: 8 }, sanciones: [] },
    { id: "j34", apodo: "andy", nombre: "Andrés Cortés", email: "andres@mail.com", equipos: ["e8"], estadisticas: { victorias: 9, derrotas: 9 }, sanciones: [] },
    { id: "j35", apodo: "trini", nombre: "Trinidad Ramos", email: "trinidad@mail.com", equipos: ["e8"], estadisticas: { victorias: 12, derrotas: 5 }, sanciones: [] },
    { id: "j36", apodo: "pablo", nombre: "Pablo Guzmán", email: "pablo@mail.com", equipos: ["e8"], estadisticas: { victorias: 8, derrotas: 7 }, sanciones: [] },

    // ---- Nexus Raiders (e9) - LoL ----
    { id: "j37", apodo: "nexus", nombre: "Renata Vidal", email: "renata@mail.com", equipos: ["e9"], estadisticas: { victorias: 6, derrotas: 10 }, sanciones: [] },
    { id: "j38", apodo: "marce", nombre: "Marcelo Espinoza", email: "marcelo@mail.com", equipos: ["e9"], estadisticas: { victorias: 7, derrotas: 9 }, sanciones: [] },
    { id: "j39", apodo: "flo", nombre: "Florencia Reyes", email: "florencia@mail.com", equipos: ["e9"], estadisticas: { victorias: 5, derrotas: 8 }, sanciones: [] },
    { id: "j40", apodo: "hugo", nombre: "Hugo Carrasco", email: "hugo@mail.com", equipos: ["e9"], estadisticas: { victorias: 8, derrotas: 8 }, sanciones: [] },
    { id: "j41", apodo: "bele", nombre: "Belén Sandoval", email: "belen@mail.com", equipos: ["e9"], estadisticas: { victorias: 4, derrotas: 6 }, sanciones: [] },

    // ---- Baron Hunters (e10) - LoL ----
    { id: "j42", apodo: "baron", nombre: "Matías Lara", email: "matias.lara@mail.com", equipos: ["e10"], estadisticas: { victorias: 13, derrotas: 5 }, sanciones: [] },
    { id: "j43", apodo: "javi", nombre: "Javier Peña", email: "javier@mail.com", equipos: ["e10"], estadisticas: { victorias: 9, derrotas: 6 }, sanciones: [] },
    { id: "j44", apodo: "ami", nombre: "Amanda Silva", email: "amanda@mail.com", equipos: ["e10"], estadisticas: { victorias: 11, derrotas: 7 }, sanciones: [] },
    { id: "j45", apodo: "dcon", nombre: "Diego Contreras", email: "diego.c@mail.com", equipos: ["e10"], estadisticas: { victorias: 7, derrotas: 7 }, sanciones: [] },
    { id: "j46", apodo: "ambar", nombre: "Ámbar Figueroa", email: "ambar@mail.com", equipos: ["e10"], estadisticas: { victorias: 10, derrotas: 4 }, sanciones: [] },

    // ---- Void Walkers (e11) ----
    { id: "j47", apodo: "voidx", nombre: "Gonzalo Ibáñez", email: "gonzalo@mail.com", equipos: ["e11"], estadisticas: { victorias: 8, derrotas: 6 }, sanciones: [] },
    { id: "j48", apodo: "mica", nombre: "Micaela Fernández", email: "micaela@mail.com", equipos: ["e11"], estadisticas: { victorias: 6, derrotas: 7 }, sanciones: [] },
    { id: "j49", apodo: "oscar", nombre: "Óscar Tapia", email: "oscar@mail.com", equipos: ["e11"], estadisticas: { victorias: 5, derrotas: 9 }, sanciones: [] },
    { id: "j50", apodo: "lau", nombre: "Laura Mena", email: "laura@mail.com", equipos: ["e11"], estadisticas: { victorias: 7, derrotas: 5 }, sanciones: [] },
    { id: "j51", apodo: "nacho", nombre: "Ignacio Bustos", email: "ignacio.b@mail.com", equipos: ["e11"], estadisticas: { victorias: 4, derrotas: 6 }, sanciones: [] },

    // ---- Storm Breakers (e12) ----
    { id: "j52", apodo: "storm", nombre: "Raúl Cifuentes", email: "raul@mail.com", equipos: ["e12"], estadisticas: { victorias: 9, derrotas: 8 }, sanciones: [] },
    { id: "j53", apodo: "vale_r", nombre: "Valeria Henríquez", email: "valeria@mail.com", equipos: ["e12"], estadisticas: { victorias: 7, derrotas: 7 }, sanciones: [] },
    { id: "j54", apodo: "kevo", nombre: "Kevin Aravena", email: "kevin@mail.com", equipos: ["e12"], estadisticas: { victorias: 6, derrotas: 9 }, sanciones: [] },
    { id: "j55", apodo: "pame", nombre: "Pamela Godoy", email: "pamela@mail.com", equipos: ["e12"], estadisticas: { victorias: 8, derrotas: 5 }, sanciones: [] },
    { id: "j56", apodo: "mauro", nombre: "Mauricio Leiva", email: "mauricio@mail.com", equipos: ["e12"], estadisticas: { victorias: 5, derrotas: 8 }, sanciones: [] },

    // ---- Arcane Order (e13) ----
    { id: "j57", apodo: "arcano", nombre: "Álvaro Jara", email: "alvaro@mail.com", equipos: ["e13"], estadisticas: { victorias: 12, derrotas: 6 }, sanciones: [] },
    { id: "j58", apodo: "nico_s", nombre: "Nicole Salinas", email: "nicole@mail.com", equipos: ["e13"], estadisticas: { victorias: 9, derrotas: 7 }, sanciones: [] },
    { id: "j59", apodo: "lalo", nombre: "Eduardo Rubio", email: "eduardo@mail.com", equipos: ["e13"], estadisticas: { victorias: 7, derrotas: 6 }, sanciones: [] },
    { id: "j60", apodo: "jaz", nombre: "Jazmín Olivares", email: "jazmin@mail.com", equipos: ["e13"], estadisticas: { victorias: 10, derrotas: 8 }, sanciones: [] },
    { id: "j61", apodo: "tato", nombre: "Cristian Moya", email: "cristian@mail.com", equipos: ["e13"], estadisticas: { victorias: 6, derrotas: 5 }, sanciones: [] },

    // ---- Night Owls (e14) ----
    { id: "j62", apodo: "owl", nombre: "Patricio Vargas", email: "patricio@mail.com", equipos: ["e14"], estadisticas: { victorias: 11, derrotas: 4 }, sanciones: [] },
    { id: "j63", apodo: "male", nombre: "Macarena Soto", email: "macarena@mail.com", equipos: ["e14"], estadisticas: { victorias: 8, derrotas: 6 }, sanciones: [] },
    { id: "j64", apodo: "rafa", nombre: "Rafael Cornejo", email: "rafael@mail.com", equipos: ["e14"], estadisticas: { victorias: 9, derrotas: 5 }, sanciones: [] },
    { id: "j65", apodo: "dani_m", nombre: "Daniel Meza", email: "daniel@mail.com", equipos: ["e14"], estadisticas: { victorias: 7, derrotas: 7 }, sanciones: [] },
    { id: "j66", apodo: "kari", nombre: "Karina Ávila", email: "karina@mail.com", equipos: ["e14"], estadisticas: { victorias: 10, derrotas: 3 }, sanciones: [] },

    // ---- Blue Phoenix (e15) ----
    { id: "j67", apodo: "phoenix", nombre: "Hernán Quiroz", email: "hernan@mail.com", equipos: ["e15"], estadisticas: { victorias: 6, derrotas: 9 }, sanciones: [] },
    { id: "j68", apodo: "yeni", nombre: "Yenifer Bahamondes", email: "yenifer@mail.com", equipos: ["e15"], estadisticas: { victorias: 5, derrotas: 7 }, sanciones: [] },
    { id: "j69", apodo: "ale", nombre: "Alejandro Pardo", email: "alejandro@mail.com", equipos: ["e15"], estadisticas: { victorias: 7, derrotas: 8 }, sanciones: [] },
    { id: "j70", apodo: "giuli", nombre: "Giuliana Franco", email: "giuliana@mail.com", equipos: ["e15"], estadisticas: { victorias: 4, derrotas: 6 }, sanciones: [] },
    { id: "j71", apodo: "mati_b", nombre: "Matías Bórquez", email: "matias.b@mail.com", equipos: ["e15"], estadisticas: { victorias: 8, derrotas: 9 }, sanciones: [] },

    // ---- Frost Legion (e16) ----
    { id: "j72", apodo: "frost", nombre: "Sergio Paredes", email: "sergio@mail.com", equipos: ["e16"], estadisticas: { victorias: 10, derrotas: 7 }, sanciones: [] },
    { id: "j73", apodo: "nati", nombre: "Natalia Cabrera", email: "natalia@mail.com", equipos: ["e16"], estadisticas: { victorias: 9, derrotas: 6 }, sanciones: [] },
    { id: "j74", apodo: "ivan", nombre: "Iván Cáceres", email: "ivan@mail.com", equipos: ["e16"], estadisticas: { victorias: 7, derrotas: 5 }, sanciones: [] },
    { id: "j75", apodo: "romi", nombre: "Romina Escobar", email: "romina@mail.com", equipos: ["e16"], estadisticas: { victorias: 8, derrotas: 8 }, sanciones: [] },
    { id: "j76", apodo: "chris", nombre: "Christopher Muñoz", email: "christopher@mail.com", equipos: ["e16"], estadisticas: { victorias: 6, derrotas: 4 }, sanciones: [] },

    // ---- Rift Kings (e17) ----
    { id: "j77", apodo: "rey", nombre: "Leonardo Acuña", email: "leonardo@mail.com", equipos: ["e17"], estadisticas: { victorias: 5, derrotas: 10 }, sanciones: [] },
    { id: "j78", apodo: "fran_o", nombre: "Francisco Ortega", email: "francisco@mail.com", equipos: ["e17"], estadisticas: { victorias: 6, derrotas: 8 }, sanciones: [] },
    { id: "j79", apodo: "anita", nombre: "Ana Maldonado", email: "ana@mail.com", equipos: ["e17"], estadisticas: { victorias: 7, derrotas: 9 }, sanciones: [] },
    { id: "j80", apodo: "pepe", nombre: "José Salazar", email: "jose@mail.com", equipos: ["e17"], estadisticas: { victorias: 4, derrotas: 7 }, sanciones: [] },
    { id: "j81", apodo: "vero", nombre: "Verónica Lagos", email: "veronica@mail.com", equipos: ["e17"], estadisticas: { victorias: 5, derrotas: 6 }, sanciones: [] }
];

export const equipos = [
    { id: "e1", nombre: "Los Halcones", juegoId: "g1", capitanId: "j1", activo: true,
        integrantes: [
            { jugadorId: "j1", rol: "Capitán" },
            { jugadorId: "j2", rol: "Duelista" },
            { jugadorId: "j4", rol: "Controlador" },
            { jugadorId: "j5", rol: "Centinela" },
            { jugadorId: "j6", rol: "Iniciador" }
        ] },
    { id: "e2", nombre: "Team Fenix", juegoId: "g3", capitanId: "j3", activo: false,
        integrantes: [{ jugadorId: "j3", rol: "Capitán" }] },
    { id: "e3", nombre: "Neon Wolves", juegoId: "g1", capitanId: "j7", activo: true,
        integrantes: [
            { jugadorId: "j7", rol: "Capitán" },
            { jugadorId: "j8", rol: "Duelista" },
            { jugadorId: "j9", rol: "Iniciador" },
            { jugadorId: "j10", rol: "Centinela" },
            { jugadorId: "j11", rol: "Controlador" }
        ] },
    { id: "e4", nombre: "Crimson Vipers", juegoId: "g1", capitanId: "j12", activo: true,
        integrantes: [
            { jugadorId: "j12", rol: "Capitán" },
            { jugadorId: "j13", rol: "Duelista" },
            { jugadorId: "j14", rol: "Controlador" },
            { jugadorId: "j15", rol: "Centinela" },
            { jugadorId: "j16", rol: "Iniciador" }
        ] },
    { id: "e5", nombre: "Silent Ravens", juegoId: "g1", capitanId: "j17", activo: true,
        integrantes: [
            { jugadorId: "j17", rol: "Capitán" },
            { jugadorId: "j18", rol: "Duelista" },
            { jugadorId: "j19", rol: "Controlador" },
            { jugadorId: "j20", rol: "Centinela" },
            { jugadorId: "j21", rol: "Iniciador" }
        ] },
    { id: "e6", nombre: "Iron Titans", juegoId: "g1", capitanId: "j22", activo: true,
        integrantes: [
            { jugadorId: "j22", rol: "Capitán" },
            { jugadorId: "j23", rol: "Duelista" },
            { jugadorId: "j24", rol: "Controlador" },
            { jugadorId: "j25", rol: "Centinela" },
            { jugadorId: "j26", rol: "Iniciador" }
        ] },
    { id: "e7", nombre: "Pixel Pirates", juegoId: "g1", capitanId: "j27", activo: true,
        integrantes: [
            { jugadorId: "j27", rol: "Capitán" },
            { jugadorId: "j28", rol: "Duelista" },
            { jugadorId: "j29", rol: "Controlador" },
            { jugadorId: "j30", rol: "Centinela" },
            { jugadorId: "j31", rol: "Iniciador" }
        ] },
    { id: "e8", nombre: "Dragon Guard", juegoId: "g2", capitanId: "j32", activo: true,
        integrantes: [
            { jugadorId: "j32", rol: "Capitán" },
            { jugadorId: "j33", rol: "Jungla" },
            { jugadorId: "j34", rol: "Mid" },
            { jugadorId: "j35", rol: "ADC" },
            { jugadorId: "j36", rol: "Soporte" }
        ] },
    { id: "e9", nombre: "Nexus Raiders", juegoId: "g2", capitanId: "j37", activo: true,
        integrantes: [
            { jugadorId: "j37", rol: "Capitán" },
            { jugadorId: "j38", rol: "Jungla" },
            { jugadorId: "j39", rol: "Mid" },
            { jugadorId: "j40", rol: "ADC" },
            { jugadorId: "j41", rol: "Soporte" }
        ] },
    { id: "e10", nombre: "Baron Hunters", juegoId: "g2", capitanId: "j42", activo: true,
        integrantes: [
            { jugadorId: "j42", rol: "Capitán" },
            { jugadorId: "j43", rol: "Jungla" },
            { jugadorId: "j44", rol: "Mid" },
            { jugadorId: "j45", rol: "ADC" },
            { jugadorId: "j46", rol: "Soporte" }
        ] },
    { id: "e11", nombre: "Void Walkers", juegoId: "g2", capitanId: "j47", activo: true,
        integrantes: [
            { jugadorId: "j47", rol: "Capitán" }, { jugadorId: "j48", rol: "Jungla" },
            { jugadorId: "j49", rol: "Mid" }, { jugadorId: "j50", rol: "ADC" }, { jugadorId: "j51", rol: "Soporte" }
        ] },
    { id: "e12", nombre: "Storm Breakers", juegoId: "g2", capitanId: "j52", activo: true,
        integrantes: [
            { jugadorId: "j52", rol: "Capitán" }, { jugadorId: "j53", rol: "Jungla" },
            { jugadorId: "j54", rol: "Mid" }, { jugadorId: "j55", rol: "ADC" }, { jugadorId: "j56", rol: "Soporte" }
        ] },
    { id: "e13", nombre: "Arcane Order", juegoId: "g2", capitanId: "j57", activo: true,
        integrantes: [
            { jugadorId: "j57", rol: "Capitán" }, { jugadorId: "j58", rol: "Jungla" },
            { jugadorId: "j59", rol: "Mid" }, { jugadorId: "j60", rol: "ADC" }, { jugadorId: "j61", rol: "Soporte" }
        ] },
    { id: "e14", nombre: "Night Owls", juegoId: "g2", capitanId: "j62", activo: true,
        integrantes: [
            { jugadorId: "j62", rol: "Capitán" }, { jugadorId: "j63", rol: "Jungla" },
            { jugadorId: "j64", rol: "Mid" }, { jugadorId: "j65", rol: "ADC" }, { jugadorId: "j66", rol: "Soporte" }
        ] },
    { id: "e15", nombre: "Blue Phoenix", juegoId: "g2", capitanId: "j67", activo: true,
        integrantes: [
            { jugadorId: "j67", rol: "Capitán" }, { jugadorId: "j68", rol: "Jungla" },
            { jugadorId: "j69", rol: "Mid" }, { jugadorId: "j70", rol: "ADC" }, { jugadorId: "j71", rol: "Soporte" }
        ] },
    { id: "e16", nombre: "Frost Legion", juegoId: "g2", capitanId: "j72", activo: true,
        integrantes: [
            { jugadorId: "j72", rol: "Capitán" }, { jugadorId: "j73", rol: "Jungla" },
            { jugadorId: "j74", rol: "Mid" }, { jugadorId: "j75", rol: "ADC" }, { jugadorId: "j76", rol: "Soporte" }
        ] },
    { id: "e17", nombre: "Rift Kings", juegoId: "g2", capitanId: "j77", activo: true,
        integrantes: [
            { jugadorId: "j77", rol: "Capitán" }, { jugadorId: "j78", rol: "Jungla" },
            { jugadorId: "j79", rol: "Mid" }, { jugadorId: "j80", rol: "ADC" }, { jugadorId: "j81", rol: "Soporte" }
        ] }
];

export const torneos = [
    {
        id: "t1", nombre: "Copa Apertura Valorant", juegoId: "g1", estado: "abierto",
        modalidad: "Equipos", cupoOcupado: 6, cupoMax: 16,
        fechaCierreInscripcion: "2026-11-20", fechaInicio: "2026-11-25",
        participantes: ["e1", "e3", "e4", "e5", "e6", "e7"],
        partidas: [
            { id: "p1", ronda: 1, equipos: ["e1", "e3"], fecha: "2026-11-25 18:00", estado: "programada", resultado: null },
            { id: "p2", ronda: 1, equipos: ["e4", "e5"], fecha: "2026-11-25 19:00", estado: "programada", resultado: null },
            { id: "p3", ronda: 1, equipos: ["e6", "e7"], fecha: "2026-11-25 20:00", estado: "programada", resultado: null }
        ],
        posiciones: [],
        premios: [{ posicion: 1, premio: "$200.000 + trofeo" }, { posicion: 2, premio: "$80.000" }]
    },
    {
        id: "t2", nombre: "Liga LoL Otoño", juegoId: "g2", estado: "en_curso",
        modalidad: "Equipos", cupoOcupado: 10, cupoMax: 10,
        fechaCierreInscripcion: "2026-08-15", fechaInicio: "2026-08-20",
        participantes: ["e8", "e9", "e10", "e11", "e12", "e13", "e14", "e15", "e16", "e17"],
        partidas: [
            { id: "p4", ronda: 1, equipos: ["e8", "e9"], fecha: "2026-08-20 18:00", estado: "finalizada", resultado: { ganadorId: "e8", marcador: "2-0" } },
            { id: "p5", ronda: 1, equipos: ["e10", "e11"], fecha: "2026-08-20 19:00", estado: "finalizada", resultado: { ganadorId: "e10", marcador: "2-1" } },
            { id: "p6", ronda: 1, equipos: ["e12", "e13"], fecha: "2026-08-20 20:00", estado: "finalizada", resultado: { ganadorId: "e13", marcador: "2-0" } },
            { id: "p7", ronda: 1, equipos: ["e14", "e15"], fecha: "2026-08-21 18:00", estado: "finalizada", resultado: { ganadorId: "e14", marcador: "2-1" } },
            { id: "p8", ronda: 1, equipos: ["e16", "e17"], fecha: "2026-08-21 19:00", estado: "finalizada", resultado: { ganadorId: "e16", marcador: "2-0" } },
            { id: "p9", ronda: 2, equipos: ["e8", "e10"], fecha: "2026-09-10 18:00", estado: "finalizada", resultado: { ganadorId: "e8", marcador: "2-1" } },
            { id: "p10", ronda: 2, equipos: ["e13", "e14"], fecha: "2026-09-10 19:00", estado: "finalizada", resultado: { ganadorId: "e14", marcador: "2-0" } },
            { id: "p11", ronda: 2, equipos: ["e16", "e9"], fecha: "2026-11-12 18:00", estado: "programada", resultado: null },
            { id: "p12", ronda: 2, equipos: ["e11", "e12"], fecha: "2026-11-12 19:00", estado: "programada", resultado: null },
            { id: "p13", ronda: 2, equipos: ["e15", "e17"], fecha: "2026-11-12 20:00", estado: "programada", resultado: null }
        ],
        posiciones: [
            { participanteId: "e8", puntos: 6, pos: 1 },
            { participanteId: "e14", puntos: 6, pos: 2 },
            { participanteId: "e10", puntos: 3, pos: 3 },
            { participanteId: "e13", puntos: 3, pos: 4 },
            { participanteId: "e16", puntos: 3, pos: 5 },
            { participanteId: "e9", puntos: 0, pos: 6 },
            { participanteId: "e11", puntos: 0, pos: 7 },
            { participanteId: "e12", puntos: 0, pos: 8 },
            { participanteId: "e15", puntos: 0, pos: 9 },
            { participanteId: "e17", puntos: 0, pos: 10 }
        ],
        premios: [{ posicion: 1, premio: "Beca gaming" }]
    },
        {
        id: "t3", nombre: "1v1 Rocket League", juegoId: "g3", estado: "finalizado",
        modalidad: "Individual", cupoOcupado: 32, cupoMax: 32,
        fechaCierreInscripcion: "2026-07-01", fechaInicio: "2026-07-05",
        participantes: [
            "j1", "j2", "j4", "j5", "j6", "j7", "j8", "j9", "j10", "j11", "j12",
            "j13", "j14", "j15", "j16", "j17", "j18", "j19", "j20", "j21", "j22",
            "j23", "j24", "j25", "j26", "j27", "j28", "j29", "j30", "j31", "j32", "j33"
        ],
        partidas: [
            { id: "p14", ronda: 1, equipos: ["j1", "j2"], fecha: "2026-07-05 10:00", estado: "finalizada", resultado: { ganadorId: "j1", marcador: "3-1" } },
            { id: "p15", ronda: 1, equipos: ["j4", "j5"], fecha: "2026-07-05 11:00", estado: "finalizada", resultado: { ganadorId: "j5", marcador: "3-2" } },
            { id: "p16", ronda: 1, equipos: ["j6", "j7"], fecha: "2026-07-05 12:00", estado: "finalizada", resultado: { ganadorId: "j7", marcador: "3-0" } },
            { id: "p17", ronda: 1, equipos: ["j8", "j9"], fecha: "2026-07-05 13:00", estado: "finalizada", resultado: { ganadorId: "j8", marcador: "3-1" } },
            { id: "p18", ronda: 1, equipos: ["j10", "j11"], fecha: "2026-07-05 14:00", estado: "finalizada", resultado: { ganadorId: "j10", marcador: "3-2" } },
            { id: "p19", ronda: 1, equipos: ["j12", "j13"], fecha: "2026-07-05 15:00", estado: "finalizada", resultado: { ganadorId: "j13", marcador: "3-1" } },
            { id: "p20", ronda: 1, equipos: ["j14", "j15"], fecha: "2026-07-05 16:00", estado: "finalizada", resultado: { ganadorId: "j14", marcador: "3-0" } },
            { id: "p21", ronda: 1, equipos: ["j16", "j17"], fecha: "2026-07-05 17:00", estado: "finalizada", resultado: { ganadorId: "j17", marcador: "3-2" } },
            { id: "p22", ronda: 1, equipos: ["j18", "j19"], fecha: "2026-07-06 10:00", estado: "finalizada", resultado: { ganadorId: "j18", marcador: "3-1" } },
            { id: "p23", ronda: 1, equipos: ["j20", "j21"], fecha: "2026-07-06 11:00", estado: "finalizada", resultado: { ganadorId: "j21", marcador: "3-2" } },
            { id: "p24", ronda: 1, equipos: ["j22", "j23"], fecha: "2026-07-06 12:00", estado: "finalizada", resultado: { ganadorId: "j22", marcador: "3-0" } },
            { id: "p25", ronda: 1, equipos: ["j24", "j25"], fecha: "2026-07-06 13:00", estado: "finalizada", resultado: { ganadorId: "j25", marcador: "3-1" } },
            { id: "p26", ronda: 1, equipos: ["j26", "j27"], fecha: "2026-07-06 14:00", estado: "finalizada", resultado: { ganadorId: "j26", marcador: "3-2" } },
            { id: "p27", ronda: 1, equipos: ["j28", "j29"], fecha: "2026-07-06 15:00", estado: "finalizada", resultado: { ganadorId: "j29", marcador: "3-1" } },
            { id: "p28", ronda: 1, equipos: ["j30", "j31"], fecha: "2026-07-06 16:00", estado: "finalizada", resultado: { ganadorId: "j30", marcador: "3-0" } },
            { id: "p29", ronda: 1, equipos: ["j32", "j33"], fecha: "2026-07-06 17:00", estado: "finalizada", resultado: { ganadorId: "j33", marcador: "3-2" } },
            { id: "p30", ronda: 2, equipos: ["j1", "j5"], fecha: "2026-07-07 10:00", estado: "finalizada", resultado: { ganadorId: "j1", marcador: "3-1" } },
            { id: "p31", ronda: 2, equipos: ["j7", "j8"], fecha: "2026-07-07 11:00", estado: "finalizada", resultado: { ganadorId: "j7", marcador: "3-2" } },
            { id: "p32", ronda: 2, equipos: ["j10", "j13"], fecha: "2026-07-07 12:00", estado: "finalizada", resultado: { ganadorId: "j13", marcador: "3-0" } },
            { id: "p33", ronda: 2, equipos: ["j14", "j17"], fecha: "2026-07-07 13:00", estado: "finalizada", resultado: { ganadorId: "j14", marcador: "3-1" } },
            { id: "p34", ronda: 2, equipos: ["j18", "j21"], fecha: "2026-07-07 14:00", estado: "finalizada", resultado: { ganadorId: "j21", marcador: "3-2" } },
            { id: "p35", ronda: 2, equipos: ["j22", "j25"], fecha: "2026-07-07 15:00", estado: "finalizada", resultado: { ganadorId: "j22", marcador: "3-0" } },
            { id: "p36", ronda: 2, equipos: ["j26", "j29"], fecha: "2026-07-07 16:00", estado: "finalizada", resultado: { ganadorId: "j29", marcador: "3-1" } },
            { id: "p37", ronda: 2, equipos: ["j30", "j33"], fecha: "2026-07-07 17:00", estado: "finalizada", resultado: { ganadorId: "j30", marcador: "3-2" } },
            { id: "p38", ronda: 3, equipos: ["j1", "j7"], fecha: "2026-07-08 16:00", estado: "finalizada", resultado: { ganadorId: "j1", marcador: "3-1" } },
            { id: "p39", ronda: 3, equipos: ["j13", "j14"], fecha: "2026-07-08 17:00", estado: "finalizada", resultado: { ganadorId: "j14", marcador: "3-2" } },
            { id: "p40", ronda: 3, equipos: ["j21", "j22"], fecha: "2026-07-08 18:00", estado: "finalizada", resultado: { ganadorId: "j21", marcador: "3-0" } },
            { id: "p41", ronda: 3, equipos: ["j29", "j30"], fecha: "2026-07-08 19:00", estado: "finalizada", resultado: { ganadorId: "j30", marcador: "3-1" } },
            { id: "p42", ronda: 4, equipos: ["j1", "j14"], fecha: "2026-07-09 18:00", estado: "finalizada", resultado: { ganadorId: "j1", marcador: "3-2" } },
            { id: "p43", ronda: 4, equipos: ["j21", "j30"], fecha: "2026-07-09 19:00", estado: "finalizada", resultado: { ganadorId: "j30", marcador: "3-1" } },
            { id: "p44", ronda: 5, equipos: ["j1", "j30"], fecha: "2026-07-10 19:00", estado: "finalizada", resultado: { ganadorId: "j1", marcador: "4-3" } }
        ],
        posiciones: [
            { participanteId: "j1", puntos: 15, pos: 1 },
            { participanteId: "j30", puntos: 12, pos: 2 },
            { participanteId: "j14", puntos: 9, pos: 3 },
            { participanteId: "j21", puntos: 9, pos: 4 },
            { participanteId: "j7", puntos: 6, pos: 5 },
            { participanteId: "j13", puntos: 6, pos: 6 },
            { participanteId: "j22", puntos: 6, pos: 7 },
            { participanteId: "j29", puntos: 6, pos: 8 },
            { participanteId: "j5", puntos: 3, pos: 9 },
            { participanteId: "j8", puntos: 3, pos: 10 },
            { participanteId: "j10", puntos: 3, pos: 11 },
            { participanteId: "j17", puntos: 3, pos: 12 },
            { participanteId: "j18", puntos: 3, pos: 13 },
            { participanteId: "j25", puntos: 3, pos: 14 },
            { participanteId: "j26", puntos: 3, pos: 15 },
            { participanteId: "j33", puntos: 3, pos: 16 },
            { participanteId: "j2", puntos: 0, pos: 17 },
            { participanteId: "j4", puntos: 0, pos: 18 },
            { participanteId: "j6", puntos: 0, pos: 19 },
            { participanteId: "j9", puntos: 0, pos: 20 },
            { participanteId: "j11", puntos: 0, pos: 21 },
            { participanteId: "j12", puntos: 0, pos: 22 },
            { participanteId: "j15", puntos: 0, pos: 23 },
            { participanteId: "j16", puntos: 0, pos: 24 },
            { participanteId: "j19", puntos: 0, pos: 25 },
            { participanteId: "j20", puntos: 0, pos: 26 },
            { participanteId: "j23", puntos: 0, pos: 27 },
            { participanteId: "j24", puntos: 0, pos: 28 },
            { participanteId: "j27", puntos: 0, pos: 29 },
            { participanteId: "j28", puntos: 0, pos: 30 },
            { participanteId: "j31", puntos: 0, pos: 31 },
            { participanteId: "j32", puntos: 0, pos: 32 }
        ],
        premios: [{ posicion: 1, premio: "Mouse gamer" }],
    },
];