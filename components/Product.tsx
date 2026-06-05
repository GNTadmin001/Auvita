'use client';
// 商品詳情（食用金箔 9999）— sticky gallery、數量 stepper、加入購物車。原 product.jsx 的 Product。
// 文字暫內嵌中文（i18n 留收尾）。SiteHeader/SiteFooter 由 page.tsx 組裝。
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';
import { Cart } from '@/lib/cart';
import { IMG } from '@/lib/img';

// "食用_金箔_ 9999" → 食用<em>金箔</em> 9999
function emphP(t: string) {
  const p = t.split('_');
  return (
    <>
      {p[0]}
      <em>{p[1]}</em>
      {p[2] || ''}
    </>
  );
}

const THUMBS = ['正面 · 禮盒', '金箔 · 微距', '情境 · 香檳', '證書 · SGS'];
const THUMB_KW = ['giftbox', 'goldleaf', 'champagne', 'document'];
const THUMB_IMGS = [
  '/images/金純.jpg',
  '/images/金純.jpg',
  '/images/金純.jpg',
  '/images/金純.jpg',
];
const SPECS: [string, string][] = [
  ['純度 Purity', '9999 (≥99.9%)'],
  ['薄度 Thickness', '100 nm'],
  ['製程 Process', 'PVD 物理氣相沉積'],
  ['基底 Base', '製藥級純水'],
  ['風味 Taste', '無色・無味'],
  ['規格 Format', '單片裝 ×10 / 禮盒'],
  ['產地 Origin', '台灣製造'],
  ['認證 Certs', 'TFDA・EU E175・FDA'],
];
const REVIEWS: [string, string, string][] = [
  ['小薰，台北', '祝壽禮盒 · 金釀黃金酒', '幫媽媽的七十大壽訂了黃金酒禮盒，打開的那一刻她說從來沒收過這麼特別的禮物。金色在燈光下閃閃發亮，拍照真的很美。'],
  ['Chef Jason，高雄', '食用金箔 · B2B 採購', '我們餐廳用食用金箔做甜點拍照，客人很喜歡打卡，曝光量明顯增加。品質穩定，每次用起來都很安心。'],
  ['依萍，新竹', '週年紀念 · 金釀黃金酒', '結婚一週年送先生黃金威士忌，他打開禮盒的表情讓我很感動。包裝非常有質感，附的故事卡也寫得很動人。'],
];
const STEPS: [string, string, string][] = [
  ['01', '開瓶，少量取用', '用乾燥的工具輕輕取出少量金箔，一點點就有驚人的視覺效果。'],
  ['02', '輕撒或貼附於食物', '直接撒於甜點、巧克力表面，或撒入飲料欣賞金色擴散的瞬間。'],
  ['03', '拍照，然後享用', '金色在燈光下閃耀，是天生的打卡素材。食用後完全無色無味。'],
];

const RELATED: [string, string, string][] = [
  ['Gold Dust · 香草', '金粉_複方_', 'chocolate'],
  ['Gold Dust · 無味', '金粉_複方_', 'spice'],
  ['Au Foil · 100nm', '金箔_9999_', 'goldleaf'],
  ['Brew Gold', '金釀_黃金酒_', 'whisky'],
];
const RELATED_IMGS = [
  '/images/4號金粉.png',
  '/images/4號金粉.png',
  '/images/金純.jpg',
  '',
];

