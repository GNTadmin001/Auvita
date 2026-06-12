'use client';
// 品牌與技術 — 汽化式 PVD 技術 + 規格 + 差異化對比 + 認證 + 歷年研究全收錄。
// i18n 標準分離：文字／表格／清單在 locales/*.json 的 `brandTech` 命名空間（含 STEPS / SPECS / DIFFS /
// CERTS / RESEARCH / JOURNALS 走 t.raw 陣列）；圖片路徑在 lib/content/brand-tech.layout.ts。
import { useState, useEffect, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useReveal, useHashScroll } from '@/lib/reveal';
import { BRAND_TECH_PROCESS_IMG, BRAND_TECH_CAROUSEL } from '@/lib/brand-tech.layout';

const richTags = {
  em: (c: ReactNode) => <em>{c}</em>,
  br: () => <br />,
};

type Step = { h: string; p: string };
type DStat = { dv: string; dl: string };
type SpecRow = { k: string; v: string; num?: string };
type DiffRow = { k: string; a: string; t: string };
type CertItem = { seal: string; h: string; en: string; meta1: string; meta2: string; p: string };
type ResearchLine = 'foil' | 'nano' | 'both';
type ResearchEntry = { year: string; partner: string; topic: string; line: ResearchLine };
type Tab = 'all' | 'foil' | 'nano';

