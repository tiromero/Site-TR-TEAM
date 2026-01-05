
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
    description: 'Este é o mais completo e com maior desconto para um trabalho totalmente específico e otimizado a longo prazo.',
    features: [
      'BENEFÍCIOS DE TODOS OS PACOTES',
      'O MELHOR EM CUSTO BENEFÍCIO',
      'FEEDBACKS ESPECÍFICOS DE ACORDO COM OS OBJETIVOS PROPOSTOS'
    ],
    isFeatured: false,
    cta: 'Assinar Plano Anual'
  }
];

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
    name: "Juliana Silva",
    image: "https://picsum.photos/seed/juli/200/200",
    text: "A consultoria tem sido incrível! Você dá todo o apoio e suporte necessário independente da hora do dia. Tenho conseguido muitos resultados e me sinto melhor em todos os aspectos.",
    tag: "Emagrecimento"
  },
  {
    name: "Carlos Mendes",
    image: "https://picsum.photos/seed/carlos/200/200",
    text: "Bom dia mestre! Tudo bem? Só compartilhando um resultado muito massa... iniciei com 132.8kg, agora estou com 120kg! Valeu demais!",
    tag: "Hipertrofia"
  },
  {
    name: "Renata Costa",
    image: "https://picsum.photos/seed/renata/200/200",
    text: "O projeto tem dado super certo. Estou bem satisfeita com a consultoria e acesso dos guias e app. O trabalho realizado por ele tem dado super certo e está garantindo o alcance dos objetivos.",
    tag: "Saúde"
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
