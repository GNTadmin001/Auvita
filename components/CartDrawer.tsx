'use client';
// 滑出式購物車抽屜。原 cart.jsx 的 QtyStep + CartDrawer。
// 監聽 'cart:open' 事件開啟；連結 shop.html/checkout.html → next-intl Link。
// i18n 標準分離：文字在 locales/*.json 的 `cart.drawer` 命名空間。
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Cart, ntd, useCart } from '@/lib/cart';
import PhImg from '@/components/PhImg';
import { BagIcon } from '@/components/CartButton';

export function QtyStep({
  value,
  onMinus,
  onPlus,
}: {
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  const t = useTranslations('cart.drawer');
  return (
    <div className="qstep">
      <button onClick={onMinus} aria-label={t('minusLabel')}>
        −
      </button>
      <span>{value}</span>
      <button onClick={onPlus} aria-label={t('plusLabel')}>
        +
      </button>
    </div>
  );
}

export default function CartDrawer() {
  const t = useTranslations('cart.drawer');
  const items = useCart();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const o = () => setOpen(true);
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('cart:open', o);
    window.addEventListener('keydown', esc);
    return () => {
      window.removeEventListener('cart:open', o);
      window.removeEventListener('keydown', esc);
    };
  }, []);
  const total = items.reduce((n, i) => n + i.price * i.qty, 0);
  return (
    <>
      <div className={'cart-scrim' + (open ? ' on' : '')} onClick={() => setOpen(false)} />
      <aside className={'cart-drawer' + (open ? ' on' : '')} aria-hidden={!open}>
        <div className="cd-head">
          <span className="cd-title">
            {t('title')}<small>{t('titleEn')}</small>
          </span>
          <button className="cd-close" onClick={() => setOpen(false)} aria-label={t('closeLabel')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cd-empty">
            <BagIcon />
            <p>{t('empty')}</p>
            <Link className="btn btn-out" href="/shop">
              {t('shop')}
            </Link>
          </div>
        ) : (
          <>
            <div className="cd-items">
              {items.map((it) => (
                <div className="cd-item" key={it.id}>
                  <div className="cd-thumb">
                    <PhImg kw={it.kw || ''} lock={it.lock ?? 0} w={200} h={200} />
                  </div>
                  <div className="cd-meta">
                    <div className="cd-fam">{it.family}</div>
                    <div className="cd-name">{it.zh}</div>
                    <div className="cd-price">{ntd(it.price)}</div>
                    <div className="cd-row">
                      <QtyStep
                        value={it.qty}
                        onMinus={() => Cart.setQty(it.id, it.qty - 1)}
                        onPlus={() => Cart.setQty(it.id, it.qty + 1)}
                      />
                      <button className="cd-remove" onClick={() => Cart.remove(it.id)}>
                        {t('remove')}
                      </button>
                    </div>
                  </div>
                  <div className="cd-line">{ntd(it.price * it.qty)}</div>
                </div>
              ))}
            </div>
            <div className="cd-foot">
              <div className="cd-sub">
                <span>{t('subtotal')}</span>
                <span className="cd-sum">{ntd(total)}</span>
              </div>
              <p className="cd-note">{t('note')}</p>
              <Link className="btn btn-gold cd-checkout" href="/checkout">
                {t('checkout')}
              </Link>
              <Link className="cd-cont" href="/shop">
                {t('continue')}
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
