import { useEffect, useMemo, useState } from "react";
import type {
  ResourceItem,
  ResourceStatus,
  ResourceType,
  SpecialtyItem,
  SubjectItem,
} from "../../types/education";

const RESOURCE_TYPES: { value: ResourceType; label: string }[] = [
  { value: "document", label: "Documento" },
  { value: "pdf", label: "PDF" },
  { value: "presentation", label: "Presentación" },
  { value: "video", label: "Video" },
  { value: "guide", label: "Guía" },
  { value: "form", label: "Formulario" },
];

const RESOURCE_STATUSES: { value: ResourceStatus; label: string }[] = [
  { value: "active", label: "Activo" },
  { value: "draft", label: "Borrador" },
  { value: "archived", label: "Archivado" },
];

interface ResourceFormProps {
  specialty: SpecialtyItem;
  onSave: (resource: ResourceItem) => void;
  initialLevelId?: string;
  initialSubjectId?: string;
}

interface FormState {
  title: string;
  topic: string;
  description: string;
  type: ResourceType;
  url: string;
  createdAt: string;
  teacher: string;
  tags: string;
  status: ResourceStatus;
  order: number;
  levelId: string;
  subjectId: string;
}

const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const createResourceId = () => {
  return `rec-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

export default function ResourceForm({
  specialty,
  onSave,
  initialLevelId,
  initialSubjectId,
}: ResourceFormProps) {
  const defaultLevelId = initialLevelId || specialty.levels[0]?.id || "";
  const defaultSubjects =
    specialty.levels.find((level) => level.id === defaultLevelId)?.subjects || [];
  const defaultSubjectId = initialSubjectId || defaultSubjects[0]?.id || "";

  const [form, setForm] = useState<FormState>({
    title: "",
    topic: "",
    description: "",
    type: "video",
    url: "",
    createdAt: getToday(),
    teacher: "Marcelo Barría",
    tags: "",
    status: "active",
    order: 1,
    levelId: defaultLevelId,
    subjectId: defaultSubjectId,
  });

  const selectedLevel = useMemo(() => {
    return specialty.levels.find((level) => level.id === form.levelId);
  }, [specialty.levels, form.levelId]);

  const availableSubjects: SubjectItem[] = selectedLevel?.subjects || [];

  useEffect(() => {
    if (!availableSubjects.length) return;

    const subjectExists = availableSubjects.some(
      (subject) => subject.id === form.subjectId
    );

    if (!subjectExists) {
      setForm((prev) => ({
        ...prev,
        subjectId: availableSubjects[0].id,
      }));
    }
  }, [availableSubjects, form.subjectId]);

  const selectedSubject = useMemo(() => {
    return availableSubjects.find((subject) => subject.id === form.subjectId);
  }, [availableSubjects, form.subjectId]);

  const handleChange = (field: keyof FormState, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLevelChange = (levelId: string) => {
    const newLevel = specialty.levels.find((level) => level.id === levelId);
    const firstSubjectId = newLevel?.subjects?.[0]?.id || "";

    setForm((prev) => ({
      ...prev,
      levelId,
      subjectId: firstSubjectId,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLevel || !selectedSubject) {
      alert("Debes seleccionar un nivel y una asignatura válidos.");
      return;
    }

    if (!form.title.trim()) {
      alert("Debes ingresar el título del recurso.");
      return;
    }

    if (!form.topic.trim()) {
      alert("Debes ingresar el tema o unidad.");
      return;
    }

    if (!form.url.trim()) {
      alert("Debes ingresar el enlace del recurso.");
      return;
    }

    const resource: ResourceItem = {
      id: createResourceId(),
      title: form.title.trim(),
      topic: form.topic.trim(),
      description: form.description.trim(),
      type: form.type,
      url: form.url.trim(),
      createdAt: form.createdAt,
      teacher: form.teacher.trim() || "Docente",
      level: selectedLevel.name,
      subject: selectedSubject.name,
      specialty: specialty.name,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: form.status,
      order: Number(form.order) || 1,
    };

    onSave(resource);

    setForm((prev) => ({
      ...prev,
      title: "",
      topic: "",
      description: "",
      type: "video",
      url: "",
      createdAt: getToday(),
      teacher: prev.teacher,
      tags: "",
      status: "active",
      order: 1,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-bold">Nuevo recurso</h2>
        <p className="mt-1 text-sm text-gray-600">
          Agrega un recurso liviano mediante enlace externo y metadatos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Especialidad</label>
          <input
            type="text"
            value={specialty.name}
            disabled
            className="w-full rounded-lg border bg-gray-100 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Nivel</label>
          <select
            value={form.levelId}
            onChange={(e) => handleLevelChange(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            {specialty.levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Asignatura</label>
          <select
            value={form.subjectId}
            onChange={(e) => handleChange("subjectId", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            {availableSubjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">
            Título del recurso
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Ej: Contrato de trabajo y elementos esenciales"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Tema o unidad</label>
          <input
            type="text"
            value={form.topic}
            onChange={(e) => handleChange("topic", e.target.value)}
            placeholder="Ej: Unidad 1"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Tipo de recurso
          </label>
          <select
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value as ResourceType)}
            className="w-full rounded-lg border px-3 py-2"
          >
            {RESOURCE_TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Descripción</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Breve explicación del contenido"
            rows={4}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Enlace</label>
          <input
            type="url"
            value={form.url}
            onChange={(e) => handleChange("url", e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Fecha de publicación
          </label>
          <input
            type="date"
            value={form.createdAt}
            onChange={(e) => handleChange("createdAt", e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Docente</label>
          <input
            type="text"
            value={form.teacher}
            onChange={(e) => handleChange("teacher", e.target.value)}
            placeholder="Nombre del docente"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Etiquetas</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
            placeholder="Ej: Unidad 1, Evaluación, Apoyo"
            className="w-full rounded-lg border px-3 py-2"
          />
          <p className="mt-1 text-xs text-gray-500">
            Separa las etiquetas con coma.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Estado</label>
          <select
            value={form.status}
            onChange={(e) =>
              handleChange("status", e.target.value as ResourceStatus)
            }
            className="w-full rounded-lg border px-3 py-2"
          >
            {RESOURCE_STATUSES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Orden</label>
          <input
            type="number"
            min={1}
            value={form.order}
            onChange={(e) => handleChange("order", Number(e.target.value))}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Guardar recurso
        </button>
      </div>
    </form>
  );
}
