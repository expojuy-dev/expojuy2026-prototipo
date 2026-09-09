// ─────────────────────────────────────────────────────────────
// ExpoJuy 2026 — Datos del evento (contenido editorial)
// ─────────────────────────────────────────────────────────────

export const EVENT = {
  name: "ExpoJuy 2026",
  slogan: "Conectando Países — Creando Oportunidades",
  startDate: "2026-10-09T10:00:00-03:00",
  endDate: "2026-10-12T20:00:00-03:00",
  venue: "Predio Ferial Ciudad Cultural",
  address: "Av. Teherán s/n, Ciudad Cultural, San Salvador de Jujuy",
  province: "Jujuy, Argentina",
  email: "info@expojuy.com.ar",
  pressEmail: "prensa@expojuy.com.ar",
  phone: "+54 388 422-1000",
  whatsapp: "+54 388 400-2026",
  daysLabel: "9 al 12 de octubre",
  schedule: "Vie a Lun de 10 a 22 hs",
} as const;

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/expojuy", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/expojuy", icon: "facebook" },
  { label: "LinkedIn", href: "https://linkedin.com/company/expojuy", icon: "linkedin" },
  { label: "X / Twitter", href: "https://x.com/expojuy", icon: "twitter" },
  { label: "YouTube", href: "https://youtube.com/@expojuy", icon: "youtube" },
] as const;

// ── Valores / pilares ────────────────────────────────────────
export const VALUES = [
  {
    icon: "lightbulb",
    title: "Innovación",
    description:
      "Un espacio que impulsa ideas disruptivas y nuevos modelos productivos para transformar la matriz del Norte Argentino.",
    color: "turquoise",
  },
  {
    icon: "monitor",
    title: "Tecnología",
    description:
      "Inteligencia artificial, automatización, agrotech y soluciones digitales de vanguardia en un solo predio.",
    color: "blue",
  },
  {
    icon: "factory",
    title: "Producción",
    description:
      "La vitrina más grande de la industria jujeña y del NOA: minería, agroindustria, tabaco, textil y metalmecánica.",
    color: "violet",
  },
  {
    icon: "trending-up",
    title: "Desarrollo",
    description:
      "Generamos oportunidades concretas de crecimiento económico, empleo y exportación para empresas y PyMEs.",
    color: "turquoise",
  },
  {
    icon: "handshake",
    title: "Vinculación Empresarial",
    description:
      "Rondas de negocios B2B con compradores internacionales de Bolivia, Chile, Perú, Brasil y más allá.",
    color: "violet",
  },
  {
    icon: "brain",
    title: "Economía del Conocimiento",
    description:
      "Software, servicios profesionales, industrias culturales y creativas: el futuro del trabajo se exhibe aquí.",
    color: "blue",
  },
] as const;

export const STATS = [
  { value: 300, suffix: "+", label: "Expositores", icon: "store" },
  { value: 100000, suffix: "+", label: "Visitantes esperados", icon: "users" },
  { value: 10, suffix: "", label: "Días de evento", icon: "calendar" },
  { value: 15, suffix: "+", label: "Rubros representados", icon: "layout-grid" },
] as const;

// ── Categorías de expositores ────────────────────────────────
export const CATEGORIES = [
  "Todos",
  "Tecnología & IA",
  "Minería & Litio",
  "Agroindustria",
  "Comercio Exterior",
  "Energías Renovables",
  "Turismo",
  "Institucional",
  "Gastronomía",
] as const;

export type Exhibitor = {
  id: string;
  name: string;
  category: string;
  stand: string;
  zone: ZoneId;
  description: string;
  initials: string;
  gradient: string;
  country?: string;
  featured?: boolean;
  /** Foto del stand (solo expositores destacados) — se muestra en el dialog de perfil */
  image?: string;
};

