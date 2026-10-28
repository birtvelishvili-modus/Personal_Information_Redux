import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cvReducer from './cvSlice';
import {
  saveCvToStorage,
  saveStepToStorage,
  saveLangToStorage,
  saveTemplateToStorage,
} from '../utils/storage';

/**
 * Redux Store-ის კონფიგურაცია.
 * აქ რეგისტრირდება cvReducer, რომელიც პასუხისმგებელია CV-ის მთლიან მდგომარეობაზე.
 */
export const store = configureStore({
  reducer: {
    cv: cvReducer,
  },
});

// წინა მდგომარეობების შენახვა, რათა თავიდან ავიცილოთ localStorage-ში ზედმეტი ჩაწერა
let previousFormDataString = '';
let previousStep: number = 1;
let previousLang: string = '';
let previousTemplate: string = '';

/**
 * Store-ის გამოწერა (Subscribe).
 * ნებისმიერი ცვლილების დროს ამოწმებს, შეიცვალა თუ არა მონაცემები, მიმდინარე ნაბიჯი,
 * ენა ან შაბლონი და ავტომატურად ინახავს მათ LocalStorage-ში (Auto-save ფუნქციონალი).
 */
store.subscribe(() => {
  const state = store.getState().cv;
  const currentFormDataString = JSON.stringify(state.formData);

  // ფორმის მონაცემების შენახვა ცვლილებისას
  if (currentFormDataString !== previousFormDataString) {
    previousFormDataString = currentFormDataString;
    saveCvToStorage(state.formData);
  }

  // მიმდინარე ნაბიჯის შენახვა
  if (state.currentStep !== previousStep) {
    previousStep = state.currentStep;
    saveStepToStorage(state.currentStep);
  }

  // არჩეული ენის შენახვა
  if (state.currentLang !== previousLang) {
    previousLang = state.currentLang;
    saveLangToStorage(state.currentLang);
  }

  // არჩეული შაბლონის შენახვა
  if (state.selectedTemplate !== previousTemplate) {
    previousTemplate = state.selectedTemplate;
    saveTemplateToStorage(state.selectedTemplate);
  }
});

// TypeScript ტიპები RootState-ისთვის და AppDispatch-ისთვის
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ტიპიზებული Custom Hook-ები კომპონენტებში უსაფრთხო გამოყენებისთვის
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
