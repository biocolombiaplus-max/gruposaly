// Types and content shared between server code and the client calendar
// component. Pure data — safe for client bundles.

export type Pillar =
  | "marca"
  | "tip"
  | "antes"
  | "mito"
  | "cifra"
  | "servicio"
  | "testimonio"
  | "detras"
  | "descanso";

export type ContentFormat = "reel" | "carrusel" | "foto" | "descanso";

export interface ReelScript {
  hook: string;
  body: string[];
  cta: string;
  location: string;
  shots: string[];
  duration: string;
  overlay: string[];
  audio: string;
  editing: string;
}

export interface CalendarDay {
  day: number;
  weekday: string;
  week: number;
  format: ContentFormat;
  pillar: Pillar;
  title: string;
  caption: string;
  hashtags: string[];
  production?: string;
  script?: ReelScript;
}

export const PILLARS: Record<Pillar, { label: string; dot: string }> = {
  marca: { label: "Marca / Equipo", dot: "bg-brand-400" },
  tip: { label: "Tip / Consejo", dot: "bg-sky-400" },
  antes: { label: "Antes y después", dot: "bg-emerald-400" },
  mito: { label: "Mito vs. realidad", dot: "bg-pink-400" },
  cifra: { label: "Cifras y datos", dot: "bg-yellow-400" },
  servicio: { label: "Servicio destacado", dot: "bg-orange-400" },
  testimonio: { label: "Prueba social", dot: "bg-violet-400" },
  detras: { label: "Detrás de cámaras", dot: "bg-blue-400" },
  descanso: { label: "Historias / descanso", dot: "bg-slate-400" },
};

export const FORMAT_LABELS: Record<ContentFormat, string> = {
  reel: "Reel",
  carrusel: "Carrusel",
  foto: "Foto",
  descanso: "Historias",
};

