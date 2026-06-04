'use client';
// 最新活動 — 資料來自 data/promotions/active.json（由 schedule.json 經 build-active.mjs 切出當期）。
// schedule.json 的唯一真相為 Google Sheet → n8n → GitHub Action；請勿手改 active.json（每次 build 會被覆蓋）。
// active 為空時退回「建置中」佔位卡。
// i18n 標準分離：文字在 locales/*.json 的 `news` 命名空間；
// 佔位卡的圖（kw/lock）在 lib/content/news.layout.ts（三語共用）。
// active.json 內容本身已含 zh-TW/en/ja，屬資料層，由 promotion type 直接取。
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';
import PhImg from '@/components/PhImg';
import activeData from '@/data/promotions/active.json';
import type { Promotion, SupportedLocale } from '@/types/promotion';
import { NEWS_PLACEHOLDERS } from '@/lib/content/news.layout';

const PROMOS = activeData as unknown as Promotion[];

const richTags = {
  em: (c: ReactNode) => <em>{c}</em>,
};

type Props = { locale?: string };

export default function News({ locale = 'zh-TW' }: Props) {
  useReveal();
  const t = useTranslations('news');
  const loc = locale as SupportedLocale;
  const hasPromos = PROMOS.length > 0;

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
          {!hasPromos && <span className="ph-flag rise d3">{t('subhero.comingSoon')}</span>}
        </div>
      </section>

      <section className="sec-tight">
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
                      <PhImg kw={p.kw} lock={p.lock} />
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
    </>
  );
}
