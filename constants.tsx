
import { Plan, FAQ, Testimonial, ConsultancyStep } from './types';

export const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'PACOTE MENSAL',
    price: 'R$230',
    description: 'Ideal apenas para quem precisa de orientação pontual.',
    features: [
      'TREINO NO APLICATIVO',
      'SUPORTE VIA WHATSAPP',
      'ANÁLISE E CORREÇÃO DE MOVIMENTO EM VÍDEO',
      'PLANEJAMENTO ESPECÍFICO E INDIVIDUALIZADO'
    ],
    isFeatured: false,
    cta: 'Assinar Plano Mensal'
  },
  {
    id: 'quarterly',
    name: 'PACOTE TRIMESTRAL',
    price: 'R$215',
    originalPrice: 'R$645',
    description: 'Perfeito para uma periodização completa e consolidada dentro do objetivo proposto.',
    features: [
      'BENEFÍCIOS DO MENSAL',
      'FEEDBACKS QUINZENAIS',
      'MATERIAL COMPLEMENTAR',
      'AJUSTES DE PLANEJAMENTO SEMPRE QUE NECESSÁRIO'
    ],
    isFeatured: false,
    cta: 'Assinar Plano Trimestral'
  },
  {
    id: 'semiannual',
    name: 'PACOTE SEMESTRAL',
    price: 'R$200',
    originalPrice: 'R$1200',
    description: 'Excelente para os que desejam um acompanhamento contínuo e completo, com maior nível de suporte.',
    features: [
      'BENEFÍCIOS DO MENSAL/TRIMESTRAL',
      'MATERIAL EXCLUSIVO P/ OTIMIZAÇÃO DE TREINO/DESCANSO/NUTRICIONAL',
      'FEEDBACKS DIÁRIOS A CADA SESSÃO'
    ],
    isFeatured: true,
    cta: 'Assinar Plano Semestral'
  },
  {
    id: 'annual',
    name: 'PACOTE ANUAL',
    price: 'R$185',
    originalPrice: 'R$2220',
    description: 'Confiança e Economia. O mais completo e com maior desconto para um trabalho otimizado a longo prazo.',
    features: [
      'BENEFÍCIOS DE TODOS OS PACOTES',
      'O MELHOR EM CUSTO BENEFÍCIO',
      'FEEDBACKS ESPECÍFICOS DE ACORDO COM OS OBJETIVOS PROPOSTOS'
    ],
    isFeatured: false,
    cta: 'Assinar Plano Anual'
  }
];

export const BASIC_PLAN = {
  name: 'PLANO BASIC',
  description: 'A porta de entrada ideal para sua transformação. Tenha acesso à metodologia TR TEAM com treinos estruturados, sem precisar de um alto investimento inicial.',
  features: [
    'Treino estruturado no app',
    'Direito a 1 ajuste',
    'Plano válido por 3 meses',
    'Acesso ao histórico de progressões e funções de saúde no app'
  ],
  price: 'R$100',
  totalPrice: 'R$300',
  cta: 'ADQUIRIR ACESSO BASIC',
  telegramLink: 'https://t.me/+Nr428kCib6M5ZDEx'
};

