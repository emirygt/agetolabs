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
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

type Lang = 'tr' | 'en';
type LocalizedText = Record<Lang, string>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale !== 'en';
  return {
    title: isTr
      ? 'E-ticaret Sitesi Kurma | Profesyonel E-ticaret Çözümleri — agetolabs'
      : 'E-commerce Site Build | Professional E-commerce Solutions — agetolabs',
    description: isTr
      ? 'İşletmenize özel e-ticaret sitesi kurma, entegrasyon ve danışmanlık. ERP/pazaryeri entegrasyonu, Trendyol-Hepsiburada yönetimi. Ücretsiz keşif görüşmesi.'
      : 'Custom e-commerce site build, integration and consulting. ERP and marketplace integration, Trendyol/Hepsiburada management. Free discovery call.',
    alternates: {
      canonical: `/${locale}/hizmetler/e-ticaret-sitesi-kurma`,
      languages: {
        tr: '/tr/hizmetler/e-ticaret-sitesi-kurma',
        en: '/en/hizmetler/e-ticaret-sitesi-kurma',
        'x-default': '/tr/hizmetler/e-ticaret-sitesi-kurma',
      },
    },
    openGraph: {
      title: isTr ? 'E-ticaret Sitesi Kurma — agetolabs' : 'E-commerce Site Build — agetolabs',
      description: isTr
        ? 'Strateji, tasarım, ERP ve pazaryeri entegrasyonu, Trendyol mağaza yönetimi: tek elden uçtan uca e-ticaret kurulum ve danışmanlık.'
        : 'Strategy, design, ERP and marketplace integration, Trendyol storefront management: end-to-end e-commerce build and consulting from one team.',
      url: `/${locale}/hizmetler/e-ticaret-sitesi-kurma`,
      locale: isTr ? 'tr_TR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isTr ? 'E-ticaret Sitesi Kurma — agetolabs' : 'E-commerce Site Build — agetolabs',
      description: isTr
        ? 'Uçtan uca e-ticaret sitesi kurma ve pazaryeri yönetimi. Trendyol, Hepsiburada, ERP entegrasyonları.'
        : 'End-to-end e-commerce site build and marketplace management. Trendyol, Hepsiburada, ERP integrations.',
    },
  };
}

