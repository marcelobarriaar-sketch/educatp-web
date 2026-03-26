import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users, Beef, Baby, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

const iconMap: Record<string, any> = {
  Users,
  Beef,
  Baby,
};

type StatItem = {
  value: string;
  label: string;
};

type SpecialtyCard = {
  title: string;
  description: string;
  icon: string;
  link: string;
};

type HomeContent = {
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleLine1Color?: string;
  heroTitleGreen?: string;
  heroTitleGreenColor?: string;
  heroTitleYellow?: string;
  heroTitleYellowColor?: string;
  heroTitleRed?: string;
  heroTitleRedColor?: string;
  heroDescription?: string;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  heroSecondaryButtonText?: string;
  heroSecondaryButtonLink?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroFeatureTitle?: string;
  heroFeatureSubtitle?: string;

  stats?: StatItem[];

  specialtiesBadge?: string;
  specialtiesTitle?: string;
  specialtiesSubtitle?: string;
  specialties?: SpecialtyCard[];

  ctaBadge?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
};

const fallbackContent: HomeContent = {
  heroBadge: 'Liceo Técnico Profesional',
  heroTitleLine1: 'Formando talentos para el futuro',
  heroTitleLine1Color: '#ffffff',
  heroTitleGreen: 'Administración',
  heroTitleGreenColor: '#10b981',
  heroTitleYellow: 'Agropecuaria',
  heroTitleYellowColor: '#eab308',
  heroTitleRed: 'Párvulos',
  heroTitleRedColor: '#ef4444',
  heroDescription:
    'Impulsamos una educación técnico profesional conectada con el territorio, la innovación y el desarrollo de competencias para la vida y el trabajo.',
  heroPrimaryButtonText: 'Conoce nuestras especialidades',
  heroPrimaryButtonLink: '/especialidades',
  heroSecondaryButtonText: 'Ver prácticas',
  heroSecondaryButtonLink: '/practicas',
  heroImageUrl:
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
  heroImageAlt: 'Estudiantes del liceo',
  heroFeatureTitle: 'Educación TP conectada con el mundo real',
  heroFeatureSubtitle: 'Aprendizaje práctico, vinculación con empresas y desarrollo integral.',
  stats: [
    { value: '3', label: 'Especialidades' },
    { value: '100%', label: 'Compromiso' },
    { value: 'TP', label: 'Formación técnico profesional' },
  ],
  specialtiesBadge: 'Especialidades',
  specialtiesTitle: 'Áreas de formación',
  specialtiesSubtitle:
    'Conoce nuestras especialidades y las oportunidades que ofrecen para el desarrollo académico y laboral.',
  specialties: [
    {
      title: 'Administración',
      description:
        'Formación en gestión, organización, procesos administrativos y herramientas digitales.',
      icon: 'Users',
      link: '/especialidades/administracion',
    },
    {
      title: 'Agropecuaria',
      description:
        'Desarrollo de competencias vinculadas al trabajo agrícola, producción y sostenibilidad.',
      icon: 'Beef',
      link: '/especialidades/agropecuaria',
    },
    {
      title: 'Atención de Párvulos',
      description:
        'Preparación para apoyar procesos educativos y de cuidado en primera infancia.',
      icon: 'Baby',
      link: '/especialidades/atencion-de-parvulos',
    },
  ],
  ctaBadge: 'Comunidad educativa',
  ctaTitle: 'Construyamos futuro juntos',
  ctaDescription:
    'Descubre nuestro proyecto educativo, las oportunidades formativas y la vida escolar de nuestra comunidad.',
  ctaButtonText: 'Explorar recursos',
  ctaButtonLink: '/recursos',
};

function mergeHomeContent(dbContent?: Partial<HomeContent> | null): HomeContent {
  return {
    ...fallbackContent,
    ...(dbContent || {}),
    stats:
      Array.isArray(dbContent?.stats) && dbContent.stats.length > 0
        ? dbContent.stats
        : fallbackContent.stats,
    specialties:
      Array.isArray(dbContent?.specialties) && dbContent.specialties.length > 0
        ? dbContent.specialties
        : fallbackContent.specialties,
  };
}

function getSpecialtyColor(icon: string) {
  switch (icon) {
    case 'Users':
      return 'bg-emerald-600';
    case 'Beef':
      return 'bg-amber-600';
    case 'Baby':
      return 'bg-pink-600';
    default:
      return 'bg-indigo-600';
  }
}

