export interface Specialty {
  id: string;
  name: string;
  shortName: string;
  description: string;
  history: string;
  color: string;
  icon: string;
  virtualRoomUrl: string;
  tips: string[];
  subjects: Subject[];
}

export interface Subject {
  name: string;
  resources: Resource[];
  activities: Activity[];
}

export interface Resource {
  title: string;
  type: 'ppt' | 'video' | 'game' | 'document';
  url: string;
}

export interface Activity {
  title: string;
  description: string;
  type: 'quiz' | 'interactive' | 'task';
}

export const SPECIALTIES: Specialty[] = [
  {
    id: 'administracion',
    name: 'Administración Mención Recursos Humanos',
    shortName: 'Administración RRHH',
    description: 'Formamos profesionales capaces de gestionar el capital más valioso de cualquier organización: las personas.',
    history: 'La especialidad de Administración nació en el año 2010 como respuesta a la creciente demanda de gestores administrativos en la región. Desde entonces, ha evolucionado integrando tecnologías digitales y enfoques modernos de bienestar laboral.',
    color: 'bg-red-800',
    icon: 'Users',
    virtualRoomUrl: 'https://picsum.photos/seed/office/800/600',
    tips: [
      'Mantén siempre tu CV actualizado.',
      'La empatía es la base de una buena gestión de personas.',
      'Domina Excel, es tu mejor herramienta.',
      'Aprende sobre legislación laboral vigente.'
    ],
    subjects: [
      {
        name: 'Gestión de Personal',
        resources: [
          { title: 'PPT: Introducción a RRHH', type: 'ppt', url: '#' },
          { title: 'Video: El proceso de Selección', type: 'video', url: '#' },
          { title: 'Juego: Simulador de Entrevistas', type: 'game', url: '#' }
        ],
        activities: [
          { title: 'Quiz de Contratos', description: 'Evalúa tus conocimientos sobre tipos de contratos en Chile.', type: 'quiz' },
          { title: 'Taller de Clima Laboral', description: 'Diseña una encuesta de clima para una empresa ficticia.', type: 'task' }
        ]
      },
      {
        name: 'Legislación Laboral',
        resources: [
          { title: 'PPT: Código del Trabajo', type: 'ppt', url: '#' },
          { title: 'Guía: Derechos del Trabajador', type: 'document', url: '#' }
        ],
        activities: [
          { title: 'Cálculo de Finiquitos', description: 'Ejercicio práctico de cálculo de indemnizaciones.', type: 'task' }
        ]
      }
    ]
  },
  {
    id: 'agricola',
    name: 'Técnico Agrícola Mención Pecuaria',
    shortName: 'Agrícola Pecuaria',
    description: 'Conexión directa con la tierra y la producción animal sustentable.',
    history: 'Nuestra especialidad más antigua, arraigada en la tradición agrícola de la zona. Se fundó con el colegio, enfocándose inicialmente en cultivos y expandiéndose luego a la mención pecuaria con tecnología de punta.',
    color: 'bg-emerald-900',
    icon: 'Beef',
    virtualRoomUrl: 'https://picsum.photos/seed/farm/800/600',
    tips: [
      'La observación diaria de los animales previene enfermedades.',
      'El bienestar animal mejora la productividad.',
      'Mantén registros precisos de alimentación.',
      'La higiene en los corrales es fundamental.'
    ],
    subjects: [
      {
        name: 'Manejo de Ganado',
        resources: [
          { title: 'PPT: Nutrición Bovina', type: 'ppt', url: '#' },
          { title: 'Video: Técnicas de Ordeño', type: 'video', url: '#' }
        ],
        activities: [
          { title: 'Plan de Vacunación', description: 'Crea un calendario sanitario para un rebaño.', type: 'task' },
          { title: 'Identificación de Razas', description: 'Juego interactivo para reconocer razas ovinas y bovinas.', type: 'interactive' }
        ]
      }
    ]
  },
  {
    id: 'parvularia',
    name: 'Técnico en Educación Parvularia',
    shortName: 'Ed. Parvularia',
    description: 'Dedicación y pedagogía para los primeros pasos de las futuras generaciones.',
    history: 'Creada para profesionalizar el cuidado y educación inicial. Se destaca por su laboratorio de simulación que recrea un ambiente real de jardín infantil.',
    color: 'bg-yellow-500',
    icon: 'Baby',
    virtualRoomUrl: 'https://picsum.photos/seed/kindergarten/800/600',
    tips: [
      'El juego es la principal herramienta de aprendizaje.',
      'Fomenta la autonomía desde los primeros años.',
      'La paciencia y el amor son tus mejores aliados.',
      'Crea ambientes seguros y estimulantes.'
    ],
    subjects: [
      {
        name: 'Material Didáctico',
        resources: [
          { title: 'PPT: Teorías del Aprendizaje', type: 'ppt', url: '#' },
          { title: 'Guía: Creación de Títeres', type: 'document', url: '#' }
        ],
        activities: [
          { title: 'Diseño de Rincón de Juegos', description: 'Propón un espacio educativo temático.', type: 'task' },
          { title: 'Cuentacuentos Online', description: 'Graba y sube tu narración de un cuento infantil.', type: 'task' }
        ]
      }
    ]
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'Exitosa Feria TP 2025',
    excerpt: 'Nuestros alumnos mostraron sus proyectos a la comunidad con gran éxito.',
    date: '15 de Marzo, 2026',
    category: 'Eventos',
    image: 'https://picsum.photos/seed/fair/800/400'
  },
  {
    id: 2,
    title: 'Convenio con Empresas Locales',
    excerpt: 'Nuevas plazas de práctica para la especialidad de Administración.',
    date: '10 de Marzo, 2026',
    category: 'Prácticas',
    image: 'https://picsum.photos/seed/handshake/800/400'
  },
  {
    id: 3,
    title: 'Visita a Predio Agrícola',
    excerpt: 'Alumnos de Agrícola Pecuaria visitaron centro de inseminación.',
    date: '05 de Marzo, 2026',
    category: 'Salidas Terreno',
    image: 'https://picsum.photos/seed/tractor/800/400'
  }
];

