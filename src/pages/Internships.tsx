import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Calendar, ArrowRight, FileCheck, Building2 } from 'lucide-react';
import { INTERNSHIP_OFFERS } from '../data/content';
import { cn } from '../lib/utils';

export default function Internships() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Prácticas Profesionales
          </motion.h1>
          <p className="text-indigo-100 max-w-2xl mx-auto text-lg">
            Encuentra tu primera experiencia laboral y pon en práctica todo lo aprendido en el colegio.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-indigo-600" />
                Ofertas Disponibles
              </h2>
              
              <div className="space-y-6">
                {INTERNSHIP_OFFERS.map((offer) => (
                  <div key={offer.id} className="p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{offer.position}</h3>
                        <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                          <Building2 className="w-4 h-4" />
                          {offer.company}
                        </div>
                      </div>
                      <span className="px-4 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider">
                        {offer.specialty}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {offer.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {offer.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Plazo: {offer.deadline}
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
                        Postular
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-emerald-400" />
                Requisitos Generales
              </h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  Haber aprobado el 4to año medio.
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  Contar con seguro escolar vigente.
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  Certificado de alumno regular.
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  Autorización del apoderado (si es menor de edad).
                </li>
              </ul>
              <button className="w-full mt-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-bold transition-all">
                Descargar Guía de Práctica
              </button>
            </div>

            <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">¿Tienes dudas?</h3>
              <p className="text-indigo-700 text-sm mb-6">
                Comunícate con la coordinación TP para recibir orientación sobre tu proceso de práctica.
              </p>
              <a href="mailto:practicas@educatp.cl" className="block text-center py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
                Contactar Coordinador
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
