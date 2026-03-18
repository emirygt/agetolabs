# AgentoLabs Project Core Memory
**Date:** March 2026
**Framework:** Next.js (App Router), React, Tailwind CSS, TypeScript, Lucide React

## 1. Project Philosophy & Vision
- **Theme:** "Otonom Yapay Zeka Ekosistemi" (Autonomous AI Ecosystem). We don't build Co-pilots, we build Auto-Pilots.
- **Vibe & UI/UX:** Premium, high-tech, dark mode.
  - Backgrounds: Absolute dark (`#0B0C10` or `zinc-950`).
  - Panels: Glassmorphism (`bg-[#13151A]/80`, `backdrop-blur-*`), thin borders (`border-white/10`).
  - Accents/Glows: Neon Green (`#8EF0B5`), accompanied by secondary glowing accents like `purple-500/10` and `orange-500/10`.
  - Animations: Subtile hover effects (`scale-110`, group hover color shifts), slow fade-ins (`animate-in fade-in duration-700`).

## 2. Core Products & Offerings
The ecosystem consists of modular but highly integrated products:
1. **Structa AI:** Content generation studio (visuals + SEO + copy) that eliminates manual lifting.
2. **Pharma AI & Eczaport:** Vertical AI solution specifically for the healthcare/pharmacy industry. Eczaport handles B2B joint buying; Pharma AI processes the products data.
3. **Whatsapp Sales Automation (WH Sales):** Smart bot that answers, proposes products, and captures sales directly inside WhatsApp.
4. **Otonom Ajan (AI Marketing OS):** Analyzes GA4/Ads and allocates ad budgets strictly based on profit.

## 3. Key Technical Decisions
### Internationalization (i18n)
- Custom bilingual implementation. We use `components/LanguageContext.tsx` providing a context provider for `lang` (`'tr'` or `'en'`).
- Common string labels are kept in `lib/translations.ts`.
- Deeply nested and large copies (e.g., in `/ecosystem` or `/about` pages) use inline ternary operators (e.g., `{lang === 'tr' ? 'Türkçe' : 'English'}`) to avoid a bloated translation file.

### Component Structure
- `Header.tsx`: Responsive top-nav. No dropdown for "Products" anymore, it's a direct linking strategy to `/products`. Also contains the `/about`, `/contact`, `/technology` routing.
- `Footer.tsx`: Universal bottom navigation and links.
- **Routing:** Handled via standard Next.js 13+ App router:
  - `/page.tsx`: Landing hero.
  - `/products/page.tsx`: Global product grid.
  - `/products/[slug]/page.tsx`: Dynamic product landing pages.
  - `/ecosystem/page.tsx`: Deep-dive into the "modular + unified" concept of AgentoLabs.
  - `/about/page.tsx`: Manifesto and corporate mission.
  - `/contact/page.tsx`: Split layout with company data and contact form.

## 4. Brand Guidelines
- **Logo:** Displayed as `<img src="/logo.png" />` or glowing inline SVG in the `Header.tsx`.
- **Mottos:** 
  - "Geleceği inşa etmiyoruz, onu otomatize ediyoruz." (We don't build the future, we automate it.)
  - "Bütünleşik Güç, Modüler Özgürlük." (Unified Power, Modular Freedom.)

---
*Note to future AI agents:* Before adding new features to AgentoLabs, read this document to match the exact aesthetic and architectural tone set in the early phases of the project.
