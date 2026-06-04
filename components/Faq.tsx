// FAQ 區：Server Component（無 hook、無互動），用 <details>/<summary> 提供原生展開。
// 樣式類別沿用 brand-tech / shop 的 .sec-tight / .wrap / reveal 等既有風格，避免新增 CSS。
// i18n 標準分離：文字（含 q/a 陣列）在 locales/*.json 的 `faq` 命名空間。
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import type { FaqItem } from '@/lib/faq';

const richTags = {
  em: (c: ReactNode) => <em>{c}</em>,
};

export default function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as FaqItem[];
  return (
    <section className="sec-tight" id="faq">
      <div className="wrap">
        <span className="sh-k">{t('kicker')}</span>
        <h2 className="d1" style={{ marginTop: 12 }}>
          {t.rich('title', richTags)}
        </h2>
        <div className="faq-list" style={{ marginTop: 28 }}>
          {items.map((item, i) => (
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
                <span aria-hidden style={{ opacity: 0.6, fontSize: '1.2rem', lineHeight: 1 }}>
                  ＋
                </span>
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
