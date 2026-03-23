import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type StatItem = {
  label: string;
  val: string;
};

type HomeContent = {
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleGreen?: string;
  heroTitleYellow?: string;
  heroTitleRed?: string;
  heroDescription?: string;
  heroPrimaryButtonText?: string;
  heroPrimaryButtonLink?: string;
  heroSecondaryButtonText?: string;
  heroSecondaryButtonLink?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroFeatureTitle?: string;
  heroFeatureSubtitle?: string;
  stats?: StatItem[];
  specialtiesTitle?: string;
  specialtiesHighlight?: string;
  specialtiesDescription?: string;
  specialtiesLinkText?: string;
  ctaTitleLine1?: string;
  ctaTitleLine2?: string;
  ctaDescription?: string;
  ctaPrimaryButtonText?: string;
  ctaPrimaryButtonLink?: string;
  ctaSecondaryButtonText?: string;
  ctaSecondaryButtonLink?: string;
};

const defaultContent: HomeContent = {
  heroBadge: '',
  heroTitleLine1: '',
  heroTitleGreen: '',
  heroTitleYellow: '',
  heroTitleRed: '',
  heroDescription: '',
  heroPrimaryButtonText: '',
  heroPrimaryButtonLink: '',
  heroSecondaryButtonText: '',
  heroSecondaryButtonLink: '',
  heroImageUrl: '',
  heroImageAlt: '',
  heroFeatureTitle: '',
  heroFeatureSubtitle: '',
  stats: [
    { label: '', val: '' },
    { label: '', val: '' },
    { label: '', val: '' }
  ],
  specialtiesTitle: '',
  specialtiesHighlight: '',
  specialtiesDescription: '',
  specialtiesLinkText: '',
  ctaTitleLine1: '',
  ctaTitleLine2: '',
  ctaDescription: '',
  ctaPrimaryButtonText: '',
  ctaPrimaryButtonLink: '',
  ctaSecondaryButtonText: '',
  ctaSecondaryButtonLink: ''
};

