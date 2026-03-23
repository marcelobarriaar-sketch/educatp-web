import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type HomeContent = {
  title?: string;
  description?: string;
  heroImage?: string;
};

const Admin = () => {
  const [content, setContent] = useState<HomeContent>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'home')
      .single();

    if (data) {
      setContent(data.content || {});
    }

    setLoading(false);
  };

  const saveContent = async () => {
    setSaving(true);

    const { error } = await supabase
      .from('pages')
      .update({ content })
      .eq('slug', 'home');

    setSaving(false);

    if (!error) {
      alert('✅ Cambios guardados correctamente');
    } else {
      alert('❌ Error al guardar');
    }
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
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Panel Administrador</h1>
        <p className="text-slate-500 mb-8">Edición básica de la página de inicio</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Título principal
            </label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="Escribe el título principal"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Descripción
            </label>
            <textarea
              value={content.description || ''}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="Escribe la descripción"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Imagen principal (URL)
            </label>
            <input
              type="text"
              value={content.heroImage || ''}
              onChange={(e) => setContent({ ...content, heroImage: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="https://..."
            />
          </div>

          <div className="pt-2">
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
};

export default Admin;