export const EXHIBITORS: Exhibitor[] = [
  { id: "litica", name: "Litica Andes S.A.", category: "Minería & Litio", stand: "Pabellón B · Stand 04", zone: "industria", description: "Extracción y procesamiento de litio con estándares ESG. Presenta su nueva planta de carbonato en Salinas Grandes.", initials: "LA", gradient: "from-violet-500 to-violet-brand", featured: true, image: "/images/exhib-litica.png" },
  { id: "andinatech", name: "AndinaTech Solutions", category: "Tecnología & IA", stand: "Pabellón A · Stand 12", zone: "tecnologia", description: "Software factory jujeña especializada en IA aplicada a agroindustria y trazabilidad exportable.", initials: "AT", gradient: "from-teal-400 to-turquoise", featured: true, image: "/images/exhib-andinatech.png" },
  { id: "quebrada-exp", name: "Quebrada Exporta", category: "Comercio Exterior", stand: "Pabellón C · Stand 02", zone: "internacional", description: "Consorcio exportador de productos regionales con despacho a 12 países. Asesoría integral de comercio exterior.", initials: "QE", gradient: "from-sky-400 to-blue-bright", featured: true, image: "/images/exhib-quebrada.png" },
  { id: "solarnorte", name: "Solar Norte S.A.", category: "Energías Renovables", stand: "Pabellón B · Stand 22", zone: "industria", description: "Parques solares fotovoltaicos y soluciones de autoabastecimiento para PyMEs del NOA.", initials: "SN", gradient: "from-amber-400 to-orange-500", image: "/images/exhib-solarnorte.png" },
  { id: "agrovalle", name: "AgroValle Foods", category: "Agroindustria", stand: "Pabellón B · Stand 08", zone: "industria", description: "Productor de legumbres, granos y harinas sin TACC con certificación orgánica para exportación.", initials: "AF", gradient: "from-lime-500 to-green-600", image: "/images/exhib-agrovalle.png" },
  { id: "turismo-humahuaca", name: "Turismo Quebrada de Humahuaca", category: "Turismo", stand: "Pabellón D · Stand 15", zone: "gastro", description: "Paquetes turísticos patrimoniales por la Quebrada, Iruya y las Yungas con comunidades locales.", initials: "QH", gradient: "from-rose-400 to-pink-600", image: "/images/exhib-turismo-humahuaca.png" },
  { id: "banco-norte", name: "Banco Norte", category: "Institucional", stand: "Pabellón C · Stand 01", zone: "internacional", description: "Líneas de crédito para exportación, leasing industrial y fondeo PyME con tasas subsidiadas.", initials: "BN", gradient: "from-indigo-400 to-indigo-600", image: "/images/exhib-banco-norte.png" },
  { id: "sabor-jujeno", name: "Sabor Jujeño", category: "Gastronomía", stand: "Pabellón D · Stand 03", zone: "gastro", description: "Cocina tradicional del norte: empanadas, locro, quimbibos y vinos de altura en un solo puesto.", initials: "SJ", gradient: "from-red-400 to-rose-600", image: "/images/exhib-sabor-jujeno.png" },
  { id: "tabacotab", name: "TabacoTab S.A.", category: "Agroindustria", stand: "Pabellón B · Stand 11", zone: "industria", description: "Principal acopio tabacalero de la región, con diversificación hacia bioetanol y biomasa.", initials: "TT", gradient: "from-emerald-400 to-teal-600", image: "/images/exhib-tabacotab.png" },
  { id: "aguilar", name: "Minera El Aguilar", category: "Minería & Litio", stand: "Pabellón B · Stand 06", zone: "industria", description: "Polimetálicos del siglo XX que apuestan al futuro: zinc, plomo y plata con minería sostenible.", initials: "EA", gradient: "from-slate-500 to-slate-700", image: "/images/exhib-aguilar.png" },
  { id: "cloudnoa", name: "Cloud NOA", category: "Tecnología & IA", stand: "Pabellón A · Stand 05", zone: "tecnologia", description: "Datacenter regional y servicios cloud soberanos para gobiernos y empresas del norte argentino.", initials: "CN", gradient: "from-cyan-400 to-sky-600", image: "/images/exhib-cloudnoa.png" },
  { id: "vinos-altura", name: "Vinos de Altura del NOA", category: "Agroindustria", stand: "Pabellón D · Stand 09", zone: "gastro", description: "Viñedos a 2.800 msnm. Torrontés y malbec de altura con denominación de origen en trámite.", initials: "VA", gradient: "from-purple-400 to-violet-brand", image: "/images/exhib-vinos-altura.png" },
  { id: "pymeglobal", name: "PyME Global", category: "Comercio Exterior", stand: "Pabellón C · Stand 10", zone: "internacional", description: "Catalizadora de exportaciones PyME: logística internacional, aduanas y marketplaces globales.", initials: "PG", gradient: "from-blue-400 to-indigo-500", image: "/images/exhib-pymeglobal.png" },
  { id: "eolicajujuy", name: "Eólica Jujuy", category: "Energías Renovables", stand: "Pabellón B · Stand 18", zone: "industria", description: "Proyecto eólico de la Puna: 120 MW limpios y comunidad energética para localidades andinas.", initials: "EJ", gradient: "from-teal-400 to-cyan-600", image: "/images/exhib-eolicajujuy.png" },
  { id: "termas-reyes", name: "Termas de Reyes Resort", category: "Turismo", stand: "Pabellón D · Stand 20", zone: "gastro", description: "Turismo wellness en las termas jujeñas: spa, congresos y turismo de salud a 30 minutos de la capital.", initials: "TR", gradient: "from-orange-400 to-amber-600", image: "/images/exhib-termas-reyes.png" },
  { id: "camara-cce", name: "Cámara de Comercio Exterior de Jujuy", category: "Institucional", stand: "Pabellón C · Stand 00", zone: "internacional", description: "Organizador de ExpoJuy 2026. Stand institucional con agenda de misiones comerciales 2027.", initials: "CC", gradient: "from-violet-brand to-lavender", image: "/images/exhib-camara-cce.png" },
  { id: "craftllama", name: "CraftLlama Café & Cerveza", category: "Gastronomía", stand: "Pabellón D · Stand 07", zone: "gastro", description: "Café de especialidad de Yungas y cerveza artesanal con frutos andinos. Degustaciones todo el día.", initials: "CL", gradient: "from-amber-500 to-yellow-700", image: "/images/exhib-craftllama.png" },
  { id: "dataandes", name: "DataAndes", category: "Tecnología & IA", stand: "Pabellón A · Stand 02", zone: "tecnologia", description: "Analítica de datos y drones para minería, agro y ciudades inteligentes del NOA.", initials: "DA", gradient: "from-fuchsia-400 to-purple-600", image: "/images/exhib-dataandes.png" },
  { id: "bolivia-exporta", name: "Bolivia Exporta", category: "Comercio Exterior", stand: "Pabellón C · Stand 05", zone: "internacional", description: "Delegación oficial boliviana: textiles, quinua, café y servicios logísticos binacionales.", initials: "BE", gradient: "from-green-500 to-emerald-700", country: "Bolivia", image: "/images/exhib-bolivia-exporta.png" },
  { id: "chile-austral", name: "Cervecería Austral Del Valle", category: "Gastronomía", stand: "Pabellón D · Stand 12", zone: "gastro", description: "Cervezas artesanales chilenas del Valle de Copiapó. Presentación de su línea andina.", initials: "CA", gradient: "from-sky-500 to-blue-700", country: "Chile", image: "/images/exhib-chile-austral.png" },
  { id: "greenh2", name: "GreenH2 Norte", category: "Energías Renovables", stand: "Pabellón B · Stand 25", zone: "industria", description: "Hidrógeno verde en la Puna: el proyecto energético que busca exportar a Asia desde el NOA.", initials: "GH", gradient: "from-emerald-400 to-green-600", featured: true, image: "/images/exhib-greenh2.png" },
  { id: "frigorifico", name: "Frigorífico Andino", category: "Agroindustria", stand: "Pabellón B · Stand 14", zone: "industria", description: "Carne ovina de altura con trazabilidad blockchain y certificación halal para exportación.", initials: "FA", gradient: "from-rose-500 to-red-700", image: "/images/exhib-frigorifico.png" },
];

