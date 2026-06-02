'use client';
// 首頁主體（Hero → Marquee → Origins → Scenes → Symbol → ShopTeaser → Gifts → CTA）。
// 原 home.jsx 的 Hero/Origins/Applications(改名 Scenes)/Symbol(改名 BrandSymbol)/ShopTeaser/Gifts/CTA/Home。
// 文案全抽進 locales（home namespace）；<em>/<br>/foil 用 t.rich，卡片陣列用 t.raw。
import { useEffect, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IMG } from '@/lib/img';
import { useReveal } from '@/lib/reveal';
import Marquee from '@/components/Marquee';
import GoldDust from '@/components/GoldDust';

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
        <img
          className="ph-img"
          alt=""
          src={IMG('goldleaf,dessert', 12, 1920, 1280)}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).remove();
          }}
        />
        <span className="cap">Hero · 金箔料理 imagery</span>
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
        <h1 className="reveal in d1">
          {t('titleL1')}
          <br />
          {t('titleL2')}
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
  return (
    <section className="sec" id="origins">
      <div className="wrap origins">
        <div className="origins-diptych">
          <Link className="prodtile reveal" href="/shop">
            <div className="pt-media">
              <img
                alt=""
                src={IMG('goldleaf,dessert', 5, 900, 1300)}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).remove();
                }}
              />
            </div>
            <div className="pt-cap">
              <span className="pt-k">{t('tile1K')}</span>
              <span className="pt-zh">{t('tile1Zh')}</span>
              <span className="go">{t('go')}</span>
            </div>
          </Link>
          <Link className="prodtile reveal d1" href="/shop">
            <div className="pt-media">
              <img
                alt=""
                src={IMG('goldpowder,spice', 8, 900, 1300)}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).remove();
                }}
              />
            </div>
            <div className="pt-cap">
              <span className="pt-k">{t('tile2K')}</span>
              <span className="pt-zh">{t('tile2Zh')}</span>
              <span className="go">{t('go')}</span>
            </div>
          </Link>
        </div>
        <div className="body">
          <div className="kicker reveal" style={{ display: 'block', marginBottom: '22px' }}>
            {t('kicker')}
          </div>
          <h2 className="ed-title reveal d1" style={{ fontSize: '40px', marginBottom: '28px' }}>
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

type SceneItem = { en: string; zh: string; cta: string; kw: string };

function Scenes() {
  const t = useTranslations('home.scenes');
  const items = t.raw('items') as SceneItem[];
  return (
    <section className="sec panel" id="scenes">
      <div className="wrap">
        <div className="sec-head center" style={{ marginBottom: '60px' }}>
          <span className="kicker reveal">{t('kicker')}</span>
          <h2 className="reveal d1 ed-title">{t.rich('title', richTags)}</h2>
          <p className="reveal d2">{t('sub')}</p>
        </div>
        <div className="appgrid">
          {items.map((it, i) => (
            <article className={'appcard reveal d' + ((i % 3) + 1)} key={it.zh}>
              <div className="ph">
                <img
                  className="ph-img"
                  alt=""
                  src={IMG(it.kw, 30 + i, 760, 900)}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).remove();
                  }}
                />
                <span className="cap">{it.en} imagery</span>
              </div>
              <div className="meta">
                <div className="k">{it.en}</div>
                <h4>{it.zh}</h4>
                <Link href="/shop">{it.cta} →</Link>
              </div>
            </article>
          ))}
        </div>
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

type ShopItem = { tag: string; name: string; desc: string; hot: boolean; kw: string };

function ShopTeaser() {
  const t = useTranslations('home.shopTeaser');
  const items = t.raw('items') as ShopItem[];
  const ask = t('ask');
  return (
    <section className="sec panel" id="shop">
      <div className="wrap">
        <div className="sec-head center" style={{ marginBottom: '58px' }}>
          <span className="kicker reveal">{t('kicker')}</span>
          <h2 className="reveal d1 ed-title">{t.rich('title', richTags)}</h2>
          <p className="reveal d2">{t('sub')}</p>
        </div>
        <div className="prodgrid">
          {items.map((it, i) => (
            <Link className={'prod reveal d' + ((i % 3) + 1)} href="/product" key={i}>
              <div className="ph">
                <img
                  className="ph-img"
                  alt=""
                  src={IMG(it.kw, 40 + i, 720, 720)}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).remove();
                  }}
                />
                <span className="cap">{it.tag} imagery</span>
              </div>
              <div className="pin">
                <span className={'tag' + (it.hot ? ' hot' : '')}>{it.tag}</span>
                <h4>{fmt(it.name)}</h4>
                <p className="desc">{it.desc}</p>
                <div className="pfoot">
                  <span className="ask">{ask}</span>
                  <span className="arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

type GiftItem = { gl: string; en: string; zh: string; desc: string; kw: string };

function Gifts() {
  const t = useTranslations('home.gifts');
  const items = t.raw('items') as GiftItem[];
  return (
    <section className="sec" id="gifts">
      <div className="wrap">
        <div className="sec-head center" style={{ marginBottom: '58px' }}>
          <span className="kicker reveal">{t('kicker')}</span>
          <h2 className="reveal d1 ed-title">{t.rich('title', richTags)}</h2>
          <p className="reveal d2">{t('sub')}</p>
        </div>
        <div className="appgrid">
          {items.map((it, i) => (
            <article
              className={'appcard reveal d' + ((i % 3) + 1)}
              key={it.zh}
              style={{ height: '300px' }}
            >
              <div className="ph">
                <img
                  className="ph-img"
                  alt=""
                  src={IMG(it.kw, 50 + i, 760, 760)}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).remove();
                  }}
                />
                <span className="cap">{it.en}</span>
              </div>
              <div className="meta">
                <div className="k">{it.en}</div>
                <h4 style={{ fontSize: '28px' }}>
                  {it.zh}
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--k-gold-lt)',
                      marginLeft: '10px',
                      fontSize: '20px',
                    }}
                  >
                    {it.gl}
                  </span>
                </h4>
                <p
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--k-dim)',
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                >
                  {it.desc}
                </p>
              </div>
            </article>
          ))}
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
      <Origins />
      <Scenes />
      <BrandSymbol />
      <ShopTeaser />
      <Gifts />
      <CTA />
    </>
  );
}
