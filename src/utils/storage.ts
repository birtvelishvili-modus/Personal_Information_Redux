import { CVData, Lang, TemplateId } from '../types/cv';
import { redberryBlank } from '../components/templates/redberry/redberry.blank';

// LocalStorage-ის გასაღებები
const STORAGE_KEY = 'universal_cv_form_data';
const STEP_KEY = 'universal_cv_active_step';
const LANG_KEY = 'universal_cv_active_lang';
const TEMPLATE_KEY = 'universal_cv_active_template';

/**
 * LocalStorage-დან შენახული CV მონაცემების წამოღება.
 * თუ მონაცემები არ არსებობს ან შეცდომაა, აბრუნებს სტანდარტულ ცარიელ შაბლონს (redberryBlank).
 */
export function loadSavedCv(): CVData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return redberryBlank;
    const parsed = JSON.parse(raw);
    let firstName = parsed.firstName ?? '';
    let lastName = parsed.lastName ?? '';
    if (!firstName && !lastName && typeof parsed.fullName === 'string' && parsed.fullName.trim()) {
      const parts = parsed.fullName.trim().split(/\s+/);
      firstName = parts[0] || '';
      lastName = parts.slice(1).join(' ') || '';
    }
    return {
      ...redberryBlank,
      ...parsed,
      firstName,
      lastName,
      experience: parsed.experience && parsed.experience.length > 0 ? parsed.experience : redberryBlank.experience,
      education: parsed.education && parsed.education.length > 0 ? parsed.education : redberryBlank.education,
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      languages: Array.isArray(parsed.languages) ? parsed.languages : [],
    };
  } catch (e) {
    console.error('Failed to load CV from localStorage', e);
    return redberryBlank;
  }
}

/**
 * CV მონაცემების შენახვა LocalStorage-ში
 */
export function saveCvToStorage(data: CVData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save CV to localStorage', e);
  }
}

/**
 * LocalStorage-დან CV მონაცემების გასუფთავება (Clear & Start New)
 */
export function clearCvStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear CV from localStorage', e);
  }
}

/**
 * მიმდინარე აქტიური ნაბიჯის წამოღება LocalStorage-დან
 */
export function loadSavedStep(): number {
  try {
    const step = localStorage.getItem(STEP_KEY);
    return step ? parseInt(step, 10) : 1;
  } catch {
    return 1;
  }
}

/**
 * მიმდინარე აქტიური ნაბიჯის შენახვა LocalStorage-ში
 */
export function saveStepToStorage(step: number): void {
  try {
    localStorage.setItem(STEP_KEY, step.toString());
  } catch (e) {
    console.error('Failed to save step to localStorage', e);
  }
}

/**
 * არჩეული ენის წამოღება LocalStorage-დან (ნაგულისხმევია 'en')
 */
export function loadSavedLang(): Lang {
  try {
    const lang = localStorage.getItem(LANG_KEY);
    if (lang === 'en' || lang === 'ka' || lang === 'ru') {
      return lang;
    }
    return 'en';
  } catch {
    return 'en';
  }
}

/**
 * არჩეული ენის შენახვა LocalStorage-ში
 */
export function saveLangToStorage(lang: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {
    console.error('Failed to save lang to localStorage', e);
  }
}

/**
 * არჩეული შაბლონის ID-ის წამოღება LocalStorage-დან
 */
export function loadSavedTemplate(): TemplateId {
  try {
    const t = localStorage.getItem(TEMPLATE_KEY) as TemplateId;
    if (t && ['redberry', 'modern', 'twoColumn', 'europass', 'creative'].includes(t)) {
      return t;
    }
    return 'redberry';
  } catch {
    return 'redberry';
  }
}

/**
 * არჩეული შაბლონის ID-ის შენახვა LocalStorage-ში
 */
export function saveTemplateToStorage(templateId: TemplateId): void {
  try {
    localStorage.setItem(TEMPLATE_KEY, templateId);
  } catch (e) {
    console.error('Failed to save template to localStorage', e);
  }
}
