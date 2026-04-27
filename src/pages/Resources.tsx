import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  FolderOpen,
  ClipboardList
} from 'lucide-react';

import { SPECIALTIES } from '../data/content';

const specialtyLogoMap: Record<string, string> = {
  administracion: '/images/home/1.png',
  agricola: '/images/home/LOGO%20TEC%20AGRICOLA.png',
  pecuaria: '/images/home/LOGO%20TEC%20AGRICOLA.png',
  parvularia: '/images/home/LOGO%20PARVULOS.jpeg',
  parvulos: '/images/home/LOGO%20PARVULOS.jpeg'
};

function getSpecialtyLogo(spec: any) {
  const rawText = `${spec.id ?? ''} ${spec.name ?? ''} ${spec.title ?? ''}`.toLowerCase();

  if (
    rawText.includes('administr') ||
    rawText.includes('recursos humanos') ||
    rawText.includes('rrhh')
  ) {
    return specialtyLogoMap.administracion;
  }

  if (
    rawText.includes('agrícola') ||
    rawText.includes('agricola') ||
    rawText.includes('pecuaria') ||
    rawText.includes('pecuario')
  ) {
    return specialtyLogoMap.agricola;
  }

  if (
    rawText.includes('parvularia') ||
    rawText.includes('parvulo') ||
    rawText.includes('párvulo') ||
    rawText.includes('educación parvularia')
  ) {
    return specialtyLogoMap.parvularia;
  }

  return '';
}

export default function Resources() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Recursos por Especialidad
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Accede a guías, actividades, enlaces, videos y materiales de apoyo
            organizados por especialidad técnico profesional.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIALTIES.map((spec, index) => {
            const totalSubjects = Array.isArray(spec.subjects)
              ? spec.subjects.length
              : 0;

            const logoUrl = getSpecialtyLogo(spec);

            return (
              <motion.article
                key={spec.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/recursos/${spec.id}`}
                  className="group block bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl hover:shadow-2xl hover:shadow-black/10 transition-all h-full"
                >
                  <div className="flex flex-col h-full">
                    <div className="w-28 h-28 mx-auto rounded-3xl flex items-center justify-center mb-8 bg-white border border-slate-200 shadow-lg overflow-hidden transition-all group-hover:scale-110 group-hover:-rotate-2">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={`Logo ${spec.name}`}
                          className="w-full h-full object-cover scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white font-black text-3xl">
                          TP
                        </div>
                      )}
                    </div>

                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-black transition-colors">
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
                          <span className="text-sm font-medium">
                            Asignaturas base
                          </span>
                        </div>

                        <span className="text-sm font-bold text-slate-900">
                          {totalSubjects}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-600">
                          <FolderOpen className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Material académico
                          </span>
                        </div>

                        <span className="text-sm font-bold text-black">
                          Disponible
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-600">
                          <ClipboardList className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Acceso
                          </span>
                        </div>

                        <span className="text-sm font-bold text-slate-900">
                          Directo
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto text-center">
                      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all bg-slate-100 text-slate-600 group-hover:bg-black group-hover:text-white">
                        Ver recursos
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
