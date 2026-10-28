import React from 'react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { CVData, EducationItem, Lang } from '../types/cv';
import { getTranslation } from '../utils/i18n';

/**
 * EducationStep კომპონენტის Props ინტერფეისი
 */
interface EducationStepProps {
  formData: CVData;       // ფორმის მონაცემები
  lang: Lang;             // მიმდინარე ენა
  onUpdateItem: (index: number, field: keyof EducationItem, value: string) => void; // განათლების ველის განახლება
  onAddItem: () => void;  // ახალი განათლების დამატება
  onRemoveItem: (index: number) => void; // განათლების წაშლა
  onNext: () => void;     // შემდეგ ეტაპზე (უნარები და ენები) გადასვლა
  onBack: () => void;     // წინა ეტაპზე (გამოცდილება) დაბრუნება
}

/**
 * ხარისხების (Degree) ჩამოსაშლელი სიის გასაღებები
 */
const DEGREE_KEYS = [
  'degrees.bachelor',
  'degrees.master',
  'degrees.doctorate',
  'degrees.highSchool',
  'degrees.associate',
  'degrees.student',
  'degrees.other',
];

/**
 * ეტაპი 3: განათლება (Education Step)
 * - სასწავლებლის, ხარისხის, დამთავრების თარიღისა და აღწერის მითითება
 * - განათლების მრავალი ჩანაწერის დამატების და წაშლის შესაძლებლობა
 */
export const EducationStep: React.FC<EducationStepProps> = ({
  formData,
  lang,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
  onNext,
  onBack,
}) => {
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
            {getTranslation(lang, 'steps.education.title')}
          </h2>
        </div>
        <span className="text-sm font-medium text-gray-500">3/4</span>
      </div>

      {/* Education list */}
      <div className="space-y-8">
        {(formData.education || []).map((edu, index) => {
          return (
            <div
              key={edu.id || index}
              className="space-y-5 p-5 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-2xs relative"
            >
              {formData.education.length > 1 && (
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {getTranslation(lang, 'steps.education.itemTitle')} #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(index)}
                    aria-label={`${getTranslation(lang, 'steps.education.remove')} #${index + 1}`}
                    className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 px-2.5 py-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    {getTranslation(lang, 'steps.education.remove')}
                  </button>
                </div>
              )}

              {/* Institution */}
              <div>
                <label
                  htmlFor={`edu-inst-${index}`}
                  className="block text-sm font-semibold text-gray-900 mb-1.5"
                >
                  {getTranslation(lang, 'steps.education.institution')}
                </label>
                <input
                  id={`edu-inst-${index}`}
                  type="text"
                  value={edu.institution}
                  placeholder={getTranslation(lang, 'steps.education.institutionPlaceholder')}
                  onChange={(e) => onUpdateItem(index, 'institution', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-[#5E40E3]"
                />
              </div>

              {/* Degree and Graduation Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`edu-degree-${index}`}
                    className="block text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    {getTranslation(lang, 'steps.education.degree')}
                  </label>
                  <select
                    id={`edu-degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => onUpdateItem(index, 'degree', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 bg-white focus:outline-none focus:border-gray-500 cursor-pointer"
                  >
                    <option value="">{getTranslation(lang, 'steps.education.selectDegree')}</option>
                    {DEGREE_KEYS.map((degKey) => (
                      <option key={degKey} value={getTranslation(lang, degKey)}>
                        {getTranslation(lang, degKey)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`edu-due-${index}`}
                    className="block text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    {getTranslation(lang, 'steps.education.endDate')}
                  </label>
                  <input
                    id={`edu-due-${index}`}
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => onUpdateItem(index, 'endDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 focus:outline-none focus:border-gray-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor={`edu-desc-${index}`}
                  className="block text-sm font-semibold text-gray-900 mb-1.5"
                >
                  {getTranslation(lang, 'steps.education.description')}
                </label>
                <textarea
                  id={`edu-desc-${index}`}
                  rows={3}
                  value={edu.description || ''}
                  placeholder={getTranslation(lang, 'steps.education.descriptionPlaceholder')}
                  onChange={(e) => onUpdateItem(index, 'description', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 transition-colors resize-y min-h-[80px]"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Add more education button */}
      <div>
        <button
          type="button"
          onClick={onAddItem}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0E7FE1] hover:bg-[#0B6EC4] text-white text-xs sm:text-sm font-medium rounded-md shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0E7FE1]"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          {getTranslation(lang, 'steps.education.addMore')}
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
