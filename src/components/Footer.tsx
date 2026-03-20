import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
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
              <span className="text-2xl font-bold text-white">EducaTP</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Plataforma educativa dedicada a potenciar el aprendizaje técnico profesional en nuestra comunidad.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Navegación</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Inicio</Link></li>
              <li><Link to="/especialidades" className="hover:text-indigo-400 transition-colors">Especialidades</Link></li>
              <li><Link to="/practicas" className="hover:text-indigo-400 transition-colors">Prácticas</Link></li>
              <li><Link to="/juegos" className="hover:text-indigo-400 transition-colors">Patio de Juegos</Link></li>
              <li><Link to="/blog" className="hover:text-indigo-400 transition-colors">Blog TP</Link></li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-white font-bold mb-6">Especialidades</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/especialidades/administracion" className="hover:text-indigo-400 transition-colors">Administración RRHH</Link></li>
              <li><Link to="/especialidades/agricola" className="hover:text-indigo-400 transition-colors">Agrícola Pecuaria</Link></li>
              <li><Link to="/especialidades/parvularia" className="hover:text-indigo-400 transition-colors">Educación Parvularia</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400" />
                contacto@educatp.cl
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-400" />
                +56 9 1234 5678
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-indigo-400" />
                Av. Principal 123, Chile
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2026 EducaTP - Todos los derechos reservados. www.educatp.cl</p>
        </div>
      </div>
    </footer>
  );
}
