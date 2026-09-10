import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "motion/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminAccess from "./components/AdminAccess";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
const Specialties = lazy(() => import("./pages/Specialties"));
const SpecialtyDetail = lazy(() => import("./pages/SpecialtyDetail"));
const Resources = lazy(() => import("./pages/Resources"));
const ResourcesBySpecialty = lazy(() => import("./pages/ResourcesBySpecialty"));
const Blog = lazy(() => import("./pages/Blog"));
const Internships = lazy(() => import("./pages/Internships"));
const Playground = lazy(() => import("./pages/Playground"));
const Admin = lazy(() => import("./pages/Admin"));

const Future = lazy(() => import("./pages/Future"));

function AppContent() {
  const location = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Tu futuro se aprende haciendo",
      "/especialidades": "Especialidades",
      "/recursos": "Aprende",
      "/playground": "Patio TP",
      "/practicas": "Mundo Laboral",
      "/blog": "Actualidad TP",
      "/mi-futuro": "Mi Futuro",
      "/admin": "Administración",
    };
    document.title = `${titles[location.pathname] || "Explora tu especialidad"} | EducaTP`;
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      {!isAdminRoute && <Navbar />}

      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-white focus:p-4 focus:text-slate-950"
      >
        Saltar al contenido
      </a>
      <main
        id="contenido-principal"
        tabIndex={-1}
        className="flex-grow min-w-0"
      >
        <Suspense
          fallback={
            <p role="status" className="hub-container py-16 text-slate-600">
              Cargando contenido…
            </p>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Especialidades: vista institucional */}
            <Route path="/especialidades" element={<Specialties />} />
            <Route path="/especialidades/:id" element={<SpecialtyDetail />} />

            {/* Recursos: acceso académico por especialidad */}
            <Route path="/recursos" element={<Resources />} />
            <Route path="/recursos/:id" element={<ResourcesBySpecialty />} />

            {/* Otras secciones públicas */}
            <Route path="/mi-futuro" element={<Future />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/practicas" element={<Internships />} />

            {/* Patio de Juegos */}
            <Route path="/playground" element={<Playground />} />

            {/* Compatibilidad con ruta antigua /juegos */}
            <Route
              path="/juegos"
              element={<Navigate to="/playground" replace />}
            />

            {/* Panel administrador */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />

            {/* Ruta de respaldo */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && (
        <>
          <Footer />
          <AdminAccess />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <AppContent />
      </Router>
    </MotionConfig>
  );
}
