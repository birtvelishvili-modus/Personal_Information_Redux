import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CVData, ExperienceItem, EducationItem, LanguageItem, StepType, AppView, Lang, TemplateId } from '../types/cv';
import { TEMPLATES } from '../components/templates/templatesRegistry';
import {
  loadSavedCv,
  loadSavedStep,
  loadSavedLang,
  loadSavedTemplate,
} from '../utils/storage';

/**
 * CV State-ის ინტერფეისი Redux-ისთვის
 */
export interface CvState {
  formData: CVData;               // ფორმის შევსებული მონაცემები
  currentStep: StepType;          // მიმდინარე ეტაპი (1, 2, 3 ან 4)
  activeView: AppView;            // მიმდინარე ხედი ('landing', 'wizard', 'completed')
  currentLang: Lang;              // არჩეული ენა ('en', 'ka', 'ru')
  selectedTemplate: TemplateId;   // არჩეული შაბლონი ('redberry', 'modern' და ა.შ.)
  isDemoTourOpen: boolean;        // დემო ტურის მოდალის გახსნის სტატუსი
  isCustomized: boolean;          // მომხმარებელმა შეცვალა თუ არა საწყისი მონაცემები
}

// LocalStorage-დან საწყისი მნიშვნელობების წამოღება
const initialLang = loadSavedLang();
const initialTemplate = loadSavedTemplate();
const initialSavedCv = loadSavedCv();
const initialSavedStep = (loadSavedStep() as StepType) || 1;

/**
 * Redux Slice-ის საწყისი მდგომარეობა
 */
const initialState: CvState = {
  formData: initialSavedCv,
  currentStep: initialSavedStep >= 1 && initialSavedStep <= 4 ? initialSavedStep : 1,
  activeView: 'landing',
  currentLang: initialLang,
  selectedTemplate: initialTemplate,
  isDemoTourOpen: false,
  isCustomized: false,
};

/**
 * CV Slice - შეიცავს ყველა Reducer-სა და Action-ს CV-ის მონაცემების სამართავად
 */
