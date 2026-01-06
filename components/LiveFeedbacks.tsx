
"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";

interface Feedback {
  name: string;
  text: string;
  tag: string;
  photo?: string;
}

// COLE AQUI A URL DO SEU APPS SCRIPT QUANDO ESTIVER PRONTA
const API_URL = ""; 

const DEMO_FEEDBACKS: Feedback[] = [
  { 
    name: "Carlos Magno", 
    text: "O protocolo de pernas mudou meu jogo. Em 3 semanas a definição já é outra! O suporte é diferenciado.", 
    tag: "Hipertrofia",
    photo: "https://ui-avatars.com/api/?name=Carlos+Magno&background=7c3aed&color=fff&bold=true&size=128"
  },
  { 
    name: "Mariana Costa", 
    text: "Suporte nota 1000. O Tiromero responde rápido e corrige cada detalhe do movimento nos vídeos que envio.", 
    tag: "Consultoria",
    photo: "https://ui-avatars.com/api/?name=Mariana+Costa&background=7c3aed&color=fff&bold=true&size=128"
  },
  { 
    name: "Joaquim Neto", 
    text: "Treinar com ciência é outra coisa. Menos tempo na academia e muito mais resultado. Vale cada centavo.", 
    tag: "Performance",
    photo: "https://ui-avatars.com/api/?name=Joaquim+Neto&background=7c3aed&color=fff&bold=true&size=128"
  },
];

export const LiveFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(DEMO_FEEDBACKS);

  const fetchFeedbacks = async () => {
    if (!API_URL) return;
    
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        // Formata os dados vindos da planilha para incluir a foto dinâmica
        const formattedData = data.map(item => ({
          ...item,
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=7c3aed&color=fff&bold=true&size=128`
        }));
        setFeedbacks(formattedData.reverse().slice(0, 6));
      }
    } catch (error) {
      console.error("Erro ao buscar feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    const interval = setInterval(fetchFeedbacks, 120000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {feedbacks.map((item, idx) => (
            <motion.div
              key={item.name + idx}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="group relative p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 backdrop-blur-md hover:border-purple-500/40 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-purple-500 text-purple-500" />
                    ))}
                  </div>
                  <div className="bg-purple-500/10 text-purple-400 text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest border border-purple-500/20">
                    {item.tag}
                  </div>
                </div>

                <p className="text-zinc-200 text-base leading-relaxed mb-8 font-medium italic">
                  "{item.text}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={item.photo} 
                      alt={item.name}
                      className="w-12 h-12 rounded-full border-2 border-purple-600/30 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-zinc-900 rounded-full p-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm tracking-tight flex items-center gap-1.5">
                      {item.name}
                    </h4>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-1">
                      Aluno Oficial TR TEAM
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
