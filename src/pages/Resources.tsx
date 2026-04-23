import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Users, Beef, Baby, ArrowRight, BookOpen, FolderOpen, ClipboardList } from 'lucide-react';
import { SPECIALTIES } from '../data/content';
import { cn } from '../lib/utils';

const iconMap = {
  Users,
  Beef,
  Baby
};

export default function Resources() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Recursos por Especialidad
          </motion.h1>

          <p className="text-indigo-100 max-w-3xl mx-auto text-lg leading-relaxed">
            Accede a materiales, actividades y recursos de aprendizaje organizados según tu especialidad.
            Selecciona un área para ingresar directamente a sus contenidos académicos.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIALTIES.map((spec, index) => {
            const Icon = iconMap[spec.icon as keyof typeof iconMap] || Users;

            const totalSubjects = spec.subjects.length;
            const totalResources = spec.subjects.reduce(
              (acc, subject) => acc + subject.resources.length,
              0
            );
            const totalActivities = spec.subjects.reduce(
              (acc, subject) => acc + subject.activities.length,
              0
            );

            return (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/recursos/${spec.id}`}
                  className="group block bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all h-full"
                >
                  <div className="flex flex-col h-full">
                    <div
                      className={cn(
                        'w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-8 transition-all group-hover:scale-110 group-hover:rotate-6',
                        spec.color,
                        'text-white shadow-lg'
                      )}
                    >
                      <Icon className="w-12 h-12" />
                    </div>

                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                        {spec.name}
                      </h2>

                      <p className="text-slate-600 leading-relaxed">
                        {spec.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 mb-8">
                      <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-600">
                          <BookOpen className="w-4 h-4" />
                          <span className="text-sm font-medium">Asignaturas</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {totalSubjects}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-600">
                          <FolderOpen className="w-4 h-4" />
                          <span className="text-sm font-medium">Recursos</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {totalResources}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-600">
                          <ClipboardList className="w-4 h-4" />
                          <span className="text-sm font-medium">Actividades</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {totalActivities}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto text-center">
                      <div
                        className={cn(
                          'inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all',
                          'bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white'
                        )}
                      >
                        Ver recursos
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
