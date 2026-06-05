'use client';
// 全部商品 — 三家族（金箔/奈米金/奈米銀）分類篩選 + 加入購物車。原 shop.jsx 的 Shop/ShopCard。
// 文字暫內嵌中文（i18n 留收尾）。SiteHeader/SiteFooter 由 page.tsx 組裝。
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';
import { Cart, ntd } from '@/lib/cart';
import { PRODUCTS, FAMILIES, GROUPS, type Product } from '@/lib/products';
import PhImg from '@/components/PhImg';

// shown：深連結目標卡。由 React 掌控「已顯示」狀態（in + reveal-instant），
// 而非用 classList 手動加 —— 否則 flash 在 2.2s 清除時 React 重寫 class 會把手動加的洗掉。
function ShopCard({ p, flash, shown }: { p: Product; flash?: boolean; shown?: boolean }) {
  const [added, setAdded] = useState(false);
  const add = () => {
    Cart.add({ id: p.id, zh: p.zh, en: p.en, family: p.family, price: p.price, kw: p.kw, lock: p.lock });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };
  return (
    <div
      className={'prod reveal' + (shown ? ' in reveal-instant' : '') + (flash ? ' flash' : '')}
      id={p.id}
      style={{ scrollMarginTop: '110px' }}
    >
      <Link className="ph" href="/product">
        <PhImg kw={p.kw} lock={p.lock} eager={shown} src={p.img} />
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
          ) : p.noOnline ? (
            <span className="add-btn ghost" style={{ cursor: 'default', opacity: 0.55 }}>
              無法網路販售
            </span>
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
  const [highlightId, setHighlightId] = useState('');
  // pinned：深連結造訪過的商品 id。永久標記為已顯示，避免 highlightId 清除後 React 覆寫 class。
  const [pinned, setPinned] = useState<string[]>([]);
  useReveal();

  // 載入 / hash 變動時解析錨點：
  //   #foil 等家族 key → 切該家族篩選；
  //   #foil-wine 等商品 id → 切到該商品所屬家族，捲動定位並短暫高亮該卡。
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const rafs: number[] = [];
    const applyHash = () => {
      const h = (window.location.hash || '').replace('#', '');
      if (!h) return;
      if (FAMILIES.some((f) => f.key === h)) {
        setFilter(h);
        return;
      }
      const prod = PRODUCTS.find((p) => p.id === h);
      if (!prod) return;
      setFilter(prod.fam);
      setHighlightId(h);
      setPinned((arr) => (arr.includes(h) ? arr : [...arr, h]));
      // 雙 rAF：等 React commit + 該 frame 繪製，DOM 確定掛好後再 scroll；
      // scroll 前對所有 .reveal 同時加 .in 與 .reveal-instant：.in 設終點狀態、
      // .reveal-instant 直接關掉 1.1s transition，元素「瞬間實心」而非「開始播放淡入」，
      // 否則淡入會疊在 smooth scroll 上，視覺像「整塊消失 2 秒再出現」。
      // 目標卡的圖另由 eager={flash} 提前載入（lazy 圖在畫面外不會預抓）。
      const r1 = requestAnimationFrame(() => {
        const r2 = requestAnimationFrame(() => {
          document.querySelectorAll('.reveal').forEach((e) => e.classList.add('in', 'reveal-instant'));
          document.getElementById(h)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        rafs.push(r2);
      });
      rafs.push(r1);
      timers.push(setTimeout(() => setHighlightId(''), 2200));
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => {
      window.removeEventListener('hashchange', applyHash);
      timers.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
    };
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
                  <ShopCard key={p.id} p={p} flash={highlightId === p.id} shown={pinned.includes(p.id)} />
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
