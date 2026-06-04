// Contact 頁的「非文字」設定：圖片引用、外連 href、跨語通用聯絡資料。三語共用。
// 文字在 locales/*.json 的 `contact` 命名空間，靠 key 對應。

export type ContactLink = {
  key: string; // 對應 locale contact.ecosystem.links.<key>.{zh,en}
  href: string;
};

export type ContactStore = {
  key: string; // 對應 locale contact.stores.items.<key>.{zh,en,addr}
  kw: string;
  lock: number;
};

export const CONTACT_LINKS: ContactLink[] = [
  { key: 'corp', href: 'http://www.gnt.com.tw' },
  { key: 'wine', href: 'https://www.goldinalliance.com' },
  { key: 'museum', href: '#stores' },
];

export const CONTACT_STORES: ContactStore[] = [
  { key: 'hualien', kw: 'store,boutique,gold', lock: 71 },
  { key: 'museum', kw: 'museum,gold,taiwan', lock: 77 },
];

// 跨語言通用的聯絡資料（電話/Email 為全球單一號碼）。
export const CONTACT_DIRECT = {
  phone: '+886 2 2799 8866',
  email: 'info@gnt.com.tw',
} as const;
