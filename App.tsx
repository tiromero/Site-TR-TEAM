
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
  Send,
  ShieldCheck,
  ShoppingBag,
  FileText,
  MessageSquare,
  Lock
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

const PaymentIcons = () => (
  <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
    {/* Visa */}
    <svg width="30" height="10" viewBox="0 0 30 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-auto">
      <path d="M11.2353 0.176465L8.29412 7.05882L7.35294 1.94118C7.17647 0.941177 6.47059 0.176465 5.52941 0.176465H0.176471L0 0.411759C1.11765 0.705877 2.11765 1.17647 3 1.76471C3.52941 2.11765 3.70588 2.35294 3.88235 3L5.47059 9.17647H9.17647L14.8235 0.176465H11.2353Z" fill="#1434CB"/>
      <path d="M21.5294 6.35294C21.5294 4.05882 18.5294 3.94118 18.5294 2.82353C18.5294 2.47059 18.8824 2.11765 19.5882 2.11765C20 2.11765 21.0588 2.23529 22.0588 2.70588L22.4118 0.529412C21.4118 0.176471 20.3529 0 19.2353 0C16.8824 0 15.1765 1.29412 15.1765 3.17647C15.1765 5.58824 18.3529 5.70588 18.3529 6.94118C18.3529 7.35294 17.8824 7.76471 16.9412 7.76471C15.8235 7.76471 14.8824 7.41177 13.8824 6.94118L13.5294 9.17647C14.5882 9.64706 15.8235 9.88235 17.1176 9.88235C19.6471 10 21.5294 8.70588 21.5294 6.35294Z" fill="#1434CB"/>
      <path d="M28.4118 0.176465H25.5882C24.8824 0.176465 24.3529 0.588235 24.0588 1.23529L19.2353 12.5294H22.7647L23.4706 10.5882H27.7647L28.1765 12.5294H31.3529L28.4118 0.176465ZM24.4118 8.11765L25.5882 4.88235L26.2353 8.11765H24.4118Z" fill="#1434CB"/>
      <path d="M14.5294 0.176465H11.2353L10.2353 9.17647H13.5294L14.5294 0.176465Z" fill="#F7B600"/>
    </svg>

    {/* Mastercard */}
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-auto">
      <circle cx="7" cy="7" r="7" fill="#EB001B"/>
      <circle cx="15" cy="7" r="7" fill="#F79E1B"/>
      <path d="M11 2.22217C12.1932 3.40794 12.9167 5.04414 12.9167 6.85179C12.9167 8.65945 12.1932 10.2956 11 11.4814C9.80682 10.2956 9.08333 8.65945 9.08333 6.85179C9.08333 5.04414 9.80682 3.40794 11 2.22217Z" fill="#FF5F00"/>
    </svg>

    {/* Elo */}
    <svg width="28" height="12" viewBox="0 0 54 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-auto">
      <circle cx="10" cy="10" r="8" fill="#E61C23"/>
      <circle cx="27" cy="10" r="8" fill="#F9CF09"/>
      <circle cx="44" cy="10" r="8" fill="#00A0E3"/>
    </svg>

    {/* Hipercard */}
    <div className="bg-[#B81F25] px-1 py-0.5 rounded-[2px] h-3.5 flex items-center shadow-sm">
      <span className="text-[7px] font-black text-white leading-none tracking-tighter italic">Hipercard</span>
    </div>

    {/* Pix */}
    <svg width="14" height="14" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-auto">
      <path d="M363.8 54.2c-15.5-15.5-40.7-15.5-56.2 0l-45.7 45.7c-3.1 3.1-8.1 3.1-11.2 0l-45.7-45.7c-15.5-15.5-40.7-15.5-56.2 0l-94.6 94.6c-15.5 15.5-15.5 40.7 0 56.2l45.7 45.7c3.1 3.1 3.1 8.1 0 11.2l-45.7 45.7c-15.5 15.5-15.5 40.7 0 56.2l94.6 94.6c15.5 15.5 40.7 15.5 56.2 0l45.7-45.7c3.1-3.1 8.1-3.1 11.2 0l45.7 45.7c15.5 15.5 40.7 15.5 56.2 0l94.6-94.6c15.5-15.5 15.5-40.7 0-56.2l-45.7-45.7c-3.1-3.1-3.1-8.1 0-11.2l45.7-45.7c15.5-15.5 15.5-40.7 0-56.2l-94.6-94.6zM256 210c25.4 0 46 20.6 46 46s-20.6 46-46 46-46-20.6-46-46 20.6-46 46-46z" fill="#32BCAD"/>
    </svg>
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
          
          <div className="mb-10">
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

          {/* Processos Visuais de Atenção */}
          <div className="space-y-4">
            <h4 className="text-zinc-500 font-black text-[9px] uppercase tracking-[0.4em] mb-4">Próximos Passos:</h4>
            
            <div className="grid gap-3">
              {/* Passo 1 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group/step">
                <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center border border-purple-500/20 text-xl">
                  👑
                </div>
                <div>
                  <div className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-0.5">Passo 01</div>
                  <div className="text-sm font-bold text-white uppercase tracking-tight">Adquirir Plano Basic</div>
                </div>
                <ShoppingBag className="w-4 h-4 text-zinc-700 ml-auto group-hover/step:text-purple-500 transition-colors" />
              </div>

              {/* Passo 2 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group/step">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center border border-emerald-500/20 text-xl">
                  📧
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-0.5">Passo 02</div>
                  <div className="text-sm font-bold text-white uppercase tracking-tight">Já paguei — Preencher cadastro</div>
                </div>
                <FileText className="w-4 h-4 text-zinc-700 ml-auto group-hover/step:text-emerald-500 transition-colors" />
              </div>

              {/* Passo 3 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group/step">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 text-xl">
                  🐻
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-0.5">Passo 03</div>
                  <div className="text-xs font-bold text-white uppercase tracking-tight leading-snug">
                    Abrir Ticket (/start) : <span className="text-zinc-400 font-medium">enviando o comprovante e/ou utilizar o ajuste de treino.</span>
                  </div>
                </div>
                <MessageSquare className="w-4 h-4 text-zinc-700 ml-auto group-hover/step:text-blue-500 transition-colors" />
              </div>
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
          
          {/* Checkout Info / InfinityPay Styliing */}
          <div className="mt-8 flex flex-col items-center gap-4 bg-zinc-900/40 p-5 rounded-3xl border border-white/5 w-full max-w-sm shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Lock className="w-3 h-3 text-emerald-500/60" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Pagamento Seguro via InfinityPay</span>
              </div>
              <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.05em] leading-relaxed text-center opacity-80 max-w-[240px]">
                Aceitamos as principais bandeiras e PIX.
              </p>
            </div>
            
            <PaymentIcons />
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
