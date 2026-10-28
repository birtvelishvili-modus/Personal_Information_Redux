import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CVData, ExperienceItem, EducationItem, LanguageItem, StepType, AppView, Lang, TemplateId } from '../types/cv';
import { TEMPLATES } from '../components/templates/templatesRegistry';
import {
  loadSavedCv,
  loadSavedStep,
  loadSavedLang,
  loadSavedTemplate,
} from '../utils/storage';

export interface CvState {
  formData: CVData;
  currentStep: StepType;
  activeView: AppView;
  currentLang: Lang;
  selectedTemplate: TemplateId;
  isDemoTourOpen: boolean;
  isCustomized: boolean;
}

const initialLang = loadSavedLang();
const initialTemplate = loadSavedTemplate();
const initialSavedCv = loadSavedCv();
const initialSavedStep = (loadSavedStep() as StepType) || 1;

const initialState: CvState = {
  formData: initialSavedCv,
  currentStep: initialSavedStep >= 1 && initialSavedStep <= 4 ? initialSavedStep : 1,
  activeView: 'landing',
  currentLang: initialLang,
  selectedTemplate: initialTemplate,
  isDemoTourOpen: false,
  isCustomized: false,
};

export const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    updatePersonalInfo: (
      state,
      action: PayloadAction<Partial<Pick<CVData, 'firstName' | 'lastName' | 'jobTitle' | 'email' | 'phone' | 'location' | 'address' | 'nationality' | 'birthDate' | 'website' | 'photo' | 'summary'>>>
    ) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
      state.isCustomized = true;
    },

    updateExperienceItem: (
      state,
      action: PayloadAction<{ index: number; field: keyof ExperienceItem; value: string }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.formData.experience[index]) {
        state.formData.experience[index] = {
          ...state.formData.experience[index],
          [field]: value,
        };
        state.isCustomized = true;
      }
    },

    addExperienceItem: (state) => {
      const newItem: ExperienceItem = {
        id: `exp-${Date.now()}`,
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
      };
      state.formData.experience.push(newItem);
      state.isCustomized = true;
    },

    removeExperienceItem: (state, action: PayloadAction<number>) => {
      if (state.formData.experience.length > 1) {
        state.formData.experience = state.formData.experience.filter(
          (_, idx) => idx !== action.payload
        );
        state.isCustomized = true;
      }
    },

    updateEducationItem: (
      state,
      action: PayloadAction<{ index: number; field: keyof EducationItem; value: string }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.formData.education[index]) {
        state.formData.education[index] = {
          ...state.formData.education[index],
          [field]: value,
        };
        state.isCustomized = true;
      }
    },

    addEducationItem: (state) => {
      const newItem: EducationItem = {
        id: `edu-${Date.now()}`,
        institution: '',
        degree: '',
        startDate: '',
        endDate: '',
        description: '',
      };
      state.formData.education.push(newItem);
      state.isCustomized = true;
    },

    removeEducationItem: (state, action: PayloadAction<number>) => {
      if (state.formData.education.length > 1) {
        state.formData.education = state.formData.education.filter(
          (_, idx) => idx !== action.payload
        );
        state.isCustomized = true;
      }
    },

    addSkill: (state, action: PayloadAction<string>) => {
      const trimmed = action.payload.trim();
      if (trimmed && !state.formData.skills.includes(trimmed)) {
        state.formData.skills.push(trimmed);
        state.isCustomized = true;
      }
    },

    removeSkill: (state, action: PayloadAction<number>) => {
      state.formData.skills = state.formData.skills.filter((_, idx) => idx !== action.payload);
      state.isCustomized = true;
    },

    updateLanguageItem: (
      state,
      action: PayloadAction<{ index: number; field: keyof LanguageItem; value: string }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.formData.languages[index]) {
        state.formData.languages[index] = {
          ...state.formData.languages[index],
          [field]: value,
        };
        state.isCustomized = true;
      }
    },

    addLanguageItem: (state) => {
      const newItem: LanguageItem = {
        id: `lang-${Date.now()}`,
        name: '',
        level: '',
      };
      state.formData.languages.push(newItem);
      state.isCustomized = true;
    },

    removeLanguageItem: (state, action: PayloadAction<number>) => {
      state.formData.languages = state.formData.languages.filter(
        (_, idx) => idx !== action.payload
      );
      state.isCustomized = true;
    },

    setStep: (state, action: PayloadAction<StepType>) => {
      state.currentStep = action.payload;
    },

    setView: (state, action: PayloadAction<AppView>) => {
      state.activeView = action.payload;
    },

    setLang: (state, action: PayloadAction<Lang>) => {
      state.currentLang = action.payload;
      // If user is currently on unmodified ready data, update it to the target language
      if (!state.isCustomized) {
        const templateDef = TEMPLATES[state.selectedTemplate];
        if (templateDef && templateDef.ready[action.payload]) {
          state.formData = JSON.parse(JSON.stringify(templateDef.ready[action.payload]));
        }
      }
    },

    setTemplate: (state, action: PayloadAction<TemplateId>) => {
      state.selectedTemplate = action.payload;
      // If user hasn't typed custom data yet, adopt the new template's ready data
      if (!state.isCustomized) {
        const templateDef = TEMPLATES[action.payload];
        if (templateDef && templateDef.ready[state.currentLang]) {
          state.formData = JSON.parse(JSON.stringify(templateDef.ready[state.currentLang]));
        }
      }
    },

    setDemoTourOpen: (state, action: PayloadAction<boolean>) => {
      state.isDemoTourOpen = action.payload;
    },

    applyTemplateReady: (state) => {
      const templateDef = TEMPLATES[state.selectedTemplate];
      if (templateDef && templateDef.ready[state.currentLang]) {
        state.formData = JSON.parse(JSON.stringify(templateDef.ready[state.currentLang]));
        state.isCustomized = false;
      }
    },

    applyDemoTemplate: (state) => {
      const templateDef = TEMPLATES[state.selectedTemplate];
      if (templateDef && templateDef.ready[state.currentLang]) {
        state.formData = JSON.parse(JSON.stringify(templateDef.ready[state.currentLang]));
        state.isCustomized = false;
      }
    },

    resetToTemplateDefault: (state) => {
      const templateDef = TEMPLATES[state.selectedTemplate];
      if (templateDef && templateDef.ready[state.currentLang]) {
        state.formData = JSON.parse(JSON.stringify(templateDef.ready[state.currentLang]));
        state.isCustomized = false;
      }
    },

    resetToBlank: (state) => {
      const templateDef = TEMPLATES[state.selectedTemplate];
      if (templateDef) {
        state.formData = JSON.parse(JSON.stringify(templateDef.blank));
      }
      state.currentStep = 1;
      state.activeView = 'wizard';
      state.isCustomized = false;
    },
  },
});

export const {
  updatePersonalInfo,
  updateExperienceItem,
  addExperienceItem,
  removeExperienceItem,
  updateEducationItem,
  addEducationItem,
  removeEducationItem,
  addSkill,
  removeSkill,
  updateLanguageItem,
  addLanguageItem,
  removeLanguageItem,
  setStep,
  setView,
  setLang,
  setTemplate,
  setDemoTourOpen,
  applyTemplateReady,
  applyDemoTemplate,
  resetToTemplateDefault,
  resetToBlank,
} = cvSlice.actions;

export default cvSlice.reducer;
