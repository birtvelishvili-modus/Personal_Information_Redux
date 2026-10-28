import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import {
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
  resetToTemplateDefault,
  resetToBlank,
} from './store/cvSlice';
import { StepType, ExperienceItem, EducationItem, LanguageItem } from './types/cv';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { PersonalInfoStep } from './components/PersonalInfoStep';
import { ExperienceStep } from './components/ExperienceStep';
import { EducationStep } from './components/EducationStep';
import { SkillsLanguagesStep } from './components/SkillsLanguagesStep';
import { CvPreview } from './components/CvPreview';
import { SuccessPage } from './components/SuccessPage';
import { DemoTourModal } from './components/DemoTourModal';
import { TemplateSelectorModal } from './components/TemplateSelectorModal';
import { Eye, Edit3, AlertTriangle } from 'lucide-react';
import {
  clearCvStorage,
  saveCvToStorage,
  saveStepToStorage,
  saveLangToStorage,
  saveTemplateToStorage,
} from './utils/storage';
import { getTranslation } from './utils/i18n';

export default function App() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.cv.formData);
  const currentStep = useAppSelector((state) => state.cv.currentStep);
  const activeView = useAppSelector((state) => state.cv.activeView);
  const currentLang = useAppSelector((state) => state.cv.currentLang);
  const selectedTemplate = useAppSelector((state) => state.cv.selectedTemplate);
  const isDemoTourOpen = useAppSelector((state) => state.cv.isDemoTourOpen);
  const isCustomized = useAppSelector((state) => state.cv.isCustomized);

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  // Sync to localStorage
  useEffect(() => {
    saveCvToStorage(formData);
  }, [formData]);

  useEffect(() => {
    saveStepToStorage(currentStep);
  }, [currentStep]);

  useEffect(() => {
    saveLangToStorage(currentLang);
  }, [currentLang]);

  useEffect(() => {
    saveTemplateToStorage(selectedTemplate);
  }, [selectedTemplate]);

  // Support Escape key to close confirmation modal
  useEffect(() => {
    if (!showConfirmReset) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowConfirmReset(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showConfirmReset]);

  const hasExistingData = Boolean(
    formData.firstName ||
    formData.lastName ||
    formData.jobTitle ||
    formData.email ||
    formData.phone ||
    formData.summary ||
    (formData.experience && formData.experience.some((e) => e.position || e.company)) ||
    (formData.education && formData.education.some((e) => e.institution || e.degree)) ||
    (formData.skills && formData.skills.length > 0)
  );

  const handleClearAndStartNew = () => {
    clearCvStorage();
    dispatch(resetToBlank());
    setShowConfirmReset(false);
  };

  const handleStep1Next = () => {
    dispatch(setStep(2));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Next = () => {
    dispatch(setStep(3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep3Next = () => {
    dispatch(setStep(4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep4Submit = () => {
    dispatch(setView('completed'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepBack = () => {
    if (currentStep === 1) {
      dispatch(setView('landing'));
    } else if (currentStep === 2) {
      dispatch(setStep(1));
    } else if (currentStep === 3) {
      dispatch(setStep(2));
    } else if (currentStep === 4) {
      dispatch(setStep(3));
    }
  };

  return (
    <div
      className={`w-full flex flex-col bg-[#F8F9FA] text-[#1A1A1A] ${
        activeView === 'landing'
          ? 'h-[100dvh] max-h-[100dvh] overflow-hidden'
          : 'min-h-[100dvh]'
      }`}
    >
      {/* Top Header */}
      <Header
        view={activeView}
        currentStep={currentStep}
        currentLang={currentLang}
        selectedTemplate={selectedTemplate}
        isCustomized={isCustomized}
        onGoHome={() => dispatch(setView('landing'))}
        onOpenDemoTour={() => dispatch(setDemoTourOpen(true))}
        onOpenDemoCv={() => dispatch(setDemoTourOpen(true))}
        onApplyTemplate={() => dispatch(applyTemplateReady())}
        onResetSample={() => dispatch(resetToTemplateDefault())}
        onOpenTemplateSelector={() => setIsTemplateModalOpen(true)}
        onChangeLang={(lang) => dispatch(setLang(lang))}
        isAutoSaved={true}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 flex flex-col ${
          activeView === 'landing'
            ? 'h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)] overflow-hidden'
            : ''
        }`}
      >
        {activeView === 'landing' && (
          <LandingPage
            onStartResume={() => dispatch(setView('wizard'))}
            onOpenDemoCv={() => dispatch(setDemoTourOpen(true))}
            hasExistingData={hasExistingData}
            onClearAndStartNew={() => setShowConfirmReset(true)}
          />
        )}

        {activeView === 'wizard' && (
          <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100dvh-61px)]">
            {/* Mobile Tab Switcher */}
            <div
              role="tablist"
              aria-label={getTranslation(currentLang, 'header.selectTemplate')}
              className="lg:hidden no-print sticky top-[57px] z-30 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-around"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mobileTab === 'form'}
                onClick={() => setMobileTab('form')}
                className={`flex items-center gap-1.5 text-xs font-semibold py-2 px-4 rounded-full transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3] ${
                  mobileTab === 'form'
                    ? 'bg-[#5E40E3] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{getTranslation(currentLang, 'actions.form')}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mobileTab === 'preview'}
                onClick={() => setMobileTab('preview')}
                className={`flex items-center gap-1.5 text-xs font-semibold py-2 px-4 rounded-full transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3] ${
                  mobileTab === 'preview'
                    ? 'bg-[#5E40E3] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{getTranslation(currentLang, 'actions.preview')}</span>
              </button>
            </div>

            {/* Left Form Pane */}
            <div
              className={`w-full lg:w-[52%] xl:w-[50%] p-4 sm:p-8 lg:p-12 overflow-y-auto ${
                mobileTab === 'preview' ? 'hidden lg:block' : 'block'
              }`}
            >
              <div className="max-w-[580px] mx-auto">
                {currentStep === 1 && (
                  <PersonalInfoStep
                    formData={formData}
                    lang={currentLang}
                    requireRedberryEmail={selectedTemplate === 'redberry' && currentLang === 'ka'}
                    onChange={(updated) => dispatch(updatePersonalInfo(updated))}
                    onNext={handleStep1Next}
                    onBack={handleStepBack}
                  />
                )}

                {currentStep === 2 && (
                  <ExperienceStep
                    formData={formData}
                    lang={currentLang}
                    onUpdateItem={(index: number, field: keyof ExperienceItem, value: string) =>
                      dispatch(updateExperienceItem({ index, field, value }))
                    }
                    onAddItem={() => dispatch(addExperienceItem())}
                    onRemoveItem={(index: number) => dispatch(removeExperienceItem(index))}
                    onNext={handleStep2Next}
                    onBack={handleStepBack}
                  />
                )}

                {currentStep === 3 && (
                  <EducationStep
                    formData={formData}
                    lang={currentLang}
                    onUpdateItem={(index: number, field: keyof EducationItem, value: string) =>
                      dispatch(updateEducationItem({ index, field, value }))
                    }
                    onAddItem={() => dispatch(addEducationItem())}
                    onRemoveItem={(index: number) => dispatch(removeEducationItem(index))}
                    onNext={handleStep3Next}
                    onBack={handleStepBack}
                  />
                )}

                {currentStep === 4 && (
                  <SkillsLanguagesStep
                    formData={formData}
                    lang={currentLang}
                    onAddSkill={(skill: string) => dispatch(addSkill(skill))}
                    onRemoveSkill={(index: number) => dispatch(removeSkill(index))}
                    onUpdateLanguage={(index: number, field: keyof LanguageItem, value: string) =>
                      dispatch(updateLanguageItem({ index, field, value }))
                    }
                    onAddLanguage={() => dispatch(addLanguageItem())}
                    onRemoveLanguage={(index: number) => dispatch(removeLanguageItem(index))}
                    onSubmit={handleStep4Submit}
                    onBack={handleStepBack}
                  />
                )}
              </div>
            </div>

            {/* Right Live Preview Pane */}
            <div
              className={`w-full lg:w-[48%] xl:w-[50%] bg-[#F0F2F5] p-4 sm:p-8 lg:p-12 flex justify-center items-start overflow-y-auto border-l border-gray-200 ${
                mobileTab === 'form' ? 'hidden lg:flex' : 'flex'
              }`}
            >
              <div className="w-full max-w-[680px] sticky top-6">
                <CvPreview data={formData} templateId={selectedTemplate} lang={currentLang} />
              </div>
            </div>
          </div>
        )}

        {activeView === 'completed' && (
          <SuccessPage
            data={formData}
            onEdit={() => {
              dispatch(setView('wizard'));
              dispatch(setStep(4));
            }}
            onStartNew={() => setShowConfirmReset(true)}
            onBack={() => {
              dispatch(setView('wizard'));
              dispatch(setStep(4));
            }}
          />
        )}
      </main>

      {/* Demo Tour Fullscreen Modal */}
      <DemoTourModal
        isOpen={isDemoTourOpen}
        onClose={() => dispatch(setDemoTourOpen(false))}
        onApplyTemplateToUser={() => dispatch(applyTemplateReady())}
      />

      {/* Template Selector Modal */}
      <TemplateSelectorModal
        isOpen={isTemplateModalOpen}
        activeTemplate={selectedTemplate}
        lang={currentLang}
        onSelectTemplate={(tpl) => dispatch(setTemplate(tpl))}
        onClose={() => setIsTemplateModalOpen(false)}
      />

      {/* Confirmation Modal to Start Fresh CV */}
      {showConfirmReset && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
          aria-describedby="reset-dialog-desc"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 id="reset-dialog-title" className="text-lg font-bold text-gray-900">
              {getTranslation(currentLang, 'modal.resetTitle')}
            </h3>
            <p id="reset-dialog-desc" className="text-sm text-gray-600 leading-relaxed">
              {getTranslation(currentLang, 'modal.resetDesc')}
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-gray-500"
              >
                {getTranslation(currentLang, 'actions.cancel')}
              </button>
              <button
                type="button"
                onClick={handleClearAndStartNew}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-red-600"
              >
                {getTranslation(currentLang, 'actions.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
