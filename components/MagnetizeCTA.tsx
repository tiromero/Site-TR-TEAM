
import React, { useEffect, useState, useCallback } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Crown, Zap } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface MagnetizeCTAProps {
  text?: string;
  subtext?: string;
  className?: string;
  onClick?: () => void;
}

export const MagnetizeCTA: React.FC<MagnetizeCTAProps> = ({
  text = "ENTRE PARA O TIME",
  subtext = "RESULTADOS EFETIVOS",
  className = "",
  onClick
}) => {
  const [isAttracting, setIsAttracting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesControl = useAnimation();

  useEffect(() => {
    const newParticles = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      size: Math.random() * 4 + 2,
    }));
    setParticles(newParticles);
  }, []);

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      opacity: 1,
      scale: 0.5,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
      },
    });
  }, [particlesControl]);

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false);
    await particlesControl.start((i) => ({
      x: particles[i].x,
      y: particles[i].y,
      opacity: 0.3,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }));
  }, [particlesControl, particles]);

  return (
    <div className={`relative flex flex-col items-center group ${className}`}>
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 bg-purple-600/20 blur-2xl rounded-full transition-opacity duration-500 ${isAttracting ? 'opacity-100' : 'opacity-0'}`} />

      {/* Interactive Particles Layer */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
        {particles.map((p, index) => (
          <motion.div
            key={p.id}
            custom={index}
            initial={{ x: p.x, y: p.y, opacity: 0.2 }}
            animate={particlesControl}
            className="absolute rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </div>

      {/* The Main Button */}
      <button
        onClick={onClick}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        className={`
          relative z-10 min-w-[280px] px-8 py-5 
          bg-purple-600 hover:bg-purple-500 
          text-white rounded-2xl font-black text-lg
          transition-all duration-300 transform
          shadow-[0_15px_35px_-5px_rgba(124,58,237,0.5)]
          active:scale-95 flex flex-col items-center justify-center gap-1
          border-b-4 border-purple-800
          ${isAttracting ? 'scale-105 shadow-[0_25px_50px_-10px_rgba(124,58,237,0.7)]' : ''}
        `}
      >
        <span className="flex items-center gap-3 tracking-tighter">
          <Crown
            className={`w-6 h-6 transition-transform duration-500 ${
              isAttracting ? "rotate-[15deg] scale-125 text-yellow-400" : "text-white"
            }`}
          />
          {text}
          <Zap className={`w-5 h-5 text-yellow-300 transition-opacity ${isAttracting ? 'opacity-100' : 'opacity-0'}`} />
        </span>
        
        <AnimatePresence>
          {isAttracting && (
            <motion.span 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-[10px] font-bold tracking-[0.3em] text-purple-200 mt-1 uppercase"
            >
              {subtext}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Extra floating subtext (visible only on desktop non-hover) */}
      <div className={`mt-4 text-[10px] font-black tracking-widest text-zinc-600 uppercase transition-opacity duration-300 ${isAttracting ? 'opacity-0' : 'opacity-100'}`}>
        TRILHA DE EVOLUÇÃO ELITE
      </div>
    </div>
  );
};
