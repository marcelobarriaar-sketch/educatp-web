import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  History,
  Layout,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  Users,
  Beef,
  Baby,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SPECIALTIES, type Specialty } from '../data/content';
import { cn } from '../lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Beef,
  Baby,
};

const textFixes: Array<[string, string]> = [
  ['‚àö¬∞', '√°'],
  ['‚àö¬©', '√©'],
  ['‚àö‚â†', '√≠'],
  ['‚àö‚â•', '√≥'],
  ['‚àö‚à´', '√∫'],
  ['‚àö¬±', '√±'],
  ['‚àö√Ö', '√Å'],
  ['‚àö√¢', '√â'],
  ['‚àö√ß', '√ç'],
  ['‚àö√¨', '√ì'],
  ['‚àö√∂', '√ö'],
  ['‚àö√´', '√ë'],
  ['¬¨‚àû', '¬∞'],
];

function fixText(value: string) {
  return textFixes.reduce((text, [wrong, correct]) => text.split(wrong).join(correct), value);
}

function cleanText(value?: string, fallback = '') {
  const raw = value && value.trim() ? value : fallback;
  return fixText(raw || '');
}

function extractIframeSrc(value?: string) {
  const raw = (value || '').trim();
  if (!raw) return '';

  const match = raw.match(/src=["']([^"']+)["']/i);
  return match?.[1] || raw;
}

function normalizeSpecialty(specialty: Partial<Specialty> | null | undefined, index: number): Specialty {
  const fallback = SPECIALTIES[index] || SPECIALTIES[0];

  return {
    id: specialty?.id || fallback?.id || `especialidad-${index + 1}`,
    name: cleanText(specialty?.name, fallback?.name || 'Especialidad'),
    shortName: cleanText(specialty?.shortName, fallback?.shortName || specialty?.name || 'Especialidad'),
    description: cleanText(specialty?.description, fallback?.description || ''),
    history: cleanText(specialty?.history, fallback?.history || ''),
    color: specialty?.color || fallback?.color || 'bg-slate-900',
    icon: specialty?.icon || fallback?.icon || 'Users',
    virtualRoomUrl: specialty?.virtualRoomUrl || fallback?.virtualRoomUrl || '',
    virtualTourTitle: cleanText(
      specialty?.virtualTourTitle,
      fallback?.virtualTourTitle || 'Recorrido 360\u00b0 / Entorno de Aprendizaje'
    ),
    virtualTourDescription: cleanText(
      specialty?.virtualTourDescription,
      fallback?.virtualTourDescription || 'Este espacio permite conocer visualmente el entorno formativo de la especialidad.'
    ),
    virtualTourEmbedUrl: specialty?.virtualTourEmbedUrl || fallback?.virtualTourEmbedUrl || '',
    academicAccessDescription: cleanText(
      specialty?.academicAccessDescription,
      fallback?.academicAccessDescription ||
        'Si buscas materiales, enlaces, actividades o recursos de aprendizaje, entra directamente al espacio acad\u00e9mico de esta especialidad.'
    ),
    tips: Array.isArray(specialty?.tips)
      ? specialty.tips.map((tip) => cleanText(String(tip || '')))
      : (fallback?.tips || []).map((tip) => cleanText(String(tip || ''))),
    subjects: Array.isArray(specialty?.subjects) ? specialty.subjects : fallback?.subjects || [],
  };
}

