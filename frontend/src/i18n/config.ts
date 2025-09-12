export const SUPPORTED_LOCALES = ['en', 'vi', 'fr', 'de'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const THEME_COLORS = {
  primaryStart: '#14b8a6',
  primaryEnd: '#4ade80',
  destructiveStart: '#e02424',
  destructiveEnd: '#9b1c1c',
};