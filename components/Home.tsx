'use client';
// 首頁主體（Hero → Marquee → Origins → Scenes → Symbol → ShopTeaser → Gifts → CTA）。
// 原 home.jsx 的 Hero/Origins/Applications(改名 Scenes)/Symbol(改名 BrandSymbol)/ShopTeaser/Gifts/CTA/Home。
// i18n 標準分離：文字在 locales/*.json 的 `home` 命名空間（含 t.rich/t.raw）；
// 圖片 kw/lock 與 hot 旗標在 lib/content/home.layout.ts（三語共用、與 items 順序對齊）。
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IMG } from '@/lib/img';
import { useReveal } from '@/lib/reveal';
import Marquee from '@/components/Marquee';
import GoldDust from '@/components/GoldDust';
import {
  HOME_HERO_IMG,
  HOME_ORIGINS_TILES,
  HOME_SCENES_IMG,
} from '@/lib/content/home.layout';
import MagicBento from '@/components/MagicBento';

const richTags = {
  em: (c: ReactNode) => <em>{c}</em>,
  br: () => <br />,
  foil: (c: ReactNode) => <span className="foil-text">{c}</span>,
};

// 商品名底線分隔 → 中段加 <em>（原 fmt）。例：食用_金箔_ → 食用<em>金箔</em>
function fmt(s: string) {
  const p = s.split('_');
  return (
    <>
      {p[0]}
      <em>{p[1]}</em>
      {p[2] || ''}
    </>
  );
}

function Hero() {
  const t = useTranslations('home.hero');
  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = hero.querySelector('.hero-particles') as HTMLElement | null;
      if (!el) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const rect = hero.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const n = (center - vh / 2) / vh; // 0 = hero 置中，± 為捲離
      const op = Math.max(0, Math.min(1, 1 - Math.abs(n) * 1.25));
      el.style.opacity = op.toFixed(3);
      el.style.transform = 'translateY(' + (n * 150).toFixed(1) + 'px)';
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  const badges = t.raw('badges') as string[];
  return (
    <header className="hero" id="top">
      <div className="hero-media ph lg">
        <video
          className="ph-img"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <span className="cap">Hero · 金箔料理影片</span>
      </div>
      <div className="hero-particles">
        <GoldDust
          particleColors={['#ffd85e']}
          particleCount={280}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={120}
          sizeRandomness={1}
          alphaParticles={true}
          pixelRatio={2}
          moveParticlesOnHover={true}
          particleHoverFactor={1.6}
        />
      </div>
      <div className="wrap hero-in">
        <div className="kicker reveal in">{t('kicker')}</div>
        <h1 className="reveal in d1" style={{ fontSize: 'clamp(23px,3.5vw,48px)' }}>
          {t('titleL1')}
        </h1>
        <div className="sub reveal in d2">{t('sub')}</div>
        <p className="lead reveal in d2">{t('lead')}</p>
        <div className="hero-cta reveal in d3">
          <Link className="btn btn-gold" href="/applications">
            {t('ctaPrimary')}
          </Link>
          <a className="btn btn-out" href="#origins">
            {t('ctaSecondary')}
          </a>
        </div>
        <div className="hero-badges reveal in d3">
          {badges.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>
      <div className="scroll-cue">
        <span>Scroll</span>
        <span className="ln"></span>
      </div>
    </header>
  );
}

function Origins() {
  const t = useTranslations('home.origins');
  const tiles: { k: string; zh: string; img: (typeof HOME_ORIGINS_TILES)[number] }[] = [
    { k: t('tile1K'), zh: t('tile1Zh'), img: HOME_ORIGINS_TILES[0] },
    { k: t('tile2K'), zh: t('tile2Zh'), img: HOME_ORIGINS_TILES[1] },
  ];
  return (
    <section className="sec" id="origins">
      <div className="wrap origins">
        <div className="origins-diptych">
          {tiles.map((tile, i) => (
            <Link className={'prodtile reveal' + (i === 1 ? ' d1' : '')} href="/shop" key={tile.k}>
              <div className="pt-media">
                <img
                  alt=""
                  src={tile.img.img || IMG(tile.img.kw, tile.img.lock, 900, 1300)}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).remove();
                  }}
                />
              </div>
              <div className="pt-cap">
                <span className="pt-k">{tile.k}</span>
                <span className="pt-zh">{tile.zh}</span>
                <span className="go">{t('go')}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="body">
          <div className="kicker reveal" style={{ display: 'block', marginBottom: '22px' }}>
            {t('kicker')}
          </div>
          <h2 className="ed-title reveal d1" style={{ fontSize: '24px', marginBottom: '28px' }}>
            {t.rich('title', richTags)}
          </h2>
          <p className="reveal d1">{t('p1')}</p>
          <p className="reveal d2">{t.rich('p2', richTags)}</p>
          <a className="btn btn-text reveal d2" href="#" style={{ marginTop: '8px' }}>
            {t('readMore')}
          </a>
        </div>
      </div>
    </section>
  );
}

type SceneItem = { en: string; zh: string; cta: string };

function Scenes() {
  const t = useTranslations('home.scenes');
  const items = t.raw('items') as SceneItem[];
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <section className="sec panel" id="scenes">
      {lightbox && (
        <div className="lb-overlay" onClick={() => setLightbox(null)}>
          <img className="lb-img" src={lightbox} alt="" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
      <div className="wrap">
        <div className="sec-head center" style={{ marginBottom: '60px' }}>
          <span className="kicker reveal">{t('kicker')}</span>
          <h2 className="reveal d1 ed-title">{t.rich('title', richTags)}</h2>
          <p className="reveal d2">{t('sub')}</p>
        </div>
        <MagicBento spotlightRadius={430} enableBorderGlow enableSpotlight>
        <div className="appgrid appgrid-4col">
          {items.map((it, i) => {
            const img = HOME_SCENES_IMG[i] ?? HOME_SCENES_IMG[0];
            const src = img.img || IMG(img.kw, 30 + i, 760, 900);
            return (
              <article
                className={'appcard magic-bento-card reveal d' + ((i % 5) + 1)}
                key={it.zh}
                style={{ cursor: 'zoom-in' }}
                onClick={() => setLightbox(src)}
              >
                <div className="ph">
                  <img
                    className="ph-img"
                    alt=""
                    src={src}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).remove();
                    }}
                  />
                  <span className="cap">{it.en} imagery</span>
                </div>
                <div className="meta">
                  <div className="k">{it.en}</div>
                  <h4>{it.zh}</h4>
                  <Link href="/shop" onClick={(e) => e.stopPropagation()}>{it.cta} →</Link>
                </div>
              </article>
            );
          })}
        </div>
        </MagicBento>
      </div>
    </section>
  );
}

