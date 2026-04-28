import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Baby,
  Beef,
  BookOpen,
  Brain,
  ExternalLink,
  Filter,
  Gamepad2,
  GraduationCap,
  Puzzle,
  Search,
  Shuffle,
  Sparkles,
  Star,
  Trophy,
  Users,
  Wand2,
} from 'lucide-react';

type SpecialtyId = 'all' | 'administracion' | 'agricola' | 'parvularia';
type LevelId = 'all' | '3medio' | '4medio' | 'general';
type GameType = 'trivia' | 'memorice' | 'ruleta' | 'escape' | 'desafio' | 'externo';

type PlaygroundGame = {
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
  difficulty: 'Inicial' | 'Intermedio' | 'Desafío';
  featured?: boolean;
  available: boolean;
};

const specialties = [
  {
    id: 'all' as SpecialtyId,
    name: 'Todas',
    icon: GraduationCap,
  },
  {
    id: 'administracion' as SpecialtyId,
    name: 'Administración',
    icon: Users,
  },
  {
    id: 'agricola' as SpecialtyId,
    name: 'Agrícola',
    icon: Beef,
  },
  {
    id: 'parvularia' as SpecialtyId,
    name: 'Parvularia',
    icon: Baby,
  },
];

const levels = [
  { id: 'all' as LevelId, name: 'Todos los niveles' },
  { id: '3medio' as LevelId, name: '3° Medio TP' },
  { id: '4medio' as LevelId, name: '4° Medio TP' },
  { id: 'general' as LevelId, name: 'General' },
];

const gameTypeIcon: Record<GameType, React.ComponentType<{ className?: string }>> = {
  trivia: Brain,
  memorice: Puzzle,
  ruleta: Shuffle,
  escape: Wand2,
  desafio: Trophy,
  externo: ExternalLink,
};

const games: PlaygroundGame[] = [
  {
    id: 'trivia-tp-general',
    title: 'Trivia TP: ¿Cuánto sabes de la educación técnico profesional?',
    description:
      'Juego de preguntas rápidas para activar conocimientos sobre especialidades, mundo laboral y formación TP.',
    specialtyId: 'all',
    specialtyName: 'Todas las especialidades',
    levelId: 'general',
    levelName: 'General',
    subject: 'Formación Técnico Profesional',
    type: 'trivia',
    typeName: 'Trivia',
    url: '#',
    estimatedTime: '10 min',
    difficulty: 'Inicial',
    featured: true,
    available: false,
  },
  {
    id: 'memorice-conceptos-administracion',
    title: 'Memorice de conceptos administrativos',
    description:
      'Actividad para relacionar conceptos clave como organización, gestión, archivo, atención al cliente y procesos administrativos.',
    specialtyId: 'administracion',
    specialtyName: 'Administración',
    levelId: '3medio',
    levelName: '3° Medio TP',
    subject: 'Procesos Administrativos',
    type: 'memorice',
    typeName: 'Memorice',
    url: '#',
    estimatedTime: '15 min',
    difficulty: 'Inicial',
    featured: true,
    available: false,
  },
  {
    id: 'ruleta-legislacion-laboral',
    title: 'Ruleta de Legislación Laboral',
    description:
      'Desafío de preguntas al azar sobre contrato de trabajo, jornada laboral, remuneraciones, derechos y deberes laborales.',
    specialtyId: 'administracion',
    specialtyName: 'Administración',
    levelId: '4medio',
    levelName: '4° Medio TP',
    subject: 'Legislación Laboral',
    type: 'ruleta',
    typeName: 'Ruleta',
    url: '#',
    estimatedTime: '20 min',
    difficulty: 'Intermedio',
    available: false,
  },
  {
    id: 'escape-oficina',
    title: 'Escape Room: La oficina en crisis',
    description:
      'Los estudiantes deberán resolver problemas de comunicación, organización documental y atención a clientes para superar el desafío.',
    specialtyId: 'administracion',
    specialtyName: 'Administración',
    levelId: '3medio',
    levelName: '3° Medio TP',
    subject: 'Organización de Oficinas',
    type: 'escape',
    typeName: 'Escape Room',
    url: '#',
    estimatedTime: '35 min',
    difficulty: 'Desafío',
    available: false,
  },
  {
    id: 'desafio-cuidado-animal',
    title: 'Desafío pecuario: decisiones en terreno',
    description:
      'Juego de casos donde se deben tomar decisiones relacionadas con bienestar animal, alimentación, higiene y manejo productivo.',
    specialtyId: 'agricola',
    specialtyName: 'Técnico Agrícola',
    levelId: '3medio',
    levelName: '3° Medio TP',
    subject: 'Manejo Pecuario',
    type: 'desafio',
    typeName: 'Desafío',
    url: '#',
    estimatedTime: '25 min',
    difficulty: 'Intermedio',
    featured: true,
    available: false,
  },
  {
    id: 'trivia-parvularia',
    title: 'Trivia de Educación Parvularia',
    description:
      'Preguntas breves sobre juego, cuidado, seguridad, desarrollo infantil y rol de la técnico en educación parvularia.',
    specialtyId: 'parvularia',
    specialtyName: 'Educación Parvularia',
    levelId: '4medio',
    levelName: '4° Medio TP',
    subject: 'Desarrollo y Bienestar Infantil',
    type: 'trivia',
    typeName: 'Trivia',
    url: '#',
    estimatedTime: '15 min',
    difficulty: 'Inicial',
    available: false,
  },
];

function getDifficultyClass(difficulty: PlaygroundGame['difficulty']) {
  if (difficulty === 'Inicial') return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
  if (difficulty === 'Intermedio') return 'bg-yellow-50 text-yellow-700 ring-yellow-200';
  return 'bg-red-50 text-red-700 ring-red-200';
}

