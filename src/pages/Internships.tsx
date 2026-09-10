import { Briefcase, MapPin } from "lucide-react";
import { INTERNSHIP_OFFERS } from "../data/content";
import { isOfferOpen, practiceTools } from "../lib/internships";
export default function Internships() {
  const available = INTERNSHIP_OFFERS.filter((offer) => isOfferOpen(offer));
  return (
    <div className="pb-16">
      <section className="bg-slate-950 py-12 text-white sm:py-20">
        <div className="hub-container">
          <p className="hub-eyebrow !text-emerald-300">
            Mundo Laboral / Zona de Prácticas
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tu primera experiencia laboral comienza aquí
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-slate-300">
            Pon en práctica lo que sabes y prepara tu próximo paso con
            confianza.
          </p>
        </div>
      </section>
      <div className="hub-container grid gap-8 py-10 lg:grid-cols-[1.5fr_1fr]">
        <section>
          <h2 className="mb-5 text-2xl font-bold">
            {available.length
              ? "Oportunidades con plazo vigente"
              : "Prepara tu práctica"}
          </h2>
          {!available.length && (
            <p className="mb-7 rounded-2xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-600">
              Actualmente no hay ofertas con plazo vigente. Consulta con la
              coordinación TP de tu establecimiento las oportunidades y
              requisitos para tu proceso.
            </p>
          )}
          <div className="space-y-4">
            {INTERNSHIP_OFFERS.map((offer) => (
              <article
                id={`oferta-${offer.id}`}
                key={offer.id}
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-emerald-800">
                    {offer.specialty}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {isOfferOpen(offer)
                      ? "Plazo vigente · confirmar cupos"
                      : "Archivo · plazo finalizado"}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{offer.position}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-700">
                  {offer.company}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {offer.description}
                </p>
                <p className="mt-5 flex items-start gap-2 text-xs text-slate-500">
                  <MapPin size={14} className="shrink-0" />
                  {offer.location}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Plazo publicado: {offer.deadline}
                </p>
              </article>
            ))}
          </div>
        </section>
        <aside className="space-y-6">
          <section className="rounded-2xl bg-slate-900 p-6 text-white">
            <Briefcase className="mb-5 text-emerald-300" size={28} />
            <h2 className="text-xl font-bold">Antes de comenzar</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Coordina tu proceso con el equipo TP. Confirma los documentos,
              seguro escolar, plan de práctica, supervisión y requisitos que
              correspondan a tu establecimiento y situación.
            </p>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              Lleva tus preguntas: qué tareas realizarás, quién te acompañará y
              cómo se evaluará tu aprendizaje.
            </p>
            <a
              href="mailto:practicas@educatp.cl"
              className="hub-button mt-6 bg-emerald-300 text-slate-950"
            >
              Contactar coordinación
            </a>
          </section>
          <section className="rounded-2xl border border-slate-200 p-6">
            <h2 className="mb-4 font-bold">
              Herramientas para tu primera experiencia
            </h2>
            <ul className="divide-y divide-slate-200">
              {practiceTools.map((tool) => (
                <li key={tool} className="py-4 text-sm">
                  <p className="font-semibold">{tool}</p>
                  <p className="mt-1 text-xs text-slate-500">Próximamente</p>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
