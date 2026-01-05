
export interface Plan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  isFeatured: boolean;
  cta: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  image: string;
  text: string;
  tag: string;
}

export interface ConsultancyStep {
  num: string;
  title: string;
  description: string;
  items: string[];
  extra?: string;
}