export const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    /**
     * პირადი ინფორმაციის ველების განახლება
     */
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

    /**
     * კონკრეტული სამუშაო გამოცდილების ველის განახლება ინდექსის მიხედვით
     */
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

    /**
     * ახალი ცარიელი სამუშაო გამოცდილების ჩანაწერის დამატება
     */
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

    /**
     * სამუშაო გამოცდილების ჩანაწერის წაშლა ინდექსის მიხედვით
     */
    removeExperienceItem: (state, action: PayloadAction<number>) => {
      if (state.formData.experience.length > 1) {
        state.formData.experience = state.formData.experience.filter(
          (_, idx) => idx !== action.payload
        );
        state.isCustomized = true;
      }
    },

    /**
     * კონკრეტული განათლების ველის განახლება ინდექსის მიხედვით
     */
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

    /**
     * ახალი ცარიელი განათლების ჩანაწერის დამატება
     */
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

    /**
     * განათლების ჩანაწერის წაშლა ინდექსის მიხედვით
     */
    removeEducationItem: (state, action: PayloadAction<number>) => {
      if (state.formData.education.length > 1) {
        state.formData.education = state.formData.education.filter(
          (_, idx) => idx !== action.payload
        );
        state.isCustomized = true;
      }
    },

    /**
     * ახალი პროფესიული უნარის (Skill) დამატება
     */
    addSkill: (state, action: PayloadAction<string>) => {
      const trimmed = action.payload.trim();
      if (trimmed && !state.formData.skills.includes(trimmed)) {
        state.formData.skills.push(trimmed);
        state.isCustomized = true;
      }
    },

    /**
     * პროფესიული უნარის წაშლა ინდექსის მიხედვით
     */
    removeSkill: (state, action: PayloadAction<number>) => {
      state.formData.skills = state.formData.skills.filter((_, idx) => idx !== action.payload);
      state.isCustomized = true;
    },

    /**
     * უცხო ენის მონაცემის განახლება ინდექსის მიხედვით
     */
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

    /**
     * ახალი უცხო ენის ჩანაწერის დამატება
     */
    addLanguageItem: (state) => {
      const newItem: LanguageItem = {
        id: `lang-${Date.now()}`,
        name: '',
        level: '',
      };
      state.formData.languages.push(newItem);
      state.isCustomized = true;
    },

    /**
     * უცხო ენის ჩანაწერის წაშლა ინდექსის მიხედვით
     */
    removeLanguageItem: (state, action: PayloadAction<number>) => {
      state.formData.languages = state.formData.languages.filter(
        (_, idx) => idx !== action.payload
      );
      state.isCustomized = true;
    },

    /**
     * მიმდინარე ეტაპის (Step) შეცვლა
     */
    setStep: (state, action: PayloadAction<StepType>) => {
      state.currentStep = action.payload;
    },

    /**
     * აპლიკაციის მიმდინარე ხედის (View) შეცვლა
     */
    setView: (state, action: PayloadAction<AppView>) => {
      state.activeView = action.payload;
    },

    /**
     * ინტერფეისის ენის შეცვლა.
     * თუ მომხმარებელს ჯერ არ შეუცვლია მონაცემები, ავტომატურად იცვლება მზა (Ready) მონაცემების ენაც.
     */
    setLang: (state, action: PayloadAction<Lang>) => {
      state.currentLang = action.payload;
      if (!state.isCustomized) {
        const templateDef = TEMPLATES[state.selectedTemplate];
        if (templateDef && templateDef.ready[action.payload]) {
          state.formData = JSON.parse(JSON.stringify(templateDef.ready[action.payload]));
        }
      }
    },

    /**
     * CV-ის შაბლონის შეცვლა.
     * თუ მონაცემები ჯერ არ შეცვლილა, ახალი შაბლონის დემო მონაცემები ჩაიტვირთება.
     */
    setTemplate: (state, action: PayloadAction<TemplateId>) => {
      state.selectedTemplate = action.payload;
      if (!state.isCustomized) {
        const templateDef = TEMPLATES[action.payload];
        if (templateDef && templateDef.ready[state.currentLang]) {
          state.formData = JSON.parse(JSON.stringify(templateDef.ready[state.currentLang]));
        }
      }
    },

    /**
     * დემო ტურის მოდალის გახსნა/დახურვა
     */
    setDemoTourOpen: (state, action: PayloadAction<boolean>) => {
      state.isDemoTourOpen = action.payload;
    },

    /**
     * არჩეული შაბლონის მზა (Ready) მონაცემების ჩატვირთვა
     */
    applyTemplateReady: (state) => {
      const templateDef = TEMPLATES[state.selectedTemplate];
      if (templateDef && templateDef.ready[state.currentLang]) {
        state.formData = JSON.parse(JSON.stringify(templateDef.ready[state.currentLang]));
        state.isCustomized = false;
      }
    },

    /**
     * დემო შაბლონის მონაცემების ჩატვირთვა
     */
    applyDemoTemplate: (state) => {
      const templateDef = TEMPLATES[state.selectedTemplate];
      if (templateDef && templateDef.ready[state.currentLang]) {
        state.formData = JSON.parse(JSON.stringify(templateDef.ready[state.currentLang]));
        state.isCustomized = false;
      }
    },

    /**
     * შაბლონის სტანდარტულ მონაცემებზე დაბრუნება
     */
    resetToTemplateDefault: (state) => {
      const templateDef = TEMPLATES[state.selectedTemplate];
      if (templateDef && templateDef.ready[state.currentLang]) {
        state.formData = JSON.parse(JSON.stringify(templateDef.ready[state.currentLang]));
        state.isCustomized = false;
      }
    },

    /**
     * ფორმის მთლიანად გასუფთავება ცარიელ (Blank) შაბლონამდე და პირველ ეტაპზე დაბრუნება
     */
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

// Action-ების ექსპორტი კომპონენტებში გამოსაყენებლად
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

// Reducer-ის ექსპორტი Store-ისთვის
export default cvSlice.reducer;
