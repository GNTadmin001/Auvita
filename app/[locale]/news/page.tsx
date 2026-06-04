import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import News from '@/components/News';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata('news', locale);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader active="news" />
      <News locale={locale} />
      <SiteFooter />
    </>
  );
}
