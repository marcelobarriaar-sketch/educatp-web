import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  Rocket,
  Wallet,
} from "lucide-react";
import { futurePaths } from "../../data/future";
export default function FuturePreview() {
  const icons = [GraduationCap, Briefcase, Rocket, Wallet];
  return (
    <section className="hub-container hub-section">
      <div className="rounded-[1.75rem] border border-indigo-100 bg-indigo-50 p-6 sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="hub-eyebrow !text-indigo-800">
              Mi futuro / Tu próximo capítulo
            </p>
            <h2 className="hub-heading">¿Y después de cuarto medio?</h2>
            <p className="mt-4 text-slate-600">
              Tu especialidad es el comienzo, no el final.
            </p>
            <Link
              to="/mi-futuro"
              className="hub-text-link mt-6 text-indigo-900"
            >
              Explorar mis caminos
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {futurePaths.map((path, index) => {
              const Icon = icons[index];
              return (
                <Link
                  key={path.id}
                  to={`/mi-futuro#${path.id}`}
                  className="rounded-xl border border-indigo-100 bg-white/80 p-4 transition hover:bg-white hover:shadow-sm"
                >
                  <Icon size={22} className="mb-4 text-indigo-800" />
                  <h3 className="text-sm font-bold">{path.title}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