export default function Product() {
  const [thumb, setThumb] = useState(0);
  const [qty, setQty] = useState(1);
  useReveal();
  return (
    <>
      <div className="wrap pd">
        <div className="crumbs reveal in">
          <Link href="/">首頁</Link> &nbsp;/&nbsp; <Link href="/shop">全部商品</Link> &nbsp;/&nbsp;{' '}
          <span style={{ color: 'var(--k-gold-lt)' }}>食用金箔 9999</span>
        </div>
        <div className="pd-main">
          <div className="pd-gallery reveal in">
            <div className="ph main">
              <img
                className="ph-img"
                alt=""
                src={THUMB_IMGS[thumb] || IMG(THUMB_KW[thumb], 80 + thumb, 1100, 1100)}
                onError={(e) => {
                  e.currentTarget.remove();
                }}
              />
              <span className="cap">{THUMBS[thumb]} imagery</span>
            </div>
            <div className="pd-thumbs">
              {THUMBS.map((t, i) => (
                <div
                  key={t}
                  className={'ph' + (i === thumb ? ' on' : '')}
                  onClick={() => setThumb(i)}
                >
                  <img
                    className="ph-img"
                    alt=""
                    src={THUMB_IMGS[i] || IMG(THUMB_KW[i], 80 + i, 320, 320)}
                    onError={(e) => {
                      e.currentTarget.remove();
                    }}
                  />
                  <span className="cap" style={{ fontSize: '8px', bottom: '8px', left: '8px' }}>
                    {t.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="pd-info reveal in d1">
            <span className="tag">Appe Gold · 最受歡迎</span>
            <h1>{emphP('食用_金箔_ 9999')}</h1>
            <div className="price">
              NT$ 1,280 <small>/ 禮盒（10 片裝）</small>
            </div>
            <hr className="rule" style={{ margin: '22px 0' }} />
            <p className="pdesc">
              9999 純金、純水，PVD 製程，薄度僅 100nm。無色無味，開瓶即用——
              為飲品、湯品、甜點與酒品鋪上一層永恆金光。台灣唯一取得 TFDA 食品添加許可之汽化金箔。
            </p>
            <div className="spec-table">
              {SPECS.slice(0, 5).map(([k, v]) => (
                <div className="r" key={k}>
                  <span className="k">{k}</span>
                  <span className="v">{v}</span>
                </div>
              ))}
            </div>
            <div className="pd-actions">
              <div className="qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="n">{qty}</span>
                <button onClick={() => setQty(qty + 1)}>＋</button>
              </div>
              <button
                className="btn btn-gold"
                onClick={() =>
                  Cart.add(
                    { id: 'foil-leaf', zh: '食用金箔', en: 'Edible Gold Leaf', family: '金箔', price: 1280, kw: 'gold,leaf', lock: 12 },
                    qty,
                  )
                }
              >
                加入購物車
              </button>
              <Link className="btn btn-out" href="/contact">
                企業詢價
              </Link>
            </div>
            <div className="pd-certs">
              <span>SNQ 2025</span>
              <span>SGS ≥99.9%</span>
              <span>TFDA</span>
              <span>EU · E175</span>
              <span>FDA</span>
              <span>HALAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* How to use */}
      <section className="sec panel" style={{ marginTop: '120px' }}>
        <div className="wrap">
          <div className="sec-head center" style={{ marginBottom: '54px' }}>
            <span className="kicker reveal">How to use</span>
            <h2 className="reveal d1 ed-title">
              簡單使用，<em>驚豔效果</em>
            </h2>
            <p className="reveal d2">不需任何特殊工具，開瓶即用，輕鬆創造米其林等級的視覺美感。</p>
          </div>
          <div className="prodgrid cols3">
            {STEPS.map(([n, h, d], i) => (
              <div className={'reveal d' + ((i % 3) + 1)} key={n} style={{ padding: '6px 8px' }}>
                <div className="disp foil-text" style={{ fontSize: '54px', lineHeight: 1 }}>
                  {n}
                </div>
                <h4
                  className="serif"
                  style={{ fontSize: '21px', letterSpacing: '.06em', margin: '14px 0 10px', color: 'var(--k-white)' }}
                >
                  {h}
                </h4>
                <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.85, color: 'var(--k-dim)' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full spec */}
      <section className="sec">
        <div className="wrap-narrow">
          <div className="sec-head reveal" style={{ marginBottom: '34px' }}>
            <span className="kicker">Specification · 完整規格</span>
          </div>
          <div className="spec-table reveal d1">
            {SPECS.map(([k, v]) => (
              <div className="r" key={k}>
                <span className="k">{k}</span>
                <span className="v">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="sec panel">
        <div className="wrap">
          <div className="sec-head center" style={{ marginBottom: '50px' }}>
            <span className="kicker reveal">Reviews</span>
            <h2 className="reveal d1 ed-title">
              他們<em>說的話</em>
            </h2>
            <p className="reveal d2">
              <span className="foil-text" style={{ letterSpacing: '.2em' }}>
                ★★★★★
              </span>
              　4.9 · 來自真實顧客的回饋
            </p>
          </div>
          <div className="prodgrid cols3">
            {REVIEWS.map(([who, ctx, txt], i) => (
              <div className={'prod reveal d' + ((i % 3) + 1)} key={who} style={{ padding: '30px 28px' }}>
                <div className="foil-text" style={{ letterSpacing: '.18em', fontSize: '14px' }}>
                  ★★★★★
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: 'var(--k-white)',
                    margin: '16px 0 20px',
                    letterSpacing: '.03em',
                  }}
                >
                  「{txt}」
                </p>
                <div
                  style={{
                    fontSize: '13px',
                    color: 'var(--k-gold-lt)',
                    fontFamily: 'var(--font-latin-sc)',
                    letterSpacing: '.1em',
                  }}
                >
                  {who}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--k-mute)', marginTop: '5px' }}>{ctx}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '40px' }}>
            <span className="kicker">You may also like · 推薦搭配</span>
          </div>
          <div className="prodgrid">
            {RELATED.map(([tag, name, kw], i) => (
              <Link className={'prod reveal d' + ((i % 3) + 1)} href="/product" key={i}>
                <div className="ph" style={{ height: '220px' }}>
                  <img
                    className="ph-img"
                    alt=""
                    src={RELATED_IMGS[i] || IMG(kw, 90 + i, 720, 660)}
                    onError={(e) => {
                      e.currentTarget.remove();
                    }}
                  />
                  <span className="cap">{tag}</span>
                </div>
                <div className="pin">
                  <span className="tag">{tag}</span>
                  <h4>{emphP(name)}</h4>
                  <div className="pfoot">
                    <span className="ask">查看商品</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
