import React from 'react';
import { motion } from 'motion/react';
import { StarWatermark } from './StarWatermark';
import { useAppSelector } from '../store/store';
import { getTranslation } from '../utils/i18n';

/**
 * LandingPage კომპონენტის Props ინტერფეისი
 */
interface LandingPageProps {
  onStartResume: () => void;     // რეზიუმეს შევსების დაწყების ფუნქცია
  onOpenDemoCv?: () => void;     // დემო CV-ის გახსნის ფუნქცია
  hasExistingData: boolean;      // არსებობს თუ არა უკვე შენახული მონაცემები
  onClearAndStartNew: () => void;// მონაცემების გასუფთავებისა და თავიდან დაწყების ფუნქცია
}

/**
 * საწყისი (Landing) გვერდის კომპონენტი:
 * - შეიცავს თანამედროვე იისფერ გრადიენტს მარჯვენა მხარეს და გრეინის ტექსტურას
 * - ცენტრში განთავსებულია Redberry-ის 4-ქიმიანი წრიული ბეჭედი
 * - მთავარი მოქმედების ღილაკი "რეზიუმეს დამატება"
 * - დრაფტის არსებობის შემთხვევაში გასუფთავების ღილაკი
 */
export const LandingPage: React.FC<LandingPageProps> = ({
  onStartResume,
  hasExistingData,
  onClearAndStartNew,
}) => {
  const currentLang = useAppSelector((state) => state.cv.currentLang);

  return (
    <div className="relative flex-1 w-full h-full overflow-hidden flex flex-col justify-center items-center bg-[#FAFAFA] px-4 py-4 select-none">
      {/* რბილი იასამნისფერი/იისფერი გრადიენტი მარჯვენა მხარეს */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* მთავარი იისფერი ნათება ზედა მარჯვენა კუთხეში */}
        <div className="absolute -top-[12%] -right-[12%] sm:-right-[2%] w-[500px] sm:w-[860px] h-[500px] sm:h-[860px] rounded-full bg-gradient-to-bl from-[#C084FC]/70 via-[#9333EA]/45 to-transparent blur-[70px] sm:blur-[115px]" />

        {/* მეორადი ლავანდისფერი აქცენტი მარჯვენა კიდეზე */}
        <div className="absolute top-[25%] -right-[8%] w-[380px] sm:w-[650px] h-[380px] sm:h-[650px] rounded-full bg-gradient-to-l from-[#C084FC]/55 via-[#DDD6FE]/40 to-transparent blur-[60px] sm:blur-[95px]" />
      </div>

      {/* გრაფიკული ხმაურის (Noise/Grain) ტექსტურის ფენა */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      {/* წრიული ბეჭედი (Star Watermark) ცენტრში, უშუალოდ ღილაკის უკან */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <StarWatermark className="w-[270px] h-[270px] sm:w-[370px] sm:h-[370px] text-[#1A1A1A] opacity-[0.22]" />
      </div>

      {/* მთავარი ცენტრალური ზონა */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center max-w-lg w-full py-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-5 sm:space-y-6 w-full flex flex-col items-center"
        >
          {/* მთავარი მოქმედების ღილაკი: რეზიუმეს დამატება */}
          <div>
            <button
              type="button"
              onClick={onStartResume}
              className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-3.5 text-base sm:text-lg font-medium text-white bg-[#1A1A1A] hover:bg-[#2A2A2A] active:scale-[0.98] rounded-md transition-all shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1A1A1A] focus-visible:outline-offset-2"
            >
              {getTranslation(currentLang, 'app.addResume')}
            </button>
          </div>

          {/* შენახული მონაცემების მითითება და გასუფთავების ღილაკი */}
          {hasExistingData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 pt-1 text-xs text-gray-500 flex-wrap"
            >
              <span>{getTranslation(currentLang, 'app.draftSaved')}</span>
              <span aria-hidden="true">•</span>
              <button
                type="button"
                onClick={onClearAndStartNew}
                className="text-red-600 hover:text-red-800 underline cursor-pointer focus-visible:outline-1 focus-visible:outline-red-600 rounded px-1"
              >
                {getTranslation(currentLang, 'app.clearAndNew')}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
