import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { CVData, Lang } from '../../../types/cv';
import { StarWatermark } from '../../StarWatermark';
import { getTranslation } from '../../../utils/i18n';

/**
 * RedberryTemplate კომპონენტის Props ინტერფეისი
 */
interface RedberryTemplateProps {
  data: CVData;         // CV მონაცემები
  lang: Lang;           // მიმდინარე ენა
  id?: string;          // DOM ID
  className?: string;   // დამატებითი სტილის კლასები
  isPrint?: boolean;    // ბეჭდვის რეჟიმის ფლაგი
}

/**
 * Redberry-ის ოფიციალური CV შაბლონი (Redberry Classic Template):
 * - მკვეთრი წითელი (#F93B1D) სახელისა და სათაურების აქცენტები
 * - მარჯვენა ზედა კუთხეში მომრგვალებული ფოტოსურათი
 * - საკონტაქტო ინფორმაციის აიქონები (მეილი, ტელეფონი, ლოკაცია)
 * - მკაფიო გამყოფი ხაზები სექციებს შორის
 * - ქვედა მარცხენა კუთხეში Redberry-ის საფირმო ვარსკვლავის Watermark
 */
export const RedberryTemplate: React.FC<RedberryTemplateProps> = ({
  data,
  lang,
  id = 'cv-preview',
  className = '',
  isPrint = false,
}) => {
  const hasAbout = Boolean(data.summary && data.summary.trim().length > 0);
  const validExperiences = (data.experience || []).filter(
    (e) => e.position || e.company || e.startDate || e.endDate || e.description
  );
  const validEducations = (data.education || []).filter(
    (e) => e.institution || e.degree || e.endDate || e.description
  );
  const validSkills = (data.skills || []).filter((s) => s.trim().length > 0);
  const validLanguages = (data.languages || []).filter((l) => l.name.trim().length > 0);

  return (
    <div
      id={id}
      className={`bg-white text-[#1A1A1A] relative shadow-md rounded-none w-full max-w-[800px] min-h-[960px] p-8 sm:p-12 md:p-14 flex flex-col justify-between ${
        isPrint ? 'print:shadow-none print:m-0 print:p-8 print:w-full print:max-w-none' : ''
      } ${className}`}
      style={{ boxSizing: 'border-box', backgroundColor: '#FFFFFF' }}
    >
      <div>
        {/* Top Header: Name, Contact & Photo */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-6 pb-6">
          <div className="flex-1 pr-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F93B1D] tracking-tight leading-tight">
              {(data.firstName || data.lastName) ? (
                `${data.firstName} ${data.lastName}`.trim()
              ) : (
                <span className="text-gray-400 font-normal">
                  {getTranslation(lang, 'steps.personal.firstNamePlaceholder')} {getTranslation(lang, 'steps.personal.lastNamePlaceholder')}
                </span>
              )}
            </h1>

            {data.jobTitle && (
              <p className="text-base font-semibold text-gray-700 mt-1">
                {data.jobTitle}
              </p>
            )}

            {/* Contact Details */}
            <div className="mt-4 space-y-1.5">
              {data.email && (
                <div className="flex items-center gap-2.5 text-sm text-[#1A1A1A]">
                  <Mail className="w-4 h-4 text-gray-500 shrink-0" aria-hidden="true" />
                  <span>{data.email}</span>
                </div>
              )}

              {data.phone && (
                <div className="flex items-center gap-2.5 text-sm text-[#1A1A1A]">
                  <Phone className="w-4 h-4 text-gray-500 shrink-0" aria-hidden="true" />
                  <span>{data.phone}</span>
                </div>
              )}

              {data.location && (
                <div className="flex items-center gap-2.5 text-sm text-[#1A1A1A]">
                  <MapPin className="w-4 h-4 text-gray-500 shrink-0" aria-hidden="true" />
                  <span>{data.location}</span>
                </div>
              )}

              {data.website && (
                <div className="flex items-center gap-2.5 text-sm text-[#1A1A1A]">
                  <Globe className="w-4 h-4 text-gray-500 shrink-0" aria-hidden="true" />
                  <span className="truncate max-w-xs">{data.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Photo */}
          <div className="shrink-0 self-start sm:self-auto">
            {data.photo ? (
              <img
                src={data.photo}
                alt={`${data.firstName} ${data.lastName}`.trim() || 'Profile Photo'}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover ring-2 ring-[#E0E0E0]/60 shadow-inner"
              />
            ) : (
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center p-3 select-none">
                Photo
              </div>
            )}
          </div>
        </div>

        {/* About Me Section */}
        {hasAbout && (
          <div className="mt-2 pt-2">
            <h2 className="text-lg font-bold text-[#F93B1D] mb-2 tracking-wide">
              {getTranslation(lang, 'steps.personal.summary')}
            </h2>
            <p className="text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-line break-words font-normal">
              {data.summary}
            </p>
            <div className="w-full h-px bg-[#E0E0E0] my-6" aria-hidden="true" />
          </div>
        )}

        {/* Experience Section */}
        {validExperiences.length > 0 && (
          <div className="mt-2">
            <h2 className="text-lg font-bold text-[#F93B1D] mb-3 tracking-wide">
              {getTranslation(lang, 'steps.experience.title')}
            </h2>
            <div className="space-y-4">
              {validExperiences.map((exp, index) => (
                <div key={exp.id || index} className="space-y-1">
                  <div className="text-sm font-semibold text-[#1A1A1A]">
                    {exp.position}
                    {exp.company && `, ${exp.company}`}
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <div className="text-xs text-[#6B7280] italic">
                      {exp.startDate || '...'} – {exp.endDate || '...'}
                    </div>
                  )}
                  {exp.description && (
                    <p className="text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-line break-words pt-0.5">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {(validEducations.length > 0 || validSkills.length > 0) && (
              <div className="w-full h-px bg-[#E0E0E0] my-6" aria-hidden="true" />
            )}
          </div>
        )}

        {/* Education Section */}
        {validEducations.length > 0 && (
          <div className="mt-2">
            <h2 className="text-lg font-bold text-[#F93B1D] mb-3 tracking-wide">
              {getTranslation(lang, 'steps.education.title')}
            </h2>
            <div className="space-y-4">
              {validEducations.map((edu, index) => (
                <div key={edu.id || index} className="space-y-1">
                  <div className="text-sm font-semibold text-[#1A1A1A]">
                    {edu.institution}
                    {edu.degree && `, ${edu.degree}`}
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <div className="text-xs text-[#6B7280] italic">
                      {edu.startDate ? `${edu.startDate} – ` : ''}
                      {edu.endDate}
                    </div>
                  )}
                  {edu.description && (
                    <p className="text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-line break-words pt-0.5">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {(validSkills.length > 0 || validLanguages.length > 0) && (
              <div className="w-full h-px bg-[#E0E0E0] my-6" aria-hidden="true" />
            )}
          </div>
        )}

        {/* Skills Section */}
        {validSkills.length > 0 && (
          <div className="mt-2">
            <h2 className="text-lg font-bold text-[#F93B1D] mb-2.5 tracking-wide">
              {getTranslation(lang, 'steps.skills.skillsSection')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {validSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-md border border-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {validLanguages.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold text-[#F93B1D] mb-2 tracking-wide">
              {getTranslation(lang, 'steps.skills.languagesSection')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {validLanguages.map((l, index) => (
                <div key={l.id || index} className="flex flex-col">
                  <span className="font-semibold text-gray-900">{l.name}</span>
                  <span className="text-gray-500">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Star Watermark at bottom left */}
      <div className="flex justify-start pt-10" aria-hidden="true">
        <StarWatermark size={54} className="opacity-45" />
      </div>
    </div>
  );
};
