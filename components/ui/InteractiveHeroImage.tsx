
"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const InteractiveHeroImage = () => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
    <div className="relative w-full max-w-md mx-auto perspective-[1000px]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-purple-600/30 blur-[120px] rounded-full animate-pulse" />
      
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
          y: [0, -15, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative z-10 w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 group cursor-pointer"
      >
        {/* Agora aponta para um arquivo que você pode subir no GitHub */}
        <img
          src="/hero-consultoria.png"
          alt="Consultoria TR Team"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback caso a imagem ainda não tenha sido enviada
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1616748494672-c0e663a04285?auto=format&fit=crop&q=80&w=800";
          }}
        />
        
        {/* Overlay para dar profundidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {/* Elementos flutuantes em 3D */}
        <motion.div 
          style={{ translateZ: "50px" }}
          className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
               <span className="text-[10px] font-black">TR</span>
            </div>
            <div>
              <p className="text-white font-black text-xs uppercase tracking-widest leading-none">Protocolo Ativo</p>
              <p className="text-zinc-400 text-[10px] font-bold mt-1">Sincronizado com App</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Decoração Extra */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
    </div>
  );
};
