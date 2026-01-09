
"use client";
import React, { useEffect, useState } from "react";
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
  <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-md shadow-xl flex flex-col justify-between min-h-[280px] w-full max-w-sm">
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
    <div className="flex items-center gap-4 border-t border-white/5 pt-6">
      <div className="relative">
        <img src={item.photo} alt={item.name} className="w-12 h-12 rounded-full border-2 border-purple-600/30" />
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

const ScrollColumn = ({ testimonials, duration = 20, className = "" }: { testimonials: Feedback[], duration?: number, className?: string }) => {
  // Triplicamos a lista para garantir que a rolagem nunca mostre espaços vazios, 
  // mesmo que a lista de depoimentos seja pequena.
  const tripledList = [...testimonials, ...testimonials, ...testimonials];
  
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-33.33%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {tripledList.map((item, idx) => (
          <FeedbackCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

export const LiveFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(DEMO_FEEDBACKS);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    if (!API_URL) return;
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((item, index) => ({
          // Procura por múltiplas variações de nomes de colunas para ser resiliente
          id: item.id || `fb-${index}`,
          name: item.name || item.nome || item.Nome || "Aluno TR TEAM",
          text: item.text || item.feedback || item.feedbackText || item.comentario || item.comentário || "Excelente acompanhamento!",
          tag: item.tag || item.categoria || item.status || "Resultado",
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
    const interval = setInterval(fetchFeedbacks, 120000); // Atualiza a cada 2 minutos
    return () => clearInterval(interval);
  }, []);

  // Divide os feedbacks de forma equilibrada em 3 colunas
  const col1 = feedbacks.filter((_, i) => i % 3 === 0);
  const col2 = feedbacks.filter((_, i) => i % 3 === 1);
  const col3 = feedbacks.filter((_, i) => i % 3 === 2);

  return (
    <div className="relative w-full overflow-hidden max-h-[750px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
      <div className="flex justify-center gap-6 py-4">
        {/* Coluna 1: Todos os navegadores */}
        <ScrollColumn testimonials={col1.length ? col1 : feedbacks} duration={25} />
        
        {/* Coluna 2: Visível em Tablets e Desktop */}
        <ScrollColumn testimonials={col2.length ? col2 : feedbacks} duration={35} className="hidden md:flex" />
        
        {/* Coluna 3: Visível apenas em Desktop */}
        <ScrollColumn testimonials={col3.length ? col3 : feedbacks} duration={30} className="hidden lg:flex" />
      </div>
      
      {/* Caso a lista esteja carregando ou vazia, garantimos que os placeholders não sumam */}
      {feedbacks.length === 0 && !loading && (
        <div className="text-center py-20 text-zinc-500 font-bold uppercase tracking-widest text-xs">
          Aguardando novos depoimentos...
        </div>
      )}
    </div>
  );
};
