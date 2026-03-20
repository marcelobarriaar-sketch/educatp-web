import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  History, 
  Layout, 
  Lightbulb, 
  BookOpen, 
  Gamepad2, 
  FileText, 
  Video, 
  ChevronRight,
  ArrowLeft,
  Users,
  Beef,
  Baby,
  Play
} from 'lucide-react';
import { SPECIALTIES } from '../data/content';
import { cn } from '../lib/utils';
import { AnimatePresence } from 'motion/react';

const iconMap: Record<string, any> = {
  Users,
  Beef,
  Baby
};

export default function SpecialtyDetail() {
  const { id } = useParams();
  const specialty = SPECIALTIES.find(s => s.id === id);
  const [activeTab, setActiveTab] = React.useState<'info' | 'resources' | 'activities'>('info');

  if (!specialty) return <div>Especialidad no encontrada</div>;

  const Icon = iconMap[specialty.icon];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className={cn("text-white py-16 md:py-24", specialty.color)}>
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/especialidades" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver a Especialidades
          </Link>
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Icon className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold">{specialty.name}</h1>
              <p className="text-xl text-white/80 max-w-2xl">{specialty.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar">
            {[
              { id: 'info', name: 'Información y Sala Virtual', icon: Layout },
              { id: 'resources', name: 'Recursos y Contenidos', icon: BookOpen },
              { id: 'activities', name: 'Actividades Online', icon: Gamepad2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all",
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50/50"
                    : "border-transparent text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <AnimatePresence mode="wait">
          {activeTab === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* History & Virtual Room */}
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <History className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Nuestra Historia</h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {specialty.history}
                  </p>
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Layout className="w-6 h-6 text-indigo-600" />
                      <h2 className="text-2xl font-bold text-slate-900">Sala Virtual</h2>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">Interactivo</span>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden group">
                    <img
                      src={specialty.virtualRoomUrl}
                      alt="Virtual Room"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-6 py-3 bg-white text-slate-900 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Play className="w-5 h-5 fill-current" />
                        Ingresar a la Sala
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-500 text-sm italic">
                    * Simulación interactiva del entorno de trabajo real de la especialidad.
                  </p>
                </section>
              </div>

              {/* Tips Sidebar */}
              <div className="space-y-8">
                <section className="bg-indigo-600 text-white p-8 rounded-3xl shadow-lg shadow-indigo-500/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Lightbulb className="w-6 h-6 text-yellow-300" />
                    <h2 className="text-2xl font-bold">Tips Rápidos</h2>
                  </div>
                  <div className="space-y-4">
                    {specialty.tips.map((tip, i) => (
                      <div key={i} className="flex gap-3 p-4 bg-white/10 rounded-2xl border border-white/10">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        <p className="text-sm font-medium">{tip}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {specialty.subjects.map((subject, sIdx) => (
                <div key={sIdx} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-1 bg-indigo-600 rounded-full" />
                    <h2 className="text-2xl font-bold text-slate-900">{subject.name}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subject.resources.map((res, rIdx) => (
                      <div key={rIdx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                          <div className={cn(
                            "p-3 rounded-xl",
                            res.type === 'ppt' ? "bg-orange-100 text-orange-600" :
                            res.type === 'video' ? "bg-red-100 text-red-600" :
                            res.type === 'game' ? "bg-purple-100 text-purple-600" :
                            "bg-blue-100 text-blue-600"
                          )}>
                            {res.type === 'ppt' && <FileText className="w-6 h-6" />}
                            {res.type === 'video' && <Video className="w-6 h-6" />}
                            {res.type === 'game' && <Gamepad2 className="w-6 h-6" />}
                            {res.type === 'document' && <BookOpen className="w-6 h-6" />}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{res.type}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">{res.title}</h3>
                        <a href={res.url} className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:gap-3 transition-all">
                          Ver Recurso
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'activities' && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {specialty.subjects.flatMap(s => s.activities).map((activity, aIdx) => (
                <div key={aIdx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex items-center justify-between mb-6">
                    <span className={cn(
                      "px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest",
                      activity.type === 'quiz' ? "bg-amber-100 text-amber-700" :
                      activity.type === 'interactive' ? "bg-indigo-100 text-indigo-700" :
                      "bg-emerald-100 text-emerald-700"
                    )}>
                      {activity.type}
                    </span>
                    <Gamepad2 className="w-6 h-6 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{activity.title}</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">{activity.description}</p>
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2">
                    Comenzar Actividad
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
