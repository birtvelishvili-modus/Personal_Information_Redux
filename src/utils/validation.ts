import { Lang } from '../types/cv';

/**
 * ვალიდაციის რეგულარული გამოსახულებები (Regex):
 * - GEORGIAN_LETTERS_REGEX: მხოლოდ ქართული ასოები, ჰარები და დეფისი
 * - LATIN_LETTERS_REGEX: მხოლოდ ლათინური ასოები
 * - CYRILLIC_LETTERS_REGEX: მხოლოდ კირილიცური ასოები
 */
export const GEORGIAN_LETTERS_REGEX = /^[ა-ჰ\s-]+$/;
export const LATIN_LETTERS_REGEX = /^[a-zA-Z\s.-]+$/;
export const CYRILLIC_LETTERS_REGEX = /^[а-яА-ЯёЁ\s.-]+$/;

/**
 * სახელისა და გვარის ვალიდაცია:
 * - ამოწმებს ველის სავალდებულოობას
 * - ამოწმებს მინიმუმ 2 სიმბოლოს
 * - ქართული ენის არჩევისას ამოწმებს, რომ გამოყენებული იყოს მხოლოდ ქართული ანბანი
 */
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

/**
 * ელ.ფოსტის ვალიდაცია:
 * - ამოწმებს სავალდებულოობას
 * - ამოწმებს სტანდარტულ email ფორმატს
 * - სურვილის შემთხვევაში ამოწმებს @redberry.ge დაბოლოებას
 */
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

/**
 * ტელეფონის ნომრის ვალიდაცია:
 * - ამოწმებს სავალდებულოობას
 * - ამოწმებს, რომ ციფრების რაოდენობა იყოს მინიმუმ 7
 */
export function validatePhone(value: string): { isValid: boolean; errorKey?: string } {
  const trimmed = value.trim();
  if (!trimmed) {
    return { isValid: false, errorKey: 'validation.required' };
  }
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 7) {
    return { isValid: false, errorKey: 'validation.phoneFormat' };
  }
  return { isValid: true };
}
