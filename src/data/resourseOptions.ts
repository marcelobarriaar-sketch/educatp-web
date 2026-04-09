export const RESOURCE_TYPES = [
  { value: "document", label: "Documento" },
  { value: "pdf", label: "PDF" },
  { value: "presentation", label: "Presentación" },
  { value: "video", label: "Video" },
  { value: "guide", label: "Guía" },
  { value: "form", label: "Formulario" },
] as const;

export const RESOURCE_STATUSES = [
  { value: "active", label: "Activo" },
  { value: "draft", label: "Borrador" },
  { value: "archived", label: "Archivado" },
] as const;
