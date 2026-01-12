
"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";

interface Feedback {
  id: string;
  name: string;
  text: string;
  tag: string;
  photo?: string;
}

const API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLglVBpvyxHXMWm6ekh6Rq_fMQxWjMBYGlEbyCvIhBbqqyawtVjp1_0W6p0zJTXKmBeNm-wbkzDXV-2N6WDzJ-DtHedrTm2NMMjHPuDhD-qFe1u13EGtw-GHRUzLucGxc1KHYpES4kiCGj_WTRsD9q05dCgDUaTTwCUSUeiNHH8gi-MXr5DQskiqLH53bol8TBltB73tvvm3s-FZ9D3Ch65aM-T9msdg6eQrAy7pjt5cthh0P5cAMKTtOCmTT5Cg4qcMu89J66jD-vxiUlRiyamzzwJC9vAz3dqYctcr&lib=M4MxsoMYlmaNoauxz5nM5R7BBTg3DmODe"; 

const DEMO_FEEDBACKS: Feedback[] = [
  { id: "d1", name: "Carlos Magno", text: "O protocolo de pernas mudou meu jogo. Em 3 semanas a definição já é outra!", tag: "Hipertrofia", photo: "https://ui-avatars.com/api/?name=Carlos+Magno&background=7c3aed&color=fff&bold=true" },
  { id: "d2", name: "Mariana Costa", text: "Suporte nota 1000. O Tiromero responde rápido e corrige cada detalhe.", tag: "Consultoria", photo: "https://ui-avatars.com/api/?name=Mariana+Costa&background=7c3aed&color=fff&bold=true" },
  { id: "d3", name: "Joaquim Neto", text: "Treinar com ciência é outra coisa. Vale cada centavo investido.", tag: "Performance", photo: "https://ui-avatars.com/api/?name=Joaquim+Neto&background=7c3aed&color=fff&bold=true" },
  { id: "d4", name: "Beatriz S.", text: "Finalmente um profissional que entende de periodização real.", tag: "Resultado", photo: "https://ui-avatars.com/api/?name=Beatriz+S&background=7c3aed&color=fff&bold=true" },
  { id: "d5", name: "Felipe M.", text: "A consultoria online superou minhas expectativas presenciais.", tag: "Elite", photo: "https://ui-avatars.com/api/?name=Felipe+M&background=7c3aed&color=fff&bold=true" },
  { id: "d6", name: "Juliana R.", text: "Perdi 5kg de gordura e ganhei massa magra em tempo recorde.", tag: "Definição", photo: "https://ui-avatars.com/api/?name=Juliana+R&background=7c3aed&color=fff&bold=true" },
];

const FeedbackCard: React.FC<{ item: Feedback }> = ({ item }) => (
  <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-md shadow-xl flex flex-col justify-between min-h-[280px] w-full max-w-sm mx-auto transition-all duration-500 hover:bg-zinc-900/60 hover:border-purple-500/30 group">
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-purple-500 text-purple-500" />
          ))}
        </div>
        <div className="bg-purple-500/10 text-purple-400 text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
          {item.tag}
        </div>
      </div>
      <p className="text-zinc-200 text-base leading-relaxed mb-8 font-medium italic">
        "{item.text}"
      </p>
    </div>
    <div className="flex items-center gap-4 border-t border-white/5 pt-6">
      <div className="relative">
        <img src={item.photo} alt={item.name} className="w-12 h-12 rounded-full border-2 border-purple-600/30 object-cover" />
        <div className="absolute -bottom-1 -right-1 bg-zinc-900 rounded-full p-0.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
        </div>
      </div>
      <div>
        <h4 className="text-white font-black text-sm truncate max-w-[150px]">{item.name}</h4>
        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Aluno TR TEAM</span>
      </div>
    </div>
  </div>
);

const ScrollColumn = ({ 
  testimonials, 
  duration = 20, 
  className = "",
  isPaused = false
}: { 
  testimonials: Feedback[], 
  duration?: number, 
  className?: string,
  isPaused?: boolean
}) => {
  const displayList = useMemo(() => [...testimonials, ...testimonials, ...testimonials], [testimonials]);
  
  if (testimonials.length === 0) return null;

  return (
    <div className={className}>
      <motion.div
        animate={isPaused ? {} : { translateY: "-33.333%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {displayList.map((item, idx) => (
          <FeedbackCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

export const LiveFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(DEMO_FEEDBACKS);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const rawList = Array.isArray(data) ? data : (data.data || []);

      if (rawList.length > 0) {
        const formatted = rawList.map((item: any, index: number) => ({
          id: item.id || `fb-${index}`,
          name: item.name || item.nome || item.Nome || "Aluno TR TEAM",
          text: item.text || item.feedback || item.comentario || item.comentário || "Excelente trabalho!",
          tag: item.tag || item.categoria || item.resultado || "Resultado",
          photo: item.photo || item.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name || item.nome || "A")}&background=7c3aed&color=fff&bold=true`
        }));
        setFeedbacks(formatted);
      }
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar feedbacks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    const interval = setInterval(fetchFeedbacks, 300000); 
    return () => clearInterval(interval);
  }, []);

  const col1 = useMemo(() => feedbacks.filter((_, i) => i % 3 === 0), [feedbacks]);
  const col2 = useMemo(() => feedbacks.filter((_, i) => i % 3 === 1), [feedbacks]);
  const col3 = useMemo(() => feedbacks.filter((_, i) => i % 3 === 2), [feedbacks]);

  const MOBILE_SECONDS_PER_ITEM = 40; 
  const DESKTOP_SECONDS_PER_ITEM = 30;

  return (
    <div 
      className="relative w-full overflow-hidden max-h-[850px] [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)] select-none cursor-grab active:cursor-grabbing"
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      onPointerLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-center gap-6 py-4">
        {isMobile ? (
          <ScrollColumn 
            testimonials={feedbacks} 
            duration={Math.max(feedbacks.length * MOBILE_SECONDS_PER_ITEM, 60)} 
            isPaused={isPaused}
          />
        ) : (
          <>
            <ScrollColumn 
              testimonials={col1.length ? col1 : feedbacks} 
              duration={Math.max(col1.length * DESKTOP_SECONDS_PER_ITEM, 60)} 
              isPaused={isPaused}
            />
            <ScrollColumn 
              testimonials={col2.length ? col2 : feedbacks} 
              duration={Math.max(col2.length * (DESKTOP_SECONDS_PER_ITEM + 10), 80)} 
              className="hidden md:flex" 
              isPaused={isPaused}
            />
            <ScrollColumn 
              testimonials={col3.length ? col3 : feedbacks} 
              duration={Math.max(col3.length * (DESKTOP_SECONDS_PER_ITEM + 5), 70)} 
              className="hidden lg:flex" 
              isPaused={isPaused}
            />
          </>
        )}
      </div>
      
      {feedbacks.length === 0 && !loading && (
        <div className="text-center py-20 text-zinc-500 font-bold uppercase tracking-widest text-xs">
          Aguardando novos depoimentos...
        </div>
      )}
    </div>
  );
};
