import { Link } from "react-router-dom";
import { ArrowRight, Baby, Sprout, Users } from "lucide-react";
import SectionHeading from "./SectionHeading";
import type { HomeContent } from "../../data/home";
import { fallbackContent } from "../../data/home";
import { canonicalSpecialtyLink } from "../../lib/navigation";
import { repairText } from "../../lib/text";
const identities = {
  Users: {
    icon: Users,
    tone: "bg-emerald-100 text-emerald-900",
    bar: "bg-emerald-600",
    image: "/images/home/administracion.JPG",
    alt: "Estudiantes en el aula de Administración",
  },
  Beef: {
    icon: Sprout,
    tone: "bg-amber-100 text-amber-900",
    bar: "bg-amber-500",
    image: "/images/home/IMG_4078.JPG",
    alt: "Actividad práctica de manejo pecuario",
  },
  Baby: {
    icon: Baby,
    tone: "bg-rose-100 text-rose-900",
    bar: "bg-rose-500",
    image: "/images/home/PARVULOS%204.jpeg",
    alt: "Actividad educativa con materiales didácticos de Párvulos",
  },
};
export default function SpecialtiesSection({
  content,
}: {
  content: HomeContent;
}) {
  return (
    <section className="hub-container hub-section">
      <SectionHeading
        eyebrow="Tres especialidades. Muchas posibilidades."
        title="Encuentra tu mundo TP"
        description={repairText(
          content.specialtiesSubtitle ||
            "Descubre lo que te mueve y empieza a construir tu camino.",
        )}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {(content.specialties || fallbackContent.specialties || []).map(
          (spec, index) => {
            const identity =
              identities[spec.icon as keyof typeof identities] ||
              Object.values(identities)[index % 3];
            const Icon = identity.icon;
            return (
              <article
                key={`${spec.link}-${index}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="relative">
                  <img
                    src={spec.imageUrl || identity.image}
                    alt={
                      spec.imageUrl
                        ? `Aprendizaje en ${repairText(spec.title)}`
                        : identity.alt
                    }
                    loading="lazy"
                    width="600"
                    height="400"
                    className="aspect-[3/2] w-full object-cover"
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-1.5 w-full ${identity.bar}`}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div
                    className={`mb-4 flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold ${identity.tone}`}
                  >
                    <Icon size={16} />
                    Tu especialidad
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight">
                    {repairText(spec.title)}
                  </h3>
                  <p className="mb-6 mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {repairText(spec.description)}
                  </p>
                  <Link
                    to={canonicalSpecialtyLink(spec.link)}
                    className="flex min-h-11 items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm font-bold text-slate-900"
                  >
                    Explorar especialidad
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}
