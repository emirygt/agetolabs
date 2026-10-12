'use client';

import { useEffect, useRef } from 'react';

import styles from './AgetoBIReel.module.css';

const DURATION = 36;
const SCENES = [
  { id: 'intro', start: 0, end: 4.4 },
  { id: 'problem', start: 4.4, end: 10 },
  { id: 'dashboard', start: 10, end: 22.5 },
  { id: 'features', start: 22.5, end: 31.3 },
  { id: 'cta', start: 31.3, end: 36 },
] as const;
const CHART_BARS = [38, 62, 48, 80, 54, 70, 46, 90, 60, 74];
// Fictional "sipariş" overlay for the line chart, independent scale from the bars.
const LINE_POINTS = [30, 55, 40, 70, 48, 66, 42, 82, 58, 68];

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}
function fmtTime(s: number) {
  s = Math.floor(s);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}
function fadeAt(t: number, start: number, end: number, isFirst: boolean) {
  const FADE = 0.5;
  if (t < start - 0.001 || t > end + 0.001) return 0;
  const inFade = isFirst ? 1 : clamp01((t - start) / FADE);
  const outFade = clamp01((end - t) / FADE);
  return Math.min(inFade, outFade);
}

/**
 * 36s looping product reel for AgetoBI: five crossfading scenes driven by one
 * JS clock, with a scrubbable timeline. The dashboard scene mirrors the real
 * AgetoBI panel layout, but every figure in it is fictional — no real order,
 * revenue or customer data.
 */
