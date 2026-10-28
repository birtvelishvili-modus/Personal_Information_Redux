export type Lang = 'en' | 'ka' | 'ru';

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  startDate?: string;
  endDate: string;
  description?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string; // e.g. Native, C2, C1, B2, B1, A2, A1
}

export interface CVData {
  // Core Personal Details
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string; // City, Country

  // Europass & International extensions
  address?: string;     // Street Address
  nationality?: string; // Country / Citizenship
  birthDate?: string;   // YYYY-MM-DD
  website?: string;     // Portfolio / LinkedIn

  photo: string;        // Base64 or URL
  summary: string;

  // Sections
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  languages: LanguageItem[];
}

export type TemplateId = 'redberry' | 'modern' | 'twoColumn' | 'europass' | 'creative';

export type ReadyData = Record<Lang, CVData>;

export interface TemplateDefinition {
  id: TemplateId;
  nameKey: string;
  categoryKey: string;
  descriptionKey: string;
  accentColor: string;
  blank: CVData;
  ready: ReadyData;
}

export type StepType = 1 | 2 | 3 | 4; // 1: Personal, 2: Experience, 3: Education, 4: Skills & Languages
export type AppView = 'landing' | 'wizard' | 'completed';
