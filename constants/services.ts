import { Rocket, Layers, type LucideIcon } from 'lucide-react';

export type LocalizedText = { tr: string; en: string };

export type Service = {
  title: LocalizedText;
  description: LocalizedText;
  href: string;
  icon: LucideIcon;
  eyebrow?: LocalizedText;
};

// Yeni hizmet eklemek için bu listeye bir obje eklemek yeterli — hem
// /hizmetler index sayfası hem /hizmetler/eticaret-dijitallesme içindeki
// kart grid'i otomatik güncellenir.
export const services: Service[] = [
  {
    title: {
      tr: 'E-ticaret Sitesi Kurma',
      en: 'E-commerce Site Build',
    },
    description: {
      tr: 'İşletmenize özel platform seçimi, tasarım, ERP/pazaryeri entegrasyonu, Trendyol mağaza yönetimi ve dönüşüm optimizasyonuyla uçtan uca e-ticaret kurulumu ve danışmanlığı.',
      en: 'End-to-end e-commerce setup and consulting tailored to your business: platform selection, design, ERP and marketplace integration, Trendyol storefront management and conversion optimization.',
    },
    href: '/hizmetler/e-ticaret-sitesi-kurma',
    icon: Rocket,
    eyebrow: { tr: 'Yeni', en: 'New' },
  },
  {
    title: {
      tr: 'E-ticaret & Dijital Dönüşüm',
      en: 'E-commerce & Digital Transformation',
    },
    description: {
      tr: 'Yüksek trafikli kurumsal e-ticaret operasyonları için ERP, CRM, OMS, WMS entegrasyonu, pazaryeri orkestrasyonu ve uçtan uca proje yönetimi. 100+ kurumsal proje deneyimi.',
      en: 'ERP, CRM, OMS and WMS integration, marketplace orchestration and end-to-end project management for high-traffic enterprise e-commerce operations. 100+ enterprise projects delivered.',
    },
    href: '/hizmetler',
    icon: Layers,
  },
];
