import { Link } from "react-router-dom";
import { ArrowUpRight, Briefcase, Check, MapPin } from "lucide-react";
import { INTERNSHIP_OFFERS } from "../../data/content";
import { isOfferOpen, practiceTools } from "../../lib/internships";
export default function InternshipsPreview() {
  const offers = INTERNSHIP_OFFERS.filter((offer) => isOfferOpen(offer)).slice(
    0,
    3,
  );
  return (
    <section className="hub-container hub-section">
      <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="hub-eyebrow">Zona de prácticas / Del aula al trabajo</p>
          <h2 className="hub-heading">
            Tu primera experiencia laboral comienza aquí
          </h2>
          <p className="mt-5 leading-relaxed text-slate-600">
            Orientación, oportunidades y herramientas para enfrentar tu práctica
            profesional con más confianza.
          </p>
          <Link
            className="hub-button mt-6 bg-slate-900 text-white hover:bg-slate-700"
            to="/practicas"
          >
            Entrar a Zona de Prácticas
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div>
          {offers.length ? (
            <div className="space-y-3">
              {offers.map((offer) => (
                <Link
                  key={offer.id}
                  to={`/practicas#oferta-${offer.id}`}
                  className="block rounded-xl border border-slate-200 bg-white p-5"
                >
                  <p className="text-xs text-emerald-800">{offer.specialty}</p>
                  <h3 className="mt-1 font-bold">{offer.position}</h3>
                  <p className="mt-2 text-sm text-slate-600">{offer.company}</p>
                  <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <MapPin size={14} />
                    {offer.location}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6">
              <span className="rounded-xl bg-sky-100 p-3 text-sky-800">
                <Briefcase size={24} />
              </span>
              <div>
                <h3 className="font-bold">Prepara tu próximo paso</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Por ahora no hay ofertas con plazo vigente. Revisa la
                  orientación y el archivo de oportunidades en Zona de
                  Prácticas.
                </p>
              </div>
            </div>
          )}
          <div className="mt-5 grid grid-cols-2 gap-3">
            {practiceTools.map((tool) => (
              <div key={tool} className="rounded-xl bg-slate-100 p-4">
                <Check size={16} className="mb-3 text-slate-500" />
                <h3 className="text-xs font-bold leading-relaxed">{tool}</h3>
                <p className="mt-1 text-[11px] text-slate-500">Próximamente</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
