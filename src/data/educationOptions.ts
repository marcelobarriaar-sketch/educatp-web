export type SubjectOption = {
  id: string;
  name: string;
};

export type LevelOption = {
  id: string;
  name: string;
  subjects: SubjectOption[];
};

export type SpecialtyOption = {
  id: string;
  name: string;
  levels: LevelOption[];
};

export const EDUCATION_OPTIONS: SpecialtyOption[] = [
  {
    id: 'administracion',
    name: 'Administración',
    levels: [
      {
        id: 'tercero-medio',
        name: '3° Medio TP',
        subjects: [
          { id: 'aplicaciones-informaticas', name: 'Aplicaciones informáticas para la gestión administrativa' },
          { id: 'organizacion-oficinas', name: 'Organización de oficinas' },
          { id: 'procesos-administrativos', name: 'Procesos administrativos' },
          { id: 'atencion-cliente', name: 'Atención al cliente' },
          { id: 'gestion-comercial-tributaria', name: 'Gestión comercial y tributaria' },
          { id: 'utilizacion-informacion-contable', name: 'Utilización de la información contable' },
        ],
      },
      {
        id: 'cuarto-medio',
        name: '4° Medio TP',
        subjects: [
          { id: 'emprendimiento-empleabilidad', name: 'Emprendimiento y empleabilidad' },
          { id: 'legislacion-laboral', name: 'Legislación laboral' },
          { id: 'calculo-remuneraciones', name: 'Cálculo de remuneraciones, finiquitos y obligaciones laborales' },
          { id: 'desarrollo-bienestar-organizacional', name: 'Desarrollo y bienestar organizacional' },
          { id: 'dotacion-personal', name: 'Dotación de personal' },
        ],
      },
    ],
  },
  {
    id: 'agropecuaria',
    name: 'Agropecuaria',
    levels: [
      {
        id: 'tercero-medio',
        name: '3° Medio TP',
        subjects: [
          { id: 'manejo-suelos-cultivos', name: 'Manejo de suelos y cultivos' },
          { id: 'produccion-vegetal', name: 'Producción vegetal' },
          { id: 'sanidad-vegetal', name: 'Sanidad vegetal' },
        ],
      },
      {
        id: 'cuarto-medio',
        name: '4° Medio TP',
        subjects: [
          { id: 'produccion-animal', name: 'Producción animal' },
          { id: 'gestion-predial', name: 'Gestión predial' },
          { id: 'maquinaria-agricola', name: 'Maquinaria agrícola' },
        ],
      },
    ],
  },
  {
    id: 'atencion-parvulos',
    name: 'Atención de Párvulos',
    levels: [
      {
        id: 'tercero-medio',
        name: '3° Medio TP',
        subjects: [
          { id: 'desarrollo-infantil', name: 'Desarrollo infantil' },
          { id: 'expresion-ludica', name: 'Expresión lúdica y recreación' },
          { id: 'salud-parvularia', name: 'Salud y bienestar en párvulos' },
        ],
      },
      {
        id: 'cuarto-medio',
        name: '4° Medio TP',
        subjects: [
          { id: 'planificacion-experiencias', name: 'Planificación de experiencias educativas' },
          { id: 'necesidades-educativas', name: 'Apoyo a necesidades educativas en párvulos' },
          { id: 'vinculo-familia-comunidad', name: 'Vínculo familia y comunidad' },
        ],
      },
    ],
  },
];
