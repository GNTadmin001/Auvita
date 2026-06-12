import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import BrandTech from '@/components/BrandTech';
import { buildPageMetadata, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata('brand-tech', locale);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'faq' });
  const faqItems = t.raw('items') as { q: string; a: string; link?: string }[];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd('brand-tech', locale)) }}
      />
      <SiteHeader active="brand" />
      <BrandTech />
      <SiteFooter />
    </>
  );
}
