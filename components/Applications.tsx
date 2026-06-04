'use client';
// 產品應用 — 金箔 / 奈米金 / 奈米銀 三家族分區。原 applications.jsx。
// i18n 標準分離：文字在 locales/*.json 的 `applications` 命名空間（t/t.rich/t.raw 讀取）；
// 圖片引用、版面旗標、內部連結在 lib/content/applications.layout.ts（三語共用）；兩者以 key 對應。
import { useState, useEffect, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useReveal, useHashScroll } from '@/lib/reveal';
import PhImg from '@/components/PhImg';
import { APPLICATIONS_FAMS, type SceneLayout } from '@/lib/content/applications.layout';

const richTags = {
  em: (c: ReactNode) => <em>{c}</em>,
  br: () => <br />,
};

function SceneCarousel({ images, cap }: { images: string[]; cap: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % images.length), 4200);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <div className="ph">
      {images.map((src, i) => (
        <img
          key={src}
          className="ph-img"
          src={src}
          alt=""
          loading="lazy"
          style={{ opacity: i === idx ? 1 : 0, transition: 'opacity .9s ease' }}
        />
      ))}
      <span className="cap">{cap}</span>
    </div>
  );
}

function Scene({ layout, steel }: { layout: SceneLayout; steel?: boolean }) {
  const t = useTranslations('applications.scenes');
  const k = layout.key;
  const list = t.raw(`${k}.list`) as [string, string][];
  const cap = t(`${k}.k`);
  return (
    <div className={'scene reveal' + (layout.flip ? ' flip' : '')}>
      {layout.images && layout.images.length > 0 ? (
        <SceneCarousel images={layout.images} cap={cap} />
      ) : (
        <div className="ph">
          <PhImg kw={layout.kw} lock={layout.lock} />
          <span className="cap">{cap}</span>
        </div>
      )}
      <div className="sc-body">
        <span className="kicker" style={steel ? { color: 'var(--nano-steel)' } : undefined}>
          {cap}
        </span>
        <h3>{t.rich(`${k}.h3`, richTags)}</h3>
        <p>{t(`${k}.p`)}</p>
        <div className="sc-list">
          {list.map(([b, tx]) => (
            <div className="sl" key={b}>
              <b>{b}</b>
              <span>{tx}</span>
            </div>
          ))}
        </div>
        {layout.ctaHref && (
          <Link className="btn btn-gold sc-cta" href={layout.ctaHref}>
            {t(`${k}.cta`)}
          </Link>
        )}
      </div>
    </div>
  );
}

function FamHead({ famKey, id, ph }: { famKey: string; id: string; ph?: boolean }) {
  const t = useTranslations('applications.fam');
  return (
    <div className="pgroup-head reveal" id={id} style={{ scrollMarginTop: '100px' }}>
      <div className="pgh-l">
        {ph && <span className="badge b2b">建置中 · 示意</span>}
        <h3>{t(`${famKey}.zh`)}</h3>
      </div>
      <p className="pgh-r">
        {t(`${famKey}.note`)}
        <br />
        <span
          style={{
            fontFamily: 'var(--font-latin-sc)',
            fontSize: '10px',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: 'var(--k-mute)',
          }}
        >
          {t(`${famKey}.en`)}
        </span>
      </p>
    </div>
  );
}

export default function Applications() {
  useReveal();
  useHashScroll();
  const t = useTranslations('applications');
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

      <section className="sec-tight">
        <div className="wrap">
          {APPLICATIONS_FAMS.map((fam) => (
            <div className="pgroup" key={fam.key}>
              <FamHead famKey={fam.key} id={fam.id} />
              {fam.scenes.map((s) => (
                <Scene key={s.key} layout={s} steel={fam.steel} />
              ))}
              {fam.specnote && (
                <p className="specnote reveal" style={{ marginTop: '26px' }}>
                  {t('specnote')}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="page-cta">
        <div className="wrap pc-in">
          <h2 className="reveal">{t.rich('cta.title', richTags)}</h2>
          <p className="reveal d1">{t('cta.sub')}</p>
          <div className="pc-row reveal d2">
            <Link className="btn btn-gold" href="/shop">
              {t('cta.buy')}
            </Link>
            <Link className="btn btn-out" href="/contact">
              {t('cta.contact')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
