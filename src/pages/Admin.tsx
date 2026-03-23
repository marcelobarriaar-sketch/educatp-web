import React, { useEffect, useMemo, useState } from 'react';
import {
  Save,
  Plus,
  Trash2,
  Loader2,
  Home,
  BarChart3,
  GraduationCap,
  Megaphone,
  LogOut,
  BookOpen,
  Newspaper,
  Briefcase,
  Gamepad2,
  ArrowLeft,
  LayoutDashboard,
  ChevronRight,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleGreen: string;
  heroTitleYellow: string;
  heroTitleRed: string;
  heroDescription: string;
  heroPrimaryButtonText: string;
  heroPrimaryButtonLink: string;
  heroSecondaryButtonText: string;
  heroSecondaryButtonLink: string;
  heroImageUrl: string;
  heroImageAlt: string;
  heroFeatureTitle: string;
  heroFeatureSubtitle: string;

  stats: StatItem[];

  specialtiesBadge: string;
  specialtiesTitle: string;
  specialtiesSubtitle: string;
  specialties: SpecialtyCard[];

  ctaBadge: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
};

type SaveState = 'idle' | 'saving' | 'saved' | 'error';
type AdminSection =
  | 'dashboard'
  | 'home'
  | 'specialties'
  | 'resources'
  | 'blog'
  | 'internships'
  | 'playground';

const STORAGE_KEY = 'educatp_admin_auth';

