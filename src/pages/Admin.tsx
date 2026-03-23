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
    const { data, error } = await supabase
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

  if (loading) return <p style={{ padding: 20 }}>Cargando contenido...</p>;

  return (
    <div style={{ padding: 30, maxWidth: 700 }}>
      <h1>Panel Administrador</h1>

      <hr />

      <h3>🏠 Home</h3>

      <label>Título principal</label>
      <input
        type="text"
        value={content.title || ''}
        onChange={(e) =>
          setContent({ ...content, title: e.target.value })
        }
        style={{ width: '100%', marginBottom: 10 }}
      />

      <label>Descripción</label>
      <textarea
        value={content.description || ''}
        onChange={(e) =>
          setContent({ ...content, description: e.target.value })
        }
        style={{ width: '100%', height: 100, marginBottom: 10 }}
      />

      <label>Imagen principal (URL)</label>
      <input
        type="text"
        value={content.heroImage || ''}
        onChange={(e) =>
          setContent({ ...content, heroImage: e.target.value })
        }
        style={{ width: '100%', marginBottom: 20 }}
      />

      <button onClick={saveContent}>
        {saving ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </div>
  );
};

export default Admin;
