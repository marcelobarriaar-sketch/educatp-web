import homeCopy from "../../../content/home.json";
const copy = homeCopy.news;
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "../../data/content";
import NewsCard from "../NewsCard";
import SectionHeading from "./SectionHeading";
export default function NewsPreview() {
  return (
    <section className="hub-container hub-section">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        action={
          <Link to={copy.buttonLink} className="hub-text-link">{copy.buttonText}<ArrowRight size={17} />
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
