export interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  stats: string;
  tag: string;
  color: string;
}

export interface Activity {
  id: string;
  time: string;
  date: string;
  title: string;
  speaker: string;
  role: string;
  stage: "Auditorio Central" | "Sala Innovación & Tech" | "Ronda Internacional";
  category: "Minería & Litio" | "Energía & Clima" | "Agro & Comercio" | "Economía del Conocimiento";
}

export interface Exhibitor {
  id: string;
  name: string;
  sector: "Minería & Litio" | "Energías Renovables" | "Agroindustria" | "Tecnología e Innovación" | "Institucional & Comercio";
  stand: string;
  hall: "Pabellón A (Internacional)" | "Pabellón B (Innovación & Pymes)" | "Pabellón C (Agro & Maquinaria)";
  country: string;
  description: string;
  featured: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const EXPO_PILLARS: Pillar[] = [
  {
    id: "litio-mineria",
    title: "Minería & Litio Sustentable",
    subtitle: "El corazón del Triángulo del Litio",
    description:
      "Jujuy como polo mundial en la transición energética global. Encuentro de empresas mineras líderes, proveedores locales e investigación en extracción sustentable.",
    icon: "Pickaxe",
    stats: "+45 Empresas del Sector",
    tag: "Transición Energética",
    color: "from-cyan-500/20 to-blue-600/10 border-cyan-500/30 text-cyan-400",
  },
  {
    id: "energias-limpias",
    title: "Energías Renovables & Solar",
    subtitle: "Cauchari y el futuro fotovoltaico",
    description:
      "Liderazgo en radiación solar y desarrollo de parques fotovoltaicos. Modelos de generación distribuida, almacenamiento energético e hidrógeno verde.",
    icon: "SunMedium",
    stats: "300+ MW Generados",
    tag: "Energía Limpia",
    color: "from-amber-500/20 to-orange-600/10 border-amber-500/30 text-amber-400",
  },
  {
    id: "agroindustria",
    title: "Agroindustria de Exportación",
    subtitle: "Tabaco, caña de azúcar, frutas y bioindustria",
    description:
      "Cadena de valor agroindustrial del NOA con tecnología aplicada. Biocombustibles, trazabilidad inteligente y acuerdos con mercados internacionales.",
    icon: "Sprout",
    stats: "Top Exportador NOA",
    tag: "Producción Regional",
    color: "from-emerald-500/20 to-teal-600/10 border-emerald-500/30 text-emerald-400",
  },
  {
    id: "conocimiento-tech",
    title: "Economía del Conocimiento",
    subtitle: "Software, talento jujeño e Inteligencia Artificial",
    description:
      "Startups tecnológicas, biotecnología aplicada a la Puna y exportación de servicios basados en el talento joven de la provincia.",
    icon: "Cpu",
    stats: "Hub Tecnológico NOA",
    tag: "Innovación & AI",
    color: "from-purple-500/20 to-fuchsia-600/10 border-purple-500/30 text-purple-400",
  },
  {
    id: "comercio-exterior",
    title: "Corredor Bioceánico & Comercio",
    subtitle: "Paso de Jama y conexión con el Pacífico",
    description:
      "Integración estratégica comercial entre Argentina, Chile, Bolivia, Brasil y Paraguay. Rondas de negocios multilaterales de alto impacto.",
    icon: "Globe2",
    stats: "5 Países Conectados",
    tag: "Integración Regional",
    color: "from-indigo-500/20 to-sky-600/10 border-indigo-500/30 text-indigo-400",
  },
  {
    id: "turismo-cultura",
    title: "Turismo & Patrimonio Vivo",
    subtitle: "Quebrada de Humahuaca, Yungas y Puna",
    description:
      "Infraestructura turística de vanguardia, el primer tren solar de Latinoamérica e industrias culturales y gastronómicas auténticas.",
    icon: "Mountain",
    stats: "Patrimonio de la Humanidad",
    tag: "Cultura & Destino",
    color: "from-rose-500/20 to-pink-600/10 border-rose-500/30 text-rose-400",
  },
];

export const ACTIVITIES_SCHEDULE: Activity[] = [
  {
    id: "act-1",
    date: "Viernes 10 Octubre",
    time: "10:00 - 11:30",
    title: "Apertura Oficial y Simposio: El Futuro del Triángulo del Litio hacia el 2030",
    speaker: "Panel Internacional de Ministros y Cámaras Mineras",
    role: "Apertura Institucional",
    stage: "Auditorio Central",
    category: "Minería & Litio",
  },
  {
    id: "act-2",
    date: "Viernes 10 Octubre",
    time: "14:30 - 16:00",
    title: "IA aplicada a la exploración y geofísica de precisión",
    speaker: "Dra. Elena Albarracín",
    role: "Directora de Data Science en GeoTech Latam",
    stage: "Sala Innovación & Tech",
    category: "Economía del Conocimiento",
  },
  {
    id: "act-3",
    date: "Viernes 10 Octubre",
    time: "16:30 - 18:30",
    title: "Ronda de Negocios del Corredor Bioceánico del Eje de Capricornio",
    speaker: "Cámara de Comercio Exterior de Jujuy & Delegaciones Comerciales",
    role: "Mesas de Negociación B2B",
    stage: "Ronda Internacional",
    category: "Agro & Comercio",
  },
  {
    id: "act-4",
    date: "Sábado 11 Octubre",
    time: "11:00 - 12:30",
    title: "Parques Solares en Altura: Desafíos de almacenamiento y baterías de litio",
    speaker: "Ing. Martín Morales",
    role: "Especialista en Energía Fotovoltaica de Cauchari Solar",
    stage: "Auditorio Central",
    category: "Energía & Clima",
  },
  {
    id: "act-5",
    date: "Sábado 11 Octubre",
    time: "15:00 - 16:30",
    title: "AgTech en los Valles: Riego inteligente y biotecnología de cultivos andinos",
    speaker: "Ing. Agr. Sofía Calvetti",
    role: "Investigadora INTA Jujuy",
    stage: "Sala Innovación & Tech",
    category: "Agro & Comercio",
  },
  {
    id: "act-6",
    date: "Domingo 12 Octubre",
    time: "17:00 - 18:30",
    title: "Transformación Digital e Inteligencia Artificial en PyMEs del Norte Argentino",
    speaker: "Lic. Federico Carrillo",
    role: "Presidente del Polo Tecnológico Jujuy",
    stage: "Sala Innovación & Tech",
    category: "Economía del Conocimiento",
  },
];

export const EXHIBITORS_DATA: Exhibitor[] = [
  {
    id: "ex-1",
    name: "Lithium Andes Corporation",
    sector: "Minería & Litio",
    stand: "A-12",
    hall: "Pabellón A (Internacional)",
    country: "Argentina / Australia",
    description: "Extracción y refinamiento de carbonato de litio grado batería con tecnología de evaporación optimizada.",
    featured: true,
  },
  {
    id: "ex-2",
    name: "Cauchari Solar Energy Group",
    sector: "Energías Renovables",
    stand: "A-04",
    hall: "Pabellón A (Internacional)",
    country: "Argentina",
    description: "Generación de energía limpia a más de 4.000 msnm con seguimiento inteligente de radiación.",
    featured: true,
  },
  {
    id: "ex-3",
    name: "Jujuy Biotech & AgTech Lab",
    sector: "Tecnología e Innovación",
    stand: "B-18",
    hall: "Pabellón B (Innovación & Pymes)",
    country: "Argentina",
    description: "Desarrollo de bioinsumos sustentables, trazabilidad blockchain y sensores IoT para agricultura de precisión.",
    featured: true,
  },
  {
    id: "ex-4",
    name: "Cámara del Tabaco y Azúcar del Norte",
    sector: "Agroindustria",
    stand: "C-01",
    hall: "Pabellón C (Agro & Maquinaria)",
    country: "Argentina",
    description: "Cadena de exportación de tabaco Virginia y derivados de caña con certificación de calidad internacional.",
    featured: false,
  },
  {
    id: "ex-5",
    name: "Bioceánico Logistic Hub",
    sector: "Institucional & Comercio",
    stand: "A-08",
    hall: "Pabellón A (Internacional)",
    country: "Chile / Argentina",
    description: "Operador integral de transporte intermodal conectando puertos del Atlántico y del Pacífico por Paso de Jama.",
    featured: true,
  },
  {
    id: "ex-6",
    name: "NeuralJuy AI Solutions",
    sector: "Tecnología e Innovación",
    stand: "B-05",
    hall: "Pabellón B (Innovación & Pymes)",
    country: "Argentina",
    description: "Modelos de visión artificial y machine learning para control de calidad en minería e industrias regionales.",
    featured: false,
  },
  {
    id: "ex-7",
    name: "EcoMaq Vial del Norte",
    sector: "Agroindustria",
    stand: "C-12",
    hall: "Pabellón C (Agro & Maquinaria)",
    country: "Argentina",
    description: "Maquinaria pesada híbrida para movimientos de suelo y aplicaciones mineras y agrícolas sustentables.",
    featured: false,
  },
  {
    id: "ex-8",
    name: "Tren Solar de la Quebrada & Turismo",
    sector: "Institucional & Comercio",
    stand: "B-01",
    hall: "Pabellón B (Innovación & Pymes)",
    country: "Argentina",
    description: "Pioneros en movilidad turística sustentable propulsada por baterías de litio recargadas en parques solares.",
    featured: true,
  },
];

export const FAQS_DATA: FAQ[] = [
  {
    question: "¿Cuándo y dónde se llevará a cabo ExpoJuy 2026?",
    answer: "ExpoJuy 2026 se realizará del 9 al 18 de Octubre de 2026 en el Predio Ferial Ciudad Cultural de San Salvador de Jujuy, con más de 15.000 m² de exhibición.",
    category: "General",
  },
  {
    question: "¿Cómo pueden las empresas acreditarse para las Rondas de Negocios?",
    answer: "Las inscripciones para expositores y rondas B2B están abiertas a través del portal oficial. Las empresas registradas acceden a la agenda bilateral coordinada por la Cámara de Comercio Exterior de Jujuy.",
    category: "Expositores",
  },
  {
    question: "¿Dónde se adquieren las entradas y qué costo tienen?",
    answer: "Las entradas podrán adquirirse digitalmente con código QR anticipado en esta plataforma o en las boleterías de la Ciudad Cultural. Habrá tarifas preferenciales para estudiantes y jubilados.",
    category: "Entradas",
  },
  {
    question: "¿Cuenta el predio con accesibilidad para personas con movilidad reducida?",
    answer: "Sí, todo el predio cuenta con rampas reglamentarias, señalética inclusiva, baños adaptados, intérpretes de LSA en conferencias principales y estacionamiento prioritario.",
    category: "Accesibilidad",
  },
];
