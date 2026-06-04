'use client';
// 產品應用 — 金箔 / 奈米金 / 奈米銀 三家族分區（文案暫內嵌，i18n 留收尾）。原 applications.jsx。
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useReveal, useHashScroll } from '@/lib/reveal';
import PhImg from '@/components/PhImg';

type SceneData = {
  flip?: boolean;
  k: string;
  zh: string;
  em?: string;
  kw: string;
  lock: number;
  images?: string[];
  p: string;
  list: [string, string][];
  cta?: { label: string; href: string }; // 場景 → 對應商品的快捷連結（深連到 /shop#<id>）
};

const FOIL_SCENES: SceneData[] = [
  {
    flip: false,
    k: 'Cosmetics · 化妝品 · 保養',
    zh: '化妝・保養',
    em: '的金光',
    kw: 'cosmetics,gold,beauty',
    lock: 61,
    p: '金箔入妝，自古即是奢華的象徵。汽化金箔以 9999 純度、100 nm 薄度與全製程無化學添加，成為高階保養品配方的理想素材；含金箔的面膜、精華與手工皂，金光內蘊。',
    list: [
      ['含金保養', '面膜、精華、乳霜的金箔點綴'],
      ['手工皂浴', '金箔皂的沐浴小奢華'],
      ['彩妝', '唇妝與眼妝的金色提亮'],
      ['研究背書', '2003 NAMSA ISO 皮膚刺激／敏感性試驗'],
    ],
    cta: { label: '選購 金箔肥皂 →', href: '/shop#foil-soap' },
  },
  {
    flip: true,
    k: 'Food · 食品 · 餐飲',
    zh: '料理裝飾',
    em: '的儀式感',
    kw: 'fine-dining,dessert,gold',
    lock: 22,
    images: [
      '/images/applications/foil-food-1.jpg',
      '/images/applications/foil-food-2.jpg',
      '/images/applications/foil-food-3.jpg',
    ],
    p: '為甜點、和菓子、會席與宴席桌面點上一抹真金。食用金箔 APPE GOLD 為 9999 純金、純水基底，100 nm 薄度，無色無味，開瓶即用——依台灣現行法規准用於糖果、糕餅、巧克力。',
    list: [
      ['甜點烘焙', '蛋糕、馬卡龍、巧克力面層點綴'],
      ['會席宴席', '生魚片、湯品、主菜的高級擺盤'],
      ['商業宴會', '婚宴、年節、慶典的桌面金飾'],
      ['食安背書', '衛署添製字第 001598 號 · 富邦產物 5,000 萬責任險'],
    ],
    cta: { label: '選購 食用金箔 →', href: '/shop#foil-leaf' },
  },
  {
    flip: false,
    k: 'Wine & Beverage · 酒與飲品',
    zh: '酒・飲品',
    em: '的流金',
    kw: 'champagne,cocktail,gold',
    lock: 41,
    images: ['/images/applications/foil-wine-1.jpg'],
    p: '9999 純金箔懸浮於酒體與飲品之中，隨光流轉。汽化金箔更薄、更易均勻分布，入口無感，是金箔酒與調飲的理想素材；2013 年起 AUVITA 於宜蘭蘇澳設立金釀黃金酒廠，與台灣菸酒等廠商合作多款金箔酒。',
    list: [
      ['金箔酒', '金釀黃金酒、氣泡酒、烈酒'],
      ['調飲', '雞尾酒、無酒精特調的金色點綴'],
      ['茶與咖啡', '高級茶席與精品咖啡的奢華一筆'],
      ['研究主題', '弘光大學（2001）酒類熟成研究、宜蘭大學（2013–2014）飲品試驗'],
    ],
    cta: { label: '選購 金箔酒 →', href: '/shop#foil-wine' },
  },
];

