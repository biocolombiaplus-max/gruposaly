export type ServiceCategory = "remodelacion" | "construccion" | "ventas";

export interface ServiceDefinition {
  slug: string;
  category: ServiceCategory;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  longDescription: string[];
  features: string[];
  heroGradient: string;
  icon:
    | "hammer"
    | "hospital"
    | "home"
    | "building"
    | "store"
    | "warehouse"
    | "key";
  whatsappMessage: string;
}

export const COMPANY_NAME = "Grupo Saly";
export const WHATSAPP_NUMBER = "573132271373";
export const WHATSAPP_DISPLAY = "+57 313 227 1373";

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "remodelaciones",
    category: "remodelacion",
    title: "Remodelaciones",
    shortTitle: "Remodelaciones",
    tagline: "Transformamos espacios sin transformar tu rutina",
    description:
      "Renovamos viviendas, oficinas y locales con acabados de alta calidad, cumplimiento de cronograma y acompañamiento total del proyecto.",
    longDescription: [
      "En Grupo Saly llevamos años transformando espacios residenciales y comerciales en Colombia. Nuestro equipo de arquitectos, ingenieros y maestros de obra trabaja de la mano contigo desde el diseño conceptual hasta la entrega final.",
      "Nos encargamos de remodelaciones integrales de cocinas, baños, fachadas, oficinas, locales comerciales y áreas comunes, garantizando materiales certificados, cronogramas claros y una comunicación constante durante toda la obra.",
      "Cada proyecto se planea con presupuestos detallados y visitas técnicas previas, para que no existan sorpresas y el resultado final supere tus expectativas.",
    ],
    features: [
      "Diseño y planos 3D antes de iniciar obra",
      "Presupuesto detallado sin costos ocultos",
      "Maestros de obra y personal certificado",
      "Cumplimiento de cronogramas de entrega",
      "Garantía sobre acabados y mano de obra",
      "Acompañamiento durante toda la remodelación",
    ],
    heroGradient: "from-orange-600 via-orange-500 to-amber-400",
    icon: "hammer",
    whatsappMessage:
      "Hola, quiero información sobre el servicio de Remodelaciones de Grupo Saly.",
  },
  {
    slug: "infraestructura-hospitalaria",
    category: "construccion",
    title: "Construcción de Infraestructura Hospitalaria",
    shortTitle: "Infraestructura Hospitalaria",
    tagline: "Espacios de salud construidos con precisión técnica",
    description:
      "Diseñamos y construimos infraestructura hospitalaria y de salud cumpliendo la normativa técnica exigida para clínicas, IPS y laboratorios clínicos.",
    longDescription: [
      "Grupo Saly cuenta con experiencia especializada en la construcción y adecuación de infraestructura para el sector salud: clínicas, IPS, consultorios, quirófanos, laboratorios clínicos y centros de diagnóstico.",
      "Entendemos los requisitos técnicos y normativos del sector (habilitación, bioseguridad, flujos de circulación, redes hidrosanitarias y eléctricas especializadas) y construimos pensando en la operación real del personal de salud.",
      "Trabajamos junto a los equipos de auditoría médica y administrativos de nuestros clientes para entregar espacios funcionales, seguros y listos para habilitación ante la autoridad sanitaria.",
    ],
    features: [
      "Cumplimiento de normativa de habilitación en salud",
      "Diseño de flujos de circulación y bioseguridad",
      "Redes hidrosanitarias y eléctricas especializadas",
      "Experiencia en clínicas, IPS y laboratorios clínicos",
      "Acabados sanitarios de alta durabilidad",
      "Acompañamiento en procesos de habilitación",
    ],
    heroGradient: "from-slate-800 via-slate-700 to-orange-600",
    icon: "hospital",
    whatsappMessage:
      "Hola, quiero información sobre Construcción de Infraestructura Hospitalaria con Grupo Saly.",
  },
  {
    slug: "casas",
    category: "construccion",
    title: "Construcción de Casas desde Cero",
    shortTitle: "Casas",
    tagline: "Tu casa, construida desde los cimientos hasta la entrega",
    description:
      "Construimos viviendas unifamiliares completas, desde el diseño arquitectónico y estructural hasta los acabados finales, con calidad garantizada.",
    longDescription: [
      "Hacemos realidad el proyecto de tu casa propia. Nos encargamos de todo el proceso constructivo: estudios de suelo, diseño arquitectónico, licencias, cimentación, estructura, mampostería, instalaciones y acabados.",
      "Trabajamos con cronogramas de obra claros y visitas periódicas para que puedas hacer seguimiento al avance de tu proyecto en cada etapa.",
      "Ya sea una vivienda campestre, urbana o de varios niveles, adaptamos el diseño a tu presupuesto y estilo de vida, sin sacrificar calidad estructural ni acabados.",
    ],
    features: [
      "Diseño arquitectónico y estructural personalizado",
      "Gestión de licencias de construcción",
      "Cimentación y estructura con normativa sismo resistente",
      "Acabados a elección del cliente",
      "Seguimiento fotográfico del avance de obra",
      "Entrega llave en mano",
    ],
    heroGradient: "from-orange-600 via-amber-500 to-yellow-400",
    icon: "home",
    whatsappMessage:
      "Hola, quiero información sobre Construcción de Casas desde Cero con Grupo Saly.",
  },
  {
    slug: "edificios",
    category: "construccion",
    title: "Construcción de Edificios",
    shortTitle: "Edificios",
    tagline: "Proyectos de altura con solidez estructural y financiera",
    description:
      "Construimos edificios residenciales y de uso mixto, gestionando cada etapa del proyecto con ingeniería, calidad y control de costos.",
    longDescription: [
      "Desarrollamos proyectos de edificios residenciales, de oficinas y de uso mixto. Nuestro equipo de ingeniería estructural y gerencia de proyectos garantiza obras seguras, eficientes y rentables.",
      "Acompañamos al inversionista o propietario desde el estudio de factibilidad y diseño, hasta la construcción, interventoría y entrega final de cada unidad.",
      "Aplicamos procesos de control de calidad en cada fase constructiva, con proveedores certificados y personal calificado en trabajo en alturas y estructuras de concreto.",
    ],
    features: [
      "Estudios de factibilidad y diseño estructural",
      "Gerencia integral de proyectos de construcción",
      "Personal certificado en trabajo en alturas",
      "Control de calidad en cada fase de obra",
      "Cumplimiento de normativa NSR-10",
      "Entrega de unidades llave en mano",
    ],
    heroGradient: "from-slate-900 via-slate-700 to-orange-500",
    icon: "building",
    whatsappMessage:
      "Hola, quiero información sobre Construcción de Edificios con Grupo Saly.",
  },
  {
    slug: "locales-comerciales",
    category: "construccion",
    title: "Construcción de Locales Comerciales",
    shortTitle: "Locales Comerciales",
    tagline: "Espacios comerciales pensados para tu negocio",
    description:
      "Diseñamos y construimos locales comerciales funcionales, atractivos y adaptados a la operación de tu marca o negocio.",
    longDescription: [
      "Construimos locales comerciales para retail, restaurantes, oficinas de atención al público y franquicias, con diseños que potencian la experiencia del cliente y la operación del negocio.",
      "Coordinamos las adecuaciones eléctricas, redes de datos, fachadas, iluminación comercial y acabados de alto tránsito, cumpliendo con los manuales de marca cuando aplica.",
      "Trabajamos con cronogramas ajustados a fechas de apertura, entendiendo que cada día de obra representa una inversión para tu negocio.",
    ],
    features: [
      "Diseño adaptado al manual de marca",
      "Adecuaciones eléctricas y redes de datos",
      "Acabados de alto tránsito y durabilidad",
      "Cronogramas ajustados a fecha de apertura",
      "Fachadas e iluminación comercial",
      "Coordinación con entes de control locales",
    ],
    heroGradient: "from-orange-500 via-orange-600 to-slate-800",
    icon: "store",
    whatsappMessage:
      "Hola, quiero información sobre Construcción de Locales Comerciales con Grupo Saly.",
  },
  {
    slug: "bodegas",
    category: "construccion",
    title: "Construcción de Bodegas",
    shortTitle: "Bodegas",
    tagline: "Infraestructura industrial y logística de alto rendimiento",
    description:
      "Construimos bodegas y centros de almacenamiento con estructuras metálicas o en concreto, optimizadas para operación logística e industrial.",
    longDescription: [
      "Desarrollamos proyectos de bodegas industriales, centros de distribución y naves logísticas, con estructuras diseñadas para soportar la operación de tu empresa.",
      "Analizamos capacidad de carga, altura libre, patios de maniobra, redes contra incendios y sistemas de ventilación e iluminación industrial para entregar espacios eficientes y seguros.",
      "Nuestro equipo gestiona la obra civil, estructura metálica o en concreto, cubiertas y adecuaciones especiales según el uso: almacenamiento, producción o distribución.",
    ],
    features: [
      "Estructuras metálicas y en concreto",
      "Diseño según capacidad de carga y operación",
      "Sistemas contra incendios y ventilación industrial",
      "Patios de maniobra y zonas de cargue",
      "Pisos industriales de alta resistencia",
      "Cumplimiento normativo para uso industrial",
    ],
    heroGradient: "from-slate-800 via-orange-700 to-orange-500",
    icon: "warehouse",
    whatsappMessage:
      "Hola, quiero información sobre Construcción de Bodegas con Grupo Saly.",
  },
];

export const VENTAS_SERVICE = {
  slug: "venta-proyectos",
  title: "Venta de Proyectos de Vivienda",
  shortTitle: "Venta de Inmuebles",
  tagline: "Casas, edificios, locales y bodegas listos para invertir",
  description:
    "Conoce nuestro portafolio de inmuebles disponibles: casas, edificios, locales comerciales y bodegas listos para la venta.",
  icon: "key" as const,
  heroGradient: "from-orange-600 via-amber-500 to-orange-400",
  whatsappMessage:
    "Hola, quiero información sobre los proyectos de vivienda en venta de Grupo Saly.",
};

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
