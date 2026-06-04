import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Product from '@/components/Product';

type Props = { params: Promise<{ locale: string }> };

// /product 為單品詳頁示意（資料未就緒、未列入 nav），暫 noindex；
// 未來資料驅動後改為動態路由 /product/[id] 並接 Product JSON-LD。
export const metadata: Metadata = {
  title: '商品詳情 | AUVITA',
  robots: { index: false, follow: true },
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader active="shop" />
      <Product />
      <SiteFooter />
    </>
  );
}