const defaultHomeContent: HomeContent = {
  heroBadge: 'Liceo Técnico Profesional',
  heroTitleLine1: 'Formando talentos para el futuro',
  heroTitleGreen: 'Administración',
  heroTitleYellow: 'Agropecuaria',
  heroTitleRed: 'Atención de Párvulos',
  heroDescription:
    'Impulsamos una educación técnico profesional conectada con el territorio, la innovación y el desarrollo de competencias para la vida y el trabajo.',
  heroPrimaryButtonText: 'Conoce nuestras especialidades',
  heroPrimaryButtonLink: '/especialidades',
  heroSecondaryButtonText: 'Ver prácticas',
  heroSecondaryButtonLink: '/practicas',
  heroImageUrl: '',
  heroImageAlt: 'Estudiantes del liceo',
  heroFeatureTitle: 'Educación TP conectada con el mundo real',
  heroFeatureSubtitle: 'Aprendizaje práctico, vinculación con empresas y desarrollo integral.',

  stats: [
    { value: '3', label: 'Especialidades' },
    { value: '100%', label: 'Compromiso con la formación' },
    { value: 'TP', label: 'Educación técnico profesional' },
  ],

  specialtiesBadge: 'Especialidades',
  specialtiesTitle: 'Áreas de formación',
  specialtiesSubtitle:
    'Conoce nuestras especialidades y las oportunidades que ofrecen para el desarrollo académico y laboral.',

  specialties: [
    {
      title: 'Administración',
      description: 'Formación en gestión, organización, procesos administrativos y herramientas digitales.',
      icon: 'Users',
      link: '/especialidades/administracion',
    },
    {
      title: 'Agropecuaria',
      description: 'Desarrollo de competencias vinculadas al trabajo agrícola, producción y sostenibilidad.',
      icon: 'Beef',
      link: '/especialidades/agropecuaria',
    },
    {
      title: 'Atención de Párvulos',
      description: 'Preparación para apoyar procesos educativos y de cuidado en primera infancia.',
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

const sectionTitleClass = 'text-lg font-semibold text-slate-900';
const cardClass = 'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm';
const inputClass =
  'w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200';
const labelClass = 'mb-2 block text-sm font-medium text-slate-700';
const buttonClass =
  'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition';
const mutedButtonClass = `${buttonClass} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`;
const primaryButtonClass = `${buttonClass} bg-slate-900 text-white hover:bg-slate-800`;
const dangerButtonClass = `${buttonClass} border border-red-200 bg-red-50 text-red-700 hover:bg-red-100`;

function mergeHomeContent(content: Partial<HomeContent> | null | undefined): HomeContent {
  return {
    ...defaultHomeContent,
    ...(content || {}),
    stats: Array.isArray(content?.stats) ? content.stats : defaultHomeContent.stats,
    specialties: Array.isArray(content?.specialties) ? content.specialties : defaultHomeContent.specialties,
  };
}

const adminSections: Array<{
  key: AdminSection;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    key: 'home',
    title: 'Inicio',
    description: 'Edita la portada principal del sitio.',
    icon: Home,
  },
  {
    key: 'specialties',
    title: 'Especialidades',
    description: 'Gestiona la información general de las especialidades.',
    icon: GraduationCap,
  },
  {
    key: 'resources',
    title: 'Recursos',
    description: 'Organiza materiales, enlaces y contenido para estudiantes.',
    icon: BookOpen,
  },
  {
    key: 'blog',
    title: 'Blog TP',
    description: 'Administra noticias, publicaciones y novedades.',
    icon: Newspaper,
  },
  {
    key: 'internships',
    title: 'Prácticas',
    description: 'Gestiona información de prácticas, empresas y oportunidades.',
    icon: Briefcase,
  },
  {
    key: 'playground',
    title: 'Patio de Juegos',
    description: 'Prepara actividades interactivas y contenido dinámico.',
    icon: Gamepad2,
  },
];

function SectionPlaceholder({
  title,
  description,
  onBack,
}: {
  title: string;
  description: string;
  onBack: () => void;
}) {
  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500">
              Panel CMS
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-2 text-sm text-slate-600">{description}</p>
          </div>

          <button type="button" className={mutedButtonClass} onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
            Volver al panel
          </button>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-lg font-semibold text-slate-800">Esta sección quedará lista en el siguiente paso.</p>
          <p className="mt-2 text-sm text-slate-600">
            La estructura del panel ya está preparada para que después conectemos este módulo a Supabase, tal como
            hicimos con Inicio.
          </p>
        </div>
      </section>
    </div>
  );
}

export default function Admin() {
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [form, setForm] = useState<HomeContent>(defaultHomeContent);
  const [loading, setLoading] = useState(false);
  const [homeLoaded, setHomeLoaded] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const saveLabel = useMemo(() => {
    if (saveState === 'saving') return 'Guardando...';
    if (saveState === 'saved') return 'Guardado';
    if (saveState === 'error') return 'Error al guardar';
    return 'Guardar cambios';
  }, [saveState]);

  useEffect(() => {
    if (currentSection === 'home' && !homeLoaded) {
      loadHome();
    }
  }, [currentSection, homeLoaded]);

  async function loadHome() {
    try {
      setLoading(true);
      setErrorMsg('');

      const { data, error } = await supabase
        .from('pages')
        .select('slug, content')
        .eq('slug', 'home')
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setForm(defaultHomeContent);
        setHomeLoaded(true);
        return;
      }

      const merged = mergeHomeContent(data.content as Partial<HomeContent>);
      setForm(merged);
      setHomeLoaded(true);
    } catch (error: any) {
      console.error('Error cargando Home:', error);
      setErrorMsg(error?.message || 'No se pudo cargar el contenido.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaveState('saving');
      setErrorMsg('');

      const payload = {
        slug: 'home',
        content: form,
      };

      const { error } = await supabase.from('pages').upsert(payload, {
        onConflict: 'slug',
      });

      if (error) throw error;

      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 1800);
    } catch (error: any) {
      console.error('Error guardando Home:', error);
      setSaveState('error');
      setErrorMsg(error?.message || 'No se pudo guardar el contenido.');
      setTimeout(() => setSaveState('idle'), 2200);
    }
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = '/';
  }

  function updateField<K extends keyof HomeContent>(field: K, value: HomeContent[K]) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function updateStat(index: number, field: keyof StatItem, value: string) {
    setForm((prev) => {
      const next = [...prev.stats];
      next[index] = {
        ...next[index],
        [field]: value,
      };
      return { ...prev, stats: next };
    });
  }

  function addStat() {
    setForm((prev) => ({
      ...prev,
      stats: [...prev.stats, { value: '', label: '' }],
    }));
  }

  function removeStat(index: number) {
    setForm((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  }

  function updateSpecialty(index: number, field: keyof SpecialtyCard, value: string) {
    setForm((prev) => {
      const next = [...prev.specialties];
      next[index] = {
        ...next[index],
        [field]: value,
      };
      return { ...prev, specialties: next };
    });
  }

  function addSpecialty() {
    setForm((prev) => ({
      ...prev,
      specialties: [
        ...prev.specialties,
        {
          title: '',
          description: '',
          icon: 'Users',
          link: '/especialidades',
        },
      ],
    }));
  }

  function removeSpecialty(index: number) {
    setForm((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index),
    }));
  }

  function renderDashboard() {
    return (
      <div className="grid gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500">Panel CMS</p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Bienvenido a tu panel de administrador
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600">
                Desde aquí puedes gestionar el contenido principal de educatp.cl de forma simple, ordenada y segura.
              </p>
            </div>

            <button onClick={handleLogout} className={mutedButtonClass} type="button">
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2">
              <LayoutDashboard className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Páginas y subpáginas</h2>
              <p className="text-sm text-slate-500">
                Selecciona el sector que deseas editar dentro del sitio educatp.cl.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {adminSections.map((section) => {
              const Icon = section.icon;

              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => setCurrentSection(section.key)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left transition hover:border-slate-300 hover:bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
                      <Icon className="h-5 w-5 text-slate-700" />
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{section.title}</h3>
                      <p className="text-sm text-slate-500">{section.description}</p>
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5" />
                </button>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  function renderHomeEditor() {
    if (loading) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="flex items-center justify-center text-slate-700">
            <Loader2 className="mr-3 h-5 w-5 animate-spin text-slate-600" />
            Cargando editor de Inicio...
          </div>
        </div>
      );
    }

    return (
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                onClick={() => setCurrentSection('dashboard')}
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al panel
              </button>
            </div>

            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500">Panel CMS</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Editor de contenido Home</h1>
            <p className="mt-2 text-sm text-slate-600">
              Desde aquí puedes editar el contenido principal de la portada del sitio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={handleLogout} className={mutedButtonClass} type="button">
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>

            <button onClick={handleSave} className={primaryButtonClass} type="button">
              {saveState === 'saving' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saveLabel}
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        <div className="grid gap-6">
          <section className={cardClass}>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2">
                <Home className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <h2 className={sectionTitleClass}>Sección Hero</h2>
                <p className="text-sm text-slate-500">Título principal, textos, botones e imagen.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>Badge superior</label>
                <input
                  className={inputClass}
                  value={form.heroBadge}
                  onChange={(e) => updateField('heroBadge', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Título línea 1</label>
                <input
                  className={inputClass}
                  value={form.heroTitleLine1}
                  onChange={(e) => updateField('heroTitleLine1', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Título verde</label>
                <input
                  className={inputClass}
                  value={form.heroTitleGreen}
                  onChange={(e) => updateField('heroTitleGreen', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Título amarillo</label>
                <input
                  className={inputClass}
                  value={form.heroTitleYellow}
                  onChange={(e) => updateField('heroTitleYellow', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Título rojo</label>
                <input
                  className={inputClass}
                  value={form.heroTitleRed}
                  onChange={(e) => updateField('heroTitleRed', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Alt de imagen</label>
                <input
                  className={inputClass}
                  value={form.heroImageAlt}
                  onChange={(e) => updateField('heroImageAlt', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Descripción</label>
                <textarea
                  className={`${inputClass} min-h-[110px]`}
                  value={form.heroDescription}
                  onChange={(e) => updateField('heroDescription', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>URL imagen principal</label>
                <input
                  className={inputClass}
                  value={form.heroImageUrl}
                  onChange={(e) => updateField('heroImageUrl', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className={labelClass}>Texto botón principal</label>
                <input
                  className={inputClass}
                  value={form.heroPrimaryButtonText}
                  onChange={(e) => updateField('heroPrimaryButtonText', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Link botón principal</label>
                <input
                  className={inputClass}
                  value={form.heroPrimaryButtonLink}
                  onChange={(e) => updateField('heroPrimaryButtonLink', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Texto botón secundario</label>
                <input
                  className={inputClass}
                  value={form.heroSecondaryButtonText}
                  onChange={(e) => updateField('heroSecondaryButtonText', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Link botón secundario</label>
                <input
                  className={inputClass}
                  value={form.heroSecondaryButtonLink}
                  onChange={(e) => updateField('heroSecondaryButtonLink', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Título destacado lateral</label>
                <input
                  className={inputClass}
                  value={form.heroFeatureTitle}
                  onChange={(e) => updateField('heroFeatureTitle', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Subtítulo destacado lateral</label>
                <input
                  className={inputClass}
                  value={form.heroFeatureSubtitle}
                  onChange={(e) => updateField('heroFeatureSubtitle', e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2">
                <BarChart3 className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <h2 className={sectionTitleClass}>Estadísticas</h2>
                <p className="text-sm text-slate-500">Bloques tipo número + etiqueta.</p>
              </div>
            </div>

            <div className="space-y-4">
              {form.stats.map((stat, index) => (
                <div
                  key={index}
                  className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_2fr_auto]"
                >
                  <div>
                    <label className={labelClass}>Valor</label>
                    <input
                      className={inputClass}
                      value={stat.value}
                      onChange={(e) => updateStat(index, 'value', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Etiqueta</label>
                    <input
                      className={inputClass}
                      value={stat.label}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                    />
                  </div>

                  <div className="flex items-end">
                    <button type="button" className={dangerButtonClass} onClick={() => removeStat(index)}>
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}

              <button type="button" className={mutedButtonClass} onClick={addStat}>
                <Plus className="h-4 w-4" />
                Agregar estadística
              </button>
            </div>
          </section>

          <section className={cardClass}>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2">
                <GraduationCap className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <h2 className={sectionTitleClass}>Sección especialidades</h2>
                <p className="text-sm text-slate-500">Encabezado y tarjetas de especialidades.</p>
              </div>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>Badge</label>
                <input
                  className={inputClass}
                  value={form.specialtiesBadge}
                  onChange={(e) => updateField('specialtiesBadge', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Título</label>
                <input
                  className={inputClass}
                  value={form.specialtiesTitle}
                  onChange={(e) => updateField('specialtiesTitle', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Subtítulo</label>
                <textarea
                  className={`${inputClass} min-h-[100px]`}
                  value={form.specialtiesSubtitle}
                  onChange={(e) => updateField('specialtiesSubtitle', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-5">
              {form.specialties.map((item, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-slate-900">Tarjeta {index + 1}</h3>
                    <button type="button" className={dangerButtonClass} onClick={() => removeSpecialty(index)}>
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>Título</label>
                      <input
                        className={inputClass}
                        value={item.title}
                        onChange={(e) => updateSpecialty(index, 'title', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Ícono</label>
                      <input
                        className={inputClass}
                        value={item.icon}
                        onChange={(e) => updateSpecialty(index, 'icon', e.target.value)}
                        placeholder="Users / Beef / Baby"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelClass}>Descripción</label>
                      <textarea
                        className={`${inputClass} min-h-[100px]`}
                        value={item.description}
                        onChange={(e) => updateSpecialty(index, 'description', e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelClass}>Link</label>
                      <input
                        className={inputClass}
                        value={item.link}
                        onChange={(e) => updateSpecialty(index, 'link', e.target.value)}
                        placeholder="/especialidades/..."
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" className={mutedButtonClass} onClick={addSpecialty}>
                <Plus className="h-4 w-4" />
                Agregar especialidad
              </button>
            </div>
          </section>

          <section className={cardClass}>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2">
                <Megaphone className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <h2 className={sectionTitleClass}>Llamado a la acción final</h2>
                <p className="text-sm text-slate-500">Bloque de cierre o invitación principal.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>Badge</label>
                <input
                  className={inputClass}
                  value={form.ctaBadge}
                  onChange={(e) => updateField('ctaBadge', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Título</label>
                <input
                  className={inputClass}
                  value={form.ctaTitle}
                  onChange={(e) => updateField('ctaTitle', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Descripción</label>
                <textarea
                  className={`${inputClass} min-h-[110px]`}
                  value={form.ctaDescription}
                  onChange={(e) => updateField('ctaDescription', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Texto botón</label>
                <input
                  className={inputClass}
                  value={form.ctaButtonText}
                  onChange={(e) => updateField('ctaButtonText', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Link botón</label>
                <input
                  className={inputClass}
                  value={form.ctaButtonLink}
                  onChange={(e) => updateField('ctaButtonLink', e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className={`${sectionTitleClass} mb-4`}>Vista rápida del JSON</h2>
            <p className="mb-4 text-sm text-slate-500">
              Esto te sirve para revisar exactamente lo que se está guardando en Supabase.
            </p>

            <pre className="overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-slate-100">
              {JSON.stringify(form, null, 2)}
            </pre>
          </section>
        </div>
      </div>
    );
  }

  function renderContent() {
    switch (currentSection) {
      case 'dashboard':
        return renderDashboard();
      case 'home':
        return renderHomeEditor();
      case 'specialties':
        return (
          <SectionPlaceholder
            title="Editor de Especialidades"
            description="Aquí podrás editar la página de especialidades y sus contenidos asociados."
            onBack={() => setCurrentSection('dashboard')}
          />
        );
      case 'resources':
        return (
          <SectionPlaceholder
            title="Editor de Recursos"
            description="Aquí podrás subir materiales, enlaces y recursos para tus estudiantes."
            onBack={() => setCurrentSection('dashboard')}
          />
        );
      case 'blog':
        return (
          <SectionPlaceholder
            title="Editor de Blog TP"
            description="Aquí podrás administrar publicaciones, noticias y novedades del sitio."
            onBack={() => setCurrentSection('dashboard')}
          />
        );
      case 'internships':
        return (
          <SectionPlaceholder
            title="Editor de Prácticas"
            description="Aquí podrás gestionar prácticas, convenios, orientaciones y oportunidades."
            onBack={() => setCurrentSection('dashboard')}
          />
        );
      case 'playground':
        return (
          <SectionPlaceholder
            title="Editor de Patio de Juegos"
            description="Aquí podrás crear actividades interactivas y experiencias para los alumnos."
            onBack={() => setCurrentSection('dashboard')}
          />
        );
      default:
        return renderDashboard();
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">{renderContent()}</div>
    </div>
  );
}