export const CONTENT_CALENDAR: CalendarDay[] = [
  {
    day: 1, weekday: "Lunes", week: 1, format: "reel", pillar: "marca",
    title: "Preséntate: quién es Linda y qué es Grupo Saly",
    caption:
      "Si estás pensando en construir, remodelar o invertir en un inmueble, este es tu lugar.\n\nSoy Linda, fundadora de Grupo Saly. Llevamos más de 12 años construyendo y remodelando en Colombia — desde casas y edificios hasta infraestructura hospitalaria, locales y bodegas.\n\nAquí te voy a mostrar el proceso real detrás de cada obra, tips antes de invertir tu dinero, y todo lo que normalmente no te cuentan.\n\n¿Tienes un proyecto en mente? Escríbenos.",
    hashtags: ["GrupoSaly", "ConstructoraColombia", "Construccion", "Remodelaciones", "FincaRaizColombia", "Colombia", "ProyectosDeVivienda"],
    script: {
      hook: "Si estás pensando en construir, remodelar o invertir en un inmueble... este es tu lugar.",
      body: [
        "Soy Linda, fundadora de Grupo Saly.",
        "Llevamos más de 12 años construyendo y remodelando en Colombia — desde casas y edificios hasta infraestructura hospitalaria.",
        "Aquí voy a mostrarte el proceso real detrás de cada obra, tips antes de que inviertas tu dinero y todo lo que normalmente no te cuentan.",
      ],
      cta: "Sígueme y acompáñanos — empezamos.",
      location: "Oficina o una obra en curso, con buena luz natural de frente.",
      shots: ["Toma principal hablando a cámara (puedes cortarla en 2-3 tomas si te trabas)", "2-3 segundos de b-roll de obra o de tu equipo al cierre"],
      duration: "25–35 segundos",
      overlay: ["¿Vas a construir o remodelar? (aparece en los primeros 2 segundos)"],
      audio: "Tu propia voz + música suave de fondo, bien baja de volumen.",
      editing: "Corta silencios y muletillas, agrega subtítulos automáticos y cierra con el logo 1 segundo.",
    },
  },
  {
    day: 2, weekday: "Martes", week: 1, format: "carrusel", pillar: "tip",
    title: "5 señales de que tu casa necesita una remodelación",
    caption:
      "5 señales de que ya es momento de remodelar 👇\n\n1. Las instalaciones eléctricas tienen más de 20 años\n2. Hay humedad o grietas que reaparecen aunque las pintes\n3. La cocina o el baño no rinden para tu rutina diaria\n4. Sientes que el espacio \"se quedó pequeño\" para tu familia\n5. Quieres vender y necesitas que el inmueble se valorice\n\n¿Cuál de estas te suena? Cuéntanos en los comentarios.",
    hashtags: ["Remodelaciones", "RemodelacionDeCasas", "TipsDeHogar", "ConstructoraColombia", "GrupoSaly", "AntesYDespues"],
    production: "Carrusel de 6 slides: portada + una señal por slide, con ícono simple y fondo de color sólido de marca. Usa plantilla de Canva tipo 'lista numerada'.",
  },
  {
    day: 3, weekday: "Miércoles", week: 1, format: "foto", pillar: "antes",
    title: "Antes y después — Remodelaciones",
    caption:
      "De esto... a esto. 🧡\n\nAsí transformamos este espacio con Grupo Saly — mismo lugar, otra vida.\n\n¿Tienes un espacio que necesita este cambio? Escríbenos y te damos una visita técnica gratis.",
    hashtags: ["AntesYDespues", "Remodelaciones", "GrupoSaly", "RemodelacionDeCocinas", "DiseñoDeInteriores", "ConstructoraColombia"],
    production: "Foto dividida en dos (antes arriba, después abajo) de un proyecto real de remodelación ya entregado. Si no hay foto del 'antes', usa solo el 'después' con el texto 'Proyecto entregado' en vez de antes/después.",
  },
  {
    day: 4, weekday: "Jueves", week: 1, format: "carrusel", pillar: "mito",
    title: "Mito: \"Remodelar siempre sale más caro que construir de cero\"",
    caption:
      "MITO: Remodelar siempre sale más caro que construir de cero.\n\nREALIDAD: depende del alcance. Una remodelación bien planeada —aprovechando estructura, instalaciones y cimentación existentes— puede costar entre 40% y 60% menos que una construcción nueva del mismo tamaño.\n\nLa clave está en el diagnóstico inicial: por eso siempre empezamos con una visita técnica antes de cotizar.\n\n¿Tienes dudas sobre tu proyecto? Escríbenos.",
    hashtags: ["MitosYRealidades", "Remodelaciones", "ConstructoraColombia", "GrupoSaly", "TipsDeConstruccion", "PresupuestoDeObra"],
    production: "Carrusel de 2 slides: slide 1 en rojo/oscuro con 'MITO' + la frase; slide 2 en verde/marca con 'REALIDAD' + la explicación corta.",
  },
  {
    day: 5, weekday: "Viernes", week: 1, format: "reel", pillar: "detras",
    title: "Un día real de obra — construcción de casas",
    caption:
      "Así se ve un día real de obra con Grupo Saly 👷\n\nDesde la cimentación hasta los acabados, cada etapa tiene su propio equipo y su propio control de calidad.\n\n¿Quieres construir así de en serio? Escríbenos y cotiza gratis.",
    hashtags: ["DetrasDeCamaras", "ConstruccionDeCasas", "GrupoSaly", "ConstructoraColombia", "ObraEnProceso", "Colombia"],
    script: {
      hook: "Video de obra en movimiento, sin narración — el texto en pantalla cuenta la historia.",
      body: [
        "Clip 1 (5-8s): el equipo llegando o empezando la jornada",
        "Clip 2 (5-8s): avance de estructura o mampostería",
        "Clip 3 (5-8s): detalle de un acabado o de una herramienta/maquinaria en uso",
        "Clip 4 (5-8s): el equipo trabajando en conjunto, ambiente positivo",
      ],
      cta: "Así construimos tu proyecto, paso a paso. Escríbenos y cotiza gratis.",
      location: "La obra de casas que esté activa esa semana.",
      shots: ["4 clips cortos de 5-8 segundos cada uno, varios ángulos", "Camina despacio al grabar, no muevas el celular de golpe"],
      duration: "20–30 segundos en total",
      overlay: ["Clip 1: \"Cimentación\"", "Clip 2: \"Estructura\"", "Clip 3: \"Acabados\"", "Clip 4: \"Así construimos tu proyecto\""],
      audio: "Audio de tendencia de Reels (instrumental, ritmo medio) — búscalo en el buscador de audios al crear el Reel.",
      editing: "Corta al ritmo de la música, texto blanco con fondo semitransparente para que se lea sobre cualquier imagen.",
    },
  },
  {
    day: 6, weekday: "Sábado", week: 1, format: "carrusel", pillar: "cifra",
    title: "Las cifras detrás de Grupo Saly",
    caption:
      "Los números no mienten 🧡\n\n+12 años de experiencia\n+120 proyectos entregados\n+45.000 m² construidos\n98% de clientes satisfechos\n\nGracias por confiar en nosotros para construir y remodelar en Colombia.",
    hashtags: ["GrupoSaly", "ConstructoraColombia", "ResultadosReales", "Construccion", "Colombia"],
    production: "Carrusel o foto única en fondo oscuro de marca con las 4 cifras en tipografía grande (igual a la sección 'Cifras y Resultados' del sitio web).",
  },
  {
    day: 7, weekday: "Domingo", week: 1, format: "descanso", pillar: "descanso",
    title: "Día libre de feed",
    caption: "", hashtags: [],
    production: "No publiques en el feed hoy. Sube una historia reciclando el contenido de la semana (ej. repite el Reel más visto) o lanza una encuesta: \"¿Qué te gustaría ver más: tips, procesos de obra o proyectos terminados?\"",
  },

  {
    day: 8, weekday: "Lunes", week: 2, format: "carrusel", pillar: "tip",
    title: "Qué revisar antes de comprar una casa usada",
    caption:
      "Antes de comprar una casa usada, revisa esto 👇\n\n1. Estado real de la estructura (grietas, humedad, nivelación)\n2. Antigüedad de instalaciones eléctricas e hidráulicas\n3. Papeles en regla: escritura, paz y salvo, certificado de libertad\n4. Entorno: servicios, vías de acceso, proyectos futuros en la zona\n5. Potencial de remodelación si algo no te convence del todo\n\nEn Grupo Saly te acompañamos en todo el proceso de compra, con asesoría legal incluida.",
    hashtags: ["FincaRaizColombia", "ComprarCasa", "VentaDeInmuebles", "GrupoSaly", "TipsInmobiliarios", "Colombia"],
    production: "Carrusel de 6 slides: portada + un punto por slide, ícono tipo checklist.",
  },
  {
    day: 9, weekday: "Martes", week: 2, format: "reel", pillar: "marca",
    title: "Así trabajamos: nuestro proceso en 4 pasos",
    caption:
      "¿Sabes qué pasa realmente cuando contratas una constructora? 👇\n\n1. Diagnóstico y diseño\n2. Presupuesto y planeación\n3. Ejecución de obra\n4. Entrega llave en mano\n\nAsí trabajamos en Grupo Saly, sin sorpresas en el camino. ¿Tienes un proyecto en mente? Escríbenos.",
    hashtags: ["GrupoSaly", "ConstructoraColombia", "ProcesoDeObra", "Construccion", "Remodelaciones"],
    script: {
      hook: "¿Sabes qué pasa realmente cuando contratas una constructora?",
      body: [
        "Paso 1 — Diagnóstico y diseño: visita técnica, levantamiento de necesidades y diseño arquitectónico.",
        "Paso 2 — Presupuesto y planeación: presupuesto detallado, cronograma de obra y definición de materiales.",
        "Paso 3 — Ejecución de obra: construcción con supervisión permanente y control de calidad.",
        "Paso 4 — Entrega llave en mano: revisión final y garantía sobre la obra entregada.",
      ],
      cta: "Así trabajamos en Grupo Saly, sin sorpresas. ¿Tienes un proyecto en mente? Escríbenos.",
      location: "Oficina o frente a una obra, de pie, mirando a cámara.",
      shots: ["Una sola toma hablando a cámara, puedes apoyarte en notas fuera de cuadro"],
      duration: "35–45 segundos",
      overlay: ["Muestra el número y el nombre de cada paso justo cuando lo menciones (1. Diagnóstico, 2. Presupuesto...)"],
      audio: "Tu propia voz.",
      editing: "Sincroniza los 4 textos numerados con lo que vas diciendo, agrega subtítulos.",
    },
  },
  {
    day: 10, weekday: "Miércoles", week: 2, format: "foto", pillar: "servicio",
    title: "Infraestructura hospitalaria: por qué es distinta",
    caption:
      "Construir una clínica no es como construir una casa.\n\nRequiere cumplir normativa de habilitación en salud, diseñar flujos de circulación y bioseguridad, y manejar redes hidrosanitarias y eléctricas especializadas.\n\nEn Grupo Saly trabajamos junto a los equipos de auditoría médica de nuestros clientes para entregar espacios listos para habilitación.",
    hashtags: ["InfraestructuraHospitalaria", "ConstructoraColombia", "GrupoSaly", "SectorSalud", "Construccion"],
    production: "Foto de una obra o espacio de salud terminado (clínica, IPS, consultorio). Si no hay foto propia, usa un render o foto de planos técnicos del proyecto.",
  },
  {
    day: 11, weekday: "Jueves", week: 2, format: "carrusel", pillar: "mito",
    title: "Mito: \"Necesito contratar arquitecto, ingeniero y constructor por separado\"",
    caption:
      "MITO: Para construir necesitas contratar arquitecto, ingeniero y constructor por separado.\n\nREALIDAD: con un equipo integral como Grupo Saly, un solo interlocutor responde por diseño, presupuesto y ejecución — sin que tengas que coordinar tres proveedores distintos.\n\nMenos dolores de cabeza, más control sobre tu proyecto.",
    hashtags: ["MitosYRealidades", "ConstructoraColombia", "GrupoSaly", "GerenciaDeProyectos", "Construccion"],
    production: "Carrusel de 2 slides, mismo formato MITO/REALIDAD del Día 4.",
  },
  {
    day: 12, weekday: "Viernes", week: 2, format: "reel", pillar: "antes",
    title: "Transformación real: antes y después",
    caption: "Así estaba este espacio... y así quedó con Grupo Saly. 🧡\n\n¿Tu espacio necesita esta transformación? Escríbenos.",
    hashtags: ["AntesYDespues", "Remodelaciones", "GrupoSaly", "Transformacion", "ConstructoraColombia"],
    script: {
      hook: "Toma del 'antes' con el texto: \"Así estaba este espacio...\"",
      body: [
        "Transición rápida (corte seco o efecto 'swipe') al 'después' con el texto: \"...y así quedó con Grupo Saly\"",
        "Si tienes más de un proyecto con fotos de antes/después, repite el mismo patrón 2 o 3 veces",
      ],
      cta: "¿Tu espacio necesita esta transformación? Escríbenos.",
      location: "No requiere grabación nueva si ya tienes fotos del antes y el después — se arma en edición.",
      shots: ["Si solo tienes fotos (no video), aplica un leve zoom/movimiento a cada una en la app de edición para que no se vean estáticas"],
      duration: "15–25 segundos",
      overlay: ["\"Así estaba este espacio...\"", "\"...y así quedó con Grupo Saly\""],
      audio: "Busca un audio de tendencia de \"transición\" en el buscador de Reels — hay plantillas pensadas justo para antes/después.",
      editing: "En CapCut, busca la plantilla \"antes y después\" — ya trae la transición lista, solo reemplazas las fotos.",
    },
  },
  {
    day: 13, weekday: "Sábado", week: 2, format: "carrusel", pillar: "tip",
    title: "3 preguntas para hacerle a tu constructor antes de firmar",
    caption:
      "3 preguntas que debes hacerle a tu constructor antes de firmar 👇\n\n1. ¿El presupuesto incluye imprevistos o puede subir a mitad de obra?\n2. ¿Quién responde si algo sale mal después de la entrega?\n3. ¿Voy a tener un solo contacto durante todo el proyecto, o varios?\n\nSi no te dan respuestas claras, es una señal de alerta.",
    hashtags: ["TipsDeConstruccion", "ConstructoraColombia", "GrupoSaly", "Remodelaciones", "Construccion"],
    production: "Carrusel de 4 slides: portada + una pregunta por slide.",
  },
  {
    day: 14, weekday: "Domingo", week: 2, format: "descanso", pillar: "descanso",
    title: "Día libre de feed",
    caption: "", hashtags: [],
    production: "No publiques en el feed. Sube a historias una foto del equipo trabajando esta semana, o pregunta abierta: \"¿Qué tipo de proyecto tienes en mente?\" con opciones (Casa / Remodelación / Local / Bodega).",
  },

  {
    day: 15, weekday: "Lunes", week: 3, format: "reel", pillar: "testimonio",
    title: "Un proyecto retador que construimos",
    caption:
      "Este fue uno de los proyectos más retadores que hemos construido.\n\nTe cuento qué pasó, qué hicimos y cómo quedó.\n\nSi tienes un proyecto que parece complicado, hablemos — lo hacemos posible.",
    hashtags: ["GrupoSaly", "CasoDeExito", "ConstructoraColombia", "Construccion", "ProyectosDeVivienda"],
    script: {
      hook: "Este fue uno de los proyectos más retadores que hemos construido...",
      body: [
        "El reto: cuenta brevemente qué dificultad tenía el proyecto (terreno complicado, plazo ajustado, cambios de diseño, etc.)",
        "Qué hicimos: cómo lo resolvió tu equipo",
        "El resultado: cómo quedó y qué dijo el cliente",
      ],
      cta: "Si tienes un proyecto que parece complicado, hablemos. Lo hacemos posible.",
      location: "Idealmente en el proyecto terminado; si no es posible, en oficina con fotos del proyecto a la mano para insertar en edición.",
      shots: ["Toma principal hablando a cámara", "2-3 fotos del proyecto terminado para insertar como cortes mientras hablas (cutaways)"],
      duration: "30–40 segundos",
      overlay: ["Opcional: nombre del tipo de proyecto, ej. \"Bodega industrial · 2024\""],
      audio: "Tu propia voz + música suave de fondo.",
      editing: "Inserta las fotos del proyecto en los momentos donde las menciones, vuelve a tu cara para el cierre.",
    },
  },
  {
    day: 16, weekday: "Martes", week: 3, format: "carrusel", pillar: "cifra",
    title: "¿Sabías esto sobre construir en Colombia?",
    caption:
      "¿Sabías que toda construcción en Colombia debe cumplir la norma NSR-10 de sismo resistencia?\n\nEn Grupo Saly la aplicamos en el 100% de nuestros proyectos — casas, edificios, bodegas y locales — porque la seguridad estructural no es negociable.\n\nConstruir bien también es construir seguro.",
    hashtags: ["NSR10", "ConstructoraColombia", "GrupoSaly", "SeguridadEstructural", "Construccion"],
    production: "Carrusel o foto única con el dato destacado en tipografía grande sobre foto de estructura/obra.",
  },
  {
    day: 17, weekday: "Miércoles", week: 3, format: "foto", pillar: "servicio",
    title: "Locales comerciales: lo que debes resolver antes de abrir",
    caption:
      "Antes de abrir tu local, resuelve esto:\n\n• Adecuaciones eléctricas y de redes de datos\n• Fachada e iluminación comercial\n• Acabados de alto tránsito que aguanten el uso diario\n\nEn Grupo Saly construimos pensando en tu fecha de apertura, no solo en la obra.",
    hashtags: ["LocalesComerciales", "ConstructoraColombia", "GrupoSaly", "Negocios", "Construccion"],
    production: "Foto de un local comercial construido o en adecuación por Grupo Saly.",
  },
  {
    day: 18, weekday: "Jueves", week: 3, format: "carrusel", pillar: "tip",
    title: "Cómo calcular el presupuesto real de tu remodelación",
    caption:
      "Lo que nadie te dice sobre el presupuesto de una remodelación 👇\n\n1. Separa materiales, mano de obra y diseño — cada uno pesa distinto\n2. Deja un 10-15% extra para imprevistos (siempre aparece algo)\n3. Los acabados pueden variar 2-3 veces el precio según la calidad que elijas\n4. Pide el presupuesto por escrito y detallado, no un número \"al ojo\"\n\nEn Grupo Saly siempre entregamos presupuesto detallado, sin costos ocultos.",
    hashtags: ["PresupuestoDeObra", "Remodelaciones", "ConstructoraColombia", "GrupoSaly", "TipsDeConstruccion"],
    production: "Carrusel de 5 slides: portada + un punto por slide.",
  },
  {
    day: 19, weekday: "Viernes", week: 3, format: "reel", pillar: "detras",
    title: "Detrás de cámaras: estructura de una bodega",
    caption:
      "Así se levanta una bodega industrial con Grupo Saly 🏗️\n\nEstructura metálica, capacidad de carga calculada y acabados pensados para la operación real de tu negocio.\n\n¿Necesitas una bodega o centro de distribución? Escríbenos.",
    hashtags: ["BodegasIndustriales", "DetrasDeCamaras", "GrupoSaly", "ConstructoraColombia", "Construccion"],
    script: {
      hook: "Video de obra en movimiento, sin narración obligatoria — mismo formato del Día 5.",
      body: [
        "Clip 1: llegada de material o estructura metálica",
        "Clip 2: avance de montaje de estructura",
        "Clip 3: detalle de soldadura, pisos industriales o cubierta",
        "Clip 4: vista general del avance",
      ],
      cta: "¿Necesitas una bodega o centro de distribución? Escríbenos.",
      location: "La obra de bodegas/industrial activa esa semana.",
      shots: ["4 clips de 5-8 segundos, varios ángulos, cámara estable"],
      duration: "20–30 segundos",
      overlay: ["\"Estructura metálica\"", "\"Montaje\"", "\"Acabados industriales\"", "\"Así construimos tu bodega\""],
      audio: "Audio de tendencia de Reels, ritmo medio-alto.",
      editing: "Cortes rápidos al ritmo de la música.",
    },
  },
  {
    day: 20, weekday: "Sábado", week: 3, format: "carrusel", pillar: "tip",
    title: "3 preguntas frecuentes, respondidas rápido",
    caption:
      "Responde rápido a lo que más nos preguntan 👇\n\n¿Cuánto se demora remodelar una cocina?\nEntre 3 y 6 semanas, según el alcance.\n\n¿Necesito licencia para remodelar?\nDepende de si modificas estructura o solo acabados — te asesoramos antes de empezar.\n\n¿Hacen crédito directo para comprar inmuebles?\nSí, analizamos tu caso y te ayudamos con el trámite.",
    hashtags: ["PreguntasFrecuentes", "GrupoSaly", "ConstructoraColombia", "Remodelaciones", "FincaRaizColombia"],
    production: "Carrusel de 4 slides: portada + una pregunta/respuesta por slide.",
  },
  {
    day: 21, weekday: "Domingo", week: 3, format: "descanso", pillar: "descanso",
    title: "Día libre de feed",
    caption: "", hashtags: [],
    production: "No publiques en el feed. Historia con una cifra destacada (ej. '+120 proyectos entregados') o repost del Reel con más interacción de la semana.",
  },

  {
    day: 22, weekday: "Lunes", week: 4, format: "carrusel", pillar: "servicio",
    title: "3 cosas que mirar antes de invertir en un edificio",
    caption:
      "Antes de invertir en un edificio, revisa esto 👇\n\n1. Estudio de factibilidad real, no solo el diseño bonito\n2. Quién lleva la gerencia del proyecto y el control de costos\n3. Cumplimiento de normativa NSR-10 desde el diseño estructural\n\nEn Grupo Saly acompañamos desde el estudio de factibilidad hasta la entrega de cada unidad.",
    hashtags: ["Edificios", "InversionInmobiliaria", "ConstructoraColombia", "GrupoSaly", "Construccion"],
    production: "Carrusel de 4 slides: portada + un punto por slide.",
  },
  {
    day: 23, weekday: "Martes", week: 4, format: "reel", pillar: "tip",
    title: "El error #1 al remodelar",
    caption:
      "Este es el error #1 que cometen las personas al remodelar.\n\nNo definir el presupuesto completo antes de empezar: muchos arrancan la obra sin un margen para imprevistos y terminan deteniendo el proyecto a mitad de camino.\n\nPor eso en Grupo Saly siempre entregamos un presupuesto detallado, con ese margen incluido, antes de firmar.\n\n¿Quieres un presupuesto real para tu remodelación? Escríbenos.",
    hashtags: ["Remodelaciones", "TipsDeConstruccion", "GrupoSaly", "PresupuestoDeObra", "ConstructoraColombia"],
    script: {
      hook: "Este es el error número uno que cometen las personas cuando van a remodelar...",
      body: [
        "No definir el presupuesto completo antes de empezar.",
        "Muchos arrancan la obra sin contemplar imprevistos (mínimo 10-15% extra) y terminan deteniendo el proyecto a mitad de camino.",
        "Por eso en Grupo Saly siempre hacemos un presupuesto detallado y te mostramos ese margen antes de firmar.",
      ],
      cta: "¿Quieres un presupuesto real para tu remodelación? Escríbenos.",
      location: "Oficina, tono cercano y conversacional, como si le hablaras a un amigo.",
      shots: ["Una sola toma hablando a cámara"],
      duration: "25–35 segundos",
      overlay: ["\"ERROR #1\" en grande, en los primeros 2 segundos"],
      audio: "Tu propia voz.",
      editing: "Subtítulos automáticos, remarca \"ERROR #1\" con una animación simple de texto.",
    },
  },
  {
    day: 24, weekday: "Miércoles", week: 4, format: "foto", pillar: "antes",
    title: "Antes y después — Bodegas",
    caption: "De lote vacío a bodega operativa. 🧡\n\nEstructura metálica, pisos industriales y todo listo para que tu operación arranque sin contratiempos.",
    hashtags: ["AntesYDespues", "BodegasIndustriales", "GrupoSaly", "ConstructoraColombia", "Construccion"],
    production: "Foto dividida: lote antes de construir / bodega terminada. Si no hay foto del lote, usa solo el 'después' con texto 'Proyecto entregado'.",
  },
  {
    day: 25, weekday: "Jueves", week: 4, format: "carrusel", pillar: "mito",
    title: "Mito: \"Necesito todos los permisos listos antes de cotizar\"",
    caption:
      "MITO: Necesito tener todos los permisos y licencias listos antes de pedir una cotización.\n\nREALIDAD: en Grupo Saly te acompañamos también en la gestión de licencias de construcción — no necesitas resolver eso solo antes de hablar con nosotros.\n\nEmpecemos por tu proyecto, el resto lo vemos juntos.",
    hashtags: ["MitosYRealidades", "ConstructoraColombia", "GrupoSaly", "LicenciasDeConstruccion", "Construccion"],
    production: "Carrusel de 2 slides, mismo formato MITO/REALIDAD.",
  },
  {
    day: 26, weekday: "Viernes", week: 4, format: "reel", pillar: "antes",
    title: "Recorrido de un proyecto terminado",
    caption: "Les muestro cómo quedó este proyecto 👇\n\n¿Quieres un proyecto así? Hablemos por WhatsApp.",
    hashtags: ["ProyectoTerminado", "GrupoSaly", "ConstructoraColombia", "Remodelaciones", "Construccion"],
    script: {
      hook: "Primera toma del espacio terminado con el texto: \"Les muestro cómo quedó este proyecto 👇\"",
      body: [
        "Camina despacio por el espacio mostrando los detalles y acabados",
        "Puedes narrar brevemente lo más destacado o dejar que hable solo el video con música",
      ],
      cta: "¿Quieres un proyecto así? Hablemos por WhatsApp.",
      location: "El proyecto terminado (casa, local, oficina, etc.)",
      shots: ["Camina en una sola toma continua si es posible, celular con las dos manos para que no tiemble", "Si prefieres, graba 3-4 clips cortos en distintos ángulos del espacio"],
      duration: "25–40 segundos",
      overlay: ["Opcional: nombre del espacio o del tipo de proyecto"],
      audio: "Audio suave de tendencia, o tu propia voz narrando.",
      editing: "Si narras, deja la voz como está; si no, sube el volumen de la música y agrega el texto del CTA al final.",
    },
  },
  {
    day: 27, weekday: "Sábado", week: 4, format: "carrusel", pillar: "testimonio",
    title: "Lo que dicen nuestros clientes",
    caption:
      "\"El equipo de Grupo Saly cumplió cada fecha del cronograma y la comunicación fue clara de principio a fin.\"\n\nGracias por confiar en nosotros para construir tu proyecto. Así seguimos construyendo, un cliente satisfecho a la vez.",
    hashtags: ["Testimonios", "GrupoSaly", "ConstructoraColombia", "ClientesSatisfechos", "Construccion"],
    production: "Foto o carrusel en formato 'cita' (comillas grandes + frase) sobre foto del proyecto terminado. Usa una frase real de un cliente si la tienes.",
  },
  {
    day: 28, weekday: "Domingo", week: 4, format: "descanso", pillar: "descanso",
    title: "Día libre de feed",
    caption: "", hashtags: [],
    production: "No publiques en el feed. Historia con una pregunta: \"¿Qué proyecto te gustaría ver en Grupo Saly el próximo mes?\"",
  },

  {
    day: 29, weekday: "Lunes", week: 5, format: "reel", pillar: "marca",
    title: "Así fue nuestro mes — cierre y agradecimiento",
    caption:
      "Así se vio nuestro mes en Grupo Saly 🧡\n\nGracias por seguirnos y por confiar en nosotros para construir y remodelar en Colombia.\n\nSi tienes un proyecto para el próximo mes, este es el momento de cotizar.",
    hashtags: ["GrupoSaly", "ConstructoraColombia", "ResumenDelMes", "Construccion", "Colombia"],
    script: {
      hook: "Así se vio nuestro mes en Grupo Saly 🧡 (collage de clips/fotos del mes con música)",
      body: [
        "Reúne los clips y fotos más destacados del mes (obra, equipo, proyectos entregados)",
        "Cierra con una toma tuya hablando a cámara: un mensaje corto de agradecimiento",
      ],
      cta: "Gracias por seguirnos. Si tienes un proyecto para el próximo mes, este es el momento de cotizar.",
      location: "Collage de material ya grabado + una toma final tuya en oficina u obra.",
      shots: ["4-6 clips cortos del mes, 2-3 segundos cada uno", "Toma final hablando a cámara para el cierre"],
      duration: "30–45 segundos",
      overlay: ["Opcional: \"Así fue nuestro mes\" al inicio"],
      audio: "Música emotiva o de tendencia, suave.",
      editing: "Cortes al ritmo de la música para el collage, vuelve a tu voz real para el cierre y el CTA.",
    },
  },
  {
    day: 30, weekday: "Martes", week: 5, format: "carrusel", pillar: "servicio",
    title: "3 razones para invertir en finca raíz ahora",
    caption:
      "3 razones para invertir en finca raíz ahora 👇\n\n1. Los inmuebles bien ubicados se valorizan con el tiempo\n2. Puedes acceder a crédito directo — te ayudamos con todo el trámite\n3. Tenemos inventario actualizado de casas, edificios, locales y bodegas listos\n\nConoce nuestro portafolio disponible y agenda tu visita guiada.",
    hashtags: ["FincaRaizColombia", "VentaDeInmuebles", "InversionInmobiliaria", "GrupoSaly", "Colombia"],
    production: "Carrusel de 4 slides: portada + una razón por slide + slide final con CTA a WhatsApp y foto de un inmueble disponible.",
  },
];
