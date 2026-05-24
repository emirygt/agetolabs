# agetolabs — 3D Animated Scroll-Driven Landing Brief

> Mevcut canlı homepage'i (app/page.tsx) bu brief'e göre yeniden tasarlayacağız.
> Önce `app/v2/page.tsx` olarak alongside build edilir, test edilir, sonra swap.

## Marka

- **İsim:** agetolabs (HER YERDE küçük harf, tek kelime — AgentoLabs/AGENTOLABS YASAK)
- **Tagline:** Orchestrating Autonomous Intelligence
- **Mission:** We build autonomous AI ecosystems that eliminate manual workloads and turn data into real-time decisions for companies.
- **Slogan strip:** Powered By Unified Autonomous Intelligence
- **Year:** 2026

## Logo

- Mevcut animasyonlu logo kullanılacak. Header ve footer'da `<a className="logo-slot" data-logo-slot="primary|footer">` placeholder bırak. Logo SVG/Lottie/MP4 olarak SONRA inject edilecek. Reflow olmasın, slot yüksekliği header'da 48px (mobil 40px), footer'da 56px. Yanına `agetolabs` wordmark'ı (küçük harf, weight 700, tracking -0.02em, hover'da mint→purple gradient).

## Renk sistemi (LOCK)

```
Background primary: #0B0C10
Background deep:    #050508
Card surface:       #13151A
Mint (CTA, brand):  #8EF0B5   ← primary glow
Green deep:         #4ade80
Purple:             #a855f7
Purple light:       #c084fc
Text primary:       #FFFFFF
Text muted:         #9CA3AF
Signature gradient: #8EF0B5 → #a3f0c2 → #c084fc → #a855f7
Ambient glows:      purple top-left rgba(88,28,135,0.18), mint bottom-right rgba(142,240,181,0.06)
```

Font: Inter / SF Pro Display. Heading 700, tight tracking. Eyebrow labels: monospace, letter-spacing 0.3em, uppercase, #8EF0B5 @ 0.6 opacity.

## Tech stack (zaten projede var olanlar + eklenecekler)

Var:
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind 4 + tw-animate-css
- motion (framer-motion v12)
- lucide-react

Eklenmeli:
```bash
pnpm add three @react-three/fiber @react-three/drei @react-three/postprocessing gsap lenis
pnpm add -D @types/three
```

## NON-NEGOTIABLE 3D KURALI

Her ürün KENDİ özel, R3F ile yazılmış 3D sahnesine sahip olacak. 2D ikon yok. Düz illüstrasyon yok. Reused model yok. Her ürünün farklı geometri, farklı PBR materyali (emissive mint/purple), farklı animasyon loop'u, farklı kamera framing'i var.

## Scroll Narrative — 7 Sahne

### Scene 1 — HERO ("AI Hub Core") — 3D
- Full-viewport WebGL: parlayan core sphere (#0d2015 fill, mint rim light) + 3 dönen orbital ellipse (mint, purple, green-purple gradient).
- 5 parlayan parçacık orbitlerde + yavaş dönen noktalı ring. Bloom postFX.
- Headline (sol): "Orchestrating / Autonomous / **Intelligence.**" (son kelime #8EF0B5, drop-shadow glow).
- Alt: "agetolabs builds the foundational infrastructure for the next generation of AI agents, enabling them to reason, act, and collaborate at scale."
- CTA: mint pill, siyah text, "Explore Ecosystem".
- Scroll başlayınca: core sphere 7 floating module'e dağılır → Scene 3'teki ürün orb'ları.

### Scene 2 — MANIFESTO STRIP
- Sticky text, kelime-kelime mask reveal (GSAP SplitText).
- "We replace manual workloads with autonomous agents. Decisions happen in real-time. Your team stops operating — and starts orchestrating."
- Background: parallax particle field (~2000 particles, mint+purple).

### Scene 3 — PRODUCT ORBIT (centerpiece) — 7 ürün, her biri ayrı 3D
Pinned full-viewport Canvas, ScrollTrigger snap (7 stop). Aktif ürünün sahnesi kamera dolly + bloom pulse ile fade-in olur, öncekisi fade-out.

7 ürün (sıra önemli):

1. **Structa AI** — Holografik doküman plane stack (translucent purple, wireframe edges) tek tek soyulup akan ribbon surface'lara dönüşür. Ribbon içinde animasyonlu glyph'ler kayar.
   *Etkinlik ve içerik ekipleri için yapay zeka destekli content studio.*

2. **Pharma AI** [HIGHLIGHTED mint glow border] — Cam koni flask (refraction shader) içinde animasyonlu mint sıvı kaynar (noise-distorted sphere + SSS). Etrafında dönen moleküler bond lattice (instanced spheres + cylinders).
   *İlaç ve takviye gıda odaklı yapay zeka platformu. Metin üretir, görsel oluşturur, ürünleri analiz eder.*

3. **Agento Company Flow** — Yaşayan 3D node-graph (~25 instanced glowing sphere, dashed lines sürekli rewire oluyor). Kamera yavaş orbit.
   *Enterprise Agent Orchestration.*

4. **Agento priceCompare** — Dönen 3D bar-chart manzarası (heightmap, şehir silueti gibi yükselip alçalan barlar) üstünde parlayan mint scanner ring tarıyor. 3D fiyat etiketleri zirvelerin üstünde belirip eriyor.
   *Real-time Price Intelligence.*

5. **Autonomous Agent** [GA4 badge sağ üst] — Low-poly humanoid bot kafa (mint+orange emissive) yavaş dönüyor, etrafında dönen ring'de küçük 3D commerce ikonları (cart, chart, target, dollar) — sprite değil, gerçek mesh.
   *E-Ticaretiniz İçin 7/24 Çalışan Otonom Yapay Zeka Dijital Pazarlama Uzmanınız.*

6. **Eczaport** — İki stilize 3D eczane storefront (low-poly, purple-tinted), aralarında 3D konveyör bant. Üstünde mint hap kapsülleri akıyor. Tepede "trust shield" yüzüyor.
   *Eczaneler için ortak alım, takas, sevkiyat ve güven odaklı B2B operasyon platformu.*

7. **WhatsApp Sales Automation** [HIGHLIGHTED mint glow] — Cluster halinde 3D speech-bubble mesh'leri (mint, farklı boyutlarda) derinlikte yüzüyor. Loop: bir bubble → 3D ürün kartı → 3D fiş, fiş ekrandan uçar.
   *Müşteri mesajlarını anlayan, ürün öneren ve sipariş toplayan akıllı satış altyapısı.*

Her step layout: ortada aktif 3D sahne + ürün adı (büyük, white) + TR description (#9CA3AF) + "Learn More" mint underlined link. Inactive ürünler kenarda ghost orb (depth-blurred, low opacity). Üstte 1/7 → 7/7 progress + ürün adı.

### Scene 4 — TECHNOLOGY LAYER — 3D
Dönen 3D isometric cube, 5 translucent plane: Agents · Memory · Tools · Orchestrator · Observability. Scroll'da face highlight, mouse parallax tilt.

### Scene 5 — ECOSYSTEM CONSTELLATION — 3D
7 ürün 3D objesi küçülüp 3D uzayda bağlı constellation oluşturur (LineSegments animated dash + glow). Headline: "One platform. Seven autonomous outcomes."

### Scene 6 — STATS / TRUST
Count-up ticker (Troika 3D text veya extruded SVG). Placeholder: "7 autonomous products · 24/7 operation · Real-time decisions · 1 unified core". Gerçek sayılar sonradan girilecek.

### Scene 7 — CTA + FOOTER
Full-bleed mint gradient CTA: "Ready to orchestrate your autonomous stack?" + "Get Started" pill (mint, black).

Footer (#050508, üstte mint radial glow):
- Sol: LOGO_SLOT (footer) + tagline + social ikon (Twitter, LinkedIn, Instagram, circular border, mint hover)
- Kolonlar:
  - **Products** — Autonomous Agent, WhatsApp Sales Automation, Structa AI, Pharma AI, Eczaport, Agento Company Flow, Agento priceCompare
  - **Company** — About Us, Ecosystem Architecture, Contact Us, Careers
  - **Legal** — Privacy Policy, Terms of Service, Cookie Policy, Data Protection Laws
- Bottom: "© 2026 agetolabs. All rights reserved." + "Powered By Unified Autonomous Intelligence" + pulsing mint dot.

## Header
Fixed, blur-backdrop, border-bottom rgba(255,255,255,0.05).
Sol: LOGO_SLOT (primary) + "agetolabs" wordmark.
Orta/sağ nav: Ecosystem · Products · Technology · About Us.
TR/EN toggle (default EN). "Get Started" mint pill (sağ).

## Interaction kuralları

- `prefers-reduced-motion` → 3D sahneleri donmuş tek frame'e indir, scroll-pin yerine dikey stack.
- Mobil (<768px) → pin'li scroll yerine vertical card stack, ama her kart KENDI küçük R3F Canvas'ında ürünün 3D modelini gösterir. 2D fallback YASAK.
- IntersectionObserver ile Canvas off-screen'de pause.
- Frame budget: 60fps cap, Suspense + LOD.
- Cursor: hero'da subtle mint trailing glow.

## Mood referansı
Linear.app depth + Vercel clarity + Apple product-page scroll choreography + Bugatti-grade material polish.

## Yaklaşım

1. Önce `app/v2/page.tsx` route'unu oluştur (mevcut `/` zarar görmesin).
2. Sahne component'lerini `components/scenes/` altında ayrı dosyalar (`HeroScene.tsx`, `ProductOrbit.tsx`, `TechCube.tsx`, vb.).
3. R3F Canvas wrapper'ı reusable (`components/r3f/SceneCanvas.tsx`) — postprocessing + lighting preset.
4. GSAP ScrollTrigger setup tek bir hook'ta (`hooks/useScrollScene.ts`).
5. Sahne-sahne ilerle. Her sahne bitince `pnpm dev` ile localhost:3000/v2'de göster, kullanıcı onaylayınca sonrakine geç.
6. Hepsi bittiğinde, kullanıcı onaylar → `app/page.tsx` ile swap → `pnpm build && pm2 restart` (NO_DOCKER).
