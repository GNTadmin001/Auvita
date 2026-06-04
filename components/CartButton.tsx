'use client';
// header 購物車按鈕 + 即時徽章。原 cart.jsx 的 BagIcon + CartButton。
// i18n 標準分離：aria-label 在 locales/*.json 的 `cart.bagLabel`。
import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/cart';

export function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
      <path d="M6 8h12l-1 11.5H7L6 8z" strokeLinejoin="round" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function CartButton() {
  const t = useTranslations('cart');
  const items = useCart();
  const count = items.reduce((n, i) => n + i.qty, 0);
  return (
    <button
      className="cart-btn"
      aria-label={t('bagLabel')}
      onClick={() => window.dispatchEvent(new CustomEvent('cart:open'))}
    >
      <BagIcon />
      {count > 0 && <span className="cart-badge">{count}</span>}
    </button>
  );
}
