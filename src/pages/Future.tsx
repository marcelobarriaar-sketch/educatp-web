import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Briefcase,
  Compass,
  GraduationCap,
  Rocket,
  Wallet,
} from "lucide-react";
import { futurePaths } from "../data/future";
const icons = [GraduationCap, Briefcase, Rocket, Wallet];
const tones = [
  "tp-green",
  "tp-green",
  "tp-red",
  "tp-yellow",
];
export default function Future() {
  return (
    <div className="pb-16">
      <section className="bg-brand-deep py-12 text-white sm:py-20">
        <div className="hub-container">
          <p className="hub-eyebrow !text-brand-yellow-light">Mi Futuro</p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            ¿Y después de cuarto medio?
          </h1>
          <p className="mt-5 text-lg text-slate-300">
            Tu especialidad es el comienzo, no el final.
          </p>
          <nav
            aria-label="Caminos para tu futuro"
            className="mt-8 flex flex-wrap gap-3"
          >
            {futurePaths.map((path) => (
              <a
                key={path.id}
                href={`#${path.id}`}
                className="rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold hover:bg-white/10"
              >
                {path.title}
              </a>
            ))}
          </nav>
        </div>
      </section>
      <div className="hub-container grid gap-6 py-10 md:grid-cols-2">
        {futurePaths.map((path, index) => {
          const Icon = icons[index];
          return (
            <section
              key={path.id}
              id={path.id}
              className="scroll-mt-28 flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
            >
              <span
                className={`mb-6 grid h-12 w-12 place-items-center rounded-xl ${tones[index]}`}
              >
                <Icon size={25} />
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {path.kicker}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
                {path.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {path.description}
              </p>
              <ul className="my-6 flex-1 space-y-3">
                {path.steps.map((step) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    {step}
                  </li>
                ))}
              </ul>
              {path.link.startsWith("/") ? (
                <Link to={path.link} className="hub-text-link">
                  {path.linkText}
                  <ArrowUpRight size={16} />
                </Link>
              ) : (
                <a
                  href={path.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hub-text-link"
                >
                  {path.linkText}
                  <ArrowUpRight size={16} />
                  <span className="sr-only">(abre en otra pestaña)</span>
                </a>
              )}
            </section>
          );
        })}
      </div>
      <section className="hub-container">
        <div className="rounded-2xl bg-brand-cream p-8 sm:p-12">
          <Compass className="mb-5 text-brand-red" size={32} />
          <h2 className="text-2xl font-extrabold tracking-tight">
            ¿Todavía no sabes qué camino elegir?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            No necesitas tener todas las respuestas hoy. Piensa qué disfrutas
            hacer, qué te gustaría aprender y con quién puedes conversar sobre
            tus opciones.
          </p>
          <p className="mt-5 inline-block rounded-full border border-brand-yellow/50 px-4 py-2 text-xs font-bold text-brand-red">
            Próximamente: orientador vocacional interactivo
          </p>
        </div>
      </section>
    </div>
  );
}
