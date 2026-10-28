import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { CVData, Lang } from '../../../types/cv';
import { getTranslation } from '../../../utils/i18n';

/**
 * CreativeTemplate კომპონენტის Props ინტერფეისი
 */
interface CreativeTemplateProps {
  data: CVData;         // CV მონაცემები
  lang: Lang;           // მიმდინარე ენა
  id?: string;          // DOM ID
  className?: string;   // დამატებითი სტილის კლასები
  isPrint?: boolean;    // ბეჭდვის რეჟიმის ფლაგი
}

/**
 * კრეატიული დიზაინერული CV შაბლონი (Creative Modern Template):
 * - მკვეთრი ინდიგო (#6366F1) და იისფერი აქცენტები
 * - თანამედროვე ბეიჯები უნარებისთვის და სუფთა ტიპოგრაფია
 * - შემოქმედებითი და ტექნოლოგიური პროფესიების შესაფერისი დიზაინი
 */
export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({
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
      {/* Creative Header with Vibrant Indigo/Violet Border */}
      <div className="relative border-l-4 border-[#6366F1] pl-6 pb-6 mb-8 flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            {`${data.firstName} ${data.lastName}`.trim() || `${getTranslation(lang, 'steps.personal.firstNamePlaceholder')} ${getTranslation(lang, 'steps.personal.lastNamePlaceholder')}`}
          </h1>

          {data.jobTitle && (
            <div className="inline-block px-3 py-1 bg-indigo-50 text-[#4F46E5] text-xs font-bold uppercase tracking-wider rounded-md mt-2">
              {data.jobTitle}
            </div>
          )}

          {/* Contact Details */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-600 mt-4">
            {data.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#6366F1]" aria-hidden="true" />
                {data.email}
              </span>
            )}
            {data.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#6366F1]" aria-hidden="true" />
                {data.phone}
              </span>
            )}
            {data.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#6366F1]" aria-hidden="true" />
                {data.location}
              </span>
            )}
            {data.website && (
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#6366F1]" aria-hidden="true" />
                <span className="truncate max-w-[180px]">{data.website}</span>
              </span>
            )}
          </div>
        </div>

        {data.photo && (
          <img
            src={data.photo}
            alt={`${data.firstName} ${data.lastName}`.trim() || 'Photo'}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-md shrink-0"
          />
        )}
      </div>

      <div className="space-y-7">
        {/* About Me */}
        {hasAbout && (
          <div className="bg-gray-50/70 p-5 rounded-xl border border-gray-100">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#4F46E5] mb-2">
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
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-950 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6366F1]" aria-hidden="true" />
              {getTranslation(lang, 'steps.experience.title')}
            </h2>
            <div className="space-y-4">
              {validExperiences.map((exp, index) => (
                <div key={exp.id || index} className="p-4 bg-white border border-gray-200/80 rounded-xl shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-bold text-xs sm:text-sm text-gray-900">
                    <span>
                      {exp.position} <span className="text-[#6366F1] font-semibold">@ {exp.company}</span>
                    </span>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-[11px] text-gray-500 font-normal">
                        {exp.startDate || ''} – {exp.endDate || ''}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
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
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-950 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6366F1]" aria-hidden="true" />
              {getTranslation(lang, 'steps.education.title')}
            </h2>
            <div className="space-y-3">
              {validEducations.map((edu, index) => (
                <div key={edu.id || index} className="p-4 bg-white border border-gray-200/80 rounded-xl shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-bold text-xs sm:text-sm text-gray-900">
                    <span>{edu.degree}</span>
                    {edu.endDate && (
                      <span className="text-[11px] text-gray-500 font-normal">{edu.endDate}</span>
                    )}
                  </div>
                  {edu.institution && (
                    <div className="text-xs text-[#6366F1] font-semibold mt-0.5">{edu.institution}</div>
                  )}
                  {edu.description && (
                    <p className="text-xs text-gray-600 mt-1.5">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Languages */}
        {(validSkills.length > 0 || validLanguages.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {validSkills.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-950 mb-2.5">
                  {getTranslation(lang, 'steps.skills.skillsSection')}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {validSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-indigo-50/80 text-[#4338CA] text-xs font-semibold rounded-lg border border-indigo-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {validLanguages.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-950 mb-2.5">
                  {getTranslation(lang, 'steps.skills.languagesSection')}
                </h2>
                <div className="space-y-1.5 text-xs">
                  {validLanguages.map((l, index) => (
                    <div key={l.id || index} className="flex justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
                      <span className="font-semibold text-gray-900">{l.name}</span>
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