const steps: { icon: typeof Layers; title: LocalizedText; body: LocalizedText }[] = [
  {
    icon: Layers,
    title: {
      tr: '1. Strateji ve Platform Seçimi',
      en: '1. Strategy and Platform Selection',
    },
    body: {
      tr: 'İş modeliniz, ürün adediniz, hedef pazarınız ve büyüme planınıza göre Shopify, Ticimax, WooCommerce, Magento veya headless commerce gibi platformlardan en uygununu seçeriz. Yanlış platform seçimi, sonradan tüm operasyonu yeniden kurmanıza yol açar — bu yüzden süreç burada başlar.',
      en: 'We pick the right platform from Shopify, Ticimax, WooCommerce, Magento or headless commerce based on your business model, SKU count, target market and growth plan. The wrong platform forces you to rebuild the whole operation later — that\'s why the process starts here.',
    },
  },
  {
    icon: Palette,
    title: {
      tr: '2. Marka ve Dönüşüm Odaklı Tasarım',
      en: '2. Brand and Conversion-Driven Design',
    },
    body: {
      tr: 'Mobil öncelikli, hızlı yüklenen ve dönüşüm odaklı bir arayüz tasarlarız. Sepet terk oranını düşüren ödeme akışları, ürün sayfası şablonları ve marka kimliğinizle uyumlu UI sistemleri hazırlanır.',
      en: 'We design mobile-first, fast-loading, conversion-driven interfaces. Checkout flows that reduce cart abandonment, product page templates, and UI systems aligned with your brand identity.',
    },
  },
  {
    icon: Cable,
    title: {
      tr: '3. Geliştirme ve Entegrasyonlar',
      en: '3. Development and Integrations',
    },
    body: {
      tr: 'ERP (Logo, Netsis, SAP), CRM, kargo (Yurtiçi, MNG, Aras, UPS), e-fatura, muhasebe ve pazaryeri sistemlerinizle çift yönlü senkronizasyon kurulur. Stok, sipariş, fiyat ve müşteri verisi tek bir kaynaktan akar.',
      en: 'Two-way sync with your ERP (Logo, Netsis, SAP), CRM, carriers (Yurtiçi, MNG, Aras, UPS), e-invoice, accounting and marketplace systems. Stock, orders, prices and customer data flow from a single source of truth.',
    },
  },
  {
    icon: CreditCard,
    title: {
      tr: '4. Ödeme, Kargo ve Yasal Altyapı',
      en: '4. Payments, Shipping and Legal Setup',
    },
    body: {
      tr: 'iyzico, Param, PayTR, Stripe ve sanal POS sağlayıcılarıyla PCI uyumlu ödeme akışları kurarız. KVKK, mesafeli satış sözleşmeleri, çerez politikası ve aydınlatma metinleri yasal şablonlarla hazır gelir.',
      en: 'PCI-compliant payment flows with iyzico, Param, PayTR, Stripe and virtual POS providers. KVKK/GDPR compliance, distance-selling agreements, cookie policy and privacy notices ship with vetted legal templates.',
    },
  },
  {
    icon: Rocket,
    title: {
      tr: '5. Yayına Alma ve Sürekli Optimizasyon',
      en: '5. Go-Live and Continuous Optimization',
    },
    body: {
      tr: 'Yayın sonrası GA4, GTM ve Search Console kurulumu, Core Web Vitals optimizasyonu, A/B testleri ve aylık SEO raporları ile mağazanız her ay daha iyi performans verir. Kurulum bitiş değil, başlangıçtır.',
      en: 'Post-launch GA4, GTM and Search Console setup, Core Web Vitals optimization, A/B testing and monthly SEO reporting compound performance month over month. Launch is the starting line, not the finish line.',
    },
  },
];

const costFactors: { title: LocalizedText; body: LocalizedText }[] = [
  {
    title: { tr: 'Platform tercihi', en: 'Platform choice' },
    body: {
      tr: 'SaaS tabanlı çözümler düşük başlangıç maliyeti ve hızlı kurulum sunarken, kurumsal headless mimari yüksek özelleştirme ve performans getirir. Doğru seçim aylık operasyon maliyetinizi 10 kata kadar değiştirir.',
      en: 'SaaS solutions offer low entry cost and fast setup; enterprise headless architecture brings deep customization and performance. The right choice can swing monthly operating cost by up to 10x.',
    },
  },
  {
    title: { tr: 'Tasarım kapsamı', en: 'Design scope' },
    body: {
      tr: 'Hazır tema özelleştirme mi, sıfırdan custom UI/UX mi tercih edildiğine göre maliyet ciddi şekilde değişir. Marka konumlandırmanız netse custom tasarım yatırımı dönüşüm artışı olarak geri döner.',
      en: 'Cost moves significantly depending on whether you go with theme customization or a from-scratch custom UI/UX. If your brand positioning is sharp, investing in custom design pays back as conversion lift.',
    },
  },
  {
    title: { tr: 'Entegrasyon sayısı ve derinliği', en: 'Integration breadth and depth' },
    body: {
      tr: 'Tek pazaryerine basit bir bağlantı ile çoklu ERP/WMS/CRM senkronizasyonu arasında ciddi bir mühendislik farkı vardır. Her entegrasyon ayrı bir proje kalemidir.',
      en: 'There is a serious engineering gap between a single marketplace connector and multi-system ERP/WMS/CRM sync. Each integration is a discrete line item.',
    },
  },
  {
    title: { tr: 'Ürün, kategori ve dil sayısı', en: 'Product, category and language count' },
    body: {
      tr: 'On bin SKU ile üç yüz SKU arasında ürün yönetimi, görsel üretimi ve içerik girişi maliyetleri lineer artar. Çok dilli/çok para birimli mağazalar ek lokalizasyon işçiliği gerektirir.',
      en: 'Costs for product management, imagery and content entry scale linearly between 300 SKUs and 10K SKUs. Multilingual/multi-currency stores require additional localization work.',
    },
  },
  {
    title: { tr: 'Sürekli operasyon', en: 'Ongoing operations' },
    body: {
      tr: 'Hosting, bakım, güvenlik güncellemeleri, performans izleme ve içerik yönetimi aylık tekrar eden kalemlerdir. E-ticaret sitesi kurmak tek seferlik değil, sürekli yatırım gerektiren bir süreçtir.',
      en: 'Hosting, maintenance, security updates, performance monitoring and content management are recurring monthly line items. Running an e-commerce store is an ongoing investment, not a one-off project.',
    },
  },
];

