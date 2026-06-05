// Applications 頁的「非文字」設定：圖片引用、版面旗標、內部連結。三語共用，不進 locale。
// 文字在 locales/*.json 的 `applications` 命名空間，靠每個 scene / fam 的 key 對應。
// 這是 i18n 標準分離的「圖片＋版面」那一檔（文字另在 locale，依語言各一份）。

export type SceneLayout = {
  key: string; // 對應 locale applications.scenes.<key>
  flip?: boolean; // 圖文左右對調
  kw: string; // PhImg 關鍵字（無真圖時的占位來源）
  lock: number; // PhImg 占位圖鎖定值
  images?: string[]; // 有真圖時的輪播來源（優先於 kw/lock）
  ctaHref?: string; // CTA 連結；文字在 locale 的 scenes.<key>.cta
};

export type FamLayout = {
  key: string; // 對應 locale applications.fam.<key>
  id: string; // DOM id / 深連結錨點（#foil 等）
  steel?: boolean; // 奈米家族用冷色 kicker
  specnote?: boolean; // 家族末尾是否接免責聲明（文字在 locale applications.specnote）
  scenes: SceneLayout[];
};

export const APPLICATIONS_FAMS: FamLayout[] = [
  {
    key: 'foil',
    id: 'foil',
    scenes: [
      {
        key: 'cosmetics',
        flip: false,
        kw: 'cosmetics,gold,beauty',
        lock: 61,
        images: ['/images/applications/cosmetics.jpg'],
        ctaHref: '/shop#foil-soap',
      },
      {
        key: 'food',
        flip: true,
        kw: 'fine-dining,dessert,gold',
        lock: 22,
        images: ['/images/applications/foil-food-1.jpg'],
        ctaHref: '/shop#foil-leaf',
      },
      {
        key: 'wine',
        flip: false,
        kw: 'champagne,cocktail,gold',
        lock: 41,
        images: ['/images/applications/foil-wine-1.png'],
        ctaHref: '/shop#foil-wine',
      },
    ],
  },
  {
    key: 'nanoGold',
    id: 'nano-gold',
    steel: true,
    specnote: true,
    scenes: [
      {
        key: 'nanoGoldBeauty',
        flip: false,
        kw: 'cosmetics,serum,gold',
        lock: 61,
        images: ['/images/applications/nano-gold-beauty.jpg'],
        ctaHref: '/shop#nano-gold-serum',
      },
      {
        key: 'nanoGoldDelivery',
        flip: true,
        kw: 'laboratory,research,medical',
        lock: 54,
        images: ['/images/applications/nano-gold-delivery.jpg'],
        ctaHref: '/shop#nano-gold-raw',
      },
      {
        key: 'nanoGoldMaterial',
        flip: false,
        kw: 'laboratory,analysis,microscope',
        lock: 32,
        images: ['/images/applications/nano-gold-material.jpg'],
        ctaHref: '/contact',
      },
    ],
  },
  {
    key: 'silver',
    id: 'nano-silver',
    steel: true,
    scenes: [
      {
        key: 'silverSterile',
        flip: false,
        kw: 'clean,hygiene,spray',
        lock: 81,
        images: ['/images/applications/nano-silver.jpg'],
        ctaHref: '/shop#nano-silver-spray',
      },
    ],
  },
];