export default function Home() {
  const [content, setContent] = useState<HomeContent>(fallbackContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHome = async () => {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('content')
          .eq('slug', 'home')
          .maybeSingle();

        if (error) {
          console.error('Error cargando home desde Supabase:', error);
          setContent(fallbackContent);
          return;
        }

        const dbContent = (data?.content || {}) as Partial<HomeContent>;
        setContent(mergeHomeContent(dbContent));
      } catch (err) {
        console.error('Error inesperado cargando home:', err);
        setContent(fallbackContent);
      } finally {
        setLoading(false);
      }
    };

    loadHome();
  }, []);

  return (
    <div className="space-y-32 pb-32">
      {/* HERO */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse delay-1000" />
          <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 lg:grid-cols-2">
          <div className="space-y-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4" />
              <span className="tracking-wider uppercase">{content.heroBadge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl font-black leading-[0.9] tracking-tighter md:text-8xl"
            >
              <span style={{ color: content.heroTitleLine1Color || '#ffffff' }}>
                {content.heroTitleLine1}
              </span>
              <br />
              <span className="flex flex-wrap justify-center gap-x-4 lg:justify-start">
                <span style={{ color: content.heroTitleGreenColor || '#10b981' }}>
                  {content.heroTitleGreen}
                </span>
                <span style={{ color: content.heroTitleYellowColor || '#eab308' }}>
                  {content.heroTitleYellow}
                </span>
                <span style={{ color: content.heroTitleRedColor || '#ef4444' }}>
                  {content.heroTitleRed}
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-xl text-xl font-medium leading-relaxed text-white lg:mx-0"
            >
              {content.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 lg:justify-start"
            >
              <Link
                to={content.heroPrimaryButtonLink || '/especialidades'}
                className="btn-primary bg-emerald-800 px-10 py-5 text-lg hover:bg-emerald-900"
              >
                {content.heroPrimaryButtonText}
                <ArrowRight className="h-6 w-6" />
              </Link>

              <Link
                to={content.heroSecondaryButtonLink || '/practicas'}
                className="btn-secondary border-white/20 bg-transparent px-10 py-5 text-lg text-white hover:bg-white/10"
              >
                {content.heroSecondaryButtonText}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-8 border-t border-white/10 pt-8 lg:justify-start"
            >
              {(content.stats || []).map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="animate-float absolute -inset-10 rounded-full bg-indigo-500/20 blur-[100px]" />
            <div className="glass-card relative rotate-3 rounded-[3rem] p-4 transition-transform duration-500 hover:rotate-0">
              <img
                src={content.heroImageUrl || fallbackContent.heroImageUrl}
                alt={content.heroImageAlt || 'Hero image'}
                className="rounded-[2.5rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />

              <div className="glass-card animate-float absolute -bottom-10 -left-10 rounded-3xl p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">{content.heroFeatureTitle}</p>
                    <p className="text-xs text-slate-500">{content.heroFeatureSubtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-4">
            {content.specialtiesBadge ? (
              <p className="text-sm font-black uppercase tracking-[0.25em] text-indigo-600">
                {content.specialtiesBadge}
              </p>
            ) : null}

            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              {content.specialtiesTitle}
            </h2>

            <p className="max-w-xl text-lg font-medium text-slate-500">
              {content.specialtiesSubtitle}
            </p>
          </div>

          <Link
            to="/especialidades"
            className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-indigo-600"
          >
            Ver todas las especialidades
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {(content.specialties || []).map((spec, index) => {
            const Icon = iconMap[spec.icon] || Users;

            return (
              <motion.div
                key={`${spec.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={spec.link || '/especialidades'}
                  className="group block h-full rounded-[3rem] border border-slate-200 bg-white p-8 shadow-xl transition-all hover:-translate-y-1 hover:shadow-indigo-500/10"
                >
                  <div
                    className={cn(
                      'mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg',
                      getSpecialtyColor(spec.icon)
                    )}
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="mb-4 text-3xl font-black leading-tight text-slate-900">
                    {spec.title}
                  </h3>

                  <p className="mb-8 text-sm font-medium text-slate-600">
                    {spec.description}
                  </p>

                  <div className="flex items-center gap-2 pt-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
                    Explorar ahora
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-[4rem] bg-indigo-600 p-12 text-center md:p-24">
          <div className="absolute left-0 top-0 h-full w-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-10 space-y-8"
          >
            {content.ctaBadge ? (
              <p className="text-sm font-black uppercase tracking-[0.25em] text-indigo-100">
                {content.ctaBadge}
              </p>
            ) : null}

            <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              {content.ctaTitle}
            </h2>

            <p className="mx-auto max-w-2xl text-xl font-medium text-indigo-100">
              {content.ctaDescription}
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to={content.ctaButtonLink || '/recursos'}
                className="rounded-3xl bg-white px-10 py-5 text-lg font-black text-indigo-600 shadow-xl transition-transform hover:scale-105"
              >
                {content.ctaButtonText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {loading && (
        <div className="-mt-20 text-center text-sm text-slate-400">
          Cargando contenido dinámico...
        </div>
      )}
    </div>
  );
}
