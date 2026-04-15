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
          { id: 'aplicaciones-informaticas', name: 'Aplicaciones Informáticas para la Gestión Administrativa' },
          { id: 'organizacion-oficinas', name: 'Organización de Oficinas' },
          { id: 'procesos-administrativos', name: 'Procesos Administrativos' },
          { id: 'atencion-cliente', name: 'Atención al cliente' },
          { id: 'gestion-comercial-tributaria', name: 'Gestión Comercial y Tributaria' },
          { id: 'utilizacion-informacion-contable', name: 'Utilización de la Información Contable' },
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
          { id: 'alimentacion-y-pesaje-pecuario', name: 'Alimentación y Pesaje Pecuario' },
          { id: 'control-de-plagas-y-enfermedades', name: 'Control de Plagas y Enfermedades' },
          { id: 'manejo-de-suelos-y-residuos', name: 'Manejo de Suelos y Residuos' },
          { id: 'manejo-de-tecnicas-de-riego', name: 'Manejo de Técnicas de Riego' },
          { id: 'tecnicas-de-reproduccion-vegetal', name: 'Técnicas de Reproducción Vegetal' },
        ],
      },
      {
        id: 'cuarto-medio',
        name: '4° Medio TP',
        subjects: [
          { id: 'cultivo-de-praderas-y-forrajes', name: 'Cultivo de Praderas y Forrajes' },
          { id: 'emprendimiento-y-empleabilidad', name: 'Emprendimiento y Empleabilidad' },
          { id: 'produccion-lechera', name: 'Producción Lechera' },
          { id: 'reproduccion-animal', name: 'Reproducción Animal' },
          { id: 'sanidad-y-bienestar-animal', name: 'Sanidad y Bienestar Animal' },
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
          { id: 'expresion-musical-para-parvulos', name: 'Expresión Musical para Párvulos' },
          { id: 'material-didactico-y-de-ambientacion', name: 'Material Didáctico y de Ambientación' },
          { id: 'recreacion-y-bienestar-de-los-parvulos', name: 'Recreación y Bienestar de los Párvulos' },
          { id: 'relacion-con-la-familia', name: 'Relación con la Familia' },
          { id: 'salud-en-parvulos', name: 'Salud en Párvulos' },
        ],
      },
      {
        id: 'cuarto-medio',
        name: '4° Medio TP',
        subjects: [
          { id: 'actividades-educativas-para-parvulos', name: 'Actividades Educativas Para Párvulos' },
          { id: 'alimentacion-de-los-parvulos', name: 'Alimentación de los Párvulos' },
          { id: 'emprendimiento-y-empleabilidad', name: 'Emprendimiento y Empleabilidad' },
          { id: 'expresion-literaria-y-teatral-con-parvulos', name: 'Expresión Literaria y Teatral con Párvulos' },
          { id: 'experiencia-en-la-empresa', name: 'Experiencia en la Empresa' },
          { id: 'higiene-y-seguridad-de-los-parvulos', name: 'Higiene y Seguridad de los Párvulos' },
        ],
      },
    ],
  },
];
