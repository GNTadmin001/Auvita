'use client';
// 全部商品 — 兩家族（金箔/汽化材料）分類篩選 + 加入購物車。
// foil-wine 特殊行為：點擊開啟 PdfFlipViewer（client-only），非路由跳轉。
import { useEffect, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';
import { Cart, ntd } from '@/lib/cart';
import { PRODUCTS, FAMILIES, GROUPS, type Product } from '@/lib/products';
import PhImg from '@/components/PhImg';

// SSR=false：pdfjs 使用 browser API，不可在 server 端執行
const PdfFlipViewer = dynamic(() => import('@/components/PdfFlipViewer'), { ssr: false });

const richTags = {
  em: (c: ReactNode) => <em>{c}</em>,
};

function ShopCard({
  p,
  flash,
  shown,
  onPdfClick,
}: {
  p: Product;
  flash?: boolean;
  shown?: boolean;
  onPdfClick?: () => void;
}) {
  const [added, setAdded] = useState(false);
  const add = () => {
    Cart.add({ id: p.id, zh: p.zh, en: p.en, family: p.family, price: p.price, kw: p.kw, lock: p.lock });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  // 圖片區域：有 pdfUrl → 按鈕觸發 PDF modal；否則 → 路由
  const thumb = p.pdfUrl ? (
    <button className="ph ph-btn" onClick={onPdfClick} aria-label={`查看 ${p.zh} 商品 DM`}>
      <PhImg kw={p.kw} lock={p.lock} eager={shown} src={p.img} />
      <span className="cap">{p.en}</span>
    </button>
  ) : (
    <Link className="ph" href={`/product/${p.id}`}>
      <PhImg kw={p.kw} lock={p.lock} eager={shown} src={p.img} />
      <span className="cap">{p.en}</span>
    </Link>
  );

  // CTA 按鈕
  let cta: ReactNode;
  if (p.pdfUrl) {
    cta = (
      <button className="add-btn" onClick={onPdfClick}>
        查看商品 DM
      </button>
    );
  } else if (p.ph) {
    cta = (
      <Link className="add-btn ghost" href="/contact">
        洽詢
      </Link>
    );
  } else if (p.noOnline) {
    cta = (
      <span className="add-btn ghost" style={{ cursor: 'default', opacity: 0.55 }}>
        無法網路販售
      </span>
    );
  } else {
    cta = (
      <button className={'add-btn' + (added ? ' ok' : '')} onClick={add}>
        {added ? '已加入 ✓' : '加入購物車'}
      </button>
    );
  }

  return (
    <div
      className={'prod reveal' + (shown ? ' in reveal-instant' : '') + (flash ? ' flash' : '')}
      id={p.id}
      style={{ scrollMarginTop: '110px' }}
    >
      {thumb}
      <div className="pin">
        <span className="tag">{p.en}</span>
        <h4>{p.zh}</h4>
        <p className="desc">{p.desc}</p>
        <div className="shop-foot">
          <span className="pprice">{p.ph ? '價格洽詢' : ntd(p.price)}</span>
          {cta}
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const t = useTranslations('shop');
  const [filter, setFilter] = useState('all');
  const [highlightId, setHighlightId] = useState('');
  const [pinned, setPinned] = useState<string[]>([]);
  // PDF viewer：null = 未開啟；Product = 正在查看的商品
  const [pdfProduct, setPdfProduct] = useState<Product | null>(null);
  useReveal();

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
            <Link href="/">{t('crumbHome')}</Link> ／ {t('crumb')}
          </div>
          <span className="sh-k rise">{t('k')}</span>
          <h1 className="rise d1">{t.rich('title', richTags)}</h1>
          <p className="sh-lead rise d2">{t('lead')}</p>
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
                  <ShopCard
                    key={p.id}
                    p={p}
                    flash={highlightId === p.id}
                    shown={pinned.includes(p.id)}
                    onPdfClick={p.pdfUrl ? () => setPdfProduct(p) : undefined}
                  />
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

      {/* PDF viewer modal */}
      {pdfProduct?.pdfUrl && (
        <PdfFlipViewer
          url={pdfProduct.pdfUrl}
          title={pdfProduct.zh}
          externalUrl={pdfProduct.externalUrl}
          onClose={() => setPdfProduct(null)}
        />
      )}
    </>
  );
}
