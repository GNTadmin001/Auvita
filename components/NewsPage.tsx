'use client';
import type { ReactNode } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import PhImg from '@/components/PhImg';
import activeData from '@/data/promotions/active.json';
import type { Promotion, SupportedLocale } from '@/types/promotion';
import { NEWS_PLACEHOLDERS } from '@/lib/content/news.layout';

const PROMOS = activeData as unknown as Promotion[];

const richTags = {
  em: (c: ReactNode) => <em>{c}</em>,
  br: () => <br />,
  foil: (c: ReactNode) => <span className="foil-text">{c}</span>,
};

export default function NewsPage() {
  const t = useTranslations('news');
  const locale = useLocale();
  const loc = locale as SupportedLocale;
  const hasPromos = PROMOS.length > 0;

  return (
    <main>
      <section className="subhero">
        <div className="wrap subhero-in">
          <div className="crumb">
            <Link href="/">{t('subhero.crumbHome')}</Link>
            <span>/</span>
            <span>{t('subhero.crumb')}</span>
          </div>
          <div className="kicker">{t('subhero.k')}</div>
          <h1>{t.rich('subhero.title', richTags)}</h1>
          <p className="lead">{t('subhero.lead')}</p>
        </div>
      </section>

      <section className="sec-tight" id="news">
        <div className="wrap">
          {hasPromos ? (
            <div className="prodgrid cols3">
              {PROMOS.map((p, i) => {
                const c = p[loc] ?? p['zh-TW'];
                const inner = (
                  <>
                    <div className="ph">
                      <img className="ph-img" src={p.image} alt={c.title} loading="lazy" />
                      <span className="cap">{t('promo.cap')}</span>
                    </div>
                    <div className="pin">
                      <span className="tag">{t('promo.tag')}</span>
                      <h4>{c.title}</h4>
                      <p className="desc">{c.description}</p>
                    </div>
                  </>
                );
                return (
                  <div className={'prod reveal d' + (i % 3)} key={p.id}>
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div className="prodgrid cols3">
                {NEWS_PLACEHOLDERS.map((p, i) => (
                  <div className={'prod reveal d' + (i % 3)} key={p.key}>
                    <div className="ph">
                      <PhImg kw={p.kw} lock={p.lock} src={p.img} />
                      <span className="cap">{t(`placeholder.${p.key}.tag`)}</span>
                    </div>
                    <div className="pin">
                      <span className="tag">
                        {t(`placeholder.${p.key}.tag`)} {t('placeholder.tagSuffix')}
                      </span>
                      <h4>{t(`placeholder.${p.key}.zh`)}</h4>
                      <p className="desc">{t('placeholder.desc')}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ph-banner reveal">
                <p>{t('banner.text')}</p>
                <Link className="btn btn-out" href="/contact">
                  {t('banner.cta')}
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