export const INTERNSHIP_OFFERS = [
  {
    id: 1,
    company: 'Agrícola del Sur',
    position: 'Técnico de Terreno',
    specialty: 'Agrícola Pecuaria',
    location: 'Sector Rural, Temuco',
    description: 'Apoyo en manejo de ganado bovino y registros sanitarios.',
    deadline: '30 de Abril, 2026'
  },
  {
    id: 2,
    company: 'Jardín Infantil "Los Pollitos"',
    position: 'Asistente de Párvulos',
    specialty: 'Educación Parvularia',
    location: 'Centro, Temuco',
    description: 'Apoyo en actividades pedagógicas y cuidado de niños nivel medio.',
    deadline: '15 de Mayo, 2026'
  },
  {
    id: 3,
    company: 'Empresas Unidas S.A.',
    position: 'Asistente de RRHH',
    specialty: 'Administración RRHH',
    location: 'Oficina Central',
    description: 'Apoyo en archivo de carpetas personales y control de asistencia.',
    deadline: '20 de Mayo, 2026'
  }
];

export const PLAYGROUND_GAMES = [
  {
    id: 1,
    title: 'Trivia de Especialidades',
    category: 'General',
    description: '¿Cuánto sabes sobre las 3 especialidades de nuestro colegio?',
    icon: 'Brain'
  },
  {
    id: 2,
    title: 'Simulador de Contratos',
    category: 'Administración',
    description: 'Completa los datos de un contrato de trabajo sin errores.',
    icon: 'FileText'
  },
  {
    id: 3,
    title: 'Identificador de Semillas',
    category: 'Agrícola',
    description: 'Reconoce las semillas antes de que se acabe el tiempo.',
    icon: 'Sprout'
  },
  {
    id: 4,
    title: 'Cuentacuentos Interactivo',
    category: 'Parvularia',
    description: 'Elige el final correcto para cada historia infantil.',
    icon: 'BookOpen'
  }
];
