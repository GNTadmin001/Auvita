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
};

const FOIL_SCENES: SceneData[] = [
  {
    flip: false,
    k: 'Cosmetics · 化妝品 · 保養',
    zh: '化妝・保養',
    em: '的金光',
    kw: 'cosmetics,gold,beauty',
    lock: 61,
    p: '金箔入妝，自古即是奢華的象徵。含金箔的面膜、精華與手工皂，金光內蘊，為保養儀式增添一抹貴氣。',
    list: [
      ['含金保養', '面膜、精華、乳霜的金箔點綴'],
      ['手工皂浴', '金箔皂的沐浴小奢華'],
      ['彩妝', '唇妝與眼妝的金色提亮'],
    ],
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
    p: '為甜點、和菓子、會席與宴席桌面點上一抹真金。金箔、金片、金絲，依菜色與場合選擇，瞬間提升質感與儀式感。',
    list: [
      ['甜點烘焙', '蛋糕、馬卡龍、巧克力面層點綴'],
      ['會席宴席', '生魚片、湯品、主菜的高級擺盤'],
      ['商業宴會', '婚宴、年節、慶典的桌面金飾'],
    ],
  },
  {
    flip: false,
    k: 'Wine & Beverage · 酒與飲品',
    zh: '酒・飲品',
    em: '的流金',
    kw: 'champagne,cocktail,gold',
    lock: 41,
    images: ['/images/applications/foil-wine-1.jpg'],
    p: '9999 純金箔懸浮於酒體與飲品之中，隨光流轉。汽化金箔更薄、更易均勻分布，入口無感，是金箔酒與調飲的理想素材。',
    list: [
      ['金箔酒', '金釀黃金酒、氣泡酒、烈酒'],
      ['調飲', '雞尾酒、無酒精特調的金色點綴'],
      ['茶與咖啡', '高級茶席與精品咖啡的奢華一筆'],
    ],
  },
];

const NANOGOLD_SCENES: SceneData[] = [
  {
    flip: false,
    k: 'Beauty · 美容 · 保養',
    zh: '美容保養原料',
    kw: 'cosmetics,serum,gold',
    lock: 61,
    p: '奈米級金顆粒分散均勻、純度極高，作為高階保養與醫美通路的配方原料，協助品牌開發含金保養品。',
    list: [
      ['保養配方', '精華、面膜、乳霜的含金原料'],
      ['醫美通路', '療程與專業線產品的金基底'],
      ['品牌客製', '依配方需求調整濃度與型態'],
    ],
  },
  {
    flip: true,
    k: 'Drug Delivery · 藥物載體',
    zh: '藥物載體',
    kw: 'laboratory,research,medical',
    lock: 54,
    p: '汽化金奈米顆粒具高純度與均勻分散特性，於非侵入式經皮給藥（TDDS）研究中作為載體材料。旗艦平台「肌因槍」即以此為基礎。',
    list: [
      ['TDDS 研究', '經皮給藥載體之材料供應'],
      ['平台技術', '「肌因槍」非侵入式給藥'],
      ['研究合作', '與學研單位的材料與數據合作'],
    ],
  },
];

const SILVER_SCENES: SceneData[] = [
  {
    flip: false,
    k: 'Sterilization · 殺菌抗菌',
    zh: '殺菌・抗菌',
    kw: 'clean,hygiene,spray',
    lock: 81,
    p: '（示意）汽化式奈米銀以高純度、均勻分散著稱，於抗菌與殺菌應用具發展潛力。此區內容建置中，實際規格與應用以正式資料為準。',
    list: [
      ['環境抗菌', '（建置中）'],
      ['個人護理', '（建置中）'],
      ['材料添加', '（建置中）'],
    ],
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
              藥物載體相關內容為材料與技術研究之說明，非藥品療效宣稱；實際醫療應用以主管機關核准與專業評估為準。
            </p>
          </div>

          <div className="pgroup">
            <FamHead
              id="nano-silver"
              zh="奈米銀"
              en="Nano Silver"
              note="抗菌殺菌應用。內容建置中，以下為示意。"
              ph
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
