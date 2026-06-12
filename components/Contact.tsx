'use client';
// 聯絡我們 — 洽詢表單 + 品牌生態系外連 + 門市。原 contact.jsx。
// i18n 標準分離：文字在 locales/*.json 的 `contact` 命名空間；
// 圖片（kw/lock）、外連 href、跨語通用聯絡資料在 lib/content/contact.layout.ts（三語共用）。
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { useReveal, useHashScroll } from '@/lib/reveal';
import Arw from '@/components/Arw';
import {
  CONTACT_LINKS,
  CONTACT_STORES,
  CONTACT_DIRECT,
} from '@/lib/contact.layout';

const richTags = {
  em: (c: ReactNode) => <em>{c}</em>,
};

export default function Contact() {
  useReveal();
  useHashScroll();
  const t = useTranslations('contact');
  const formAlert = t('form.alert');
  const typeOptions = t.raw('form.typeOptions') as string[];

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

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="ct-grid">
            {/* form */}
            <div className="co-form reveal" style={{ marginTop: 0 }}>
              <h3 className="co-h">{t('form.title')}</h3>
              <label className="co-field">
                <span>{t('form.nameLabel')}</span>
                <input type="text" placeholder={t('form.namePh')} />
              </label>
              <label className="co-field">
                <span>{t('form.emailLabel')}</span>
                <input type="text" placeholder={t('form.emailPh')} />
              </label>
              <label className="co-field">
                <span>{t('form.typeLabel')}</span>
                <select defaultValue={typeOptions[0]}>
                  {typeOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="co-field">
                <span>{t('form.msgLabel')}</span>
                <textarea rows={4} placeholder={t('form.msgPh')}></textarea>
              </label>
              <button
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={(e) => {
                  e.preventDefault();
                  alert(formAlert);
                }}
              >
                {t('form.submit')}
              </button>
            </div>

            {/* info + ecosystem */}
            <aside className="reveal d1">
              <div className="ct-info">
                <h3 className="co-h">{t('direct.title')}</h3>
                <div className="ct-row">
                  <span>{t('direct.phone')}</span>
                  <a href={`tel:${CONTACT_DIRECT.phone.replace(/\s+/g, '')}`}>{CONTACT_DIRECT.phone}</a>
                </div>
                <div className="ct-row">
                  <span>{t('direct.email')}</span>
                  <a href={`mailto:${CONTACT_DIRECT.email}`}>{CONTACT_DIRECT.email}</a>
                </div>
                <div className="ct-row">
                  <span>{t('direct.addr')}</span>
                  <span>{t('direct.addrValue')}</span>
                </div>
                <div className="ct-row">
                  <span>{t('direct.listing')}</span>
                  <span>{t('direct.listingValue')}</span>
                </div>
              </div>
              <div className="ct-eco">
                <h3 className="co-h">{t('ecosystem.title')}</h3>
                {CONTACT_LINKS.map((l) => (
                  <a
                    className="ct-link"
                    key={l.key}
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener"
                  >
                    <span>
                      <b>{t(`ecosystem.links.${l.key}.zh`)}</b>
                      <small>{t(`ecosystem.links.${l.key}.en`)}</small>
                    </span>
                    <Arw />
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* stores */}
      <section className="sec panel" id="stores" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '40px' }}>
            <span className="kicker">{t('stores.kicker')}</span>
            <h2 style={{ marginTop: '18px' }}>{t('stores.title')}</h2>
            <p>{t('stores.sub')}</p>
          </div>
          <div className="audience">
            {CONTACT_STORES.map((s, i) => (
              <div
                className={'audcard reveal d' + i}
                key={s.key}
                style={{ padding: 0, overflow: 'hidden' }}
              >
                <a href={s.href} target="_blank" rel="noopener" style={{ display: 'block' }}>
                  <div className="ph" style={{ height: '240px' }}>
                    <img className="ph-img" src={s.img} alt={t(`stores.items.${s.key}.zh`)} loading="lazy" />
                    <span className="cap">{t(`stores.items.${s.key}.en`)}</span>
                  </div>
                </a>
                <div style={{ padding: '32px 40px 38px' }}>
                  <span className="au-k">{t(`stores.items.${s.key}.en`)}</span>
                  <h3 style={{ fontSize: '24px', margin: '10px 0 6px' }}>
                    {t(`stores.items.${s.key}.zh`)}
                  </h3>
                  <p style={{ marginBottom: '12px' }}>{t(`stores.items.${s.key}.addr`)}</p>
                  <p style={{ marginBottom: '16px' }}>
                    <a href={`tel:${s.phone.replace(/[-\s]/g, '')}`} style={{ fontWeight: 600 }}>
                      {t('stores.phone')} {s.phone}
                    </a>
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href={s.lineHref} target="_blank" rel="noopener">
                      <img
                        src={s.lineQr}
                        alt="LINE QR"
                        style={{ width: '320px', height: '320px', borderRadius: '8px', objectFit: 'cover', display: 'block' }}
                      />
                    </a>
                    <span style={{ fontSize: '13px', color: 'var(--c-muted, #888)' }}>
                      {t('stores.lineScan')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
