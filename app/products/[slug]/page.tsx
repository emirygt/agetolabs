'use client';

import { topCards, bottomCards } from '@/constants/products';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';
import { use } from 'react';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const allProducts = [...topCards, ...bottomCards];
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const { t, lang } = useLanguage();
  const IconComponent = (Icons as any)[product.icon] || Icons.Box;
  const name = lang === 'tr' && product.nameTr ? product.nameTr : product.name;
  const description = lang === 'tr' && product.descriptionTr ? product.descriptionTr : product.description;

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-purple-500/30 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-16 relative z-10 max-w-[1200px] mx-auto px-8 w-full">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-12 transition-colors">
          <Icons.ArrowLeft size={16} className="mr-2" />
          {t('backToHome')}
        </Link>

        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <div className={`w-20 h-20 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-8 border border-white/10 ${product.iconColor}`}>
              <IconComponent size={40} strokeWidth={1.5} />
            </div>
            
            <h1 className="text-6xl font-bold tracking-tight mb-6">
              {slug === 'agento-struct-editor' 
                ? <span className="text-4xl md:text-5xl lg:text-5xl leading-tight">Etkinlik İçeriklerini Dakikalar İçinde Üreten Yapay Zeka Stüdyosu</span>
                : slug === 'agento-pharm-ia'
                ? <span className="text-4xl md:text-5xl lg:text-5xl leading-tight">İlaç ve Takviye Gıda İçeriklerini Daha Hızlı, Daha Doğru ve Daha Etkili Yönetin</span>
                : slug === 'agento-eczaport'
                ? <span className="text-4xl md:text-5xl lg:text-5xl leading-tight">Eczaneler Arası Ortak Alım ve Takası Tek Platformda Yönetin</span>
                : slug === 'agento-wh-sales'
                ? <span className="text-4xl md:text-5xl lg:text-5xl leading-tight">WhatsApp'ı Akıllı Sipariş ve Satış Dönüşüm Motoruna Çevirin</span>
                : slug === 'agento-otonom-agent'
                ? <span className="text-4xl md:text-5xl lg:text-5xl leading-tight">E-Ticaretiniz İçin 7/24 Çalışan Otonom Yapay Zeka Dijital Pazarlama Uzmanı</span>
                : name}
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              {slug === 'agento-struct-editor' 
                ? "Structa AI; metin, görsel, SEO ve performans analizini tek akışta birleştirerek içerik üretim sürecini hızlandırır, marka tutarlılığını korur ve ekiplerin manuel iş yükünü ciddi biçimde azaltır."
                : slug === 'agento-pharm-ia'
                ? "Pharma AI; ilaç ve takviye gıda ürünleri için metin üretimi, görsel oluşturma ve ürün analizi süreçlerini tek platformda birleştirir. Ekiplerin içerik üretim süresini kısaltır, ürün bilgisini daha düzenli sunar ve karar alma süreçlerini hızlandırır."
                : slug === 'agento-eczaport'
                ? "Eczaport; eczanelerin ortak alım, takas, sevkiyat, cari hesap ve güven skorlaması süreçlerini tek merkezde birleştiren B2B platformdur. Operasyonel karmaşayı azaltır, iş birliğini kolaylaştırır ve ticari akışı hızlandırır."
                : slug === 'agento-wh-sales'
                ? "WhatsApp kanalınızı uçtan uca yöneten, müşteri iletişimini otomatikleştiren ve sipariş süreçlerini hızlandıran yapay zeka destekli satış asistanınızla tanışın. Sadece yanıt vermez, satışa dönüştürür."
                : slug === 'agento-otonom-agent'
                ? "Otonom Ajanı, Türkiye'deki e-ticaret KOBİ'leri için özel olarak geliştirilmiş otonom bir yapay zeka pazarlama ajanıdır. Google Analytics 4 ve Google Ads hesaplarınıza saniyeler içinde bağlanır, kampanya performansınızı gerçek zamanlı izler ve siz uyurken bile verileri analiz ederek aksiyona döner."
                : `${description}. ${t('productDescSuffix')}`}
            </p>

            {slug === 'agento-struct-editor' && (
              <p className="text-[#8EF0B5] font-semibold text-lg tracking-wide mb-8">
                Daha az operasyon. Daha hızlı içerik. Daha güçlü marka dili.
              </p>
            )}

            {slug === 'agento-pharm-ia' && (
              <p className="text-[#8EF0B5] font-semibold text-lg tracking-wide mb-8">
                İçerik üretin. Görsel oluşturun. Ürünü analiz edin.<br/>Hepsi tek ekranda.
              </p>
            )}

            {slug === 'agento-eczaport' && (
              <p className="text-[#8EF0B5] font-semibold text-lg tracking-wide mb-8">
                Birlikte alın. Akıllıca takas edin. Güvenle yönetin.
              </p>
            )}

            {slug === 'agento-wh-sales' && (
              <p className="text-[#8EF0B5] font-semibold text-lg tracking-wide mb-8">
                Daha hızlı dönüş. Daha yüksek verim. Orantısız satış gücü.
              </p>
            )}

            {slug === 'agento-otonom-agent' && (
              <p className="text-[#8EF0B5] font-semibold text-lg tracking-wide mb-8">
                Reklam bütçeni boşa harcama.
              </p>
            )}

            <div className="flex gap-4">
              <button className="h-12 inline-flex items-center justify-center rounded-full bg-[#8EF0B5] px-8 text-base font-semibold text-black hover:bg-[#8EF0B5]/90 transition-all shadow-[0_0_20px_rgba(110,231,183,0.3)]">
                {['agento-pharm-ia', 'agento-eczaport', 'agento-wh-sales', 'agento-otonom-agent'].includes(slug) ? 'Demo Talep Et' : t('requestDemo')}
              </button>
              <button className="h-12 inline-flex items-center justify-center rounded-full bg-white/10 px-8 text-base font-semibold text-white hover:bg-white/20 transition-all">
                {slug === 'agento-pharm-ia' ? 'Ürünü İncele' : slug === 'agento-eczaport' ? 'Platformu İncele' : ['agento-wh-sales', 'agento-otonom-agent'].includes(slug) ? 'Detayları İncele' : t('documentation')}
              </button>
            </div>

            {slug === 'agento-eczaport' && (
              <div className="mt-12 border-t border-white/10 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Icons.Star className="text-[#8EF0B5]" size={20} />
                  Kapsamlı B2B Platform Özellikleri
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/5 hover:border-[#8EF0B5]/30 hover:bg-white/[0.05] transition-all group">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Icons.ShoppingCart size={16} className="text-purple-400 group-hover:scale-110 transition-transform" /> 
                      Ortak Alım & Takas
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Eczaneler arası kârlı ürün havuzu yönetimi ve son kullanma tarihi yaklaşan (Miadı Yakın) ürünler için takas pazarı.
                    </p>
                  </div>
                  <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/5 hover:border-[#8EF0B5]/30 hover:bg-white/[0.05] transition-all group">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Icons.ShieldCheck size={16} className="text-[#8EF0B5] group-hover:scale-110 transition-transform" /> 
                      Güven Skoru
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Platform içi ticaret dinamiğini koruyan yapay zeka destekli Trust Score sistemi ve eczane liderlik tablosu.
                    </p>
                  </div>
                  <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/5 hover:border-[#8EF0B5]/30 hover:bg-white/[0.05] transition-all group">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Icons.Truck size={16} className="text-blue-400 group-hover:scale-110 transition-transform" /> 
                      Entegre Lojistik
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Eczane içi görevlendirme, özel şoför paneli (Görev Listesi) ve uçtan uca sevkiyat durumu takibi.
                    </p>
                  </div>
                  <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/5 hover:border-[#8EF0B5]/30 hover:bg-white/[0.05] transition-all group">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Icons.BrainCircuit size={16} className="text-orange-400 group-hover:scale-110 transition-transform" /> 
                      Akıllı Yönetim
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      AI destekli akıllı ürün talebi önerileri (Intelligence), Cari Hesap takibi, Gruplar ve DM Chat modülleri.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative h-[500px] rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 flex items-center justify-center overflow-hidden">
            {/* Abstract background glow for product */}
            <div className={`absolute inset-0 opacity-20 blur-[100px] ${
              product.glow === 'purple' ? 'bg-purple-500' : 
              product.glow === 'green' ? 'bg-[#8EF0B5]' : 
              'bg-blue-500'
            }`}></div>
            
            <IconComponent size={160} strokeWidth={0.5} className={`relative z-10 opacity-50 ${product.iconColor}`} />
          </div>
        </div>

        {/* --- STRUCTA AI EXTENDED SECTION --- */}
        {slug === 'agento-struct-editor' && (
          <div className="mt-24 space-y-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* 2) Stats / Trust Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-b from-white/[0.05] to-transparent p-8 rounded-3xl border border-white/10 text-center">
                <div className="text-5xl font-bold text-[#8EF0B5] mb-2">%80</div>
                <div className="text-gray-400 font-medium">Daha Az İş Yükü</div>
              </div>
              <div className="bg-gradient-to-b from-white/[0.05] to-transparent p-8 rounded-3xl border border-white/10 text-center">
                <div className="text-5xl font-bold text-purple-400 mb-2">15x</div>
                <div className="text-gray-400 font-medium">Daha Hızlı İçerik Üretimi</div>
              </div>
              <div className="bg-gradient-to-b from-white/[0.05] to-transparent p-8 rounded-3xl border border-white/10 text-center">
                <div className="text-5xl font-bold text-blue-400 mb-2">%100</div>
                <div className="text-gray-400 font-medium">Marka Tutarlılığı</div>
              </div>
            </div>

            {/* 3 & 4) Structa AI Nedir & Değer Önerisi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Structa AI Nedir?</h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Structa AI, etkinlik yönetimi ve içerik üretimini uçtan uca otomatize eden yapay zeka destekli bir content studio’dur. İçerik ekiplerinin metin yazımı, görsel üretimi, SEO optimizasyonu ve performans takibi için farklı araçlar arasında dağılmasına gerek kalmadan; tüm süreci tek merkezden yönetmesini sağlar.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Editörlerin Yerini Almaz.<br/><span className="text-purple-400">Onlara Süper Güç Verir.</span></h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Structa AI’ın amacı insanı sistemden çıkarmak değil, içerik ekiplerini daha güçlü hale getirmektir. Tekrarlayan işleri otomatikleştirir, üretim hızını artırır, kaliteyi standardize eder ve kararları veriyle destekler. Böylece ekipler daha kısa sürede daha fazla ve daha etkili içerik üretebilir.
                </p>
              </div>
            </div>

            {/* 5) Feature Cards */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Studio Özellikleri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                    <Icons.PenTool className="text-purple-400" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Metin Stüdyosu</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Etkinlik adı, sanatçı ve mekan bilgilerini girin; hedef kitlenize ve marka tonunuza uygun açıklamalar saniyeler içinde hazır olsun. Gen Z, premium, enerjik veya hikâye odaklı tonlarla farklı kitlelere özel içerikler üretin.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-[#8EF0B5]/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#8EF0B5]/20 flex items-center justify-center mb-6">
                    <Icons.Image className="text-[#8EF0B5]" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Görsel Stüdyosu</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Sinematikten minimalist tarza kadar farklı sanat stillerinde poster ve sosyal medya görselleri üretin. Kare, yatay, dikey, klasik ve portre formatlarında tek tıkla yaratıcı varyasyonlar alın.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-blue-400/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-400/20 flex items-center justify-center mb-6">
                    <Icons.Search className="text-blue-400" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">SEO ve Performans</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Üretilen içeriklerin SEO skorunu anlık görün, iyileştirme önerileri alın ve farklı versiyonları karşılaştırarak en yüksek performanslı içeriği seçin.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-orange-400/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-orange-400/20 flex items-center justify-center mb-6">
                    <Icons.BarChart3 className="text-orange-400" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Ürün ve İçerik Analizi</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Bilet satışı, tıklama, dönüşüm ve ilgi trendlerini izleyin. İçerik kararlarını sezgiyle değil, gerçek zamanlı verilerle verin.
                  </p>
                </div>
              </div>
            </div>

            {/* 6 & 7) Neden Structa AI + Teknik Güven */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0B0C10] to-[#12151C] border border-white/10 p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full"></div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Neden Structa AI?</h2>
                  <div className="space-y-6 text-gray-400 leading-relaxed">
                    <p>
                      Çünkü içerik üretiminde asıl sorun sadece hız değil. Dağınık süreçler, tutarsız marka dili, düşük SEO kalitesi ve ölçülemeyen performans gerçek darboğazı oluşturur. Structa AI bu dört sorunu aynı anda çözer.
                    </p>
                    <p>
                      Geleneksel süreçlerde saatler süren metin, görsel ve optimizasyon çalışmaları; Structa AI ile dakikalar içinde tamamlanır. Ekipler daha az tekrar işi yapar, daha çok stratejiye odaklanır.
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Güvenilir, Doğrulanmış ve Modern AI Altyapısı</h2>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    Structa AI; gelişmiş dil ve görüntü modelleri, Türkçe ve yerel bağlama uygun optimizasyon, grounding tabanlı doğrulama yapısı ve versiyon kontrol sistemi ile çalışır. Bu sayede hem yaratıcı hem de daha güvenilir içerik üretimi sunar.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-white font-medium">
                      <Icons.CheckCircle2 className="text-[#8EF0B5]" size={20} /> Gerçek zamanlı doğrulama
                    </li>
                    <li className="flex items-center gap-3 text-white font-medium">
                      <Icons.CheckCircle2 className="text-[#8EF0B5]" size={20} /> Versiyon arşivleme ve geri alma
                    </li>
                    <li className="flex items-center gap-3 text-white font-medium">
                      <Icons.CheckCircle2 className="text-[#8EF0B5]" size={20} /> Mobil ve masaüstü uyumlu kullanım
                    </li>
                    <li className="flex items-center gap-3 text-white font-medium">
                      <Icons.CheckCircle2 className="text-[#8EF0B5]" size={20} /> Mevcut iş akışlarına kolay entegrasyon
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 8) Final CTA */}
            <div className="text-center max-w-3xl mx-auto pb-12">
              <h2 className="text-4xl font-bold text-white mb-6">Etkinlik İçerik Sürecinizi Yapay Zeka ile Güçlendirin</h2>
              <p className="text-xl text-gray-400 mb-10">
                Metin üretiminden görsel tasarıma, SEO optimizasyonundan performans analizine kadar tüm içerik akışınızı tek platformda yönetin. Structa AI ile daha hızlı üretin, daha tutarlı yayın yapın, daha iyi sonuç alın.
              </p>
              <button className="h-14 inline-flex items-center justify-center rounded-full bg-white px-10 text-lg font-bold text-black hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Kendiniz Deneyin — Demo Talep Et
              </button>
            </div>
            
          </div>
        )}

        {/* --- PHARMA AI EXTENDED SECTION --- */}
        {slug === 'agento-pharm-ia' && (
          <div className="mt-24 space-y-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* 2 & 3) Pharma AI Nedir & Değer Önerisi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Pharma AI Nedir?</h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Pharma AI, ilaç ve takviye gıda kategorisine özel geliştirilmiş yapay zeka destekli bir içerik ve analiz platformudur. Ürün açıklamaları, tanıtım metinleri ve görseller üretirken; aynı zamanda ürünlerin endikasyon, kontrendikasyon, doz bilgisi, geri ödeme durumu ve pazar konumlandırmasını daha hızlı değerlendirmeyi sağlar.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Genel AI Aracı Değil.<br/><span className="text-[#8EF0B5]">Sağlık ve Eczane Dünyasına Özel Bir Çalışma Katmanı.</span></h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Pharma AI, herkes için yapılmış genel üretken yapay zeka araçlarından farklıdır. İlaç ve takviye gıda odaklı yapı sayesinde ekipler; ürün içeriklerini oluştururken, analizlerini değerlendirirken ve görsel materyallerini hazırlarken daha odaklı, daha hızlı ve daha düzenli çalışır.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"><Icons.TrendingDown size={14} className="text-[#8EF0B5]"/> Daha az manuel iş</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"><Icons.Zap size={14} className="text-yellow-400"/> Daha hızlı içerik akışı</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"><Icons.ShieldCheck size={14} className="text-blue-400"/> Daha güçlü ürün anlatımı</span>
                </div>
              </div>
            </div>

            {/* 4) Feature Cards */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Ana Modüller</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-[#8EF0B5]/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#8EF0B5]/20 flex items-center justify-center mb-6">
                    <Icons.PenTool className="text-[#8EF0B5]" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Metin Stüdyosu</h3>
                  <p className="text-gray-400 leading-relaxed">
                    İlaç ve takviye gıda ürünleri için açıklama metinleri, ürün tanıtımları, katalog içerikleri ve satış destek metinleri saniyeler içinde oluşturun. Marka tonuna uygun, düzenli ve ölçeklenebilir içerik üretin.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-purple-400/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-purple-400/20 flex items-center justify-center mb-6">
                    <Icons.Image className="text-purple-400" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Görsel Stüdyosu</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Ürün tanıtımı, kampanya kullanımı ve dijital sunumlar için sağlık kategorisine uygun görseller üretin. Farklı formatlarda hızlı varyasyonlar oluşturarak ekiplerin tasarım yükünü azaltın.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-blue-400/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-400/20 flex items-center justify-center mb-6">
                    <Icons.Activity className="text-blue-400" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">İlaç Analizi</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Ürünlere ait temel bilgileri daha net görüntüleyin. Endikasyonlar, kontrendikasyonlar, doz bilgileri, fiyat, geri ödeme ve hasta katkısı gibi alanları düzenli bir yapıda değerlendirin.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-orange-400/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-orange-400/20 flex items-center justify-center mb-6">
                    <Icons.PieChart className="text-orange-400" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">AI Pazar Analizi</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Ürünün pazardaki konumunu daha hızlı yorumlayın. Rakip görünümü, stok yaklaşımı, eczane içgörüleri ve ürünün ticari potansiyeli konusunda karar destek katmanı oluşturun.
                  </p>
                </div>
              </div>
            </div>

            {/* 6) İlaç analizi özel alan */}
            <div className="rounded-3xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 p-12 relative overflow-hidden flex flex-col items-center text-center">
              <Icons.Microscope size={48} className="text-blue-400 mb-6 opacity-30 absolute top-12 left-12" />
              <Icons.Activity size={48} className="text-purple-400 mb-6 opacity-30 absolute bottom-12 right-12" />
              <div className="max-w-3xl relative z-10">
                <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold tracking-wider uppercase mb-6 inline-block">Özel Modül</span>
                <h2 className="text-4xl font-bold text-white mb-6">Ürünü Sadece Listelemeyin, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Yorumlayın</span></h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Pharma AI'ın İlaç Analizi modülü; ürünle ilgili kritik bilgileri tek ekranda toplar. Temel ürün bilgileri, geri ödeme durumu, fiyat yapısı, endikasyonlar, kontrendikasyonlar ve doz bilgileri sade bir panel üzerinden görüntülenebilir. Böylece bilgiye ulaşmak için dağınık kaynaklar arasında dolaşmak yerine, ekipler daha hızlı değerlendirme yapabilir.
                </p>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-left flex gap-4 items-start">
                  <Icons.Info className="text-blue-400 shrink-0" size={24} />
                  <p className="text-base text-gray-400">
                    Bunun üzerine eklenen AI destekli pazar analizi katmanı ile ürünün ticari konumu, rakip görünümü ve stok yaklaşımı gibi başlıklar daha stratejik şekilde ele alınabilir.
                  </p>
                </div>
              </div>
            </div>

            {/* 5) Nasıl Çalışır */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Tek Bir Akışta İçerik ve Analiz</h2>
              <div className="flex flex-col lg:flex-row justify-between gap-6 relative">
                {/* Connecting Line */}
                <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[#8EF0B5]/30 to-transparent z-0"></div>
                
                {[
                  { title: "1. Ürünü Seçin", desc: "İlaç veya takviye gıda ürününü sisteme girin ya da aratın.", icon: Icons.Search },
                  { title: "2. İçeriği Üretin", desc: "Tanıtım metinleri, açıklamalar ve ihtiyaç duyulan varyasyonları oluşturun.", icon: Icons.FileText },
                  { title: "3. Görselleri Hazırlayın", desc: "Ürüne uygun görsel setleri üretin ve kullanım alanına göre çeşitlendirin.", icon: Icons.ImageIcon },
                  { title: "4. Analizi İnceleyin", desc: "Ürünün endikasyon, kontrendikasyon, doz ve pazar bilgisini derli toplu görün.", icon: Icons.Activity },
                  { title: "5. Daha Hızlı Karar Alın", desc: "İçerik, ürün bilgisi ve ticari yorumlamayı aynı panelde birleştirin.", icon: Icons.Zap }
                ].map((step, i) => (
                  <div key={i} className="flex-1 relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#0B0C10] border border-[#8EF0B5]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(142,240,181,0.1)]">
                      <step.icon className="text-[#8EF0B5]" size={32} />
                    </div>
                    <h4 className="text-white font-bold mb-3">{step.title}</h4>
                    <p className="text-sm text-gray-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7) Hedef Kitle */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Kimler İçin Uygun?</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl text-center hover:bg-white/[0.05] transition-all">
                  <div className="mx-auto w-12 h-12 rounded-full bg-[#8EF0B5]/10 flex items-center justify-center mb-4">
                    <Icons.Store className="text-[#8EF0B5]" size={20}/>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">Eczaneler</h4>
                  <p className="text-sm text-gray-400">Ürünleri daha hızlı değerlendirmek, ekip içi bilgi akışını güçlendirmek ve satış destek içeriklerini hızlandırmak isteyen yapılar için.</p>
                </div>
                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl text-center hover:bg-white/[0.05] transition-all">
                  <div className="mx-auto w-12 h-12 rounded-full bg-purple-400/10 flex items-center justify-center mb-4">
                    <Icons.Package className="text-purple-400" size={20}/>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">Takviye Gıda Markaları</h4>
                  <p className="text-sm text-gray-400">Ürün tanıtım içeriklerini ve görsellerini daha verimli üretmek isteyen markalar için.</p>
                </div>
                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl text-center hover:bg-white/[0.05] transition-all">
                  <div className="mx-auto w-12 h-12 rounded-full bg-blue-400/10 flex items-center justify-center mb-4">
                    <Icons.PenTool className="text-blue-400" size={20}/>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">Sağlık İçerik Ekipleri</h4>
                  <p className="text-sm text-gray-400">Tekrarlayan içerik üretimini hızlandırmak ve ürün bazlı çalışmayı standartlaştırmak isteyen ekipler için.</p>
                </div>
                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl text-center hover:bg-white/[0.05] transition-all">
                  <div className="mx-auto w-12 h-12 rounded-full bg-orange-400/10 flex items-center justify-center mb-4">
                    <Icons.Users className="text-orange-400" size={20}/>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">Distribütör & Ürün Ekipleri</h4>
                  <p className="text-sm text-gray-400">Ürün bilgisini, içerik üretimini ve pazar yorumlamasını tek çatı altında görmek isteyen ekipler için.</p>
                </div>
              </div>
            </div>

            {/* 8) Neden Pharma AI */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Neden Pharma AI?</h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  Çünkü sağlık ve ürün içerikleri rastgele üretilecek içerikler değildir. Bu alanda hız kadar düzen, doğruluk, okunabilirlik ve ürün bazlı çalışma disiplini gerekir. Pharma AI tam olarak bu ihtiyaca odaklanır: içerik üretimini hızlandırır, görsel hazırlığını kolaylaştırır ve ürün analizini daha erişilebilir hale getirir.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                      <Icons.Check className="text-[#8EF0B5]" size={14} />
                    </div>
                    <span className="text-white font-medium">İlaç ve takviye gıda odaklı yapı</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                      <Icons.Check className="text-[#8EF0B5]" size={14} />
                    </div>
                    <span className="text-white font-medium">Metin ve görsel üretimini tek panelde toplama</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                      <Icons.Check className="text-[#8EF0B5]" size={14} />
                    </div>
                    <span className="text-white font-medium">Ürün analizini sadeleştirme</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                      <Icons.Check className="text-[#8EF0B5]" size={14} />
                    </div>
                    <span className="text-white font-medium">Ekiplerin operasyonel yükünü azaltma & Hızlı ürün iletişimi</span>
                  </div>
                </div>
              </div>
              <div className="relative h-full min-h-[400px] rounded-3xl border border-white/10 bg-white/[0.02] flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 opacity-20 blur-[100px] bg-[#8EF0B5]"></div>
                 <Icons.FlaskConical size={160} strokeWidth={0.5} className="relative z-10 opacity-30 text-[#8EF0B5]" />
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center max-w-4xl mx-auto pb-12 pt-12 mt-12 border-t border-white/10">
              <h2 className="text-4xl font-bold text-white mb-6">Pharma AI ile İlaç ve Takviye Gıda Süreçlerini Yapay Zeka ile Güçlendirin</h2>
              <p className="text-xl text-gray-400 mb-10">
                Pharma AI, ilaç ve takviye gıda ürünleri için içerik üretimi, görsel oluşturma ve ürün analizi süreçlerini tek platformda toplayan yapay zeka destekli bir çözümdür. Ürün açıklamalarından görsellere, kullanım bilgilerinden pazar analizine kadar ekiplerin ihtiyaç duyduğu temel akışı sadeleştirir. Böylece daha az manuel iş yüküyle daha hızlı, daha düzenli ve daha güçlü ürün iletişimi kurulur.
              </p>
              <button className="h-14 inline-flex items-center justify-center rounded-full bg-[#8EF0B5] px-10 text-lg font-bold text-black hover:bg-[#8EF0B5]/90 transition-all shadow-[0_0_30px_rgba(142,240,181,0.3)]">
                Demo Talep Et
              </button>
            </div>
            
          </div>
        )}

        {/* --- ECZAPORT EXTENDED SECTION --- */}
        {slug === 'agento-eczaport' && (
          <div className="mt-24 space-y-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* 2 & 3) Eczaport Nedir & Değer Önerisi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Eczaport Nedir?</h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Eczaport, eczanelerin bir araya gelerek daha güçlü satın alma yapabildiği, stoklarını değerlendirebildiği ve sevkiyat süreçlerini daha düzenli yönetebildiği B2B SaaS platformudur. Ortak alım, takas pazarı, ön talep toplama, sevkiyat takibi ve güven skoru gibi modülleri tek panelde sunar.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Sadece Listeleme Değil,<br/><span className="text-[#8EF0B5]">Eczaneler Arası Ticaretin Operasyon Sistemi</span></h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Eczaport’un amacı yalnızca ürün göstermek değil; eczaneler arasındaki ticari akışı daha kontrollü, daha şeffaf ve daha verimli hale getirmektir. Ortak alımı kolaylaştırır, takası düzenler, cari yapıyı görünür kılar ve sevkiyat sürecini takip edilebilir hale getirir.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"><Icons.TrendingUp size={14} className="text-[#8EF0B5]"/> Daha güçlü alım gücü</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"><Icons.Box size={14} className="text-yellow-400"/> Daha kontrollü stok akışı</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"><Icons.ShieldCheck size={14} className="text-blue-400"/> Daha güvenli iş birliği</span>
                </div>
              </div>
            </div>

            {/* 4) Feature Cards - 6 Cards */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Ana Modüller</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-[#8EF0B5]/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#8EF0B5]/20 flex items-center justify-center mb-6">
                    <Icons.Users className="text-[#8EF0B5]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Ortak Alım</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Eczanelerin bir araya gelerek daha avantajlı koşullarla ürün temin etmesini sağlayan ortak alım yapısı. Grup bazlı satın alma süreçlerini daha verimli hale getirir.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-purple-400/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-purple-400/20 flex items-center justify-center mb-6">
                    <Icons.Repeat className="text-purple-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Takas Pazarı</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Fazla stok, ihtiyaç fazlası ürünler ve miadı yaklaşan ürünler için eczaneler arası kontrollü takas akışı oluşturur.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-blue-400/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-400/20 flex items-center justify-center mb-6">
                    <Icons.Truck className="text-blue-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Sevkiyat Yönetimi</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Oluşturulan gönderileri takip etmeyi, teslim süreçlerini izlemeyi ve operasyonel akışı merkezi olarak yönetmeyi kolaylaştırır.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-orange-400/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-orange-400/20 flex items-center justify-center mb-6">
                    <Icons.Wallet className="text-orange-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Cari Hesap</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Bakiye ve hareketleri daha net takip etmeyi sağlar. Platform içi ticari ilişkinin finansal tarafını görünür hale getirir.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-pink-400/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-pink-400/20 flex items-center justify-center mb-6">
                    <Icons.Shield className="text-pink-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Güven Skoru</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Eczaneler arası iş yaparken güven unsurunu güçlendiren skor yapısı ile daha sağlıklı ticari ilişki kurulmasına destek olur.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center mb-6">
                    <Icons.Lightbulb className="text-cyan-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Akıllı Talep ve Öneriler</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Talep toplama, ürün eşleştirme ve iş birliği fırsatlarını daha görünür hale getiren akıllı yönlendirme katmanı sunar.
                  </p>
                </div>
              </div>
            </div>

            {/* 5) Nasıl Çalışır */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Eczaneler Arası Ticaretin Daha Düzenli Hali</h2>
              <div className="flex flex-col lg:flex-row justify-between gap-6 relative">
                {/* Connecting Line */}
                <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[#8EF0B5]/30 to-transparent z-0"></div>
                
                {[
                  { title: "1. Eczaneler Katılır", desc: "Üyeler sisteme dahil olur ve operasyon alanlarını oluşturur.", icon: Icons.Store },
                  { title: "2. Gruplar Kurulur", desc: "Ortak alım grupları oluşturarak satın alma gücü birleştirilir.", icon: Icons.Users },
                  { title: "3. Takas Yönetilir", desc: "İhtiyaç fazlası ürünler ve ön talepler tek panelde takip edilir.", icon: Icons.Repeat },
                  { title: "4. Finans ve Sevkiyat", desc: "Gönderiler, teslim süreçleri ve cari hareketler düzenli izlenir.", icon: Icons.Truck },
                  { title: "5. Güvenli Ticaret", desc: "Skorlama ve işlem geçmişi sayesinde daha kontrollü iş birliği.", icon: Icons.ShieldCheck }
                ].map((step, i) => (
                  <div key={i} className="flex-1 relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#0B0C10] border border-[#8EF0B5]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(142,240,181,0.1)]">
                      <step.icon className="text-[#8EF0B5]" size={32} />
                    </div>
                    <h4 className="text-white font-bold mb-3">{step.title}</h4>
                    <p className="text-sm text-gray-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7) Hedef Kitle */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Kimler İçin Uygun?</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl text-center hover:bg-white/[0.05] transition-all">
                  <div className="mx-auto w-12 h-12 rounded-full bg-[#8EF0B5]/10 flex items-center justify-center mb-4">
                    <Icons.Store className="text-[#8EF0B5]" size={20}/>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">Bağımsız Eczaneler</h4>
                  <p className="text-sm text-gray-400">Daha güçlü satın alma yapmak ve stoklarını daha verimli yönetmek isteyen yapılar için.</p>
                </div>
                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl text-center hover:bg-white/[0.05] transition-all">
                  <div className="mx-auto w-12 h-12 rounded-full bg-purple-400/10 flex items-center justify-center mb-4">
                    <Icons.Users className="text-purple-400" size={20}/>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">Eczane Grupları</h4>
                  <p className="text-sm text-gray-400">Üyeleri arasındaki ortak alım, takas ve operasyon akışını merkezi hale getirmek isteyen yapılar için.</p>
                </div>
                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl text-center hover:bg-white/[0.05] transition-all">
                  <div className="mx-auto w-12 h-12 rounded-full bg-blue-400/10 flex items-center justify-center mb-4">
                    <Icons.Truck className="text-blue-400" size={20}/>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">Dağıtım Ekipleri</h4>
                  <p className="text-sm text-gray-400">Sevkiyat, teslim ve işlem takibini daha düzenli yürütmek isteyen yöneticiler için.</p>
                </div>
                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl text-center hover:bg-white/[0.05] transition-all">
                  <div className="mx-auto w-12 h-12 rounded-full bg-orange-400/10 flex items-center justify-center mb-4">
                    <Icons.BarChart3 className="text-orange-400" size={20}/>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">Karar Vericiler</h4>
                  <p className="text-sm text-gray-400">Platform içi işlem akışını, güven yapısını ve ticari hareketleri daha görünür görmek isteyenler için.</p>
                </div>
              </div>
            </div>

            {/* 6) Neden Eczaport */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Neden Eczaport?</h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  Çünkü eczaneler arasındaki ticaret çoğu zaman dağınık iletişim, manuel takip, güven problemi ve operasyonel yük yüzünden verimsiz ilerler. Eczaport bu dağınıklığı tek sistemde toplar. Ortak alım, takas, sevkiyat, cari hesap ve güven mekanizmasını aynı çatı altında yönetilebilir hale getirir.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                      <Icons.Check className="text-[#8EF0B5]" size={14} />
                    </div>
                    <span className="text-white font-medium">Ortak alımı sistematik hale getirir</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                      <Icons.Check className="text-[#8EF0B5]" size={14} />
                    </div>
                    <span className="text-white font-medium">Stok değerlendirmeyi kolaylaştırır</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                      <Icons.Check className="text-[#8EF0B5]" size={14} />
                    </div>
                    <span className="text-white font-medium">Sevkiyat süreçlerini takip edilebilir yapar</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8EF0B5]/20 flex items-center justify-center shrink-0">
                      <Icons.Check className="text-[#8EF0B5]" size={14} />
                    </div>
                    <span className="text-white font-medium">Finansal görünürlüğü artırır & Güven bazlı çalışır</span>
                  </div>
                </div>
              </div>
              <div className="relative h-full min-h-[400px] rounded-3xl border border-white/10 bg-white/[0.02] flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 opacity-20 blur-[100px] bg-purple-500"></div>
                 <Icons.Store size={160} strokeWidth={0.5} className="relative z-10 opacity-30 text-purple-400" />
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center max-w-4xl mx-auto pb-12 pt-12 mt-12 border-t border-white/10">
              <h2 className="text-4xl font-bold text-white mb-6">Eczaport ile Eczaneler Arası Ticaret Daha Düzenli, Daha Güvenli, Daha Verimli</h2>
              <p className="text-xl text-gray-400 mb-10">
                Eczaport; ortak alım, takas, sevkiyat, cari hesap ve güven skorlamasını tek platformda birleştirerek eczaneler arası iş birliğini güçlendiren B2B SaaS çözümüdür.
              </p>
              <button className="h-14 inline-flex items-center justify-center rounded-full bg-[#8EF0B5] px-10 text-lg font-bold text-black hover:bg-[#8EF0B5]/90 transition-all shadow-[0_0_30px_rgba(142,240,181,0.3)]">
                Demo Talep Et
              </button>
            </div>
            
          </div>
        )}

        {/* --- WH SALES EXTENDED SECTION --- */}
        {slug === 'agento-wh-sales' && (
          <div className="mt-24 space-y-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* 1) Değer Önerisi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Sadece Yanıt Vermez, <br/><span className="text-[#8EF0B5]">Satış Yapar</span></h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  İşin gerçeği şu: Müşterileriniz bir e-ticaret sitesinde uzun paragraflar okumak veya karmaşık formlar doldurmak istemiyor. WhatsApp üzerinden hemen fiyat almak ve siparişi tamamlamak istiyor. WH Sales tam olarak bunu yapar. Mesajları anlar, katalog sunar ve satışı kapatır.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Manuel İşe Son,<br/>Maksimum Dönüşüm</h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Satış ekipleri için geliştirilen bu yapı, manuel cevaplama yükünü bitirir. Satış fırsatlarını otomatik değerlendirirken, ekibe sadece istisnai durumlarda dahil olma esnekliği bırakır.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"><Icons.Zap size={14} className="text-[#8EF0B5]"/> 7/24 Anında Yanıt</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"><Icons.TrendingUp size={14} className="text-purple-400"/> Yüksek Dönüşüm</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"><Icons.Box size={14} className="text-orange-400"/> Otomatik Ek Satış</span>
                </div>
              </div>
            </div>

            {/* 2) Özellik/Satış Kartları - 3x2 Grid */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Neden WhatsApp Satış Otomasyonu?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-[#8EF0B5]/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#8EF0B5]/20 flex items-center justify-center mb-6">
                    <Icons.MessageSquare className="text-[#8EF0B5]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Akıllı Müşteri Karşılama</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Gelen her mesaja saniyeler içinde doğal bir dille ve ürün bağlamını anlayarak profesyonelce yanıt verir.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-purple-400/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-purple-400/20 flex items-center justify-center mb-6">
                    <Icons.ShoppingCart className="text-purple-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Sipariş & Katalog Yönetimi</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Müşterinin talebine en uygun ürünleri PDF veya görsel olarak dinamik bir şekilde sunup sipariş aşamasına geçirir.
                  </p>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-blue-400/50 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-400/20 flex items-center justify-center mb-6">
                    <Icons.Network className="text-blue-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Kişiselleştirilmiş Akışlar</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Her sektöre özel "Senaryo" (funnel) kurguları oluşturarak müşteriyi tam ihtiyacı olan hizmet/ürüne yönlendirir.
                  </p>
                </div>
              </div>
            </div>

            {/* 3) Nasıl Çalışır - Funnel */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Görünmez Sipariş Hunisi</h2>
              <div className="flex flex-col lg:flex-row justify-between gap-6 relative">
                <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[#8EF0B5]/30 to-transparent z-0"></div>
                
                {[
                  { title: "Teyit ve Analiz", desc: "Mesaj ilk saniyede okunur ve niyet analizi yapılır.", icon: Icons.Activity },
                  { title: "Katalog Sunumu", desc: "En alakalı ürün varyantları hızla listelenir.", icon: Icons.Layers },
                  { title: "Soruları Yanıtlama", desc: "Beden, renk veya stok gibi sorular anında çözülür.", icon: Icons.HelpCircle },
                  { title: "Satışı Kapatma", desc: "Ödeme ya da sipariş formuna kusursuz yönlendirme yapılır.", icon: Icons.CreditCard }
                ].map((step, i) => (
                  <div key={i} className="flex-1 relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#0B0C10] border border-[#8EF0B5]/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(142,240,181,0.1)]">
                      <step.icon className="text-[#8EF0B5]" size={32} />
                    </div>
                    <h4 className="text-white font-bold mb-3">{step.title}</h4>
                    <p className="text-sm text-gray-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center max-w-4xl mx-auto pb-12 pt-12 mt-12 border-t border-white/10">
              <h2 className="text-4xl font-bold text-white mb-6">WhatsApp Üzerinden Satış Yapmaya Hazır Mısınız?</h2>
              <p className="text-xl text-gray-400 mb-10">
                Sürekli büyüyen e-ticaret trafiğinizi manuel karşılamayı bırakın. Müşteri memnuniyetini artırın ve siparişleri hatasız olarak sisteminize aktarın.
              </p>
              <button className="h-14 inline-flex items-center justify-center rounded-full bg-[#8EF0B5] px-10 text-lg font-bold text-black hover:bg-[#8EF0B5]/90 transition-all shadow-[0_0_30px_rgba(142,240,181,0.3)]">
                Demo Talep Et
              </button>
            </div>
            
          </div>
        )}

        {/* --- OTONOM AJAN EXTENDED SECTION --- */}
        {slug === 'agento-otonom-agent' && (
          <div className="mt-24 space-y-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* 1) Değer Önerisi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Neden <span className="text-[#8EF0B5]">Otonom Ajanı</span> Seçmelisiniz?</h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Geleneksel ajans süreçlerini ve karmaşık reklam panellerini unutun. Otonom Ajanı, dünyanın en gelişmiş yapay zeka modelleri olan Gemini 1.5 Pro ve Anthropic Claude 3.5 Sonnet altyapısıyla çalışır. Özellikle aylık 500.000 TL ile 10.000.000 TL arası ciro yapan Shopify ve Ticimax mağazaları için optimize edilmiştir.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Ajans Süreçlerine Son,<br/>Anında Aksiyon</h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  "Bu kampanya neden çalışmıyor?" sorusunun cevabını günlerce beklemeyin. Otonom Ajan sizin adınıza tüm veriyi çeker, fırsatları bulur ve reklam panelinize anında müdahale eder.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"><Icons.BarChart2 size={14} className="text-[#8EF0B5]"/> Otonom Veri Analizi</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"><Icons.PieChart size={14} className="text-orange-400"/> Akıllı Bütçe Yönetimi</span>
                  <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2"><Icons.Languages size={14} className="text-blue-400"/> %100 Yerel ve Anlaşılır</span>
                </div>
              </div>
            </div>

            {/* 2) Multi-Agent Mimari */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Eşsiz Multi-Agent (Çoklu Ajan) Mimarisi</h2>
              <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">Otonom Ajanı tek bir yazılım değil, e-ticaret siteniz için koordine çalışan dijital bir departmandır.</p>
              <div className="flex flex-col lg:flex-row justify-between gap-6 relative">
                <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent z-0"></div>
                
                {[
                  { title: "Veri Ajanı", desc: "Google Analytics ve Ads panellerinizden en güncel verileri hatasız toplar.", icon: Icons.Database },
                  { title: "İçgörü Ajanı", desc: "Verileri analiz eder; performansı düşen ürünleri anında bulur.", icon: Icons.Lightbulb },
                  { title: "Operatör Ajanı", desc: "Reklam paneline giderek gerekli kampanya değişikliklerini anında uygular.", icon: Icons.Wrench },
                  { title: "Orkestratör", desc: "Tüm ekibi yöneterek sizinle doğal bir dilde iletişim kurar.", icon: Icons.Network }
                ].map((step, i) => (
                  <div key={i} className="flex-1 relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#0B0C10] border border-orange-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                      <step.icon className="text-orange-400" size={32} />
                    </div>
                    <h4 className="text-white font-bold mb-3">{step.title}</h4>
                    <p className="text-sm text-gray-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3) Tam Güvenlik: Kontrol Her Zaman Sizde */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Tam Güvenlik: <span className="text-[#8EF0B5]">Kontrol Sizde</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/5 hover:border-[#8EF0B5]/30 transition-all text-center">
                  <div className="w-14 h-14 rounded-full bg-[#8EF0B5]/10 flex items-center justify-center mx-auto mb-6">
                    <Icons.ShieldAlert className="text-[#8EF0B5]" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Bütçe Koruması</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Günlük reklam bütçenizi asla izniniz olmadan %50'den fazla artırmaz. Riskleri sınırlayan yapıya sahiptir.
                  </p>
                </div>
                <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/5 hover:border-purple-400/30 transition-all text-center">
                  <div className="w-14 h-14 rounded-full bg-purple-400/10 flex items-center justify-center mx-auto mb-6">
                    <Icons.CheckCircle className="text-purple-400" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Onaylı İşlem</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Sizin açık onayınız (insan onayı) olmadan hiçbir aktif kampanyayı kapatmaz veya silmez.
                  </p>
                </div>
                <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/5 hover:border-blue-400/30 transition-all text-center">
                  <div className="w-14 h-14 rounded-full bg-blue-400/10 flex items-center justify-center mx-auto mb-6">
                    <Icons.History className="text-blue-400" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Şeffaflık</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Yapılan tüm aksiyonlar saniye saniye loglanır ve dilediğiniz an tek tuşla geri alınabilir (Rollback).
                  </p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center max-w-4xl mx-auto pb-12 pt-12 mt-12 border-t border-white/10">
              <h2 className="text-4xl font-bold text-white mb-6">Hemen Başlayın</h2>
              <p className="text-xl text-gray-400 mb-10">
                Zamanınızı karmaşık veri tablolarında değil, işinizi büyütmeye harcayın. Otonom Ajanı'nı e-ticaret sitenize bağlayın ve otonom pazarlamanın gücüyle dönüşüm oranlarınızı artırmaya bugünden başlayın.
              </p>
              <button className="h-14 inline-flex items-center justify-center rounded-full bg-[#8EF0B5] px-10 text-lg font-bold text-black hover:bg-[#8EF0B5]/90 transition-all shadow-[0_0_30px_rgba(142,240,181,0.3)]">
                Demo Talep Et
              </button>
            </div>
            
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
