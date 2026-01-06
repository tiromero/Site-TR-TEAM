
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PLANS, FAQS, TESTIMONIALS, CONSULTANCY_STEPS } from './constants';
import { PlanCard } from './components/PlanCard';
import { FAQItem } from './components/FAQItem';
import HowItWorksCards from './components/HowItWorksCards';
import { MagnetizeCTA } from './components/MagnetizeCTA';
import { AvatarGroup } from './components/ui/avatar-group';
import { FloatingNav } from './components/ui/floating-navbar';
import { TestimonialsColumn } from './components/ui/testimonials-columns-1';
import { InteractiveHeroImage } from './components/ui/InteractiveHeroImage';
import { 
  LayoutDashboard, 
  User, 
  Dumbbell, 
  CreditCard, 
  HelpCircle, 
  Star 
} from 'lucide-react';

const STUDENT_AVATARS = [
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150", label: "Ana S." },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", label: "Marcos V." },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150", label: "Juliana R." },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150", label: "Ricardo F." },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150", label: "Elena M." },
];

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-purple-600 origin-left z-[6000] shadow-[0_0_10px_rgba(168,85,247,0.5)]"
      style={{ scaleX }}
    />
  );
};

const SocialProof = () => (
  <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
    <AvatarGroup avatars={STUDENT_AVATARS} maxVisible={5} size={42} />
    <div className="text-left">
      <p className="text-white font-black text-sm tracking-tight leading-none mb-1">
        +50 Alunos já começaram
      </p>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest ml-1">Treinando com qualidade e bons resultados!</span>
      </div>
    </div>
  </div>
);

