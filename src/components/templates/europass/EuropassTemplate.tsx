import React from 'react';
import { Mail, Phone, MapPin, Globe, Calendar, Flag } from 'lucide-react';
import { CVData, Lang } from '../../../types/cv';
import { getTranslation } from '../../../utils/i18n';

interface EuropassTemplateProps {
  data: CVData;
  lang: Lang;
  id?: string;
  className?: string;
  isPrint?: boolean;
}

export const EuropassTemplate: React.FC<EuropassTemplateProps> = ({
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
      className={`bg-white text-gray-900 shadow-md rounded-none w-full max-w-[800px] min-h-[960px] p-8 sm:p-12 font-sans ${
        isPrint ? 'print:shadow-none print:m-0 print:p-8 print:w-full print:max-w-none' : ''
      } ${className}`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Europass Header Bar */}
      <div className="flex items-center justify-between border-b-2 border-[#0E4194] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[#0E4194] font-black text-2xl tracking-tighter">europass</span>
          <span className="text-xs bg-[#0E4194]/10 text-[#0E4194] font-semibold px-2 py-0.5 rounded">Curriculum Vitae</span>
        </div>
        {data.nationality && (
          <span className="text-xs text-gray-500 font-medium">{data.nationality}</span>
        )}
      </div>

      {/* Main Split Layout: Left Info & Right Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Personal Information & Details (4 cols) */}
        <div className="md:col-span-4 space-y-6 border-r-0 md:border-r border-gray-200 md:pr-6">
          {data.photo && (
            <div className="flex justify-center md:justify-start">
              <img
                src={data.photo}
                alt={`${data.firstName} ${data.lastName}`.trim() || 'Photo'}
                className="w-28 h-36 object-cover rounded border border-gray-300 shadow-xs"
              />
            </div>
          )}

          {/* Personal Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#0E4194] uppercase tracking-wider border-b border-gray-200 pb-1">
              {getTranslation(lang, 'steps.personal.title')}
            </h3>

            <div className="space-y-2 text-xs text-gray-700">
              <div className="font-bold text-gray-950 text-sm">{`${data.firstName} ${data.lastName}`.trim()}</div>
              {data.jobTitle && <div className="font-medium text-[#0E4194]">{data.jobTitle}</div>}

              {data.address && (
                <div className="flex items-start gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0E4194] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{data.address}</span>
                </div>
              )}

              {data.location && !data.address && (
                <div className="flex items-start gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0E4194] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{data.location}</span>
                </div>
              )}

              {data.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0E4194] shrink-0" aria-hidden="true" />
                  <span>{data.phone}</span>
                </div>
              )}

              {data.email && (
                <div className="flex items-center gap-1.5 break-all">
                  <Mail className="w-3.5 h-3.5 text-[#0E4194] shrink-0" aria-hidden="true" />
                  <span>{data.email}</span>
                </div>
              )}

              {data.website && (
                <div className="flex items-center gap-1.5 break-all">
                  <Globe className="w-3.5 h-3.5 text-[#0E4194] shrink-0" aria-hidden="true" />
                  <span className="truncate">{data.website}</span>
                </div>
              )}

              {data.birthDate && (
                <div className="flex items-center gap-1.5 pt-1">
                  <Calendar className="w-3.5 h-3.5 text-[#0E4194] shrink-0" aria-hidden="true" />
                  <span>{getTranslation(lang, 'steps.personal.birthDate')}: {data.birthDate}</span>
                </div>
              )}

              {data.nationality && (
                <div className="flex items-center gap-1.5">
                  <Flag className="w-3.5 h-3.5 text-[#0E4194] shrink-0" aria-hidden="true" />
                  <span>{getTranslation(lang, 'steps.personal.nationality')}: {data.nationality}</span>
                </div>
              )}
            </div>
          </div>

          {/* Languages Section with CEFR framework style */}
          {validLanguages.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#0E4194] uppercase tracking-wider border-b border-gray-200 pb-1">
                {getTranslation(lang, 'steps.skills.languagesSection')}
              </h3>
              <div className="space-y-1.5 text-xs">
                {validLanguages.map((l, index) => (
                  <div key={l.id || index} className="flex flex-col border-b border-gray-100 pb-1">
                    <span className="font-semibold text-gray-900">{l.name}</span>
                    <span className="text-[11px] text-gray-600">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Digital Skills */}
          {validSkills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#0E4194] uppercase tracking-wider border-b border-gray-200 pb-1">
                {getTranslation(lang, 'steps.skills.skillsSection')}
              </h3>
              <div className="flex flex-wrap gap-1">
                {validSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-[#0E4194]/5 text-[#0E4194] text-[11px] font-medium rounded border border-[#0E4194]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Work Experience & Education (8 cols) */}
        <div className="md:col-span-8 space-y-6">
          {/* Summary */}
          {hasAbout && (
            <div>
              <h3 className="text-xs font-bold text-[#0E4194] uppercase tracking-wider border-b border-[#0E4194]/30 pb-1 mb-2">
                {getTranslation(lang, 'steps.personal.summary')}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                {data.summary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {validExperiences.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-[#0E4194] uppercase tracking-wider border-b border-[#0E4194]/30 pb-1 mb-3">
                {getTranslation(lang, 'steps.experience.title')}
              </h3>
              <div className="space-y-4">
                {validExperiences.map((exp, index) => (
                  <div key={exp.id || index} className="text-xs sm:text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between font-bold text-gray-900">
                      <span>{exp.position}</span>
                      {(exp.startDate || exp.endDate) && (
                        <span className="text-xs text-[#0E4194] font-semibold">
                          {exp.startDate || ''} – {exp.endDate || ''}
                        </span>
                      )}
                    </div>
                    {exp.company && (
                      <div className="text-xs font-medium text-gray-600 mb-1">{exp.company}</div>
                    )}
                    {exp.description && (
                      <p className="text-xs text-gray-700 leading-relaxed mt-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education & Training */}
          {validEducations.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-[#0E4194] uppercase tracking-wider border-b border-[#0E4194]/30 pb-1 mb-3">
                {getTranslation(lang, 'steps.education.title')}
              </h3>
              <div className="space-y-4">
                {validEducations.map((edu, index) => (
                  <div key={edu.id || index} className="text-xs sm:text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between font-bold text-gray-900">
                      <span>{edu.degree}</span>
                      {edu.endDate && (
                        <span className="text-xs text-[#0E4194] font-semibold">
                          {edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}
                        </span>
                      )}
                    </div>
                    {edu.institution && (
                      <div className="text-xs font-medium text-gray-600 mb-1">{edu.institution}</div>
                    )}
                    {edu.description && (
                      <p className="text-xs text-gray-700 leading-relaxed mt-0.5">
                        {edu.description}
                      </p>
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
