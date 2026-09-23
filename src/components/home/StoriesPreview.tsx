import homeCopy from "../../../content/home.json";
const copy = homeCopy.stories;
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
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {copy.items.map((title, index) => { const Icon = stories[index % stories.length].icon; return (
          <article
            key={title}
            className="rounded-xl border border-dashed border-brand-red/25 bg-brand-blush p-5"
          >
            <Icon size={22} className="mb-4 text-brand-red" />
            <h3 className="text-sm font-bold">{title}</h3>
            <p className="mt-2 text-xs text-slate-500">{copy.placeholder}</p>
          </article>
        ); })}
      </div>
    </section>
  );
}
