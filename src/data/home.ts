export type StatItem = {
  value: string;
  label: string;
};

export type SpecialtyCard = {
  title: string;
  description: string;
  icon: string;
  iconUrl?: string;
  imageUrl?: string;
  link: string;
};

export type HomeContent = {
  hub?: {
    title?: string;
    description?: string;
    primaryText?: string;
    primaryLink?: string;
    secondaryText?: string;
    secondaryLink?: string;
  };
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

export const fallbackContent: HomeContent = {
  hub: {
    title: "Tu futuro se aprende haciendo.",
    description:
      "Aprende, practica, juega, emprende y prepárate para el mundo que viene.",
    primaryText: "Explorar mi especialidad",
    primaryLink: "/especialidades",
    secondaryText: "Jugar ahora",
    secondaryLink: "/playground",
  },
  heroBadge: "Tu comunidad técnico profesional",
  heroTitleLine1: "Formando talentos para el futuro",
  heroTitleLine1Color: "#ffffff",
  heroTitleGreen: "Administración",
  heroTitleGreenColor: "#10b981",
  heroTitleYellow: "Agropecuaria",
  heroTitleYellowColor: "#eab308",
  heroTitleRed: "Párvulos",
  heroTitleRedColor: "#ef4444",
  heroDescription:
    "Impulsamos una educación técnico profesional conectada con el territorio, la innovación y el desarrollo de competencias para la vida y el trabajo.",
  heroPrimaryButtonText: "Conoce nuestras especialidades",
  heroPrimaryButtonLink: "/especialidades",
  heroSecondaryButtonText: "Ver prácticas",
  heroSecondaryButtonLink: "/practicas",
  heroImageUrl: "/images/home/administracion.JPG",
  heroImageAlt:
    "Estudiantes trabajando con computadores en el aula de Administración",
  heroFeatureTitle: "Educación TP conectada con el mundo real",
  heroFeatureSubtitle:
    "Aprendizaje práctico, vinculación con empresas y desarrollo integral.",
  stats: [
    { value: "3", label: "Especialidades" },
    { value: "100%", label: "Compromiso" },
    { value: "TP", label: "Formación técnico profesional" },
  ],
  specialtiesBadge: "Especialidades",
  specialtiesTitle: "Áreas de formación",
  specialtiesSubtitle:
    "Conoce nuestras especialidades y las oportunidades que ofrecen para el desarrollo académico y laboral.",
  specialties: [
    {
      title: "Administración",
      description:
        "Formación en gestión, organización, procesos administrativos y herramientas digitales.",
      icon: "Users",
      iconUrl: "",
      imageUrl: "",
      link: "/especialidades/administracion",
    },
    {
      title: "Agropecuaria",
      description:
        "Desarrollo de competencias vinculadas al trabajo agrícola, producción y sostenibilidad.",
      icon: "Beef",
      iconUrl: "",
      imageUrl: "",
      link: "/especialidades/agricola",
    },
    {
      title: "Atención de Párvulos",
      description:
        "Preparación para apoyar procesos educativos y de cuidado en primera infancia.",
      icon: "Baby",
      iconUrl: "",
      imageUrl: "",
      link: "/especialidades/parvularia",
    },
  ],
  ctaBadge: "Comunidad educativa",
  ctaTitle: "Construyamos futuro juntos",
  ctaDescription:
    "Descubre nuestro proyecto educativo, las oportunidades formativas y la vida escolar de nuestra comunidad.",
  ctaButtonText: "Explorar recursos",
  ctaButtonLink: "/recursos",
};

export function mergeHomeContent(
  dbContent?: Partial<HomeContent> | null,
): HomeContent {
  return {
    ...fallbackContent,
    ...(dbContent || {}),
    hub: { ...fallbackContent.hub, ...dbContent?.hub },
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
