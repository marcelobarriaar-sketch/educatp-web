import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "../../data/content";
import NewsCard from "../NewsCard";
import SectionHeading from "./SectionHeading";
export default function NewsPreview() {
  return (
    <section className="hub-container hub-section">
      <SectionHeading
        eyebrow="Actualidad TP"
        title="Lo último en el mundo TP"
        description="Actividades y novedades de nuestra comunidad."
        action={
          <Link to="/blog" className="hub-text-link">
            Ver toda la actualidad
            <ArrowRight size={17} />
          </Link>
        }
      />
      <div className="grid gap-5 md:grid-cols-3">
        {BLOG_POSTS.slice(0, 3).map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
