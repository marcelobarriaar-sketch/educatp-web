import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  fallbackContent,
  mergeHomeContent,
  type HomeContent,
} from "../data/home";
import { loadPageContent } from "../lib/pages";
import { repairText } from "../lib/text";
import HeroSection from "../components/home/HeroSection";
import QuickActions from "../components/home/QuickActions";
import SpecialtiesSection from "../components/home/SpecialtiesSection";
import PlaygroundPreview from "../components/home/PlaygroundPreview";
import InternshipsPreview from "../components/home/InternshipsPreview";
import NewsPreview from "../components/home/NewsPreview";
import FuturePreview from "../components/home/FuturePreview";
import StoriesPreview from "../components/home/StoriesPreview";
export default function Home() {
  const [content, setContent] = useState<HomeContent>(fallbackContent);
  useEffect(() => {
    let active = true;
    loadPageContent<Partial<HomeContent>>("home")
      .then((data) => {
        if (active) setContent(mergeHomeContent(data));
      })
      .catch(() => {
        /* The complete fallback stays usable offline. */
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <div className="student-hub">
      <HeroSection content={content} />
      <QuickActions />
      <SpecialtiesSection content={content} />
      <PlaygroundPreview />
      <InternshipsPreview />
      <NewsPreview />
      <FuturePreview />
      <section className="hub-container hub-section">
        <div className="rounded-3xl border border-brand-green/15 bg-brand-mist p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="hub-eyebrow">
                {repairText(content.ctaBadge || "Comunidad TP")}
              </p>
              <h2 className="text-xl font-bold">
                {repairText(content.ctaTitle || "")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {repairText(content.ctaDescription || "")}
              </p>
              <Link
                to={content.ctaButtonLink || "/recursos"}
                className="hub-text-link mt-4"
              >
                {repairText(content.ctaButtonText || "Explorar recursos")}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex flex-wrap gap-8">
              {content.stats?.map((stat, index) => (
                <div key={index}>
                  <p className="text-2xl font-extrabold text-brand-green">
                    {repairText(stat.value)}
                  </p>
                  <p className="mt-1 max-w-32 text-xs text-slate-500">
                    {repairText(stat.label)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <StoriesPreview />
    </div>
  );
}