function getSpecialtyClass(specialtyId: SpecialtyId) {
  if (specialtyId === 'administracion') return 'from-red-800 to-red-950';
  if (specialtyId === 'agricola') return 'from-emerald-800 to-emerald-950';
  if (specialtyId === 'parvularia') return 'from-yellow-500 to-orange-600';
  return 'from-slate-800 to-slate-950';
}

export default function Playground() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyId>('all');
  const [selectedLevel, setSelectedLevel] = useState<LevelId>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSpecialty = selectedSpecialty === 'all' || game.specialtyId === selectedSpecialty;
      const matchesLevel = selectedLevel === 'all' || game.levelId === selectedLevel;

      const normalizedSearch = searchTerm.trim().toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        game.title.toLowerCase().includes(normalizedSearch) ||
        game.description.toLowerCase().includes(normalizedSearch) ||
        game.subject.toLowerCase().includes(normalizedSearch) ||
        game.specialtyName.toLowerCase().includes(normalizedSearch);

      return matchesSpecialty && matchesLevel && matchesSearch;
    });
  }, [selectedSpecialty, selectedLevel, searchTerm]);

  const featuredGames = games.filter((game) => game.featured);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-emerald-500 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-yellow-500 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white/90">
              <Gamepad2 className="h-4 w-4" />
              Patio de Juegos
            </div>

            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              Aprende jugando, compite sanamente y desafía tu mente TP
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Este espacio reúne trivias, memorices, ruletas, desafíos y experiencias interactivas para reforzar
              contenidos de las especialidades de una forma más dinámica.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#juegos"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-800"
              >
                Explorar juegos
                <Sparkles className="h-4 w-4" />
              </a>

              <a
                href="#destacados"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                Ver destacados
                <Star className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="destacados" className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-yellow-100 p-3">
            <Trophy className="h-6 w-6 text-yellow-700" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Juegos destacados</h2>
            <p className="text-sm text-slate-600">Actividades recomendadas para iniciar la experiencia.</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredGames.map((game, index) => {
            const TypeIcon = gameTypeIcon[game.type];

            return (
              <motion.article
                key={game.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className={`overflow-hidden rounded-3xl bg-gradient-to-br ${getSpecialtyClass(
                  game.specialtyId
                )} p-1 shadow-sm`}
              >
                <div className="flex h-full flex-col rounded-[1.3rem] bg-white p-5">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="rounded-2xl bg-slate-100 p-3">
                      <TypeIcon className="h-6 w-6 text-slate-800" />
                    </div>

                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      Destacado
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900">{game.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{game.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{game.specialtyName}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{game.levelName}</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="juegos" className="mx-auto max-w-7xl px-4 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-700">
                <Filter className="h-4 w-4" />
                Biblioteca interactiva
              </div>
              <h2 className="text-2xl font-black text-slate-900">Explora actividades disponibles</h2>
              <p className="mt-1 text-sm text-slate-600">
                Filtra por especialidad, nivel o busca directamente por tema.
              </p>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar juego, asignatura o tema..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              />
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {specialties.map((specialty) => {
              const Icon = specialty.icon;
              const active = selectedSpecialty === specialty.id;

              return (
                <button
                  key={specialty.id}
                  type="button"
                  onClick={() => setSelectedSpecialty(specialty.id)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition ${
                    active
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {specialty.name}
                </button>
              );
            })}
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {levels.map((level) => {
              const active = selectedLevel === level.id;

              return (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setSelectedLevel(level.id)}
                  className={`rounded-2xl px-4 py-2 text-sm font-bold transition ${
                    active ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {level.name}
                </button>
              );
            })}
          </div>

          {filteredGames.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <BookOpen className="mx-auto mb-4 h-10 w-10 text-slate-400" />
              <h3 className="text-lg font-black text-slate-900">No encontramos juegos con esos filtros</h3>
              <p className="mt-2 text-sm text-slate-600">
                Prueba cambiando la especialidad, el nivel o el texto de búsqueda.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredGames.map((game, index) => {
                const TypeIcon = gameTypeIcon[game.type];

                return (
                  <motion.article
                    key={game.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className={`h-2 bg-gradient-to-r ${getSpecialtyClass(game.specialtyId)}`} />

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-2xl bg-slate-100 p-3">
                            <TypeIcon className="h-5 w-5 text-slate-800" />
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{game.typeName}</p>
                            <p className="text-xs text-slate-500">{game.estimatedTime}</p>
                          </div>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${getDifficultyClass(
                            game.difficulty
                          )}`}
                        >
                          {game.difficulty}
                        </span>
                      </div>

                      <h3 className="text-lg font-black leading-tight text-slate-900">{game.title}</h3>

                      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{game.description}</p>

                      <div className="mt-5 space-y-2 rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <span className="font-semibold text-slate-500">Especialidad</span>
                          <span className="text-right font-bold text-slate-800">{game.specialtyName}</span>
                        </div>

                        <div className="flex items-center justify-between gap-3 text-xs">
                          <span className="font-semibold text-slate-500">Nivel</span>
                          <span className="text-right font-bold text-slate-800">{game.levelName}</span>
                        </div>

                        <div className="flex items-center justify-between gap-3 text-xs">
                          <span className="font-semibold text-slate-500">Asignatura / área</span>
                          <span className="text-right font-bold text-slate-800">{game.subject}</span>
                        </div>
                      </div>

                      <div className="mt-5">
                        {game.available ? (
                          <a
                            href={game.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-800"
                          >
                            Abrir juego
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-500"
                          >
                            Próximamente editable desde el panel
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