export const FAQS: FAQ[] = [
  {
    question: "A consultoria de treino online é tão eficaz quanto um acompanhamento presencial?",
    answer: "É até melhor! O modelo online permite um contato muito mais próximo e frequente, com ajustes e feedbacks constantes via WhatsApp. Diferente do modelo presencial, onde o personal te acompanha apenas durante aquela hora de treino, na consultoria online eu estou com você durante toda a semana. Acompanho sua evolução de perto, ajusto seu plano conforme sua resposta aos estímulos e garanto uma progressão muito mais rápida, segura e eficiente."
  },
  {
    question: "E se eu tiver dificuldades para executar um exercício ou seguir o plano?",
    answer: "Essa é uma preocupação comum e é exatamente por isso que meu acompanhamento é tão próximo. Você terá um canal aberto e direto comigo para tirar qualquer dúvida. Sentiu dificuldade em um exercício? Me envie um vídeo executando o movimento que eu corrijo sua técnica. Precisou mudar a rotina? Ajustamos o treino. Minha prioridade é que você se sinta seguro e motivado para treinar da forma correta e alcançar resultados reais."
  },
  {
    question: "Posso parcelar o pagamento? Quais são as formas disponíveis?",
    answer: "Sim! O pagamento pode ser feito através de cartão de crédito (parcelado em até 12 vezes), PIX ou transferência bancária, através da plataforma InfinityPay, sujeito a taxas de acordo com as parcelas. Se precisar de alguma condição especial, não hesite em entrar em contato para encontrarmos a melhor solução para você iniciar sua jornada."
  },
  {
    question: "Como funciona o acompanhamento se eu treinar em uma academia mais simples ou com poucos equipamentos?",
    answer: "Sem problemas! O plano de treino é 100% personalizado não apenas para o seu corpo, mas também para a sua realidade. Durante nossa avaliação inicial, você me informa quais equipamentos tem à sua disposição (seja em uma academia de ponta, uma academia de condomínio ou mesmo em casa). A partir daí, eu monto o melhor treino possível com os recursos que você tem, garantindo que sua evolução não seja limitada pela estrutura."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Beatriz Oliveira",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Mestre, bati minha meta de 2 meses em 5 semanas! O suporte no WhatsApp faz toda a diferença pra não errar na técnica.",
    tag: "Resultado Rápido"
  },
  {
    name: "Mateus Ferraz",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Treino insano hoje! Comecei com 132kg e hoje bati 118kg. A técnica que você ensina mudou minha forma de treinar. Pra cima!",
    tag: "Hipertrofia"
  },
  {
    name: "Carolina Santos",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Sempre tive preguiça de academia, mas o app e o acompanhamento próximo me mantiveram focada. Resultados visíveis!",
    tag: "Definição"
  },
  {
    name: "Lucas Almeida",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Finalmente aprendi a treinar de verdade. Menos peso e muito mais contração. Meus ombros nunca estiveram tão bons.",
    tag: "Melhoria Técnica"
  },
  {
    name: "Juliana Rocha",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
    text: "A dieta e o treino casaram certinho. Nunca imaginei que poderia comer o que gosto e ainda ver o abdômen aparecendo.",
    tag: "Evolução Real"
  },
  {
    name: "Ricardo Fonseca",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Mano, bati 120kg no agachamento hoje com a execução que você corrigiu no vídeo. Valeu cada centavo da consultoria!",
    tag: "Aumento de Carga"
  },
  {
    name: "Ana Silva",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Tiromero é o melhor! Atencioso demais e os feedbacks no app ajudam muito a manter a constância. Recomendo muito.",
    tag: "Satisfação"
  },
  {
    name: "Felipe Mendes",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Saí do sedentarismo direto pra uma rotina que eu realmente gosto de seguir. O segredo é o planejamento individualizado.",
    tag: "Vida Saudável"
  },
  {
    name: "Elena Martins",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Minha postura melhorou 100% e as dores nas costas sumiram. Treinar com inteligência é outro nível.",
    tag: "Performance"
  }
];

export const CONSULTANCY_STEPS: ConsultancyStep[] = [
  { 
    num: "01", 
    title: "Formulário de Perfil", 
    description: "Personalização completa",
    items: ["Dados pessoais, rotina diária e histórico", "Objetivos específicos (ex: hipertrofia)"], 
    extra: "Isso nos ajuda a criar um plano 100% personalizado!" 
  },
  { 
    num: "02", 
    title: "Confirmação da Compra", 
    description: "Acesso imediato",
    items: ["Pagamento via PIX, Cartão ou Boleto", "Validação rápida e acesso liberado"] 
  },
  { 
    num: "03", 
    title: "Montagem do Protocolo", 
    description: "Estratégia sob medida",
    items: ["Análise de formulário", "Treino periodizado e adaptável", "Estratégia nutricional e metas"] 
  },
  { 
    num: "04", 
    title: "Entrega do Pacote", 
    description: "Tudo pronto para começar",
    items: ["Acesso ao App exclusivo", "Manual e Guias", "Suporte e feedbacks"] 
  }
];
