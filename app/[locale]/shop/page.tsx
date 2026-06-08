import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Shop from '@/components/Shop';
import { PRODUCTS } from '@/lib/products';
import { buildPageMetadata, breadcrumbJsonLd, productItemListJsonLd } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata('shop', locale);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ld = productItemListJsonLd(PRODUCTS, locale);
  const crumb = breadcrumbJsonLd('shop', locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }}
      />
      <SiteHeader active="shop" />
      <Shop />
      <SiteFooter />
    </>
  );
}
