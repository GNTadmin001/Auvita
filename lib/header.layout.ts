// SiteHeader 導覽結構。文字在 locales/*.json `header` 命名空間，以 key 對應。

export type NavItem = { key: string; href: string; active: string };

export const NAV_LINKS: NavItem[] = [
  { key: 'home', href: '/', active: 'home' },
  { key: 'goldHistory', href: '/gold-history', active: 'history' },
  { key: 'brandTech', href: '/brand-tech', active: 'brand' },
  { key: 'shop', href: '/shop', active: 'shop' },
  { key: 'news', href: '/news', active: 'news' },
  { key: 'contact', href: '/contact', active: 'contact' },
];

export type AppMenuItem = { key: string; href: string; lead: boolean };

export const APP_MENU: AppMenuItem[] = [
  { key: 'overview', href: '/applications', lead: true },
  { key: 'foil', href: '/applications#foil', lead: false },
  { key: 'nanoGold', href: '/applications#nano-gold', lead: false },
  { key: 'nanoSilver', href: '/applications#nano-silver', lead: false },
];

export const LANGS: [string, string][] = [
  ['zh-TW', '繁'],
  ['en', 'EN'],
  ['ja', '日'],
];
