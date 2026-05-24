# Yeni Claude Code Oturumu — İlk Mesaj

Aşağıdaki bloğu, agetolabs projesinde başlattığın yeni Claude Code oturumuna kopyala-yapıştır:

---

```
Bu projenin homepage'ini (app/page.tsx) baştan tasarlayacağız:
premium, 3D animated, scroll-driven product showcase site.
Detaylı brief: docs/landing-brief.md — onu önce oku.

Yaklaşım:
1. Mevcut homepage'e dokunma. Yeni route olarak app/v2/page.tsx altında bina et.
   Beğenince swap edeceğiz.
2. Önce gerekli kütüphaneleri kur:
   pnpm add three @react-three/fiber @react-three/drei @react-three/postprocessing gsap lenis
   pnpm add -D @types/three
3. Brief'teki 7 sahneyi tek tek yap. Bu turda SADECE Scene 1 (HeroScene) +
   temel layout/route iskeletini bitir. Geriye Scene 2-7 için TODO bırak.
4. Component'ler: components/scenes/HeroScene.tsx, components/r3f/SceneCanvas.tsx,
   hooks/useScrollScene.ts gibi temiz dosyalar.
5. Bitince pnpm dev çalıştır, localhost:3000/v2'yi tarayıcıda test edebileceğimi söyle.
6. Mevcut Header, Footer, LanguageContext component'lerini koru — bunları yeni
   route'da da kullan. Sadece sayfa içeriğini değiştiriyoruz.

Önemli kurallar (brief'te tam liste):
- Marka adı her yerde "agetolabs" — küçük harf, tek kelime. AgentoLabs YAZMA.
- Logo placeholder bırak (LOGO_SLOT), SVG üretme — kullanıcı animasyonlu logosunu
  sonra inject edecek.
- Her ürün 3D olacak (Scene 3'te). Bu turda Scene 3'e geçmiyoruz ama
  mimari planı zihninde tut.
- NO_DOCKER. Deploy = pnpm build + pm2 restart + nginx reload.

Skill ve doküman kullanımı:
- 3D olmayan UI kararları için (renk uyumu, tipografi, spacing, accessibility,
  mobile layout, footer, CTA, stats, ürün kartı kompozisyonu) ui-ux-pro-max
  skill'ini aktif kullan. Skill .claude/skills/ altında kurulu — design system
  üretirken referans al.
- Motion animasyonları için (framer-motion v12 / "motion" paketi zaten kurulu)
  https://motion.dev/docs/react-quick-start sayfasını gerekirse WebFetch ile
  oku — özellikle useScroll, useTransform, useMotionValue, scroll-linked
  animations için güncel API.
- 3D için (R3F, drei, postprocessing, Three.js) Claude'un eğitimi yeterli;
  ama spesifik API sorularında https://r3f.docs.pmnd.rs ve
  https://threejs.org/docs sayfalarını WebFetch ile kontrol et.

Başla. Önce brief'i oku, sonra plan özetini bana ver, onayımdan sonra kod yaz.
```

---

## Adım adım handoff

1. **Yeni terminal aç** (Cmd+T VS Code'da yeni terminal sekmesi)
2. **Projeye gir:**
   ```bash
   cd ~/Desktop/projeler/agetolabs
   ```
3. **Claude Code başlat:**
   ```bash
   claude
   ```
4. **Yukarıdaki üçlü-backtick bloktaki mesajı** yeni Claude'a yapıştır → Enter

Claude önce brief'i okur, plan özetini verir. Sen "tamam başla" deyince kod yazar.

## Bu oturumu (ageto ani klasöründeki) kapatabilir misin?
Evet. Tüm gerekli dosyalar (`docs/landing-brief.md` + bu kickoff) agetolabs projende kaydedildi. Yeni oturum kendi başına devam edebilir, bu konuşmaya ihtiyaç yok.
