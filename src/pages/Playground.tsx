import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Brain, FileText, Sprout, BookOpen, Trophy, Play, Star } from 'lucide-react';
import { PLAYGROUND_GAMES } from '../data/content';
import { cn } from '../lib/utils';

const iconMap: Record<string, any> = {
  Brain,
  FileText,
  Sprout,
  BookOpen
};

export default function Playground() {
  return (
    <div className="min-h-screen bg-slate-900 pb-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-bold backdrop-blur-sm"
          >
            <Gamepad2 className="w-4 h-4" />
            ZONA DE ENTRETENIMIENTO
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter"
          >
            PATIO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">JUEGOS</span>
          </motion.h1>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Aprende jugando. Desafía tus conocimientos con nuestros simuladores y trivias diseñadas para cada especialidad.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Juegos Jugados', value: '1,240', icon: Play },
            { label: 'Puntaje Máximo', value: '5,000 XP', icon: Trophy },
            { label: 'Logros Desbloqueados', value: '12', icon: Star },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-white text-xl font-black">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLAYGROUND_GAMES.map((game, index) => {
            const Icon = iconMap[game.icon];
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/5 border border-white/10 hover:border-indigo-500/50 rounded-[2rem] p-8 transition-all overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 -mr-16 -mt-16 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition-all" />
                
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2 block">
                      {game.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {game.description}
                    </p>
                  </div>
                  
                  <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-black text-sm hover:bg-indigo-400 hover:text-white transition-all flex items-center justify-center gap-2">
                    JUGAR AHORA
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Leaderboard Teaser */}
        <div className="mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[3rem] p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 -mr-48 -mt-48 rounded-full blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-black tracking-tight">TABLA DE POSICIONES</h2>
              <p className="text-indigo-100 text-lg">
                Demuestra que eres el mejor de tu especialidad y gana premios increíbles al final del semestre.
              </p>
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black hover:bg-indigo-50 transition-all">
                VER RANKING COMPLETO
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Marcelo B.', score: '4,850 XP', rank: 1 },
                { name: 'Sofía L.', score: '4,620 XP', rank: 2 },
                { name: 'Andrés P.', score: '4,400 XP', rank: 3 },
              ].map((user) => (
                <div key={user.rank} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between border border-white/10">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-sm">
                      {user.rank}
                    </span>
                    <span className="font-bold">{user.name}</span>
                  </div>
                  <span className="font-black text-indigo-200">{user.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
