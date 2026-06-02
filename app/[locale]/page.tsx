import { setRequestLocale } from 'next-intl/server';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Intro from '@/components/Intro';
import Home from '@/components/Home';

type Props = { params: Promise<{ locale: string }> };

// 首頁：cover splash → 透明 header → Home 各區 → 頁尾。對應原 index.html 的 App()。
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Intro />
      <SiteHeader active="home" transparent />
      <Home />
      <SiteFooter />
    </>
  );
}
