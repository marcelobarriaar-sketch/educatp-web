import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  History,
  Layout,
  Lightbulb,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Users,
  Beef,
  Baby,
  ExternalLink
} from 'lucide-react';
import { SPECIALTIES } from '../data/content';
import { cn } from '../lib/utils';

const iconMap: Record<string, any> = {
  Users,
  Beef,
  Baby
};

export default function SpecialtyDetail() {
  const { id } = useParams();
  const specialty = SPECIALTIES.find((s) => s.id === id);

  if (!specialty) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white border border-slate-200 rounded-3xl shadow-xl p-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Especialidad no encontrada
          </h1>

          <p className="text-slate-600 mb-8 leading-relaxed">
            La especialidad que intentas visualizar no existe o ya no está disponible.
          </p>

          <Link
            to="/especialidades"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a especialidades
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[specialty.icon] || Users;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className={cn('text-white py-16 md:py-24', specialty.color)}>
        <div className="max-w-7xl mx-auto px-4">
          <Link
            to="/especialidades"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Especialidades
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Icon className="w-10 h-10 md:w-12 md:h-12" />
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold">
                {specialty.name}
              </h1>

              <p className="text-xl text-white/85 max-w-3xl leading-relaxed">
                {specialty.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-semibold">
                  {specialty.subjects.length} asignatura{specialty.subjects.length !== 1 ? 's' : ''}
                </span>

                <Link
                  to={`/recursos/${specialty.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors"
                >
                  Ver recursos de esta especialidad
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido institucional */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <History className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-900">Nuestra Historia</h2>
              </div>

              <p className="text-slate-600 leading-relaxed text-lg">
                {specialty.history}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-900">Asignaturas Base</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialty.subjects.map((subject, index) => (
                  <div
                    key={`${specialty.id}-subject-${index}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                  >
                    <p className="font-semibold text-slate-900">{subject.name}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  to={`/recursos/${specialty.id}`}
                  className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                >
                  Ir a los recursos y actividades
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <Layout className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-slate-900">
                    Sala Virtual / Entorno Formativo
                  </h2>
                </div>

                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  Institucional
                </span>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden group border border-slate-200">
                <img
                  src={specialty.virtualRoomUrl}
                  alt={`Vista referencial de ${specialty.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Este espacio representa el entorno formativo asociado a la especialidad.
                Aquí puedes mostrar laboratorio, sala temática, taller o una imagen referencial
                del contexto de aprendizaje.
              </p>

              <p className="mt-2 text-slate-500 text-sm italic">
                Sugerencia técnica: más adelante convendría separar este dato en una imagen referencial
                y un enlace real a sala virtual, para no mezclar funciones.
              </p>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="bg-indigo-600 text-white p-8 rounded-3xl shadow-lg shadow-indigo-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-yellow-300" />
                <h2 className="text-2xl font-bold">Tips Rápidos</h2>
              </div>

              <div className="space-y-4">
                {specialty.tips.map((tip, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-4 bg-white/10 rounded-2xl border border-white/10"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm font-medium leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Acceso académico
              </h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                Si buscas materiales, enlaces, actividades o recursos de aprendizaje,
                entra directamente al espacio académico de esta especialidad.
              </p>

              <Link
                to={`/recursos/${specialty.id}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition-colors"
              >
                Ir a recursos
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
