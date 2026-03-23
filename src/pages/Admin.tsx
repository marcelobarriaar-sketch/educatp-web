import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type HomeContent = {
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleGreen?: string;
  heroTitleYellow?: string;
  heroTitleRed?: string;
  heroDescription?: string;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  heroSecondaryButtonText?: string;
  heroSecondaryButtonLink?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroFeatureTitle?: string;
  heroFeatureSubtitle?: string;
  stats?: Array<{
    label: string;
    val: string;
  }>;
  specialtiesTitle?: string;
  specialtiesHighlight?: string;
  specialtiesDescription?: string;
  specialtiesLinkText?: string;
  ctaTitleLine1?: string;
  ctaTitleLine2?: string;
  ctaDescription?: string;
  ctaPrimaryButtonText?: string;
  ctaPrimaryButtonLink?: string;
  ctaSecondaryButtonText?: string;
  ctaSecondaryButtonLink?: string;
};

const defaultContent: HomeContent = {
  heroBadge: 'El Futuro es Técnico',
  heroTitleLine1: 'POTENCIA TU',
  heroTitleGreen: 'TALENTO',
  heroTitleYellow: 'RE',
  heroTitleRed: 'AL',
  heroDescription:
    'EducaTP es la plataforma definitiva para el estudiante técnico profesional. Aprende, juega y conéctate con el mundo laboral de forma dinámica.',
  heroPrimaryButtonText: 'Explorar Especialidades',
  heroPrimaryButtonLink: '/especialidades',
  heroSecondaryButtonText: 'Patio de Juegos',
  heroSecondaryButtonLink: '/juegos',
  heroImageUrl:
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
  heroImageAlt: 'Student collaboration',
  heroFeatureTitle: 'Aprendizaje Activo',
  heroFeatureSubtitle: 'Metodología 100% Práctica',
  specialtiesTitle: 'ELIGE TU',
  specialtiesHighlight: 'CAMINO',
  specialtiesDescription:
    'Tres especialidades diseñadas para los desafíos del siglo XXI. Profesionales, dinámicas y con futuro.',
  specialtiesLinkText: 'Ver todas las especialidades',
  ctaTitleLine1: '¿LISTO PARA EL',
  ctaTitleLine2: 'SIGUIENTE NIVEL?',
  ctaDescription:
    'Únete a la comunidad de EducaTP y accede a recursos exclusivos, juegos y ofertas de práctica profesional.',
  ctaPrimaryButtonText: 'Ir al Patio de Juegos',
  ctaPrimaryButtonLink: '/juegos',
  ctaSecondaryButtonText: 'Buscar Prácticas',
  ctaSecondaryButtonLink: '/practicas',
  stats: [
    { label: 'Estudiantes', val: '1.5k+' },
    { label: 'Empresas', val: '40+' },
    { label: 'Recursos', val: '500+' }
  ]
};

const Admin = () => {
  const [content, setContent] = useState<HomeContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data, error } = await supabase
      .from('pages')
      .select('content')
      .eq('slug', 'home')
      .single();

    if (!error && data?.content) {
      setContent({
        ...defaultContent,
        ...data.content
      });
    } else {
      setContent(defaultContent);
    }

    setLoading(false);
  };

  const saveContent = async () => {
    setSaving(true);

    const payload = {
      ...content,
      stats: content.stats && content.stats.length > 0 ? content.stats : defaultContent.stats
    };

    const { error } = await supabase
      .from('pages')
      .update({ content: payload })
      .eq('slug', 'home');

    setSaving(false);

    if (!error) {
      alert('✅ Cambios guardados
