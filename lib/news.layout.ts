// News 頁「無 active.json 資料時」的佔位卡版面：圖片關鍵字與占位鎖定值。三語共用。
// 文字在 locales/*.json 的 `news.placeholder.<key>` 命名空間。
// active.json 有資料時走 promotion 多語資料，不用這份。

export type NewsPlaceholder = {
  key: string; // 對應 locale news.placeholder.<key>.{tag,zh}
  kw: string;
  lock: number;
  img: string;
};

export const NEWS_PLACEHOLDERS: NewsPlaceholder[] = [
  { key: 'event',   kw: 'event,gold,gallery',   lock: 31, img: '/images/home/news-1.jpg' },
  { key: 'newitem', kw: 'luxury,gold,product',  lock: 36, img: '/images/home/news-2.jpg' },
  { key: 'store',   kw: 'store,museum,gold',    lock: 39, img: '/images/home/news-3.jpg' },
];
