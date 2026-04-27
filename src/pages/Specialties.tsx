import { motion } from 'motion/react';
import { SPECIALTIES } from '../data/content';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const specialtyLogoMap: Record<string, string> = {
  administracion: '/images/home/1.png',
  agricola: '/images/home/LOGO%20TEC%20AGRICOLA.png',
  pecuaria: '/images/home/LOGO%20TEC%20AGRICOLA.png',
  parvularia: '/images/home/LOGO%20PARVULOS.jpeg',
  parvulos: '/images/home/LOGO%20PARVULOS.jpeg'
};

function getSpecialtyLogo(spec: {
  id?: string;
  name?: string;
  title?: string;
  shortName?: string;
}) {
  const rawText = `${spec.id ?? ''} ${spec.name ?? ''} ${spec.title ?? ''} ${
    spec.shortName ?? ''
  }`.toLowerCase();

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

export default function Specialties() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Nuestras Especialidades
          </motion.h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Conoce cada especialidad, su enfoque formativo y las oportunidades que puede ofrecerte en el mundo académico y laboral.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIALTIES.map((spec, index) => {
            const logoUrl = getSpecialtyLogo(spec);

            return (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/especialidades/${spec.id}`}
                  className="group block bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl hover:shadow-2xl hover:shadow-black/10 transition-all text-center h-full"
                >
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

                  <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-black transition-colors">
                    {spec.name}
                  </h2>

                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {spec.description}
                  </p>

                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all bg-slate-100 text-slate-600 group-hover:bg-black group-hover:text-white">
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
