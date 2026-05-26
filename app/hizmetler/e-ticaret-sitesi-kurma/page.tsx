import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Layers,
  Palette,
  Cable,
  CreditCard,
  Rocket,
  CircleDollarSign,
  Store,
  Sparkles,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StarField } from '@/components/StarField';
import { RobotCompanion } from '@/components/RobotCompanion';
import { FlyingIconsButton } from '@/components/ui/flying-icons-button';

export const metadata: Metadata = {
  title:
    'E-ticaret Sitesi Kurma | Profesyonel E-ticaret Çözümleri — agetolabs',
  description:
    'İşletmenize özel e-ticaret sitesi kurma, entegrasyon ve danışmanlık. ERP/pazaryeri entegrasyonu, Trendyol-Hepsiburada yönetimi. Ücretsiz keşif görüşmesi.',
  alternates: { canonical: '/hizmetler/e-ticaret-sitesi-kurma' },
  openGraph: {
    title: 'E-ticaret Sitesi Kurma — agetolabs',
    description:
      'Strateji, tasarım, ERP ve pazaryeri entegrasyonu, Trendyol mağaza yönetimi: tek elden uçtan uca e-ticaret kurulum ve danışmanlık.',
    url: '/hizmetler/e-ticaret-sitesi-kurma',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-ticaret Sitesi Kurma — agetolabs',
    description:
      'Uçtan uca e-ticaret sitesi kurma ve pazaryeri yönetimi. Trendyol, Hepsiburada, ERP entegrasyonları.',
  },
};

const steps = [
  {
    icon: Layers,
    title: '1. Strateji ve Platform Seçimi',
    body:
      'İş modeliniz, ürün adediniz, hedef pazarınız ve büyüme planınıza göre Shopify, Ticimax, WooCommerce, Magento veya headless commerce gibi platformlardan en uygununu seçeriz. Yanlış platform seçimi, sonradan tüm operasyonu yeniden kurmanıza yol açar — bu yüzden süreç burada başlar.',
  },
  {
    icon: Palette,
    title: '2. Marka ve Dönüşüm Odaklı Tasarım',
    body:
      'Mobil öncelikli, hızlı yüklenen ve dönüşüm odaklı bir arayüz tasarlarız. Sepet terk oranını düşüren ödeme akışları, ürün sayfası şablonları ve marka kimliğinizle uyumlu UI sistemleri hazırlanır.',
  },
  {
    icon: Cable,
    title: '3. Geliştirme ve Entegrasyonlar',
    body:
      'ERP (Logo, Netsis, SAP), CRM, kargo (Yurtiçi, MNG, Aras, UPS), e-fatura, muhasebe ve pazaryeri sistemlerinizle çift yönlü senkronizasyon kurulur. Stok, sipariş, fiyat ve müşteri verisi tek bir kaynaktan akar.',
  },
  {
    icon: CreditCard,
    title: '4. Ödeme, Kargo ve Yasal Altyapı',
    body:
      'iyzico, Param, PayTR, Stripe ve sanal POS sağlayıcılarıyla PCI uyumlu ödeme akışları kurarız. KVKK, mesafeli satış sözleşmeleri, çerez politikası ve aydınlatma metinleri yasal şablonlarla hazır gelir.',
  },
  {
    icon: Rocket,
    title: '5. Yayına Alma ve Sürekli Optimizasyon',
    body:
      'Yayın sonrası GA4, GTM ve Search Console kurulumu, Core Web Vitals optimizasyonu, A/B testleri ve aylık SEO raporları ile mağazanız her ay daha iyi performans verir. Kurulum bitiş değil, başlangıçtır.',
  },
];

const costFactors = [
  {
    title: 'Platform tercihi',
    body:
      'SaaS tabanlı çözümler düşük başlangıç maliyeti ve hızlı kurulum sunarken, kurumsal headless mimari yüksek özelleştirme ve performans getirir. Doğru seçim aylık operasyon maliyetinizi 10 kata kadar değiştirir.',
  },
  {
    title: 'Tasarım kapsamı',
    body:
      'Hazır tema özelleştirme mi, sıfırdan custom UI/UX mi tercih edildiğine göre maliyet ciddi şekilde değişir. Marka konumlandırmanız netse custom tasarım yatırımı dönüşüm artışı olarak geri döner.',
  },
  {
    title: 'Entegrasyon sayısı ve derinliği',
    body:
      'Tek pazaryerine basit bir bağlantı ile çoklu ERP/WMS/CRM senkronizasyonu arasında ciddi bir mühendislik farkı vardır. Her entegrasyon ayrı bir proje kalemidir.',
  },
  {
    title: 'Ürün, kategori ve dil sayısı',
    body:
      'On bin SKU ile üç yüz SKU arasında ürün yönetimi, görsel üretimi ve içerik girişi maliyetleri lineer artar. Çok dilli/çok para birimli mağazalar ek lokalizasyon işçiliği gerektirir.',
  },
  {
    title: 'Sürekli operasyon',
    body:
      'Hosting, bakım, güvenlik güncellemeleri, performans izleme ve içerik yönetimi aylık tekrar eden kalemlerdir. E-ticaret sitesi kurmak tek seferlik değil, sürekli yatırım gerektiren bir süreçtir.',
  },
];

