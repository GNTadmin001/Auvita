// 商品資料（原 shop.jsx 的 PRODUCTS / FAMILIES / GROUPS）。純資料，client 元件可直接 import。
// 奈米金 / 奈米銀為佔位商品（示意，price=0、ph:true），規格與內容未來建置。

export type Product = {
  id: string;
  zh: string;
  en: string;
  family: string; // 中文家族顯示（也是 CartItem.family）
  fam: 'foil' | 'nano-gold' | 'nano-silver'; // 篩選 key
  price: number;
  kw: string;
  lock: number;
  desc: string;
  img?: string; // 本地圖片路徑（無時 fallback 至 loremflickr）
  ph?: boolean; // 佔位商品（價格洽詢）
  noOnline?: boolean; // 無法網路販售（顯示價格但禁止加入購物車）
};

export const PRODUCTS: Product[] = [
  // ---- 金箔 family (real-ish, 食用金 2C 主線) ----
  { id: 'foil-leaf',  zh: '食用金箔',   en: 'Edible Gold Leaf',   family: '金箔', fam: 'foil', price: 1280, kw: 'gold,leaf',           lock: 12, img: '/images/金純.jpg',
    desc: '汽化式 9999 純金箔，薄度僅傳統槌打金箔的四分之一，分布更均勻。' },
  { id: 'foil-powder', zh: '食用金粉',  en: 'Edible Gold Powder',  family: '金箔', fam: 'foil', price: 1680, kw: 'gold,powder,dust',     lock: 64, img: '/images/4號金粉.png',
    desc: '金粉與金粉複方，供調飲、烘焙創作，可調粒徑兼顧視覺與風味。' },
  { id: 'foil-wine',  zh: '金箔酒',    en: 'Gold Leaf Wine',      family: '金箔', fam: 'foil', price: 2880, kw: 'champagne,gold',       lock: 41, img: '/images/products/foil-wine.png', noOnline: true,
    desc: '9999 純金箔懸浮酒體，隨光流轉。宴席與禮贈的華麗主角。' },
  { id: 'foil-choc',  zh: '金箔巧克力', en: 'Gold Chocolate',      family: '金箔', fam: 'foil', price: 980,  kw: 'chocolate,gold,luxury', lock: 33, img: '/images/products/foil-choc.jpg',
    desc: '純金箔點綴的手工巧克力，黑金相映，節慶禮盒之選。' },
  { id: 'foil-soap',  zh: '金箔肥皂',  en: 'Gold Leaf Soap',      family: '金箔', fam: 'foil', price: 680,  kw: 'soap,gold,spa',        lock: 49, img: '/images/products/foil-soap.jpg',
    desc: '含金箔的手工皂，金光內蘊，沐浴間的小奢華。' },

  // ---- 奈米金 family (placeholder) ----
  { id: 'nano-gold-raw',   zh: '奈米金原液',     en: 'Nano Gold Solution',  family: '奈米金', fam: 'nano-gold', price: 0, kw: 'laboratory,liquid,science',  lock: 73, img: '/images/products/nano-gold-raw.jpg',   ph: true,
    desc: '（示意）供配方／藥物載體研發之奈米金原液。規格洽談中。' },

  // ---- 奈米銀 family (placeholder) ----
  { id: 'nano-silver-raw',   zh: '奈米銀原液',     en: 'Nano Silver Solution', family: '奈米銀', fam: 'nano-silver', price: 0, kw: 'laboratory,silver,liquid',     lock: 83, img: '/images/products/nano-silver-raw.jpg',   ph: true,
    desc: '（示意）供抗菌應用之奈米銀原液。規格洽談中。' },
];

export const FAMILIES: { key: string; zh: string }[] = [
  { key: 'all',         zh: '全部' },
  { key: 'foil',        zh: '金箔' },
  { key: 'nano-gold',   zh: '奈米金' },
  { key: 'nano-silver', zh: '奈米銀' },
];

export const GROUPS: { key: string; zh: string; en: string; note: string; ph?: boolean }[] = [
  { key: 'foil',        zh: '金箔',   en: 'Edible Gold Leaf', note: '食用金主線商品，可直接選購。' },
  { key: 'nano-gold',   zh: '奈米金', en: 'Nano Gold',        note: '美容與藥物載體應用。商品內容建置中，以下為示意。', ph: true },
  { key: 'nano-silver', zh: '奈米銀', en: 'Nano Silver',      note: '殺菌抗菌應用。商品內容建置中，以下為示意。',       ph: true },
];
