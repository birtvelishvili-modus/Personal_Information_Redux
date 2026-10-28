import { CVData, Lang, TemplateId } from '../types/cv';
import { redberryBlank } from '../components/templates/redberry/redberry.blank';

const STORAGE_KEY = 'universal_cv_form_data';
const STEP_KEY = 'universal_cv_active_step';
const LANG_KEY = 'universal_cv_active_lang';
const TEMPLATE_KEY = 'universal_cv_active_template';

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

export function saveCvToStorage(data: CVData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save CV to localStorage', e);
  }
}

export function clearCvStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear CV from localStorage', e);
  }
}

export function loadSavedStep(): number {
  try {
    const step = localStorage.getItem(STEP_KEY);
    return step ? parseInt(step, 10) : 1;
  } catch {
    return 1;
  }
}

export function saveStepToStorage(step: number): void {
  try {
    localStorage.setItem(STEP_KEY, step.toString());
  } catch (e) {
    console.error('Failed to save step to localStorage', e);
  }
}

export function loadSavedLang(): Lang {
  try {
    const lang = localStorage.getItem(LANG_KEY);
    if (lang === 'en' || lang === 'ka' || lang === 'ru') {
      return lang;
    }
    return 'en'; // Default language is English
  } catch {
    return 'en';
  }
}

export function saveLangToStorage(lang: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {
    console.error('Failed to save lang to localStorage', e);
  }
}

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

export function saveTemplateToStorage(templateId: TemplateId): void {
  try {
    localStorage.setItem(TEMPLATE_KEY, templateId);
  } catch (e) {
    console.error('Failed to save template to localStorage', e);
  }
}
