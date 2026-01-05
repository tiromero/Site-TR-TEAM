
import React from 'react';
import { ConsultancyStep } from '../types';

interface DisplayCardProps {
  step: ConsultancyStep;
  className?: string;
}

// Fixed error: Type '{ key: number; step: ConsultancyStep; className: string; }' is not assignable to type 'DisplayCardProps'.
// By using React.FC, we ensure the component is correctly typed to accept React-specific props like 'key'.
const DisplayCard: React.FC<DisplayCardProps> = ({ step, className }) => {
  return (
    <div
      className={`relative flex h-56 w-[22rem] md:w-[26rem] -skew-y-[8deg] select-none flex-col justify-between rounded-2xl border-2 border-zinc-800 bg-zinc-900/80 backdrop-blur-md px-6 py-5 transition-all duration-700 hover:border-purple-500/50 hover:bg-zinc-900 hover:z-50 hover:-translate-y-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="relative inline-block rounded-full bg-purple-900/50 p-2 border border-purple-500/30">
          <span className="text-purple-400 font-black text-xs">{step.num}</span>
        </span>
        <p className="text-xl font-black text-white uppercase tracking-tight">{step.title}</p>
      </div>
      
      <div className="space-y-1">
        <p className="text-purple-400 text-sm font-bold uppercase tracking-widest">{step.description}</p>
        <ul className="text-zinc-400 text-xs space-y-1">
          {step.items.map((item, i) => (
            <li key={i} className="flex gap-1">
              <span className="text-purple-600 font-bold">›</span> {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-zinc-600 text-[10px] font-medium uppercase tracking-widest">TR TEAM CONSULTORIA</p>
      
      {/* Overlay effect logic integrated into className for standard tailwind support */}
    </div>
  );
}

export default function HowItWorksCards({ steps }: { steps: ConsultancyStep[] }) {
  // Mobile: Normal grid, Desktop: Stacking effect
  return (
    <div className="relative">
      {/* Desktop Stacking View */}
      <div className="hidden lg:grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-1000 min-h-[500px]">
        {steps.map((step, index) => {
          const offsets = [
            "-translate-x-48 -translate-y-20 z-10",
            "-translate-x-16 -translate-y-10 z-20",
            "translate-x-16 translate-y-10 z-30",
            "translate-x-48 translate-y-20 z-40"
          ];
          
          return (
            <DisplayCard 
              key={index} 
              step={step} 
              className={`[grid-area:stack] ${offsets[index]} 
                before:absolute before:inset-0 before:bg-black/40 before:rounded-2xl before:transition-opacity before:duration-700 hover:before:opacity-0 before:z-10
                grayscale-[80%] hover:grayscale-0`}
            />
          );
        })}
      </div>

      {/* Mobile/Tablet Grid View */}
      <div className="lg:hidden grid gap-16 md:gap-24 place-items-center py-10">
        {steps.map((step, index) => (
          <DisplayCard 
            key={index} 
            step={step} 
            className="hover:grayscale-0"
          />
        ))}
      </div>
    </div>
  );
}
