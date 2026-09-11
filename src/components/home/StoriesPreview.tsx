import {
  Building2,
  GraduationCap,
  School,
  UserRound,
  Users,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
const stories = [
  { title: "Estudiantes", icon: Users },
  { title: "Titulados", icon: GraduationCap },
  { title: "Docentes", icon: UserRound },
  { title: "Empresas", icon: Building2 },
  { title: "Centros de práctica", icon: School },
];
export default function StoriesPreview() {
  return (
    <section className="hub-container hub-section pb-16">
      <SectionHeading
        eyebrow="Historias TP"
        title="Personas reales, caminos reales."
        description="Un espacio para conocer experiencias de nuestra comunidad. Las primeras historias se publicarán aquí."
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stories.map(({ title, icon: Icon }) => (
          <article
            key={title}
            className="rounded-xl border border-dashed border-brand-red/25 bg-brand-blush p-5"
          >
            <Icon size={22} className="mb-4 text-brand-red" />
            <h3 className="text-sm font-bold">{title}</h3>
            <p className="mt-2 text-xs text-slate-500">Historia por publicar</p>
          </article>
        ))}
      </div>
    </section>
  );
}
