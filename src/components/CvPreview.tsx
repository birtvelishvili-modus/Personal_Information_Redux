import React from 'react';
import { CVData, Lang, TemplateId } from '../types/cv';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { useAppSelector } from '../store/store';

interface CvPreviewProps {
  data: CVData;
  templateId?: TemplateId;
  lang?: Lang;
  id?: string;
  className?: string;
  isPrint?: boolean;
}

export const CvPreview: React.FC<CvPreviewProps> = ({
  data,
  templateId,
  lang,
  id = 'cv-preview',
  className = '',
  isPrint = false,
}) => {
  const reduxLang = useAppSelector((state) => state.cv.currentLang);
  const reduxTemplate = useAppSelector((state) => state.cv.selectedTemplate);

  const activeTemplate = templateId || reduxTemplate || 'redberry';
  const activeLang = lang || reduxLang || 'en';

  return (
    <TemplateRenderer
      templateId={activeTemplate}
      data={data}
      lang={activeLang}
      id={id}
      className={className}
      isPrint={isPrint}
    />
  );
};
