// Departamentos de Colombia con sus municipios/ciudades principales.
// No es la lista exhaustiva de los ~1100 municipios del país — cubre las
// ciudades y municipios más relevantes de cada departamento para que
// publicar un inmueble sea rápido. El formulario siempre ofrece
// "Otra ciudad" para escribir un municipio que no esté en la lista.
export const COLOMBIA_DEPARTMENTS: { name: string; cities: string[] }[] = [
  {
    name: "Bogotá D.C.",
    cities: ["Bogotá"],
  },
  {
    name: "Amazonas",
    cities: ["Leticia", "Puerto Nariño"],
  },
  {
    name: "Antioquia",
    cities: [
      "Medellín",
      "Envigado",
      "Itagüí",
      "Bello",
      "Sabaneta",
      "La Estrella",
      "Copacabana",
      "Caldas",
      "Girardota",
      "Rionegro",
      "Marinilla",
      "El Retiro",
      "La Ceja",
      "Guarne",
      "Apartadó",
      "Turbo",
      "Necoclí",
      "Chigorodó",
    ],
  },
  {
    name: "Arauca",
    cities: ["Arauca", "Saravena", "Tame", "Arauquita"],
  },
  {
    name: "Atlántico",
    cities: ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia", "Sabanalarga", "Galapa"],
  },
  {
    name: "Bolívar",
    cities: ["Cartagena", "Magangué", "Turbaco", "Arjona", "El Carmen de Bolívar"],
  },
  {
    name: "Boyacá",
    cities: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa", "Villa de Leyva"],
  },
  {
    name: "Caldas",
    cities: ["Manizales", "La Dorada", "Chinchiná", "Villamaría", "Riosucio"],
  },
  {
    name: "Caquetá",
    cities: ["Florencia", "San Vicente del Caguán"],
  },
  {
    name: "Casanare",
    cities: ["Yopal", "Aguazul", "Villanueva", "Tauramena"],
  },
  {
    name: "Cauca",
    cities: ["Popayán", "Santander de Quilichao", "Puerto Tejada"],
  },
  {
    name: "Cesar",
    cities: ["Valledupar", "Aguachica", "Bosconia"],
  },
  {
    name: "Chocó",
    cities: ["Quibdó", "Istmina"],
  },
  {
    name: "Córdoba",
    cities: ["Montería", "Cereté", "Lorica", "Sahagún", "Planeta Rica"],
  },
  {
    name: "Cundinamarca",
    cities: [
      "Soacha",
      "Chía",
      "Zipaquirá",
      "Facatativá",
      "Fusagasugá",
      "Mosquera",
      "Madrid",
      "Funza",
      "Cajicá",
      "Girardot",
      "La Calera",
      "Cota",
      "Sopó",
      "Tenjo",
    ],
  },
  {
    name: "Guainía",
    cities: ["Inírida"],
  },
  {
    name: "Guaviare",
    cities: ["San José del Guaviare"],
  },
  {
    name: "Huila",
    cities: ["Neiva", "Pitalito", "Garzón"],
  },
  {
    name: "La Guajira",
    cities: ["Riohacha", "Maicao", "Uribia"],
  },
  {
    name: "Magdalena",
    cities: ["Santa Marta", "Ciénaga", "Fundación"],
  },
  {
    name: "Meta",
    cities: ["Villavicencio", "Acacías", "Granada"],
  },
  {
    name: "Nariño",
    cities: ["Pasto", "Ipiales", "Tumaco"],
  },
  {
    name: "Norte de Santander",
    cities: ["Cúcuta", "Ocaña", "Pamplona", "Villa del Rosario", "Los Patios"],
  },
  {
    name: "Putumayo",
    cities: ["Mocoa", "Puerto Asís"],
  },
  {
    name: "Quindío",
    cities: ["Armenia", "Calarcá", "La Tebaida", "Montenegro", "Circasia"],
  },
  {
    name: "Risaralda",
    cities: ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia"],
  },
  {
    name: "San Andrés y Providencia",
    cities: ["San Andrés", "Providencia"],
  },
  {
    name: "Santander",
    cities: [
      "Bucaramanga",
      "Floridablanca",
      "Girón",
      "Piedecuesta",
      "Barrancabermeja",
      "San Gil",
      "Málaga",
    ],
  },
  {
    name: "Sucre",
    cities: ["Sincelejo", "Corozal"],
  },
  {
    name: "Tolima",
    cities: ["Ibagué", "Espinal", "Melgar", "Líbano", "Honda"],
  },
  {
    name: "Valle del Cauca",
    cities: [
      "Cali",
      "Palmira",
      "Buenaventura",
      "Tuluá",
      "Cartago",
      "Buga",
      "Jamundí",
      "Yumbo",
      "Candelaria",
    ],
  },
  {
    name: "Vaupés",
    cities: ["Mitú"],
  },
  {
    name: "Vichada",
    cities: ["Puerto Carreño"],
  },
];

export const OTHER_CITY_OPTION = "Otra ciudad (escribir)";
