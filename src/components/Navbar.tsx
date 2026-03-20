import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, BookOpen, LayoutDashboard, Newspaper, Menu, X, Briefcase, Gamepad2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Inicio', path: '/', icon: LayoutDashboard },
    { name: 'Especialidades', path: '/especialidades', icon: GraduationCap },
    { name: 'Recursos', path: '/recursos', icon: BookOpen },
    { name: 'Blog TP', path: '/blog', icon: Newspaper },
    { name: 'Prácticas', path: '/practicas', icon: Briefcase },
    { name: 'Patio de Juegos', path: '/juegos', icon: Gamepad2 },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative w-16 h-16 group-hover:rotate-12 transition-all">
                {/* Recreating the exact 3-petal system from the image */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                  {/* The "TP" background shape in white/transparent style */}
                  <text x="5" y="75" fontSize="60" fontWeight="900" fill="#064e3b" style={{ opacity: 0.05, fontStyle: 'italic' }}>TP</text>
                  
                  {/* Green Petal - Top (pointing towards center) */}
                  <path 
                    d="M48 52 C48 52 35 25 45 15 C55 5 65 25 52 48" 
                    fill="#064e3b" 
                    className="drop-shadow-sm"
                  />
                  
                  {/* Yellow Petal - Right (pointing towards center) */}
                  <path 
                    d="M52 48 C52 48 85 35 95 45 C105 55 85 65 52 52" 
                    fill="#eab308" 
                    className="drop-shadow-sm"
                  />
                  
                  {/* Red Petal - Bottom (pointing towards center) */}
                  <path 
                    d="M52 52 C52 52 65 85 55 95 C45 105 35 85 48 52" 
                    fill="#991b1b" 
                    className="drop-shadow-sm"
                  />
                  
                  {/* Central swirl detail */}
                  <circle cx="50" cy="50" r="2" fill="white" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
                    EducaTP
                  </span>
                  <motion.div 
                    className="flex items-center gap-[1px] cursor-pointer select-none italic text-[7px] font-black"
                    whileHover="hover"
                  >
                    <motion.span 
                      variants={{ hover: { rotate: -20, scale: 1.4, y: -2 } }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      style={{ color: '#064e3b' }}
                    >
                      b
                    </motion.span>
                    <motion.span 
                      variants={{ hover: { rotate: 20, scale: 1.4, y: -2 } }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      style={{ color: '#eab308' }}
                    >
                      y
                    </motion.span>
                    <motion.span 
                      variants={{ hover: { scale: 2, y: -2 } }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="w-[3px] h-[3px] rounded-full ml-[1px]"
                      style={{ backgroundColor: '#991b1b' }}
                    />
                  </motion.div>
                </div>
                <span className="text-[8px] font-bold text-emerald-800 uppercase tracking-[0.2em] mt-1">
                  Liceo Carlos Ibáñez del Campo
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold transition-all uppercase tracking-wider",
                  location.pathname === item.path
                    ? "bg-emerald-800 text-white shadow-lg shadow-emerald-900/25"
                    : "text-slate-500 hover:text-emerald-800 hover:bg-emerald-50"
                )}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium",
                    location.pathname === item.path
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