// ── Zonas del predio ─────────────────────────────────────────
export type ZoneId = "tecnologia" | "industria" | "internacional" | "gastro" | "servicios";

export const ZONES: {
  id: ZoneId;
  name: string;
  short: string;
  color: string;
  fill: string;
  stroke: string;
  textDark?: boolean;
  description: string;
  services?: string[];
}[] = [
    {
      id: "tecnologia",
      name: "Pabellón A · Tecnología e Innovación",
      short: "Pabellón A",
      color: "#2EC4B6",
      fill: "rgba(46,196,182,0.25)",
      stroke: "#2EC4B6",
      description: "IA, software, startups, agrotech y economía del conocimiento.",
    },
    {
      id: "industria",
      name: "Pabellón B · Industria y Minería",
      short: "Pabellón B",
      color: "#7B2D8E",
      fill: "rgba(123,45,142,0.25)",
      stroke: "#7B2D8E",
      description: "Minería y litio, agroindustria, energías renovables y metalmecánica.",
    },
    {
      id: "internacional",
      name: "Pabellón C · Internacional y Negocios",
      short: "Pabellón C",
      color: "#2A1745",
      fill: "rgba(42,23,69,0.28)",
      stroke: "#2A1745",
      description: "Rondas de negocios, salas VIP y delegaciones internacionales.",
    },
    {
      id: "gastro",
      name: "Pabellón D · Gastronomía y Escenario",
      short: "Pabellón D",
      color: "#C4A1D4",
      fill: "rgba(196,161,212,0.35)",
      stroke: "#C4A1D4",
      description: "Sabores del NOA, artesanías, escenario principal y shows en vivo.",
    },
    {
      id: "servicios",
      name: "Área de Servicios",
      short: "Servicios",
      color: "#4A4A4A",
      fill: "rgba(74,74,74,0.18)",
      stroke: "#4A4A4A",
      description: "Estacionamiento, enfermería, prensa, salones VIP y accesos.",
      services: ["Estacionamiento (1.200 vehículos)", "Enfermería y ambulancia 24 hs", "Centro de Prensa", "Salones VIP", "Puerta Norte (principal)", "Puerta Sur"],
    },
  ];

// ── Agenda ───────────────────────────────────────────────────
export type Activity = {
  time: string;
  title: string;
  description: string;
  location: string;
  speaker: { name: string; role: string; initials: string; color: string };
  tags: string[];
};

