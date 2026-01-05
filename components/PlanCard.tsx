
import React from 'react';
import { Plan } from '../types';

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
    <div className={`relative flex flex-col p-6 md:p-8 rounded-3xl md:rounded-[40px] transition-all duration-500 transform border ${
      plan.isFeatured 
        ? 'border-2 md:border-4 border-purple-500 bg-zinc-900 shadow-[0_30px_60px_-15px_rgba(124,58,237,0.4)] z-10 scale-100 md:scale-105 hover:md:scale-110 hover:md:-translate-y-2 hover:md:shadow-[0_40px_80px_-15px_rgba(124,58,237,0.6)]' 
        : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 md:hover:-translate-y-1 hover:shadow-xl'
    }`}>
      {plan.isFeatured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-purple-600 text-white text-[9px] md:text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-xl whitespace-nowrap">
          Mais Popular
        </div>
      )}
      
      <div className="mb-6 md:mb-8 text-center">
        <h3 className={`text-xl md:text-2xl font-black mb-3 md:mb-4 ${plan.isFeatured ? 'text-white' : 'text-zinc-200'}`}>{plan.name}</h3>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl md:text-5xl font-black ${plan.isFeatured ? 'text-purple-400' : 'text-white'}`}>{plan.price}</span>
            <span className="text-zinc-500 font-bold text-sm">/mês</span>
          </div>
          {plan.originalPrice && (
            <p className="text-zinc-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">Total: {plan.originalPrice}</p>
          )}
        </div>
      </div>

      <p className="text-zinc-400 text-xs md:text-sm text-center font-medium leading-relaxed mb-6 md:mb-8 px-2 h-auto md:h-12">
        {plan.description}
      </p>

      <div className="mb-4">
        <h4 className="text-purple-500 font-black text-[10px] uppercase tracking-widest mb-3 border-b border-zinc-800 pb-2">O que inclui:</h4>
      </div>

      <ul className="flex-grow space-y-3 md:space-y-4 mb-8 md:mb-10">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-[11px] md:text-xs font-bold uppercase tracking-tight text-zinc-300 leading-tight">
            <svg className={`w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 mt-0.5 ${plan.isFeatured ? 'text-purple-400' : 'text-purple-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <button 
        onClick={handleWhatsAppRedirect}
        className={`w-full py-4 md:py-5 rounded-2xl md:rounded-[20px] font-black transition-all duration-300 uppercase tracking-widest text-[11px] md:text-sm active:scale-95 ${
        plan.isFeatured
          ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-600/40'
          : 'bg-zinc-800 hover:bg-zinc-700 text-white'
      }`}>
        {plan.cta}
      </button>
    </div>
  );
};
