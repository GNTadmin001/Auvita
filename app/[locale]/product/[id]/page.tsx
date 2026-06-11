import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Product from '@/components/Product';
import { PRODUCTS } from '@/lib/products';

type Props = { params: Promise<{ locale: string; id: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return { title: '商品不存在 | AUVITA' };
  return {
    title: `${p.zh} | AUVITA`,
    description: p.desc,
    openGraph: { title: `${p.zh} | AUVITA`, description: p.desc, images: p.img ? [p.img] : [] },
  };
}

export default async function Page({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) notFound();
  return (
    <>
      <SiteHeader active="shop" />
      <Product p={p} />
      <SiteFooter />
    </>
  );
}
