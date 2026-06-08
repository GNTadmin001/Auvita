// 站台 SEO 中央：metadata、hreflang、JSON-LD 生成。
// 文案策略：依使用者 2026-06-04 決策「先只維 zh-TW」，title/description 以 zh-TW 撰寫；
// hreflang 仍三語完整發信，en/ja 暫共用同字串（搜尋引擎理解此為品牌頁，不會視為重複內容降權）。
// 日後要分語系翻譯時，只改本檔的 PAGE_META 即可。
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.auvita.tw';
export const SITE_NAME = 'AUVITA';
export const DEFAULT_OG_IMAGE = '/assets/logo-nautilus-gold.png';

export type PageKey =
  | 'home'
  | 'applications'
  | 'brand-tech'
  | 'contact'
  | 'gold-history'
  | 'news'
  | 'shop';

type PageMeta = { path: string; title: string; description: string };

export const PAGE_META: Record<PageKey, PageMeta> = {
  home: {
    path: '/',
    title: 'AUVITA | 汽化金箔・純金食品',
    description:
      '台灣唯一合法食用金製造商。GNT 京華堂以 PVD 物理氣相沉積製程，製造 9999 純金金箔、金粉，三國認證，20 年研發。',
  },
  applications: {
    path: '/applications',
    title: '產品應用 | AUVITA 金箔・奈米金・奈米銀 七大應用場景',
    description:
      '金箔保養品、食用金箔料理、金釀黃金酒、奈米金醫美與藥物載體、奈米銀殺菌——AUVITA 汽化金的應用場景與深連結商品。',
  },
  'brand-tech': {
    path: '/brand-tech',
    title: '品牌與技術 | PVD 汽化金製程、規格與認證',
    description:
      'GNT 京華堂自 1993 年以 PVD 物理氣相沉積取代槌打金箔。9999 純度、100 nm 薄度、SGS 第三方檢測，富邦 5,000 萬產品責任險。',
  },
  contact: {
    path: '/contact',
    title: '聯絡我們 | AUVITA 洽詢採購・客製合作',
    description:
      '食用金原料、終端禮贈、奈米金/銀配方研究與品牌客製。線上洽詢表單，黃金博物館門市資訊，與品牌生態系外連。',
  },
  'gold-history': {
    path: '/gold-history',
    title: '金的歷史 | 七千年黃金文化、食金傳統與汽化金箔',
    description:
      '從古埃及到當代——黃金的文化、藥用與工藝史。京華堂 1993 年以 PVD 物理氣相沉積承先啟後，為台灣唯一合法食用金製造商。',
  },
  news: {
    path: '/news',
    title: '最新活動 | AUVITA 展覽、聯名與門市消息',
    description:
      '黃金博物館門市活動、新品上市、品牌聯名與媒體報導，AUVITA 與 GNT 京華堂的最新動態。',
  },
  shop: {
    path: '/shop',
    title: '選購 | AUVITA 食用金箔・金粉・金箔酒・奈米金/銀',
    description:
      '全部商品：食用金箔、食用金粉、金箔酒、金箔巧克力、金箔肥皂，以及奈米金、奈米銀原料。三家族篩選、深連結支援。',
  },
};

const PUBLIC_KEYS: PageKey[] = [
  'home',
  'applications',
  'brand-tech',
  'contact',
  'gold-history',
  'news',
  'shop',
];

export const PUBLIC_PAGES = PUBLIC_KEYS.map((k) => PAGE_META[k]);

function langPath(locale: string, path: string) {
  const segment = path === '/' ? '' : path;
  return `/${locale}${segment}`;
}