const marketplaces: { name: LocalizedText; body: LocalizedText }[] = [
  {
    name: { tr: 'Trendyol mağaza yönetimi', en: 'Trendyol storefront management' },
    body: {
      tr: 'Trendyol panelindeki ürün, kategori, stok, fiyat ve kampanya yönetimi ile mağaza performans optimizasyonu. Trendyol API entegrasyonuyla siparişlerinizi kendi ERP\'nize otomatik aktarırız; reklam ve kampanya kararlarını veriden besleriz.',
      en: 'Product, category, stock, price and campaign management on the Trendyol panel plus storefront performance optimization. Orders flow automatically into your ERP via the Trendyol API, and we drive advertising and campaign decisions from data.',
    },
  },
  {
    name: { tr: 'Hepsiburada, N11 ve Amazon TR', en: 'Hepsiburada, N11 and Amazon TR' },
    body: {
      tr: 'Çoklu pazaryeri yönetimi için tek panelden stok, sipariş ve fiyat senkronizasyonu. Her pazaryerinin özel kuralları (komisyon, kargo süreleri, kampanya gereksinimleri) iş kurgunuza göre konfigüre edilir.',
      en: 'Single-panel stock, order and price sync across multiple marketplaces. Each marketplace\'s own rules (commission, shipping SLAs, campaign requirements) are configured around your business model.',
    },
  },
  {
    name: {
      tr: 'Otomatik fiyatlandırma ve rakip izleme',
      en: 'Automated pricing and competitor tracking',
    },
    body: {
      tr: 'Agento priceCompare ile rakip fiyatlarını saatlik takip ederek dinamik fiyatlama uygulayabilirsiniz. Kâr marjı kuralları ve stok seviyeleri otomatik karar mekanizmasına bağlanır.',
      en: 'Track competitor pricing hourly with Agento priceCompare and run dynamic pricing. Margin rules and stock thresholds drive the automated decision engine.',
    },
  },
];

const differentiators: { title: LocalizedText; body: LocalizedText }[] = [
  {
    title: {
      tr: '9+ yıllık entegrasyon derinliği',
      en: '9+ years of integration depth',
    },
    body: {
      tr: 'ERP, CRM, OMS, WMS, kargo, ödeme ve pazaryeri entegrasyonlarında 100+ enterprise proje deneyimi. Karmaşık veri akışlarını sessizce çalıştırırız.',
      en: '100+ enterprise projects across ERP, CRM, OMS, WMS, shipping, payments and marketplace integrations. We keep complex data flows running quietly in production.',
    },
  },
  {
    title: {
      tr: 'AI ile otomatikleşen operasyon',
      en: 'AI-driven operational automation',
    },
    body: {
      tr: 'Sipariş yanıtlama, ürün açıklaması üretimi, içerik yenileme, müşteri segmentasyonu ve reklam bütçesi optimizasyonu için otonom ajanlarımız operasyon yükünüzü ciddi şekilde azaltır.',
      en: 'Our autonomous agents materially reduce operational load across order replies, product descriptions, content refreshes, customer segmentation and ad-budget optimization.',
    },
  },
  {
    title: {
      tr: 'Türkiye pazarına özel know-how',
      en: 'Turkey-specific market know-how',
    },
    body: {
      tr: 'KVKK uyumu, mesafeli satış mevzuatı, Trendyol ve Hepsiburada operasyonları, yerli ödeme sağlayıcıları ve kargo entegrasyonları gibi yerel detaylar tasarım aşamasından itibaren işin içindedir.',
      en: 'KVKK compliance, distance-selling regulations, Trendyol and Hepsiburada operations, local payment providers and carrier integrations are baked in from the design phase forward.',
    },
  },
  {
    title: { tr: 'Çıktı odaklı işleyiş', en: 'Outcome-driven delivery' },
    body: {
      tr: 'Konuştuğumuz dil hız, dönüşüm, organik trafik ve sipariş başına maliyet. Estetik şart, ama tek başına yetmez — her sayfa bir KPI\'a hizmet eder.',
      en: 'We speak speed, conversion, organic traffic and cost per order. Aesthetics matter, but aren\'t enough on their own — every page serves a KPI.',
    },
  },
];

