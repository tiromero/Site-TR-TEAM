import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  Sparkles, 
  X, 
  Send, 
  MessageCircle, 
  Shield, 
  AlertCircle,
  Dumbbell,
  Clock,
  Target,
  UserCheck,
  ChevronDown
} from 'lucide-react';

interface CountryOption {
  code: string;
  flag: string;
  name: string;
  placeholder: string;
}

const COUNTRIES: CountryOption[] = [
  { code: '+55', flag: '🇧🇷', name: 'Brasil (+55)', placeholder: '(11) 98765-4321' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal (+351)', placeholder: '912 345 678' },
  { code: '+1', flag: '🇺🇸', name: 'EUA / Canadá (+1)', placeholder: '(555) 123-4567' },
  { code: '+34', flag: '🇪🇸', name: 'Espanha (+34)', placeholder: '612 34 56 78' },
  { code: '+44', flag: '🇬🇧', name: 'Reino Unido (+44)', placeholder: '7911 123456' },
  { code: '+353', flag: '🇮🇪', name: 'Irlanda (+353)', placeholder: '85 123 4567' },
  { code: '+39', flag: '🇮🇹', name: 'Itália (+39)', placeholder: '312 345 6789' },
  { code: '+49', flag: '🇩🇪', name: 'Alemanha (+49)', placeholder: '151 12345678' },
  { code: '+41', flag: '🇨🇭', name: 'Suíça (+41)', placeholder: '78 123 45 67' },
  { code: '+33', flag: '🇫🇷', name: 'França (+33)', placeholder: '6 12 34 56 78' },
  { code: '+595', flag: '🇵🇾', name: 'Paraguai (+595)', placeholder: '981 123456' },
  { code: '+81', flag: '🇯🇵', name: 'Japão (+81)', placeholder: '90 1234 5678' },
  { code: '+61', flag: '🇦🇺', name: 'Austrália (+61)', placeholder: '412 345 678' },
  { code: 'other', flag: '🌐', name: 'Outro País', placeholder: 'Número completo' },
];

export const DEFAULT_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVlXXY3ecWCIwk2NEPesHkYEGTHadgIuPpKu6xOTUTdggN0yiUy59iCUbT7REmkG7c/exec";

export interface LeadQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  appsScriptUrl?: string;
}

interface QuizState {
  faixa_etaria: string;
  tempo_treino: string;
  sentimento_fisico: string;
  motivacao: string;
  objetivo: string;
  investimento_consultoria: string;
  acompanhamento_previo: string;
  impedimento: string;
  investimento_mensal: string;
  momento: string;
  fator_decisao: string;
  nome: string;
  celular: string;
  instagram: string;
  lgpd_consent: boolean;
}

const INITIAL_STATE: QuizState = {
  faixa_etaria: '',
  tempo_treino: '',
  sentimento_fisico: '',
  motivacao: '',
  objetivo: '',
  investimento_consultoria: '',
  acompanhamento_previo: '',
  impedimento: '',
  investimento_mensal: '',
  momento: '',
  fator_decisao: '',
  nome: '',
  celular: '',
  instagram: '',
  lgpd_consent: false,
};

interface QuestionDef {
  key: keyof QuizState;
  title: string;
  subtitle?: string;
  isMultiple?: boolean;
  options: {
    letter: string;
    text: string;
    isExclusive?: boolean; // usado na opção "Não uso suplemento algum"
  }[];
}

