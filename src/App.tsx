import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Specialties from './pages/Specialties';
import SpecialtyDetail from './pages/SpecialtyDetail';
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

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/especialidades" element={<Specialties />} />
          <Route path="/especialidades/:id" element={<SpecialtyDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/practicas" element={<Internships />} />
          <Route path="/juegos" element={<Playground />} />
          <Route path="/recursos" element={<Specialties />} />
          <Route path="/admin" element={<Admin />} />
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