type StatItem = { v: string; l: string };

function BrandSymbol() {
  const t = useTranslations('home.symbol');
  const stats = t.raw('stats') as StatItem[];
  return (
    <section className="sec">
      <div className="wrap symbol">
        <div className="markwrap reveal">
          <div className="ring"></div>
          <img src="/assets/logo-nautilus-iridescent.png" alt="" />
        </div>
        <div>
          <span className="kicker reveal" style={{ display: 'block', marginBottom: '20px' }}>
            {t('kicker')}
          </span>
          <h2 className="ed-title reveal d1" style={{ fontSize: '42px' }}>
            {t.rich('title', richTags)}
          </h2>
          <blockquote className="reveal d1">{t('quote')}</blockquote>
          <div
            className="stats reveal d2"
            style={{ justifyContent: 'flex-start', gap: '56px', marginTop: '40px' }}
          >
            {stats.map((s) => (
              <div className="stat" key={s.l}>
                <div className="v foil-text">{s.v}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const AESTHETIC_VIDEOS = [
  { id: 'brownie', src: '/videos/brownie.mp4', labelKey: 'dessert' },
  { id: 'macaron', src: '/videos/macaron.mp4', labelKey: 'chocolate' },
  { id: 'bread',   src: '/videos/bread.mp4',   labelKey: 'cuisine' },
];

const AESTHETIC_PLAYBACK_RATE = 0.7;

function AestheticCreation() {
  const t = useTranslations('home.aesthetic');
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((el) => {
      if (el) el.playbackRate = AESTHETIC_PLAYBACK_RATE;
    });
  }, []);

  return (
    <section className="sec panel" id="aesthetic">
      <div className="wrap">
        <div className="sec-head center" style={{ marginBottom: '60px' }}>
          <span className="kicker reveal">{t('kicker')}</span>
          <h2 className="reveal d1 ed-title">{t.rich('title', richTags)}</h2>
          <p className="reveal d2">{t('sub')}</p>
        </div>
        <div className="aesthetic-stage reveal d1">
          <div className="aesthetic-video-wrap">
            {AESTHETIC_VIDEOS.map((v, i) => (
              <video
                key={v.id}
                ref={(el) => { videoRefs.current[i] = el; }}
                className={'aesthetic-vid' + (i === active ? ' active' : '')}
                src={v.src}
                autoPlay
                muted
                loop
                playsInline
              />
            ))}
            <div className="aesthetic-placeholder" style={{ display: AESTHETIC_VIDEOS.every(v => !v.src) ? 'flex' : 'none' }}>
              <span>{t('placeholder')}</span>
            </div>
          </div>
          <div className="aesthetic-tabs">
            {AESTHETIC_VIDEOS.map((v, i) => (
              <button
                key={v.id}
                className={'aesthetic-tab' + (i === active ? ' active' : '')}
                onClick={() => setActive(i)}
              >
                <span className="aesthetic-tab-num">0{i + 1}</span>
                <span className="aesthetic-tab-label">{t(v.labelKey)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const t = useTranslations('home.cta');
  return (
    <section className="sec-tight cta">
      <div className="wrap cta-in">
        <h2 className="reveal">{t.rich('title', richTags)}</h2>
        <p className="reveal d1">{t('sub')}</p>
        <div className="cta-row reveal d2">
          <a
            className="btn btn-gold"
            href="https://www.goldinalliance.com"
            target="_blank"
            rel="noopener"
          >
            {t('buyGift')}
          </a>
          <a className="btn btn-out" href="mailto:info@gnt.com.tw">
            {t('inquiry')}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useReveal();
  return (
    <>
      <Hero />
      <Marquee />
      <Scenes />
      <Origins />
      <AestheticCreation />
      <BrandSymbol />
      <CTA />
    </>
  );
}
