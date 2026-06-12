'use client';
// 金的歷史 — 黃金文化／工藝／藥用脈絡。
// i18n 標準分離：文字在 locales/*.json 的 `goldHistory` 命名空間（含 ERAS / MED_ERAS 陣列用 t.raw）；
// 唯一一張 PhImg 的 kw/lock 在 lib/content/gold-history.layout.ts。
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';
import PhImg from '@/components/PhImg';
import { GOLD_HISTORY_MUSEUM_IMG } from '@/lib/gold-history.layout';

const richTags = {
  em: (c: ReactNode) => <em>{c}</em>,
  br: () => <br />,
};

type Era = { y: string; zh: string; p: string };

export default function GoldHistory() {
  useReveal();
  const t = useTranslations('goldHistory');
  const eras = t.raw('eras') as Era[];

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
          <div className="ph-timeline">
            {eras.map((e, i) => (
              <div className={'ph-era reveal d' + (i % 3)} key={e.y}>
                <span className="ph-era-y">{e.y}</span>
                <h3>{e.zh}</h3>
                <p>{e.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 黃金博物館 mini-section */}
      <section className="sec panel">
        <div className="wrap">
          <div className="origins">
            <div className="ph reveal">
              <PhImg kw={GOLD_HISTORY_MUSEUM_IMG.kw} lock={GOLD_HISTORY_MUSEUM_IMG.lock} src={GOLD_HISTORY_MUSEUM_IMG.img} />
              <span className="cap">{t('museum.cap')}</span>
            </div>
            <div className="body reveal d1">
              <span className="kicker" style={{ display: 'block', marginBottom: '18px' }}>
                {t('museum.kicker')}
              </span>
              <h2 className="ed-title" style={{ fontSize: 'clamp(26px,3.4vw,42px)', marginBottom: '24px' }}>
                {t.rich('museum.title', richTags)}
              </h2>
              <p>{t.rich('museum.p1', richTags)}</p>
              <p>{t('museum.p2')}</p>
              <p>{t('museum.p3')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-cta">
        <div className="wrap pc-in">
          <h2 className="reveal">{t.rich('cta.title', richTags)}</h2>
          <p className="reveal d1">{t('cta.sub')}</p>
          <div className="pc-row reveal d2">
            <Link className="btn btn-gold" href="/brand-tech">
              {t('cta.tech')}
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
