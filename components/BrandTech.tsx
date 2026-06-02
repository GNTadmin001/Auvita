'use client';
// 品牌與技術 — 品牌歷史 + 汽化式 PVD 技術 + 規格 + 認證（文案暫內嵌，i18n 留收尾）。原 brand-tech.jsx。
import { Link } from '@/i18n/navigation';
import { useReveal, useHashScroll } from '@/lib/reveal';
import PhImg from '@/components/PhImg';

const STEPS = [
  { h: '汽化', p: '於真空腔體中，以物理方式將 9999 純金加熱汽化為金原子蒸氣——不溶解、不還原，純物理。' },
  { h: '凝核', p: '金蒸氣於藥用級純水介面凝結成核，形成奈米級金顆粒。全程無化學還原劑、無分散劑介入。' },
  { h: '粒徑控制', p: '以製程時間與條件，精準調控顆粒成長——同一條生產線，從奈米顆粒到金箔片，皆由時間決定。' },
  { h: '收集分散', p: '於純水中收集，得到高純度、高分散均勻度的奈米金。可依應用調整濃度與型態。' },
];

const CERTS = [
  { seal: 'SNQ', h: 'SNQ 國家品質標章', en: 'National Quality Mark', meta: ['台灣', '食品類'], p: '通過 SNQ 國家品質標章評鑑，以制度層級驗證產品品質與安全管理。' },
  { seal: 'E175', h: 'EU E175 食品添加物', en: 'EU Food Additive', meta: ['歐盟', '金 · E175'], p: '金（E175）為歐盟核可之食品添加物，本品符合食用金箔之國際使用規範。' },
  { seal: 'TFDA', h: 'TFDA 食品衛生', en: 'Taiwan FDA', meta: ['台灣', '食品衛生'], p: '符合衛福部食藥署（TFDA）食品衛生相關規範，台灣唯一合法食用金製造商。' },
  { seal: 'SGS', h: 'SGS 純度檢測 ≥99.9%', en: 'Purity Tested', meta: ['第三方', '≥99.9%'], p: '經 SGS 第三方檢測，純度 ≥99.9%（9999 純金），每批可溯源。' },
  { seal: 'Tox', h: '毒性測試報告', en: 'Toxicity Report', meta: ['第三方', '安全性'], p: '委由第三方進行毒性與安全性測試，確認作為食用金之安全使用，報告可供索取。' },
  { seal: 'HAL', h: 'HALAL 清真認證', en: 'Halal Certified', meta: ['國際', '清真'], p: '取得 HALAL 清真認證，符合相關飲食規範，適用於更廣泛的市場與客群。' },
];

