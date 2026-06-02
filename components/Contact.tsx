'use client';
// 聯絡我們 — 洽詢表單 + 品牌生態系外連 + 門市（文案暫內嵌，i18n 留收尾）。原 contact.jsx。
import { Link } from '@/i18n/navigation';
import { useReveal, useHashScroll } from '@/lib/reveal';
import PhImg from '@/components/PhImg';
import Arw from '@/components/Arw';

const STORES = [
  { zh: '花蓮 黃金特色館', en: 'Hualien Gold Gallery', addr: '花蓮 · 觀光門市', kw: 'store,boutique,gold', lock: 71 },
  { zh: '新北 黃金博物館 食用金文創館', en: 'Gold Museum · Edible Gold Atelier', addr: '新北 瑞芳 · 黃金博物館園區', kw: 'museum,gold,taiwan', lock: 77 },
];

const LINKS = [
  { zh: 'GNT 京華堂 技術官網', en: 'Corporate · gnt.com.tw', href: 'http://www.gnt.com.tw' },
  { zh: '金釀聯盟 黃金酒廠', en: 'Gold Wine · goldinalliance.com', href: 'https://www.goldinalliance.com' },
  { zh: '黃金博物館門市', en: 'Museum Stores', href: '#stores' },
];

export default function Contact() {
  useReveal();
  useHashScroll();
  return (
    <>
      <section className="subhero">
        <div className="wrap">
          <div className="crumbs rise">
            <Link href="/">首頁</Link> ／ 聯絡我們
          </div>
          <span className="sh-k rise">Contact · 聯絡我們</span>
          <h1 className="rise d1">
            與我們<em>聊聊</em>
          </h1>
          <p className="sh-lead rise d2">
            原料採購、品牌客製、技術洽詢或門市資訊，留下需求，我們將盡快回覆。
          </p>
        </div>
      </section>

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="ct-grid">
            {/* form */}
            <div className="co-form reveal" style={{ marginTop: 0 }}>
              <h3 className="co-h">洽詢表單</h3>
              <label className="co-field">
                <span>稱呼 / 公司</span>
                <input type="text" placeholder="您的姓名或公司" />
              </label>
              <label className="co-field">
                <span>電子郵件</span>
                <input type="text" placeholder="you@example.com" />
              </label>
              <label className="co-field">
                <span>洽詢類型</span>
                <select defaultValue="食用金原料採購">
                  <option>食用金原料採購</option>
                  <option>終端商品 / 禮贈</option>
                  <option>奈米金 / 奈米銀 配方研究</option>
                  <option>品牌客製合作</option>
                  <option>其他</option>
                </select>
              </label>
              <label className="co-field">
                <span>需求說明</span>
                <textarea rows={4} placeholder="用途、用量或合作方向"></textarea>
              </label>
              <button
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={(e) => {
                  e.preventDefault();
                  alert('（示意）表單送出將串接客服信箱 / CRM。');
                }}
              >
                送出洽詢
              </button>
            </div>

            {/* info + ecosystem */}
            <aside className="reveal d1">
              <div className="ct-info">
                <h3 className="co-h">直接聯繫</h3>
                <div className="ct-row"><span>電話</span><a href="tel:+886227998866">+886 2 2799 8866</a></div>
                <div className="ct-row"><span>信箱</span><a href="mailto:info@gnt.com.tw">info@gnt.com.tw</a></div>
                <div className="ct-row"><span>地址</span><span>台北市內湖區瑞光路 258 巷 52 號</span></div>
                <div className="ct-row"><span>掛牌</span><span>TWSE 1267 · 京華堂實業</span></div>
              </div>
              <div className="ct-eco">
                <h3 className="co-h">品牌生態系</h3>
                {LINKS.map((l) => (
                  <a
                    className="ct-link"
                    key={l.zh}
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener"
                  >
                    <span>
                      <b>{l.zh}</b>
                      <small>{l.en}</small>
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
            <span className="kicker">Stores · 門市據點</span>
            <h2 style={{ marginTop: '18px' }}>黃金博物館門市，眼見為憑</h2>
            <p>實體門市親眼確認、親手感受——真金不怕火煉。</p>
          </div>
          <div className="audience">
            {STORES.map((s, i) => (
              <div className={'audcard reveal d' + i} key={s.zh} style={{ padding: 0, overflow: 'hidden' }}>
                <div className="ph" style={{ height: '240px' }}>
                  <PhImg kw={s.kw} lock={s.lock} />
                  <span className="cap">{s.en}</span>
                </div>
                <div style={{ padding: '32px 40px 38px' }}>
                  <span className="au-k">{s.en}</span>
                  <h3 style={{ fontSize: '24px', margin: '10px 0 6px' }}>{s.zh}</h3>
                  <p style={{ marginBottom: 0 }}>{s.addr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