const faqs: { q: LocalizedText; a: LocalizedText }[] = [
  {
    q: {
      tr: 'E-ticaret sitesi kurma maliyeti ne kadar?',
      en: 'How much does building an e-commerce site cost?',
    },
    a: {
      tr: 'Platform, tasarım kapsamı, entegrasyon sayısı ve ürün hacmine göre giriş seviyesi paketlerden kurumsal projelere uzanan geniş bir aralık vardır. Ücretsiz keşif görüşmesinde ihtiyacınızı dinleyip net bir teklif sunarız; sürpriz ek kalemler olmaz.',
      en: 'Cost varies widely depending on platform, design scope, number of integrations and product volume — from entry-level packages to enterprise builds. We listen on the free discovery call and send a clear quote with no surprise line items.',
    },
  },
  {
    q: {
      tr: 'E-ticaret sitesi kurmak ne kadar sürer?',
      en: 'How long does it take to launch an e-commerce site?',
    },
    a: {
      tr: 'SaaS tabanlı standart bir kurulum 4-6 hafta içinde yayına alınabilirken, ERP entegrasyonlu kurumsal projeler 10-16 hafta arasında sürer. Süreyi belirleyen ana etken, üçüncü taraf sistemlerin hazır olma durumudur.',
      en: 'A standard SaaS build can ship in 4–6 weeks; enterprise projects with ERP integration land in 10–16 weeks. The main driver is third-party system readiness.',
    },
  },
  {
    q: {
      tr: 'E-ticaret danışmanlığı kapsamına neler giriyor?',
      en: 'What does e-commerce consulting cover?',
    },
    a: {
      tr: 'Platform ve teknoloji seçimi, süreç haritalama, KPI tanımları, dönüşüm optimizasyonu, pazaryeri stratejisi, reklam ve içerik takvimi gibi konularda haftalık veya aylık abonelik şeklinde danışmanlık veriyoruz. Hem yeni başlayan hem de mevcut operasyonunu büyütmek isteyen işletmeler için modellerimiz var.',
      en: 'Weekly or monthly retainers covering platform/tech selection, process mapping, KPI definitions, conversion optimization, marketplace strategy, advertising and content planning. We have models for both early-stage and scaling operations.',
    },
  },
  {
    q: {
      tr: 'Hangi pazaryerleriyle entegre olabiliyorsunuz?',
      en: 'Which marketplaces do you integrate with?',
    },
    a: {
      tr: 'Trendyol, Hepsiburada, N11, Amazon TR, ÇiçekSepeti, Pazarama ve Etsy gibi yerel/global pazaryerleriyle çift yönlü stok ve sipariş senkronizasyonu kuruyoruz. Tek panelden çoklu mağaza yönetimi standardımız.',
      en: 'Two-way stock and order sync with Trendyol, Hepsiburada, N11, Amazon TR, ÇiçekSepeti, Pazarama and Etsy among others. Single-panel multi-store management is our default.',
    },
  },
  {
    q: {
      tr: 'Mevcut e-ticaret sitemizi taşıyabilir misiniz?',
      en: 'Can you migrate our existing e-commerce site?',
    },
    a: {
      tr: 'Evet. Mevcut ürün, kategori, müşteri, sipariş geçmişi ve SEO yapınızı koruyarak migration planlıyoruz. URL eşleme, 301 yönlendirmeleri ve schema markup taşıma gibi SEO kritik adımlar planın merkezindedir.',
      en: 'Yes. We plan migrations that preserve products, categories, customers, order history and SEO structure. URL mapping, 301 redirects and schema-markup migration sit at the center of the plan.',
    },
  },
];

