import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { CVData, Lang } from '../../../types/cv';
import { getTranslation } from '../../../utils/i18n';

/**
 * ModernTemplate კომპონენტის Props ინტერფეისი
 */
interface ModernTemplateProps {
  data: CVData;         // CV მონაცემები
  lang: Lang;           // მიმდინარე ენა
  id?: string;          // DOM ID
  className?: string;   // დამატებითი სტილის კლასები
  isPrint?: boolean;    // ბეჭდვის რეჟიმის ფლაგი
}

/**
 * თანამედროვე მინიმალისტური CV შაბლონი (Modern Minimalist Template):
 * - ელეგანტური მონოქრომული სტილი
 * - ცენტრალიზებული ჰედერი და მოკრძალებული სექციის სათაურები
 * - კომპაქტური და სუფთა განლაგება
 */
export const ModernTemplate: React.FC<ModernTemplateProps> = ({
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
      className={`bg-white text-gray-900 shadow-md rounded-none w-full max-w-[800px] min-h-[960px] p-8 sm:p-12 md:p-14 font-sans ${
        isPrint ? 'print:shadow-none print:m-0 print:p-8 print:w-full print:max-w-none' : ''
      } ${className}`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Header */}
      <div className="border-b-2 border-gray-900 pb-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-950 uppercase">
            {`${data.firstName} ${data.lastName}`.trim() || `${getTranslation(lang, 'steps.personal.firstNamePlaceholder')} ${getTranslation(lang, 'steps.personal.lastNamePlaceholder')}`}
          </h1>

          {data.jobTitle && (
            <p className="text-sm uppercase tracking-widest text-gray-600 font-medium mt-1">
              {data.jobTitle}
            </p>
          )}

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-gray-600 mt-3.5">
            {data.email && (
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                {data.email}
              </span>
            )}
            {data.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                {data.phone}
              </span>
            )}
            {data.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                {data.location}
              </span>
            )}
            {data.website && (
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                <span className="truncate max-w-[200px]">{data.website}</span>
              </span>
            )}
          </div>
        </div>

        {data.photo && (
          <img
            src={data.photo}
            alt={`${data.firstName} ${data.lastName}`.trim() || 'Photo'}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover border border-gray-200 shadow-xs"
          />
        )}
      </div>

      <div className="space-y-7">
        {/* Summary */}
        {hasAbout && (
          <div>
            <h2 className="text-xs font-bold tracking-widest text-gray-950 uppercase mb-2">
              {getTranslation(lang, 'steps.personal.summary')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
              {data.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {validExperiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold tracking-widest text-gray-950 uppercase mb-3 border-b border-gray-200 pb-1">
              {getTranslation(lang, 'steps.experience.title')}
            </h2>
            <div className="space-y-4">
              {validExperiences.map((exp, index) => (
                <div key={exp.id || index}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm font-semibold text-gray-900">
                    <span>
                      {exp.position} <span className="text-gray-500 font-normal">| {exp.company}</span>
                    </span>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-[11px] text-gray-500 font-normal sm:text-right">
                        {exp.startDate || ''} – {exp.endDate || ''}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {validEducations.length > 0 && (
          <div>
            <h2 className="text-xs font-bold tracking-widest text-gray-950 uppercase mb-3 border-b border-gray-200 pb-1">
              {getTranslation(lang, 'steps.education.title')}
            </h2>
            <div className="space-y-3">
              {validEducations.map((edu, index) => (
                <div key={edu.id || index}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm font-semibold text-gray-900">
                    <span>
                      {edu.institution} <span className="text-gray-500 font-normal">| {edu.degree}</span>
                    </span>
                    {edu.endDate && (
                      <span className="text-[11px] text-gray-500 font-normal">
                        {edu.endDate}
                      </span>
                    )}
                  </div>
                  {edu.description && (
                    <p className="text-xs text-gray-600 mt-0.5">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Languages */}
        {(validSkills.length > 0 || validLanguages.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1 border-t border-gray-200">
            {validSkills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold tracking-widest text-gray-950 uppercase mb-2">
                  {getTranslation(lang, 'steps.skills.skillsSection')}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {validSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-gray-50 text-gray-800 text-[11px] rounded border border-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {validLanguages.length > 0 && (
              <div>
                <h2 className="text-xs font-bold tracking-widest text-gray-950 uppercase mb-2">
                  {getTranslation(lang, 'steps.skills.languagesSection')}
                </h2>
                <div className="space-y-1 text-xs">
                  {validLanguages.map((l, index) => (
                    <div key={l.id || index} className="flex justify-between text-gray-700">
                      <span className="font-medium">{l.name}</span>
                      <span className="text-gray-500">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
