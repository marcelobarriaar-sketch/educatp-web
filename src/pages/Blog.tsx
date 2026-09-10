import { useState } from "react";
import { Search } from "lucide-react";
import { BLOG_POSTS } from "../data/content";
import NewsCard from "../components/NewsCard";
export default function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const posts = BLOG_POSTS.filter(
    (post) =>
      (category === "Todos" || post.category === category) &&
      normalize(post.title + post.excerpt).includes(normalize(query)),
  );
  return (
    <div className="pb-16">
      <section className="bg-slate-950 py-12 text-white sm:py-20">
        <div className="hub-container">
          <p className="hub-eyebrow !text-emerald-300">
            Tu comunidad, en movimiento
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Actualidad TP
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-slate-300">
            Actividades, proyectos y novedades del mundo técnico profesional.
          </p>
        </div>
      </section>
      <div className="hub-container py-8">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Buscar noticias</span>
            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-500"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar noticias…"
              className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm"
            />
          </label>
          <div className="flex flex-wrap gap-2" aria-label="Categorías">
            {["Todos", ...new Set(BLOG_POSTS.map((post) => post.category))].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={`min-h-11 rounded-xl px-4 py-2 text-sm font-semibold ${category === item ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
                >
                  {item}
                </button>
              ),
            )}
          </div>
        </div>
        <h2 className="sr-only">Publicaciones</h2>
        <p role="status" className="mb-4 text-xs text-slate-500">
          {posts.length} publicaciones
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
        {!posts.length && (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
            No encontramos publicaciones. Prueba otra búsqueda o categoría.
          </p>
        )}
      </div>
    </div>
  );
}
