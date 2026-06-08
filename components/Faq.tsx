import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import type { FaqItem } from '@/lib/faq';
import { Link } from '@/i18n/navigation';

const richTags = {
  em: (c: ReactNode) => <em>{c}</em>,
};

export default function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as FaqItem[];
  const learnMore = t('learnMore');
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
              {item.link && (
                <Link
                  href={item.link as string}
                  style={{
                    display: 'inline-block',
                    marginTop: 10,
                    fontSize: '0.85rem',
                    color: 'var(--gold-400)',
                    textDecoration: 'none',
                    borderBottom: '1px solid currentColor',
                    paddingBottom: 1,
                  }}
                >
                  {learnMore} →
                </Link>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
