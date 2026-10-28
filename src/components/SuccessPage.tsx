import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { ChevronLeft, Edit3, Printer, Plus, CheckCircle2, X } from 'lucide-react';
import { CVData } from '../types/cv';
import { CvPreview } from './CvPreview';
import { useAppSelector } from '../store/store';
import { getTranslation } from '../utils/i18n';

interface SuccessPageProps {
  data: CVData;
  onEdit: () => void;
  onStartNew: () => void;
  onBack: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({
  data,
  onEdit,
  onStartNew,
  onBack,
}) => {
  const [showToast, setShowToast] = useState(true);
  const currentLang = useAppSelector((state) => state.cv.currentLang);

  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F93B1D', '#5E40E3', '#0E7FE1', '#10B981'],
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-[calc(100dvh-61px)] bg-[#F8F9FA] py-8 px-4 sm:px-6 flex flex-col items-center">
      {/* Toast Notification Top Right */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="no-print fixed top-20 right-4 sm:right-8 z-50 bg-white border border-gray-200 shadow-xl rounded-xl p-4 flex items-start gap-3 max-w-sm animate-in slide-in-from-top-4"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex-1 pr-2">
            <h4 className="text-sm font-bold text-gray-900">
              {getTranslation(currentLang, 'toast.successTitle')}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              {getTranslation(currentLang, 'toast.successDesc')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            aria-label={getTranslation(currentLang, 'actions.close')}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-gray-500"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Action Controls Bar */}
      <div className="no-print w-full max-w-[800px] flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          type="button"
          onClick={onBack}
          aria-label={getTranslation(currentLang, 'actions.back')}
          title={getTranslation(currentLang, 'actions.back')}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3] focus-visible:outline-offset-2"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium text-xs sm:text-sm rounded-md shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3] focus-visible:outline-offset-2"
          >
            <Edit3 className="w-4 h-4 text-gray-500" aria-hidden="true" />
            {getTranslation(currentLang, 'actions.edit')}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#5E40E3] hover:bg-[#5033D1] text-white font-medium text-xs sm:text-sm rounded-md shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3] focus-visible:outline-offset-2"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            {getTranslation(currentLang, 'actions.print')}
          </button>

          <button
            type="button"
            onClick={onStartNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F93B1D] hover:bg-[#e03014] text-white font-medium text-xs sm:text-sm rounded-md shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F93B1D] focus-visible:outline-offset-2"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            {getTranslation(currentLang, 'actions.newCv')}
          </button>
        </div>
      </div>

      {/* Printable / Visible CV Document */}
      <div className="w-full max-w-[800px] flex justify-center pb-16">
        <CvPreview data={data} id="cv-printable-area" isPrint />
      </div>
    </div>
  );
};
