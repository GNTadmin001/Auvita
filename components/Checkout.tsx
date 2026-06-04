'use client';
// 結帳 — 檢視購物車、收件表單、小計/運費/總計。確認下單為 stub（清空購物車、不接金流）。原 checkout.jsx。
// i18n 標準分離：文字在 locales/*.json 的 `checkout` 命名空間（含 form.fields 走 t.raw 陣列）。
// 運費規則常數（SHIP_FREE_OVER / SHIP_FEE）為商業設定，留在元件內。
import { useEffect, useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';
import { Cart, ntd, useCart } from '@/lib/cart';
import { QtyStep } from '@/components/CartDrawer';
import PhImg from '@/components/PhImg';

const SHIP_FREE_OVER = 3000;
const SHIP_FEE = 160;

const richTags = {
  em: (c: ReactNode) => <em>{c}</em>,
};

type Field = { label: string; ph: string };

function CheckoutForm() {
  const t = useTranslations('checkout.form');
  const fields = t.raw('fields') as Field[];
  return (
    <div className="co-form">
      <h3 className="co-h">{t('title')}</h3>
      {fields.map((f, i) => (
        <label className="co-field" key={i}>
          <span>{f.label}</span>
          <input type="text" placeholder={f.ph} />
        </label>
      ))}
      <label className="co-field">
        <span>{t('noteLabel')}</span>
        <textarea rows={2} placeholder={t('notePh')}></textarea>
      </label>
      <h3 className="co-h" style={{ marginTop: '38px' }}>
        {t('payTitle')}
      </h3>
      <div className="co-pay-stub">
        <div className="co-pay-ic">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M3 10h18" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <b>{t('payHead')}</b>
          <p>{t('payDesc')}</p>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  const t = useTranslations('checkout');
  const items = useCart();
  const [placed, setPlaced] = useState(false);
  useReveal();

  // 條件區塊（明細/空車/完成）切換後，重跑 reveal 讓新掛上的元素顯示。
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event('scroll')), 60);
    return () => clearTimeout(t);
  }, [items.length, placed]);

  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const ship = items.length === 0 || subtotal >= SHIP_FREE_OVER ? 0 : SHIP_FEE;
  const total = subtotal + ship;
  const totalCount = items.reduce((n, i) => n + i.qty, 0);

  return (
    <>
      <section className="subhero" style={{ paddingBottom: '40px' }}>
        <div className="wrap">
          <div className="crumbs rise">
            <Link href="/">{t('subhero.crumbHome')}</Link> ／{' '}
            <Link href="/shop">{t('subhero.crumbShop')}</Link> ／ {t('subhero.crumb')}
          </div>
          <span className="sh-k rise">{t('subhero.k')}</span>
          <h1 className="rise d1" style={{ fontSize: 'clamp(34px,4.4vw,56px)' }}>
            {t.rich('subhero.title', richTags)}
          </h1>
        </div>
      </section>

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {placed ? (
            <div className="co-done reveal in">
              <div className="co-done-mark">✓</div>
              <h2>{t('placed.title')}</h2>
              <p>{t('placed.p')}</p>
              <div className="pc-row" style={{ justifyContent: 'center' }}>
                <Link className="btn btn-out" href="/shop">
                  {t('placed.back')}
                </Link>
                <Link className="btn btn-gold" href="/">
                  {t('placed.home')}
                </Link>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="co-done reveal in">
              <h2 style={{ marginTop: 0 }}>{t('empty.title')}</h2>
              <p>{t('empty.sub')}</p>
              <Link className="btn btn-gold" href="/shop">
                {t('empty.cta')}
              </Link>
            </div>
          ) : (
            <div className="co-grid">
              <div className="co-left reveal">
                <h3 className="co-h">
                  {t('items.title')}
                  <small>
                    {totalCount} {t('items.qty')}
                  </small>
                </h3>
                <div className="co-lines">
                  {items.map((it) => (
                    <div className="co-line" key={it.id}>
                      <div className="co-thumb">
                        <PhImg kw={it.kw || ''} lock={it.lock ?? 0} w={160} h={160} />
                      </div>
                      <div className="co-info">
                        <div className="cd-fam">{it.family}</div>
                        <div className="co-name">{it.zh}</div>
                        <div className="co-row">
                          <QtyStep
                            value={it.qty}
                            onMinus={() => Cart.setQty(it.id, it.qty - 1)}
                            onPlus={() => Cart.setQty(it.id, it.qty + 1)}
                          />
                          <button className="cd-remove" onClick={() => Cart.remove(it.id)}>
                            {t('items.remove')}
                          </button>
                        </div>
                      </div>
                      <div className="co-amt">{ntd(it.price * it.qty)}</div>
                    </div>
                  ))}
                </div>
                <CheckoutForm />
              </div>

              <aside className="co-summary reveal d1">
                <h3 className="co-h">{t('summary.title')}</h3>
                <div className="co-sumrow">
                  <span>{t('summary.subtotal')}</span>
                  <span>{ntd(subtotal)}</span>
                </div>
                <div className="co-sumrow">
                  <span>
                    {t('summary.ship')}
                    {ship === 0 && (
                      <em>{t('summary.shipFreeOver', { amount: ntd(SHIP_FREE_OVER) })}</em>
                    )}
                  </span>
                  <span>{ship === 0 ? t('summary.shipFree') : ntd(ship)}</span>
                </div>
                <div className="co-sumrow total">
                  <span>{t('summary.total')}</span>
                  <span className="co-total">{ntd(total)}</span>
                </div>
                <p className="co-tax">{t('summary.tax')}</p>
                <button
                  className="btn btn-gold co-place"
                  onClick={() => {
                    setPlaced(true);
                    Cart.clear();
                    window.scrollTo(0, 0);
                  }}
                >
                  {t('summary.place')}
                </button>
                <Link className="cd-cont" href="/shop">
                  {t('summary.continue')}
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
