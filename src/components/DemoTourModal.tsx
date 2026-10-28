import React, { useEffect } from 'react';
import { X, CheckCircle, ArrowRight, Copy } from 'lucide-react';
import { CvPreview } from './CvPreview';
import { useAppSelector } from '../store/store';
import { TEMPLATES } from './templates/templatesRegistry';
import { getTranslation } from '../utils/i18n';

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplateToUser?: () => void;
}

export const DemoTourModal: React.FC<DemoTourModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplateToUser,
}) => {
  const currentLang = useAppSelector((state) => state.cv.currentLang);
  const selectedTemplate = useAppSelector((state) => state.cv.selectedTemplate);

  const templateDef = TEMPLATES[selectedTemplate] || TEMPLATES.redberry;
  const sampleData = templateDef.ready[currentLang] || templateDef.ready.en;

  // Support Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${getTranslation(currentLang, 'modal.demoTourTitle')} - ${getTranslation(currentLang, templateDef.nameKey)}`}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex flex-col justify-between"
    >
      {/* Top Black Header */}
      <div className="sticky top-0 z-50 bg-[#1A1A1A] text-white px-4 sm:px-8 py-3 flex items-center justify-between border-b border-white/10 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          <span className="font-bold text-sm tracking-wide">
            {getTranslation(currentLang, 'modal.demoTourTitle')}
          </span>
          <span className="text-xs text-gray-400 hidden sm:inline">
            {getTranslation(currentLang, 'modal.demoTourSubtitle')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {onApplyTemplateToUser && (
            <button
              type="button"
              onClick={onApplyTemplateToUser}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#5E40E3] hover:bg-[#5033D1] text-white text-xs font-medium rounded-full transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{getTranslation(currentLang, 'modal.useTemplate')}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label={getTranslation(currentLang, 'modal.returnToCv')}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white hover:bg-gray-100 text-gray-900 text-xs sm:text-sm font-semibold rounded-full shadow transition-transform active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3]"
          >
            <X className="w-4 h-4 text-gray-700" aria-hidden="true" />
            <span>{getTranslation(currentLang, 'modal.returnToCv')}</span>
          </button>
        </div>
      </div>

      {/* Sub Bar with Quick Exit Link */}
      <div className="bg-[#F8F9FA] border-b border-[#E0E0E0] px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-1.5 text-gray-700">
          <CheckCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          <span className="font-medium">
            {getTranslation(currentLang, templateDef.nameKey)}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1 text-[#5E40E3] hover:text-[#4B2FBD] font-semibold cursor-pointer group focus-visible:outline-1 focus-visible:outline-[#5E40E3] rounded px-1"
        >
          <span>{getTranslation(currentLang, 'modal.returnToCv')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </button>
      </div>

      {/* Center CV Preview Sheet */}
      <div className="flex-1 flex justify-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-[800px] shadow-2xl rounded-sm overflow-hidden bg-white">
          <CvPreview data={sampleData} templateId={selectedTemplate} lang={currentLang} />
        </div>
      </div>

      {/* Bottom Floating Info Pill */}
      <div className="sticky bottom-4 z-40 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto bg-[#1A1A1A]/95 text-white backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl border border-white/10 text-xs sm:text-sm flex items-center gap-3 max-w-xl text-center">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 hidden sm:inline" aria-hidden="true" />
          <span className="text-gray-300">
            {getTranslation(currentLang, 'modal.demoTourNotice')}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-emerald-400 font-semibold underline cursor-pointer ml-auto shrink-0 flex items-center gap-1 focus-visible:outline-1 focus-visible:outline-white"
          >
            <span>{getTranslation(currentLang, 'actions.close')}</span>
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
