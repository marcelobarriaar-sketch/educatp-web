export type SpecialtyId = "all" | "administracion" | "agricola" | "parvularia";
export type LevelId = "all" | "3medio" | "4medio" | "general";
export type GameType =
  | "trivia"
  | "memorice"
  | "ruleta"
  | "escape"
  | "desafio"
  | "externo";

export type PlaygroundGame = {
  id: string;
  title: string;
  description: string;
  specialtyId: SpecialtyId;
  specialtyName: string;
  levelId: LevelId;
  levelName: string;
  subject: string;
  type: GameType;
  typeName: string;
  url: string;
  estimatedTime: string;
  difficulty: "Inicial" | "Intermedio" | "Desafío";
  featured?: boolean;
  available: boolean;
};

export const games: PlaygroundGame[] = [
  {
    id: "trivia-tp-general",
    title: "Trivia TP: ¿Cuánto sabes de la educación técnico profesional?",
    description:
      "Juego de preguntas rápidas para activar conocimientos sobre especialidades, mundo laboral y formación TP.",
    specialtyId: "all",
    specialtyName: "Todas las especialidades",
    levelId: "general",
    levelName: "General",
    subject: "Formación Técnico Profesional",
    type: "trivia",
    typeName: "Trivia",
    url: "#",
    estimatedTime: "10 min",
    difficulty: "Inicial",
    featured: true,
    available: false,
  },
  {
    id: "memorice-conceptos-administracion",
    title: "Memorice de conceptos administrativos",
    description:
      "Actividad para relacionar conceptos clave como organización, gestión, archivo, atención al cliente y procesos administrativos.",
    specialtyId: "administracion",
    specialtyName: "Administración",
    levelId: "3medio",
    levelName: "3° Medio TP",
    subject: "Procesos Administrativos",
    type: "memorice",
    typeName: "Memorice",
    url: "#",
    estimatedTime: "15 min",
    difficulty: "Inicial",
    featured: true,
    available: false,
  },
  {
    id: "ruleta-legislacion-laboral",
    title: "Ruleta de Legislación Laboral",
    description:
      "Desafío de preguntas al azar sobre contrato de trabajo, jornada laboral, remuneraciones, derechos y deberes laborales.",
    specialtyId: "administracion",
    specialtyName: "Administración",
    levelId: "4medio",
    levelName: "4° Medio TP",
    subject: "Legislación Laboral",
    type: "ruleta",
    typeName: "Ruleta",
    url: "#",
    estimatedTime: "20 min",
    difficulty: "Intermedio",
    available: false,
  },
  {
    id: "escape-oficina",
    title: "Escape Room: La oficina en crisis",
    description:
      "Los estudiantes deberán resolver problemas de comunicación, organización documental y atención a clientes para superar el desafío.",
    specialtyId: "administracion",
    specialtyName: "Administración",
    levelId: "3medio",
    levelName: "3° Medio TP",
    subject: "Organización de Oficinas",
    type: "escape",
    typeName: "Escape Room",
    url: "#",
    estimatedTime: "35 min",
    difficulty: "Desafío",
    available: false,
  },
  {
    id: "desafio-cuidado-animal",
    title: "Desafío pecuario: decisiones en terreno",
    description:
      "Juego de casos donde se deben tomar decisiones relacionadas con bienestar animal, alimentación, higiene y manejo productivo.",
    specialtyId: "agricola",
    specialtyName: "Técnico Agrícola",
    levelId: "3medio",
    levelName: "3° Medio TP",
    subject: "Manejo Pecuario",
    type: "desafio",
    typeName: "Desafío",
    url: "#",
    estimatedTime: "25 min",
    difficulty: "Intermedio",
    featured: true,
    available: false,
  },
  {
    id: "trivia-parvularia",
    title: "Trivia de Educación Parvularia",
    description:
      "Preguntas breves sobre juego, cuidado, seguridad, desarrollo infantil y rol de la técnico en educación parvularia.",
    specialtyId: "parvularia",
    specialtyName: "Educación Parvularia",
    levelId: "4medio",
    levelName: "4° Medio TP",
    subject: "Desarrollo y Bienestar Infantil",
    type: "trivia",
    typeName: "Trivia",
    url: "#",
    estimatedTime: "15 min",
    difficulty: "Inicial",
    available: false,
  },
];
