export type GlowType = 'purple' | 'green' | 'none';

export interface Product {
  id: string;
  name: string;
  nameTr?: string;
  slug: string;
  description: string;
  descriptionTr?: string;
  icon: string;
  iconColor: string;
  glow: GlowType;
  secondaryIcon?: string;
  secondaryIconColor?: string;
}

export const topCards: Product[] = [
  {
    id: 'struct-ia-top',
    name: 'Structa AI',
    nameTr: 'Structa AI',
    slug: 'agento-struct-editor',
    description: 'AI-powered content studio for event and content teams.',
    descriptionTr: 'Etkinlik ve içerik ekipleri için yapay zeka destekli content studio.',
    icon: 'PenTool',
    iconColor: 'text-purple-400',
    glow: 'none',
  },
  {
    id: 'pharm-ia-top',
    name: 'Pharma AI',
    nameTr: 'Pharma AI',
    slug: 'agento-pharm-ia',
    description: 'AI platform focused on pharmaceuticals and supplements. Generates copy, creates visuals, analyzes products.',
    descriptionTr: 'İlaç ve takviye gıda odaklı yapay zeka platformu. Metin üretir, görsel oluşturur, ürünleri analiz eder.',
    icon: 'FlaskConical',
    iconColor: 'text-[#8EF0B5]',
    glow: 'green',
  },
  {
    id: 'nexus-flow',
    name: 'Agento company Flow',
    nameTr: 'Agento Şirket Akışı',
    slug: 'agento-company-flow',
    description: 'Enterprise Agent Orchestration',
    descriptionTr: 'Kurumsal Ajan Orkestrasyonu',
    icon: 'Waypoints',
    iconColor: 'text-purple-400',
    glow: 'none',
  },
  {
    id: 'price-compare',
    name: 'Agento priceCompare',
    nameTr: 'Agento Fiyat Karşılaştırma',
    slug: 'agento-price-compare',
    description: 'Real-time Price Intelligence',
    descriptionTr: 'Gerçek Zamanlı Fiyat Zekası',
    icon: 'Search',
    iconColor: 'text-[#8EF0B5]',
    glow: 'none',
  },
];

export const bottomCards: Product[] = [
  {
    id: 'otonom-agent',
    name: 'Autonomous Agent',
    nameTr: 'Autonomous Agent',
    slug: 'agento-otonom-agent',
    description: 'Your 24/7 autonomous AI digital marketing expert for e-commerce.',
    descriptionTr: 'E-ticaretiniz için 7/24 çalışan otonom yapay zeka dijital pazarlama uzmanınız.',
    icon: 'Bot',
    iconColor: 'text-orange-400',
    glow: 'none',
    secondaryIcon: 'TrendingUp',
    secondaryIconColor: 'text-orange-500',
  },
  {
    id: 'eczatrend',
    name: 'Eczaport',
    nameTr: 'Eczaport',
    slug: 'agento-eczaport',
    description: 'B2B operations platform for pharmacies: joint purchasing, swaps, shipping and trust.',
    descriptionTr: 'Eczaneler için ortak alım, takas, sevkiyat ve güven odaklı B2B operasyon platformu.',
    icon: 'Store',
    iconColor: 'text-purple-400',
    glow: 'none',
    secondaryIcon: 'Pill',
    secondaryIconColor: 'text-[#8EF0B5]',
  },
  {
    id: 'whatsapp-satis',
    name: 'WhatsApp Sales Automation',
    nameTr: 'WhatsApp Sales Automation',
    slug: 'agento-wh-sales',
    description: 'Smart sales infrastructure that understands customer messages, recommends products, and captures orders.',
    descriptionTr: 'Müşteri mesajlarını anlayan, ürün öneren ve sipariş toplayan akıllı satış altyapısı.',
    icon: 'MessageCircle',
    iconColor: 'text-[#8EF0B5]',
    glow: 'green',
  },
];
