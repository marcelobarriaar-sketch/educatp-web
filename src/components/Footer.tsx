import React from 'react';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type SiteSettings = {
  siteName?: string;
  email?: string;
  phone?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  footerText?: string;
};

export default function Footer() {
  const [settings, setSettings] = React.useState<SiteSettings>({});

  React.useEffect(() => {
    const loadSettings = async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', 'site_settings')
        .single();

      if (error) {
        console.error('Error cargando footer:', error);
        return;
      }

      if (data?.content) {
        setSettings(data.content);
      }
    };

    loadSettings();
  }, []);

  const siteName = settings.siteName || 'EducaTP';
  const email = settings.email || 'contacto@educatp.cl';
  const phone = settings.phone || '+56 9 1234 5678';
  const address = settings.address || 'Av. Principal 123, Chile';
  const footerText =
    settings.footerText ||
    `© 2026 ${siteName} - Todos los derechos reservados. www.educatp.cl`;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                {siteName}
              </span>
            </Link>

            <p className="text-sm leading-relaxed">
              Plataforma educativa dedicada a potenciar el aprendizaje técnico profesional en nuestra comunidad.
            </p>

            <div className="flex gap-4">
              {settings.facebook && (
                <a href={settings.facebook} target="_blank">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white">
                    <Facebook className="w-5 h-5" />
                  </div>
                </a>
              )}

              {settings.instagram && (
                <a href={settings.instagram} target="_blank">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white">
                    <Instagram className="w-5 h-5" />
                  </div>
                </a>
              )}

              {settings.twitter && (
                <a href={settings.twitter} target="_blank">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white">
                    <Twitter className="w-5 h-5" />
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-white font-bold mb-6">Navegación</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/especialidades">Especialidades</Link></li>
              <li><Link to="/practicas">Prácticas</Link></li>
              <li><Link to="/juegos">Patio de Juegos</Link></li>
              <li><Link to="/blog">Blog TP</Link></li>
            </ul>
          </div>

          {/* Especialidades */}
          <div>
            <h4 className="text-white font-bold mb-6">Especialidades</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/especialidades/administracion">Administración RRHH</Link></li>
              <li><Link to="/especialidades/agricola">Agrícola Pecuaria</Link></li>
              <li><Link to="/especialidades/parvularia">Educación Parvularia</Link></li>
            </ul>
          </div>

          {/* Contacto dinámico */}
          <div>
            <h4 className="text-white font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400" />
                {email}
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-400" />
                {phone}
              </li>

              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-indigo-400" />
                {address}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>{footerText}</p>
        </div>
      </div>
    </footer>
  );
}
