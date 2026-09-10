import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Gamepad2,
  GraduationCap,
  House,
  Menu,
  Newspaper,
  Rocket,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { loadPageContent } from "../lib/pages";
import { normalizeNavigation, type MenuItem } from "../lib/navigation";
import { repairText } from "../lib/text";
import { readableText } from "../lib/colors";

type SiteSettings = {
  siteName?: string;
  logoUrl?: string;
  logoAlt?: string;
  schoolSubtitle?: string;
  menuItems?: MenuItem[];
  navItems?: MenuItem[];
  brandTextColor?: string;
  headerBgColor?: string;
  theme?: {
    primaryColor?: string;
    headerBackgroundColor?: string;
    brandTextColor?: string;
  };
};
const icons = {
  "/": House,
  "/especialidades": GraduationCap,
  "/recursos": BookOpen,
  "/playground": Gamepad2,
  "/practicas": Briefcase,
  "/blog": Newspaper,
  "/mi-futuro": Rocket,
};
export default function Navbar() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    let active = true;
    loadPageContent<SiteSettings>("site_settings")
      .then((data) => {
        if (active && data) setSettings(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  const items = normalizeNavigation(
    settings.menuItems,
    settings.navItems,
  ).filter((item) => item.visible !== false);
  const background =
    settings.theme?.headerBackgroundColor ||
    settings.headerBgColor ||
    "#ffffff";
  const foreground = readableText(background);
  const name = repairText(settings.siteName?.trim() || "EducaTP");
  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(path + "/");
  return (
    <header
      className="site-header sticky top-0 z-50 border-b border-slate-200"
      style={{ backgroundColor: background, color: foreground }}
    >
      <div className="hub-container flex min-h-20 items-center justify-between gap-5">
        <Link
          to="/"
          aria-label={`${name}, inicio`}
          className="flex min-w-0 shrink-0 items-center gap-2.5 max-w-[65%] xl:max-w-[235px]"
        >
          {settings.logoUrl ? (
            <img
              src={settings.logoUrl}
              alt={repairText(settings.logoAlt || "Logo EducaTP")}
              className="h-11 w-11 shrink-0 object-contain"
            />
          ) : (
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-700 text-white">
              <GraduationCap size={23} />
            </span>
          )}
          <span className="min-w-0">
            <span className="block text-xl font-extrabold tracking-tight break-words">
              {name}
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[.14em] opacity-70">
              Aprende. Haz. Avanza.
            </span>
          </span>
        </Link>
        <nav
          aria-label="Navegación principal"
          className="hidden xl:flex flex-wrap items-center justify-end gap-1"
        >
          {items.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={`rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-colors ${isActive(item.path) ? "bg-slate-900 text-white" : "hover:bg-slate-100 hover:text-slate-950"}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <button
          ref={toggle}
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          className="xl:hidden flex shrink-0 items-center gap-2 rounded-xl border border-current/20 px-3 py-3 text-sm font-semibold"
        >
          {open ? <X size={20} /> : <Menu size={20} />}Menú
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Navegación móvil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="xl:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-slate-200 bg-white px-5 py-3 text-slate-900"
          >
            {items.map((item) => {
              const Icon =
                icons[item.path as keyof typeof icons] || ArrowUpRight;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className={`my-1 flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold ${isActive(item.path) ? "bg-emerald-50 text-emerald-800" : "hover:bg-slate-50"}`}
                >
                  <Icon size={19} />
                  {item.name}
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