const marketplaces = [
  {
    name: 'Trendyol mağaza yönetimi',
    body:
      'Trendyol panelindeki ürün, kategori, stok, fiyat ve kampanya yönetimi ile mağaza performans optimizasyonu. Trendyol API entegrasyonuyla siparişlerinizi kendi ERP\'nize otomatik aktarırız; reklam ve kampanya kararlarını veriden besleriz.',
  },
  {
    name: 'Hepsiburada, N11 ve Amazon TR',
    body:
      'Çoklu pazaryeri yönetimi için tek panelden stok, sipariş ve fiyat senkronizasyonu. Her pazaryerinin özel kuralları (komisyon, kargo süreleri, kampanya gereksinimleri) iş kurgunuza göre konfigüre edilir.',
  },
  {
    name: 'Otomatik fiyatlandırma ve rakip izleme',
    body:
      'Agento priceCompare ile rakip fiyatlarını saatlik takip ederek dinamik fiyatlama uygulayabilirsiniz. Kâr marjı kuralları ve stok seviyeleri otomatik karar mekanizmasına bağlanır.',
  },
];

const differentiators = [
  {
    title: '9+ yıllık entegrasyon derinliği',
    body:
      'ERP, CRM, OMS, WMS, kargo, ödeme ve pazaryeri entegrasyonlarında 100+ enterprise proje deneyimi. Karmaşık veri akışlarını sessizce çalıştırırız.',
  },
  {
    title: 'AI ile otomatikleşen operasyon',
    body:
      'Sipariş yanıtlama, ürün açıklaması üretimi, içerik yenileme, müşteri segmentasyonu ve reklam bütçesi optimizasyonu için otonom ajanlarımız operasyon yükünüzü ciddi şekilde azaltır.',
  },
  {
    title: 'Türkiye pazarına özel know-how',
    body:
      'KVKK uyumu, mesafeli satış mevzuatı, Trendyol ve Hepsiburada operasyonları, yerli ödeme sağlayıcıları ve kargo entegrasyonları gibi yerel detaylar tasarım aşamasından itibaren işin içindedir.',
  },
  {
    title: 'Çıktı odaklı işleyiş',
    body:
      'Konuştuğumuz dil hız, dönüşüm, organik trafik ve sipariş başına maliyet. Estetik şart, ama tek başına yetmez — her sayfa bir KPI\'a hizmet eder.',
  },
];

const faqs = [
  {
    q: 'E-ticaret sitesi kurma maliyeti ne kadar?',
    a: 'Platform, tasarım kapsamı, entegrasyon sayısı ve ürün hacmine göre giriş seviyesi paketlerden kurumsal projelere uzanan geniş bir aralık vardır. Ücretsiz keşif görüşmesinde ihtiyacınızı dinleyip net bir teklif sunarız; sürpriz ek kalemler olmaz.',
  },
  {
    q: 'E-ticaret sitesi kurmak ne kadar sürer?',
    a: 'SaaS tabanlı standart bir kurulum 4-6 hafta içinde yayına alınabilirken, ERP entegrasyonlu kurumsal projeler 10-16 hafta arasında sürer. Süreyi belirleyen ana etken, üçüncü taraf sistemlerin hazır olma durumudur.',
  },
  {
    q: 'E-ticaret danışmanlığı kapsamına neler giriyor?',
    a: 'Platform ve teknoloji seçimi, süreç haritalama, KPI tanımları, dönüşüm optimizasyonu, pazaryeri stratejisi, reklam ve içerik takvimi gibi konularda haftalık veya aylık abonelik şeklinde danışmanlık veriyoruz. Hem yeni başlayan hem de mevcut operasyonunu büyütmek isteyen işletmeler için modellerimiz var.',
  },
  {
    q: 'Hangi pazaryerleriyle entegre olabiliyorsunuz?',
    a: 'Trendyol, Hepsiburada, N11, Amazon TR, ÇiçekSepeti, Pazarama ve Etsy gibi yerel/global pazaryerleriyle çift yönlü stok ve sipariş senkronizasyonu kuruyoruz. Tek panelden çoklu mağaza yönetimi standardımız.',
  },
  {
    q: 'Mevcut e-ticaret sitemizi taşıyabilir misiniz?',
    a: 'Evet. Mevcut ürün, kategori, müşteri, sipariş geçmişi ve SEO yapınızı koruyarak migration planlıyoruz. URL eşleme, 301 yönlendirmeleri ve schema markup taşıma gibi SEO kritik adımlar planın merkezindedir.',
  },
];

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'E-ticaret sitesi kurma ve danışmanlığı',
  name: 'E-ticaret Sitesi Kurma — agetolabs',
  description:
    'Strateji, tasarım, geliştirme, ERP/pazaryeri entegrasyonu ve sürekli optimizasyonla uçtan uca e-ticaret sitesi kurma hizmeti.',
  provider: {
    '@type': 'Organization',
    name: 'agetolabs',
    url: 'https://agetolabs.com',
    email: 'info@agetolabs.com',
  },
  areaServed: { '@type': 'Country', name: 'Türkiye' },
  availableLanguage: ['Turkish', 'English'],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'TRY',
    url: 'https://agetolabs.com/hizmetler/e-ticaret-sitesi-kurma',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: 'https://agetolabs.com/' },
    { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: 'https://agetolabs.com/hizmetler' },
    { '@type': 'ListItem', position: 3, name: 'E-ticaret Sitesi Kurma', item: 'https://agetolabs.com/hizmetler/e-ticaret-sitesi-kurma' },
  ],
};

