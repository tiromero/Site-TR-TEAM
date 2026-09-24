import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FAQS, CONSULTANCY_STEPS } from './constants';
import { FAQItem } from './components/FAQItem';
import HowItWorksCards from './components/HowItWorksCards';
import { MagnetizeCTA } from './components/MagnetizeCTA';
import { FloatingNav } from './components/ui/floating-navbar';
import { InteractiveInstaPost } from './components/ui/InteractiveInstaPost';
import { LiveFeedbacks } from './components/LiveFeedbacks';
import { GlowingEffect } from './components/ui/glowing-effect';
import { LeadQuizModal } from './components/LeadQuizModal';
import { 
  LayoutDashboard, 
  User, 
  Dumbbell, 
  FileText, 
  HelpCircle, 
  Star,
  CheckCircle2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

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
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

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
    { id: "planos", name: "Qualificação", link: "#planos", icon: <FileText className="h-4 w-4" /> },
    { id: "faq", name: "FAQ", link: "#faq", icon: <HelpCircle className="h-4 w-4" /> },
    { id: "resultados", name: "Feedbacks", link: "#resultados", icon: <Star className="h-4 w-4" /> },
  ];

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

      <div className="aura-shape w-[600px] h-[600px] bg-purple-600/10 rounded-full top-[-10%] right-[-10%] animate-pulse" />
      <div className="aura-shape w-[400px] h-[400px] bg-indigo-600/5 rounded-full bottom-[-10%] left-[-5%]" />

      <FloatingNav navItems={navItems} onNavigate={navigateTo} activeSection={activeSection} />

      <div className="relative z-10 w-full">
        
        {/* Hero Section */}
        <section id="inicio" className="relative pt-20 pb-16 lg:pt-40 lg:pb-32 px-6 lg:px-20 overflow-hidden">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping" />
                Acompanhamento Individualizado • Ciência Aplicada à Vida
              </div>
              <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-black mb-4 leading-[0.75] md:leading-[0.8] lg:leading-[0.75] tracking-[-0.08em] text-white">
                TR <span className="text-gradient">TEAM</span><br />
                <span className="text-zinc-400 text-2xl md:text-4xl lg:text-5xl tracking-[-0.05em] uppercase block mt-1">Consultoria Online</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 font-medium mb-10 max-w-xl leading-relaxed">
                Transformando corpos e mentes através da ciência do treinamento. Treine de forma <span className="text-white">inteligente</span>, não apenas pesada.
              </p>
              <div className="flex flex-col items-center sm:items-start">
                <MagnetizeCTA text="ENTRAR NA LISTA DE QUALIFICAÇÃO" subtext="LISTA DE ESPERA & ANÁLISE INDIVIDUAL" onClick={handleOpenQuiz} />
              </div>
            </div>
            <div className="relative hidden lg:block">
              <InteractiveInstaPost 
                postUrl="https://www.instagram.com/p/DSvVi9llRli/" 
                maxWidth="380px"
              />
            </div>
          </div>
        </section>

        <TickerBanner />

        {/* Sobre Seção */}
        <section id="sobre" className="py-24 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <InteractiveInstaPost 
                postUrl="https://www.instagram.com/p/B5qCaWahW7y/" 
                maxWidth="420px"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                Treinador há 7+ Anos
              </div>
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

        {/* Seção de Aplicação para a Consultoria TR TEAM (Substitui pacotes e preços) */}
        <section id="planos" className="py-24 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Header da Seção */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                Lista de Qualificação & Espera • Avaliação Individual
              </div>
              <h2 className="font-heading text-4xl md:text-6xl font-black mb-6 text-white uppercase tracking-tight">
                Lista de Qualificação & Espera <br />
                <span className="text-gradient">Consultoria TR TEAM</span>
              </h2>
              <p className="text-zinc-400 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Acompanhamento individualizado e próximo, conduzido diretamente pelo Tiromero. Preencha o diagnóstico para analisarmos seus objetivos e momento atual.
              </p>
            </div>

            {/* Hub Central de Aplicação */}
            <div className="relative group rounded-[2.5rem]">
              <GlowingEffect
                spread={45}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={1.5}
                movementDuration={2.5}
              />
              
              <div className="relative z-10 p-8 lg:p-14 rounded-[2.5rem] bg-[#0c0c0c] border border-white/5 overflow-hidden shadow-2xl">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  
                  {/* Coluna Esquerda: Pilares da Metodologia e Etapas */}
                  <div className="lg:col-span-7 space-y-8">
                    <div>
                      <span className="text-purple-400 font-black text-[10px] uppercase tracking-[0.3em] block mb-2">
                        Cuidado e Método
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight mb-4">
                        Por que passamos por uma qualificação individual?
                      </h3>
                      <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                        Cada pessoa possui histórico motor, rotina e necessidades singulares. Para assegurar máxima proximidade, correções reais em vídeo e suporte direto sem terceirização, o ingresso na consultoria ocorre através da nossa Lista de Qualificação & Espera. Este diagnóstico prévio existe para certificar que suas prioridades e momento convergem com a nossa metodologia de trabalho.
                      </p>
                    </div>

                    {/* Destaques em Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <div className="flex items-center gap-2.5 text-white font-bold text-xs uppercase tracking-wider mb-1">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                          Periodização no App
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                          Treinos organizados no app com séries, repetições, descanso e progressão de carga documentada.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <div className="flex items-center gap-2.5 text-white font-bold text-xs uppercase tracking-wider mb-1">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                          Correções em Vídeo
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                          Envie vídeos das suas execuções e receba apontamentos detalhados de biomecânica aplicada, técnica do movimento e cadência.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <div className="flex items-center gap-2.5 text-white font-bold text-xs uppercase tracking-wider mb-1">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                          Suporte no WhatsApp
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                          Canal aberto para tirar dúvidas, ajustar rotinas e manter constância sem burocracia.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <div className="flex items-center gap-2.5 text-white font-bold text-xs uppercase tracking-wider mb-1">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                          Ajustes Estratégicos & Proximidade
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                          Acompanhamento de máxima proximidade, com ajustes contínuos ao decorrer das demandas observadas em feedbacks semanais e mensais.
                        </p>
                      </div>
                    </div>

                    {/* Como funciona o fluxo */}
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-zinc-500 font-black text-[9px] uppercase tracking-[0.4em] block mb-3">
                        Fluxo de 3 Etapas:
                      </span>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-semibold bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/5 flex-1">
                          <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center text-[10px] font-black">1</span>
                          <span>Preencher Qualificação</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-semibold bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/5 flex-1">
                          <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center text-[10px] font-black">2</span>
                          <span>Análise de Compatibilidade</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-semibold bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/5 flex-1">
                          <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center text-[10px] font-black">3</span>
                          <span>Entramos em contato</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coluna Direita: Box de Ação Direta */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center text-center lg:border-l lg:border-white/5 lg:pl-10">
                    <div className="w-full max-w-sm bg-gradient-to-b from-purple-950/20 to-zinc-900/40 p-6 md:p-8 rounded-3xl border border-purple-500/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                        Atendimento Pessoal & Direto
                      </div>

                      <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-3">
                        Diagnóstico de Compatibilidade
                      </h4>

                      <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-8">
                        Responda ao diagnóstico em 2 minutos. Avaliaremos sua individualidade e prioridades para certificar se o seu objetivo está perfeitamente alinhado à nossa metodologia antes de darmos início ao acompanhamento.
                      </p>

                      <button
                        onClick={handleOpenQuiz}
                        className="w-full py-4.5 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_15px_35px_-5px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2.5 group active:scale-95 border-b-4 border-purple-800 cursor-pointer text-center leading-none"
                      >
                        <Sparkles className="w-4 h-4 shrink-0 text-purple-200 transition-transform group-hover:rotate-12" />
                        <span>Entrar na Lista de Qualificação</span>
                      </button>

                      <div className="mt-6 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                          <span>Diagnóstico Inicial Sem Custo</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-medium">
                          Admissão condicional à compatibilidade de perfil e rotina
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
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
        <section id="resultados" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
          <div className="container relative z-10 mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-16"
            >
              <div className="flex justify-center mb-6">
                <div className="border border-purple-500/30 py-1.5 px-4 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  Aprovação da Comunidade
                </div>
              </div>

              <h2 className="font-heading text-center text-4xl md:text-6xl font-black mb-6 leading-tight uppercase text-white">
                O que dizem os <br />
                <span className="text-gradient">nossos atletas</span>
              </h2>
            </motion.div>

            <LiveFeedbacks />

            <div className="mt-20 flex flex-col items-center">
              <MagnetizeCTA text="ENTRAR NA LISTA DE ESPERA" subtext="QUALIFICAÇÃO & ANÁLISE INDIVIDUAL" onClick={handleOpenQuiz} />
            </div>
          </div>
        </section>

        <footer className="py-16 px-6 lg:px-20 border-t border-white/5 bg-black/40">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="font-heading text-2xl font-black text-white">
              TR<span className="text-purple-600">TEAM</span>
            </div>
            <div className="flex gap-8 text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em]">
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('inicio'); }} className="hover:text-white transition-colors">Início</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('planos'); }} className="hover:text-white transition-colors">Qualificação & Espera</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('faq'); }} className="hover:text-white transition-colors">Suporte</a>
            </div>
            <div className="text-zinc-600 text-[10px] font-bold">
              © 2024 TR TEAM. POWERED BY PERFORMANCE.
            </div>
          </div>
        </footer>
      </div>

      <LeadQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
};

export default App;