export default function BrandTech() {
  useReveal();
  useHashScroll();
  return (
    <>
      <section className="subhero">
        <div className="wrap">
          <div className="crumbs rise">
            <Link href="/">首頁</Link> ／ 品牌與技術
          </div>
          <span className="sh-k rise">Brand &amp; Technology · 品牌與技術</span>
          <h1 className="rise d1">
            自 1993，<em>以科學淬煉黃金</em>
          </h1>
          <p className="sh-lead rise d2">
            京華堂（GNT）成立於 1993，是國際間少數以醫療級標準研發、製造貴金屬材料的公司。我們的根基，是一道別人沒有的汽化式工藝。
          </p>
        </div>
      </section>

      {/* 品牌歷史 */}
      <section className="sec panel">
        <div className="wrap">
          <div className="origins">
            <div className="ph reveal">
              <PhImg kw="laboratory,gold,science" lock={91} />
              <span className="cap">GNT · 研發實驗室</span>
            </div>
            <div className="body reveal d1">
              <span className="kicker" style={{ display: 'block', marginBottom: '18px' }}>
                Heritage · 品牌歷史
              </span>
              <h2 className="ed-title" style={{ fontSize: 'clamp(26px,3.4vw,42px)', marginBottom: '24px' }}>
                一道工藝，<em>三十年淬煉</em>
              </h2>
              <p>
                京華堂實業（Gold NanoTech, Inc.）成立於 <em>1993</em> 年，上市於台灣證券交易所（TWSE
                1267）。我們專注於以物理方式奈米化貴金屬，是台灣<em>唯一合法的食用金製造商</em>。
              </p>
              <p>
                不同於市面以化學還原製成的奈米金，GNT 以<em>汽化式（PVD）</em>
                製程，僅用藥用級純水，造就世界級的純淨度與分散均勻度。食用金箔薄度僅傳統槌打金箔的
                <em>四分之一</em>。
              </p>
              <p>同一道工藝，依粒徑與用途延伸為食用金、奈米金與奈米銀——科學，是這個黃金品牌真正的底氣。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 技術 */}
      <section className="sec-tight" id="tech" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '40px' }}>
            <span className="kicker" style={{ color: 'var(--nano-steel)' }}>
              Technology · 汽化式 PVD 製程
            </span>
            <h2 style={{ marginTop: '18px', fontSize: 'clamp(26px,3.4vw,40px)' }}>物理奈米化，四個步驟</h2>
          </div>
          <div className="proc">
            {STEPS.map((s) => (
              <div className="procstep reveal" key={s.h}>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
          <div className="dstats reveal d1" style={{ marginTop: '48px' }}>
            <div className="dstat"><div className="dv">PVD</div><div className="dl">物理氣相沉積</div></div>
            <div className="dstat"><div className="dv">H₂O</div><div className="dl">僅藥用級純水</div></div>
            <div className="dstat"><div className="dv">0</div><div className="dl">化學還原劑</div></div>
            <div className="dstat"><div className="dv">¼</div><div className="dl">金箔薄度 vs 傳統</div></div>
          </div>
          <div
            className="reveal d2"
            style={{
              marginTop: '44px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
              gap: '16px',
            }}
          >
            <div className="ph" style={{ height: '320px', borderRadius: '6px' }}>
              <img
                className="ph-img"
                src="/images/brand-tech/evap-vs-traditional.jpg"
                alt="汽化金箔與傳統金箔的顯微與電子顯微對比"
                loading="lazy"
              />
              <span className="cap">汽化 vs 傳統 · 顯微對比</span>
            </div>
            <div className="ph" style={{ height: '320px', borderRadius: '6px' }}>
              <img
                className="ph-img"
                src="/images/brand-tech/physical-vs-chemical.jpg"
                alt="物理汽化金與化學膠體金的色澤與純度對比"
                loading="lazy"
              />
              <span className="cap">物理汽化金 vs 化學膠體金</span>
            </div>
          </div>
        </div>
      </section>

      {/* 規格 */}
      <section className="sec panel" id="specs" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '26px' }}>
            <span className="kicker" style={{ color: 'var(--nano-steel)' }}>
              Specification · 規格數據
            </span>
            <h2 style={{ marginTop: '16px', fontSize: 'clamp(24px,3vw,36px)' }}>用數字說話</h2>
          </div>
          <table className="spectable reveal">
            <tbody>
              <tr><td className="k">材料</td><td className="v">汽化式金（Vaporized Gold）· 金箔 / 金粉 / 奈米金</td></tr>
              <tr><td className="k">純度</td><td className="v"><span className="num">≥ 99.99%</span> 金（9999 Au），SGS 第三方檢測</td></tr>
              <tr><td className="k">製程</td><td className="v">物理氣相沉積（PVD）· 無化學還原劑 · 無分散劑</td></tr>
              <tr><td className="k">分散介質</td><td className="v">藥用級純水（Pharmaceutical-grade water）</td></tr>
              <tr><td className="k">粒徑</td><td className="v">奈米級，依製程時間精準調控（依品項提供區間）</td></tr>
              <tr><td className="k">型態</td><td className="v">純水分散液 / 金箔 / 金粉（依應用選擇）</td></tr>
            </tbody>
          </table>
          <p className="specnote reveal" style={{ marginTop: '22px' }}>
            上述數值為通用示意，非保證規格。正式合作將提供對應品項之規格書（CoA）、檢測報告與樣品；醫療相關應用以主管機關核准為準。
          </p>
        </div>
      </section>

      {/* 認證 */}
      <section className="sec-tight" id="cert" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '40px' }}>
            <span className="kicker">Certifications · 認證與安全</span>
            <h2 style={{ marginTop: '18px', fontSize: 'clamp(26px,3.4vw,40px)' }}>真金，禁得起檢驗</h2>
          </div>
          <div className="certgrid">
            {CERTS.map((c, i) => (
              <div className={'certcard reveal d' + (i % 3)} key={c.seal}>
                <div className="cc-seal">{c.seal}</div>
                <h4>{c.h}</h4>
                <div className="cc-en">{c.en}</div>
                <p>{c.p}</p>
                <div className="cc-meta">
                  <span>{c.meta[0]}</span>
                  <span>{c.meta[1]}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="specnote reveal" style={{ marginTop: '26px' }}>
            認證內容為品牌資訊整理之示意，實際證號、有效期間與測試項目以官方證書與檢測報告為準；報告可向我們索取。
          </p>
        </div>
      </section>

      <section className="page-cta">
        <div className="wrap pc-in">
          <h2 className="reveal">
            想了解製程細節<br />或索取規格書？
          </h2>
          <p className="reveal d1">我們可在保密前提下，提供更深入的技術說明、規格書與測試數據。</p>
          <div className="pc-row reveal d2">
            <Link className="btn btn-gold" href="/contact">
              技術洽詢
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
