// Home 頁的「非文字」設定：圖片 keyword/lock 與版面旗標。三語共用。
// 文字在 locales/*.json 的 `home` 命名空間；items 已移除 kw/hot 等欄位，以 index 對應此檔陣列。
// 標準分離模板（與 applications.layout.ts 對齊）。

export const HOME_HERO_IMG = {
  kw: 'goldleaf,dessert',
  lock: 12,
};

export type HomeOriginsTile = { kw: string; lock: number };

// Origins 兩塊磁磚的圖（對應 locale home.origins.tile1*/tile2*）。
export const HOME_ORIGINS_TILES: HomeOriginsTile[] = [
  { kw: 'goldleaf,dessert', lock: 5 },
  { kw: 'goldpowder,spice', lock: 8 },
];

// Scenes 6 張卡的圖 kw（順序與 locale home.scenes.items 對齊）。
export const HOME_SCENES_IMG: { kw: string }[] = [
  { kw: 'sushi' },
  { kw: 'dessert' },
  { kw: 'whisky' },
  { kw: 'cake' },
  { kw: 'gold' },
  { kw: 'giftbox' },
];

// ShopTeaser 4 張卡的圖 kw + hot 旗標（順序與 locale home.shopTeaser.items 對齊）。
export const HOME_SHOP_TEASER_IMG: { kw: string; hot: boolean }[] = [
  { kw: 'goldleaf', hot: true },
  { kw: 'spice', hot: false },
  { kw: 'chocolate', hot: false },
  { kw: 'giftbox', hot: false },
];

// Gifts 6 張卡的圖 kw（順序與 locale home.gifts.items 對齊）。
export const HOME_GIFTS_IMG: { kw: string }[] = [
  { kw: 'celebration' },
  { kw: 'wedding' },
  { kw: 'graduation' },
  { kw: 'baby' },
  { kw: 'whisky' },
  { kw: 'spa' },
];
