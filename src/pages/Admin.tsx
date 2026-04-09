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

  // compatibilidad legacy
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

      <div className="rounded-2xl border border-dashed border-slate
