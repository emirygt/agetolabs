export type FAQItem = {
  q: string;
  qTr: string;
  a: string;
  aTr: string;
};

export type FAQCategory = {
  id: string;
  title: string;
  titleTr: string;
  items: FAQItem[];
};

export const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    title: 'About agetolabs',
    titleTr: 'Agetolabs Hakkında',
    items: [
      {
        q: 'What does agetolabs actually do?',
        qTr: 'Agetolabs tam olarak ne yapıyor?',
        a: 'We design and ship autonomous AI ecosystems for enterprises — sales agents, content studios, e-commerce orchestration. The shared backbone across our products is real systems integration: ERP, CRM, OMS, marketplaces, payment, comms. We turn data into decisions that actually move through your operations.',
        aTr: 'Kurumlar için otonom yapay zeka ekosistemleri tasarlıyor ve canlıya alıyoruz — satış ajanları, içerik stüdyoları, e-ticaret orkestrasyonu. Ürünlerimizin ortak omurgası gerçek sistem entegrasyonu: ERP, CRM, OMS, pazaryeri, ödeme, iletişim. Veriyi, operasyonlarınız içinde gerçekten hareket eden kararlara dönüştürüyoruz.',
      },
      {
        q: 'Who do you typically work with?',
        qTr: 'Genelde kimlerle çalışıyorsunuz?',
        a: 'Mid-market and enterprise companies with real operational complexity — high-traffic e-commerce, omnichannel retail, pharma, marketplaces. If the problem is "we have systems that don\'t talk and processes that need automation", we\'re a fit.',
        aTr: 'Gerçek operasyonel karmaşıklığı olan orta-büyük ölçekli ve kurumsal şirketler — yüksek trafikli e-ticaret, omnichannel perakende, ilaç, pazaryerleri. "Birbiriyle konuşmayan sistemlerimiz ve otomasyonu bekleyen süreçlerimiz var" diyorsanız doğru yerdeyiz.',
      },
      {
        q: 'How is this different from an AI consultancy?',
        qTr: 'Bu bir yapay zeka danışmanlığından nasıl farklı?',
        a: 'We build and operate production systems — not slide decks. Our products run 24/7 against live commercial traffic. We bring an opinionated stack and proven patterns from 100+ enterprise projects across 9+ years, not greenfield exploration.',
        aTr: 'Sunum değil, production sistemleri inşa edip işletiyoruz. Ürünlerimiz 7/24 canlı ticari trafiğe karşı çalışıyor. 100+ kurumsal projede 9+ yıllık birikimden gelen olgun bir stack ve kanıtlanmış desenler getiriyoruz, sıfırdan keşif değil.',
      },
    ],
  },
  {
    id: 'products',
    title: 'Products & capabilities',
    titleTr: 'Ürünler ve Yetenekler',
    items: [
      {
        q: 'Can your AI agents integrate with our existing ERP/CRM?',
        qTr: 'Yapay zeka ajanlarınız mevcut ERP/CRM\'mize entegre olabilir mi?',
        a: 'Yes — that\'s the point. Agento Company Flow ships with pre-built connectors for SAP, Microsoft Dynamics, Salesforce, NetSuite and 50+ enterprise systems. For non-standard systems, we build the connector during onboarding.',
        aTr: 'Evet — zaten asıl mesele bu. Agento Company Flow; SAP, Microsoft Dynamics, Salesforce, NetSuite ve 50+ kurumsal sistem için hazır konektörlerle geliyor. Standart olmayan sistemler için konektörü onboarding aşamasında biz inşa ediyoruz.',
      },
      {
        q: 'How does WhatsApp Sales Automation handle customer privacy?',
        qTr: 'WhatsApp Sales Automation müşteri gizliliğini nasıl yönetiyor?',
        a: 'It runs on the official WhatsApp Business API, with opt-in flows and message templates approved per WhatsApp\'s policy. Customer data is stored region-locally, and you control retention and deletion policies. KVKK and GDPR alignment is built into the data layer, not bolted on.',
        aTr: 'Resmi WhatsApp Business API üzerinde çalışıyor — opt-in akışları ve WhatsApp politikasına göre onaylanmış mesaj şablonlarıyla. Müşteri verisi bölge-yerel saklanır, saklama ve silme politikalarını siz kontrol edersiniz. KVKK ve GDPR uyumu, sonradan eklenen değil, veri katmanında yerleşik.',
      },
      {
        q: 'Do products run on your cloud or ours?',
        qTr: 'Ürünler sizin bulutunuzda mı bizim bulutumuzda mı çalışıyor?',
        a: 'Both options exist. We default to a managed cloud deployment for speed, but enterprise customers regularly run on-prem or in their own VPC — that\'s a first-class deployment mode, not an afterthought.',
        aTr: 'İki seçenek de var. Hızlı başlangıç için varsayılan olarak yönetimli bulut deploy ediyoruz, ama kurumsal müşteriler düzenli olarak on-prem veya kendi VPC\'lerinde çalıştırıyor — sonradan eklenen değil, birinci sınıf deploy modu.',
      },
      {
        q: 'How quickly can a pilot go live?',
        qTr: 'Bir pilot ne kadar sürede canlıya alınır?',
        a: 'Most pilots are scoped to ship within 4–6 weeks. The variable is integration depth — connecting a clean SaaS API is days, integrating with a heavily customized ERP is weeks. We\'ll tell you which one you are after the first scoping call.',
        aTr: 'Pilotların büyük çoğunluğu 4-6 hafta içinde canlıya alınacak şekilde kapsamlanır. Değişken, entegrasyon derinliği — temiz bir SaaS API\'sine bağlanmak günler, ağır özelleştirilmiş bir ERP\'ye entegre olmak haftalardır. İlk kapsam görüşmesinden sonra hangisi olduğunuzu söyleyeceğiz.',
      },
    ],
  },
  {
    id: 'engagement',
    title: 'Working with us',
    titleTr: 'Bizimle Çalışmak',
    items: [
      {
        q: 'How do projects typically start?',
        qTr: 'Projeler genelde nasıl başlıyor?',
        a: 'A 30–45 minute discovery call to understand the system landscape and the operational pain. We follow up with a written one-pager — scope, milestones, integration risk, and a fixed-cost pilot proposal. No long preamble.',
        aTr: '30-45 dakikalık bir keşif görüşmesi: sistem manzarasını ve operasyonel ağrıyı anlıyoruz. Ardından yazılı bir tek-sayfa gönderiyoruz — kapsam, kilometre taşları, entegrasyon riski ve sabit maliyetli pilot teklifi. Uzun girizgah yok.',
      },
      {
        q: 'Do you offer fixed pricing or time-and-materials?',
        qTr: 'Sabit fiyat mı, time-and-materials mi sunuyorsunuz?',
        a: 'Pilots are almost always fixed-price — that\'s how risk should sit on us, not you. Ongoing platform operation is typically a monthly engagement scaled to traffic and feature scope. We avoid open-ended T&M arrangements where possible.',
        aTr: 'Pilotlar neredeyse her zaman sabit fiyat — risk sizde değil bizde olmalı. Sürekli platform operasyonu genelde trafik ve özellik kapsamına göre ölçeklenen aylık angajmandır. Mümkün olduğunda açık uçlu T&M anlaşmalarından kaçınıyoruz.',
      },
      {
        q: 'What does post-launch operation look like?',
        qTr: 'Lansman sonrası operasyon nasıl işliyor?',
        a: 'You get an SLA, a named technical contact, monitoring dashboards, and a monthly operations review. We treat post-launch as the actual product — pilot is the prologue.',
        aTr: 'Bir SLA, isim verilmiş bir teknik kontak, izleme panelleri ve aylık operasyon değerlendirmesi alıyorsunuz. Lansman sonrasını gerçek ürün olarak ele alıyoruz — pilot, önsözden ibaret.',
      },
      {
        q: 'Who owns the IP and the data?',
        qTr: 'IP ve veri kimde kalıyor?',
        a: 'You own your data — full stop. Custom code we write for your project is delivered to you. Our underlying platform components stay ours, licensed to you for the engagement\'s lifetime. We make this contractually explicit, not a gentleman\'s agreement.',
        aTr: 'Veriyi siz sahipleniyorsunuz — nokta. Projeniz için yazdığımız özel kod size teslim edilir. Altta yatan platform bileşenleri bizde kalır, angajman süresince size lisanslanır. Bunu sözleşmede açıkça yazıyoruz, beyefendi anlaşmasıyla bırakmıyoruz.',
      },
    ],
  },
];
