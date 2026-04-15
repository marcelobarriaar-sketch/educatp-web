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
  Settings,
  Palette,
  Image as ImageIcon,
  MapPin,
  Eye,
  EyeOff,
  Link as LinkIcon,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import ResourceForm from '../components/admin/ResourceForm';

type ResourceStatus = 'active' | 'draft' | 'archived';
type ResourceType = 'document' | 'pdf' | 'presentation' | 'video' | 'guide' | 'form';

type ResourceItem = {
  id: string;
  title: string;
  topic: string;
  description: string;
  type: ResourceType;
  url: string;
  createdAt: string;
  teacher: string;
  level: string;
  subject: string;
  specialty: string;
  tags: string[];
  status: ResourceStatus;
  order: number;
};

type SubjectItem = {
  id: string;
  name: string;
};

type LevelItem = {
  id: string;
  name: string;
  subjects: SubjectItem[];
};

type SpecialtyItem = {
  id: string;
  name: string;
  levels: LevelItem[];
};

type StatItem = {
  value: string;
  label: string;
};

type SpecialtyCard = {
  title: string;
  description: string;
  icon: string;
  iconUrl?: string;
  imageUrl?: string;
  link: string;
};

type HomeContent = {
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine1Color: string;
  heroTitleGreen: string;
  heroTitleGreenColor: string;
  heroTitleYellow: string;
  heroTitleYellowColor: string;
  heroTitleRed: string;
  heroTitleRedColor: string;
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

type MenuItem = {
  id: string;
  name: string;
  path: string;
  visible: boolean;
};

type LegacyNavItem = {
  id: string;
  label: string;
  path: string;
  visible: boolean;
};

type SocialLink = {
  id: string;
  label: string;
  url: string;
  visible: boolean;
};

type ThemeSettings = {
  primaryColor: string;
  primaryHoverColor: string;
  secondaryColor: string;
  accentColor: string;
  dangerColor: string;
  headerBackgroundColor: string;
  footerBackgroundColor: string;
  footerTextColor: string;
  brandTextColor: string;
};

type SiteSettings = {
  siteName: string;
  logoUrl: string;
  logoAlt: string;
  schoolSubtitle: string;
  menuItems: MenuItem[];
  footerTitle: string;
  footerDescription: string;
  address: string;
  email: string;
  phone: string;
  copyrightText: string;
  creditsText: string;
  socialLinks: SocialLink[];
  theme: ThemeSettings;

  navItems?: LegacyNavItem[];
  brandTextColor?: string;
  headerBgColor?: string;
};

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

type AdminSection =
  | 'dashboard'
  | 'central'
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
  heroTitleLine1Color: '#0f172a',
  heroTitleGreen: 'Administración',
  heroTitleGreenColor: '#064e3b',
  heroTitleYellow: 'Agropecuaria',
  heroTitleYellowColor: '#eab308',
  heroTitleRed: 'Atención de Párvulos',
  heroTitleRedColor: '#991b1b',
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
      iconUrl: '',
      imageUrl: '',
      link: '/especialidades/administracion',
    },
    {
      title: 'Agropecuaria',
      description: 'Desarrollo de competencias vinculadas al trabajo agrícola, producción y sostenibilidad.',
      icon: 'Beef',
      iconUrl: '',
      imageUrl: '',
      link: '/especialidades/agropecuaria',
    },
    {
      title: 'Atención de Párvulos',
      description: 'Preparación para apoyar procesos educativos y de cuidado en primera infancia.',
      icon: 'Baby',
      iconUrl: '',
      imageUrl: '',
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

const defaultSiteSettings: SiteSettings = {
  siteName: 'Educa TP',
  logoUrl: '',
  logoAlt: 'Logo del establecimiento',
  schoolSubtitle: 'Liceo Carlos Ibáñez del Campo',
  menuItems: [
    { id: 'inicio', name: 'Inicio', path: '/', visible: true },
    { id: 'especialidades', name: 'Especialidades', path: '/especialidades', visible: true },
    { id: 'recursos', name: 'Recursos', path: '/recursos', visible: true },
    { id: 'blog', name: 'Blog TP', path: '/blog', visible: true },
    { id: 'practicas', name: 'Prácticas', path: '/practicas', visible: true },
    { id: 'patio', name: 'Patio de Juegos', path: '/playground', visible: true },
  ],
  footerTitle: 'Educa TP',
  footerDescription: 'Formación técnico profesional conectada con el territorio, la innovación y el futuro.',
  address: 'Fresia, Región de Los Lagos, Chile',
  email: 'contacto@educatp.cl',
  phone: '+56 9 0000 0000',
  copyrightText: 'Todos los derechos reservados.',
  creditsText: 'Espacio creado por el docente Marcelo Barría Arismendi.',
  socialLinks: [
    { id: 'facebook', label: 'Facebook', url: '', visible: false },
    { id: 'instagram', label: 'Instagram', url: '', visible: false },
    { id: 'youtube', label: 'YouTube', url: '', visible: false },
  ],
  theme: {
    primaryColor: '#064e3b',
    primaryHoverColor: '#043d2f',
    secondaryColor: '#eab308',
    accentColor: '#991b1b',
    dangerColor: '#dc2626',
    headerBackgroundColor: '#ffffff',
    footerBackgroundColor: '#0f172a',
    footerTextColor: '#cbd5e1',
    brandTextColor: '#0f172a',
  },
  navItems: [
    { id: 'inicio', label: 'Inicio', path: '/', visible: true },
    { id: 'especialidades', label: 'Especialidades', path: '/especialidades', visible: true },
    { id: 'recursos', label: 'Recursos', path: '/recursos', visible: true },
    { id: 'blog', label: 'Blog TP', path: '/blog', visible: true },
    { id: 'practicas', label: 'Prácticas', path: '/practicas', visible: true },
    { id: 'patio', label: 'Patio de Juegos', path: '/playground', visible: true },
  ],
  brandTextColor: '#0f172a',
  headerBgColor: '#ffffff',
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

function normalizeMenuItems(content: any): MenuItem[] {
  if (Array.isArray(content?.menuItems) && content.menuItems.length > 0) {
    return content.menuItems.map((item: any, index: number) => ({
      id: item.id || `menu-${index}-${Date.now()}`,
      name: item.name || item.label || '',
      path: item.path || '/',
      visible: item.visible !== false,
    }));
  }

  if (Array.isArray(content?.navItems) && content.navItems.length > 0) {
    return content.navItems.map((item: any, index: number) => ({
      id: item.id || `menu-${index}-${Date.now()}`,
      name: item.name || item.label || '',
      path: item.path || '/',
      visible: item.visible !== false,
    }));
  }

  return defaultSiteSettings.menuItems;
}

function mergeSiteSettings(content: Partial<SiteSettings> | null | undefined): SiteSettings {
  const mergedTheme = {
    ...defaultSiteSettings.theme,
    ...(content?.theme || {}),
  };

  const menuItems = normalizeMenuItems(content);

  return {
    ...defaultSiteSettings,
    ...(content || {}),
    schoolSubtitle: content?.schoolSubtitle || defaultSiteSettings.schoolSubtitle,
    menuItems,
    socialLinks: Array.isArray(content?.socialLinks) ? content.socialLinks : defaultSiteSettings.socialLinks,
    theme: mergedTheme,
    navItems: menuItems.map((item) => ({
      id: item.id,
      label: item.name,
      path: item.path,
      visible: item.visible,
    })),
    brandTextColor: mergedTheme.brandTextColor,
    headerBgColor: mergedTheme.headerBackgroundColor,
  };
}

function serializeSiteSettings(settings: SiteSettings) {
  const legacyNavItems: LegacyNavItem[] = settings.menuItems.map((item) => ({
    id: item.id,
    label: item.name,
    path: item.path,
    visible: item.visible,
  }));

  return {
    ...settings,
    menuItems: settings.menuItems,
    navItems: legacyNavItems,
    brandTextColor: settings.theme.brandTextColor,
    headerBgColor: settings.theme.headerBackgroundColor,
  };
}

const adminSections: Array<{
  key: AdminSection;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    key: 'central',
    title: 'Panel central',
    description: 'Edita logo, nombre del sitio, menú, footer, redes y datos generales.',
    icon: Settings,
  },
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
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500">Panel CMS</p>
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
            hicimos con Inicio y Panel central.
          </p>
        </div>
      </section>
    </div>
  );
}