export default async function EticaretSitesiKurmaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Lang = locale === 'en' ? 'en' : 'tr';
  const isTr = lang === 'tr';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: isTr ? 'E-ticaret sitesi kurma ve danışmanlığı' : 'E-commerce site build and consulting',
    name: isTr ? 'E-ticaret Sitesi Kurma — agetolabs' : 'E-commerce Site Build — agetolabs',
    description: isTr
      ? 'Strateji, tasarım, geliştirme, ERP/pazaryeri entegrasyonu ve sürekli optimizasyonla uçtan uca e-ticaret sitesi kurma hizmeti.'
      : 'End-to-end e-commerce site build covering strategy, design, development, ERP and marketplace integration, and continuous optimization.',
    provider: {
      '@type': 'Organization',
      name: 'agetolabs',
      url: 'https://agetolabs.com',
      email: 'info@agetolabs.com',
    },
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    availableLanguage: ['Turkish', 'English'],
    inLanguage: lang,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'TRY',
      url: `https://agetolabs.com/${lang}/hizmetler/e-ticaret-sitesi-kurma`,
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q[lang],
      acceptedAnswer: { '@type': 'Answer', text: f.a[lang] },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isTr ? 'Anasayfa' : 'Home', item: `https://agetolabs.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: isTr ? 'Hizmetler' : 'Services', item: `https://agetolabs.com/${lang}/hizmetler` },
      {
        '@type': 'ListItem',
        position: 3,
        name: isTr ? 'E-ticaret Sitesi Kurma' : 'E-commerce Site Build',
        item: `https://agetolabs.com/${lang}/hizmetler/e-ticaret-sitesi-kurma`,
      },
    ],
  };

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
            <Breadcrumbs
              items={[
                { label: isTr ? 'Anasayfa' : 'Home', href: `/${lang}` },
                { label: isTr ? 'Hizmetler' : 'Services', href: `/${lang}/hizmetler` },
                { label: isTr ? 'E-ticaret Sitesi Kurma' : 'E-commerce Site Build' },
              ]}
            />
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#8EF0B5] mb-6">
              <span className="block w-8 h-px bg-[#8EF0B5]" />
              {isTr ? 'Hizmetler · E-ticaret' : 'Services · E-commerce'}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-[20ch]">
              {isTr ? 'E-ticaret Sitesi Kurma' : 'E-commerce Site Build'}
            </h1>
            <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed mt-8 max-w-[68ch]">
              {isTr ? (
                <>
                  E-ticarete yeni başlayan girişimcilerden çok kanallı operasyon yöneten
                  kurumsal markalara kadar her ölçekte işletme için
                  <span className="text-white"> e-ticaret sitesi kurma</span>, entegrasyon ve
                  danışmanlık hizmeti sunuyoruz. Tek seferlik bir proje değil; platform
                  seçiminden ERP entegrasyonuna, pazaryeri senkronizasyonundan dönüşüm
                  optimizasyonuna kadar uzanan, ölçeklenebilir bir operasyon kuruyoruz.
                  Hedef net: sürdürülebilir ciro, düşük operasyon maliyeti ve veriyle
                  yönetilen bir mağaza.
                </>
              ) : (
                <>
                  From first-time founders to enterprise brands running multi-channel
                  operations, we deliver
                  <span className="text-white"> e-commerce site build</span>, integration and
                  consulting at every scale. Not a one-off project: we set up a scalable
                  operation that spans platform selection, ERP integration, marketplace
                  sync and conversion optimization. The goal is clear — sustainable
                  revenue, low operating cost and a store run on data.
                </>
              )}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <FlyingIconsButton href={`/${lang}/contact`} paddingY={12} paddingX={26}>
                {isTr ? 'Ücretsiz Keşif Görüşmesi' : 'Free Discovery Call'}
              </FlyingIconsButton>
              <Link
                href={`/${lang}/hizmetler`}
                className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#8EF0B5] transition-colors"
              >
                {isTr
                  ? 'Kurumsal e-ticaret operasyonu hizmetimize bakın'
                  : 'See our enterprise e-commerce service'}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-[22ch]">
              {isTr ? (
                <>
                  E-ticaret Sitesi Kurmanın{' '}
                  <span className="text-[#8EF0B5] italic">Aşamaları</span>
                </>
              ) : (
                <>
                  How an E-commerce Site{' '}
                  <span className="text-[#8EF0B5] italic">Gets Built</span>
                </>
              )}
            </h2>
            <p className="text-[#9CA3AF] mt-5 max-w-[64ch]">
              {isTr
                ? 'Bir e-ticaret sitesi kurmak; platform seçimi, tasarım, geliştirme, entegrasyon, yasal altyapı ve yayın sonrası optimizasyondan oluşan uçtan uca bir süreçtir. Aşamaları atlamadan, ölçülebilir hedeflerle ilerleriz.'
                : 'Building an e-commerce site is end-to-end: platform selection, design, development, integrations, legal setup and post-launch optimization. We move stage by stage, against measurable goals.'}
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <article
                    key={s.title.tr}
                    className="rounded-2xl border border-white/[0.08] bg-[#13151A]/80 backdrop-blur-md p-7 hover:border-[#8EF0B5]/30 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#8EF0B5]/10 border border-[#8EF0B5]/20 flex items-center justify-center mb-5">
                      <Icon size={20} className="text-[#8EF0B5]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {s.title[lang]}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed">
                      {s.body[lang]}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Cost */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#8EF0B5]/10 border border-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                <CircleDollarSign size={22} className="text-[#8EF0B5]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-[22ch]">
                {isTr ? (
                  <>
                    E-ticaret Sitesi Kurma{' '}
                    <span className="text-[#8EF0B5] italic">Maliyeti</span>
                  </>
                ) : (
                  <>
                    E-commerce Site Build{' '}
                    <span className="text-[#8EF0B5] italic">Cost</span>
                  </>
                )}
              </h2>
            </div>
            <p className="text-[#9CA3AF] max-w-[68ch]">
              {isTr
                ? 'Bir e-ticaret sitesinin maliyetini tek bir rakamla cevaplamak mümkün değildir. Kurumsal bir SAP entegrasyonu ile küçük bir SaaS kurulumun toplam sahip olma maliyeti arasında ciddi farklar olur. Aşağıdaki faktörler bütçenizi şekillendirir; ücretsiz keşif görüşmesinde bunları size özel hesaplarız.'
                : 'There is no single number that captures the cost of an e-commerce site. Total cost of ownership for an enterprise SAP integration looks nothing like a small SaaS setup. The factors below shape the budget; we calculate them for your specific case on the free discovery call.'}
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              {costFactors.map((c) => (
                <article
                  key={c.title.tr}
                  className="rounded-2xl border border-white/[0.08] bg-[#13151A]/80 backdrop-blur-md p-7"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {c.title[lang]}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {c.body[lang]}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Marketplace */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#8EF0B5]/10 border border-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                <Store size={22} className="text-[#8EF0B5]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-[22ch]">
                {isTr ? (
                  <>
                    Pazaryeri Entegrasyonu ve{' '}
                    <span className="text-[#8EF0B5] italic">Yönetimi</span>
                  </>
                ) : (
                  <>
                    Marketplace Integration and{' '}
                    <span className="text-[#8EF0B5] italic">Management</span>
                  </>
                )}
              </h2>
            </div>
            <p className="text-[#9CA3AF] max-w-[68ch]">
              {isTr
                ? "Türkiye e-ticaretinde pazaryeri kanalı çoğu kategoride doğrudan sitenizden daha hızlı büyür. Doğru kurgu kendi siteniz ile pazaryerlerini birbirini besleyen kanallar haline getirir; yanlış kurgu fiyat kanibalizmi ve operasyonel kaosa yol açar."
                : 'In Turkish e-commerce the marketplace channel grows faster than direct in most categories. The right setup makes your own site and marketplaces feed each other; the wrong one creates price cannibalization and operational chaos.'}
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {marketplaces.map((m) => (
                <article
                  key={m.name.tr}
                  className="rounded-2xl border border-white/[0.08] bg-[#13151A]/80 backdrop-blur-md p-7"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {m.name[lang]}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {m.body[lang]}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why agetolabs */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#8EF0B5]/10 border border-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                <Sparkles size={22} className="text-[#8EF0B5]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-[22ch]">
                {isTr ? (
                  <>
                    Neden{' '}
                    <span className="text-[#8EF0B5] italic">agetolabs?</span>
                  </>
                ) : (
                  <>
                    Why{' '}
                    <span className="text-[#8EF0B5] italic">agetolabs?</span>
                  </>
                )}
              </h2>
            </div>
            <p className="text-[#9CA3AF] max-w-[68ch]">
              {isTr
                ? 'Onlarca ajans e-ticaret sitesi kurabilir. Bizim farkımız; entegrasyon derinliği, Türkiye operasyon bilgisi ve AI ile ölçeklenen otomasyon katmanımızdır.'
                : 'Plenty of agencies can ship an e-commerce site. What separates us is integration depth, Turkey operational know-how, and an AI-scaled automation layer underneath.'}
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              {differentiators.map((d) => (
                <article
                  key={d.title.tr}
                  className="rounded-2xl border border-white/[0.08] bg-[#13151A]/80 backdrop-blur-md p-7"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {d.title[lang]}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {d.body[lang]}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-[920px] mx-auto px-6 sm:px-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-[22ch]">
              {isTr ? (
                <>
                  Sıkça Sorulan{' '}
                  <span className="text-[#8EF0B5] italic">Sorular</span>
                </>
              ) : (
                <>
                  Frequently Asked{' '}
                  <span className="text-[#8EF0B5] italic">Questions</span>
                </>
              )}
            </h2>

            <div className="mt-12 space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q.tr}
                  className="group rounded-2xl border border-white/[0.08] bg-[#13151A]/80 backdrop-blur-md p-6 open:border-[#8EF0B5]/30 transition-colors"
                >
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                    <h3 className="text-base md:text-lg font-semibold text-white">
                      {f.q[lang]}
                    </h3>
                    <span className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-[#8EF0B5] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed mt-4">
                    {f.a[lang]}
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
                {isTr ? (
                  <>
                    Ücretsiz{' '}
                    <span className="text-[#8EF0B5] italic">
                      e-ticaret keşif görüşmesi
                    </span>{' '}
                    için bize yazın.
                  </>
                ) : (
                  <>
                    Book a free{' '}
                    <span className="text-[#8EF0B5] italic">
                      e-commerce discovery call
                    </span>{' '}
                    with us.
                  </>
                )}
              </h2>
              <p className="text-[#9CA3AF] mt-4 max-w-[52ch] text-base md:text-[16.5px] relative z-10">
                {isTr
                  ? 'İşinizi 30 dakika dinleyip platform, maliyet, süre ve entegrasyon kapsamı üzerine somut bir yol haritası çıkarıyoruz. Görüşme sonunda elinizde uygulanabilir bir plan olur.'
                  : 'We listen to your business for 30 minutes and produce a concrete roadmap on platform, cost, timeline and integration scope. You walk away with an actionable plan.'}
              </p>
              <div className="mt-8 relative z-10">
                <FlyingIconsButton href={`/${lang}/contact`} paddingY={12} paddingX={26}>
                  {isTr ? 'Görüşme Talep Et' : 'Request a Call'}
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
