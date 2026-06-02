'use client';
// 金的歷史 — 佔位頁（文案暫內嵌，i18n 留收尾）。原 gold-history.jsx。
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';

const ERAS = [
  { y: '古代', zh: '金之為貴', p: '（建置中）黃金作為財富、權力與信仰象徵的起源。' },
  { y: '東方', zh: '食金傳統', p: '（建置中）金箔入饌、入藥的東方文化脈絡。' },
  { y: '工藝', zh: '槌打金箔', p: '（建置中）傳統槌打金箔工藝與其極限。' },
  { y: '當代', zh: '汽化金箔', p: '（建置中）GNT 以物理汽化重新定義食用金。' },
];

export default function GoldHistory() {
  useReveal();
  return (
    <>
      <section className="subhero">
        <div className="wrap">
          <div className="crumbs rise">
            <Link href="/">首頁</Link> ／ 金的歷史
          </div>
          <span className="sh-k rise">Heritage of Gold · 金的歷史</span>
          <h1 className="rise d1">
            人類與<em>黃金</em>，一段很長的故事
          </h1>
          <p className="sh-lead rise d2">
            從信仰到餐桌，黃金始終是最鄭重的存在。這一頁將娓娓道來金的文化史，與汽化金如何承先啟後。
          </p>
          <span className="ph-flag rise d3">內容建置中 · Coming soon</span>
        </div>
      </section>

      <section className="sec-tight">
        <div className="wrap">
          <div className="ph-timeline">
            {ERAS.map((e, i) => (
              <div className={'ph-era reveal d' + (i % 3)} key={e.y}>
                <span className="ph-era-y">{e.y}</span>
                <h3>{e.zh}</h3>
                <p>{e.p}</p>
              </div>
            ))}
          </div>
          <div className="ph-banner reveal">
            <p>此頁為架構佔位。黃金文化史、食金傳統與工藝演進的完整內容，將於後續補齊。</p>
            <Link className="btn btn-out" href="/brand-tech">
              先看品牌與技術
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
