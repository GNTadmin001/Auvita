// 常見問題（FAQ）資料源 helper：FAQPage JSON-LD 與站內 FAQ 區共用。
// 唯一真相已遷到 locales/*.json 的 `faq.items` 命名空間；本檔只剩 server-side 取資料的 helper。
// 維持「全量」原則（不只 2 題），否則會踩到 AeroJet 當初 FAQPage 只放 2 題的 SEO 債。
import { getTranslations } from 'next-intl/server';

export type FaqItem = { q: string; a: string };

export async function getFaqItems(locale: string): Promise<FaqItem[]> {
  const t = await getTranslations({ locale, namespace: 'faq' });
  return t.raw('items') as FaqItem[];
}
