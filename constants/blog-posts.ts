export type BlogParagraph = { type: 'p'; text: string };
export type BlogHeading = { type: 'h2'; text: string };
export type BlogQuote = { type: 'quote'; text: string };
export type BlogList = { type: 'list'; items: string[] };
export type BlogBlock = BlogParagraph | BlogHeading | BlogQuote | BlogList;

export type BlogContent = {
  title: string;
  excerpt: string;
  blocks: BlogBlock[];
};

export interface BlogPost {
  slug: string;
  publishedAt: string;
  readingMinutes: number;
  category: string;
  categoryTr: string;
  tags: string[];
  en: BlogContent;
  tr: BlogContent;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'orchestrating-autonomous-agents-in-enterprise',
    publishedAt: '2026-04-18',
    readingMinutes: 8,
    category: 'Engineering',
    categoryTr: 'Mühendislik',
    tags: ['AI', 'orchestration', 'agents'],
    en: {
      title: 'Orchestrating autonomous agents inside an enterprise',
      excerpt:
        'Why running agents at enterprise scale is a workflow problem before it is a model problem — and how we structure the orchestration layer that makes it reliable.',
      blocks: [
        { type: 'p', text: 'Most enterprise AI conversations still start with the model. The faster way to build something that actually ships is to start with the workflow. The model is a runtime detail — the orchestration is the system.' },
        { type: 'h2', text: 'Agents are functions; workflows are programs' },
        { type: 'p', text: 'A single agent invocation looks a lot like a function call: input, reasoning, output. Useful, but bounded. The interesting work — booking, reconciling, escalating, deciding — happens when many of these calls compose into a workflow that survives retries, partial failures, and concurrent execution.' },
        { type: 'p', text: 'In enterprise systems, "compose" is doing heavy lifting. It means: persistence between steps, audit traces for every decision, idempotency, rollback paths, and a way to reason about cost-per-run. That is not model engineering. It is workflow engineering with a model in the loop.' },
        { type: 'h2', text: 'The four properties we design for' },
        { type: 'list', items: [
          'Determinism at the workflow level — non-determinism is allowed inside an agent step, but the workflow re-runs must converge.',
          'Replayability — any past run can be re-executed against a snapshot to validate or debug.',
          'Observable cost surface — every step has a measurable cost (latency, tokens, downstream API calls).',
          'Failure isolation — one bad step does not poison the workflow; it gets quarantined and routed.',
        ]},
        { type: 'h2', text: 'Why we built our own orchestration runtime' },
        { type: 'p', text: 'We tried existing frameworks. They are excellent for hackathon-scale assembly and fragile at production scale — too many of them collapse the distinction between "the agent" and "the workflow". The orchestrator should be calmer than the agents it runs. It should be the boring, audited piece. The agents bring the intelligence; the runtime brings the discipline.' },
        { type: 'quote', text: 'The agent is the interesting part. The runtime should be the boring part. That asymmetry is what makes this safe to run against real enterprise traffic.' },
        { type: 'h2', text: 'What this unlocks' },
        { type: 'p', text: 'Once orchestration is solid, model substitution becomes a configuration change. New agents plug into existing workflows without rewriting the workflow. Cost optimization moves to where it belongs — at the workflow planner, not in the prompt. And the people running the business get one place to see what the system is doing.' },
        { type: 'p', text: 'That is the foundation under everything we ship.' },
      ],
    },
    tr: {
      title: 'Kurumsal içinde otonom ajanları orkestre etmek',
      excerpt:
        'Kurumsal ölçekte ajan çalıştırmak, model probleminden önce bir workflow problemidir — ve bunu güvenilir kılan orkestrasyon katmanını nasıl kuruyoruz.',
      blocks: [
        { type: 'p', text: 'Kurumsal yapay zeka konuşmalarının büyük çoğunluğu hala modelle başlıyor. Gerçekten canlıya alınabilen bir şey inşa etmenin daha hızlı yolu, workflow ile başlamaktır. Model bir runtime detayıdır — sistem, orkestrasyondur.' },
        { type: 'h2', text: 'Ajanlar fonksiyondur; workflow\'lar programdır' },
        { type: 'p', text: 'Tek bir ajan çağrısı bir fonksiyon çağrısına benzer: giriş, akıl yürütme, çıkış. Yararlı, ama sınırlı. İlginç iş — rezervasyon, mutabakat, eskalasyon, karar — bu çağrıların birden çoğu yeniden denemeleri, kısmi hataları ve eşzamanlı yürütmeyi atlatan bir workflow halinde birleştiğinde ortaya çıkar.' },
        { type: 'p', text: 'Kurumsal sistemlerde "birleştirmek" çok iş yapan bir fiildir. Adımlar arasında kalıcılık, her karar için denetim izi, idempotency, geri alma yolları ve koşu başına maliyeti düşünebilmek demektir. Bu, model mühendisliği değildir. Döngüde bir model olan workflow mühendisliğidir.' },
        { type: 'h2', text: 'Tasarladığımız dört özellik' },
        { type: 'list', items: [
          'Workflow seviyesinde determinizm — bir ajan adımının içinde belirsizliğe izin var, ama workflow tekrar koşumları aynı sonuca yakınsamalı.',
          'Tekrar oynatılabilirlik — geçmiş herhangi bir koşu, doğrulama veya debug için snapshot\'a karşı yeniden çalıştırılabilir.',
          'Gözlemlenebilir maliyet yüzeyi — her adımın ölçülebilir bir maliyeti var (gecikme, token, downstream API çağrıları).',
          'Hata izolasyonu — kötü bir adım workflow\'u zehirlemez; karantinaya alınır ve yönlendirilir.',
        ]},
        { type: 'h2', text: 'Neden kendi orkestrasyon runtime\'ımızı inşa ettik' },
        { type: 'p', text: 'Mevcut framework\'leri denedik. Hackathon ölçeğinde mükemmeller, production ölçeğinde kırılganlar — çoğu "ajan" ile "workflow" arasındaki ayrımı eziyor. Orkestratör, çalıştırdığı ajanlardan daha sakin olmalı. Sıkıcı, denetlenmiş parça o olmalı. Ajanlar zekayı getirir; runtime disiplini getirir.' },
        { type: 'quote', text: 'Ajan ilginç parçadır. Runtime sıkıcı parça olmalı. Bu asimetri, gerçek kurumsal trafiğe karşı çalıştırmayı güvenli kılan şeydir.' },
        { type: 'h2', text: 'Bunun açtıkları' },
        { type: 'p', text: 'Orkestrasyon sağlam olduğunda model değişimi bir konfigürasyon değişikliğine dönüşür. Yeni ajanlar mevcut workflow\'ları yeniden yazmadan takılır. Maliyet optimizasyonu ait olduğu yere — workflow planlayıcıya — taşınır, prompt\'a değil. Ve işi yöneten insanlar sistemin ne yaptığını tek bir yerden görür.' },
        { type: 'p', text: 'Ürettiğimiz her şeyin altındaki temel budur.' },
      ],
    },
  },
  {
    slug: 'enterprise-e-commerce-without-the-seams',
    publishedAt: '2026-04-04',
    readingMinutes: 7,
    category: 'E-commerce',
    categoryTr: 'E-ticaret',
    tags: ['e-commerce', 'integration', 'OMS'],
    en: {
      title: 'Enterprise e-commerce without the seams',
      excerpt:
        'After 100+ enterprise projects, the pattern is clear: e-commerce failures are integration failures dressed in storefront clothing.',
      blocks: [
        { type: 'p', text: 'When an enterprise e-commerce platform breaks under load, the postmortem almost never blames the storefront. It blames the seam between the storefront and the OMS. Or the OMS and the ERP. Or the payment gateway and the order ledger.' },
        { type: 'h2', text: 'The storefront is the smallest part' },
        { type: 'p', text: 'A storefront is a few hundred milliseconds of customer-visible latency on top of a long chain of inventory checks, pricing rules, promotion engines, fraud filters, payment authorizations, and order writes. The chain is the system; the storefront is the part that happens to be on screen.' },
        { type: 'p', text: 'This is why "replatform the storefront" projects so often disappoint. The pain customers feel — slow pages, broken stock, dropped orders — usually lives behind the seams, not in the storefront.' },
        { type: 'h2', text: 'Three integration patterns we keep coming back to' },
        { type: 'list', items: [
          'Outbox-driven sync between OMS and the storefront — never poll, never trust nightly batches.',
          'Idempotent payment-to-order writes with explicit reconciliation jobs running every few minutes.',
          'Marketplace channels as outbound projections of a single source of truth, not parallel realities to keep in sync.',
        ]},
        { type: 'h2', text: 'Why this matters more during campaigns' },
        { type: 'p', text: 'Black Friday does not break new systems. It exposes the seams that were already brittle. Drop days, transfer windows, championship moments — same thing. Campaign engineering is mostly seam engineering, executed under time pressure.' },
        { type: 'quote', text: 'Storefronts get the credit when sales are good and the blame when sales are bad. The integration layer deserves both.' },
        { type: 'h2', text: 'What we ship instead of "another platform"' },
        { type: 'p', text: 'A unified integration runtime: outbox patterns by default, every channel addressed off the same canonical model, observability at the seam level rather than the page level. The storefront still matters — but it gets to be a thin, fast surface on top of a system that knows what is true.' },
      ],
    },
    tr: {
      title: 'Dikişsiz kurumsal e-ticaret',
      excerpt:
        '100+ kurumsal projeden sonra desen net: e-ticaret hataları, mağaza kıyafetiyle gezen entegrasyon hatalarıdır.',
      blocks: [
        { type: 'p', text: 'Bir kurumsal e-ticaret platformu yük altında çöktüğünde postmortem neredeyse hiç mağazayı suçlamaz. Mağaza ile OMS arasındaki dikişi suçlar. Veya OMS ile ERP\'yi. Veya ödeme gateway\'i ile sipariş ledger\'ını.' },
        { type: 'h2', text: 'Mağaza en küçük parça' },
        { type: 'p', text: 'Bir mağaza; stok kontrolleri, fiyatlandırma kuralları, promosyon motorları, fraud filtreleri, ödeme yetkilendirmeleri ve sipariş yazmalarından oluşan uzun bir zincirin üstündeki birkaç yüz milisaniyelik müşteri görünür gecikmedir. Sistem zincirdir; mağaza, ekranda olmayı tutturan parçadır.' },
        { type: 'p', text: '"Mağazayı replatform et" projelerinin sık sık hayal kırıklığı yaratmasının sebebi budur. Müşterinin hissettiği ağrı — yavaş sayfalar, kırık stok, düşen siparişler — genellikle dikişlerin arkasında yaşar, mağazada değil.' },
        { type: 'h2', text: 'Sürekli geri döndüğümüz üç entegrasyon deseni' },
        { type: 'list', items: [
          'OMS ile mağaza arasında outbox-driven sync — asla polling yok, gecelik batch\'lere asla güvenme.',
          'İdempotent ödeme-sipariş yazımı ve birkaç dakikada bir koşan açık mutabakat işleri.',
          'Pazaryeri kanalları, senkronize tutulacak paralel gerçeklikler değil — tek doğru kaynağın dışa projeksiyonları.',
        ]},
        { type: 'h2', text: 'Bunun kampanyalarda neden daha çok önemi var' },
        { type: 'p', text: 'Black Friday yeni sistemleri kırmaz. Zaten kırılgan olan dikişleri açığa çıkarır. Drop günleri, transfer pencereleri, şampiyonluk anları — aynı şey. Kampanya mühendisliği büyük ölçüde, zaman baskısı altında yürütülen dikiş mühendisliğidir.' },
        { type: 'quote', text: 'Satışlar iyi gittiğinde mağaza övgüyü, kötü gittiğinde suçu alır. Entegrasyon katmanı her ikisini de hak ediyor.' },
        { type: 'h2', text: '"Başka bir platform" yerine ne canlıya alıyoruz' },
        { type: 'p', text: 'Birleşik bir entegrasyon runtime\'ı: varsayılan outbox desenleri, her kanal aynı kanonik modelin üzerinden adreslenir, gözlemlenebilirlik sayfa seviyesinde değil dikiş seviyesindedir. Mağaza yine de önemlidir — ama neyin doğru olduğunu bilen bir sistemin üzerinde ince ve hızlı bir yüzey olabilir.' },
      ],
    },
  },
  {
    slug: 'pharma-content-where-compliance-meets-velocity',
    publishedAt: '2026-03-20',
    readingMinutes: 6,
    category: 'Industry',
    categoryTr: 'Sektör',
    tags: ['pharma', 'AI', 'compliance'],
    en: {
      title: 'Pharma content where compliance meets velocity',
      excerpt:
        'Generic AI content tools fail in pharma because compliance is not a filter you bolt on — it is the data model.',
      blocks: [
        { type: 'p', text: 'Pharma marketing teams have two problems consumer brands do not: every claim has to be defensible, and the source of truth is a regulated document, not a marketing brief. Generic AI content tools treat compliance as a filter at the output. That ordering does not survive contact with a real product launch.' },
        { type: 'h2', text: 'Compliance is the data model, not a filter' },
        { type: 'p', text: 'In a regulated category, what you can say about a product is defined by the approved product information — package inserts, label text, regulatory submissions. A generation system that treats these as optional reference material will produce content that sometimes drifts. Sometimes is too often.' },
        { type: 'p', text: 'The Pharma AI architecture inverts this. The approved product information is the primary data structure. Generation is constrained to language the source can defend. The model assists; it does not improvise.' },
        { type: 'h2', text: 'What this means in practice' },
        { type: 'list', items: [
          'Every generated claim links to the source passage it was derived from — by design, not as an afterthought.',
          'Review queues route to humans who can adjudicate the claim, with the source already attached.',
          'Audit trails record what changed and why, end-to-end, for the lifecycle of every piece of content.',
        ]},
        { type: 'quote', text: 'In pharma, "moving fast" without traceability is a regulatory event waiting to happen. The system has to be both fast and provable.' },
        { type: 'h2', text: 'The unlock for content teams' },
        { type: 'p', text: 'Once the data model is right, velocity stops being a tradeoff. Content teams produce more, faster, with less rework — because the system already knows what they are allowed to say and shows them the receipts. Compliance reviewers spend their time on judgment, not on chasing citations.' },
        { type: 'p', text: 'That is the gap a pharma-aware AI platform fills. The model is the same models everyone else is using. The architecture is what makes it shippable in a regulated category.' },
      ],
    },
    tr: {
      title: 'Compliance ve hızın buluştuğu pharma içerik üretimi',
      excerpt:
        'Genel yapay zeka içerik araçları pharma\'da başarısız olur çünkü compliance sonradan eklenen bir filtre değil — veri modelinin kendisidir.',
      blocks: [
        { type: 'p', text: 'Pharma pazarlama ekiplerinin tüketici markalarında olmayan iki sorunu var: her iddia savunulabilir olmalı ve doğruluğun kaynağı bir pazarlama brief\'i değil, regüle edilmiş bir dokümandır. Genel yapay zeka içerik araçları compliance\'ı çıkışta bir filtre olarak ele alır. Bu sıralama gerçek bir ürün lansmanıyla temasta hayatta kalmaz.' },
        { type: 'h2', text: 'Compliance, filtre değil veri modelidir' },
        { type: 'p', text: 'Regüle edilmiş bir kategoride bir ürün hakkında ne söyleyebileceğinizi onaylı ürün bilgisi tanımlar — prospektüsler, etiket metni, ruhsat başvuruları. Bunları opsiyonel referans malzemesi olarak ele alan bir üretim sistemi zaman zaman sürüklenen içerik üretir. "Zaman zaman" çok sıktır.' },
        { type: 'p', text: 'Pharma AI mimarisi bunu tersine çevirir. Onaylı ürün bilgisi birincil veri yapısıdır. Üretim, kaynağın savunabileceği dile sınırlanır. Model yardım eder; doğaçlama yapmaz.' },
        { type: 'h2', text: 'Pratikte bu ne demek' },
        { type: 'list', items: [
          'Üretilen her iddia, türetildiği kaynak pasaja tasarımdan gelen bir bağ kurar — sonradan eklenen değil.',
          'İnceleme kuyrukları iddiayı yargılayabilecek insanlara yönlendirilir; kaynak zaten ekli.',
          'Denetim izleri, her içerik parçasının yaşam döngüsü boyunca neyin neden değiştiğini uçtan uca kaydeder.',
        ]},
        { type: 'quote', text: 'Pharma\'da izlenebilirlik olmadan "hızlı hareket etmek" patlamayı bekleyen bir regülatör olayıdır. Sistem hem hızlı hem kanıtlanabilir olmalı.' },
        { type: 'h2', text: 'İçerik ekipleri için açılan kapı' },
        { type: 'p', text: 'Veri modeli doğru olduğunda hız bir takas olmaktan çıkar. İçerik ekipleri daha fazlasını, daha hızlı, daha az tekrar işlemle üretir — çünkü sistem ne söyleyebilecekleri ne söyleyemeyecekleri zaten bilir ve makbuzları gösterir. Compliance inceleyicileri zamanlarını yargıya harcar, kaynak peşinde koşmaya değil.' },
        { type: 'p', text: 'Pharma-aware bir yapay zeka platformunun doldurduğu boşluk budur. Model, herkesin kullandığıyla aynı modeller. Mimari, regüle bir kategoride canlıya alınabilir olmanın sebebidir.' },
      ],
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
