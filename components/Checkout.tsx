'use client';
// 結帳 — 檢視購物車、收件表單、小計/運費/總計。確認下單為 stub（清空購物車、不接金流）。原 checkout.jsx。
// 文字暫內嵌中文（i18n 留收尾）。SiteHeader/SiteFooter 由 page.tsx 組裝。
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';
import { Cart, ntd, useCart } from '@/lib/cart';
import { QtyStep } from '@/components/CartDrawer';
import PhImg from '@/components/PhImg';

const SHIP_FREE_OVER = 3000;
const SHIP_FEE = 160;

const FIELDS: [string, string, string][] = [
  ['收件人姓名', 'name', '請輸入姓名'],
  ['手機', 'phone', '09xx-xxx-xxx'],
  ['電子郵件', 'email', 'you@example.com'],
  ['收件地址', 'addr', '縣市 / 區 / 詳細地址'],
];

function CheckoutForm() {
  return (
    <div className="co-form">
      <h3 className="co-h">收件資訊</h3>
      {FIELDS.map(([label, key, ph]) => (
        <label className="co-field" key={key}>
          <span>{label}</span>
          <input type="text" placeholder={ph} />
        </label>
      ))}
      <label className="co-field">
        <span>備註</span>
        <textarea rows={2} placeholder="配送或包裝需求（選填）"></textarea>
      </label>
      <h3 className="co-h" style={{ marginTop: '38px' }}>
        付款方式
      </h3>
      <div className="co-pay-stub">
        <div className="co-pay-ic">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M3 10h18" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <b>金流由外部廠商串接</b>
          <p>
            信用卡 / ATM / 行動支付等付款流程，將由合作金流服務商於此處接入。目前為基本架構，按「確認下單」可模擬建立訂單。
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
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

  return (
    <>
      <section className="subhero" style={{ paddingBottom: '40px' }}>
        <div className="wrap">
          <div className="crumbs rise">
            <Link href="/">首頁</Link> ／ <Link href="/shop">全部商品</Link> ／ 結帳
          </div>
          <span className="sh-k rise">Checkout · 結帳</span>
          <h1 className="rise d1" style={{ fontSize: 'clamp(34px,4.4vw,56px)' }}>
            確認您的<em>訂單</em>
          </h1>
        </div>
      </section>

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {placed ? (
            <div className="co-done reveal in">
              <div className="co-done-mark">✓</div>
              <h2>訂單已建立</h2>
              <p>這是基本架構的模擬下單。實際付款與金流確認，將由外部合作廠商串接後完成。</p>
              <div className="pc-row" style={{ justifyContent: 'center' }}>
                <Link className="btn btn-out" href="/shop">
                  繼續選購
                </Link>
                <Link className="btn btn-gold" href="/">
                  回到首頁
                </Link>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="co-done reveal in">
              <h2 style={{ marginTop: 0 }}>購物車是空的</h2>
              <p>尚未加入任何商品。</p>
              <Link className="btn btn-gold" href="/shop">
                前往選購
              </Link>
            </div>
          ) : (
            <div className="co-grid">
              <div className="co-left reveal">
                <h3 className="co-h">
                  商品明細<small>{items.reduce((n, i) => n + i.qty, 0)} 件</small>
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
                            移除
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
                <h3 className="co-h">訂單金額</h3>
                <div className="co-sumrow">
                  <span>商品小計</span>
                  <span>{ntd(subtotal)}</span>
                </div>
                <div className="co-sumrow">
                  <span>運費{ship === 0 && <em>（滿 {ntd(SHIP_FREE_OVER)} 免運）</em>}</span>
                  <span>{ship === 0 ? '免運' : ntd(ship)}</span>
                </div>
                <div className="co-sumrow total">
                  <span>應付總額</span>
                  <span className="co-total">{ntd(total)}</span>
                </div>
                <p className="co-tax">金額已含營業稅</p>
                <button
                  className="btn btn-gold co-place"
                  onClick={() => {
                    setPlaced(true);
                    Cart.clear();
                    window.scrollTo(0, 0);
                  }}
                >
                  確認下單
                </button>
                <Link className="cd-cont" href="/shop">
                  繼續選購
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
