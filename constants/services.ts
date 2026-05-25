import { Rocket, Layers, type LucideIcon } from 'lucide-react';

export type Service = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  eyebrow?: string;
};

// Yeni hizmet eklemek için bu listeye bir obje eklemek yeterli — hem
// /hizmetler index sayfası hem /hizmetler/e-ticaret içindeki kart grid'i
// otomatik güncellenir.
export const services: Service[] = [
  {
    title: 'E-ticaret Sitesi Kurma',
    description:
      'İşletmenize özel platform seçimi, tasarım, ERP/pazaryeri entegrasyonu, Trendyol mağaza yönetimi ve dönüşüm optimizasyonuyla uçtan uca e-ticaret kurulumu ve danışmanlığı.',
    href: '/hizmetler/e-ticaret-sitesi-kurma',
    icon: Rocket,
    eyebrow: 'Yeni',
  },
  {
    title: 'E-ticaret & Dijital Dönüşüm',
    description:
      'Yüksek trafikli kurumsal e-ticaret operasyonları için ERP, CRM, OMS, WMS entegrasyonu, pazaryeri orkestrasyonu ve uçtan uca proje yönetimi. 100+ kurumsal proje deneyimi.',
    href: '/hizmetler/e-ticaret',
    icon: Layers,
  },
];