export default function Admin() {
  const [content, setContent] = useState<HomeContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data, error } = await supabase
      .from('pages')
      .select('content')
      .eq('slug', 'home')
      .single();

    if (!error && data?.content) {
      setContent({
        ...defaultContent,
        ...data.content,
        stats:
          Array.isArray(data.content.stats) && data.content.stats.length > 0
            ? data.content.stats
            : defaultContent.stats
      });
    }

    setLoading(false);
  };

  const saveContent = async () => {
    setSaving(true);

    const payload = {
      ...content,
      stats: (content.stats || []).map((item) => ({
        label: item.label || '',
        val: item.val || ''
      }))
    };

    const { error } = await supabase
      .from('pages')
      .update({ content: payload })
      .eq('slug', 'home');

    setSaving(false);

    if (error) {
      console.error(error);
      alert('❌ Error al guardar los cambios');
      return;
    }

    alert('✅ Cambios guardados correctamente');
  };

  const updateField = (field: keyof HomeContent, value: string) => {
    setContent((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateStat = (index: number, key: keyof StatItem, value: string) => {
    const currentStats = [...(content.stats || [])];
    currentStats[index] = {
      ...currentStats[index],
      [key]: value
    };

    setContent((prev) => ({
      ...prev,
      stats: currentStats
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-600 text-lg">Cargando panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Panel Administrador</h1>
        <p className="text-slate-500 mb-8">Edición de contenido de la página de inicio</p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Hero principal</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Badge" value={content.heroBadge} onChange={(v) => updateField('heroBadge', v)} />
              <Field label="Título línea 1" value={content.heroTitleLine1} onChange={(v) => updateField('heroTitleLine1', v)} />
              <Field label="Título verde" value={content.heroTitleGreen} onChange={(v) => updateField('heroTitleGreen', v)} />
              <Field label="Título amarillo" value={content.heroTitleYellow} onChange={(v) => updateField('heroTitleYellow', v)} />
              <Field label="Título rojo" value={content.heroTitleRed} onChange={(v) => updateField('heroTitleRed', v)} />
              <Field label="Texto botón principal" value={content.heroPrimaryButtonText} onChange={(v) => updateField('heroPrimaryButtonText', v)} />
              <Field label="Link botón principal" value={content.heroPrimaryButtonLink} onChange={(v) => updateField('heroPrimaryButtonLink', v)} />
              <Field label="Texto botón secundario" value={content.heroSecondaryButtonText} onChange={(v) => updateField('heroSecondaryButtonText', v)} />
              <Field label="Link botón secundario" value={content.heroSecondaryButtonLink} onChange={(v) => updateField('heroSecondaryButtonLink', v)} />
              <Field label="URL imagen hero" value={content.heroImageUrl} onChange={(v) => updateField('heroImageUrl', v)} />
              <Field label="Alt imagen hero" value={content.heroImageAlt} onChange={(v) => updateField('heroImageAlt', v)} />
              <Field label="Título feature" value={content.heroFeatureTitle} onChange={(v) => updateField('heroFeatureTitle', v)} />
              <Field label="Subtítulo feature" value={content.heroFeatureSubtitle} onChange={(v) => updateField('heroFeatureSubtitle', v)} />
            </div>

            <div className="mt-4">
              <TextAreaField
                label="Descripción hero"
                value={content.heroDescription}
                onChange={(v) => updateField('heroDescription', v)}
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Estadísticas</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {(content.stats || []).map((stat, index) => (
                <div key={index} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <p className="font-semibold text-slate-700 mb-3">Dato {index + 1}</p>
                  <Field
                    label="Valor"
                    value={stat.val}
                    onChange={(v) => updateStat(index, 'val', v)}
                  />
                  <Field
                    label="Etiqueta"
                    value={stat.label}
                    onChange={(v) => updateStat(index, 'label', v)}
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Bloque especialidades</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Título" value={content.specialtiesTitle} onChange={(v) => updateField('specialtiesTitle', v)} />
              <Field label="Palabra destacada" value={content.specialtiesHighlight} onChange={(v) => updateField('specialtiesHighlight', v)} />
              <Field label="Texto link" value={content.specialtiesLinkText} onChange={(v) => updateField('specialtiesLinkText', v)} />
            </div>

            <div className="mt-4">
              <TextAreaField
                label="Descripción especialidades"
                value={content.specialtiesDescription}
                onChange={(v) => updateField('specialtiesDescription', v)}
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">CTA final</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Título línea 1" value={content.ctaTitleLine1} onChange={(v) => updateField('ctaTitleLine1', v)} />
              <Field label="Título línea 2" value={content.ctaTitleLine2} onChange={(v) => updateField('ctaTitleLine2', v)} />
              <Field label="Texto botón principal" value={content.ctaPrimaryButtonText} onChange={(v) => updateField('ctaPrimaryButtonText', v)} />
              <Field label="Link botón principal" value={content.ctaPrimaryButtonLink} onChange={(v) => updateField('ctaPrimaryButtonLink', v)} />
              <Field label="Texto botón secundario" value={content.ctaSecondaryButtonText} onChange={(v) => updateField('ctaSecondaryButtonText', v)} />
              <Field label="Link botón secundario" value={content.ctaSecondaryButtonLink} onChange={(v) => updateField('ctaSecondaryButtonLink', v)} />
            </div>

            <div className="mt-4">
              <TextAreaField
                label="Descripción CTA"
                value={content.ctaDescription}
                onChange={(v) => updateField('ctaDescription', v)}
              />
            </div>
          </section>

          <div className="pt-4">
            <button
              onClick={saveContent}
              disabled={saving}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-60"
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
};

function Field({ label, value, onChange }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-600"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-emerald-600"
      />
    </div>
  );
}
