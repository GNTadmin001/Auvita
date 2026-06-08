import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { PUBLIC_PAGES, SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PAGES.flatMap((meta) =>
    routing.locales.map((locale) => {
      const segment = meta.path === '/' ? '' : meta.path;
      const url = `${SITE_URL}/${locale}${segment}`;
      const isHome = meta.path === '/';
      const isNews = meta.path === '/news';
      const isShop = meta.path === '/shop';
      return {
        url,
        lastModified: new Date(),
        changeFrequency: (isNews ? 'daily' : 'weekly') as 'daily' | 'weekly',
        priority: isHome ? 1.0 : isShop ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}${segment}`]),
          ),
        },
      };
    }),
  );
}