export const AGENDA: { day: string; date: string; label: string; activities: Activity[] }[] = [
  {
    day: "day1",
    date: "2026-10-09",
    label: "Vie 9 · Apertura",
    activities: [
      { time: "10:00 - 11:30", title: "Acto de Apertura Oficial", description: "Corte de cintas con autoridades nacionales, provinciales y delegaciones internacionales. Recorrida protocolar por los pabellones.", location: "Escenario Principal", speaker: { name: "Gobierno de Jujuy & CCEJ", role: "Comité Organizador", initials: "GJ", color: "#7B2D8E" }, tags: ["Protocolo"] },
      { time: "12:00 - 13:30", title: "El Litio y el Futuro del NOA", description: "Panel sobre la cadena de valor del litio, inversión extranjera y sostenibilidad hídrica en Salinas Grandes y Olaroz.", location: "Auditorio Principal", speaker: { name: "Dra. Mariana Colque", role: "Secretaría de Minería de Jujuy", initials: "MC", color: "#7B2D8E" }, tags: ["Minería", "Litio", "Inversión"] },
      { time: "14:00 - 15:30", title: "IA Generativa para la Industria", description: "Casos de uso reales de inteligencia artificial en manufactura, logística y calidad. Demo en vivo de agentes autónomos.", location: "Espacio Tech", speaker: { name: "Ing. Lucas Ferreyra", role: "CTO · AndinaTech", initials: "LF", color: "#2EC4B6" }, tags: ["IA", "Tecnología"] },
      { time: "16:00 - 17:30", title: "Mesa: Comercio Exterior 2026", description: "Perspectivas de exportación del NOA hacia América Latina y Asia. Aranceles, logística y oportunidades.", location: "Sala de Negocios", speaker: { name: "Rodrigo Paz", role: "Presidente CCEJ", initials: "RP", color: "#2A1745" }, tags: ["Comercio Exterior"] },
      { time: "19:00 - 21:00", title: "Show Central: Fiesta del Norte", description: "Espectáculo folclórico con artistas jujeños y delegaciones de Bolivia, Chile y Perú. Fogón y peña internacional.", location: "Escenario Principal", speaker: { name: "Artistas invitados", role: "Trayectoria nacional", initials: "AI", color: "#C4A1D4" }, tags: ["Cultura", "Show"] },
    ],
  },
  {
    day: "day2",
    date: "2026-10-10",
    label: "Sáb 10 · Negocios",
    activities: [
      { time: "09:30 - 11:00", title: "Ronda Internacional de Negocios (Turno 1)", description: "Más de 400 reuniones B2B programadas con compradores de Bolivia, Chile, Perú, Brasil, Uruguay y México.", location: "Sala de Negocios", speaker: { name: "CCEJ · ProChile · BolivIA", role: "Agencias de comercio", initials: "CI", color: "#29ABE2" }, tags: ["B2B", "Exporta"] },
      { time: "11:30 - 12:30", title: "Agroindustria 4.0", description: "Drones, sensores IoT y trazabilidad blockchain aplicados a tabaco, legumbres y ganadería de altura.", location: "Espacio Tech", speaker: { name: "Lic. Valeria Sosa", role: "AgTech Lead · DataAndes", initials: "VS", color: "#2EC4B6" }, tags: ["Agro", "IA", "Trazabilidad"] },
      { time: "13:00 - 14:00", title: "Almuerzo de Integración Empresarial", description: "Encuentro de cámaras y clusters con autoridades del Ministerio de Desarrollo Económico y Producción.", location: "Salón VIP", speaker: { name: "Min. Carlos Herrera", role: "Ministerio de Desarrollo Económico", initials: "CH", color: "#7B2D8E" }, tags: ["Networking"] },
      { time: "15:00 - 16:30", title: "Energías Renovables e Hidrógeno Verde", description: "Solar, eólica y H2 verde en la Puna: financiamiento verde y proyectos de exportación de energía.", location: "Auditorio Principal", speaker: { name: "Ing. Diego Aramayo", role: "Director · GreenH2 Norte", initials: "DA", color: "#2EC4B6" }, tags: ["Energía", "Sustentabilidad"] },
      { time: "18:00 - 19:30", title: "Turismo: Quebrada Patrimonio Mundial", description: "Turismo comunitario, wellness y aventura en la Quebrada de Humahuaca como motor económico.", location: "Sala de Negocios", speaker: { name: "Sra. Rosario Quispe", role: "Turismo Comunitario Purmamarca", initials: "RQ", color: "#C4A1D4" }, tags: ["Turismo"] },
      { time: "20:00 - 22:00", title: "Noche Gastro: Sabores de Altura", description: "Degustación de vinos de altura, café de Yungas y cocina en vivo con chefs del NOA y Chile.", location: "Pabellón D", speaker: { name: "Chef Emmanuel Rojas", role: "Embajador gastronómico NOA", initials: "ER", color: "#F4A259" }, tags: ["Gastronomía", "Show"] },
    ],
  },
  {
    day: "day3",
    date: "2026-10-11",
    label: "Dom 11 · Familia",
    activities: [
      { time: "11:00 - 12:00", title: "ExpoKids: Ciencia y Juego", description: "Laboratorio interactivo de ciencia, robótica educativa y realidad virtual para toda la familia.", location: "Espacio Tech", speaker: { name: "Equipo EXPOKids", role: "Divulgación científica", initials: "EK", color: "#29ABE2" }, tags: ["Familia", "Educación"] },
      { time: "12:30 - 13:30", title: "Mujeres que Lideran la Producción", description: "Historias de empresarias, mineras y productoras del NOA que transforman sus comunidades.", location: "Auditorio Principal", speaker: { name: "Panel de empresarias", role: "Red de Mujeres del NOA", initials: "MN", color: "#C4A1D4" }, tags: ["Liderazgo"] },
      { time: "14:00 - 15:00", title: "Demo Day de Startups del NOA", description: "Pitch final del concurso de startups: premios en efectivo, mentorías y acceso a fondos de inversión.", location: "Espacio Tech", speaker: { name: "Jury PyME Global", role: "Fondos de inversión", initials: "SD", color: "#2EC4B6" }, tags: ["Emprendedores", "IA"] },
      { time: "16:00 - 17:00", title: "Concurso Regional de Cocina", description: "Chefs del NOA compiten con ingredientes autóctonos: quinua, chala, charqui y frutos de altura.", location: "Escenario Principal", speaker: { name: "Chef María Ayala", role: "Jurado internacional", initials: "MA", color: "#F4A259" }, tags: ["Gastronomía"] },
      { time: "18:30 - 20:00", title: "Gran Fiesta de la Integración", description: "Música en vivo, fuegos artificiales y artistas internacionales de Bolivia, Chile y Perú.", location: "Escenario Principal", speaker: { name: "Artistas internacionales", role: "Bolivia · Chile · Perú", initials: "FI", color: "#7B2D8E" }, tags: ["Show", "Cultura"] },
    ],
  },
  {
    day: "day4",
    date: "2026-10-12",
    label: "Lun 12 · Cierre",
    activities: [
      { time: "10:00 - 11:00", title: "Universidad y Empresa: Puente de Innovación", description: "Transferencia tecnológica, prácticas profesionales y Becas 2027 de la Universidad Nacional de Jujuy.", location: "Auditorio Principal", speaker: { name: "Rdo. UnJu + Empresas", role: "Vinculación tecnológica", initials: "UJ", color: "#29ABE2" }, tags: ["Educación", "Innovación"] },
      { time: "11:30 - 12:30", title: "Cierre de Rondas de Negocios", description: "Última jornada de reuniones B2B programadas. Informe de intención de negocio y firma de acuerdos.", location: "Sala de Negocios", speaker: { name: "CCEJ", role: "Equipo de negocios", initials: "CC", color: "#2A1745" }, tags: ["B2B", "Negocios"] },
      { time: "14:00 - 15:30", title: "La Minería que Queremos", description: "Diálogo abierto con comunidades, empresas y estado sobre minería responsable y desarrollo local.", location: "Auditorio Principal", speaker: { name: "Mesa multinivel", role: "Estado · Empresa · Comunidad", initials: "MM", color: "#7B2D8E" }, tags: ["Minería", "Debate"] },
      { time: "17:00 - 18:00", title: "Anuncio de Resultados y Premios ExpoJuy", description: "Mejor stand, innovación aplicada y sustentabilidad. Premiación del concurso de emprendedores.", location: "Escenario Principal", speaker: { name: "Comité Organizador", role: "CCEJ", initials: "CO", color: "#C4A1D4" }, tags: ["Ceremonia"] },
      { time: "19:00 - 22:00", title: "Gran Cierre Musical", description: "El cierre más grande del norte: banda invitada de nivel nacional y show de luces y drones sobre el predio.", location: "Escenario Principal", speaker: { name: "Banda invitada", role: "Banda sorpresa 🎉", initials: "GC", color: "#7B2D8E" }, tags: ["Show", "Cierre"] },
    ],
  },
];