const QUESTIONS: QuestionDef[] = [
  {
    key: 'faixa_etaria',
    title: 'Qual a sua faixa etária?',
    options: [
      { letter: 'A', text: 'Menor de 18 anos' },
      { letter: 'B', text: '18 a 20 anos' },
      { letter: 'C', text: '21 a 24 anos' },
      { letter: 'D', text: '25 a 29 anos' },
      { letter: 'E', text: '30 anos ou mais' }
    ]
  },
  {
    key: 'tempo_treino',
    title: 'Há quanto tempo você treina musculação?',
    options: [
      { letter: 'A', text: '6 meses a 1 ano' },
      { letter: 'B', text: '1 a 2 anos' },
      { letter: 'C', text: '2 a 3 anos' },
      { letter: 'D', text: '3 a 5 anos' },
      { letter: 'E', text: 'Mais de 5 anos' }
    ]
  },
  {
    key: 'sentimento_fisico',
    title: 'Como você se sente em relação ao seu físico hoje?',
    options: [
      { letter: 'A', text: 'Satisfeito com os resultados que obtive' },
      { letter: 'B', text: 'Um pouco insatisfeito. Está bom, mas poderia estar melhor' },
      { letter: 'C', text: 'Frustrado com os resultados. Sinto que deveria estar melhor pelo esforço que faço' },
      { letter: 'D', text: 'Muito frustrado / travado / estagnado' }
    ]
  },
  {
    key: 'motivacao',
    title: 'O que mais te motivou a tomar a decisão de buscar ajuda profissional?',
    options: [
      { letter: 'A', text: 'Quero melhorar aos poucos os meus resultados' },
      { letter: 'B', text: 'Quero entender melhor o processo e aprender com vocês' },
      { letter: 'C', text: 'Quero acelerar meus resultados' },
      { letter: 'D', text: 'Cansei de tentar sozinho e quero resolver isso de vez' }
    ]
  },
  {
    key: 'objetivo',
    title: 'Qual o seu principal objetivo hoje?',
    options: [
      { letter: 'A', text: 'Perder gordura' },
      { letter: 'B', text: 'Ganhar massa muscular' },
      { letter: 'C', text: 'Perder gordura e ganhar massa muscular' },
      { letter: 'D', text: 'Competir no fisiculturismo' }
    ]
  },
  {
    key: 'investimento_consultoria',
    title: 'Pensando nos seus objetivos e na velocidade que deseja alcançá-los, qual padrão de acompanhamento faz mais sentido para você hoje?',
    subtitle: 'Isso nos permite estruturar a estratégia exata e o nível de proximidade ideal para a sua rotina',
    options: [
      { letter: 'A', text: 'Orientação essencial: apenas um direcionamento inicial para eu seguir por conta própria' },
      { letter: 'B', text: 'Planejamento estruturado: protocolo bem desenhado para seguir com clareza e autonomia orientada' },
      { letter: 'C', text: 'Acompanhamento próximo: análises detalhadas em vídeo, correções técnicas e suporte direto para acelerar meus resultados' },
      { letter: 'D', text: 'Transformação definitiva com atenção máxima: acompanhamento de ponta a ponta, sem intermediários, focado no resultado mais rápido e seguro' }
    ]
  },
  {
    key: 'acompanhamento_previo',
    title: 'Você já teve acompanhamento com treinador ou nutricionista?',
    options: [
      { letter: 'A', text: 'Nunca segui nada estruturado' },
      { letter: 'B', text: 'Já tentei montar por conta própria com base no meu conhecimento' },
      { letter: 'C', text: 'Já segui treinos ou dietas da internet (YouTube, Instagram, etc)' },
      { letter: 'D', text: 'Já tive acompanhamento profissional' },
      { letter: 'E', text: 'Já tive mais de um acompanhamento profissional' }
    ]
  },
  {
    key: 'impedimento',
    title: 'O que você acredita que está te impedindo de evoluir hoje?',
    options: [
      { letter: 'A', text: 'Falta de consistência na dieta e/ou treino' },
      { letter: 'B', text: 'Não sei estruturar treino/dieta de forma eficiente' },
      { letter: 'C', text: 'Já tentei algumas estratégias sozinho, mas não tive os resultados que queria' },
      { letter: 'D', text: 'Não evoluo há bastante tempo, mesmo tentando' }
    ]
  },
  {
    key: 'investimento_mensal',
    title: 'Hoje, considerando academia, alimentação e suplementação, quanto você acredita investir em média por mês?',
    subtitle: 'não influencia no valor da consultoria, é apenas para entendermos seu contexto',
    options: [
      { letter: 'A', text: 'Menos de R$200,00' },
      { letter: 'B', text: 'R$200 - R$400,00' },
      { letter: 'C', text: 'R$400 - R$600,00' },
      { letter: 'D', text: 'R$600 - R$900,00' },
      { letter: 'E', text: 'Mais de R$900,00' }
    ]
  },
  {
    key: 'momento',
    title: 'Em qual momento você se encontra hoje em relação a buscar ajuda profissional para evoluir?',
    options: [
      { letter: 'A', text: 'Ainda estou pesquisando e entendendo melhor meu caso' },
      { letter: 'B', text: 'Tenho interesse, mas não sei se agora é o momento' },
      { letter: 'C', text: 'Quero resolver isso em breve, estou avaliando opções' },
      { letter: 'D', text: 'Quero começar o quanto antes!' }
    ]
  },
  {
    key: 'fator_decisao',
    title: 'Olhando para o seu momento atual, o que mais pesou na sua decisão de buscar ajuda agora?',
    options: [
      { letter: 'A', text: 'Gostaria de melhorar a aparência atual' },
      { letter: 'B', text: 'Não vê o resultado que eu esperava pelo esforço' },
      { letter: 'C', text: 'Sente que poderia estar melhor pelo tempo que já treina' },
      { letter: 'D', text: 'Não sabe exatamente o que está fazendo e não quer mais ter essa preocupação' }
    ]
  }
];