export default function EticaretSitesiKurmaPage() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#8EF0B5]/30 overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <StarField />

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 0% 0%, rgba(88, 28, 135, 0.18) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(142, 240, 181, 0.06) 0%, transparent 40%)',
        }}
      />

      <Header />
      <RobotCompanion />

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative pt-40 md:pt-48 pb-20 md:pb-28">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#8EF0B5] mb-6">
              <span className="block w-8 h-px bg-[#8EF0B5]" />
              Hizmetler · E-ticaret
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-[20ch]">
              E-ticaret Sitesi Kurma
            </h1>
            <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed mt-8 max-w-[68ch]">
              E-ticarete yeni başlayan girişimcilerden çok kanallı operasyon
              yöneten kurumsal markalara kadar her ölçekte işletme için
              <span className="text-white"> e-ticaret sitesi kurma</span>,
              entegrasyon ve danışmanlık hizmeti sunuyoruz. Tek seferlik bir
              proje değil; platform seçiminden ERP entegrasyonuna, pazaryeri
              senkronizasyonundan dönüşüm optimizasyonuna kadar uzanan,
              ölçeklenebilir bir operasyon kuruyoruz. Hedef net: sürdürülebilir
              ciro, düşük operasyon maliyeti ve veriyle yönetilen bir mağaza.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <FlyingIconsButton href="/contact" paddingY={12} paddingX={26}>
                Ücretsiz Keşif Görüşmesi
              </FlyingIconsButton>
              <Link
                href="/hizmetler"
                className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#8EF0B5] transition-colors"
              >
                Kurumsal e-ticaret operasyonu hizmetimize bakın
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Aşamalar */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-[22ch]">
              E-ticaret Sitesi Kurmanın{' '}
              <span className="text-[#8EF0B5] italic">Aşamaları</span>
            </h2>
            <p className="text-[#9CA3AF] mt-5 max-w-[64ch]">
              Bir e-ticaret sitesi kurmak; platform seçimi, tasarım, geliştirme,
              entegrasyon, yasal altyapı ve yayın sonrası optimizasyondan oluşan
              uçtan uca bir süreçtir. Aşamaları atlamadan, ölçülebilir
              hedeflerle ilerleriz.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <article
                    key={s.title}
                    className="rounded-2xl border border-white/[0.08] bg-[#13151A]/80 backdrop-blur-md p-7 hover:border-[#8EF0B5]/30 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#8EF0B5]/10 border border-[#8EF0B5]/20 flex items-center justify-center mb-5">
                      <Icon size={20} className="text-[#8EF0B5]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {s.title}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed">
                      {s.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Maliyet */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#8EF0B5]/10 border border-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                <CircleDollarSign size={22} className="text-[#8EF0B5]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-[22ch]">
                E-ticaret Sitesi Kurma{' '}
                <span className="text-[#8EF0B5] italic">Maliyeti</span>
              </h2>
            </div>
            <p className="text-[#9CA3AF] max-w-[68ch]">
              Bir e-ticaret sitesinin maliyetini tek bir rakamla cevaplamak
              mümkün değildir. Kurumsal bir SAP entegrasyonu ile küçük bir SaaS
              kurulumun toplam sahip olma maliyeti arasında ciddi farklar olur.
              Aşağıdaki faktörler bütçenizi şekillendirir; ücretsiz keşif
              görüşmesinde bunları size özel hesaplarız.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              {costFactors.map((c) => (
                <article
                  key={c.title}
                  className="rounded-2xl border border-white/[0.08] bg-[#13151A]/80 backdrop-blur-md p-7"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {c.title}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {c.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pazaryeri */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#8EF0B5]/10 border border-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                <Store size={22} className="text-[#8EF0B5]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-[22ch]">
                Pazaryeri Entegrasyonu ve{' '}
                <span className="text-[#8EF0B5] italic">Yönetimi</span>
              </h2>
            </div>
            <p className="text-[#9CA3AF] max-w-[68ch]">
              Türkiye e-ticaretinde pazaryeri kanalı çoğu kategoride doğrudan
              sitenizden daha hızlı büyür. Doğru kurgu kendi siteniz ile
              pazaryerlerini birbirini besleyen kanallar haline getirir; yanlış
              kurgu fiyat kanibalizmi ve operasyonel kaosa yol açar.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {marketplaces.map((m) => (
                <article
                  key={m.name}
                  className="rounded-2xl border border-white/[0.08] bg-[#13151A]/80 backdrop-blur-md p-7"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {m.name}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {m.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Neden agetolabs */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#8EF0B5]/10 border border-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                <Sparkles size={22} className="text-[#8EF0B5]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-[22ch]">
                Neden{' '}
                <span className="text-[#8EF0B5] italic">agetolabs?</span>
              </h2>
            </div>
            <p className="text-[#9CA3AF] max-w-[68ch]">
              Onlarca ajans e-ticaret sitesi kurabilir. Bizim farkımız;
              entegrasyon derinliği, Türkiye operasyon bilgisi ve AI ile
              ölçeklenen otomasyon katmanımızdır.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              {differentiators.map((d) => (
                <article
                  key={d.title}
                  className="rounded-2xl border border-white/[0.08] bg-[#13151A]/80 backdrop-blur-md p-7"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {d.title}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {d.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-[920px] mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-[22ch]">
              Sıkça Sorulan{' '}
              <span className="text-[#8EF0B5] italic">Sorular</span>
            </h2>

            <div className="mt-12 space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-white/[0.08] bg-[#13151A]/80 backdrop-blur-md p-6 open:border-[#8EF0B5]/30 transition-colors"
                >
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                    <h3 className="text-base md:text-lg font-semibold text-white">
                      {f.q}
                    </h3>
                    <span className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-[#8EF0B5] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed mt-4">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8 py-20">
            <div
              className="relative overflow-hidden border border-white/[0.1] rounded-3xl px-8 md:px-12 py-14 md:py-16"
              style={{
                background:
                  'radial-gradient(120% 140% at 80% 0%, rgba(168,85,247,0.14), transparent 55%), radial-gradient(120% 140% at 10% 100%, rgba(142,240,181,0.14), transparent 55%), #13151A',
              }}
            >
              <svg
                aria-hidden
                className="absolute right-[-80px] bottom-[-80px] w-[300px] h-[300px] opacity-35 pointer-events-none"
                viewBox="0 0 300 300"
                fill="none"
              >
                <g
                  className="animate-[spin_9s_linear_infinite]"
                  style={{ transformOrigin: '50% 50%' }}
                >
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="120"
                    ry="48"
                    stroke="#8EF0B5"
                    strokeWidth="1"
                  />
                  <circle cx="270" cy="150" r="4" fill="#8EF0B5" />
                </g>
                <g
                  className="animate-[spin_14s_linear_infinite_reverse]"
                  style={{ transformOrigin: '50% 50%' }}
                >
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="48"
                    ry="120"
                    stroke="#a855f7"
                    strokeWidth="1"
                  />
                </g>
              </svg>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-[20ch] leading-[1.1] relative z-10">
                Ücretsiz{' '}
                <span className="text-[#8EF0B5] italic">
                  e-ticaret keşif görüşmesi
                </span>{' '}
                için bize yazın.
              </h2>
              <p className="text-[#9CA3AF] mt-4 max-w-[52ch] text-base md:text-[16.5px] relative z-10">
                İşinizi 30 dakika dinleyip platform, maliyet, süre ve
                entegrasyon kapsamı üzerine somut bir yol haritası çıkarıyoruz.
                Görüşme sonunda elinizde uygulanabilir bir plan olur.
              </p>
              <div className="mt-8 relative z-10">
                <FlyingIconsButton href="/contact" paddingY={12} paddingX={26}>
                  Görüşme Talep Et
                </FlyingIconsButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
