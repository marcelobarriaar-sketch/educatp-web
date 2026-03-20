import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, GraduationCap, Users, Beef, Baby, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SPECIALTIES } from '../data/content';
import { cn } from '../lib/utils';

const iconMap: Record<string, any> = {
  Users,
  Beef,
  Baby
};

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      {/* Dynamic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4" />
              <span className="tracking-wider uppercase">El Futuro es Técnico</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter"
            >
              POTENCIA TU <br />
              <span className="flex flex-wrap justify-center lg:justify-start gap-x-4">
                <span className="text-emerald-500">TALENTO</span>
                <span className="flex">
                  <span className="text-yellow-500">RE</span>
                  <span className="text-red-500">AL</span>
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              EducaTP es la plataforma definitiva para el estudiante técnico profesional. Aprende, juega y conéctate con el mundo laboral de forma dinámica.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6"
            >
              <Link to="/especialidades" className="btn-primary bg-emerald-800 hover:bg-emerald-900 text-lg px-10 py-5">
                Explorar Especialidades
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link to="/juegos" className="btn-secondary bg-transparent text-white border-white/20 hover:bg-white/10 text-lg px-10 py-5">
                Patio de Juegos
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-white/10"
            >
              {[
                { label: 'Estudiantes', val: '1.5k+' },
                { label: 'Empresas', val: '40+' },
                { label: 'Recursos', val: '500+' }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-black text-white">{stat.val}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-10 bg-indigo-500/20 rounded-full blur-[100px] animate-float" />
            <div className="relative glass-card p-4 rounded-[3rem] rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000"
                alt="Student collaboration"
                className="rounded-[2.5rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 glass-card p-6 rounded-3xl animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Aprendizaje Activo</p>
                    <p className="text-xs text-slate-500">Metodología 100% Práctica</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Specialties Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">
              ELIGE TU <span className="text-indigo-600">CAMINO</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-xl font-medium">
              Tres especialidades diseñadas para los desafíos del siglo XXI. Profesionales, dinámicas y con futuro.
            </p>
          </div>
          <Link to="/especialidades" className="group flex items-center gap-2 font-black text-indigo-600 uppercase tracking-widest text-sm">
            Ver todas las especialidades
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {SPECIALTIES.map((spec, index) => {
            const Icon = iconMap[spec.icon];
            return (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/especialidades/${spec.id}`}
                  className="group block relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl hover:shadow-indigo-500/20 transition-all"
                >
                  <img
                    src={spec.virtualRoomUrl}
                    alt={spec.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-end space-y-4">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-2 shadow-lg",
                      spec.color
                    )}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-black text-white leading-tight">
                      {spec.shortName}
                    </h3>
                    <p className="text-slate-300 text-sm font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {spec.description}
                    </p>
                    <div className="pt-4 flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs">
                      Explorar ahora
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Interactive CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-indigo-600 rounded-[4rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-10 space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              ¿LISTO PARA EL <br /> SIGUIENTE NIVEL?
            </h2>
            <p className="text-indigo-100 text-xl max-w-2xl mx-auto font-medium">
              Únete a la comunidad de EducaTP y accede a recursos exclusivos, juegos y ofertas de práctica profesional.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/juegos" className="px-10 py-5 bg-white text-indigo-600 rounded-3xl font-black text-lg hover:scale-105 transition-transform shadow-xl">
                Ir al Patio de Juegos
              </Link>
              <Link to="/practicas" className="px-10 py-5 bg-indigo-500 text-white border border-indigo-400 rounded-3xl font-black text-lg hover:bg-indigo-400 transition-all shadow-xl">
                Buscar Prácticas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