const TickerBanner = () => (
  <div className="w-full bg-purple-600 py-3 overflow-hidden whitespace-nowrap border-y border-purple-400/30">
    <div className="inline-block animate-marquee">
      {[...Array(20)].map((_, i) => (
        <span key={i} className="mx-4 font-heading font-black text-xs md:text-sm text-white/90">TR TEAM</span>
      ))}
    </div>
    <div className="inline-block animate-marquee">
      {[...Array(20)].map((_, i) => (
        <span key={i} className="mx-4 font-heading font-black text-xs md:text-sm text-white/90">TR TEAM</span>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const sections = ['inicio', 'sobre', 'metodo', 'planos', 'faq', 'resultados'];
      let currentSection = sections[0];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: "inicio", name: "Início", link: "#inicio", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "sobre", name: "Sobre", link: "#sobre", icon: <User className="h-4 w-4" /> },
    { id: "metodo", name: "Método", link: "#metodo", icon: <Dumbbell className="h-4 w-4" /> },
    { id: "planos", name: "Planos", link: "#planos", icon: <CreditCard className="h-4 w-4" /> },
    { id: "faq", name: "FAQ", link: "#faq", icon: <HelpCircle className="h-4 w-4" /> },
    { id: "resultados", name: "Feedbacks", link: "#resultados", icon: <Star className="h-4 w-4" /> },
  ];

  const firstColumn = TESTIMONIALS.slice(0, 3);
  const secondColumn = TESTIMONIALS.slice(3, 6);
  const thirdColumn = TESTIMONIALS.slice(6, 9);

  return (
    <div className="min-h-screen selection:bg-purple-500/30 bg-[#070707] overflow-x-hidden relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
        .text-gradient {
          background: linear-gradient(to right, #a78bfa, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        html { scroll-behavior: smooth; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        
        .aura-shape {
          position: fixed;
          filter: blur(120px);
          z-index: 0;
          pointer-events: none;
        }
      `}</style>

      <ScrollProgressBar />

      {/* Aesthetic Aura Backgrounds */}
      <div className="aura-shape w-[600px] h-[600px] bg-purple-600/10 rounded-full top-[-10%] right-[-10%] animate-pulse" />
      <div className="aura-shape w-[400px] h-[400px] bg-indigo-600/5 rounded-full bottom-[-10%] left-[-5%]" />

      <FloatingNav navItems={navItems} onNavigate={navigateTo} activeSection={activeSection} />

      {/* Main Content Area */}
      <div className="relative z-10 w-full">
        
        {/* Hero Section */}
        <section id="inicio" className="relative pt-24 pb-16 lg:pt-48 lg:pb-32 px-6 lg:px-20 overflow-hidden">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping" />
                Restam apenas algumas vagas
              </div>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl font-black mb-6 leading-tight">
                TR <span className="text-gradient">TEAM</span><br />
                <span className="text-zinc-400 text-3xl md:text-5xl tracking-tight uppercase">Consultoria Online</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 font-medium mb-10 max-w-xl leading-relaxed">
                Transformando corpos e mentes através da ciência do treinamento. Treine de forma <span className="text-white">inteligente</span>, não apenas pesada.
              </p>
              <div className="flex flex-col items-center sm:items-start">
                <MagnetizeCTA text="ASSINAR AGORA" subtext="FOCO TOTAL NO RESULTADO" onClick={() => navigateTo('planos')} />
                <SocialProof />
              </div>
            </div>
            <div className="relative hidden lg:block">
              <InteractiveHeroImage />
            </div>
          </div>
        </section>

        <TickerBanner />

        {/* Sobre Seção */}
        <section id="sobre" className="py-24 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-purple-600/10 rounded-[40px] border border-purple-500/20 group-hover:bg-purple-600/20 transition-all duration-500" />
              <img 
                src="/tiromero-perfil.jpg" 
                alt="Tiromero" 
                className="relative rounded-[2rem] grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 shadow-2xl w-full max-w-md mx-auto aspect-square object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800";
                }}
              />
            </div>
            <div>
              <h2 className="font-heading text-4xl md:text-6xl font-black mb-8 leading-none">
                Prazer, <br />
                <span className="text-gradient">sou "Tiromero"</span>
              </h2>
              <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                <p>
                  Há mais ou menos 7 anos, decidi começar minha própria consultoria online para ajudar de forma efetiva meus alunos(as) em sua jornada com o treinamento físico. Minha metodologia combina técnica e ciência do treinamento físico para criar um plano inteligente e totalmente individualizado, garantindo a transformação segura de seus objetivos e progressões.
                </p>
                <div className="p-8 bg-white/5 border border-white/5 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-purple-600/10 transition-all" />
                  <p className="text-white font-bold italic text-xl relative z-10">
                    "Juntos, vamos otimizar seu tempo e seus esforços, treinando de forma inteligente e focada."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Método */}
        <section id="metodo" className="py-24 px-6 lg:px-20 bg-zinc-950/30 backdrop-blur-md">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center mb-20">
              <span className="text-purple-500 font-black text-xs uppercase tracking-[0.4em] mb-4">O Fluxo de Trabalho</span>
              <h2 className="font-heading text-4xl md:text-6xl font-black">Como funciona o Plano.</h2>
            </div>
            <HowItWorksCards steps={CONSULTANCY_STEPS} />
          </div>
        </section>

        {/* Planos */}
        <section id="planos" className="py-24 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-6xl font-black mb-4">Escolha sua Jornada</h2>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Transformação garantida ou seu treino de volta</p>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
              {PLANS.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 px-6 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
               <h2 className="font-heading text-4xl md:text-6xl font-black mb-4">Dúvidas Frequentes</h2>
               <div className="w-24 h-1 bg-purple-600 rounded-full" />
            </div>
            <div className="bg-zinc-900/30 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 lg:p-12">
              {FAQS.map((faq, idx) => (
                <FAQItem key={idx} faq={faq} />
              ))}
            </div>
          </div>
        </section>

        {/* Resultados */}
        <section id="resultados" className="py-24 relative overflow-hidden bg-zinc-950/50">
          <div className="container relative z-10 mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-16"
            >
              <div className="flex justify-center mb-6">
                <div className="border border-purple-500/30 py-1.5 px-4 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  Prova Social
                </div>
              </div>

              <h2 className="font-heading text-center text-4xl md:text-6xl font-black mb-6 leading-tight uppercase">
                Feedbacks de Alunos <br />
                <span className="text-gradient">com resultados reais</span>
              </h2>
              <p className="text-center text-zinc-400 font-medium">
                Veja o que quem treina com a TR TEAM está alcançando todos os dias através de um acompanhamento direto e profissional.
              </p>
            </motion.div>

            <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
              <TestimonialsColumn testimonials={firstColumn} duration={25} />
              <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
              <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
            </div>

            <div className="mt-20 flex flex-col items-center">
              <MagnetizeCTA text="COMEÇAR MINHA EVOLUÇÃO" onClick={() => navigateTo('planos')} />
              <SocialProof />
            </div>
          </div>
        </section>

        {/* Footer Area */}
        <footer className="py-16 px-6 lg:px-20 border-t border-white/5 bg-black/40">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="font-heading text-2xl font-black text-white">
              TR<span className="text-purple-600">TEAM</span>
            </div>
            <div className="flex gap-8 text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em]">
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('inicio'); }} className="hover:text-white transition-colors">Início</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('planos'); }} className="hover:text-white transition-colors">Consultoria</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('faq'); }} className="hover:text-white transition-colors">Suporte</a>
            </div>
            <div className="text-zinc-600 text-[10px] font-bold">
              © 2024 TR TEAM. POWERED BY PERFORMANCE.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
