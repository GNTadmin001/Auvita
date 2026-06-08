import { setRequestLocale } from 'next-intl/server';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Intro from '@/components/Intro';
import Home from '@/components/Home';
import Faq from '@/components/Faq';
import { getFaqItems } from '@/lib/faq';
import { faqJsonLd } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const faqItems = await getFaqItems(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
      />
      <Intro />
      <SiteHeader active="home" transparent />
      <Home />
      <Faq />
      <SiteFooter />
    </>
  );
}
