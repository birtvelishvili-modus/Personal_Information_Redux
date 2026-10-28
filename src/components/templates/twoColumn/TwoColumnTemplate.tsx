import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { CVData, Lang } from '../../../types/cv';
import { getTranslation } from '../../../utils/i18n';

interface TwoColumnTemplateProps {
  data: CVData;
  lang: Lang;
  id?: string;
  className?: string;
  isPrint?: boolean;
}

export const TwoColumnTemplate: React.FC<TwoColumnTemplateProps> = ({
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
      className={`bg-white text-gray-900 shadow-md rounded-none w-full max-w-[800px] min-h-[960px] flex flex-col md:flex-row ${
        isPrint ? 'print:shadow-none print:m-0 print:w-full print:max-w-none' : ''
      } ${className}`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Left Sidebar (Dark Slate) */}
      <div className="w-full md:w-[32%] bg-[#0F172A] text-white p-6 sm:p-8 flex flex-col justify-between shrink-0">
        <div>
          {/* Avatar */}
          {data.photo ? (
            <div className="flex justify-center mb-6">
              <img
                src={data.photo}
                alt={`${data.firstName} ${data.lastName}`.trim() || 'Photo'}
                className="w-28 h-28 rounded-full object-cover ring-4 ring-white/10 shadow-lg"
              />
            </div>
          ) : (
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 rounded-full bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-400 text-xs">
                Photo
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700/80 pb-1">
              Contact
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300">
              {data.email && (
                <div className="flex items-center gap-2 break-all">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>{data.phone}</span>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>{data.location}</span>
                </div>
              )}
              {data.website && (
                <div className="flex items-center gap-2 break-all">
                  <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span className="truncate">{data.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {validSkills.length > 0 && (
            <div className="space-y-3 mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700/80 pb-1">
                {getTranslation(lang, 'steps.skills.skillsSection')}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {validSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-slate-800 text-slate-200 text-[11px] rounded border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700/80 pb-1">
                {getTranslation(lang, 'steps.skills.languagesSection')}
              </h3>
              <div className="space-y-1.5 text-xs text-slate-300">
                {validLanguages.map((l, index) => (
                  <div key={l.id || index} className="flex justify-between">
                    <span className="font-medium text-white">{l.name}</span>
                    <span className="text-slate-400">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Main Pane */}
      <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between">
        <div>
          {/* Header Title */}
          <div className="border-b border-gray-200 pb-5 mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {`${data.firstName} ${data.lastName}`.trim() || `${getTranslation(lang, 'steps.personal.firstNamePlaceholder')} ${getTranslation(lang, 'steps.personal.lastNamePlaceholder')}`}
            </h1>
            {data.jobTitle && (
              <p className="text-sm sm:text-base font-semibold text-emerald-600 mt-1 uppercase tracking-wide">
                {data.jobTitle}
              </p>
            )}
          </div>

          {/* Summary */}
          {hasAbout && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                {getTranslation(lang, 'steps.personal.summary')}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {data.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {validExperiences.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 border-b border-gray-100 pb-1">
                {getTranslation(lang, 'steps.experience.title')}
              </h2>
              <div className="space-y-4">
                {validExperiences.map((exp, index) => (
                  <div key={exp.id || index} className="relative pl-3.5 border-l-2 border-emerald-500">
                    <div className="text-xs sm:text-sm font-bold text-gray-900">
                      {exp.position}
                      {exp.company && <span className="font-medium text-gray-600"> • {exp.company}</span>}
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <div className="text-[11px] text-gray-500 italic mb-1">
                        {exp.startDate || ''} – {exp.endDate || ''}
                      </div>
                    )}
                    {exp.description && (
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 border-b border-gray-100 pb-1">
                {getTranslation(lang, 'steps.education.title')}
              </h2>
              <div className="space-y-3">
                {validEducations.map((edu, index) => (
                  <div key={edu.id || index} className="relative pl-3.5 border-l-2 border-slate-300">
                    <div className="text-xs sm:text-sm font-bold text-gray-900">
                      {edu.institution}
                      {edu.degree && <span className="font-normal text-gray-600"> — {edu.degree}</span>}
                    </div>
                    {edu.endDate && (
                      <div className="text-[11px] text-gray-500 italic">
                        {edu.endDate}
                      </div>
                    )}
                    {edu.description && (
                      <p className="text-xs text-gray-600 mt-0.5">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
