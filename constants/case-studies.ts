export type CaseStudyContent = {
  eyebrow: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string[];
  pullQuote: string;
};

export interface CaseStudy {
  slug: string;
  brand: string;
  industry: string;
  industryTr: string;
  scope: string[];
  scopeTr: string[];
  en: CaseStudyContent;
  tr: CaseStudyContent;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'turkcell-pasaj',
    brand: 'Turkcell Pasaj',
    industry: 'Telecom · Marketplace',
    industryTr: 'Telekom · Pazaryeri',
    scope: ['Marketplace integration', 'OMS', 'Project management'],
    scopeTr: ['Pazaryeri entegrasyonu', 'OMS', 'Proje yönetimi'],
    en: {
      eyebrow: 'Marketplace orchestration',
      summary:
        'End-to-end marketplace integration and OMS coordination for one of Turkey\'s largest telecom-driven marketplaces.',
      problem:
        'Multi-vendor commerce flows were fragmented across ERP, OMS and storefront — every campaign required manual stitching, and high-traffic periods exposed brittle handoffs between order, stock and payment systems.',
      approach:
        'We unified the integration layer between ERP, OMS, WMS and the storefront under a single orchestration runtime — designed for high-traffic campaign days. Vendor onboarding, catalog sync and order routing were rebuilt as deterministic flows with observability and replay built in.',
      outcome: [
        'Single source of truth for orders, stock and payments',
        'Campaign-day operations without manual interventions',
        'Vendor onboarding cycle compressed dramatically',
      ],
      pullQuote:
        'A marketplace runtime that holds together when campaign volume goes vertical.',
    },
    tr: {
      eyebrow: 'Pazaryeri orkestrasyonu',
      summary:
        'Türkiye\'nin en büyük telekom destekli pazaryerlerinden biri için uçtan uca pazaryeri entegrasyonu ve OMS koordinasyonu.',
      problem:
        'Çok satıcılı ticaret akışları ERP, OMS ve mağaza arasında dağınıktı — her kampanya elle birleştirme gerektiriyor, yüksek trafikli günlerde sipariş, stok ve ödeme sistemleri arasındaki kırılgan akışlar açığa çıkıyordu.',
      approach:
        'ERP, OMS, WMS ve mağaza arasındaki entegrasyon katmanını yüksek trafikli kampanya günlerine göre tasarlanmış tek bir orkestrasyon runtime\'ı altında birleştirdik. Satıcı onboarding, katalog senkronizasyonu ve sipariş yönlendirme; gözlemlenebilirlik ve tekrar oynatma yetenekleriyle deterministik akışlar olarak yeniden inşa edildi.',
      outcome: [
        'Sipariş, stok ve ödemeler için tek doğru kaynak',
        'Kampanya günlerinde manuel müdahale gerektirmeyen operasyon',
        'Satıcı onboarding süresinde belirgin düşüş',
      ],
      pullQuote:
        'Kampanya trafiği dikine fırladığında ayakta kalan bir pazaryeri runtime\'ı.',
    },
  },
  {
    slug: 'samsung',
    brand: 'Samsung',
    industry: 'Consumer Electronics · D2C',
    industryTr: 'Tüketici Elektroniği · D2C',
    scope: ['D2C storefront', 'Payments', 'Promo engine'],
    scopeTr: ['D2C mağaza', 'Ödeme', 'Promosyon motoru'],
    en: {
      eyebrow: 'D2C at global brand cadence',
      summary:
        'Direct-to-consumer commerce experience aligned with global brand release cadences and Turkey-specific payment and promo requirements.',
      problem:
        'A global D2C platform met local market complexity — installment-payment mixes, country-specific promotions and high product-launch concurrency — and the storefront-payment loop needed to be tighter than off-the-shelf could deliver.',
      approach:
        'We engineered the localization layer: installment matrices, promo precedence rules and tax/region logic, while keeping the storefront experience true to global brand standards. Release windows for new device launches were treated as first-class deploy events.',
      outcome: [
        'Launch-day commerce stability across Türkiye',
        'Localized promo engine without breaking brand consistency',
        'Reduced incident surface on payment edge cases',
      ],
      pullQuote: 'Global brand fidelity, local commerce reality.',
    },
    tr: {
      eyebrow: 'Küresel marka temposunda D2C',
      summary:
        'Küresel marka lansman temposuna ve Türkiye\'ye özgü ödeme/promosyon gereksinimlerine hizalı doğrudan tüketici ticaret deneyimi.',
      problem:
        'Küresel bir D2C platformu yerel pazarın karmaşıklığıyla buluştu — taksit karışımları, ülkeye özgü promosyonlar ve yüksek eşzamanlı ürün lansmanları — ve mağaza-ödeme döngüsünün hazır çözümlerden daha sıkı olması gerekiyordu.',
      approach:
        'Yerelleştirme katmanını biz tasarladık: taksit matrisleri, promosyon öncelik kuralları ve vergi/bölge mantığı — mağaza deneyimini küresel marka standartlarına sadık tutarak. Yeni cihaz lansmanlarının sürüm pencereleri birinci sınıf deploy olayları olarak ele alındı.',
      outcome: [
        'Türkiye genelinde lansman gününde ticaret stabilitesi',
        'Marka tutarlılığını bozmadan yerelleştirilmiş promosyon motoru',
        'Ödeme edge case\'lerinde olay yüzeyinin azaltılması',
      ],
      pullQuote: 'Küresel marka sadakati, yerel ticaret gerçekliği.',
    },
  },
  {
    slug: 'lacoste',
    brand: 'Lacoste',
    industry: 'Fashion · Omnichannel',
    industryTr: 'Moda · Omnichannel',
    scope: ['Omnichannel commerce', 'Inventory sync', 'CRM'],
    scopeTr: ['Omnichannel ticaret', 'Stok senkronizasyonu', 'CRM'],
    en: {
      eyebrow: 'Omnichannel without seams',
      summary:
        'Unifying retail, e-commerce and marketplace channels around one customer record and one stock truth.',
      problem:
        'Physical retail, the brand storefront and marketplace channels each had their own pace of truth. Customers experienced the seams — stock mismatches, fragmented loyalty data, divergent return paths.',
      approach:
        'We built the integration spine: real-time inventory sync across channels, a unified customer profile, and shared order/return flows. CRM signals became cross-channel events rather than store-bound records.',
      outcome: [
        'One inventory truth across retail and digital',
        'Cross-channel customer profile for marketing & service',
        'Faster, cleaner returns regardless of channel',
      ],
      pullQuote: 'One brand experience whether the customer walks in or scrolls in.',
    },
    tr: {
      eyebrow: 'Kesintisiz omnichannel',
      summary:
        'Perakende, e-ticaret ve pazaryeri kanallarını tek müşteri kaydı ve tek stok gerçeği etrafında birleştirme.',
      problem:
        'Fiziksel perakende, marka mağazası ve pazaryeri kanallarının her birinin kendi doğruluk temposu vardı. Müşteriler dikişleri hissediyordu — stok uyumsuzlukları, parçalı sadakat verisi, farklılaşan iade akışları.',
      approach:
        'Entegrasyon omurgasını kurduk: kanallar arası gerçek zamanlı stok senkronizasyonu, birleşik müşteri profili ve paylaşılan sipariş/iade akışları. CRM sinyalleri mağazaya bağlı kayıtlar yerine kanallar arası olaylara dönüştü.',
      outcome: [
        'Perakende ve dijital genelinde tek stok gerçeği',
        'Pazarlama ve hizmet için kanallar arası müşteri profili',
        'Kanaldan bağımsız daha hızlı ve temiz iadeler',
      ],
      pullQuote:
        'Müşteri mağazaya girse de ekrana kayarak gelse de tek marka deneyimi.',
    },
  },
  {
    slug: 'converse',
    brand: 'Converse',
    industry: 'Fashion · D2C',
    industryTr: 'Moda · D2C',
    scope: ['Storefront performance', 'Launch ops'],
    scopeTr: ['Mağaza performansı', 'Lansman operasyonu'],
    en: {
      eyebrow: 'Drop-day storefront engineering',
      summary:
        'A storefront tuned for sneaker drops — peak-traffic surges, queue fairness and zero brand-degrading latency.',
      problem:
        'Limited-edition drops produced traffic spikes orders of magnitude above baseline. A normal storefront degraded under that load; brand reputation degraded with it.',
      approach:
        'We re-engineered the drop pathway: queue, inventory hold, payment and confirmation isolated from baseline traffic. Performance budgets and synthetic load tests turned drop days into rehearsed launches rather than incidents.',
      outcome: [
        'Drop-day uptime under expected surge multiples',
        'Queue fairness customers actually trust',
        'Engineering treats drop days as scheduled launches',
      ],
      pullQuote: 'Drop days that feel like launches, not incidents.',
    },
    tr: {
      eyebrow: 'Drop-day mağaza mühendisliği',
      summary:
        'Sneaker drop\'larına göre ayarlanmış bir mağaza — zirve trafik dalgaları, kuyruk adaleti ve markaya zarar veren gecikmenin sıfırlanması.',
      problem:
        'Sınırlı sayıda drop\'lar, baz trafiğin çok katı olan ani yükselmeler üretiyordu. Normal bir mağaza bu yük altında bozuluyor; markanın itibarı da onunla birlikte.',
      approach:
        'Drop akışını yeniden mühendislik ettik: kuyruk, stok tutma, ödeme ve onay baz trafikten izole edildi. Performans bütçeleri ve sentetik yük testleri drop günlerini olaylar yerine prova edilmiş lansmanlara dönüştürdü.',
      outcome: [
        'Beklenen yük katlarında drop-day uptime',
        'Müşterinin gerçekten güvendiği kuyruk adaleti',
        'Mühendisliğin drop günlerini planlı lansman olarak ele alması',
      ],
      pullQuote: 'Olaylar gibi değil, lansman gibi hissettiren drop günleri.',
    },
  },
  {
    slug: 'vatan-bilgisayar',
    brand: 'Vatan Bilgisayar',
    industry: 'Electronics retail',
    industryTr: 'Elektronik perakende',
    scope: ['ERP integration', 'OMS', 'Marketplace ops'],
    scopeTr: ['ERP entegrasyonu', 'OMS', 'Pazaryeri operasyonu'],
    en: {
      eyebrow: 'ERP-grade commerce',
      summary:
        'Connecting heavy-SKU electronics retail to modern marketplace operations without losing ERP discipline.',
      problem:
        'High SKU count, deep ERP customization and marketplace-channel obligations pulled in opposite directions. Data quality and price/stock accuracy were business-critical, not nice-to-haves.',
      approach:
        'We built reliable, observable pipelines between ERP, marketplace channels and the storefront. Pricing and stock became continuously reconciled streams rather than nightly batches.',
      outcome: [
        'Continuous price/stock reconciliation across channels',
        'Fewer marketplace listing issues from data drift',
        'Operations team focused on exceptions, not maintenance',
      ],
      pullQuote: 'Marketplace velocity with ERP-grade truth.',
    },
    tr: {
      eyebrow: 'ERP standardında ticaret',
      summary:
        'Yoğun SKU\'lu elektronik perakendeyi ERP disiplinini kaybetmeden modern pazaryeri operasyonlarına bağlamak.',
      problem:
        'Yüksek SKU sayısı, derin ERP özelleştirmesi ve pazaryeri kanalı yükümlülükleri ters yönlere çekiyordu. Veri kalitesi ile fiyat/stok doğruluğu nice-to-have değil iş kritikti.',
      approach:
        'ERP, pazaryeri kanalları ve mağaza arasında güvenilir, gözlemlenebilir pipeline\'lar kurduk. Fiyat ve stok; gecelik batch\'ler yerine sürekli mutabakata sokulan akışlara dönüştü.',
      outcome: [
        'Kanallar arası sürekli fiyat/stok mutabakatı',
        'Veri kayması kaynaklı pazaryeri liste hatalarında azalma',
        'Operasyon ekibinin bakıma değil istisnalara odaklanması',
      ],
      pullQuote: 'ERP doğruluğunda pazaryeri hızı.',
    },
  },
  {
    slug: 'english-home',
    brand: 'English Home',
    industry: 'Home retail · Omnichannel',
    industryTr: 'Ev perakendesi · Omnichannel',
    scope: ['Omnichannel platform', 'CRM', 'Loyalty'],
    scopeTr: ['Omnichannel platform', 'CRM', 'Sadakat'],
    en: {
      eyebrow: 'Loyalty that crosses channels',
      summary:
        'Customer loyalty and CRM data unified across physical stores and digital channels.',
      problem:
        'Loyalty programs and CRM segments lived in silos — store-bound records, digital-bound records, and campaign teams reconciling spreadsheets to find the customer in the middle.',
      approach:
        'We built the unified profile and event layer so a customer\'s loyalty status, preferences and history follow them across store, app and web — making cross-channel campaigns actually executable.',
      outcome: [
        'Single customer profile across store and digital',
        'Campaign teams operate on live data, not exports',
        'Loyalty redemption clean across channels',
      ],
      pullQuote: 'A customer record that follows the customer, not the channel.',
    },
    tr: {
      eyebrow: 'Kanallar arası sadakat',
      summary:
        'Fiziksel mağazalar ve dijital kanallar genelinde birleştirilmiş müşteri sadakati ve CRM verisi.',
      problem:
        'Sadakat programları ve CRM segmentleri silolarda yaşıyordu — mağazaya bağlı kayıtlar, dijitale bağlı kayıtlar ve aradaki müşteriyi bulmak için tablo karşılaştıran kampanya ekipleri.',
      approach:
        'Birleşik profil ve olay katmanını kurduk: müşterinin sadakat durumu, tercihleri ve geçmişi mağaza, uygulama ve web arasında onunla hareket ediyor — kanallar arası kampanyaları gerçekten yürütülebilir kılıyor.',
      outcome: [
        'Mağaza ve dijital genelinde tek müşteri profili',
        'Kampanya ekiplerinin export değil canlı veri üzerinde çalışması',
        'Kanallar arası temiz sadakat itfası',
      ],
      pullQuote: 'Kanalı değil müşteriyi takip eden müşteri kaydı.',
    },
  },
  {
    slug: 'gs-store',
    brand: 'GS Store',
    industry: 'Sports retail · Licensed merch',
    industryTr: 'Spor perakendesi · Lisanslı ürün',
    scope: ['Storefront rebuild', 'Campaign ops'],
    scopeTr: ['Mağaza yeniden inşa', 'Kampanya operasyonu'],
    en: {
      eyebrow: 'Fan commerce, match-week ready',
      summary:
        'A storefront engineered for football-driven traffic patterns — match days, transfer windows, championship moments.',
      problem:
        'Football-driven commerce comes in spikes correlated with the calendar of the sport. A traditional retail storefront wasn\'t calibrated for the asymmetric demand pattern of match-week merchandising.',
      approach:
        'We aligned commerce operations with the sporting calendar: pre-cached match-week catalogs, campaign templates wired to fixture data, and storefront performance treated as a fan-experience metric, not just an engineering one.',
      outcome: [
        'Match-week storefront performance fans expect',
        'Campaign templates wired to fixture cadence',
        'Operations aligned with the sporting calendar',
      ],
      pullQuote: 'Commerce that runs on the rhythm of the match calendar.',
    },
    tr: {
      eyebrow: 'Maç haftasına hazır taraftar ticareti',
      summary:
        'Futbol kaynaklı trafik desenleri için tasarlanmış bir mağaza — maç günleri, transfer dönemleri, şampiyonluk anları.',
      problem:
        'Futbol kaynaklı ticaret, sporun takvimiyle ilişkili dalgalar halinde gelir. Geleneksel bir perakende mağazası maç haftası ürünleştirmesinin asimetrik talep desenine göre kalibre değildi.',
      approach:
        'Ticaret operasyonlarını spor takvimiyle hizaladık: maç haftası katalogları önceden cache\'lendi, kampanya şablonları fikstür verisine bağlandı, mağaza performansı yalnızca mühendislik değil taraftar deneyimi metriği olarak ele alındı.',
      outcome: [
        'Taraftarların beklediği maç haftası mağaza performansı',
        'Fikstür temposuna bağlanmış kampanya şablonları',
        'Spor takvimine hizalı operasyon',
      ],
      pullQuote: 'Maç takviminin ritminde çalışan ticaret.',
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
