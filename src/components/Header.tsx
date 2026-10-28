import React from 'react';
import { Home, Play, CheckCircle2, FileText, RotateCcw } from 'lucide-react';
import { RedberryLogo } from './RedberryLogo';
import { AppView, StepType, Lang, TemplateId } from '../types/cv';
import { getTranslation } from '../utils/i18n';

/**
 * Header კომპონენტის Props ინტერფეისი
 */
interface HeaderProps {
  view: AppView;                      // მიმდინარე ხედი ('landing', 'wizard', 'completed')
  currentStep: StepType;              // ფორმის მიმდინარე ნაბიჯი
  currentLang: Lang;                  // არჩეული ენა
  selectedTemplate: TemplateId;       // არჩეული შაბლონი
  isCustomized?: boolean;             // მომხმარებლის მიერ მონაცემების მოდიფიცირების სტატუსი
  onGoHome: () => void;               // საწყის გვერდზე გადასვლა
  onOpenDemoTour: () => void;         // დემო ტურის გახსნა
  onOpenDemoCv: () => void;           // დემო რეზიუმეს გახსნა
  onApplyTemplate?: () => void;       // შაბლონის მონაცემების ჩატვირთვა
  onResetSample?: () => void;         // საწყის მონაცემებზე დაბრუნება
  onOpenTemplateSelector?: () => void;// შაბლონის ასარჩევი მოდალის გახსნა
  onChangeLang: (lang: Lang) => void; // ენის შეცვლის ფუნქცია
  isAutoSaved?: boolean;              // ავტო-შენახვის ინდიკატორი
}

/**
 * ჰედერის კომპონენტი:
 * - Redberry ლოგო
 * - შენახვის სტატუსის ბეიჯი (Auto-saved)
 * - ენის გადამრთველი (EN / KA / RU)
 * - ნავიგაციის ღილაკები (Home, Demo Tour, Demo CV, Template და ა.შ.)
 */
export const Header: React.FC<HeaderProps> = ({
  view,
  currentLang,
  isCustomized = false,
  onGoHome,
  onOpenDemoTour,
  onOpenDemoCv,
  onApplyTemplate,
  onResetSample,
  onChangeLang,
  isAutoSaved = true,
}) => {
  return (
    <header className="no-print w-full bg-white border-b border-[#E0E0E0] px-3 sm:px-6 md:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 shrink-0 sticky top-0 z-40">
      {/* მარცხენა მხარე: ბრენდის ლოგო და სტატუსის ბეიჯები */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
        <RedberryLogo onClick={onGoHome} />

        {/* Wizard ხედში ავტო-შენახვის ინდიკატორი */}
        {view === 'wizard' && isAutoSaved && (
          <span
            role="status"
            aria-live="polite"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-[#E8F8EE] text-[#0E9F6E] rounded-md border border-[#D1F3DF] whitespace-nowrap"
          >
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            {getTranslation(currentLang, 'header.autoSaved')}
          </span>
        )}

        {/* დასრულებული CV-ის ეკრანზე მზაობის ბეიჯი */}
        {view === 'completed' && (
          <div className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#E8F8EE] text-[#0E9F6E] rounded-md border border-[#D1F3DF] whitespace-nowrap">
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
            {getTranslation(currentLang, 'header.readyCv')}
          </div>
        )}
      </div>

      {/* მარჯვენა მხარე: მართვის ელემენტები */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* ენის გადამრთველი ტოგლი (EN, KA, RU) */}
        <div className="inline-flex items-center bg-gray-100 p-0.5 rounded-full border border-gray-200 text-xs font-semibold">
          {(['en', 'ka', 'ru'] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => onChangeLang(l)}
              className={`px-2 py-0.5 rounded-full uppercase transition-all cursor-pointer ${
                currentLang === l
                  ? 'bg-white text-gray-900 shadow-xs font-bold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              aria-label={`Switch language to ${l.toUpperCase()}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* მთავარ გვერდზე დაბრუნების ღილაკი (Home) */}
        {view !== 'landing' && (
          <button
            type="button"
            onClick={onGoHome}
            aria-label={getTranslation(currentLang, 'header.backToHome')}
            title={getTranslation(currentLang, 'header.backToHome')}
            className="p-1.5 sm:p-2 min-w-[34px] min-h-[34px] sm:min-w-[38px] sm:min-h-[38px] flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3]"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
          </button>
        )}

        {/* Wizard ხედში შაბლონის მონაცემების ჩატვირთვის ღილაკი */}
        {view === 'wizard' && onApplyTemplate && (
          <div className="relative group flex items-center">
            <button
              type="button"
              onClick={onApplyTemplate}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:text-indigo-700 bg-gray-50 hover:bg-indigo-50 border border-gray-300 hover:border-indigo-300 rounded-full transition-colors cursor-pointer shadow-2xs whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#5E40E3]"
              aria-label={getTranslation(currentLang, 'header.templateBtn')}
            >
              <FileText className="w-3.5 h-3.5 text-gray-500 group-hover:text-indigo-600 shrink-0" aria-hidden="true" />
              <span>{getTranslation(currentLang, 'header.templateBtn')}</span>
            </button>

            {/* ახსნა-განმარტება ჰოვერზე (Tooltip) */}
            <div
              role="tooltip"
              className="pointer-events-none absolute right-0 top-full mt-2 hidden group-hover:flex group-focus-within:flex flex-col items-end z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="w-2.5 h-2.5 bg-[#1A1A1A] rotate-45 -mb-1 mr-4 shadow-xs" />
              <div className="bg-[#1A1A1A] text-white text-[11px] sm:text-xs rounded-md px-3 py-1.5 shadow-xl whitespace-nowrap font-normal">
                {getTranslation(currentLang, 'header.templateTooltip')}
              </div>
            </div>
          </div>
        )}

        {/* საწყის ნიმუშზე დაბრუნების ღილაკი (თუ მონაცემები შეიცვალა) */}
        {view === 'wizard' && isCustomized && onResetSample && (
          <div className="relative group flex items-center">
            <button
              type="button"
              onClick={onResetSample}
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-full transition-colors cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
              title={getTranslation(currentLang, 'header.resetSampleTooltip')}
            >
              <RotateCcw className="w-3 h-3 text-amber-600" aria-hidden="true" />
              <span className="hidden min-[420px]:inline">{getTranslation(currentLang, 'header.resetSampleBtn')}</span>
            </button>
          </div>
        )}

        {/* საწყის გვერდზე დემო CV-ის გახსნის ღილაკი */}
        {view === 'landing' && (
          <button
            type="button"
            onClick={onOpenDemoCv}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-full transition-colors cursor-pointer shadow-2xs whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-emerald-600"
          >
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span className="hidden min-[370px]:inline">{getTranslation(currentLang, 'header.demoCv')}</span>
          </button>
        )}

        {/* დემო ტურის (Demo Tour) გაშვების ღილაკი */}
        <button
          type="button"
          onClick={onOpenDemoTour}
          className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#5E40E3] hover:bg-[#5033D1] active:bg-[#4327C2] rounded-full transition-colors shadow-2xs cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#5E40E3]"
        >
          <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current shrink-0" aria-hidden="true" />
          <span className="hidden min-[370px]:inline">{getTranslation(currentLang, 'header.demoTour')}</span>
        </button>
      </div>
    </header>
  );
};