function TitleColorField({
  label,
  textValue,
  colorValue,
  onTextChange,
  onColorChange,
  disableTextInput = false,
}: {
  label: string;
  textValue: string;
  colorValue: string;
  onTextChange: (value: string) => void;
  onColorChange: (value: string) => void;
  disableTextInput?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4">
        <label className={labelClass}>{label}</label>
        <input
          className={`${inputClass} ${disableTextInput ? 'cursor-not-allowed bg-slate-100 text-slate-500' : ''}`}
          value={textValue}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Texto"
          disabled={disableTextInput}
        />
      </div>

      <div className="mb-4">
        <label className={labelClass}>Color</label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="color"
            value={colorValue || '#000000'}
            onChange={(e) => onColorChange(e.target.value)}
            className="h-12 w-20 cursor-pointer rounded-xl border border-slate-300 bg-white p-1"
            title="Elegir color"
          />

          <input
            className={inputClass}
            value={colorValue}
            onChange={(e) => onColorChange(e.target.value)}
            placeholder="#000000"
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Puedes usar la paleta, pegar un color HEX o usar el selector del navegador si aparece disponible.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Vista previa</p>
        <span className="text-2xl font-black tracking-tight" style={{ color: colorValue || '#000000' }}>
          {textValue || 'Texto de ejemplo'}
        </span>
      </div>
    </div>
  );
}

