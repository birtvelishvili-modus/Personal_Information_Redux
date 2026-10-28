import React, { useState } from 'react';
import { ChevronLeft, Plus, X, Trash2 } from 'lucide-react';
import { CVData, LanguageItem, Lang } from '../types/cv';
import { getTranslation } from '../utils/i18n';

interface SkillsLanguagesStepProps {
  formData: CVData;
  lang: Lang;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (index: number) => void;
  onUpdateLanguage: (index: number, field: keyof LanguageItem, value: string) => void;
  onAddLanguage: () => void;
  onRemoveLanguage: (index: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const CEFR_LEVELS = [
  'levels.native',
  'levels.c2',
  'levels.c1',
  'levels.b2',
  'levels.b1',
  'levels.a2',
  'levels.a1',
];

export const SkillsLanguagesStep: React.FC<SkillsLanguagesStepProps> = ({
  formData,
  lang,
  onAddSkill,
  onRemoveSkill,
  onUpdateLanguage,
  onAddLanguage,
  onRemoveLanguage,
  onSubmit,
  onBack,
}) => {
  const [skillInput, setSkillInput] = useState('');

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (skillInput.trim()) {
        onAddSkill(skillInput);
        setSkillInput('');
      }
    }
  };

  const handleAddSkillClick = () => {
    if (skillInput.trim()) {
      onAddSkill(skillInput);
      setSkillInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full space-y-7 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3] focus-visible:outline-offset-2"
            title={getTranslation(lang, 'actions.back')}
            aria-label={getTranslation(lang, 'actions.back')}
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {getTranslation(lang, 'steps.skills.title')}
          </h2>
        </div>
        <span className="text-sm font-medium text-gray-500">4/4</span>
      </div>

      {/* Skills Section */}
      <div className="space-y-4 p-5 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-2xs">
        <label htmlFor="skill-input" className="block text-sm font-semibold text-gray-900">
          {getTranslation(lang, 'steps.skills.skillsSection')}
        </label>

        <div className="flex gap-2">
          <input
            id="skill-input"
            type="text"
            value={skillInput}
            placeholder={getTranslation(lang, 'steps.skills.skillsPlaceholder')}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            className="flex-1 px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-[#5E40E3]"
          />
          <button
            type="button"
            onClick={handleAddSkillClick}
            className="px-5 py-2.5 bg-[#0E7FE1] hover:bg-[#0B6EC4] text-white text-xs sm:text-sm font-medium rounded-md shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0E7FE1]"
          >
            {getTranslation(lang, 'steps.skills.addSkillBtn')}
          </button>
        </div>

        {/* Skills Tag Cloud */}
        {formData.skills && formData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full border border-gray-300"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => onRemoveSkill(index)}
                  className="p-0.5 text-gray-400 hover:text-red-500 rounded-full cursor-pointer"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-3 h-3" aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Languages Section */}
      <div className="space-y-5 p-5 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-2xs">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">
            {getTranslation(lang, 'steps.skills.languagesSection')}
          </h3>
          <button
            type="button"
            onClick={onAddLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0E7FE1] hover:bg-[#0B6EC4] text-white text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            {getTranslation(lang, 'steps.skills.addLanguageBtn')}
          </button>
        </div>

        {formData.languages && formData.languages.length > 0 ? (
          <div className="space-y-3">
            {formData.languages.map((l, index) => (
              <div key={l.id || index} className="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 p-3 rounded-md border border-gray-200">
                <input
                  type="text"
                  value={l.name}
                  placeholder={getTranslation(lang, 'steps.skills.languageNamePlaceholder')}
                  onChange={(e) => onUpdateLanguage(index, 'name', e.target.value)}
                  className="flex-1 w-full sm:w-auto px-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                />

                <select
                  value={l.level}
                  onChange={(e) => onUpdateLanguage(index, 'level', e.target.value)}
                  className="flex-1 w-full sm:w-auto px-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 cursor-pointer"
                >
                  <option value="">{getTranslation(lang, 'steps.skills.selectLevel')}</option>
                  {CEFR_LEVELS.map((lvlKey) => (
                    <option key={lvlKey} value={getTranslation(lang, lvlKey)}>
                      {getTranslation(lang, lvlKey)}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => onRemoveLanguage(index)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-md hover:bg-gray-200 transition-colors cursor-pointer shrink-0"
                  title={getTranslation(lang, 'steps.skills.removeLanguage')}
                  aria-label={getTranslation(lang, 'steps.skills.removeLanguage')}
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 italic">
            {getTranslation(lang, 'steps.skills.addLanguageBtn')}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3 bg-[#5E40E3] hover:bg-[#5033D1] text-white font-medium text-sm rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3] focus-visible:outline-offset-2"
        >
          {getTranslation(lang, 'actions.back')}
        </button>
        <button
          type="submit"
          className="px-9 py-3 bg-[#5E40E3] hover:bg-[#5033D1] active:bg-[#4327C2] text-white font-medium text-sm rounded-md shadow-sm transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3] focus-visible:outline-offset-2"
        >
          {getTranslation(lang, 'actions.finish')}
        </button>
      </div>
    </form>
  );
};
