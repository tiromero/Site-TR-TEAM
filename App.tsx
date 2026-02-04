
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PLANS, BASIC_PLAN, FAQS, CONSULTANCY_STEPS } from './constants';
import { PlanCard } from './components/PlanCard';
import { FAQItem } from './components/FAQItem';
import HowItWorksCards from './components/HowItWorksCards';
import { MagnetizeCTA } from './components/MagnetizeCTA';
import { FloatingNav } from './components/ui/floating-navbar';
import { InteractiveInstaPost } from './components/ui/InteractiveInstaPost';
import { LiveFeedbacks } from './components/LiveFeedbacks';
import { GlowingEffect } from './components/ui/glowing-effect';
import { 
  LayoutDashboard, 
  User, 
  Dumbbell, 
  CreditCard, 
  HelpCircle, 
  Star,
  CheckCircle2,
  AlertTriangle,
  Send,
  ShieldCheck
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

const BasicPlanSection = () => (
  <div className="relative mt-20 group rounded-[2.5rem]">
    <GlowingEffect
      spread={40}
      glow={true}
      disabled={false}
      proximity={64}
      inactiveZone={0.01}
      borderWidth={1.5}
      movementDuration={2.5}
    />
    <div className="relative z-10 p-8 lg:p-12 rounded-[2.5rem] bg-[#0c0c0c] border border-white/5 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900 rounded-full border border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <ShieldCheck className="w-4 h-4 text-purple-500" />
            Entrada Facilitada
          </div>
          <h3 className="font-heading text-4xl lg:text-5xl font-black text-white mb-6 uppercase leading-tight tracking-tighter">
            {BASIC_PLAN.name}
          </h3>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8 font-medium italic">
            "{BASIC_PLAN.description}"
          </p>
          
          <div className="mb-8">
            <h4 className="text-purple-500 font-black text-[10px] uppercase tracking-[0.3em] mb-4 border-b border-zinc-800/50 pb-2">
              O que está incluído no pacote:
            </h4>
            <ul className="grid sm:grid-cols-2 gap-4">
              {BASIC_PLAN.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-zinc-300 leading-tight">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex gap-4 items-start shadow-inner">
            <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
            <div className="space-y-3 text-left">
              <p className="text-[11px] font-bold text-yellow-100/80 leading-relaxed uppercase tracking-wide">
                <span className="text-yellow-500">Atenção:</span> Após preencher tudo vamos analisar pagamento e formulário. Envie corretamente os dados iguais aos da compra e seu usuário do Telegram para liberarmos seu acesso ao App!
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center lg:border-l lg:border-white/5 lg:pl-12">
          <div className="mb-8 group/price">
            <span className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em] block mb-2 transition-colors group-hover/price:text-purple-400">Início Imediato</span>
            <div className="flex items-baseline gap-2 justify-center">
              <span className="text-6xl font-black text-white tracking-tighter">{BASIC_PLAN.price}</span>
              <span className="text-zinc-600 font-bold text-lg">/mês</span>
            </div>
            <div className="mt-4 inline-block px-4 py-1.5 bg-white/5 rounded-full border border-white/5">
               <span className="text-[11px] text-zinc-400 font-black uppercase tracking-widest">Acesso Trimestral: {BASIC_PLAN.totalPrice}</span>
            </div>
          </div>
          
          <button 
            onClick={() => window.open(BASIC_PLAN.telegramLink, '_blank')}
            className="w-full max-w-sm py-6 bg-[#0088cc] hover:bg-[#007ab8] text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_15px_40px_-10px_rgba(0,136,204,0.4)] flex items-center justify-center gap-4 group/btn active:scale-95 border-b-4 border-[#006699] hover:translate-y-[-2px]"
          >
            <Send className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
            {BASIC_PLAN.cta}
          </button>
          
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.1em] leading-relaxed max-w-xs">
              * Sujeito a taxas de acordo com a plataforma de pagamento InfinityPay.
            </p>
          </div>
        </div>
      </div>
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
                Restam apenas algumas vagas
              </div>
              <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-black mb-4 leading-[0.75] md:leading-[0.8] lg:leading-[0.75] tracking-[-0.08em] text-white">
                TR <span className="text-gradient">TEAM</span><br />
                <span className="text-zinc-400 text-2xl md:text-4xl lg:text-5xl tracking-[-0.05em] uppercase block mt-1">Consultoria Online</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 font-medium mb-10 max-w-xl leading-relaxed">
                Transformando corpos e mentes através da ciência do treinamento. Treine de forma <span className="text-white">inteligente</span>, não apenas pesada.
              </p>
              <div className="flex flex-col items-center sm:items-start">
                <MagnetizeCTA text="ASSINAR AGORA" subtext="FOCO TOTAL NO RESULTADO" onClick={() => navigateTo('planos')} />
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
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Escolha o nível de suporte ideal para sua rotina e vamos juntos buscar o seu topo.</p>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
              {PLANS.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>

            <BasicPlanSection />
            
            <div className="max-w-2xl mx-auto text-center px-6 mt-16">
              <p className="text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-widest leading-relaxed opacity-60">
                * Atenção: Os valores totais exibidos correspondem ao pagamento à vista. Parcelamentos via cartão de crédito através da plataforma InfinityPay estão sujeitos a taxas adicionais e juros conforme o número de parcelas selecionado pelo usuário.
              </p>
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
              <MagnetizeCTA text="QUERO MEU RESULTADO TAMBÉM" onClick={() => navigateTo('planos')} />
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
