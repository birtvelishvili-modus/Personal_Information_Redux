import React from 'react';
import { CVData, Lang, TemplateId } from '../../types/cv';
import { RedberryTemplate } from './redberry/RedberryTemplate';
import { ModernTemplate } from './modern/ModernTemplate';
import { TwoColumnTemplate } from './twoColumn/TwoColumnTemplate';
import { EuropassTemplate } from './europass/EuropassTemplate';
import { CreativeTemplate } from './creative/CreativeTemplate';

interface TemplateRendererProps {
  templateId: TemplateId;
  data: CVData;
  lang: Lang;
  id?: string;
  className?: string;
  isPrint?: boolean;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  templateId,
  data,
  lang,
  id,
  className,
  isPrint,
}) => {
  switch (templateId) {
    case 'modern':
      return <ModernTemplate data={data} lang={lang} id={id} className={className} isPrint={isPrint} />;
    case 'twoColumn':
      return <TwoColumnTemplate data={data} lang={lang} id={id} className={className} isPrint={isPrint} />;
    case 'europass':
      return <EuropassTemplate data={data} lang={lang} id={id} className={className} isPrint={isPrint} />;
    case 'creative':
      return <CreativeTemplate data={data} lang={lang} id={id} className={className} isPrint={isPrint} />;
    case 'redberry':
    default:
      return <RedberryTemplate data={data} lang={lang} id={id} className={className} isPrint={isPrint} />;
  }
};
