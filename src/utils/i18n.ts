import en from '../locales/en.json';
import ka from '../locales/ka.json';
import ru from '../locales/ru.json';
import { Lang } from '../types/cv';

/**
 * თარგმანების ობიექტი ენების მიხედვით (EN, KA, RU)
 */
export const translations: Record<Lang, any> = {
  en,
  ka,
  ru,
};

/**
 * თარგმანის წამოღების ფუნქცია:
 * - იღებს ენას (lang) და გასაღების წერტილოვან გზას (მაგ. 'header.readyCv')
 * - თუ მითითებულ ენაზე გასაღები ვერ მოიძებნა, იყენებს ინგლისურ (Fallback) ვარიანტს
 * - მხარს უჭერს დინამიურ პარამეტრებს (მაგ. {name})
 */
export function getTranslation(lang: Lang, path: string, params?: Record<string, string | number>): string {
  const dict = translations[lang] || translations.en;
  const fallback = translations.en;

  const keys = path.split('.');
  let current = dict;
  let currentFallback = fallback;

  for (const k of keys) {
    current = current ? current[k] : undefined;
    currentFallback = currentFallback ? currentFallback[k] : undefined;
  }

  let result = typeof current === 'string' ? current : (typeof currentFallback === 'string' ? currentFallback : path);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
    }
  }

  return result;
}
