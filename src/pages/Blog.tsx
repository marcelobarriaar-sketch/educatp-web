import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Tag, ArrowRight, Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/content';

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Blog del Área TP
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Mantente informado sobre las actividades, convenios y logros de nuestra comunidad técnico profesional.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar noticias..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
            {['Todos', 'Eventos', 'Prácticas', 'Salidas Terreno'].map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-indigo-600 text-xs font-bold rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all pt-4">
                  Leer más
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