// Formatação brasileira de celular: (XX) XXXXX-XXXX
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) {
    return digits.length > 0 ? `(${digits}` : '';
  }
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

// Normalização do Instagram: garante '@' no início e remove espaços
function normalizeInstagram(value: string): string {
  const trimmed = value.trim().replace(/^@+/, '');
  return trimmed ? `@${trimmed}` : '';
}

export const LeadQuizModal: React.FC<LeadQuizModalProps> = ({
  isOpen,
  onClose,
  appsScriptUrl = DEFAULT_APPS_SCRIPT_URL
}) => {
  // Telas:
  // 0: Boas-vindas
  // 1 a 11: Perguntas
  // 12: Dados de Contato
  // 13: Agradecimento / Sucesso
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<QuizState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string>('+55');
  const [customDdi, setCustomDdi] = useState<string>('+');

  // Travar o scroll da página principal enquanto o modal do quiz estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Teclado para acessibilidade: ESC para fechar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalSteps = QUESTIONS.length + 2; // Boas-vindas (0) + 11 perguntas + Contato (12)
  const currentProgressPercent = Math.min(100, Math.round((step / (totalSteps - 1)) * 100));

  // Validação da etapa atual para habilitar o botão OK
  const isCurrentStepValid = (): boolean => {
    if (step === 0) return true;
    if (step >= 1 && step <= QUESTIONS.length) {
      const q = QUESTIONS[step - 1];
      const val = answers[q.key];
      if (Array.isArray(val)) {
        return val.length > 0;
      }
      return typeof val === 'string' && val.trim().length > 0;
    }
    if (step === QUESTIONS.length + 1) {
      // Tela de Contato
      const cleanPhone = answers.celular.replace(/\D/g, '');
      const validPhone = countryCode === '+55' 
        ? (cleanPhone.length >= 10 && cleanPhone.length <= 11)
        : (countryCode === 'other'
            ? (cleanPhone.length >= 6 && customDdi.replace(/\D/g, '').length >= 1)
            : cleanPhone.length >= 6);
      const validName = answers.nome.trim().length >= 3;
      const validInsta = answers.instagram.trim().length >= 2;
      return validName && validPhone && validInsta && answers.lgpd_consent;
    }
    return true;
  };

  // Manipular clique em opção de pergunta
  const handleSelectOption = (optionText: string) => {
    if (step < 1 || step > QUESTIONS.length) return;
    const currentQ = QUESTIONS[step - 1];

    setAnswers(prev => ({
      ...prev,
      [currentQ.key]: optionText
    }));

    // Avanço automático suave para perguntas de resposta única
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 220);
  };

  // Botão Avançar / OK
  const handleNext = () => {
    if (!isCurrentStepValid()) return;
    if (step === QUESTIONS.length + 1) {
      handleSubmit();
    } else {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  // Botão Voltar
  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
      setSubmitError(null);
    }
  };

  // Envio dos dados via POST para o Google Apps Script
  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    // Formatação de data/hora no padrão brasileiro
    const now = new Date();
    const dataHoraFormatada = now.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const finalDdi = countryCode === 'other'
      ? (customDdi.trim().startsWith('+') ? customDdi.trim() : `+${customDdi.trim()}`)
      : countryCode;

    // Payload unificado para a Consultoria TR TEAM (Sem distinção de pacotes)
    const payload = {
      data_hora: dataHoraFormatada,
      faixa_etaria: answers.faixa_etaria,
      tempo_treino: answers.tempo_treino,
      sentimento_fisico: answers.sentimento_fisico,
      motivacao: answers.motivacao,
      objetivo: answers.objetivo,
      investimento_consultoria: answers.investimento_consultoria,
      acompanhamento_previo: answers.acompanhamento_previo,
      impedimento: answers.impedimento,
      investimento_mensal: answers.investimento_mensal,
      momento: answers.momento,
      fator_decisao: answers.fator_decisao,
      nome: answers.nome.trim(),
      // O apóstrofo inicial ' força o Google Sheets e Excel a tratarem o telefone como texto puro, evitando o erro #ERROR! causado pelo sinal de +
      celular: `'${finalDdi} ${answers.celular.trim()}`,
      instagram: normalizeInstagram(answers.instagram),
      origem: typeof window !== 'undefined' ? window.location.href : 'Site Direto',
      tipo_aplicacao: 'Consultoria Online TR TEAM'
    };

    try {
      // Salva cópia local de segurança no navegador
      try {
        const stored = JSON.parse(localStorage.getItem('tr_leads_offline') || '[]');
        stored.push(payload);
        localStorage.setItem('tr_leads_offline', JSON.stringify(stored));
      } catch {
        // ignora erros de localStorage
      }

      // Envia via POST com mode no-cors e Content-Type text/plain (requisito do Google Apps Script)
      if (appsScriptUrl && !appsScriptUrl.includes('_SEU_ID_DO_APPS_SCRIPT_AQUI')) {
        await fetch(appsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });
      } else {
        // Se a URL do script ainda for o placeholder, simula tempo com sucesso
        await new Promise(res => setTimeout(res, 600));
      }

      // Avança para tela de sucesso
      setStep(QUESTIONS.length + 2);
    } catch (err: unknown) {
      console.error('Erro ao enviar aplicação:', err);
      setSubmitError('Ocorreu uma instabilidade na conexão, mas você pode tentar novamente ou falar diretamente conosco.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = step >= 1 && step <= QUESTIONS.length ? QUESTIONS[step - 1] : null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col bg-[#070707] text-white selection:bg-purple-500/30 font-['Saira',sans-serif] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-heading"
    >
      {/* Importação da fonte moderna Saira */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap');
        
        .quiz-purple-tech-bg {
          background-color: #070707;
          background-image: 
            radial-gradient(at 100% 0%, rgba(124, 58, 237, 0.14) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(91, 33, 182, 0.16) 0px, transparent 50%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
        }
      `}</style>

      {/* Barra de Progresso Fina no Topo: Roxo Oficial (#7c3aed / purple-600) */}
      {step > 0 && step <= QUESTIONS.length + 1 && (
        <div className="w-full bg-white/10 h-1.5 fixed top-0 left-0 right-0 z-50">
          <motion.div 
            className="h-full bg-purple-600 transition-all duration-300 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
            style={{ width: `${currentProgressPercent}%` }}
          />
        </div>
      )}

      {/* Cabeçalho Minimalista com Botão Fechar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Dumbbell className="w-4 h-4" />
          </div>
          <span className="text-xs font-black tracking-widest uppercase text-white/90">
            TR <span className="text-purple-400">TEAM</span> • APLICAÇÃO OFICIAL
          </span>
        </div>

        <button 
          onClick={onClose}
          aria-label="Fechar formulário"
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* Conteúdo Central Responsivo Mobile-First com Estilo Oficial do Site */}
      <main className="flex-1 overflow-y-auto quiz-purple-tech-bg flex items-center justify-center px-5 py-8 md:py-12">
        <div className="w-full max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* TELA 1: Boas-vindas da Aplicação Única */}
            {step === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-center flex flex-col items-center"
              >
                {/* Logo da Marca */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-zinc-950 border-2 border-purple-500 flex items-center justify-center shadow-[0_0_35px_rgba(168,85,247,0.35)]">
                    <span className="font-heading font-black text-2xl tracking-tighter text-white">
                      TR<span className="text-purple-500">.</span>
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-md">
                    EXCLUSIVO
                  </div>
                </div>

                {/* Nome da Marca */}
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-purple-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  TR TEAM • Consultoria & Treinamento
                </span>

                <h1 id="quiz-heading" className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                  QUALIFICAÇÃO & <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400">
                    LISTA DE ESPERA
                  </span>
                </h1>

                <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md mb-8 font-medium">
                  Cada pessoa possui rotina, histórico de treino e demandas singulares. Esta rápida qualificação serve para entender o seu momento e certificar que suas prioridades convergem com a nossa metodologia. Como cada planejamento e análise em vídeo é realizado pessoalmente pelo Tiromero, a admissão ocorre através da nossa lista de qualificação e espera.
                </p>

                {/* Destaques do Processo de Admissão */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-8 text-left">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-black uppercase tracking-wider mb-1">
                      <Target className="w-3.5 h-3.5" />
                      Individualidade Real
                    </div>
                    <p className="text-[11px] text-zinc-400 font-medium">Diagnóstico de momento, rotina e histórico motor</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-2 text-purple-300 text-xs font-black uppercase tracking-wider mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      Acompanhamento Pessoal
                    </div>
                    <p className="text-[11px] text-zinc-400 font-medium">Análises detalhadas em vídeo e suporte direto</p>
                  </div>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-10 py-5 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-black text-base uppercase tracking-widest rounded-2xl shadow-[0_10px_35px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-3 group border border-purple-400/30 cursor-pointer"
                >
                  Entrar na Lista de Qualificação
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="mt-8 flex items-center justify-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  Triagem Técnica • Lista de Espera & Avaliação de Perfil
                </div>
              </motion.div>
            )}

            {/* TELAS 2 A 12: Perguntas do Quiz */}
            {currentQ && (
              <motion.div
                key={`question-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                {/* Contador de Etapa */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-400">
                    PERGUNTA {step} DE {QUESTIONS.length}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                    Obrigatória *
                  </span>
                </div>

                {/* Título da Pergunta */}
                <h2 className="text-xl md:text-2xl font-black text-white leading-snug tracking-tight mb-2">
                  {currentQ.title} <span className="text-purple-400">*</span>
                </h2>

                {/* Subtítulo (se houver) */}
                {currentQ.subtitle && (
                  <p className={`text-xs md:text-sm mb-6 ${currentQ.key === 'investimento_mensal' ? 'italic text-zinc-400' : 'text-purple-300 font-semibold'}`}>
                    {currentQ.subtitle}
                  </p>
                )}

                {/* Lista de Opções */}
                <div className="space-y-3 mt-6">
                  {currentQ.options.map((opt) => {
                    const currentVal = answers[currentQ.key];
                    const isSelected = Array.isArray(currentVal)
                      ? currentVal.includes(opt.text)
                      : currentVal === opt.text;

                    return (
                      <button
                        key={opt.letter}
                        type="button"
                        onClick={() => handleSelectOption(opt.text)}
                        className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-200 flex items-center gap-4 group relative cursor-pointer ${
                          isSelected
                            ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.25)] ring-1 ring-purple-500'
                            : 'bg-[#0e0e0e]/90 border-white/10 hover:border-purple-500/50 hover:bg-zinc-900/60'
                        }`}
                      >
                        {/* Quadradinho da Letra */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm uppercase transition-all shrink-0 ${
                            isSelected
                              ? 'bg-purple-600 text-white shadow-md shadow-purple-950'
                              : 'bg-white/5 text-zinc-400 border border-white/10 group-hover:border-purple-500/40 group-hover:text-white'
                          }`}
                        >
                          {isSelected && currentQ.isMultiple ? (
                            <Check className="w-5 h-5 stroke-[3]" />
                          ) : (
                            opt.letter
                          )}
                        </div>

                        {/* Texto da Opção */}
                        <span className={`text-sm md:text-base font-semibold leading-snug flex-1 ${
                          isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                        }`}>
                          {opt.text}
                        </span>

                        {isSelected && !currentQ.isMultiple && (
                          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* TELA DE CONTATO (Última etapa) */}
            {step === QUESTIONS.length + 1 && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-400">
                    ETAPA FINAL • CONTATO
                  </span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                    Campos obrigatórios *
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                  Quais suas informações para contato? <span className="text-purple-400">*</span>
                </h2>

                <p className="text-zinc-400 text-xs md:text-sm mb-8">
                  Preencha os campos abaixo para que possamos analisar sua aplicação e entrar em contato.
                </p>

                {submitError && (
                  <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Nome Completo */}
                  <div>
                    <label htmlFor="lead-name" className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      placeholder="Ex: João Silva"
                      value={answers.nome}
                      onChange={(e) => setAnswers(prev => ({ ...prev, nome: e.target.value }))}
                      className="w-full bg-transparent text-white placeholder:text-zinc-600 px-2 py-3 text-base border-b-2 border-white/20 focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Celular com DDD / DDI e Seletor Internacional de País */}
                  <div>
                    <label htmlFor="lead-phone" className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                      WhatsApp / Celular com Código de Área *
                    </label>
                    <div className="flex items-center gap-2 border-b-2 border-white/20 focus-within:border-purple-500 transition-colors pb-1">
                      {/* Seletor Internacional com Bandeiras */}
                      <div className="relative shrink-0 flex items-center">
                        <select
                          value={countryCode}
                          onChange={(e) => {
                            const newCode = e.target.value;
                            setCountryCode(newCode);
                            setAnswers(prev => ({ ...prev, celular: '' }));
                          }}
                          aria-label="Código do País (DDI)"
                          className="appearance-none bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl pl-2.5 pr-7 py-2 text-xs font-bold text-white focus:outline-none focus:border-purple-500 cursor-pointer transition-colors"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c.code} value={c.code} className="bg-[#141414] text-white py-1.5">
                              {c.flag} {c.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2 pointer-events-none" />
                      </div>

                      {/* Se selecionar 'Outro País', exibe campo para o DDI customizado */}
                      {countryCode === 'other' && (
                        <input
                          type="text"
                          placeholder="+DDI"
                          value={customDdi}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCustomDdi(val.startsWith('+') ? val : `+${val}`);
                          }}
                          className="w-16 px-2 py-2 bg-white/5 border border-white/15 rounded-xl text-xs font-bold text-white text-center focus:outline-none focus:border-purple-500 shrink-0"
                          title="Digite o DDI do seu país (ex: +351)"
                        />
                      )}

                      {/* Campo do Número de Telefone */}
                      <input
                        id="lead-phone"
                        type="tel"
                        required
                        placeholder={
                          COUNTRIES.find(c => c.code === countryCode)?.placeholder || "(XX) XXXXX-XXXX"
                        }
                        value={answers.celular}
                        onChange={(e) => {
                          const val = e.target.value;
                          const formatted = countryCode === '+55' ? formatPhone(val) : val;
                          setAnswers(prev => ({ ...prev, celular: formatted }));
                        }}
                        className="w-full bg-transparent text-white placeholder:text-zinc-600 py-2 text-base focus:outline-none"
                      />
                    </div>

                    {countryCode !== '+55' && (
                      <p className="text-[11px] text-purple-400/90 mt-1.5 font-medium">
                        🌍 Atendimento internacional disponível para alunos em qualquer país do mundo.
                      </p>
                    )}
                  </div>

                  {/* Instagram com normalização */}
                  <div>
                    <label htmlFor="lead-instagram" className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                      Seu "@" no Instagram *
                    </label>
                    <input
                      id="lead-instagram"
                      type="text"
                      required
                      placeholder="@seuusuario"
                      value={answers.instagram}
                      onChange={(e) => setAnswers(prev => ({ ...prev, instagram: e.target.value }))}
                      onBlur={(e) => setAnswers(prev => ({ ...prev, instagram: normalizeInstagram(e.target.value) }))}
                      className="w-full bg-transparent text-white placeholder:text-zinc-600 px-2 py-3 text-base border-b-2 border-white/20 focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Checkbox de Consentimento LGPD */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        checked={answers.lgpd_consent}
                        onChange={(e) => setAnswers(prev => ({ ...prev, lgpd_consent: e.target.checked }))}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 transition-colors border ${
                        answers.lgpd_consent 
                          ? 'bg-purple-600 border-purple-500 text-white' 
                          : 'bg-white/5 border-white/20 group-hover:border-purple-500/60'
                      }`}>
                        {answers.lgpd_consent && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs text-zinc-400 leading-relaxed">
                        Concordo em ser contatado e com o uso dos meus dados para fins de atendimento.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Botão Enviar */}
                <div className="mt-8">
                  <button
                    type="button"
                    disabled={!isCurrentStepValid() || isSubmitting}
                    onClick={handleSubmit}
                    className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${
                      isCurrentStepValid() && !isSubmitting
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_10px_35px_rgba(124,58,237,0.45)] active:scale-95 cursor-pointer'
                        : 'bg-purple-950/20 text-zinc-600 border border-white/5 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando respostas...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Entrar na Lista de Qualificação
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* TELA DE AGRADECIMENTO / SUCESSO */}
            {step === QUESTIONS.length + 2 && (
              <motion.div
                key="thank-you"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center flex flex-col items-center py-6"
              >
                <div className="w-20 h-20 rounded-full bg-purple-950/40 border-2 border-purple-500 flex items-center justify-center text-purple-400 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-3">
                  <UserCheck className="w-3.5 h-3.5" />
                  Lista de Qualificação & Espera • Análise Individual
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
                  Respostas Registradas com Sucesso!
                </h2>

                <p className="text-zinc-300 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-8">
                  Como o acompanhamento e as correções de movimento em vídeo são conduzidos de forma direta pelo Tiromero, suas respostas já estão cadastradas em nossa Lista de Qualificação & Espera. Avaliaremos com atenção para certificar o alinhamento com nossa metodologia e entraremos em contato via WhatsApp.
                </p>

                {/* Botão de aceleração pelo WhatsApp */}
                <a
                  href={`https://wa.me/5516991135472?text=${encodeURIComponent(`Olá! Acabei de me cadastrar na Lista de Qualificação da Consultoria TR TEAM no site (Nome: ${answers.nome}, Instagram: ${answers.instagram}, Objetivo: ${answers.objetivo}) e gostaria de verificar o andamento da minha solicitação.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-5 bg-purple-600 hover:bg-purple-500 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-[0_10px_35px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center gap-3 border border-purple-400/30 active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Confirmar na Lista pelo WhatsApp
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 text-xs text-zinc-500 hover:text-zinc-300 font-bold uppercase tracking-widest transition-colors py-2 px-4 cursor-pointer"
                >
                  Voltar ao site
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* Rodapé Fixo: Botão Voltar à esquerda e Botão OK à direita */}
      {step >= 1 && step <= QUESTIONS.length && (
        <footer className="relative z-20 px-6 py-4 border-t border-white/5 bg-black/60 backdrop-blur-md flex items-center justify-between">
          {/* Botão Voltar */}
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-bold text-xs uppercase tracking-widest transition-colors border border-white/5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          {/* Botão OK */}
          <button
            type="button"
            disabled={!isCurrentStepValid()}
            onClick={handleNext}
            className={`px-7 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-200 flex items-center gap-2 ${
              isCurrentStepValid()
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer'
                : 'bg-purple-950/20 text-zinc-600 border border-white/5 cursor-not-allowed'
            }`}
          >
            <span>OK</span>
            <Check className="w-4 h-4" />
          </button>
        </footer>
      )}
    </div>
  );
};
