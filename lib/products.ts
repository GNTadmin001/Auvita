// 商品資料（原 shop.jsx 的 PRODUCTS / FAMILIES / GROUPS）。純資料，client 元件可直接 import。
// 奈米金 / 奈米銀 已合併為「汽化材料」群，ph:true 為佔位商品（示意）。
// IMG：線上 placeholder 圖（loremflickr，依 lock 穩定）；之後換成品牌實拍只改此函式。
export const IMG = (kw: string, lock: number | string, w = 1000, h = 750): string =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(kw)}?lock=${lock}`;

export type Product = {
  id: string;
  zh: string;
  en: string;
  family: string;    // 中文家族顯示（也是 CartItem.family）
  fam: 'foil' | 'vaporize'; // 篩選 key
  price: number;
  kw: string;
  lock: number;
  desc: string;      // 短描述（商品卡用）
  img?: string;      // 主圖（商品卡 / gallery fallback）
  ph?: boolean;      // 佔位商品（價格洽詢）
  noOnline?: boolean; // 無法網路販售
  pdfUrl?: string;   // 點擊後開啟 PDF DM viewer
  externalUrl?: string; // PDF viewer 內的外部連結
  // ── 商品詳頁（product/[id]）選用欄位 ──
  tag?: string;      // 詳頁 badge，e.g. "最受歡迎"
  unit?: string;     // 價格單位說明，e.g. "禮盒（10 片裝）"
  longDesc?: string; // 詳頁長描述段落
  specs?: [string, string][];          // 規格表
  steps?: [string, string, string][];  // How to use：[編號, 標題, 說明]
  thumbImgs?: string[];   // gallery 多圖（缺則用 img）
  thumbLabels?: string[]; // gallery 圖說
  thumbKw?: string[];     // loremflickr fallback 關鍵字
  certs?: string[];       // 認證標章
};

export const PRODUCTS: Product[] = [
  // ---- 金箔 family ----
  { id: 'foil-leaf',  zh: '食用金箔',   en: 'Edible Gold Leaf',   family: '金箔', fam: 'foil', price: 1280, kw: 'gold,leaf',           lock: 12, img: '/images/金純.jpg',
    desc: '汽化式 9999 純金箔，薄度僅傳統槌打金箔的四分之一，分布更均勻。',
    tag: '最受歡迎', unit: '禮盒（10 片裝）',
    longDesc: '9999 純食用金箔，純水。無色無味，開瓶即用，為您的飲品鋪上一層永恆金光。',
    thumbImgs:  ['/images/金純.jpg', '/images/products/foil-leaf-2.jpg', '/images/products/foil-leaf-3.jpg', '/images/products/foil-leaf-4.jpg'],
    thumbLabels: ['正面', '金箔 ', '情境 ', '證書 '],
    thumbKw:    ['giftbox', 'goldleaf', 'champagne', 'document'],
    specs: [
      ['成分 Base',      '水，金箔'],
      ['風味 Taste',     '無色・無味'],
      ['規格 Format',    '5cc/瓶，1.66mg金箔。10瓶裝 禮盒'],
      ['金箔純度 Purity',    '99.99%'],
      ['金箔厚度 Thickness', '100 nm'],
      ['認證 Certification',    '2025SNG國家品質獎章，食品添加許可證，SGS檢驗'],
    ],
    steps: [
      ['01', '開瓶，少量取用',     '用乾燥的工具輕輕取出少量金箔，一點點就有驚人的視覺效果。'],
      ['02', '輕撒或貼附於食物',   '直接撒於甜點、巧克力表面，或撒入飲料欣賞金色擴散的瞬間。'],
      ['03', '拍照，然後享用',     '金色在燈光下閃耀，是天生的打卡素材。食用後完全無色無味。'],
    ],
    certs: ['SNQ 2025', 'SGS ≥99.9%', 'TFDA', 'EU · E175', 'FDA', 'HALAL'],
  },
  { id: 'foil-powder', zh: '金粉複方',  en: 'Edible Gold Powder',  family: '金箔', fam: 'foil', price: 1680, kw: 'gold,powder,dust',     lock: 64, img: '/images/4號金粉.png',
    desc: '金粉與天然香料結合的複方，可用在各式料理，兼顧視覺、風味、法規限制。' },
  { id: 'foil-wine',  zh: '金箔酒',    en: 'Gold Leaf Wine',      family: '金箔', fam: 'foil', price: 2880, kw: 'champagne,gold',       lock: 41, img: '/images/products/foil-wine.png', noOnline: true,
    pdfUrl: '/documents/foil-wine-dm.pdf', externalUrl: 'https://www.goldinalliance.com/',
    desc: '9999 純金箔懸浮在酒中，隨光流轉。宴席與禮贈的華麗主角。' },
  { id: 'foil-choc',  zh: '金箔巧克力', en: 'Gold Chocolate',      family: '金箔', fam: 'foil', price: 980,  kw: 'chocolate,gold,luxury', lock: 33, img: '/images/products/foil-choc.jpg',
    desc: '純金箔點綴的手工巧克力，黑金相映，節慶禮盒之選。' },
  { id: 'foil-candy', zh: '金箔冰糖棒', en: 'Gold Leaf Rock Candy Stick', family: '金箔', fam: 'foil', price: 580, kw: 'candy,sugar,gold', lock: 55, img: IMG('candy,sugar,gold', 55),
    desc: '純冰糖結晶棒點綴 9999 純金箔，晶瑩金色甜點，可作調酒攪拌棒或獨立享用。',
    longDesc: '以天然純冰糖為基底，表面點綴 9999 食用金箔。獨特的金色視覺搭配純淨甜味，適合作為精緻飲品的攪拌棒、禮盒配件或高端甜點擺盤。',
    specs: [
      ['成分 Ingredients',   '冰糖，金箔'],
      ['金箔純度 Purity',    '99.99%'],
      ['認證 Certification', 'TFDA，SGS 檢驗'],
    ],
  },

  // ---- 汽化材料 family（奈米金 + 奈米銀 合併） ----
  { id: 'nano-gold-raw',   zh: '奈米金原液',     en: 'Nano Gold Solution',   family: '汽化材料', fam: 'vaporize', price: 0, kw: 'laboratory,liquid,science',  lock: 73, img: '/images/products/nano-gold-raw.jpg',   ph: true,
    desc: '（示意）供配方／藥物載體研發之奈米金原液。規格洽談中。' },
  { id: 'nano-silver-raw', zh: '奈米銀原液',     en: 'Nano Silver Solution', family: '汽化材料', fam: 'vaporize', price: 0, kw: 'laboratory,silver,liquid',     lock: 83, img: '/images/products/nano-silver-raw.jpg', ph: true,
    desc: '（示意）供抗菌應用之奈米銀原液。規格洽談中。' },
];

export const FAMILIES: { key: string; zh: string }[] = [
  { key: 'all',       zh: '全部' },
  { key: 'foil',      zh: '金箔' },
  { key: 'vaporize',  zh: '汽化材料' },
];

export const GROUPS: { key: string; zh: string; en: string; note: string; ph?: boolean }[] = [
  { key: 'foil',     zh: '金箔',     en: 'Edible Gold Leaf', note: '食用金主線商品，可直接選購。' },
  { key: 'vaporize', zh: '汽化材料', en: 'Vaporized Materials', note: '奈米金與奈米銀原液，美容、藥物載體與抗菌應用。商品內容建置中，以下為示意。', ph: true },
];
