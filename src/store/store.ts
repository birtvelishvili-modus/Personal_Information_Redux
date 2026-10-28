import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cvReducer from './cvSlice';
import {
  saveCvToStorage,
  saveStepToStorage,
  saveLangToStorage,
  saveTemplateToStorage,
} from '../utils/storage';

export const store = configureStore({
  reducer: {
    cv: cvReducer,
  },
});

let previousFormDataString = '';
let previousStep: number = 1;
let previousLang: string = '';
let previousTemplate: string = '';

store.subscribe(() => {
  const state = store.getState().cv;
  const currentFormDataString = JSON.stringify(state.formData);

  if (currentFormDataString !== previousFormDataString) {
    previousFormDataString = currentFormDataString;
    saveCvToStorage(state.formData);
  }

  if (state.currentStep !== previousStep) {
    previousStep = state.currentStep;
    saveStepToStorage(state.currentStep);
  }

  if (state.currentLang !== previousLang) {
    previousLang = state.currentLang;
    saveLangToStorage(state.currentLang);
  }

  if (state.selectedTemplate !== previousTemplate) {
    previousTemplate = state.selectedTemplate;
    saveTemplateToStorage(state.selectedTemplate);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
