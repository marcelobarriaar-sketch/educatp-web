import React, { useEffect, useState } from 'react';
import { Settings, X, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = 'marcelopelao2026';
const STORAGE_KEY = 'educatp_admin_auth';

export default function AdminAccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) {
      setOpen(false);
    }
  }, [isAdminRoute]);

  function handleOpen() {
    setErrorMsg('');
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setUsername('');
    setPassword('');
    setErrorMsg('');
    setShowPassword(false);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const cleanUser = username.trim();

    if (cleanUser === ADMIN_USER && password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      handleClose();
      navigate('/admin');
      return;
    }

    setErrorMsg('Usuario o contraseña incorrectos.');
  }

  if (isAdminRoute) return null;

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Abrir acceso administrador"
        className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white p-4 text-slate-700 shadow-xl transition hover:scale-105 hover:bg-slate-50 md:right-6"
      >
        <Settings className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Acceso administrador
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  Iniciar sesión
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Ingresa tus credenciales para acceder al panel de administración.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Usuario
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4 py-3 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200">
                  <User className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Ingresa tu usuario"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Contraseña
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4 py-3 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200">
                  <Lock className="h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Ingresa tu contraseña"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-slate-400 transition hover:text-slate-700"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Entrar al panel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
