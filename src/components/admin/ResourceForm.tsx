import React, { useEffect, useMemo, useState } from "react";
import { EDUCATION_OPTIONS } from "../../data/educationOptions";

type ResourceStatus = "active" | "draft" | "archived";
type ResourceType = "document" | "pdf" | "presentation" | "video" | "guide" | "form";

type SubjectOption = {
  id: string;
  name: string;
};

type LevelOption = {
  id: string;
  name: string;
  subjects: SubjectOption[];
};

type SpecialtyOption = {
  id: string;
  name: string;
  levels: LevelOption[];
};

type ResourceItem = {
  id: string;
  specialtyId: string;
  levelId: string;
  subjectId: string;
  specialty: string;
  level: string;
  subject: string;
  title: string;
  topic: string;
  description: string;
  type: ResourceType;
  url: string;
  createdAt: string;
  teacher: string;
  tags: string[];
  status: ResourceStatus;
  order: number;
};

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

const inputClass =
  "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200";
const labelClass = "mb-2 block text-sm font-medium text-slate-700";

const getToday = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const createResourceId = (): string => {
  return `rec-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

function getSafeEducationOptions(): SpecialtyOption[] {
  if (!Array.isArray(EDUCATION_OPTIONS)) return [];
  return EDUCATION_OPTIONS as SpecialtyOption[];
}

export default function ResourceForm({
  onSave,
  initialSpecialtyId,
  initialLevelId,
  initialSubjectId,
}: ResourceFormProps) {
  const educationOptions = useMemo(() => getSafeEducationOptions(), []);

  const defaultSpecialty = useMemo(() => {
    if (educationOptions.length === 0) return null;
    return (
      educationOptions.find((item) => item.id === initialSpecialtyId) ||
      educationOptions[0]
    );
  }, [educationOptions, initialSpecialtyId]);

  const defaultLevel = useMemo(() => {
    if (!defaultSpecialty?.levels?.length) return null;
    return (
      defaultSpecialty.levels.find((level) => level.id === initialLevelId) ||
      defaultSpecialty.levels[0]
    );
  }, [defaultSpecialty, initialLevelId]);

  const defaultSubject = useMemo(() => {
    if (!defaultLevel?.subjects?.length) return null;
    return (
      defaultLevel.subjects.find((subject) => subject.id === initialSubjectId) ||
      defaultLevel.subjects[0]
    );
  }, [defaultLevel, initialSubjectId]);

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

  const [formError, setFormError] = useState<string>("");

  const selectedSpecialty = useMemo(() => {
    return educationOptions.find((item) => item.id === form.specialtyId) || null;
  }, [educationOptions, form.specialtyId]);

  const availableLevels = useMemo(() => {
    return selectedSpecialty?.levels || [];
  }, [selectedSpecialty]);

  const selectedLevel = useMemo(() => {
    return availableLevels.find((level) => level.id === form.levelId) || null;
  }, [availableLevels, form.levelId]);

  const availableSubjects = useMemo(() => {
    return selectedLevel?.subjects || [];
  }, [selectedLevel]);

  const selectedSubject = useMemo(() => {
    return availableSubjects.find((subject) => subject.id === form.subjectId) || null;
  }, [availableSubjects, form.subjectId]);

  useEffect(() => {
    if (!selectedSpecialty) return;

    const levelExists = selectedSpecialty.levels?.some(
      (level) => level.id === form.levelId
    );

    if (!levelExists) {
      const firstLevel = selectedSpecialty.levels?.[0];
      setForm((prev) => ({
        ...prev,
        levelId: firstLevel?.id || "",
        subjectId: firstLevel?.subjects?.[0]?.id || "",
      }));
    }
  }, [selectedSpecialty, form.levelId]);

  useEffect(() => {
    if (!selectedLevel) return;

    const subjectExists = selectedLevel.subjects?.some(
      (subject) => subject.id === form.subjectId
    );

    if (!subjectExists) {
      setForm((prev) => ({
        ...prev,
        subjectId: selectedLevel.subjects?.[0]?.id || "",
      }));
    }
  }, [selectedLevel, form.subjectId]);

  const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSpecialtyChange = (specialtyId: string) => {
    const newSpecialty = educationOptions.find((item) => item.id === specialtyId) || null;
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
    const newLevel = availableLevels.find((level) => level.id === levelId) || null;
    const firstSubject = newLevel?.subjects?.[0];

    setForm((prev) => ({
      ...prev,
      levelId,
      subjectId: firstSubject?.id || "",
    }));
  };

  const resetEditableFields = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (educationOptions.length === 0) {
      setFormError("No hay opciones educativas disponibles para crear recursos.");
      return;
    }

    if (!selectedSpecialty || !selectedLevel || !selectedSubject) {
      setFormError("Debes seleccionar una especialidad, nivel y asignatura válidos.");
      return;
    }

    if (!form.title.trim()) {
      setFormError("Debes ingresar el título del recurso.");
      return;
    }

    if (!form.topic.trim()) {
      setFormError("Debes ingresar el tema o unidad.");
      return;
    }

    if (!form.url.trim()) {
      setFormError("Debes ingresar el enlace del recurso.");
      return;
    }

    const resource: ResourceItem = {
      id: createResourceId(),
      specialtyId: selectedSpecialty.id,
      levelId: selectedLevel.id,
      subjectId: selectedSubject.id,
      specialty: selectedSpecialty.name,
      level: selectedLevel.name,
      subject: selectedSubject.name,
      title: form.title.trim(),
      topic: form.topic.trim(),
      description: form.description.trim(),
      type: form.type,
      url: form.url.trim(),
      createdAt: form.createdAt,
      teacher: form.teacher.trim() || "Docente",
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: form.status,
      order: Number(form.order) || 1,
    };

    onSave(resource);
    resetEditableFields();
  };

  if (educationOptions.length === 0) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        No se pudieron cargar las opciones educativas. Revisa el archivo{" "}
        <code>src/data/educationOptions.ts</code>.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Nuevo recurso</h2>
        <p className="mt-1 text-sm text-slate-600">
          Agrega un recurso asociado a una especialidad, nivel y asignatura.
        </p>
      </div>

      {formError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      )}

      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
        <strong>Ruta académica seleccionada:</strong>{" "}
        {selectedSpecialty?.name || "Sin especialidad"} / {selectedLevel?.name || "Sin nivel"} /{" "}
        {selectedSubject?.name || "Sin asignatura"}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Especialidad</label>
          <select
            value={form.specialtyId}
            onChange={(e) => handleSpecialtyChange(e.target.value)}
            className={inputClass}
          >
            {educationOptions.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Nivel</label>
          <select
            value={form.levelId}
            onChange={(e) => handleLevelChange(e.target.value)}
            className={inputClass}
            disabled={availableLevels.length === 0}
          >
            {availableLevels.length === 0 ? (
              <option value="">Sin niveles disponibles</option>
            ) : (
              availableLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Asignatura</label>
          <select
            value={form.subjectId}
            onChange={(e) => handleChange("subjectId", e.target.value)}
            className={inputClass}
            disabled={availableSubjects.length === 0}
          >
            {availableSubjects.length === 0 ? (
              <option value="">Sin asignaturas disponibles</option>
            ) : (
              availableSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className={labelClass}>Título del recurso</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Ej: Contrato de trabajo y elementos esenciales"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Tema o unidad</label>
          <input
            type="text"
            value={form.topic}
            onChange={(e) => handleChange("topic", e.target.value)}
            placeholder="Ej: Unidad 1"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Tipo de recurso</label>
          <select
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value as ResourceType)}
            className={inputClass}
          >
            {RESOURCE_TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Descripción</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Breve explicación del contenido"
            rows={4}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Enlace</label>
          <input
            type="url"
            value={form.url}
            onChange={(e) => handleChange("url", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Fecha de publicación</label>
          <input
            type="date"
            value={form.createdAt}
            onChange={(e) => handleChange("createdAt", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Docente</label>
          <input
            type="text"
            value={form.teacher}
            onChange={(e) => handleChange("teacher", e.target.value)}
            placeholder="Nombre del docente"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Etiquetas</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
            placeholder="Ej: Unidad 1, Evaluación, Apoyo"
            className={inputClass}
          />
          <p className="mt-1 text-xs text-slate-500">Separa las etiquetas con coma.</p>
        </div>

        <div>
          <label className={labelClass}>Estado</label>
          <select
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value as ResourceStatus)}
            className={inputClass}
          >
            {RESOURCE_STATUSES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Orden</label>
          <input
            type="number"
            min={1}
            value={form.order}
            onChange={(e) => handleChange("order", Number(e.target.value))}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-5 py-2.5 font-medium text-white transition hover:bg-slate-800"
        >
          Guardar recurso
        </button>
      </div>
    </form>
  );
}
