import React from 'react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Presentation,
  Video,
  FileText,
  Gamepad2,
  ClipboardList,
  MousePointerClick,
  CheckSquare,
  BookOpen,
  Users,
  Beef,
  Baby
} from 'lucide-react';
import { SPECIALTIES } from '../data/content';
import { cn } from '../lib/utils';

const specialtyIconMap = {
  Users,
  Beef,
  Baby
};

const resourceIconMap = {
  ppt: Presentation,
  video: Video,
  document: FileText,
  game: Gamepad2
};

const activityIconMap = {
  quiz: ClipboardList,
  interactive: MousePointerClick,
  task: CheckSquare
};

const resourceTypeLabelMap = {
  ppt: 'Presentación',
  video: 'Video',
  document: 'Documento',
  game: 'Juego'
};

const activityTypeLabelMap = {
  quiz: 'Cuestionario',
  interactive: 'Interactiva',
  task: 'Tarea'
};

export default function ResourcesBySpecialty() {
  const { id } = useParams();
  const specialty = SPECIALTIES.find((spec) => spec.id === id);

  if (!specialty) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white border border-slate-200 rounded-3xl shadow-xl p-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Especialidad no encontrada
          </h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            La especialidad que intentas abrir no existe o ya no está disponible en esta sección.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/recursos"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a recursos
            </Link>

            <Link
              to="/especialidades"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
            >
              Ir a especialidades
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const SpecialtyIcon =
    specialtyIconMap[specialty.icon as keyof typeof specialtyIconMap] || Users;

  const totalResources = specialty.subjects.reduce(
    (acc, subject) => acc + subject.resources.length,
    0
  );

  const totalActivities = specialty.subjects.reduce(
    (acc, subject) => acc + subject.activities.length,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-indigo-600 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            to="/recursos"
            className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a recursos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8 items-center">
            <div
              className={cn(
                'w-28 h-28 rounded-3xl flex items-center justify-center shadow-2xl',
                specialty.color,
                'text-white'
              )}
            >
              <SpecialtyIcon className="w-14 h-14" />
            </div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Recursos de {specialty.shortName}
              </motion.h1>

              <p className="text-indigo-100 text-lg leading-relaxed max-w-3xl">
                Explora asignaturas, materiales de apoyo y actividades de aprendizaje
                organizadas para esta especialidad.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
                  <div className="text-sm text-indigo-100">Asignaturas</div>
                  <div className="text-2xl font-bold">{specialty.subjects.length}</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
                  <div className="text-sm text-indigo-100">Recursos</div>
                  <div className="text-2xl font-bold">{totalResources}</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
                  <div className="text-sm text-indigo-100">Actividades</div>
                  <div className="text-2xl font-bold">{totalActivities}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {specialty.subjects.map((subject, index) => (
            <motion.section
              key={`${specialty.id}-${subject.name}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-8 md:p-10"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-4">
                    <BookOpen className="w-4 h-4" />
                    Asignatura
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {subject.name}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                    {subject.resources.length} recurso{subject.resources.length !== 1 ? 's' : ''}
                  </div>
                  <div className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                    {subject.activities.length} actividade{subject.activities.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Recursos de aprendizaje
                  </h3>

                  {subject.resources.length > 0 ? (
                    <div className="space-y-4">
                      {subject.resources.map((resource, resourceIndex) => {
                        const ResourceIcon =
                          resourceIconMap[
                            resource.type as keyof typeof resourceIconMap
                          ] || FileText;

                        const resourceLabel =
                          resourceTypeLabelMap[
                            resource.type as keyof typeof resourceTypeLabelMap
                          ] || 'Recurso';

                        const isValidUrl =
                          resource.url &&
                          resource.url !== '#' &&
                          resource.url.trim() !== '';

                        const cardContent = (
                          <>
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                <ResourceIcon className="w-5 h-5" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <span className="inline-flex px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wide">
                                    {resourceLabel}
                                  </span>
                                </div>

                                <h4 className="text-lg font-semibold text-slate-900 mb-1">
                                  {resource.title}
                                </h4>

                                <p className="text-sm text-slate-500">
                                  {isValidUrl
                                    ? 'Haz clic para abrir este recurso.'
                                    : 'Recurso registrado, pendiente de enlace.'}
                                </p>
                              </div>

                              {isValidUrl && (
                                <ExternalLink className="w-5 h-5 text-slate-400 shrink-0" />
                              )}
                            </div>
                          </>
                        );

                        return isValidUrl ? (
                          <a
                            key={`${subject.name}-resource-${resourceIndex}`}
                            href={resource.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block rounded-3xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all p-5"
                          >
                            {cardContent}
                          </a>
                        ) : (
                          <div
                            key={`${subject.name}-resource-${resourceIndex}`}
                            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                          >
                            {cardContent}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
                      Esta asignatura aún no tiene recursos publicados.
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Actividades sugeridas
                  </h3>

                  {subject.activities.length > 0 ? (
                    <div className="space-y-4">
                      {subject.activities.map((activity, activityIndex) => {
                        const ActivityIcon =
                          activityIconMap[
                            activity.type as keyof typeof activityIconMap
                          ] || ClipboardList;

                        const activityLabel =
                          activityTypeLabelMap[
                            activity.type as keyof typeof activityTypeLabelMap
                          ] || 'Actividad';

                        return (
                          <div
                            key={`${subject.name}-activity-${activityIndex}`}
                            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <ActivityIcon className="w-5 h-5" />
                              </div>

                              <div className="flex-1">
                                <div className="inline-flex px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wide mb-2">
                                  {activityLabel}
                                </div>

                                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                                  {activity.title}
                                </h4>

                                <p className="text-slate-600 leading-relaxed">
                                  {activity.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
                      Esta asignatura aún no tiene actividades publicadas.
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
