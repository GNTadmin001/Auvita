// Home 頁的「非文字」設定：圖片 keyword/lock 與版面旗標。三語共用。
// 文字在 locales/*.json 的 `home` 命名空間；items 已移除 kw/hot 等欄位，以 index 對應此檔陣列。
// 標準分離模板（與 applications.layout.ts 對齊）。

export const HOME_HERO_IMG = {
  kw: 'goldleaf,dessert',
  lock: 12,
  img: '/images/home/hero.jpg',
};

export type HomeOriginsTile = { kw: string; lock: number; img: string };

// Origins 兩塊磁磚的圖（對應 locale home.origins.tile1*/tile2*）。
export const HOME_ORIGINS_TILES: HomeOriginsTile[] = [
  { kw: 'goldleaf,dessert', lock: 5, img: '/images/home/origins-1.jpg' },
  { kw: 'goldpowder,spice', lock: 8, img: '/images/home/origins-2.png' },
];

// Scenes 6 張卡的圖 kw（順序與 locale home.scenes.items 對齊）。
export const HOME_SCENES_IMG: { kw: string; img: string }[] = [
  { kw: 'sushi',   img: '/images/home/scenes-1.jpg' },
  { kw: 'dessert', img: '/images/home/scenes-2.jpg' },
  { kw: 'whisky',  img: '/images/home/scenes-3.png' },
  { kw: 'cake',    img: '/images/home/scenes-4.jpg' },
  { kw: 'gold',    img: '/images/home/scenes-5.png' },
  { kw: 'giftbox', img: '/images/home/scenes-6.jpg' },
];

// ShopTeaser 4 張卡的圖 kw + hot 旗標（順序與 locale home.shopTeaser.items 對齊）。
export const HOME_SHOP_TEASER_IMG: { kw: string; hot: boolean; img: string }[] = [
  { kw: 'goldleaf',  hot: true,  img: '/images/home/shop-1.png' },
  { kw: 'spice',     hot: false, img: '/images/home/shop-2.jpg' },
  { kw: 'chocolate', hot: false, img: '/images/home/shop-3.jpg' },
  { kw: 'giftbox',   hot: false, img: '/images/home/shop-4.png' },
];

// Gifts 6 張卡的圖 kw（順序與 locale home.gifts.items 對齊）。
export const HOME_GIFTS_IMG: { kw: string; img: string }[] = [
  { kw: 'celebration', img: '/images/home/gifts-1.jpg' },
  { kw: 'wedding',     img: '/images/home/gifts-2.png' },
  { kw: 'graduation',  img: '/images/home/gifts-3.png' },
  { kw: 'baby',        img: '/images/home/gifts-4.jpg' },
  { kw: 'whisky',      img: '/images/home/gifts-5.png' },
  { kw: 'spa',         img: '/images/home/gifts-6.jpg' },
];