export function buildPageMetadata(key: PageKey, locale: string): Metadata {
  const meta = PAGE_META[key];
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: langPath(locale, meta.path),
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, langPath(l, meta.path)]),
      ),
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}${langPath(locale, meta.path)}`,
      images: [{ url: DEFAULT_OG_IMAGE }],
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

// ---------- JSON-LD ----------

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'AUVITA',
    alternateName: ['京華堂', 'GNT 京華堂', 'Gold Nanotech', '京華金'],
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo-nautilus-gold.png`,
    foundingDate: '1993',
    description:
      '台灣唯一合法食用金製造商；以 PVD 物理氣相沉積製程生產 9999 純金金箔、金粉、奈米金、奈米銀。',
    identifier: 'TWSE:1267',
    award: [
      'SNQ 國家品質標章',
      'EU E175 食用金認證',
      'TFDA 台灣食品藥物管理署認證',
      'HALAL 清真認證',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${SITE_URL}/zh-TW/contact`,
      availableLanguage: ['zh-TW', 'en'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '瑞光路258巷52號',
      addressLocality: '內湖區',
      addressRegion: '台北市',
      postalCode: '114',
      addressCountry: 'TW',
    },
    sameAs: ['http://www.gnt.com.tw', 'https://www.goldinalliance.com'],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: ['zh-TW', 'en', 'ja'],
  };
}

type ProductLd = {
  id: string;
  zh: string;
  en: string;
  desc: string;
  price: number;
  family: string;
  ph?: boolean;
};

export function productItemListJsonLd(products: ProductLd[], locale: string) {
  const base = `${SITE_URL}${langPath(locale, '/shop')}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${base}#itemlist`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        '@id': `${base}#${p.id}`,
        name: p.zh,
        alternateName: p.en,
        description: p.desc,
        brand: { '@type': 'Brand', name: 'AUVITA' },
        category: p.family,
        url: `${base}#${p.id}`,
        ...(p.ph
          ? {}
          : {
              offers: {
                '@type': 'Offer',
                priceCurrency: 'TWD',
                price: p.price,
                availability: 'https://schema.org/InStock',
                url: `${base}#${p.id}`,
                shippingDetails: {
                  '@type': 'OfferShippingDetails',
                  shippingRate: {
                    '@type': 'MonetaryAmount',
                    value: 0,
                    currency: 'TWD',
                  },
                  shippingDestination: {
                    '@type': 'DefinedRegion',
                    addressCountry: 'TW',
                  },
                  deliveryTime: {
                    '@type': 'ShippingDeliveryTime',
                    handlingTime: {
                      '@type': 'QuantitativeValue',
                      minValue: 1,
                      maxValue: 2,
                      unitCode: 'DAY',
                    },
                    transitTime: {
                      '@type': 'QuantitativeValue',
                      minValue: 1,
                      maxValue: 3,
                      unitCode: 'DAY',
                    },
                  },
                },
                hasMerchantReturnPolicy: {
                  '@type': 'MerchantReturnPolicy',
                  applicableCountry: 'TW',
                  returnPolicyCategory:
                    'https://schema.org/MerchantReturnFiniteReturnWindow',
                  merchantReturnDays: 7,
                  returnMethod: 'https://schema.org/ReturnByMail',
                  returnFees: 'https://schema.org/FreeReturn',
                },
              },
            }),
      },
    })),
  };
}

export function breadcrumbJsonLd(key: PageKey, locale: string) {
  const meta = PAGE_META[key];
  const segment = meta.path === '/' ? '' : meta.path;
  const labels: Record<PageKey, string> = {
    home: 'AUVITA',
    applications: '產品應用',
    'brand-tech': '品牌與技術',
    contact: '聯絡我們',
    'gold-history': '金的歷史',
    news: '最新活動',
    shop: '選購',
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'AUVITA',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels[key],
        item: `${SITE_URL}/${locale}${segment}`,
      },
    ],
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#local-business`,
    name: 'AUVITA / GNT 京華堂',
    image: `${SITE_URL}/assets/logo-nautilus-gold.png`,
    url: SITE_URL,
    telephone: '',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '瑞光路258巷52號',
      addressLocality: '內湖區',
      addressRegion: '台北市',
      postalCode: '114',
      addressCountry: 'TW',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.0784,
      longitude: 121.5787,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [`${SITE_URL}`, 'http://www.gnt.com.tw'],
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