// ── Noticias ─────────────────────────────────────────────────
export type NewsItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  featured?: boolean;
  body: string[]; // párrafos del artículo completo
  tags: string[];
};

export const NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "ExpoJuy 2026 confirmó la participación de delegaciones de 12 países y proyecta más de 400 reuniones B2B",
    date: "10 de enero de 2026",
    category: "Comercio Exterior",
    excerpt:
      "La Cámara de Comercio Exterior de Jujuy firmó convenios con agencias de promoción de Bolivia, Chile, Perú, Brasil y México. La ronda internacional de negocios será la más grande de la historia del NOA, con compradores de supermercados, distribución mayorista e industria automotriz.",
    image: "/images/news-comercio.png",
    readTime: "4 min",
    featured: true,
    body: [
      "La Cámara de Comercio Exterior de Jujuy confirmó la llegada de delegaciones comerciales de doce países para la edición 2026 de ExpoJuy, tras la firma de convenios de cooperación con las agencias de promoción de exportaciones de Bolivia, Chile, Perú, Brasil, México, Colombia, Ecuador, Paraguay, Uruguay, Panamá, España y Portugal.",
      "La ronda internacional de negocios proyecta más de 400 encuentros B2B agendados entre compradores de cadenas de supermercados, distribuidores mayoristas, la industria automotriz y el sector minero regional. Cada reunión se coordina con el sistema de matching digital del evento, que sugiere contactos según rubro, capacidad de oferta y demanda.",
      "\"Para el NOA esto significa convertir la feria en una verdadera plataforma de internacionalización: el comprador viene, recorre los pabellones y se va con agenda cerrada\", explicó el presidente de la CCEJ durante la firma. Las PyMEs interesadas pueden sumarse sin costo a través de la acreditación empresarial.",
      "Las delegaciones recorrerán los cuatro pabellones temáticos con intérpretes y asistentes de comercio exterior, y participarán del seminario de logística internacional que se dictará en la Sala de Negocios del Pabellón C.",
    ],
    tags: ["Comercio Exterior", "Ronda B2B", "Delegaciones"],
  },
  {
    id: "n2",
    title: "Litio: las empresas del sector confirmaron su presencia con un pabellón propio en ExpoJuy",
    date: "22 de diciembre de 2025",
    category: "Minería & Litio",
    excerpt:
      "Los principales proyectos de litio de Salinas Grandes y Olaroz exhibirán sus avances, planes de inversión y propuestas laborales en el Pabellón B. Habrá un simulador de planta y realidad virtual para recorrer los salares.",
    image: "/images/news-litio.png",
    readTime: "3 min",
    body: [
      "Las empresas que impulsan los proyectos de litio de Salinas Grandes y Olaroz confirmaron su presencia con un pabellón propio dentro del Pabellón B · Industria y Minería, donde exhibirán el estado de avance de cada proyecto, los planes de inversión 2026-2030 y las búsquedas laborales activas.",
      "La gran atracción será el simulador de planta de carbonato de litio a escala real: los visitantes podrán operar virtualmente cada etapa del proceso —desde la extracción de salmuera hasta el embalaje del producto— con la misma interfaz que usan los operadores en campaña.",
      "Además, una experiencia de realidad virtual permitirá sobrevolar los salares y recorrer las obras en construcción, y habrá mesas técnicas con especialistas en sostenibilidad hídrica para responder consultas de la comunidad y de estudiantes.",
      "El sector proyecta sumar más de 4.000 puestos de trabajo directo en la provincia hacia 2027, por lo que la feria será también una vidriera laboral clave con entrevistas rápidas en el propio stand.",
    ],
    tags: ["Litio", "Minería", "Empleo"],
  },
  {
    id: "n3",
    title: "Espacio Tech: así será el hub de inteligencia artificial y startups del evento",
    date: "8 de diciembre de 2025",
    category: "Tecnología & IA",
    excerpt:
      "30 startups del NOA, demos de IA generativa, robótica educativa y un concurso con $10 millones en premios. El Cluster IT Jujuy curará la agenda del Espacio Tech durante los 10 días de feria.",
    image: "/images/news-tech.png",
    readTime: "5 min",
    body: [
      "El Espacio Tech de ExpoJuy 2026 será el mayor despliegue de tecnología e innovación en la historia del NOA: 30 startups de Jujuy, Salta, Tucumán y Bolivia mostrarán sus productos en demos continuas durante los diez días de feria.",
      "El Cluster IT Jujuy curará la agenda del hub: IA generativa aplicada a agroindustria y logística, robótica educativa, gemelos digitales para minería y una pista de drones con exhibiciones diarias. Habrá además un coworking efímero para reuniones entre fundadores e inversores.",
      "El Concurso Nacional de Innovación distribuirá $10 millones en premios entre las tres mejores soluciones presentadas en vivo ante un jurado de fondos de inversión, universidades y corporativos. La inscripción para emprendedores ya está abierta en la web del cluster.",
      "\"No queremos una feria de paneles: queremos que cada visitante toque, pruebe y se vaya con un contacto útil\", resumió la directora del espacio. Las charlas técnicas tendrán traducción a lengua de señas y acceso gratuito con la entrada general.",
    ],
    tags: ["IA", "Startups", "Concurso"],
  },
  {
    id: "n4",
    title: "Rondas de negocios B2B: se abrió la inscripción para empresas del NOA",
    date: "25 de noviembre de 2025",
    category: "Rondas de Negocios",
    excerpt:
      "Las PyMEs ya pueden inscribirse gratuitamente a la acreditación empresarial con agenda de reuniones personalizada. El año pasado se generaron u$s 48 millones en intención de negocio.",
    image: "/images/news-ronda.png",
    readTime: "3 min",
    body: [
      "Está abierta la inscripción a la Acreditación Empresarial · Ronda B2B, el programa que permite a las PyMEs del NOA acceder a una agenda personalizada de reuniones con compradores nacionales e internacionales durante los diez días de ExpoJuy 2026.",
      "La acreditación incluye acceso a la Sala de Negocios del Pabellón C, un mínimo garantizado de ocho reuniones coordinadas por el equipo de matching, catálogo digital de compradores internacionales y el almuerzo de integración con las delegaciones.",
      "En la edición anterior el programa generó u$s 48 millones en intención de negocio, con una tasa de concretación del 34% a seis meses. \"La clave es la preparación: trabajamos cada empresa antes de la feria para que llegue con propuesta comercial lista\", señalan los organizadores.",
      "Los cupos por rubro son limitados para asegurar la calidad de los encuentros. La solicitud de reunión con un expositor específico también puede hacerse desde el perfil de cada empresa en el directorio digital de esta web.",
    ],
    tags: ["B2B", "PyMEs", "Inscripción"],
  },
  {
    id: "n5",
    title: "Pabellón gastronómico: 40 emprendedores de cocina regional buscaron récord de visitantes",
    date: "14 de noviembre de 2025",
    category: "Gastronomía",
    excerpt:
      "Empanadas jujeñas, vinos de altura, café de Yungas y cocina andina en vivo. El Pabellón D tendrá escenario propio con clases de chefs y concurso regional.",
    image: "/images/news-gastro.png",
    readTime: "2 min",
    body: [
      "El Pabellón D · Gastronomía reunirá a 40 emprendedores de cocina regional en un recorrido que propone empanadas jujeñas de corte artesanal, vinos de altura de la Quebrada, café de Yungas y cocina andina preparada en vivo sobre piedra.",
      "El escenario propio del pabellón tendrá clases magistrales de chefs regionales, maridajes guiados y el primer Concurso Regional de Cocina Identitaria, cuyo plato ganador integrará el menú de los eventos VIP de la feria.",
      "En la edición pasada el pabellón superó las 60.000 visitas y agotó su oferta los dos días del fin de semana, por lo que esta edición suma puestos de venta, sombra, mesas comunitarias y señalética en tres idiomas para el público internacional esperado.",
    ],
    tags: ["Gastronomía", "Emprendedores", "Quebrada"],
  },
  {
    id: "n6",
    title: "Energías renovables: GreenH2 presentará el proyecto de hidrógeno verde de la Puna",
    date: "30 de octubre de 2025",
    category: "Energías Renovables",
    excerpt:
      "El ambicioso proyecto de hidrógeno verde para exportación tendrá su stand interactivo con maquetas, visualización 3D del parque eólico y charlas técnicas abiertas.",
    image: "/images/news-energia.png",
    readTime: "4 min",
    body: [
      "GreenH2 presentará en ExpoJuy 2026 el proyecto de hidrógeno verde de la Puna, la iniciativa que busca producir y exportar el combustible del futuro aprovechando el recurso eólico de altura de la región.",
      "El stand interactivo incluirá maquetas del parque eólico y de la planta de electrólisis, visualización 3D del ciclo completo de producción y un simulador de costos para que empresas industriales calculen el ahorro de descarbonizar sus procesos.",
      "Habrá charlas técnicas abiertas sobre oportunidades para proveedores locales: el proyecto estima requerir más de 1.200 PyMEs de servicios entre construcción, logística y mantenimiento durante su fase de obra.",
      "\"ExpoJuy es la ventana ideal para mostrar que la transición energética también se construye desde el Norte Argentino\", indicaron desde la compañía, que adelantó que anunciará en la feria la apertura de la primera convocatoria de proveedores.",
    ],
    tags: ["Hidrógeno Verde", "Energía", "Puna"],
  },
];