const NANOGOLD_SCENES: SceneData[] = [
  {
    flip: false,
    k: 'Beauty · 美容 · 保養',
    zh: '美容保養原料',
    kw: 'cosmetics,serum,gold',
    lock: 61,
    p: '汽化式奈米金以 9999 純度、均勻分散與生醫級品管著稱，作為高階保養與醫美通路的配方原料。可依品牌需求調整濃度與粒徑，從原料端為配方品質把關。',
    list: [
      ['保養配方', '精華、面膜、乳霜的含金原料'],
      ['醫美通路', '療程與專業線產品的金基底'],
      ['品牌客製', '依配方需求調整濃度與型態'],
      ['研究主題', '皮膚細胞培養（CCD966sk／Hs68／HaCat）與 DPPH 抗氧化體外研究'],
    ],
    cta: { label: '看奈米金原料 →', href: '/shop#nano-gold-serum' },
  },
  {
    flip: true,
    k: 'Drug Delivery · 藥物載體',
    zh: '藥物載體',
    kw: 'laboratory,research,medical',
    lock: 54,
    p: '汽化金奈米顆粒具高純度與均勻分散特性，於非侵入式經皮給藥（TDDS）研究中作為載體材料。旗艦平台「肌因槍」（液態經皮傳遞輸送系統）即以此為基礎。',
    list: [
      ['TDDS 研究', '經皮給藥載體之材料供應'],
      ['平台技術', '「肌因槍」非侵入式給藥（操作壓力 ≤ 150 psi）'],
      ['研究主題', '金屬中心／義大醫院（2009）人體真皮層輸送設備'],
      ['歷年合作', '台北醫學大學楊素卿、台灣科技大學廖愛禾等學術單位'],
    ],
    cta: { label: '看奈米金原液 →', href: '/shop#nano-gold-raw' },
  },
  {
    flip: false,
    k: 'Material · 原料規格與品管',
    zh: '原料規格與品管',
    kw: 'laboratory,analysis,microscope',
    lock: 32,
    p: '生醫級奈米金以 CMC 標準管控：濃度、界面電位、pH 值、電導度、TOC 五項物理檢測，每月取樣監測。8 個月長期穩定度檢測無顯著差異；每批次濃度差異控制於 ±5% 以內。',
    list: [
      ['標準粒徑', '1–3 nm／3–5 nm／30 nm 三種生醫級粒徑（可訂製 0.8–200 nm）'],
      ['品管項目', 'TEM 粒徑檢測、ICP-MS 不純物定量、分光光度計濃度檢測'],
      ['FDA 規劃', '目標完成美國 FDA Type IV DMF 申請（CTD 文件、ICH Guidelines）'],
      ['客戶服務', '提供規格書 CoA、批次檢測報告與樣品（保密前提）'],
    ],
    cta: { label: '索取規格／洽談 →', href: '/contact' },
  },
];

const SILVER_SCENES: SceneData[] = [
  {
    flip: false,
    k: 'Sterilization · 殺菌抗菌',
    zh: '殺菌・抗菌',
    kw: 'clean,hygiene,spray',
    lock: 81,
    p: '汽化式奈米銀以高純度、均勻分散著稱；可由粒徑或膜厚控制銀離子釋放效率。銀箔已取得歐盟 E175 食品添加物認證，並通過 NAMSA ISO 皮膚刺激／敏感性試驗（2003）。產品線細節以正式技術文件為準。',
    list: [
      ['抗菌應用', 'B2B 抗菌敷料、材料添加'],
      ['認證', '歐盟 E175 / NAMSA ISO'],
      ['客戶洽詢', '銀產品線詳細規格與應用，請聯絡業務'],
    ],
    cta: { label: '看奈米銀產品 →', href: '/shop#nano-silver-spray' },
  },
];

function SceneCarousel({ images, cap }: { images: string[]; cap: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % images.length), 4200);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <div className="ph">
      {images.map((src, i) => (
        <img
          key={src}
          className="ph-img"
          src={src}
          alt=""
          loading="lazy"
          style={{ opacity: i === idx ? 1 : 0, transition: 'opacity .9s ease' }}
        />
      ))}
      <span className="cap">{cap}</span>
    </div>
  );
}

