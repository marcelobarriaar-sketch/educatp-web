import { useEffect, useMemo, useState, type ComponentType } from 'react';
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
  Baby,
  FolderOpen,
  Link as LinkIcon,
  AlertCircle
} from 'lucide-react';

import { SPECIALTIES } from '../data/content';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

type IconComponent = ComponentType<{ className?: string }>;

type ResourceItem = {
  id: string;
  title: string;
  description?: string;
  url?: string;
  type?: string;
  specialtyId?: string;
  subjectId?: string;
  subjectName?: string;
  level?: string;
  topic?: string;
  date?: string;
};

type ResourceGroup = {
  id: string;
  name: string;
  resources: ResourceItem[];
};

type SpecialtyForSubjectLookup = {
  subjects?: Array<{
    name: string;
  }>;
};

const specialtyIconMap: Record<string, IconComponent> = {
  Users,
  Beef,
  Baby
};

const resourceIconMap: Record<string, IconComponent> = {
  ppt: Presentation,
  presentation: Presentation,
  video: Video,
  document: FileText,
  doc: FileText,
  pdf: FileText,
  guide: FileText,
  guia: FileText,
  game: Gamepad2,
  juego: Gamepad2,
  activity: ClipboardList,
  actividad: ClipboardList,
  quiz: ClipboardList,
  form: CheckSquare,
  formulario: CheckSquare,
  interactive: MousePointerClick,
  interactivo: MousePointerClick,
  link: LinkIcon,
  enlace: LinkIcon
};