export default function SpecialtyDetail() {
  const { id } = useParams();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSpecialties() {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('slug, content')
          .eq('slug', 'specialties')
          .maybeSingle();

        if (error) throw error;

        const content = data?.content as { specialties?: Partial<Specialty>[] } | null;
        const remoteSpecialties = Array.isArray(content?.specialties)
          ? content.specialties.map((item: Partial<Specialty>, index: number) => normalizeSpecialty(item, index))
          : SPECIALTIES.map((item, index) => normalizeSpecialty(item, index));

        if (mounted) setSpecialties(remoteSpecialties);
      } catch (error) {
        console.error('Error cargando especialidades:', error);
        if (mounted) setSpecialties(SPECIALTIES.map((item, index) => normalizeSpecialty(item, index)));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadSpecialties();

    return () => {
      mounted = false;
    };
  }, []);

  const specialty = useMemo(() => specialties.find((item) => item.id === id), [specialties, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl flex items-center gap-3 text-slate-700">
          <Loader2 className="h-5 w-5 animate-spin" />
          {'Cargando especialidad...'}
        </div>
      </div>
    );
  }

  if (!specialty) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white border border-slate-200 rounded-3xl shadow-xl p-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{'Especialidad no encontrada'}</h1>

          <p className="text-slate-600 mb-8 leading-relaxed">
            {'La especialidad que intentas visualizar no existe o ya no est\u00e1 disponible.'}
          </p>

          <Link
            to="/especialidades"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {'Volver a especialidades'}
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[specialty.icon] || Users;
  const tourEmbedSrc = extractIframeSrc(specialty.virtualTourEmbedUrl);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className={cn('text-white py-16 md:py-24', specialty.color)}>
        <div className="max-w-7xl mx-auto px-4">
          <Link
            to="/especialidades"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {'Volver a Especialidades'}
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Icon className="w-10 h-10 md:w-12 md:h-12" />
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold">{specialty.name}</h1>

              <p className="text-xl text-white/85 max-w-3xl leading-relaxed">{specialty.description}</p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to={`/recursos/${specialty.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors"
                >
                  {'Ver recursos de esta especialidad'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <History className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-900">{'Nuestra Historia'}</h2>
              </div>

              <p className="text-slate-600 leading-relaxed text-lg">{specialty.history}</p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <Layout className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-slate-900">
                    {specialty.virtualTourTitle || 'Recorrido 360\u00b0 / Entorno de Aprendizaje'}
                  </h2>
                </div>

                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  {'Institucional'}
                </span>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                {tourEmbedSrc ? (
                  <iframe
                    src={tourEmbedSrc}
                    title={`Recorrido 360 de ${specialty.name}`}
                    className="h-full w-full"
                    loading="lazy"
                    allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
                    allowFullScreen
                    referrerPolicy="no-referrer"
                  />
                ) : specialty.virtualRoomUrl ? (
                  <img
                    src={specialty.virtualRoomUrl}
                    alt={`Vista referencial de ${specialty.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-8 text-center text-slate-500">
                    {'Agrega una imagen o un enlace 360\u00b0 desde el panel de administraci\u00f3n.'}
                  </div>
                )}
              </div>

              <p className="mt-4 text-slate-600 leading-relaxed">
                {specialty.virtualTourDescription ||
                  'Este espacio permite conocer visualmente el entorno formativo de la especialidad.'}
              </p>
            </motion.section>
          </div>

          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="bg-indigo-600 text-white p-8 rounded-3xl shadow-lg shadow-indigo-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-yellow-300" />
                <h2 className="text-2xl font-bold">{'Tips R\u00e1pidos'}</h2>
              </div>

              <div className="space-y-4">
                {specialty.tips.length > 0 ? (
                  specialty.tips.map((tip, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-white/10 rounded-2xl border border-white/10">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <p className="text-sm font-medium leading-relaxed">{tip}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-white/80">
                    {'Agrega tips r\u00e1pidos desde el panel de administraci\u00f3n.'}
                  </p>
                )}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">{'Acceso acad\u00e9mico'}</h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                {specialty.academicAccessDescription ||
                  'Si buscas materiales, enlaces, actividades o recursos de aprendizaje, entra directamente al espacio acad\u00e9mico de esta especialidad.'}
              </p>

              <Link
                to={`/recursos/${specialty.id}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition-colors"
              >
                {'Ir a recursos'}
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}



