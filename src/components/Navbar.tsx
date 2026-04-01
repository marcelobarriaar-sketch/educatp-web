import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  Newspaper,
  Menu,
  X,
  Briefcase,
  Gamepad2,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

type MenuItem = {
  name: string;
  path: string;
  visible?: boolean;
};

type ThemeSettings = {
  primaryColor?: string;
  primaryHoverColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  dangerColor?: string;
  headerBackgroundColor?: string;
  footerBackgroundColor?: string;
  footerTextColor?: string;
  brandTextColor?: string;
};

type SiteSettings = {
  siteName?: string;
  logoUrl?: string;
  logoAlt?: string;
  brandTextColor?: string;
  headerBgColor?: string;
  menuItems?: MenuItem[];
  schoolSubtitle?: string;
  theme?: ThemeSettings;
};

const defaultNavItems: MenuItem[] = [
  { name: 'Inicio', path: '/', visible: true },
  { name: 'Especialidades', path: '/especialidades', visible: true },
  { name: 'Recursos', path: '/recursos', visible: true },
  { name: 'Blog TP', path: '/blog', visible: true },
  { name: 'Prácticas', path: '/practicas', visible: true },
  { name: 'Patio de Juegos', path: '/juegos', visible: true },
];

const iconMap: Record<string, React.ComponentType<any>> = {
  '/': LayoutDashboard,
  '/especialidades': GraduationCap,
  '/recursos': BookOpen,
  '/blog': Newspaper,
  '/practicas': Briefcase,
  '/juegos': Gamepad2,
};

function BrandMark() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
      <text
        x="5"
        y="75"
        fontSize="60"
        fontWeight="900"
        fill="#064e3b"
        style={{ opacity: 0.05, fontStyle: 'italic' }}
      >
        TP
      </text>

      <path
        d="M48 52 C48 52 35 25 45 15 C55 5 65 25 52 48"
        fill="#064e3b"
        className="drop-shadow-sm"
      />

      <path
        d="M52 48 C52 48 85 35 95 45 C105 55 85 65 52 52"
        fill="#eab308"
        className="drop-shadow-sm"
      />

      <path
        d="M52 52 C52 52 65 85 55 95 C45 105 35 85 48 52"
        fill="#991b1b"
        className="drop-shadow-sm"
      />

      <circle cx="50" cy="50" r="2" fill="white" />
    </svg>
  );
}

function ByBadge({
  primaryColor,
  accentColor,
}: {
  primaryColor: string;
  accentColor: string;
}) {
  return (
    <motion.div
      className="flex items-center gap-[1px] cursor-pointer select-none italic text-[7px] font-black shrink-0"
      whileHover="hover"
    >
      <motion.span
        variants={{ hover: { rotate: -20, scale: 1.4, y: -2 } }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        style={{ color: primaryColor }}
      >
        b
      </motion.span>
      <motion.span
        variants={{ hover: { rotate: 20, scale: 1.4, y: -2 } }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        style={{ color: accentColor }}
      >
        y
      </motion.span>
      <motion.span
        variants={{ hover: { scale: 2, y: -2 } }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        className="w-[3px] h-[3px] rounded-full ml-[1px]"
        style={{ backgroundColor: '#991b1b' }}
      />
    </motion.div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [settings, setSettings] = React.useState<SiteSettings>({});
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('content')
          .eq('slug', 'site_settings')
          .single();

        if (error) {
          console.error('Error cargando site_settings en Navbar:', error);
          return;
        }

        if (isMounted && data?.content) {
          setSettings(data.content as SiteSettings);
        }
      } catch (err) {
        console.error('Error inesperado en Navbar:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const navItems = React.useMemo(() => {
    const fromDb = Array.isArray(settings.menuItems) ? settings.menuItems : [];
    const usable = fromDb.length > 0 ? fromDb : defaultNavItems;
    return usable.filter((item) => item.visible !== false);
  }, [settings.menuItems]);

  const siteName = settings.siteName?.trim() || 'EducaTP';
  const logoUrl = settings.logoUrl?.trim() || '';
  const logoAlt = settings.logoAlt?.trim() || 'Logo EducaTP';
  const schoolSubtitle =
    settings.schoolSubtitle?.trim() || 'Liceo Carlos Ibáñez del Campo';

  const theme = settings.theme || {};

  const primaryColor = theme.primaryColor?.trim() || '#065f46';
  const primaryHoverColor = theme.primaryHoverColor?.trim() || '#064e3b';
  const secondaryColor = theme.secondaryColor?.trim() || '#0f172a';
  const accentColor = theme.accentColor?.trim() || '#eab308';

  const brandTextColor =
    theme.brandTextColor?.trim() ||
    settings.brandTextColor?.trim() ||
    secondaryColor;

  const headerBgColor =
    theme.headerBackgroundColor?.trim() ||
    settings.headerBgColor?.trim() ||
    'rgba(255,255,255,0.85)';

  const subtitleColor = primaryColor;

  const shouldShowUploadedLogo = !loading && !!logoUrl;
  const shouldShowFallbackLogo = !loading && !logoUrl;

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-xl border-b border-slate-200/50"
      style={{ backgroundColor: headerBgColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center min-w-0">
            <Link to="/" className="flex items-center gap-2 group min-w-0">
              <motion.div
                className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 transition-all overflow-hidden"
                whileHover={{
                  x: [0, 4, 0, -4, 0],
                  y: [0, -4, -8, -4, 0],
                  rotate: [0, 6, 0, -6, 0],
                }}
                transition={{
                  duration: 0.9,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                {shouldShowUploadedLogo ? (
                  <img
                    src={logoUrl}
                    alt={logoAlt}
                    className="w-full h-full object-contain"
                  />
                ) : shouldShowFallbackLogo ? (
                  <BrandMark />
                ) : null}
              </motion.div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-1 min-w-0">
                  <span
                    className="text-xl sm:text-2xl font-black tracking-tighter leading-none truncate"
                    style={{ color: brandTextColor }}
                  >
                    {siteName}
                  </span>

                  {!loading && (
                    <ByBadge
                      primaryColor={primaryColor}
                      accentColor={accentColor}
                    />
                  )}
                </div>

                <span
                  className="text-[8px] font-bold uppercase tracking-[0.2em] mt-1 truncate"
                  style={{ color: subtitleColor }}
                >
                  {schoolSubtitle}
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = iconMap[item.path] || LayoutDashboard;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold transition-all uppercase tracking-wider'
                  )}
                  style={{
                    backgroundColor: isActive ? primaryColor : 'transparent',
                    color: isActive ? '#ffffff' : secondaryColor,
                    boxShadow: isActive ? `0 10px 20px -10px ${primaryColor}` : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = `${primaryColor}12`;
                      e.currentTarget.style.color = primaryHoverColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = secondaryColor;
                    }
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: secondaryColor }}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${primaryColor}12`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-200 overflow-hidden"
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => {
                const Icon = iconMap[item.path] || LayoutDashboard;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all"
                    style={{
                      backgroundColor: isActive ? `${primaryColor}14` : 'transparent',
                      color: isActive ? primaryColor : secondaryColor,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = `${primaryColor}10`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
