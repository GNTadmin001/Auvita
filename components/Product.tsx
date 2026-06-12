'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';
import { Cart } from '@/lib/cart';
import { IMG } from '@/lib/products';
import { type Product } from '@/lib/products';

const PdfFlipViewer = dynamic(() => import('@/components/PdfFlipViewer'), { ssr: false });

export default function Product({ p }: { p: Product }) {
  const [thumb, setThumb] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  useReveal();

  const images = p.thumbImgs ?? (p.img ? [p.img] : []);
  const labels = p.thumbLabels ?? [p.zh];
  const kws = p.thumbKw ?? p.kw.split(',');

  const add = () => {
    Cart.add({ id: p.id, zh: p.zh, en: p.en, family: p.family, price: p.price, kw: p.kw, lock: p.lock }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <>
      <div className="wrap pd">
        <div className="crumbs reveal in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            <Link href="/">首頁</Link> &nbsp;/&nbsp; <Link href="/shop">全部商品</Link> &nbsp;/&nbsp;{' '}
            <span style={{ color: 'var(--k-gold-lt)' }}>{p.zh}</span>
          </span>
          <Link href="/shop" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--k-mute)', letterSpacing: '.12em' }}>
            ← 上一頁
          </Link>
        </div>

        <div className="pd-main">
          {/* Gallery */}
          <div className="pd-gallery reveal in">
            <div className="ph main">
              <img
                className="ph-img"
                alt=""
                src={images[thumb] || IMG(kws[thumb] ?? kws[0], 80 + thumb, 1100, 1100)}
                onError={(e) => { e.currentTarget.remove(); }}
              />
              <span className="cap">{labels[thumb]}</span>
            </div>
            {images.length > 1 && (
              <div className="pd-thumbs">
                {images.map((src, i) => (
                  <div
                    key={i}
                    className={'ph' + (i === thumb ? ' on' : '')}
                    onClick={() => setThumb(i)}
                  >
                    <img
                      className="ph-img"
                      alt=""
                      src={src || IMG(kws[i] ?? kws[0], 80 + i, 320, 320)}
                      onError={(e) => { e.currentTarget.remove(); }}
                    />
                    <span className="cap" style={{ fontSize: '8px', bottom: '8px', left: '8px' }}>
                      {(labels[i] ?? '').split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info reveal in d1">
            {p.tag && <span className="tag">Appe Gold · {p.tag}</span>}
            <h1>{p.zh}</h1>
            {!p.ph && (
              <div className="price">
                NT$ {p.price.toLocaleString()}
                {p.unit && <small> / {p.unit}</small>}
              </div>
            )}
            <hr className="rule" style={{ margin: '22px 0' }} />
            <p className="pdesc">{p.longDesc ?? p.desc}</p>

            {p.specs && (
              <div className="spec-table">
                {p.specs.map(([k, v]) => (
                  <div className="r" key={k}>
                    <span className="k">{k}</span>
                    <span className="v">{v}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pd-actions">
              {!p.ph && !p.pdfUrl && !p.noOnline && (
                <div className="qty">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span className="n">{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>＋</button>
                </div>
              )}

              {p.ph ? (
                <Link className="btn btn-gold" href="/contact">洽詢報價</Link>
              ) : p.pdfUrl ? (
                <button className="btn btn-gold" onClick={() => setPdfOpen(true)}>查看商品 DM</button>
              ) : p.noOnline ? (
                <span className="btn btn-gold" style={{ opacity: 0.5, cursor: 'default' }}>無法網路販售</span>
              ) : (
                <button className={'btn btn-gold' + (added ? ' ok' : '')} onClick={add}>
                  {added ? '已加入 ✓' : '加入購物車'}
                </button>
              )}

              <Link className="btn btn-out" href="/contact">企業詢價</Link>
            </div>

            {p.certs && (
              <div className="pd-certs">
                {p.certs.map((c) => <span key={c}>{c}</span>)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* How to use */}
      {p.steps && (
        <section className="sec panel" style={{ marginTop: '120px' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '54px' }}>
              <span className="kicker reveal">How to use</span>
              <h2 className="reveal d1 ed-title">簡單使用，<em>驚豔效果</em></h2>
              <p className="reveal d2">不需任何特殊工具，開瓶即用，輕鬆創造米其林等級的視覺美感。</p>
            </div>
            <div className="prodgrid cols3">
              {p.steps.map(([n, h, d], i) => (
                <div className={'reveal d' + ((i % 3) + 1)} key={n} style={{ padding: '6px 8px' }}>
                  <div className="disp foil-text" style={{ fontSize: '54px', lineHeight: 1 }}>{n}</div>
                  <h4 className="serif" style={{ fontSize: '21px', letterSpacing: '.06em', margin: '14px 0 10px', color: 'var(--k-white)' }}>{h}</h4>
                  <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.85, color: 'var(--k-dim)' }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PDF DM viewer（foil-wine 等有 pdfUrl 的商品） */}
      {pdfOpen && p.pdfUrl && (
        <PdfFlipViewer
          url={p.pdfUrl}
          title={p.zh}
          externalUrl={p.externalUrl}
          onClose={() => setPdfOpen(false)}
        />
      )}
    </>
  );
}
