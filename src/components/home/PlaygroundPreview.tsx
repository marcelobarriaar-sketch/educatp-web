import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Brain,
  Clock3,
  Gamepad2,
  Puzzle,
  Trophy,
} from "lucide-react";
import { games } from "../../data/games";
import SectionHeading from "./SectionHeading";
export default function PlaygroundPreview() {
  return (
    <section className="hub-container hub-section">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-deep px-6 py-9 text-white sm:p-10 lg:p-12">
        <SectionHeading
          light
          eyebrow="Patio TP / Aprende en modo desafío"
          title="Aprender también puede ser un desafío."
          description="Pon a prueba lo que sabes. Equivócate, vuelve a intentar y descubre otra forma de aprender."
          action={
            <Gamepad2
              className="hidden h-16 w-16 text-brand-yellow-light lg:block"
              strokeWidth={1}
            />
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {games
            .filter((game) => game.featured)
            .map((game, index) => {
              const Icon = [Brain, Puzzle, Trophy][index % 3];
              return (
                <article
                  key={game.id}
                  className="flex flex-col rounded-2xl border border-white/15 bg-white/[.04] p-5"
                >
                  <div className="mb-5 flex items-center justify-between gap-2">
                    <Icon size={27} className="text-brand-yellow-light" />
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
                      {game.available ? "Disponible" : "Próximamente"}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {game.typeName} · {game.specialtyName}
                  </p>
                  <h3 className="mt-2 flex-1 text-lg font-bold leading-snug">
                    {game.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-400">
                    {game.levelName} · {game.subject}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4 text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <Clock3 size={13} />
                      {game.estimatedTime}
                    </span>
                    <span>{game.difficulty}</span>
                  </div>
                  {game.available && (
                    <a
                      href={game.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 text-sm font-bold text-brand-yellow-light"
                    >
                      Abrir juego ↗
                    </a>
                  )}
                </article>
              );
            })}
        </div>
        <Link
          to="/playground"
          className="hub-button mt-7 bg-brand-yellow text-slate-950 hover:bg-brand-yellow-light"
        >
          Entrar al Patio TP
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
