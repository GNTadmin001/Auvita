'use client';
// 滑出式購物車抽屜。原 cart.jsx 的 QtyStep + CartDrawer。
// 監聽 'cart:open' 事件開啟；連結 shop.html/checkout.html → next-intl Link。
import { useEffect, useState } from 'react';
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
  return (
    <div className="qstep">
      <button onClick={onMinus} aria-label="減少">
        −
      </button>
      <span>{value}</span>
      <button onClick={onPlus} aria-label="增加">
        +
      </button>
    </div>
  );
}

export default function CartDrawer() {
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
            購物車<small>YOUR BAG</small>
          </span>
          <button className="cd-close" onClick={() => setOpen(false)} aria-label="關閉">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cd-empty">
            <BagIcon />
            <p>購物車是空的</p>
            <Link className="btn btn-out" href="/shop">
              前往選購
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
                        移除
                      </button>
                    </div>
                  </div>
                  <div className="cd-line">{ntd(it.price * it.qty)}</div>
                </div>
              ))}
            </div>
            <div className="cd-foot">
              <div className="cd-sub">
                <span>小計</span>
                <span className="cd-sum">{ntd(total)}</span>
              </div>
              <p className="cd-note">運費與稅額於結帳頁計算 · 付款由外部金流串接</p>
              <Link className="btn btn-gold cd-checkout" href="/checkout">
                前往結帳
              </Link>
              <Link className="cd-cont" href="/shop">
                繼續選購
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