export default function Admin() {
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [form, setForm] = useState<HomeContent>(defaultHomeContent);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);

  const [loading, setLoading] = useState(false);
  const [homeLoaded, setHomeLoaded] = useState(false);
  const [centralLoaded, setCentralLoaded] = useState(false);

  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const mockSpecialty: SpecialtyItem = {
    id: 'administracion',
    name: 'Administración',
    levels: [
      {
        id: 'tercero-medio',
        name: '3° Medio TP',
        subjects: [
          { id: 'aplicaciones-informaticas', name: 'Aplicaciones informáticas para la gestión administrativa' },
          { id: 'organizacion-oficinas', name: 'Organización de oficinas' },
        ],
      },
      {
        id: 'cuarto-medio',
        name: '4° Medio TP',
        subjects: [
          { id: 'emprendimiento-empleabilidad', name: 'Emprendimiento y empleabilidad' },
          { id: 'legislacion-laboral', name: 'Legislación laboral' },
        ],
      },
    ],
  };

  const [resources, setResources] = useState<ResourceItem[]>([]);

  function handleSaveResource(resource: ResourceItem) {
    setResources((prev) => [...prev, resource].sort((a, b) => a.order - b.order));
  }

  function removeResource(resourceId: string) {
    setResources((prev) => prev.filter((item) => item.id !== resourceId));
  }

  const saveLabel = useMemo(() => {
    if (saveState === 'saving') return 'Guardando...';
    if (saveState === 'saved') return 'Guardado';
    if (saveState === 'error') return 'Error al guardar';
    return 'Guardar cambios';
  }, [saveState]);

  useEffect(() => {
    if (currentSection === 'home' && !homeLoaded) loadHome();
    if (currentSection === 'central' && !centralLoaded) loadSiteSettings();
  }, [currentSection, homeLoaded, centralLoaded]);

  async function loadHome() {
    try {
      setLoading(true);
      setErrorMsg('');

      const { data, error } = await supabase.from('pages').select('slug, content').eq('slug', 'home').maybeSingle();
      if (error) throw error;

      if (!data) {
        setForm(defaultHomeContent);
        setHomeLoaded(true);
        return;
      }

      setForm(mergeHomeContent(data.content as Partial<HomeContent>));
      setHomeLoaded(true);
    } catch (error: any) {
      console.error('Error cargando Home:', error);
      setErrorMsg(error?.message || 'No se pudo cargar el contenido.');
    } finally {
      setLoading(false);
    }
  }

  async function loadSiteSettings() {
    try {
      setLoading(true);
      setErrorMsg('');

      const { data, error } = await supabase
        .from('pages')
        .select('slug, content')
        .eq('slug', 'site_settings')
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setSiteSettings(defaultSiteSettings);
        setCentralLoaded(true);
        return;
      }

      setSiteSettings(mergeSiteSettings(data.content as Partial<SiteSettings>));
      setCentralLoaded(true);
    } catch (error: any) {
      console.error('Error cargando site_settings:', error);
      setErrorMsg(error?.message || 'No se pudo cargar la configuración general.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaveState('saving');
      setErrorMsg('');

      if (currentSection === 'home') {
        const { error } = await supabase.from('pages').upsert(
          {
            slug: 'home',
            content: form,
          },
          { onConflict: 'slug' }
        );
        if (error) throw error;
      }

      if (currentSection === 'central') {
        const payload = serializeSiteSettings(siteSettings);

        const { error } = await supabase.from('pages').upsert(
          {
            slug: 'site_settings',
            content: payload,
          },
          { onConflict: 'slug' }
        );
        if (error) throw error;

        setSiteSettings(mergeSiteSettings(payload));
      }

      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 1800);
    } catch (error: any) {
      console.error('Error guardando:', error);
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
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateStat(index: number, field: keyof StatItem, value: string) {
    setForm((prev) => {
      const next = [...prev.stats];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, stats: next };
    });
  }

  function addStat() {
    setForm((prev) => ({ ...prev, stats: [...prev.stats, { value: '', label: '' }] }));
  }

  function removeStat(index: number) {
    setForm((prev) => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }));
  }

  function updateSpecialty(index: number, field: keyof SpecialtyCard, value: string) {
    setForm((prev) => {
      const next = [...prev.specialties];
      next[index] = { ...next[index], [field]: value };
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
          iconUrl: '',
          imageUrl: '',
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

  function updateSiteField<K extends keyof SiteSettings>(field: K, value: SiteSettings[K]) {
    setSiteSettings((prev) => ({ ...prev, [field]: value }));
  }

  function updateThemeField<K extends keyof ThemeSettings>(field: K, value: ThemeSettings[K]) {
    setSiteSettings((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        [field]: value,
      },
      brandTextColor: field === 'brandTextColor' ? value : prev.theme.brandTextColor,
      headerBgColor: field === 'headerBackgroundColor' ? value : prev.theme.headerBackgroundColor,
    }));
  }

  function updateMenuItem(index: number, field: keyof MenuItem, value: string | boolean) {
    setSiteSettings((prev) => {
      const next = [...prev.menuItems];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, menuItems: next };
    });
  }

  function addMenuItem() {
    setSiteSettings((prev) => ({
      ...prev,
      menuItems: [
        ...prev.menuItems,
        {
          id: `menu-${Date.now()}`,
          name: '',
          path: '/',
          visible: true,
        },
      ],
    }));
  }

  function removeMenuItem(index: number) {
    setSiteSettings((prev) => ({
      ...prev,
      menuItems: prev.menuItems.filter((_, i) => i !== index),
    }));
  }

  function updateSocialLink(index: number, field: keyof SocialLink, value: string | boolean) {
    setSiteSettings((prev) => {
      const next = [...prev.socialLinks];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, socialLinks: next };
    });
  }

  function addSocialLink() {
    setSiteSettings((prev) => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        {
          id: `social-${Date.now()}`,
          label: '',
          url: '',
          visible: true,
        },
      ],
    }));
  }

  function removeSocialLink(index: number) {
    setSiteSettings((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
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

  function renderCentralEditor() {
    if (loading) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="flex items-center justify-center text-slate-700">
            <Loader2 className="mr-3 h-5 w-5 animate-spin text-slate-600" />
            Cargando Panel central...
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Panel central</h1>
            <p className="mt-2 text-sm text-slate-600">
              Aquí puedes editar la estructura superior e inferior del sitio, la visibilidad del menú y la información
              institucional global.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={handleLogout} className={mutedButtonClass} type="button">
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>

            <button onClick={handleSave} className={primaryButtonClass} type="button">
              {saveState === 'saving' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saveLabel}
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        <section className={cardClass}>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2">
              <ImageIcon className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h2 className={sectionTitleClass}>Encabezado del sitio</h2>
              <p className="text-sm text-slate-500">Logo, nombre del establecimiento y configuración base.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Nombre del establecimiento</label>
              <input
                className={inputClass}
                value={siteSettings.siteName}
                onChange={(e) => updateSiteField('siteName', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Subtítulo del establecimiento</label>
              <input
                className={inputClass}
                value={siteSettings.schoolSubtitle}
                onChange={(e) => updateSiteField('schoolSubtitle', e.target.value)}
                placeholder="Liceo Carlos Ibáñez del Campo"
              />
            </div>

            <div>
              <label className={labelClass}>Texto alternativo del logo</label>
              <input
                className={inputClass}
                value={siteSettings.logoAlt}
                onChange={(e) => updateSiteField('logoAlt', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>URL del logo</label>
              <input
                className={inputClass}
                value={siteSettings.logoUrl}
                onChange={(e) => updateSiteField('logoUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </section>

        <section className={cardClass}>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2">
              <Palette className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h2 className={sectionTitleClass}>Colores globales del sitio</h2>
              <p className="text-sm text-slate-500">
                Desde aquí controlas la identidad visual general del proyecto.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TitleColorField
              label="Color principal"
              textValue="Botones principales / menú activo"
              colorValue={siteSettings.theme.primaryColor}
              onTextChange={() => {}}
              onColorChange={(value) => updateThemeField('primaryColor', value)}
              disableTextInput
            />
            <TitleColorField
              label="Hover color principal"
              textValue="Hover de botones principales"
              colorValue={siteSettings.theme.primaryHoverColor}
              onTextChange={() => {}}
              onColorChange={(value) => updateThemeField('primaryHoverColor', value)}
              disableTextInput
            />
            <TitleColorField
              label="Color secundario"
              textValue="Destacados secundarios"
              colorValue={siteSettings.theme.secondaryColor}
              onTextChange={() => {}}
              onColorChange={(value) => updateThemeField('secondaryColor', value)}
              disableTextInput
            />
            <TitleColorField
              label="Color acento"
              textValue="Elementos de énfasis"
              colorValue={siteSettings.theme.accentColor}
              onTextChange={() => {}}
              onColorChange={(value) => updateThemeField('accentColor', value)}
              disableTextInput
            />
            <TitleColorField
              label="Color de peligro"
              textValue="Alertas y acciones destructivas"
              colorValue={siteSettings.theme.dangerColor}
              onTextChange={() => {}}
              onColorChange={(value) => updateThemeField('dangerColor', value)}
              disableTextInput
            />
            <TitleColorField
              label="Color texto de marca"
              textValue="Nombre del establecimiento"
              colorValue={siteSettings.theme.brandTextColor}
              onTextChange={() => {}}
              onColorChange={(value) => updateThemeField('brandTextColor', value)}
              disableTextInput
            />
            <TitleColorField
              label="Fondo encabezado"
              textValue="Navbar"
              colorValue={siteSettings.theme.headerBackgroundColor}
              onTextChange={() => {}}
              onColorChange={(value) => updateThemeField('headerBackgroundColor', value)}
              disableTextInput
            />
            <TitleColorField
              label="Fondo footer"
              textValue="Pie de página"
              colorValue={siteSettings.theme.footerBackgroundColor}
              onTextChange={() => {}}
              onColorChange={(value) => updateThemeField('footerBackgroundColor', value)}
              disableTextInput
            />
            <TitleColorField
              label="Texto footer"
              textValue="Contenido pie de página"
              colorValue={siteSettings.theme.footerTextColor}
              onTextChange={() => {}}
              onColorChange={(value) => updateThemeField('footerTextColor', value)}
              disableTextInput
            />
          </div>
        </section>

        <section className={cardClass}>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2">
              <Settings className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h2 className={sectionTitleClass}>Subpáginas y menú principal</h2>
              <p className="text-sm text-slate-500">
                Puedes agregar, ocultar o mostrar páginas sin borrarlas definitivamente.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {siteSettings.menuItems.map((item, index) => (
              <div
                key={item.id}
                className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1.2fr_1.2fr_auto_auto]"
              >
                <div>
                  <label className={labelClass}>Nombre visible</label>
                  <input
                    className={inputClass}
                    value={item.name}
                    onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Ruta / enlace</label>
                  <input
                    className={inputClass}
                    value={item.path}
                    onChange={(e) => updateMenuItem(index, 'path', e.target.value)}
                    placeholder="/mes-tp"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    className={mutedButtonClass}
                    onClick={() => updateMenuItem(index, 'visible', !item.visible)}
                  >
                    {item.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    {item.visible ? 'Visible' : 'Oculto'}
                  </button>
                </div>

                <div className="flex items-end">
                  <button type="button" className={dangerButtonClass} onClick={() => removeMenuItem(index)}>
                    <Trash2 className="h-4 w-4" />
                    Quitar
                  </button>
                </div>
              </div>
            ))}

            <button type="button" className={mutedButtonClass} onClick={addMenuItem}>
              <Plus className="h-4 w-4" />
              Agregar subpágina al menú
            </button>
          </div>
        </section>

        <section className={cardClass}>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2">
              <Palette className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h2 className={sectionTitleClass}>Pie de página</h2>
              <p className="text-sm text-slate-500">Controla la parte inferior del sitio y su contenido general.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Título del footer</label>
              <input
                className={inputClass}
                value={siteSettings.footerTitle}
                onChange={(e) => updateSiteField('footerTitle', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Texto copyright</label>
              <input
                className={inputClass}
                value={siteSettings.copyrightText}
                onChange={(e) => updateSiteField('copyrightText', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Descripción del footer</label>
              <textarea
                className={`${inputClass} min-h-[110px]`}
                value={siteSettings.footerDescription}
                onChange={(e) => updateSiteField('footerDescription', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Créditos / reconocimiento</label>
              <input
                className={inputClass}
                value={siteSettings.creditsText}
                onChange={(e) => updateSiteField('creditsText', e.target.value)}
                placeholder="Espacio creado por..."
              />
            </div>
          </div>
        </section>

        <section className={cardClass}>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2">
              <MapPin className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h2 className={sectionTitleClass}>Datos de contacto</h2>
              <p className="text-sm text-slate-500">Dirección, correo y teléfono visibles en el sitio.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClass}>Dirección</label>
              <input
                className={inputClass}
                value={siteSettings.address}
                onChange={(e) => updateSiteField('address', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Correo</label>
              <input
                className={inputClass}
                value={siteSettings.email}
                onChange={(e) => updateSiteField('email', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Teléfono</label>
              <input
                className={inputClass}
                value={siteSettings.phone}
                onChange={(e) => updateSiteField('phone', e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className={cardClass}>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2">
              <LinkIcon className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h2 className={sectionTitleClass}>Redes sociales</h2>
              <p className="text-sm text-slate-500">Agrega, quita u oculta enlaces sociales según te convenga.</p>
            </div>
          </div>

          <div className="space-y-4">
            {siteSettings.socialLinks.map((item, index) => (
              <div
                key={item.id}
                className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1.6fr_auto_auto]"
              >
                <div>
                  <label className={labelClass}>Nombre</label>
                  <input
                    className={inputClass}
                    value={item.label}
                    onChange={(e) => updateSocialLink(index, 'label', e.target.value)}
                    placeholder="Facebook"
                  />
                </div>

                <div>
                  <label className={labelClass}>URL</label>
                  <input
                    className={inputClass}
                    value={item.url}
                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    className={mutedButtonClass}
                    onClick={() => updateSocialLink(index, 'visible', !item.visible)}
                  >
                    {item.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    {item.visible ? 'Visible' : 'Oculto'}
                  </button>
                </div>

                <div className="flex items-end">
                  <button type="button" className={dangerButtonClass} onClick={() => removeSocialLink(index)}>
                    <Trash2 className="h-4 w-4" />
                    Quitar
                  </button>
                </div>
              </div>
            ))}

            <button type="button" className={mutedButtonClass} onClick={addSocialLink}>
              <Plus className="h-4 w-4" />
              Agregar red social
            </button>
          </div>
        </section>

        <section className={cardClass}>
          <h2 className={`${sectionTitleClass} mb-4`}>Vista rápida del JSON general</h2>
          <p className="mb-4 text-sm text-slate-500">
            Este bloque te muestra exactamente lo que se guardará como configuración global del sitio.
          </p>

          <pre className="overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-slate-100">
            {JSON.stringify(serializeSiteSettings(siteSettings), null, 2)}
          </pre>
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
              {saveState === 'saving' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
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
                <label className={labelClass}>Alt de imagen</label>
                <input
                  className={inputClass}
                  value={form.heroImageAlt}
                  onChange={(e) => updateField('heroImageAlt', e.target.value)}
                />
              </div>

              <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-slate-100 p-2">
                    <Palette className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Título principal con colores editables</h3>
                    <p className="text-sm text-slate-500">
                      Aquí puedes cambiar cada palabra y su color sin tocar el código.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <TitleColorField
                    label="Palabra 1 / línea inicial"
                    textValue={form.heroTitleLine1}
                    colorValue={form.heroTitleLine1Color}
                    onTextChange={(value) => updateField('heroTitleLine1', value)}
                    onColorChange={(value) => updateField('heroTitleLine1Color', value)}
                  />

                  <TitleColorField
                    label="Palabra 2"
                    textValue={form.heroTitleGreen}
                    colorValue={form.heroTitleGreenColor}
                    onTextChange={(value) => updateField('heroTitleGreen', value)}
                    onColorChange={(value) => updateField('heroTitleGreenColor', value)}
                  />

                  <TitleColorField
                    label="Palabra 3"
                    textValue={form.heroTitleYellow}
                    colorValue={form.heroTitleYellowColor}
                    onTextChange={(value) => updateField('heroTitleYellow', value)}
                    onColorChange={(value) => updateField('heroTitleYellowColor', value)}
                  />

                  <TitleColorField
                    label="Palabra 4"
                    textValue={form.heroTitleRed}
                    colorValue={form.heroTitleRedColor}
                    onTextChange={(value) => updateField('heroTitleRed', value)}
                    onColorChange={(value) => updateField('heroTitleRedColor', value)}
                  />
                </div>

                <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Vista previa del título completo
                  </p>
                  <h3 className="text-2xl font-black leading-tight tracking-tight md:text-4xl">
                    <span style={{ color: form.heroTitleLine1Color || '#0f172a' }}>
                      {form.heroTitleLine1 || 'Título'}
                    </span>{' '}
                    <span style={{ color: form.heroTitleGreenColor || '#064e3b' }}>
                      {form.heroTitleGreen || 'Palabra'}
                    </span>{' '}
                    <span style={{ color: form.heroTitleYellowColor || '#eab308' }}>
                      {form.heroTitleYellow || 'Editable'}
                    </span>{' '}
                    <span style={{ color: form.heroTitleRedColor || '#991b1b' }}>
                      {form.heroTitleRed || 'Aquí'}
                    </span>
                  </h3>
                </div>
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

                    <div>
                      <label className={labelClass}>URL del logo</label>
                      <input
                        className={inputClass}
                        value={item.iconUrl || ''}
                        onChange={(e) => updateSpecialty(index, 'iconUrl', e.target.value)}
                        placeholder="https://... o /images/especialidades/logo-admin.png"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>URL imagen de fondo</label>
                      <input
                        className={inputClass}
                        value={item.imageUrl || ''}
                        onChange={(e) => updateSpecialty(index, 'imageUrl', e.target.value)}
                        placeholder="https://... o /images/especialidades/fondo-admin.jpg"
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

                    <div className="md:col-span-2">
                      <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-xs text-slate-500">
                        La imagen de fondo se usará en la tarjeta de especialidad. En el siguiente paso la dejaremos en
                        blanco y negro por defecto, con color al pasar el mouse.
                      </p>
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

  function renderResourcesEditor() {
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Editor de Recursos</h1>
            <p className="mt-2 text-sm text-slate-600">
              Aquí podrás crear recursos educativos livianos mediante enlaces externos, sin sobrecargar el sistema.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={handleLogout} className={mutedButtonClass} type="button">
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        <section className={cardClass}>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2">
              <BookOpen className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h2 className={sectionTitleClass}>Nuevo recurso</h2>
              <p className="text-sm text-slate-500">
                Agrega enlaces a PDF, Google Drive, YouTube u otros materiales para tus estudiantes.
              </p>
            </div>
          </div>

          <ResourceForm
  onSave={handleSaveResource}
  initialSpecialtyId="administracion"
  initialLevelId="tercero-medio"
  initialSubjectId="aplicaciones-informaticas"
/>
        </section>

        <section className={cardClass}>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2">
              <BookOpen className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <h2 className={sectionTitleClass}>Recursos cargados en esta sesión</h2>
              <p className="text-sm text-slate-500">
                Esto sirve para verificar visualmente que el formulario ya está funcionando.
              </p>
            </div>
          </div>

          {resources.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
              Aún no has agregado recursos en esta sesión.
            </div>
          ) : (
            <div className="space-y-4">
              {resources.map((resource) => (
                <div key={resource.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
                      <p className="text-sm text-slate-600">{resource.description || 'Sin descripción.'}</p>

                      <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                          {resource.specialty}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                          {resource.level}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                          {resource.subject}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                          {resource.type}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                          {resource.status}
                        </span>
                      </div>

                      <div className="text-sm">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Abrir recurso
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <button
                        type="button"
                        className={dangerButtonClass}
                        onClick={() => removeResource(resource.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={cardClass}>
          <h2 className={`${sectionTitleClass} mb-4`}>Recomendación técnica</h2>
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            Para mantener el sitio rápido y estable, sube preferentemente recursos mediante enlaces públicos externos
            en vez de almacenar archivos pesados directamente dentro del proyecto.
          </div>
        </section>
      </div>
    );
  }

  function renderContent() {
    switch (currentSection) {
      case 'dashboard':
        return renderDashboard();

      case 'central':
        return renderCentralEditor();

      case 'home':
        return renderHomeEditor();

      case 'specialties':
        return (
          <SectionPlaceholder
            title="Especialidades"
            description="Aquí luego conectaremos el editor completo de especialidades."
            onBack={() => setCurrentSection('dashboard')}
          />
        );

      case 'resources':
        return renderResourcesEditor();

      case 'blog':
        return (
          <SectionPlaceholder
            title="Blog TP"
            description="Aquí luego conectaremos el editor del blog y noticias."
            onBack={() => setCurrentSection('dashboard')}
          />
        );

      case 'internships':
        return (
          <SectionPlaceholder
            title="Prácticas"
            description="Aquí luego conectaremos el editor de prácticas y convenios."
            onBack={() => setCurrentSection('dashboard')}
          />
        );

      case 'playground':
        return (
          <SectionPlaceholder
            title="Patio de Juegos"
            description="Aquí luego conectaremos actividades y recursos interactivos."
            onBack={() => setCurrentSection('dashboard')}
          />
        );

      default:
        return renderDashboard();
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">{renderContent()}</div>
    </main>
  );
}