// ── Sponsors ─────────────────────────────────────────────────
export const SPONSOR_TIERS = [
  {
    tier: "platino",
    title: "Sponsor Platino",
    border: "border-amber-300/70",
    sponsors: [
      { name: "Litica Andes S.A.", initials: "LA", gradient: "from-violet-500 to-violet-brand" },
      { name: "Banco Norte", initials: "BN", gradient: "from-indigo-400 to-indigo-600" },
      { name: "Telecom NOA", initials: "TN", gradient: "from-teal-400 to-turquoise" },
    ],
  },
  {
    tier: "oro",
    title: "Sponsors Oro",
    border: "border-slate-300",
    sponsors: [
      { name: "Solar Norte S.A.", initials: "SN", gradient: "from-amber-400 to-orange-500" },
      { name: "AndinaTech", initials: "AT", gradient: "from-teal-400 to-turquoise" },
      { name: "Cloud NOA", initials: "CN", gradient: "from-cyan-400 to-sky-600" },
      { name: "AgroValle Foods", initials: "AF", gradient: "from-lime-500 to-green-600" },
      { name: "Termas de Reyes", initials: "TR", gradient: "from-orange-400 to-amber-600" },
      { name: "DataAndes", initials: "DA", gradient: "from-fuchsia-400 to-purple-600" },
    ],
  },
  {
    tier: "institucional",
    title: "Apoyo Institucional",
    sponsors: [
      { name: "Gobierno de Jujuy", initials: "GJ", gradient: "from-slate-400 to-slate-600" },
      { name: "Min. Desarrollo Económico", initials: "MD", gradient: "from-slate-400 to-slate-600" },
      { name: "UnJu", initials: "UJ", gradient: "from-slate-400 to-slate-600" },
      { name: "INTA", initials: "IN", gradient: "from-slate-400 to-slate-600" },
      { name: "Cluster IT Jujuy", initials: "IT", gradient: "from-slate-400 to-slate-600" },
      { name: "Cámara de Comercio", initials: "CC", gradient: "from-slate-400 to-slate-600" },
    ],
  },
] as const;

