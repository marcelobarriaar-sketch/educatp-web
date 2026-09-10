import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Gamepad2 } from "lucide-react";
import type { HomeContent } from "../../data/home";
import { fallbackContent } from "../../data/home";
import { repairText } from "../../lib/text";
export default function HeroSection({ content }: { content: HomeContent }) {
  const hub = { ...fallbackContent.hub, ...content.hub };
  const title = repairText(hub.title || fallbackContent.hub!.title!);
  const defaultTitle = title === fallbackContent.hub!.title;
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="hub-container grid items-center gap-8 py-9 sm:py-14 lg:grid-cols-[1.08fr_1fr] lg:gap-14 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.18em] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            {repairText(
              content.heroBadge || "Tu comunidad técnico profesional",
            )}
          </p>
          <h1 className="max-w-[650px] text-[clamp(2.55rem,5.4vw,4.75rem)] font-extrabold leading-[1.06] tracking-[-.055em]">
            {defaultTitle ? (
              <>
                Tu futuro se
                <br className="hidden sm:block" /> aprende{" "}
                <span className="text-emerald-300">haciendo.</span>
              </>
            ) : (
              title
            )}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
            {repairText(hub.description || "")}
          </p>
          <div className="mt-7 flex flex-col gap-3 min-[390px]:flex-row sm:mt-8">
            <Link
              className="hub-button bg-emerald-300 text-slate-950 hover:bg-emerald-200"
              to={hub.primaryLink || "/especialidades"}
            >
              {repairText(hub.primaryText || "Explorar mi especialidad")}
              <ArrowUpRight size={18} />
            </Link>
            <Link
              className="hub-button border border-white/25 bg-white/5 text-white hover:bg-white/10"
              to={hub.secondaryLink || "/playground"}
            >
              <Gamepad2 size={18} />
              {repairText(hub.secondaryText || "Jugar ahora")}
            </Link>
          </div>
          <ul
            className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold text-slate-400 sm:mt-9"
            aria-label="Lo que puedes hacer en EducaTP"
          >
            {["Aprende", "Practica", "Juega", "Emprende", "Trabaja"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </motion.div>
        <div className="relative hidden sm:block">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-800">
            <img
              src={content.heroImageUrl || fallbackContent.heroImageUrl}
              alt={repairText(
                content.heroImageAlt || "Aprendizaje práctico en EducaTP",
              )}
              fetchPriority="high"
              width="800"
              height="680"
              className="h-[340px] w-full object-cover lg:h-[425px]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 to-transparent px-7 pb-7 pt-20">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                De la sala al mundo real
              </p>
              <p className="mt-2 max-w-xs text-xl font-bold leading-snug">
                Lo que aprendes hoy,
                <br />
                lo que puedes hacer mañana.
              </p>
            </div>
            <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-slate-900/60">
              <ArrowUpRight size={22} />
            </span>
          </div>
          <div className="relative mx-5 -mt-3 flex items-center justify-between rounded-xl bg-emerald-300 px-5 py-4 text-slate-950">
            <span className="text-sm font-extrabold">
              Tu talento tiene un lugar aquí.
            </span>
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </section>
  );
}