export default function BrandTech() {
  useReveal();
  useHashScroll();
  const t = useTranslations('brandTech');
  const [tab, setTab] = useState<Tab>('all');
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx((i) => (i + 1) % BRAND_TECH_CAROUSEL.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);


  const steps = t.raw('tech.steps') as Step[];
  const dstats = t.raw('tech.dstats') as DStat[];
  const diffRows = t.raw('vs.rows') as DiffRow[];
  const certs = t.raw('cert.items') as CertItem[];
  const research = t.raw('research.entries') as ResearchEntry[];
  const journals = t.raw('research.journals') as string[];

  const filtered = research.filter((r) =>
    tab === 'all'
      ? true
      : tab === 'foil'
        ? r.line === 'foil' || r.line === 'both'
        : r.line === 'nano' || r.line === 'both',
  );
  const countAll = research.length;
  const countFoil = research.filter((r) => r.line === 'foil' || r.line === 'both').length;
  const countNano = research.filter((r) => r.line === 'nano' || r.line === 'both').length;

  return (
    <>
      <section className="subhero">
        <div className="wrap">
          <div className="crumbs rise">
            <Link href="/">{t('subhero.crumbHome')}</Link> ／ {t('subhero.crumb')}
          </div>
          <span className="sh-k rise">{t('subhero.k')}</span>
          <h1 className="rise d1">{t.rich('subhero.title', richTags)}</h1>
          <p className="sh-lead rise d2">{t('subhero.lead')}</p>
        </div>
      </section>

      {/* 製程全幅大圖 */}
      <section style={{ width: '100%', background: '#fff', padding: 0, margin: 0 }}>
        <img
          src={BRAND_TECH_PROCESS_IMG}
          alt="汽化金箔 PVD 製程：從瑞士純金原料汽化、奈米金顆粒晶粒成長、晶粒聚結、縫道填補，沉積成 100 nm 純金薄膜"
          loading="lazy"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </section>

      {/* 技術 */}
      <section className="sec-tight" id="tech" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '40px' }}>
            <span className="kicker" style={{ color: 'var(--nano-steel)' }}>
              {t('tech.kicker')}
            </span>
            <h2 style={{ marginTop: '18px', fontSize: 'clamp(26px,3.4vw,40px)' }}>{t('tech.title')}</h2>
          </div>
          <div className="proc">
            {steps.map((s) => (
              <div className="procstep reveal" key={s.h}>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
          <div className="dstats reveal d1" style={{ marginTop: '48px' }}>
            {dstats.map((d) => (
              <div className="dstat" key={d.dv}>
                <div className="dv">{d.dv}</div>
                <div className="dl">{d.dl}</div>
              </div>
            ))}
          </div>
          <div className="reveal d2" style={{ marginTop: '44px' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#111',
                height: 'clamp(260px,36vw,480px)',
              }}
            >
              {BRAND_TECH_CAROUSEL.map((img, i) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    opacity: carouselIdx === i ? 1 : 0,
                    transition: 'opacity 0.9s ease',
                  }}
                />
              ))}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '8px',
                  zIndex: 2,
                }}
              >
                {BRAND_TECH_CAROUSEL.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIdx(i)}
                    aria-label={`Slide ${i + 1}`}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      background: carouselIdx === i ? '#fff' : 'rgba(255,255,255,0.38)',
                      transition: 'background 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 金箔差異化對比 */}
      <section className="sec-tight" id="vs" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '40px' }}>
            <span className="kicker">{t('vs.kicker')}</span>
            <h2 style={{ marginTop: '18px', fontSize: 'clamp(26px,3.4vw,40px)' }}>
              {t.rich('vs.title', richTags)}
            </h2>
            <p style={{ marginTop: '18px', color: 'var(--k-mute)', maxWidth: '720px' }}>
              {t('vs.lead')}
            </p>
          </div>
          <div className="reveal" style={{ overflowX: 'auto' }}>
            <table
              className="spectable"
              style={{ width: '100%', minWidth: '720px', borderCollapse: 'collapse' as const }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '14px 16px',
                      fontSize: '12px',
                      letterSpacing: '.15em',
                      textTransform: 'uppercase',
                      color: 'var(--k-mute)',
                    }}
                  ></th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '14px 16px',
                      fontSize: '14px',
                      color: 'var(--nano-steel, #1a1a1a)',
                      borderBottom: '2px solid currentColor',
                    }}
                  >
                    {t('vs.headers.auvita')}
                  </th>
                  <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '14px', color: 'var(--k-mute)' }}>
                    {t('vs.headers.traditional')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {diffRows.map((d) => (
                  <tr key={d.k}>
                    <td className="k" style={{ verticalAlign: 'top' }}>
                      {d.k}
                    </td>
                    <td
                      className="v"
                      style={{ verticalAlign: 'top', fontWeight: 500, color: 'var(--k-text, inherit)' }}
                    >
                      {d.a}
                    </td>
                    <td className="v" style={{ verticalAlign: 'top', color: 'var(--k-mute)' }}>
                      {d.t}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="specnote reveal" style={{ marginTop: '26px' }}>
            {t('vs.specnote')}
          </p>
        </div>
      </section>

      {/* 認證 */}
      <section className="sec panel" id="cert" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '40px' }}>
            <span className="kicker">{t('cert.kicker')}</span>
            <h2 style={{ marginTop: '18px', fontSize: 'clamp(26px,3.4vw,40px)' }}>{t('cert.title')}</h2>
          </div>
          <div className="certgrid">
            {certs.map((c, i) => (
              <div className={'certcard reveal d' + (i % 3)} key={c.seal}>
                <div className="cc-seal">{c.seal}</div>
                <h4>{c.h}</h4>
                <div className="cc-en">{c.en}</div>
                <p>{c.p}</p>
                <div className="cc-meta">
                  <span>{c.meta1}</span>
                  <span>{c.meta2}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="specnote reveal" style={{ marginTop: '26px' }}>
            {t('cert.specnote')}
          </p>
        </div>
      </section>

      {/* 歷年研究全收錄 */}
      <section className="sec-tight" id="research" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '32px' }}>
            <span className="kicker" style={{ color: 'var(--nano-steel)' }}>
              {t('research.kicker')}
            </span>
            <h2 style={{ marginTop: '18px', fontSize: 'clamp(26px,3.4vw,40px)' }}>
              {t.rich('research.title', richTags)}
            </h2>
            <p style={{ marginTop: '18px', color: 'var(--k-mute)', maxWidth: '720px' }}>
              {t('research.lead')}
            </p>
          </div>

          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {(
              [
                { k: 'all', l: t('research.tabs.all'), n: countAll },
                { k: 'foil', l: t('research.tabs.foil'), n: countFoil },
                { k: 'nano', l: t('research.tabs.nano'), n: countNano },
              ] as { k: Tab; l: string; n: number }[]
            ).map((c) => (
              <button
                key={c.k}
                onClick={() => setTab(c.k)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '999px',
                  border: '1px solid currentColor',
                  background: tab === c.k ? 'var(--k-text, #1a1a1a)' : 'transparent',
                  color: tab === c.k ? 'var(--k-bg, #fff)' : 'var(--k-text, #1a1a1a)',
                  fontSize: '13px',
                  letterSpacing: '.08em',
                  cursor: 'pointer',
                  transition: 'all .25s ease',
                }}
              >
                {c.l} · {c.n}
              </button>
            ))}
          </div>

          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
              gap: '12px',
            }}
          >
            {filtered.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: '16px 18px',
                  border: '1px solid var(--k-line, rgba(0,0,0,.12))',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-latin-sc)',
                    fontSize: '12px',
                    letterSpacing: '.2em',
                    color: 'var(--nano-steel, var(--k-mute))',
                  }}
                >
                  {r.year}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 500 }}>{r.partner}</div>
                <div style={{ fontSize: '13px', color: 'var(--k-mute)', lineHeight: 1.55 }}>{r.topic}</div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: '56px' }}>
            <h3 style={{ fontSize: 'clamp(18px,2.2vw,24px)', marginBottom: '16px' }}>
              {t('research.journalsTitle')}
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))',
                gap: '10px',
              }}
            >
              {journals.map((j, i) => (
                <li
                  key={i}
                  style={{
                    padding: '12px 14px',
                    fontSize: '12px',
                    color: 'var(--k-mute)',
                    borderLeft: '2px solid var(--nano-steel, currentColor)',
                    lineHeight: 1.65,
                  }}
                >
                  {j}
                </li>
              ))}
            </ul>
          </div>

          <p className="specnote reveal" style={{ marginTop: '32px' }}>
            {t('research.specnote')}
          </p>
        </div>
      </section>

      <section className="page-cta">
        <div className="wrap pc-in">
          <h2 className="reveal">{t.rich('cta.title', richTags)}</h2>
          <p className="reveal d1">{t('cta.sub')}</p>
          <div className="pc-row reveal d2">
            <Link className="btn btn-gold" href="/contact">
              {t('cta.contact')}
            </Link>
            <Link className="btn btn-out" href="/applications">
              {t('cta.app')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
