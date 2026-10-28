import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Lang, TemplateId } from '../types/cv';
import { TEMPLATE_LIST } from './templates/templatesRegistry';
import { getTranslation } from '../utils/i18n';

/**
 * TemplateSelectorModal კომპონენტის Props ინტერფეისი
 */
interface TemplateSelectorModalProps {
  isOpen: boolean;                                     // მოდალის გახსნის სტატუსი
  activeTemplate: TemplateId;                          // ამჟამად არჩეული შაბლონი
  lang: Lang;                                          // მიმდინარე ენა
  onSelectTemplate: (templateId: TemplateId) => void;  // შაბლონის არჩევის მოვლენა
  onClose: () => void;                                 // მოდალის დახურვა
}

/**
 * შაბლონების ასარჩევი მოდალი (Template Selector Modal):
 * - აჩვენებს ხელმისაწვდომი შაბლონების ბარათებს (Redberry, Modern, Two Column, Europass, Creative)
 * - საშუალებას აძლევს მომხმარებელს აირჩიოს სასურველი დიზაინი
 */
export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({
  isOpen,
  activeTemplate,
  lang,
  onSelectTemplate,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={getTranslation(lang, 'header.selectTemplate')}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {getTranslation(lang, 'header.selectTemplate')}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Choose your preferred layout. Your entered data will be retained.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label={getTranslation(lang, 'actions.close')}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {TEMPLATE_LIST.map((tpl) => {
            const isSelected = tpl.id === activeTemplate;
            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelectTemplate(tpl.id);
                  onClose();
                }}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left ${
                  isSelected
                    ? 'border-[#5E40E3] bg-indigo-50/20 ring-2 ring-[#5E40E3]/20 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      {getTranslation(lang, tpl.categoryKey)}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#5E40E3] text-white flex items-center justify-center text-xs">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-base text-gray-900 flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: tpl.accentColor }}
                      aria-hidden="true"
                    />
                    {getTranslation(lang, tpl.nameKey)}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                    {getTranslation(lang, tpl.descriptionKey)}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-semibold">
                  <span
                    className={
                      isSelected ? 'text-[#5E40E3]' : 'text-gray-500'
                    }
                  >
                    {isSelected ? 'Active Template' : 'Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
