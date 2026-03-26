import React from 'react';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type NavItem = {
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

type SiteSettings = {
  siteName?: string;
  logoUrl?: string;
  logoAlt?: string;
  footerTitle?: string;
  footerDescription?: string;
  address?: string;
  email?: string;
  phone?: string;
  copyrightText?: string;
  creditsText?: string;
  navItems?: NavItem[];
  socialLinks?: SocialLink[];
  footerBackgroundColor?: string;
  footerTextColor?: string;
  brandTextColor?: string;
};

const defaultSettings: SiteSettings = {
  siteName: 'Educa TP',
  logoUrl: '',
  logoAlt: 'Logo del establecimiento',
  footerTitle: 'Educa TP',
  footerDescription:
    'Formación técnico profesional conectada con el territorio, la innovación y el futuro.',
  address: 'Fresia, Región de Los Lagos, Chile',
  email: 'contacto@educatp.cl',
  phone: '+56 9 0000 0000',
  copyrightText: 'Todos los derechos reservados.',
  creditsText: 'Espacio creado por el docente Marcelo Barría Arismendi.',
  footerBackgroundColor: '#0f172a',
  footerTextColor: '#cbd5e1',
  brandTextColor: '#ffffff',
  navItems: [
    { id: 'inicio', label: 'Inicio', path: '/', visible: true },
    { id: 'especialidades', label: 'Especialidades', path: '/especialidades', visible: true },
    { id: 'recursos', label: 'Recursos', path: '/recursos', visible: true },
    { id: 'blog', label: 'Blog TP', path: '/blog', visible: true },
    { id: 'practicas', label: 'Prácticas', path: '/practicas', visible: true },
    { id: 'patio', label: 'Patio de Juegos', path: '/playground', visible: true },
  ],
  socialLinks: [
    { id: 'facebook', label: 'Facebook', url: '', visible: false },
    { id: 'instagram', label: 'Instagram', url: '', visible: false },
    { id: 'youtube', label: 'YouTube', url: '', visible: false },
  ],
};

function mergeSettings(content?: Partial<SiteSettings> | null): SiteSettings {
  return {
    ...defaultSettings,
    ...(content || {}),
    navItems: Array.isArray(content?.navItems)
      ? content.navItems
      : defaultSettings.navItems,
    socialLinks: Array.isArray(content?.socialLinks)
      ? content.socialLinks
      : defaultSettings.socialLinks,
  };
}

function getSocialIcon(label: string, id: string) {
  const key = `${label} ${id}`.toLowerCase();

  if (key.includes('facebook')) return Facebook;
  if (key.includes('instagram')) return Instagram;
  if (key.includes('twitter') || key.includes('x')) return Twitter;
  if (key.includes('youtube')) return Youtube;

  return Link;
}

export default function Footer() {
  const [settings, setSettings] = React.useState<SiteSettings>(defaultSettings);

  React.useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('content')
          .eq('slug', 'site_settings')
          .single();

        if (error) {
          console.error('Error cargando footer:', error);
          setSettings(defaultSettings);
          return;
        }

        if (data?.content) {
          setSettings(mergeSettings(data.content as Partial<SiteSettings>));
        }
      } catch (err) {
        console.error('Error inesperado cargando footer:', err);
        setSettings(defaultSettings);
      }
    };

    loadSettings();
  }, []);

  const siteName = settings.siteName?.trim() || 'Educa TP';
  const footerTitle = settings.footerTitle?.trim() || siteName;
  const footerDescription =
    settings.footerDescription?.trim() ||
    'Formación técnico profesional conectada con el territorio, la innovación y el futuro.';
  const email = settings.email?.trim() || 'contacto@educatp.cl';
  const phone = settings.phone?.trim() || '+56 9 0000 0000';
  const address = settings.address?.trim() || 'Fresia, Región de Los Lagos, Chile';
  const copyrightText =
    settings.copyrightText?.trim() || 'Todos los derechos reservados.';
  const creditsText =
    settings.creditsText?.trim() || 'Espacio creado por el docente Marcelo Barría Arismendi.';
  const footerBg = settings.footerBackgroundColor?.trim() || '#0f172a';
  const footerText = settings.footerTextColor?.trim() || '#cbd5e1';
  const brandText = settings.brandTextColor?.trim() || '#ffffff';

  const visibleNavItems = (settings.navItems || []).filter((item) => item.visible !== false);
  const visibleSocials = (settings.socialLinks || []).filter(
    (item) => item.visible !== false && item.url?.trim()
  );

  return (
    <footer
      className="pt-20 pb-10"
      style={{ backgroundColor: footerBg, color: footerText }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Marca */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt={settings.logoAlt || footerTitle}
                  className="w-12 h-12 object-contain"
                />
              ) : (
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: '#064e3b' }}
                >
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              )}

              <span
                className="text-2xl font-bold"
                style={{ color: brandText }}
              >
                {footerTitle}
              </span>
            </Link>

            <p className="text-sm leading-relaxed">{footerDescription}</p>

            <div className="flex gap-4 flex-wrap">
              {visibleSocials.map((social) => {
                const Icon = getSocialIcon(social.label, social.id);

                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-90"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      color: footerText,
                    }}
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4
              className="font-bold mb-6"
              style={{ color: brandText }}
            >
              Navegación
            </h4>

            <ul className="space-y-4 text-sm">
              {visibleNavItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="transition-opacity hover:opacity-80"
                    style={{ color: footerText }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Accesos rápidos */}
          <div>
            <h4
              className="font-bold mb-6"
              style={{ color: brandText }}
            >
              Accesos rápidos
            </h4>

            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/especialidades/administracion"
                  className="transition-opacity hover:opacity-80"
                  style={{ color: footerText }}
                >
                  Administración
                </Link>
              </li>
              <li>
                <Link
                  to="/especialidades/agropecuaria"
                  className="transition-opacity hover:opacity-80"
                  style={{ color: footerText }}
                >
                  Agropecuaria
                </Link>
              </li>
              <li>
                <Link
                  to="/especialidades/atencion-de-parvulos"
                  className="transition-opacity hover:opacity-80"
                  style={{ color: footerText }}
                >
                  Atención de Párvulos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4
              className="font-bold mb-6"
              style={{ color: brandText }}
            >
              Contacto
            </h4>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" style={{ color: '#064e3b' }} />
                <span>{email}</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" style={{ color: '#064e3b' }} />
                <span>{phone}</span>
              </li>

              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 shrink-0" style={{ color: '#064e3b' }} />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-10 border-t text-center text-xs space-y-2"
          style={{ borderColor: 'rgba(255,255,255,0.12)', color: footerText }}
        >
          <p>
            © {new Date().getFullYear()} {siteName}. {copyrightText}
          </p>
          <p>{creditsText}</p>
        </div>
      </div>
    </footer>
  );
}
