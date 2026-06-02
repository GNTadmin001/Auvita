'use client';
// 全部商品 — 三家族（金箔/奈米金/奈米銀）分類篩選 + 加入購物車。原 shop.jsx 的 Shop/ShopCard。
// 文字暫內嵌中文（i18n 留收尾）。SiteHeader/SiteFooter 由 page.tsx 組裝。
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';
import { Cart, ntd } from '@/lib/cart';
import { PRODUCTS, FAMILIES, GROUPS, type Product } from '@/lib/products';
import PhImg from '@/components/PhImg';

function ShopCard({ p }: { p: Product }) {
  const [added, setAdded] = useState(false);
  const add = () => {
    Cart.add({ id: p.id, zh: p.zh, en: p.en, family: p.family, price: p.price, kw: p.kw, lock: p.lock });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };
  return (
    <div className="prod reveal">
      <Link className="ph" href="/product">
        <PhImg kw={p.kw} lock={p.lock} />
        <span className="cap">{p.en}</span>
      </Link>
      <div className="pin">
        <span className="tag">{p.en}</span>
        <h4>{p.zh}</h4>
        <p className="desc">{p.desc}</p>
        <div className="shop-foot">
          <span className="pprice">{p.ph ? '價格洽詢' : ntd(p.price)}</span>
          {p.ph ? (
            <Link className="add-btn ghost" href="/contact">
              洽詢
            </Link>
          ) : (
            <button className={'add-btn' + (added ? ' ok' : '')} onClick={add}>
              {added ? '已加入 ✓' : '加入購物車'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const [filter, setFilter] = useState('all');
  useReveal();

  // 載入時若網址帶 #foil 等分類錨點，套用為初始篩選。
  useEffect(() => {
    const h = (window.location.hash || '').replace('#', '');
    if (FAMILIES.some((f) => f.key === h)) setFilter(h);
  }, []);

  // 篩選變動後，剛掛上的卡片重跑 reveal（觸發 useReveal 的 scroll listener）。
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event('scroll')), 60);
    return () => clearTimeout(t);
  }, [filter]);

  const shown = GROUPS.filter((g) => filter === 'all' || filter === g.key);

  return (
    <>
      <section className="subhero">
        <div className="wrap">
          <div className="crumbs rise">
            <Link href="/">首頁</Link> ／ 全部商品
          </div>
          <span className="sh-k rise">Shop · 全部商品</span>
          <h1 className="rise d1">
            一處選購，<em>三個家族</em>
          </h1>
          <p className="sh-lead rise d2">
            食用金箔、奈米金、奈米銀，同源於汽化式（PVD）工藝，於此一頁總覽。加入購物車後於結帳頁計算總額。
          </p>
          <div className="shop-filter rise d3">
            {FAMILIES.map((f) => (
              <button
                key={f.key}
                className={'sf-chip' + (filter === f.key ? ' on' : '')}
                onClick={() => {
                  setFilter(f.key);
                  history.replaceState(null, '', f.key === 'all' ? '#' : '#' + f.key);
                }}
              >
                {f.zh}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-tight">
        <div className="wrap">
          {shown.map((g) => (
            <div className="pgroup" id={g.key} key={g.key}>
              <div className="pgroup-head reveal">
                <div className="pgh-l">
                  {g.ph && <span className="badge b2b">建置中 · 示意</span>}
                  <h3>{g.zh}</h3>
                </div>
                <p className="pgh-r">{g.note}</p>
              </div>
              <div className="prodgrid cols3">
                {PRODUCTS.filter((p) => p.fam === g.key).map((p) => (
                  <ShopCard key={p.id} p={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-cta">
        <div className="wrap pc-in">
          <h2 className="reveal">準備好結帳了嗎？</h2>
          <p className="reveal d1">於購物車檢視商品與總額，付款流程由外部金流串接。</p>
          <div className="pc-row reveal d2">
            <Link className="btn btn-gold" href="/checkout">
              前往結帳
            </Link>
            <Link className="btn btn-out" href="/applications">
              看產品應用
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
