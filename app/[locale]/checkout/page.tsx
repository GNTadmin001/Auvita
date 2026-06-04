import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Checkout from '@/components/Checkout';

type Props = { params: Promise<{ locale: string }> };

// 結帳頁不收錄；保留 noindex 以避免被搜尋引擎抓到購物流程頁。
// title/description 從 locale checkout.metadata 讀取。
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'checkout.metadata' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader active="shop" />
      <Checkout />
      <SiteFooter />
    </>
  );
}