// ── FAQ ──────────────────────────────────────────────────────
export const FAQS = [
  {
    q: "¿Cuándo y dónde se realiza ExpoJuy 2026?",
    a: "Del 9 al 12 de octubre de 2026 en el Predio Ferial Ciudad Cultural (Av. Teherán s/n, San Salvador de Jujuy). Horarios: de 10 a 22 hs.",
  },
  {
    q: "¿Cómo puedo inscribirme como expositor?",
    a: "Completá el formulario de contacto seleccionando 'Quiero ser expositor'. El equipo comercial te enviará el plan de pabellones, medidas de stands y tarifas con descuentos por pronta reserva. Las vacantes se asignan por orden de inscripción.",
  },
  {
    q: "¿Cómo compro entradas?",
    a: "Desde la sección 'Entradas' de este sitio. Elegí el tipo de entrada, completá tus datos y recibí por email tu entrada digital con código QR único para el acceso rápido al predio. También habrá venta presencial en puertas.",
  },
  {
    q: "¿El evento es accesible para personas con movilidad reducida?",
    a: "Sí. Todo el predio cuenta con rampas, baños adaptados, señalización braille, circulación sin obstáculos y personal de asistencia. Los animales de asistencia son bienvenidos.",
  },
  {
    q: "¿Hay estacionamiento en el predio?",
    a: "Sí, disponemos de estacionamiento para 1.200 vehículos con acceso por Puerta Sur. Además, hay servicio gratuito de combis desde el centro de San Salvador de Jujuy cada 20 minutos.",
  },
  {
    q: "¿Cuál es el reglamento para montaje de stands?",
    a: "El montaje se realiza del 5 al 8 de octubre. El manual del expositor (enviado al confirmar participación) detalla alturas máximas, materiales ignífugos, normativa eléctrica y horarios permitidos. Todo stand requiere aprobación técnica previa.",
  },
  {
    q: "¿Cómo me acredito como prensa?",
    a: "Completá el formulario en la tarjeta 'Acreditación Prensa y Medios' con tus datos y medio. La credencial es gratuita e incluye acceso al Centro de Prensa, kit de medios y cobertura de conferencias.",
  },
] as const;

