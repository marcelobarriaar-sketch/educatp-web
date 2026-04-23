import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminAccess from './components/AdminAccess';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Specialties from './pages/Specialties';
import SpecialtyDetail from './pages/SpecialtyDetail';
import Resources from './pages/Resources';
import ResourcesBySpecialty from './pages/ResourcesBySpecialty';
import Blog from './pages/Blog';
import Internships from './pages/Internships';
import Playground from './pages/Playground';
import Admin from './pages/Admin';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <AdminAccess />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Especialidades: vista institucional */}
          <Route path="/especialidades" element={<Specialties />} />
          <Route path="/especialidades/:id" element={<SpecialtyDetail />} />

          {/* Recursos: acceso académico por especialidad */}
          <Route path="/recursos" element={<Resources />} />
          <Route path="/recursos/:id" element={<ResourcesBySpecialty />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/practicas" element={<Internships />} />
          <Route path="/juegos" element={<Playground />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