export function AgetoBIReel() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const chartbox = root.querySelector<HTMLDivElement>(`.${styles.chartbox}`);
    const lineSvg = root.querySelector<SVGSVGElement>(`.${styles.lineSvg}`);
    const linePlot = root.querySelector<SVGPolylineElement>('polyline');
    const donutBox = root.querySelector<HTMLDivElement>(`.${styles.donutBox}`);
    const featEls = Array.from(root.querySelectorAll<HTMLDivElement>(`.${styles.feat}`));
    const sceneEls = Array.from(root.querySelectorAll<HTMLDivElement>('[data-scene]'));
    const fill = root.querySelector<HTMLDivElement>(`.${styles.fill}`);
    const knob = root.querySelector<HTMLDivElement>(`.${styles.knob}`);
    const track = root.querySelector<HTMLDivElement>(`.${styles.track}`);
    const timeNow = root.querySelector<HTMLSpanElement>('[data-time-now]');
    const playBtn = root.querySelector<HTMLButtonElement>(`.${styles.playbtn}`);
    const iconPlay = root.querySelector<SVGSVGElement>('[data-icon="play"]');
    const iconPause = root.querySelector<SVGSVGElement>('[data-icon="pause"]');
    const statOrders = root.querySelector<HTMLElement>('[data-stat="orders"]');
    const statRevenue = root.querySelector<HTMLElement>('[data-stat="revenue"]');
    const statBasket = root.querySelector<HTMLElement>('[data-stat="basket"]');
    const statProducts = root.querySelector<HTMLElement>('[data-stat="products"]');

    if (!chartbox || !lineSvg || !linePlot || !donutBox || !fill || !knob || !track || !timeNow || !playBtn || !iconPlay || !iconPause) {
      return;
    }

    const bars = CHART_BARS.map((target) => {
      const el = document.createElement('div');
      el.className = styles.bar;
      el.style.height = '0%';
      chartbox.insertBefore(el, lineSvg);
      return { el, target };
    });

    const fullLinePoints = LINE_POINTS.map((v, i) => {
      const x = (i / (LINE_POINTS.length - 1)) * 100;
      const y = 40 - (v / 100) * 40;
      return x + ',' + y;
    }).join(' ');
    linePlot.setAttribute('points', fullLinePoints);

    let elapsed = 0;
    let playing = !reduced;
    let lastTs: number | null = null;
    let scrubbing = false;
    let raf = 0;

    function render(t: number) {
      SCENES.forEach((s, idx) => {
        const el = sceneEls.find((e) => e.dataset.scene === s.id);
        if (!el) return;
        const o = fadeAt(t, s.start, s.end, idx === 0);
        el.style.opacity = String(o);
        el.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
      });

      const dash = SCENES[2];
      const p = clamp01((t - dash.start) / (dash.end - dash.start));
      const pe = easeOutCubic(p);
      if (statOrders) statOrders.textContent = Math.round(pe * 428).toLocaleString('tr-TR');
      if (statRevenue) statRevenue.textContent = '₺' + Math.round(pe * 612480).toLocaleString('tr-TR');
      if (statBasket) statBasket.textContent = '₺' + Math.round(pe * 1431).toLocaleString('tr-TR');
      if (statProducts) statProducts.textContent = Math.round(pe * 540).toLocaleString('tr-TR');

      bars.forEach((b, i) => {
        const bp = clamp01(p * 1.35 - i * 0.035);
        b.el.style.height = easeOutCubic(bp) * b.target + '%';
      });
      lineSvg!.style.clipPath = 'inset(0 ' + (1 - pe) * 100 + '% 0 0)';
      donutBox!.classList.toggle(styles.on, p > 0.55);

      const feat = SCENES[3];
      if (t >= feat.start && t < feat.end) {
        const local = t - feat.start;
        const active = Math.floor(local / 2.2) % 4;
        featEls.forEach((f) => {
          f.classList.toggle(styles.active, Number(f.dataset.i) === active);
        });
      }

      const frac = t / DURATION;
      fill!.style.width = frac * 100 + '%';
      knob!.style.left = frac * 100 + '%';
      timeNow!.textContent = fmtTime(t);
    }

    function setPlaying(v: boolean) {
      playing = v;
      iconPlay!.style.display = v ? 'none' : 'block';
      iconPause!.style.display = v ? 'block' : 'none';
    }

    function tick(ts: number) {
      if (lastTs === null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      if (playing && !scrubbing) {
        elapsed = (elapsed + dt) % DURATION;
      }
      render(elapsed);
      raf = requestAnimationFrame(tick);
    }

    function handlePlayClick() {
      setPlaying(!playing);
    }

    function seekFromEvent(ev: PointerEvent) {
      const rect = track!.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const frac = clamp01(x / rect.width);
      elapsed = frac * DURATION;
      render(elapsed);
    }

    function handlePointerDown(ev: PointerEvent) {
      scrubbing = true;
      seekFromEvent(ev);
      track!.setPointerCapture(ev.pointerId);
    }
    function handlePointerMove(ev: PointerEvent) {
      if (scrubbing) seekFromEvent(ev);
    }
    function handlePointerUp(ev: PointerEvent) {
      scrubbing = false;
      track!.releasePointerCapture(ev.pointerId);
    }

    playBtn.addEventListener('click', handlePlayClick);
    track.addEventListener('pointerdown', handlePointerDown);
    track.addEventListener('pointermove', handlePointerMove);
    track.addEventListener('pointerup', handlePointerUp);

    setPlaying(playing);
    render(0);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      playBtn.removeEventListener('click', handlePlayClick);
      track.removeEventListener('pointerdown', handlePointerDown);
      track.removeEventListener('pointermove', handlePointerMove);
      track.removeEventListener('pointerup', handlePointerUp);
      bars.forEach((b) => b.el.remove());
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.player}>
        <div className={styles.glow} />

        <div className={styles.chrome}>
          <span className={styles.dot} style={{ background: '#f87171' }} />
          <span className={styles.dot} style={{ background: '#facc15' }} />
          <span className={styles.dot} style={{ background: '#4ade80' }} />
          <span className={styles.mono}>agetobi.com · canlı önizleme</span>
          <span className={styles.live}>
            <i />MOCKUP
          </span>
        </div>

        <div className={styles.scene} data-scene="intro">
          <div className={styles.sceneInner} style={{ textAlign: 'center' }}>
            <div className={styles.wordmark}>
              Ageto<span className={styles.bi}>BI</span>
            </div>
            <p className={styles.tagline}>Sipariş, rapor ve GA4 trafiğinizi tek panelde yöneten iç operasyon platformu.</p>
          </div>
        </div>

        <div className={styles.scene} data-scene="problem">
          <div className={styles.sceneInner} style={{ textAlign: 'center' }}>
            <div className={`${styles.painLine} ${styles.strike}`}>Dağınık Excel tabloları.</div>
            <div className={`${styles.painLine} ${styles.strike}`}>Manuel sipariş takibi.</div>
            <div className={`${styles.painLine} ${styles.strike}`}>Geç kalan kararlar.</div>
            <div className={styles.resolve}>AgetoBI hepsini tek ekranda birleştirir.</div>
          </div>
        </div>

        <div className={styles.scene} data-scene="dashboard">
          <div className={`${styles.sceneInner} ${styles.dashInnerWrap}`}>
            <aside className={styles.dashSide}>
              <div className={styles.dashMark} />
              <i className={styles.on} />
              <i />
              <i />
              <i />
              <i />
            </aside>
            <div className={styles.dashMain}>
              <div className={styles.dashHead}>
                <b>Merhaba, Ekip 👋</b>
                <span>Sipariş operasyonunun güncel görünümü</span>
              </div>

              <div className={styles.statRow}>
                <div className={styles.stat}>
                  <div className={styles.ic} style={{ background: 'rgba(124,140,240,.18)', color: '#7C8CF0' }}>
                    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={1.1}>
                      <path d="M1 3h8l-1 5H2z" />
                      <path d="M3 3V2a2 2 0 0 1 4 0v1" />
                    </svg>
                  </div>
                  <b data-stat="orders">0</b>
                  <span>Sipariş</span>
                </div>
                <div className={styles.stat}>
                  <div className={styles.ic} style={{ background: 'rgba(142,240,181,.18)', color: '#8EF0B5' }}>
                    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={1.1}>
                      <rect x="1" y="2.5" width="8" height="5.5" rx="1" />
                      <path d="M1 4.3h8" />
                    </svg>
                  </div>
                  <b data-stat="revenue">₺0</b>
                  <span>Ciro</span>
                </div>
                <div className={styles.stat}>
                  <div className={styles.ic} style={{ background: 'rgba(250,204,21,.16)', color: '#facc15' }}>
                    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={1.1}>
                      <path d="M1 3l4-2 4 2-4 2z" />
                      <path d="M1 3v4l4 2 4-2V3" />
                    </svg>
                  </div>
                  <b data-stat="basket">₺0</b>
                  <span>Ort. Sepet</span>
                </div>
                <div className={styles.stat}>
                  <div className={styles.ic} style={{ background: 'rgba(167,139,250,.16)', color: '#a78bfa' }}>
                    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={1.1}>
                      <rect x="1" y="1" width="3.3" height="3.3" rx=".5" />
                      <rect x="5.7" y="1" width="3.3" height="3.3" rx=".5" />
                      <rect x="1" y="5.7" width="3.3" height="3.3" rx=".5" />
                      <rect x="5.7" y="5.7" width="3.3" height="3.3" rx=".5" />
                    </svg>
                  </div>
                  <b data-stat="products">0</b>
                  <span>Satılan Ürün</span>
                </div>
              </div>

              <div className={styles.dashCharts}>
                <div className={styles.chartbox}>
                  <svg className={styles.lineSvg} viewBox="0 0 100 40" preserveAspectRatio="none">
                    <polyline fill="none" stroke="#7C8CF0" strokeWidth={1.6} points="" />
                  </svg>
                </div>
                <div className={styles.donutBox}>
                  <div className={styles.donut} />
                  <div className={styles.legend}>
                    <div>
                      <i style={{ background: '#8EF0B5' }} />
                      Teslim · %70
                    </div>
                    <div>
                      <i style={{ background: '#7C8CF0' }} />
                      Yolda · %20
                    </div>
                    <div>
                      <i style={{ background: 'rgba(255,255,255,.3)' }} />
                      İptal · %10
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.scene} data-scene="features">
          <div className={`${styles.sceneInner} ${styles.sceneFeatures}`}>
            <div className={styles.feat} data-i="0">
              <b>Sipariş &amp; Müşteri</b>
              <span>Tüm satış hattında eksiksiz görünürlük.</span>
            </div>
            <div className={styles.feat} data-i="1">
              <b>Dinamik Rapor</b>
              <span>Her ekibe özel dashboard ve rapor.</span>
            </div>
            <div className={styles.feat} data-i="2">
              <b>GA4 Trafik</b>
              <span>Canlı trafik, talep ve dönüşüm bir arada.</span>
            </div>
            <div className={styles.feat} data-i="3">
              <b>Alarm &amp; Kargo</b>
              <span>Anomali uyarısı, uçtan uca sevkiyat takibi.</span>
            </div>
          </div>
        </div>

        <div className={styles.scene} data-scene="cta">
          <div className={styles.sceneInner} style={{ textAlign: 'center' }}>
            <div className={styles.ctaHead}>Operasyon verinizi birleştirelim.</div>
            <div className={styles.ctaSub}>Mevcut veri kaynaklarınızı inceleyelim, pilot bir panel çıkaralım.</div>
            <div className={styles.ctaBtn}>Demo Talep Et →</div>
          </div>
        </div>

        <div className={styles.controls}>
          <button className={styles.playbtn} type="button" aria-label="Oynat / Duraklat">
            <svg data-icon="pause" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="1" y="1" width="3" height="10" />
              <rect x="8" y="1" width="3" height="10" />
            </svg>
            <svg data-icon="play" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ display: 'none', marginLeft: 1 }}>
              <path d="M2 1 L11 6 L2 11 Z" />
            </svg>
          </button>
          <div className={styles.track}>
            <div className={styles.rail}>
              <div className={styles.fill} />
            </div>
            <div className={styles.knob} />
          </div>
          <div className={`${styles.time} ${styles.mono}`}>
            <span data-time-now>0:00</span> / 0:36
          </div>
        </div>
      </div>

      <p className={styles.note}>
        <span>
          <b>Not:</b> Dashboard sahnesi gerçek AgetoBI arayüzünün düzenini örnek alır, ama kod ile üretilmiştir ve tüm rakamlar kurgusaldır — hiçbir gerçek sipariş, ciro veya müşteri verisi içermez.
        </span>
      </p>
    </div>
  );
}
