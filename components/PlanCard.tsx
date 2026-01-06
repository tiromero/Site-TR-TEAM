
import React from 'react';
import { Plan } from '../types';
import { GlowingEffect } from './ui/glowing-effect';

interface PlanCardProps {
  plan: Plan;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "5516993610513";
    const message = encodeURIComponent(`Olá, gostaria de saber se há vaga disponivel para o ${plan.name}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className={`relative group rounded-[2.5rem] transition-all duration-500 transform ${
      plan.isFeatured ? 'md:scale-105 z-20 shadow-[0_0_60px_-10px_rgba(124,58,237,0.5)]' : 'z-10'
    }`}>
      
      {/* Novo Efeito de Brilho Interativo */}
      <GlowingEffect
        spread={plan.isFeatured ? 100 : 40}
        glow={true}
        disabled={false}
        proximity={plan.isFeatured ? 140 : 64}
        inactiveZone={0.01}
        borderWidth={plan.isFeatured ? 4 : 1.5}
        movementDuration={plan.isFeatured ? 1.0 : 2.5}
      />

      {/* Badge "Plano Mais Vendido" - Garantindo que não corte */}
      {plan.isFeatured && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-purple-600 text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-2xl z-[40] whitespace-nowrap border border-purple-400/40">
          Plano Mais Vendido
        </div>
      )}

      {/* Conteúdo do Card */}
      <div className="relative flex flex-col h-full p-8 md:p-10 rounded-[2.4rem] bg-[#0c0c0c] z-10 overflow-visible border border-white/5">
        
        <div className="mb-8 text-center pt-2">
          <h3 className={`text-2xl font-black mb-4 uppercase tracking-tighter ${plan.isFeatured ? 'text-white' : 'text-zinc-400'}`}>
            {plan.name}
          </h3>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-baseline gap-1">
              <span className={`text-5xl font-black ${plan.isFeatured ? 'text-purple-500' : 'text-white'}`}>
                {plan.price}
              </span>
              <span className="text-zinc-600 font-bold text-sm">/mês</span>
            </div>
            {plan.originalPrice && (
              <div className="mt-2 text-center">
                <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest line-through">
                  Total à vista: {plan.originalPrice}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Descrição */}
        <p className="text-zinc-400 text-sm text-center font-medium leading-relaxed mb-8 min-h-[60px] flex items-center justify-center">
          {plan.description}
        </p>

        <div className="mb-6">
          <h4 className="text-purple-500 font-black text-[10px] uppercase tracking-[0.3em] mb-4 border-b border-zinc-800/50 pb-2">
            O que está incluído:
          </h4>
          <ul className="space-y-4">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[11px] font-bold uppercase tracking-tight text-zinc-300 leading-tight">
                <div className={`mt-0.5 rounded-full p-0.5 ${plan.isFeatured ? 'bg-purple-500/20 text-purple-400' : 'bg-zinc-800 text-zinc-500'}`}>
                  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-8">
          <button 
            onClick={handleWhatsAppRedirect}
            className={`w-full py-5 rounded-[1.5rem] font-black transition-all duration-300 uppercase tracking-widest text-xs active:scale-95 ${
            plan.isFeatured
              ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_10px_30px_-10px_rgba(124,58,237,0.6)]'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
          }`}>
            {plan.cta}
          </button>
        </div>
      </div>
    </div>
  );
};
