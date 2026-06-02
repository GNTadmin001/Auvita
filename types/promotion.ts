export interface PromotionLocaleContent {
  title: string;
  description: string;
}

export interface Promotion {
  id: string;
  image: string;
  startAt: string;
  endAt: string;
  link?: string;
  archivedAt?: string;
  'zh-TW': PromotionLocaleContent;
  en: PromotionLocaleContent;
  ja: PromotionLocaleContent;
}

export type SupportedLocale = 'zh-TW' | 'en' | 'ja';
