import React from 'react';
import { motion } from 'motion/react';
import { SPECIALTIES } from '../data/content';
import { Link } from 'react-router-dom';
import { Users, Beef, Baby, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const iconMap: Record<string, any> = {
  Users,
  Beef,
  Baby
};

export default function Specialties() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Nuestras Especialidades
          </motion.h1>

          <p className="text-indigo-100 max-w-2xl mx-auto text-lg">
            Conoce cada especialidad, su enfoque formativo y las oportunidades que puede ofrecerte en el mundo académico y laboral.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIALTIES.map((spec, index) => {
            const Icon = iconMap[spec.icon] || Users;

            return (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/especialidades/${spec.id}`}
                  className="group block bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all text-center h-full"
                >
                  <div
                    className={cn(
                      'w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-8 transition-all group-hover:scale-110 group-hover:rotate-6',
                      spec.color,
                      'text-white shadow-lg'
                    )}
                  >
                    <Icon className="w-12 h-12" />
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                    {spec.name}
                  </h2>

                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {spec.description}
                  </p>

                  <div
                    className={cn(
                      'inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all',
                      'bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white'
                    )}
                  >
                    Ver especialidad
                    <ArrowRight className="w-4 h-4" />
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
