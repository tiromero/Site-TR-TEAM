
"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";

interface InteractiveInstaPostProps {
  postUrl: string;
  maxWidth?: string;
  label?: string;
  floatLabel?: string;
}

export const InteractiveInstaPost: React.FC<InteractiveInstaPostProps> = ({ 
  postUrl, 
  maxWidth = "380px", 
  label = "Navegue no Carrossel",
  floatLabel = "Resultados"
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const embedUrl = postUrl.endsWith('/') ? `${postUrl}embed` : `${postUrl}/embed`;

  // Valores para o efeito de inclinação (Tilt)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative w-full mx-auto perspective-[1000px] group/container" style={{ maxWidth }}>
      {/* Brilho de fundo (Aura) */}
      <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full animate-pulse" />
      
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative z-10 w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#121212] group"
      >
        {/* Camada do Post do Instagram (Real) */}
        <div className="absolute inset-0 z-0 scale-[1.02]">
          <iframe
            src={embedUrl}
            className="w-full h-full border-none"
            scrolling="no"
            allowTransparency={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>

        {/* Overlay de Interação */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
           <div className="absolute bottom-6 left-6 flex items-center gap-2">
              <Instagram className="w-5 h-5 text-purple-500" />
              <span className="text-white text-[10px] font-black uppercase tracking-widest">{label}</span>
           </div>
        </div>

        {/* Botão para abrir o post original */}
        <a 
          href={postUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-purple-600 transition-all opacity-0 group-hover:opacity-100"
          title="Ver no Instagram"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* Elemento 3D Decorativo */}
        <motion.div 
          style={{ translateZ: "60px" }}
          className="absolute -bottom-4 -right-4 p-4 bg-purple-600 rounded-2xl shadow-2xl z-20 hidden lg:block"
        >
          <p className="text-white font-black text-[10px] uppercase tracking-tighter">{floatLabel}</p>
        </motion.div>
      </motion.div>
      
      {/* Decorações ao redor */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl" />
    </div>
  );
};
