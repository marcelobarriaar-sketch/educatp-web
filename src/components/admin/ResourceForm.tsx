import { useEffect, useMemo, useState } from "react";
import { EDUCATION_OPTIONS } from "../../data/educationOptions";

type ResourceStatus = "active" | "draft" | "archived";
type ResourceType = "document" | "pdf" | "presentation" | "video" | "guide" | "form";

type ResourceItem = {
  id: string;
  title: string;
  topic: string;
  description: string;
  type: ResourceType;
  url: string;
  createdAt: string;
  teacher: string;
  level: string;
  subject: string;
  specialty: string;
  tags: string[];
  status: ResourceStatus;
  order: number;
};

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
  onSave: (resource: ResourceItem) => void;
  initialSpecialtyId?: string;
  initialLevelId?: string;
  initialSubjectId?: string;
}

interface FormState {
  specialtyId: string;
  levelId: string;
  subjectId: string;
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
}

const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const createResourceId = () => {
  return `rec-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

export default function ResourceForm({
  onSave,
  initialSpecialtyId,
  initialLevelId,
  initialSubjectId,
}: ResourceFormProps) {
  const defaultSpecialty =
    EDUCATION_OPTIONS.find((item) => item.id === initialSpecialtyId) ||
    EDUCATION_OPTIONS[0];

  const defaultLevel =
    defaultSpecialty?.levels.find((level) => level.id === initialLevelId) ||
    defaultSpecialty?.levels[0];

  const defaultSubject =
    defaultLevel?.subjects.find((subject) => subject.id === initialSubjectId) ||
    defaultLevel?.subjects[0];

  const [form, setForm] = useState<FormState>({
    specialtyId: defaultSpecialty?.id || "",
    levelId: defaultLevel?.id || "",
    subjectId: defaultSubject?.id || "",
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
  });

  const selectedSpecialty = useMemo(() => {
    return EDUCATION_OPTIONS.find((item) => item.id === form.specialtyId);
  }, [form.specialtyId]);

  const availableLevels = selectedSpecialty?.levels || [];

  const selectedLevel = useMemo(() => {
    return availableLevels.find((level) => level.id === form.levelId);
  }, [availableLevels, form.levelId]);

  const availableSubjects = selectedLevel?.subjects || [];

  const selectedSubject = useMemo(() => {
    return availableSubjects.find((subject) => subject.id === form.subjectId);
  }, [availableSubjects, form.subjectId]);

  useEffect(() => {
    if (!selectedSpecialty || !selectedSpecialty.levels.length) return;

    const levelExists = selectedSpecialty.levels.some(
      (level) => level.id === form.levelId
    );

    if (!levelExists) {
      const firstLevel = selectedSpecialty.levels[0];
      setForm((prev) => ({
        ...prev,
        levelId: firstLevel?.id || "",
        subjectId: firstLevel?.subjects?.[0]?.id || "",
      }));
    }
  }, [selectedSpecialty, form.levelId]);

  useEffect(() => {
    if (!selectedLevel || !selectedLevel.subjects.length) return;

    const subjectExists = selectedLevel.subjects.some(
      (subject) => subject.id === form.subjectId
    );

    if (!subjectExists) {
      setForm((prev) => ({
        ...prev,
        subjectId: selectedLevel.subjects[0]?.id || "",
      }));
    }
  }, [selectedLevel, form.subjectId]);

  const handleChange = (field: keyof FormState, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSpecialtyChange = (specialtyId: string) => {
    const newSpecialty = EDUCATION_OPTIONS.find((item) => item.id === specialtyId);
    const firstLevel = newSpecialty?.levels?.[0];
    const firstSubject = firstLevel?.subjects?.[0];

    setForm((prev) => ({
      ...prev,
      specialtyId,
      levelId: firstLevel?.id || "",
      subjectId: firstSubject?.id || "",
    }));
  };

  const handleLevelChange = (levelId: string) => {
    const newLevel = availableLevels.find((level) => level.id === levelId);
    const firstSubject = newLevel?.subjects?.[0];

    setForm((prev) => ({
      ...prev,
      levelId,
      subjectId: firstSubject?.id || "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSpecialty || !selectedLevel || !selectedSubject) {
      alert("Debes seleccionar una especialidad, nivel y asignatura válidos.");
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
      specialty: selectedSpecialty.name,
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
          <select
            value={form.specialtyId}
            onChange={(e) => handleSpecialtyChange(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            {EDUCATION_OPTIONS.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Nivel</label>
          <select
            value={form.levelId}
            onChange={(e) => handleLevelChange(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            {availableLevels.map((level) => (
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
