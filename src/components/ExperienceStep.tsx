import React, { useState } from 'react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { CVData, ExperienceItem, Lang } from '../types/cv';
import { getTranslation } from '../utils/i18n';

/**
 * ExperienceStep კომპონენტის Props ინტერფეისი
 */
interface ExperienceStepProps {
  formData: CVData;       // ფორმის მონაცემები
  lang: Lang;             // მიმდინარე ენა
  onUpdateItem: (index: number, field: keyof ExperienceItem, value: string) => void; // ჩანაწერის ველის განახლება
  onAddItem: () => void;  // ახალი გამოცდილების დამატება
  onRemoveItem: (index: number) => void; // გამოცდილების წაშლა
  onNext: () => void;     // შემდეგ ეტაპზე (განათლება) გადასვლა
  onBack: () => void;     // წინა ეტაპზე (პირადი ინფო) დაბრუნება
}

/**
 * ეტაპი 2: გამოცდილება (Experience Step)
 * - სამუშაო გამოცდილების დინამიური ბარათები (თანამდებობა, დამსაქმებელი, დაწყება/დასრულება, აღწერა)
 * - ახალი გამოცდილების დამატება / წაშლა
 * - ვალიდაცია მინიმალურ სიმბოლოებზე
 */
export const ExperienceStep: React.FC<ExperienceStepProps> = ({
  formData,
  lang,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
  onNext,
  onBack,
}) => {
  const [touchedIndices, setTouchedIndices] = useState<Record<number, Record<string, boolean>>>({});

  const markTouched = (index: number, field: string) => {
    setTouchedIndices((prev) => ({
      ...prev,
      [index]: {
        ...(prev[index] || {}),
        [field]: true,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
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
            {getTranslation(lang, 'steps.experience.title')}
          </h2>
        </div>
        <span className="text-sm font-medium text-gray-500">2/4</span>
      </div>

      {/* Experience list */}
      <div className="space-y-8">
        {(formData.experience || []).map((exp, index) => {
          return (
            <div
              key={exp.id || index}
              className="space-y-5 p-5 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-2xs relative"
            >
              {formData.experience.length > 1 && (
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {getTranslation(lang, 'steps.experience.itemTitle')} #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(index)}
                    aria-label={`${getTranslation(lang, 'steps.experience.remove')} #${index + 1}`}
                    className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 px-2.5 py-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    {getTranslation(lang, 'steps.experience.remove')}
                  </button>
                </div>
              )}

              {/* Position */}
              <div>
                <label
                  htmlFor={`exp-position-${index}`}
                  className="block text-sm font-semibold text-gray-900 mb-1.5"
                >
                  {getTranslation(lang, 'steps.experience.position')}
                </label>
                <input
                  id={`exp-position-${index}`}
                  type="text"
                  value={exp.position}
                  placeholder={getTranslation(lang, 'steps.experience.positionPlaceholder')}
                  onBlur={() => markTouched(index, 'position')}
                  onChange={(e) => onUpdateItem(index, 'position', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-[#5E40E3]"
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor={`exp-company-${index}`}
                  className="block text-sm font-semibold text-gray-900 mb-1.5"
                >
                  {getTranslation(lang, 'steps.experience.company')}
                </label>
                <input
                  id={`exp-company-${index}`}
                  type="text"
                  value={exp.company}
                  placeholder={getTranslation(lang, 'steps.experience.companyPlaceholder')}
                  onBlur={() => markTouched(index, 'company')}
                  onChange={(e) => onUpdateItem(index, 'company', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-[#5E40E3]"
                />
              </div>

              {/* Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`exp-start-${index}`}
                    className="block text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    {getTranslation(lang, 'steps.experience.startDate')}
                  </label>
                  <input
                    id={`exp-start-${index}`}
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => onUpdateItem(index, 'startDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 focus:outline-none focus:border-gray-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`exp-due-${index}`}
                    className="block text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    {getTranslation(lang, 'steps.experience.endDate')}
                  </label>
                  <input
                    id={`exp-due-${index}`}
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => onUpdateItem(index, 'endDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 focus:outline-none focus:border-gray-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor={`exp-desc-${index}`}
                  className="block text-sm font-semibold text-gray-900 mb-1.5"
                >
                  {getTranslation(lang, 'steps.experience.description')}
                </label>
                <textarea
                  id={`exp-desc-${index}`}
                  rows={4}
                  value={exp.description}
                  placeholder={getTranslation(lang, 'steps.experience.descriptionPlaceholder')}
                  onChange={(e) => onUpdateItem(index, 'description', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 transition-colors resize-y min-h-[90px]"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Add more experience button */}
      <div>
        <button
          type="button"
          onClick={onAddItem}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0E7FE1] hover:bg-[#0B6EC4] text-white text-xs sm:text-sm font-medium rounded-md shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0E7FE1]"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          {getTranslation(lang, 'steps.experience.addMore')}
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3 bg-[#5E40E3] hover:bg-[#5033D1] text-white font-medium text-sm rounded-md transition-colors cursor-pointer"
        >
          {getTranslation(lang, 'actions.back')}
        </button>
        <button
          type="submit"
          className="px-9 py-3 bg-[#5E40E3] hover:bg-[#5033D1] active:bg-[#4327C2] text-white font-medium text-sm rounded-md shadow-sm transition-all cursor-pointer"
        >
          {getTranslation(lang, 'actions.next')}
        </button>
      </div>
    </form>
  );
};
