'use client';
// 最新活動 — 資料來自 data/promotions/active.json（由 schedule.json 經 build-active.mjs 切出當期）。
// schedule.json 的唯一真相為 Google Sheet → n8n → GitHub Action；請勿手改 active.json（每次 build 會被覆蓋）。
// active 為空時退回「建置中」佔位卡。
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';
import PhImg from '@/components/PhImg';
import activeData from '@/data/promotions/active.json';
import type { Promotion, SupportedLocale } from '@/types/promotion';

const PROMOS = activeData as unknown as Promotion[];

// active.json 為空時的佔位卡（建置中）。
const PLACEHOLDER = [
  { tag: '活動', zh: '活動標題建置中', kw: 'event,gold,gallery', lock: 31 },
  { tag: '新品', zh: '新品上市建置中', kw: 'luxury,gold,product', lock: 36 },
  { tag: '門市', zh: '門市消息建置中', kw: 'store,museum,gold', lock: 39 },
];

type Props = { locale?: string };

export default function News({ locale = 'zh-TW' }: Props) {
  useReveal();
  const loc = locale as SupportedLocale;
  const hasPromos = PROMOS.length > 0;

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
          {!hasPromos && <span className="ph-flag rise d3">內容建置中 · Coming soon</span>}
        </div>
      </section>

      <section className="sec-tight">
        <div className="wrap">
          {hasPromos ? (
            <div className="prodgrid cols3">
              {PROMOS.map((p, i) => {
                const c = p[loc] ?? p['zh-TW'];
                const inner = (
                  <>
                    <div className="ph">
                      <img className="ph-img" src={p.image} alt={c.title} loading="lazy" />
                      <span className="cap">活動</span>
                    </div>
                    <div className="pin">
                      <span className="tag">News &amp; Events</span>
                      <h4>{c.title}</h4>
                      <p className="desc">{c.description}</p>
                    </div>
                  </>
                );
                return (
                  <div className={'prod reveal d' + (i % 3)} key={p.id}>
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div className="prodgrid cols3">
                {PLACEHOLDER.map((p, i) => (
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
            </>
          )}
        </div>
      </section>
    </>
  );
}
