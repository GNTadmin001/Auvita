'use client';
// 最新活動 — 佔位頁（文案暫內嵌，i18n 留收尾）。原 news.jsx。
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';
import PhImg from '@/components/PhImg';

const POSTS = [
  { tag: '活動', zh: '活動標題建置中', kw: 'event,gold,gallery', lock: 31 },
  { tag: '新品', zh: '新品上市建置中', kw: 'luxury,gold,product', lock: 36 },
  { tag: '門市', zh: '門市消息建置中', kw: 'store,museum,gold', lock: 39 },
];

export default function News() {
  useReveal();
  return (
    <>
      <section className="subhero">
        <div className="wrap">
          <div className="crumbs rise">
            <Link href="/">首頁</Link> ／ 最新活動
          </div>
          <span className="sh-k rise">News &amp; Events · 最新活動</span>
          <h1 className="rise d1">
            展覽、聯名與<em>門市消息</em>
          </h1>
          <p className="sh-lead rise d2">
            黃金博物館門市活動、新品上市、品牌聯名與媒體報導，將在此陸續更新。
          </p>
          <span className="ph-flag rise d3">內容建置中 · Coming soon</span>
        </div>
      </section>

      <section className="sec-tight">
        <div className="wrap">
          <div className="prodgrid cols3">
            {POSTS.map((p, i) => (
              <div className={'prod reveal d' + (i % 3)} key={i}>
                <div className="ph">
                  <PhImg kw={p.kw} lock={p.lock} />
                  <span className="cap">{p.tag}</span>
                </div>
                <div className="pin">
                  <span className="tag">{p.tag} · 建置中</span>
                  <h4>{p.zh}</h4>
                  <p className="desc">（示意）活動內文、日期與連結將於後續補齊。</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ph-banner reveal">
            <p>此頁為架構佔位。活動列表、內文與報名／連結功能將於後續建置。</p>
            <Link className="btn btn-out" href="/contact">
              追蹤門市與聯絡資訊
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
