import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { ChevronLeft, Edit3, Printer, Plus, CheckCircle2, X } from 'lucide-react';
import { CVData } from '../types/cv';
import { CvPreview } from './CvPreview';
import { useAppSelector } from '../store/store';
import { getTranslation } from '../utils/i18n';

/**
 * SuccessPage კომპონენტის Props ინტერფეისი
 */
interface SuccessPageProps {
  data: CVData;         // დასრულებული CV-ის მონაცემები
  onEdit: () => void;   // ფორმაში დაბრუნება რედაქტირებისთვის
  onStartNew: () => void; // ახალი CV-ის დაწყება
  onBack: () => void;   // უკან დაბრუნება
}

/**
 * წარმატებით დასრულებული CV-ის გვერდი:
 * - ჩატვირთვისას უშვებს კონფეტის ეფექტს (Canvas Confetti)
 * - აჩვენებს Toast შეტყობინებას წარმატების შესახებ
 * - ბეჭდვის / PDF შენახვის ღილაკი (window.print())
 * - რედაქტირებისა და ახალი CV-ის შექმნის მოქმედებები
 * - რეზიუმეს სრული გადახედვა (CvPreview)
 */
export const SuccessPage: React.FC<SuccessPageProps> = ({
  data,
  onEdit,
  onStartNew,
  onBack,
}) => {
  const [showToast, setShowToast] = useState(true);
  const currentLang = useAppSelector((state) => state.cv.currentLang);

  // გვერდის ჩატვირთვისას კონფეტის ანიმაციის გაშვება
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

  // ბრაუზერის ბეჭდვის / PDF ექსპორტის ფანჯრის გამოძახება
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-[calc(100dvh-61px)] bg-[#F8F9FA] py-8 px-4 sm:px-6 flex flex-col items-center">
      {/* Toast შეტყობინება ეკრანის ზედა მარჯვენა კუთხეში */}
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

      {/* მოქმედებების პანელი (ბეჭდვა, რედაქტირება, ახლის დაწყება) */}
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
          {/* რედაქტირების ღილაკი */}
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium text-xs sm:text-sm rounded-md shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3] focus-visible:outline-offset-2"
          >
            <Edit3 className="w-4 h-4 text-gray-500" aria-hidden="true" />
            {getTranslation(currentLang, 'actions.edit')}
          </button>

          {/* ბეჭდვის / PDF შენახვის ღილაკი */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#5E40E3] hover:bg-[#5033D1] text-white font-medium text-xs sm:text-sm rounded-md shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3] focus-visible:outline-offset-2"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            {getTranslation(currentLang, 'actions.downloadPdf')}
          </button>

          {/* ახალი CV-ის დაწყების ღილაკი */}
          <button
            type="button"
            onClick={onStartNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-black text-white font-medium text-xs sm:text-sm rounded-md shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-gray-900 focus-visible:outline-offset-2"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            {getTranslation(currentLang, 'actions.newResume')}
          </button>
        </div>
      </div>

      {/* რეზიუმეს ვიზუალური გადახედვა */}
      <div className="w-full max-w-[800px] flex justify-center">
        <CvPreview data={data} />
      </div>
    </div>
  );
};
