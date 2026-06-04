// SiteFooter 版面結構。文字在 locales/*.json `footer` 命名空間，以 key 對應。

export type FootColItem = { key: string; href: string; external?: boolean };
export type FootCol = { key: string; items: FootColItem[] };

export const FOOTER_COLS: FootCol[] = [
  {
    key: 'explore',
    items: [
      { key: 'goldHistory', href: '/gold-history' },
      { key: 'brandTech', href: '/brand-tech' },
      { key: 'applications', href: '/applications' },
      { key: 'news', href: '/news' },
    ],
  },
  {
    key: 'shop',
    items: [
      { key: 'allProducts', href: '/shop' },
      { key: 'foilProducts', href: '/shop#foil' },
      { key: 'nanoGoldProducts', href: '/shop#nano-gold' },
      { key: 'nanoSilverProducts', href: '/shop#nano-silver' },
    ],
  },
  {
    key: 'ecosystem',
    items: [
      { key: 'gntSite', href: 'http://www.gnt.com.tw', external: true },
      { key: 'goldAlliance', href: 'https://www.goldinalliance.com', external: true },
      { key: 'museumStore', href: '/contact#stores' },
      { key: 'contactUs', href: '/contact' },
    ],
  },
];

export const CERTS = ['SNQ', 'SGS ≥99.9%', 'EU · E175', 'TFDA', 'HALAL'] as const;
