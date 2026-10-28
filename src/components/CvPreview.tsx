import React from 'react';
import { CVData, Lang, TemplateId } from '../types/cv';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { useAppSelector } from '../store/store';

/**
 * CvPreview კომპონენტის Props ინტერფეისი
 */
interface CvPreviewProps {
  data: CVData;             // CV-ის მონაცემები გამოსასახად
  templateId?: TemplateId;  // კონკრეტული შაბლონის ID (არასავალდებულო, წინააღმდეგ შემთხვევაში Redux-დან)
  lang?: Lang;              // ენა (არასავალდებულო, წინააღმდეგ შემთხვევაში Redux-დან)
  id?: string;              // HTML ელემენტის ID
  className?: string;       // დამატებითი სტილის კლასები
  isPrint?: boolean;        // ბეჭდვის რეჟიმის ფლაგი
}

/**
 * რეზიუმეს ვიზუალური გადახედვის (Live Preview) კომპონენტი:
 * - Redux State-იდან იღებს მიმდინარე ენასა და შაბლონს
 * - მონაცემებს გადასცემს TemplateRenderer-ს შესაბამისი დიზაინის დასარენდერებლად
 */
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