// ── Tickets ──────────────────────────────────────────────────
export const TICKET_TYPES = [
  {
    type: "visitante",
    icon: "ticket",
    title: "Entrada General Visitante",
    price: 5000,
    priceLabel: "$5.000 ARS",
    per: "por día",
    description: "Acceso por día a la feria, shows y actividades generales.",
    features: [
      "Acceso a los 4 pabellones temáticos",
      "Shows y espectáculos del escenario principal",
      "Actividades familiares y demostraciones",
      "Entrada digital con código QR personalizado",
      "Niños menores de 10 años: sin cargo",
    ],
    cta: "Comprar entrada",
  },
  {
    type: "b2b",
    icon: "briefcase",
    title: "Acreditación Empresarial · Ronda B2B",
    price: 12000,
    priceLabel: "$12.000 ARS",
    per: "acceso completo",
    description: "Para empresas que quieren vender y comprar en el NOA.",
    features: [
      "Acceso exclusivo a la Sala de Negocios",
      "Agenda personalizada de rondas B2B (mín. 8 reuniones)",
      "Catálogo digital de compradores internacionales",
      "Almuerzo de integración y After Business",
      "Perfil destacado en el directorio digital",
    ],
    cta: "Inscribirse",
  },
  {
    type: "prensa",
    icon: "microphone",
    title: "Acreditación Prensa y Medios",
    price: 0,
    priceLabel: "Gratuita",
    per: "previa aprobación",
    description: "Acceso profesional para cobertura periodística del evento.",
    features: [
      "Acceso a los 10 días de la feria",
      "Centro de Prensa con fibra y espacios de trabajo",
      "Kit de medios: logos, fotos oficiales y comunicados",
      "Acceso preferencial a conferencias de prensa",
      "Entrevistas coordinadas con disertantes",
    ],
    cta: "Solicitar acreditación",
  },
] as const;

// ── Contacto ─────────────────────────────────────────────────
export const INQUIRY_TYPES = [
  { value: "expositor", label: "Quiero ser expositor" },
  { value: "general", label: "Consulta general" },
  { value: "prensa", label: "Prensa" },
  { value: "sponsoreo", label: "Sponsoreo" },
  { value: "otro", label: "Otro" },
] as const;

// ── Franjas horarias para solicitudes de reunión B2B ─────────
export const MEETING_SLOTS = [
  "Vie 25/09 · 10:00-13:00",
  "Vie 25/09 · 14:00-18:00",
  "Sáb 26/09 · 09:30-13:00",
  "Sáb 26/09 · 14:00-18:00",
  "Dom 27/09 · 11:00-14:00",
  "Vie 02/10 · 10:00-13:00",
  "Vie 02/10 · 14:00-18:00",
  "Sáb 03/10 · 10:00-13:00",
] as const;