const resourceTypeLabelMap: Record<string, string> = {
  ppt: 'Presentación',
  presentation: 'Presentación',
  video: 'Video',
  document: 'Documento',
  doc: 'Documento',
  pdf: 'PDF',
  guide: 'Guía',
  guia: 'Guía',
  game: 'Juego',
  juego: 'Juego',
  activity: 'Actividad',
  actividad: 'Actividad',
  quiz: 'Cuestionario',
  form: 'Formulario',
  formulario: 'Formulario',
  interactive: 'Interactivo',
  interactivo: 'Interactivo',
  link: 'Enlace',
  enlace: 'Enlace'
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function slugify(value: string) {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function humanizeSlug(value?: string) {
  if (!value) return 'Recursos generales';

  const connectors = new Set([
    'a',
    'al',
    'de',
    'del',
    'la',
    'las',
    'los',
    'y',
    'e',
    'en',
    'para',
    'por',
    'con'
  ]);

  return value
    .replace(/[-_]+/g, ' ')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (index !== 0 && connectors.has(word)) return word;

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function getSubjectDisplayName(
  resource: ResourceItem,
  specialty?: SpecialtyForSubjectLookup
) {
  const rawSubject =
    resource.subjectName || resource.subjectId || 'Recursos generales';

  if (!specialty?.subjects || specialty.subjects.length === 0) {
    return humanizeSlug(rawSubject);
  }

  const normalizedRaw = normalizeText(rawSubject);
  const slugRaw = slugify(rawSubject);

  const matchingSubject = specialty.subjects.find((subject) => {
    const subjectName = subject.name;

    return (
      normalizeText(subjectName) === normalizedRaw ||
      slugify(subjectName) === slugRaw
    );
  });

  return matchingSubject?.name || humanizeSlug(rawSubject);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getStringValue(
  source: Record<string, unknown>,
  keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === 'string' && value.trim() !== '') {
      return value.trim();
    }

    if (typeof value === 'number') {
      return String(value);
    }
  }

  return undefined;
}

function normalizeResource(raw: unknown, index: number): ResourceItem | null {
  if (!isRecord(raw)) return null;

  const title = getStringValue(raw, [
    'title',
    'name',
    'titulo',
    'resourceTitle',
    'nombre'
  ]);

  if (!title) return null;

  return {
    id:
      getStringValue(raw, ['id', 'resourceId', 'slug']) ||
      `resource-${index}`,
    title,
    description: getStringValue(raw, [
      'description',
      'descripcion',
      'summary',
      'resumen',
      'instructions',
      'instrucciones'
    ]),
    url: getStringValue(raw, ['url', 'link', 'href', 'resourceUrl']),
    type: getStringValue(raw, [
      'type',
      'resourceType',
      'category',
      'tipo',
      'categoria'
    ]),
    specialtyId: getStringValue(raw, [
      'specialtyId',
      'specialty_id',
      'specialty',
      'specialtySlug',
      'especialidadId',
      'especialidad'
    ]),
    subjectId: getStringValue(raw, [
      'subjectId',
      'subject_id',
      'subject',
      'subjectSlug',
      'asignaturaId'
    ]),
    subjectName: getStringValue(raw, [
      'subjectName',
      'subjectTitle',
      'asignatura',
      'asignaturaNombre'
    ]),
    level: getStringValue(raw, [
      'level',
      'levelName',
      'grade',
      'curso',
      'nivel'
    ]),
    topic: getStringValue(raw, ['topic', 'unit', 'unidad', 'contenido']),
    date: getStringValue(raw, ['date', 'createdAt', 'fecha'])
  };
}

function extractResources(content: unknown): ResourceItem[] {
  if (!content) return [];

  if (Array.isArray(content)) {
    return content
      .map((item, index) => normalizeResource(item, index))
      .filter((item): item is ResourceItem => Boolean(item));
  }

  if (!isRecord(content)) return [];

  const possibleArrays = [
    content.resources,
    content.items,
    content.materials,
    content.recursos
  ];

  for (const possibleArray of possibleArrays) {
    if (Array.isArray(possibleArray)) {
      return possibleArray
        .map((item, index) => normalizeResource(item, index))
        .filter((item): item is ResourceItem => Boolean(item));
    }
  }

  return [];
}

function resourceBelongsToSpecialty(
  resource: ResourceItem,
  specialty: {
    id: string;
    name: string;
    shortName?: string;
  }
) {
  const specialtyCandidates = [
    specialty.id,
    specialty.name,
    specialty.shortName || ''
  ]
    .filter(Boolean)
    .map(normalizeText);

  const resourceCandidates = [
    resource.specialtyId || '',
    resource.specialtyId?.replace('/recursos/', '') || ''
  ]
    .filter(Boolean)
    .map(normalizeText);

  return resourceCandidates.some((candidate) =>
    specialtyCandidates.includes(candidate)
  );
}

function getResourceIcon(type?: string) {
  if (!type) return FileText;

  return resourceIconMap[normalizeText(type)] || FileText;
}

function getResourceTypeLabel(type?: string) {
  if (!type) return 'Recurso';

  return resourceTypeLabelMap[normalizeText(type)] || type;
}

function getValidUrl(url?: string) {
  if (!url) return undefined;

  const cleanUrl = url.trim();

  if (!cleanUrl || cleanUrl === '#') return undefined;

  return cleanUrl;
}

export default function ResourcesBySpecialty() {
  const { id } = useParams();

  const specialty = SPECIALTIES.find((spec) => spec.id === id);

  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadResources() {
      try {
        setLoadingResources(true);
        setErrorMessage('');

        const { data, error } = await supabase
          .from('pages')
          .select('content')
          .eq('slug', 'resources')
          .maybeSingle();

        if (error) {
          throw error;
        }

        const loadedResources = extractResources(data?.content);

        if (isMounted) {
          setResources(loadedResources);
        }
      } catch (error) {
        console.error('Error loading resources:', error);

        if (isMounted) {
          setErrorMessage(
            'No se pudieron cargar los recursos desde la base de datos.'
          );
          setResources([]);
        }
      } finally {
        if (isMounted) {
          setLoadingResources(false);
        }
      }
    }

    loadResources();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredResources = useMemo(() => {
    if (!specialty) return [];

    return resources.filter((resource) =>
      resourceBelongsToSpecialty(resource, specialty)
    );
  }, [resources, specialty]);

  const groupedResources = useMemo<ResourceGroup[]>(() => {
    const groups = new Map<string, ResourceGroup>();

    filteredResources.forEach((resource) => {
      const subjectName = getSubjectDisplayName(resource, specialty);
      const groupId = slugify(subjectName);

      if (!groups.has(groupId)) {
        groups.set(groupId, {
          id: groupId,
          name: subjectName,
          resources: []
        });
      }

      groups.get(groupId)?.resources.push(resource);
    });

    return Array.from(groups.values());
  }, [filteredResources, specialty]);

  if (!specialty) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white border border-slate-200 rounded-3xl shadow-xl p-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Especialidad no encontrada
          </h1>

          <p className="text-slate-600 mb-8 leading-relaxed">
            La especialidad que intentas abrir no existe o ya no está
            disponible en esta sección.
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

  const totalBaseSubjects = Array.isArray(specialty.subjects)
    ? specialty.subjects.length
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-indigo-600 text-white py-16 md:py-20">
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
                Recursos de {specialty.shortName || specialty.name}
              </motion.h1>

              <p className="text-indigo-100 text-lg leading-relaxed max-w-3xl">
                Explora materiales de apoyo, guías, actividades, enlaces y
                recursos académicos organizados para esta especialidad.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
                  <div className="text-sm text-indigo-100">
                    Asignaturas base
                  </div>
                  <div className="text-2xl font-bold">
                    {totalBaseSubjects}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
                  <div className="text-sm text-indigo-100">
                    Recursos publicados
                  </div>
                  <div className="text-2xl font-bold">
                    {filteredResources.length}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
                  <div className="text-sm text-indigo-100">Secciones</div>
                  <div className="text-2xl font-bold">
                    {groupedResources.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {errorMessage && (
          <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold">Aviso</p>
              <p className="text-sm leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {loadingResources ? (
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-10 text-center">
            <div className="w-14 h-14 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin mx-auto mb-6" />

            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Cargando recursos
            </h2>

            <p className="text-slate-600">
              Estamos buscando los materiales disponibles para esta
              especialidad.
            </p>
          </div>
        ) : groupedResources.length > 0 ? (
          <div className="space-y-8">
            {groupedResources.map((group, index) => (
              <motion.section
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-8 md:p-10"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-4">
                      <BookOpen className="w-4 h-4" />
                      Asignatura o sección
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      {group.name}
                    </h2>
                  </div>

                  <div className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                    {group.resources.length} recurso
                    {group.resources.length !== 1 ? 's' : ''}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {group.resources.map((resource) => {
                    const ResourceIcon = getResourceIcon(resource.type);
                    const resourceLabel = getResourceTypeLabel(resource.type);
                    const validUrl = getValidUrl(resource.url);

                    const card = (
                      <div className="h-full rounded-3xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                            <ResourceIcon className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="inline-flex px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wide">
                                {resourceLabel}
                              </span>

                              {resource.level && (
                                <span className="inline-flex px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                                  {resource.level}
                                </span>
                              )}
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                              {resource.title}
                            </h3>

                            {resource.topic && (
                              <p className="text-sm font-medium text-indigo-700 mb-2">
                                {resource.topic}
                              </p>
                            )}

                            {resource.description ? (
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {resource.description}
                              </p>
                            ) : (
                              <p className="text-sm text-slate-500 leading-relaxed">
                                {validUrl
                                  ? 'Haz clic para abrir este recurso.'
                                  : 'Recurso registrado, pendiente de enlace.'}
                              </p>
                            )}
                          </div>

                          {validUrl && (
                            <ExternalLink className="w-5 h-5 text-slate-400 shrink-0" />
                          )}
                        </div>
                      </div>
                    );

                    return validUrl ? (
                      <a
                        key={resource.id}
                        href={validUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block h-full"
                      >
                        {card}
                      </a>
                    ) : (
                      <div key={resource.id} className="h-full">
                        {card}
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-8">
            <section className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-8 md:p-10">
              <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <FolderOpen className="w-8 h-8" />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Aún no hay recursos publicados
              </h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                Esta especialidad todavía no tiene materiales académicos
                cargados desde el módulo de Recursos. Cuando se agreguen desde
                el panel de administración, aparecerán automáticamente en esta
                sección.
              </p>

              <Link
                to="/recursos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al catálogo de recursos
              </Link>
            </section>

            <aside className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-6">
                <BookOpen className="w-4 h-4" />
                Asignaturas base
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {specialty.shortName || specialty.name}
              </h3>

              {Array.isArray(specialty.subjects) &&
              specialty.subjects.length > 0 ? (
                <div className="space-y-3">
                  {specialty.subjects.map((subject) => (
                    <div
                      key={`${specialty.id}-${subject.name}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 font-medium"
                    >
                      {subject.name}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">
                  No hay asignaturas base registradas para esta especialidad.
                </p>
              )}
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
