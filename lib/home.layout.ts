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

// Scenes 15 張卡的圖 kw（5×3，順序與 locale home.scenes.items 對齊）。
export const HOME_SCENES_IMG: { kw: string; img: string }[] = [
  { kw: 'sushi',      img: '/images/home/scenes-1.jpg' },
  { kw: 'chocolate',  img: '/images/home/scenes-2.jpg' },
  { kw: 'whitechoc',  img: '/images/home/scenes-3.jpg' },
  { kw: 'cake',       img: '/images/home/scenes-4.jpg' },
  { kw: 'berry',      img: '/images/home/scenes-5.jpg' },
  { kw: 'montblanc',  img: '/images/home/scenes-6.jpg' },
  { kw: 'salad',      img: '/images/home/scenes-7.jpg' },
  { kw: 'cocktail',   img: '/images/home/scenes-8.jpg' },
  { kw: 'cheesecake', img: '/images/home/scenes-9.jpg' },
  { kw: 'goldcake',   img: '/images/home/scenes-10.jpg' },
  { kw: 'caviar',     img: '/images/home/scenes-11.jpg' },
  { kw: 'coffee',     img: '/images/home/scenes-12.jpg' },
  { kw: 'salmonroe',  img: '/images/home/scenes-13.jpg' },
  { kw: 'salmon',     img: '/images/home/scenes-14.jpg' },
  { kw: 'goldpure',   img: '/images/home/scenes-15.jpg' },
];
