import { EDUCATION_OPTIONS } from '../data/educationOptions';

export function getAdministrationSubjects(level?: '3' | '4' | null) {
  const levels = EDUCATION_OPTIONS.find(option => option.id === 'administracion')!.levels;
  return levels
    .filter(option => !level || option.id === (level === '3' ? 'tercero-medio' : 'cuarto-medio'))
    .flatMap(option => option.subjects)
    .filter(subject => subject.id !== 'emprendimiento-empleabilidad');
}

function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const legacyNames: Record<string, string[]> = {
  'atencion-cliente': ['Atención al cliente', 'Servicio de Atención de clientes'],
  'calculo-remuneraciones': ['Cálculo de remuneraciones, finiquitos y obligaciones laborales'],
  'desarrollo-bienestar-organizacional': ['Desarrollo y bienestar organizacional'],
};

export function groupAdministrationResources<T extends { subjectId?: string; subjectName?: string }>(
  level: '3' | '4', resources: T[], fallbackName: (resource: T) => string,
) {
  const subjects = getAdministrationSubjects(level);
  const groups = new Map(subjects.map(subject => [subject.id, {
    id: subject.id, name: subject.name, resources: [] as T[],
  }]));
  for (const resource of resources) {
    const candidates = [resource.subjectId, resource.subjectName].filter(Boolean).map(value => normalize(value!));
    const subject = subjects.find(item => [item.id, item.name, ...(legacyNames[item.id] || [])]
      .some(value => candidates.includes(normalize(value))));
    const name = subject?.name || fallbackName(resource);
    const id = subject?.id || normalize(name);
    if (!groups.has(id)) groups.set(id, { id, name, resources: [] });
    groups.get(id)!.resources.push(resource);
  }
  return Array.from(groups.values());
}
