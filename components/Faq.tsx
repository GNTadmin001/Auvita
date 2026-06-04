// FAQ 區：純 Server Component（無 hook、無互動），用 <details>/<summary> 提供原生展開。
// 樣式類別沿用 brand-tech / shop 的 .sec-tight / .wrap / reveal 等既有風格，避免新增 CSS。
import { FAQ_ITEMS } from '@/lib/faq';

export default function Faq() {
  return (
    <section className="sec-tight" id="faq">
      <div className="wrap">
        <span className="sh-k">FAQ · 常見問題</span>
        <h2 className="d1" style={{ marginTop: 12 }}>
          關於汽化金，<em>你可能想知道的</em>
        </h2>
        <div className="faq-list" style={{ marginTop: 28 }}>
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="faq-item"
              style={{
                borderBottom: '1px solid rgba(212, 175, 55, 0.18)',
                padding: '18px 4px',
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <span>{item.q}</span>
                <span aria-hidden style={{ opacity: 0.6, fontSize: '1.2rem', lineHeight: 1 }}>＋</span>
              </summary>
              <p
                style={{
                  marginTop: 12,
                  color: 'rgba(232, 226, 209, 0.78)',
                  lineHeight: 1.85,
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
