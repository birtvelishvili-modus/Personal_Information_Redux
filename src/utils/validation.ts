import { Lang } from '../types/cv';

export const GEORGIAN_LETTERS_REGEX = /^[ა-ჰ\s-]+$/;
export const LATIN_LETTERS_REGEX = /^[a-zA-Z\s.-]+$/;
export const CYRILLIC_LETTERS_REGEX = /^[а-яА-ЯёЁ\s.-]+$/;

export function validateName(value: string, lang: Lang): { isValid: boolean; errorKey?: string } {
  const trimmed = value.trim();
  if (!trimmed) {
    return { isValid: false, errorKey: 'validation.required' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, errorKey: 'validation.minChars' };
  }

  if (lang === 'ka' && !GEORGIAN_LETTERS_REGEX.test(trimmed)) {
    return { isValid: false, errorKey: 'validation.georgianOnly' };
  }

  return { isValid: true };
}

export function validateEmail(value: string, requireRedberry: boolean = false): { isValid: boolean; errorKey?: string } {
  const trimmed = value.trim();
  if (!trimmed) {
    return { isValid: false, errorKey: 'validation.required' };
  }

  if (requireRedberry && !trimmed.endsWith('@redberry.ge')) {
    return { isValid: false, errorKey: 'validation.redberryEmailOnly' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, errorKey: 'validation.invalidEmail' };
  }

  return { isValid: true };
}

export function validatePhone(value: string): { isValid: boolean; errorKey?: string } {
  const trimmed = value.trim();
  if (!trimmed) {
    return { isValid: false, errorKey: 'validation.required' };
  }
  // Check minimal phone requirements (at least 7 digits)
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 7) {
    return { isValid: false, errorKey: 'validation.phoneFormat' };
  }
  return { isValid: true };
}
