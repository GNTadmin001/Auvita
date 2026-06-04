// Contact 頁的「非文字」設定：圖片引用、外連 href、跨語通用聯絡資料。三語共用。
// 文字在 locales/*.json 的 `contact` 命名空間，靠 key 對應。

export type ContactLink = {
  key: string; // 對應 locale contact.ecosystem.links.<key>.{zh,en}
  href: string;
};

export type ContactStore = {
  key: string;      // 對應 locale contact.stores.items.<key>.{zh,en,addr}
  img: string;      // 門市主圖路徑（public/）
  phone: string;    // 門市電話
  lineQr: string;   // LINE QR 圖路徑（public/）
  href: string;     // 門市官網，主圖點擊目標
  lineHref: string; // LINE 官方帳號，QR 圖點擊目標
};

export const CONTACT_LINKS: ContactLink[] = [
  { key: 'corp', href: 'http://www.gnt.com.tw' },
  { key: 'wine', href: 'https://www.goldinalliance.com' },
];

export const CONTACT_STORES: ContactStore[] = [
  {
    key: 'hualien',
    img: '/images/stores/hualien.jpg',
    phone: '03-8221706',
    lineQr: '/images/stores/hualien-line.png',
    href: 'https://event.ttl.com.tw/hl/center/01main.aspx',
    lineHref: 'https://line.me/R/ti/p/%40822hauka',
  },
  {
    key: 'museum',
    img: '/images/stores/museum.jpg',
    phone: '02-24962989',
    lineQr: '/images/stores/museum-line.png',
    href: 'https://www.gep.ntpc.gov.tw/',
    lineHref: 'https://line.me/R/ti/p/%40270nrzyn',
  },
];

// 跨語言通用的聯絡資料（電話/Email 為全球單一號碼）。
export const CONTACT_DIRECT = {
  phone: '+886 2 2799 8866',
  email: 'info@gnt.com.tw',
} as const;
