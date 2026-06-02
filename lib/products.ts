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
  ph?: boolean; // 佔位商品（價格洽詢）
};

export const PRODUCTS: Product[] = [
  // ---- 金箔 family (real-ish, 食用金 2C 主線) ----
  { id: 'foil-leaf', zh: '食用金箔', en: 'Edible Gold Leaf', family: '金箔', fam: 'foil', price: 1280, kw: 'gold,leaf', lock: 12,
    desc: '汽化式 9999 純金箔，薄度僅傳統槌打金箔的四分之一，分布更均勻。' },
  { id: 'foil-powder', zh: '食用金粉', en: 'Edible Gold Powder', family: '金箔', fam: 'foil', price: 1680, kw: 'gold,powder,dust', lock: 64,
    desc: '金粉與金粉複方，供調飲、烘焙創作，可調粒徑兼顧視覺與風味。' },
  { id: 'foil-wine', zh: '金箔酒', en: 'Gold Leaf Wine', family: '金箔', fam: 'foil', price: 2880, kw: 'champagne,gold', lock: 41,
    desc: '9999 純金箔懸浮酒體，隨光流轉。宴席與禮贈的華麗主角。' },
  { id: 'foil-choc', zh: '金箔巧克力', en: 'Gold Chocolate', family: '金箔', fam: 'foil', price: 980, kw: 'chocolate,gold,luxury', lock: 33,
    desc: '純金箔點綴的手工巧克力，黑金相映，節慶禮盒之選。' },
  { id: 'foil-soap', zh: '金箔肥皂', en: 'Gold Leaf Soap', family: '金箔', fam: 'foil', price: 680, kw: 'soap,gold,spa', lock: 49,
    desc: '含金箔的手工皂，金光內蘊，沐浴間的小奢華。' },

  // ---- 奈米金 family (placeholder) ----
  { id: 'nano-gold-serum', zh: '奈米金保養精華', en: 'Nano Gold Serum', family: '奈米金', fam: 'nano-gold', price: 0, kw: 'skincare,serum,gold', lock: 71, ph: true,
    desc: '（示意）以汽化式奈米金為載體的保養精華。商品規格與售價建置中。' },
  { id: 'nano-gold-raw', zh: '奈米金原液', en: 'Nano Gold Solution', family: '奈米金', fam: 'nano-gold', price: 0, kw: 'laboratory,liquid,science', lock: 73, ph: true,
    desc: '（示意）供配方／藥物載體研發之奈米金原液。規格洽談中。' },

  // ---- 奈米銀 family (placeholder) ----
  { id: 'nano-silver-spray', zh: '奈米銀抗菌噴霧', en: 'Nano Silver Spray', family: '奈米銀', fam: 'nano-silver', price: 0, kw: 'spray,clean,silver', lock: 81, ph: true,
    desc: '（示意）汽化式奈米銀殺菌噴霧。商品內容與售價建置中。' },
  { id: 'nano-silver-raw', zh: '奈米銀原液', en: 'Nano Silver Solution', family: '奈米銀', fam: 'nano-silver', price: 0, kw: 'laboratory,silver,liquid', lock: 83, ph: true,
    desc: '（示意）供抗菌應用之奈米銀原液。規格洽談中。' },
];

export const FAMILIES: { key: string; zh: string }[] = [
  { key: 'all', zh: '全部' },
  { key: 'foil', zh: '金箔' },
  { key: 'nano-gold', zh: '奈米金' },
  { key: 'nano-silver', zh: '奈米銀' },
];

export const GROUPS: { key: string; zh: string; en: string; note: string; ph?: boolean }[] = [
  { key: 'foil', zh: '金箔', en: 'Edible Gold Leaf', note: '食用金主線商品，可直接選購。' },
  { key: 'nano-gold', zh: '奈米金', en: 'Nano Gold', note: '美容與藥物載體應用。商品內容建置中，以下為示意。', ph: true },
  { key: 'nano-silver', zh: '奈米銀', en: 'Nano Silver', note: '殺菌抗菌應用。商品內容建置中，以下為示意。', ph: true },
];
