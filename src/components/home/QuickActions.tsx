import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Gamepad2,
  GraduationCap,
  Newspaper,
  Rocket,
} from "lucide-react";
const actions = [
  {
    title: "Explorar mi especialidad",
    subtitle: "Encuentra tu mundo TP",
    path: "/especialidades",
    icon: GraduationCap,
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Estudiar",
    subtitle: "Materiales a tu ritmo",
    path: "/recursos",
    icon: BookOpen,
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    title: "Jugar y aprender",
    subtitle: "Acepta el desafío",
    path: "/playground",
    icon: Gamepad2,
    color: "bg-amber-100 text-amber-900",
  },
  {
    title: "Buscar práctica",
    subtitle: "Da tu primer paso",
    path: "/practicas",
    icon: Briefcase,
    color: "bg-sky-100 text-sky-800",
  },
  {
    title: "Ver novedades TP",
    subtitle: "Conecta con tu comunidad",
    path: "/blog",
    icon: Newspaper,
    color: "bg-rose-100 text-rose-800",
  },
  {
    title: "Pensar mi futuro",
    subtitle: "Hay más de un camino",
    path: "/mi-futuro",
    icon: Rocket,
    color: "bg-violet-100 text-violet-800",
  },
];
export default function QuickActions() {
  return (
    <section
      className="hub-container py-9 sm:py-12"
      aria-labelledby="quick-title"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2
          id="quick-title"
          className="text-xl font-extrabold tracking-tight sm:text-2xl"
        >
          ¿Qué quieres hacer hoy?
        </h2>
        <span className="hidden text-xs text-slate-500 sm:block">
          Tu punto de partida
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {actions.map(({ title, subtitle, path, icon: Icon, color }) => (
          <Link
            key={path}
            to={path}
            className="group rounded-2xl border border-slate-200 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-md"
          >
            <div className="mb-4 flex justify-between">
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}
              >
                <Icon size={21} />
              </span>
              <ArrowUpRight
                className="text-slate-400 transition group-hover:text-slate-900"
                size={16}
              />
            </div>
            <h3 className="text-sm font-bold leading-snug">{title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
              {subtitle}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