function Scene({ d, steel }: { d: SceneData; steel?: boolean }) {
  return (
    <div className={'scene reveal' + (d.flip ? ' flip' : '')}>
      {d.images && d.images.length > 0 ? (
        <SceneCarousel images={d.images} cap={d.k} />
      ) : (
        <div className="ph">
          <PhImg kw={d.kw} lock={d.lock} />
          <span className="cap">{d.k}</span>
        </div>
      )}
      <div className="sc-body">
        <span className="kicker" style={steel ? { color: 'var(--nano-steel)' } : undefined}>
          {d.k}
        </span>
        <h3>
          {d.zh}
          {d.em && <em>{d.em}</em>}
        </h3>
        <p>{d.p}</p>
        <div className="sc-list">
          {d.list.map(([b, t]) => (
            <div className="sl" key={b}>
              <b>{b}</b>
              <span>{t}</span>
            </div>
          ))}
        </div>
        {d.cta && (
          <Link className="btn btn-gold sc-cta" href={d.cta.href}>
            {d.cta.label}
          </Link>
        )}
      </div>
    </div>
  );
}

function FamHead({
  id,
  zh,
  en,
  note,
  ph,
}: {
  id: string;
  zh: string;
  en: string;
  note: string;
  ph?: boolean;
}) {
  return (
    <div className="pgroup-head reveal" id={id} style={{ scrollMarginTop: '100px' }}>
      <div className="pgh-l">
        {ph && <span className="badge b2b">建置中 · 示意</span>}
        <h3>{zh}</h3>
      </div>
      <p className="pgh-r">
        {note}
        <br />
        <span
          style={{
            fontFamily: 'var(--font-latin-sc)',
            fontSize: '10px',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: 'var(--k-mute)',
          }}
        >
          {en}
        </span>
      </p>
    </div>
  );
}

export default function Applications() {
  useReveal();
  useHashScroll();
  return (
    <>
      <section className="subhero">
        <div className="wrap">
          <div className="crumbs rise">
            <Link href="/">首頁</Link> ／ 產品應用
          </div>
          <span className="sh-k rise">Applications · 產品應用</span>
          <h1 className="rise d1">
            一道工藝，<em>三種材料</em>
          </h1>
          <p className="sh-lead rise d2">
            同源於汽化式（PVD）製程，依粒徑與用途分為金箔、奈米金、奈米銀。從使用情境出發，看真金與奈米材料用在哪裡。
          </p>
        </div>
      </section>

      <section className="sec-tight">
        <div className="wrap">
          <div className="pgroup">
            <FamHead id="foil" zh="金箔" en="Edible Gold Leaf" note="食用金主線：化妝品、食品與酒。" />
            {FOIL_SCENES.map((d) => (
              <Scene key={d.zh} d={d} />
            ))}
          </div>

          <div className="pgroup">
            <FamHead id="nano-gold" zh="奈米金" en="Nano Gold" note="功能性材料：美容保養與藥物載體。" />
            {NANOGOLD_SCENES.map((d) => (
              <Scene key={d.zh} d={d} steel />
            ))}
            <p className="specnote reveal" style={{ marginTop: '26px' }}>
              上述研究主題、合作單位與技術細節為材料與技術之沉澱記錄，非藥品療效宣稱；實際醫療應用以主管機關核准與專業評估為準。完整研究數據、規格書與樣品可於合作洽談時提供。
            </p>
          </div>

          <div className="pgroup">
            <FamHead
              id="nano-silver"
              zh="奈米銀"
              en="Nano Silver"
              note="抗菌殺菌應用。已取得歐盟 E175 與 NAMSA ISO 認證，產品線細節以正式技術文件為準。"
            />
            {SILVER_SCENES.map((d) => (
              <Scene key={d.zh} d={d} steel />
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta">
        <div className="wrap pc-in">
          <h2 className="reveal">
            想為你的場景<br />選對材料？
          </h2>
          <p className="reveal d1">餐飲、品牌客製、配方或研究合作，我們從原料為你把關。</p>
          <div className="pc-row reveal d2">
            <Link className="btn btn-gold" href="/shop">
              前往選購
            </Link>
            <Link className="btn btn-out" href="/contact">
              合作洽談
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
