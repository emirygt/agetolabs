import { ReactNode } from 'react';

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
    description: 'Etkinlik ve içerik ekipleri için yapay zeka destekli content studio',
    descriptionTr: 'Etkinlik ve içerik ekipleri için yapay zeka destekli content studio',
    icon: 'PenTool',
    iconColor: 'text-purple-400',
    glow: 'none',
  },
  {
    id: 'pharm-ia-top',
    name: 'Pharma AI',
    nameTr: 'Pharma AI',
    slug: 'agento-pharm-ia',
    description: 'İlaç ve takviye gıda odaklı yapay zeka platformu. Metin üretir, görsel oluşturur, ürünleri analiz eder.',
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
    name: 'Otonom Ajan',
    nameTr: 'Otonom Ajan',
    slug: 'agento-otonom-agent',
    description: 'E-Ticaretiniz İçin 7/24 Çalışan Otonom Yapay Zeka Dijital Pazarlama Uzmanınız.',
    descriptionTr: 'E-Ticaretiniz İçin 7/24 Çalışan Otonom Yapay Zeka Dijital Pazarlama Uzmanınız.',
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
    description: 'Eczaneler için ortak alım, takas, sevkiyat ve güven odaklı B2B operasyon platformu.',
    descriptionTr: 'Eczaneler için ortak alım, takas, sevkiyat ve güven odaklı B2B operasyon platformu.',
    icon: 'Store',
    iconColor: 'text-purple-400',
    glow: 'none',
    secondaryIcon: 'Pill',
    secondaryIconColor: 'text-[#8EF0B5]',
  },
  {
    id: 'whatsapp-satis',
    name: 'WhatsApp Satış Otomasyonu',
    nameTr: 'WhatsApp Satış Otomasyonu',
    slug: 'agento-wh-sales',
    description: 'Müşteri mesajlarını anlayan, ürün öneren ve sipariş toplayan akıllı satış altyapısı.',
    descriptionTr: 'Müşteri mesajlarını anlayan, ürün öneren ve sipariş toplayan akıllı satış altyapısı.',
    icon: 'MessageCircle',
    iconColor: 'text-[#8EF0B5]',
    glow: 'green',
  },
];

