import { BLOG_POSTS } from "../data/content";
export default function NewsCard({
  post,
}: {
  post: (typeof BLOG_POSTS)[number];
}) {
  return (
    <article
      id={`noticia-${post.id}`}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      <img
        src={post.image}
        alt={`Imagen ilustrativa de la publicación: ${post.title}`}
        loading="lazy"
        width="800"
        height="400"
        className="aspect-[2/1] w-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="p-5 sm:p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">
          {post.category}
        </p>
        <p className="mt-3 text-xs text-slate-500">{post.date}</p>
        <h3 className="mt-2 text-xl font-extrabold tracking-tight">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
