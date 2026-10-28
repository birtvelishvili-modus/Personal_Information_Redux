import { TemplateDefinition, TemplateId } from '../../types/cv';
import { redberryBlank } from './redberry/redberry.blank';
import { redberryReady } from './redberry/redberry.ready';
import { modernBlank } from './modern/modern.blank';
import { modernReady } from './modern/modern.ready';
import { twoColumnBlank } from './twoColumn/twoColumn.blank';
import { twoColumnReady } from './twoColumn/twoColumn.ready';
import { europassBlank } from './europass/europass.blank';
import { europassReady } from './europass/europass.ready';
import { creativeBlank } from './creative/creative.blank';
import { creativeReady } from './creative/creative.ready';

/**
 * შაბლონების რეესტრი (Templates Registry):
 * შეიცავს თითოეული CV შაბლონის მეტამონაცემებს, აქცენტურ ფერებს,
 * ცარიელ (blank) მონაცემებს და მზა (ready) დემო ნიმუშებს.
 */
export const TEMPLATES: Record<TemplateId, TemplateDefinition> = {
  // Redberry ოფიციალური შაბლონი
  redberry: {
    id: 'redberry',
    nameKey: 'templates.redberry.name',
    categoryKey: 'templates.redberry.category',
    descriptionKey: 'templates.redberry.description',
    accentColor: '#F93B1D',
    blank: redberryBlank,
    ready: redberryReady,
  },
  // მოდერნ შაბლონი
  modern: {
    id: 'modern',
    nameKey: 'templates.modern.name',
    categoryKey: 'templates.modern.category',
    descriptionKey: 'templates.modern.description',
    accentColor: '#1F2937',
    blank: modernBlank,
    ready: modernReady,
  },
  // ორსვეტიანი (Two-Column) შაბლონი
  twoColumn: {
    id: 'twoColumn',
    nameKey: 'templates.twoColumn.name',
    categoryKey: 'templates.twoColumn.category',
    descriptionKey: 'templates.twoColumn.description',
    accentColor: '#0F172A',
    blank: twoColumnBlank,
    ready: twoColumnReady,
  },
  // ევროპასის (Europass) საერთაშორისო შაბლონი
  europass: {
    id: 'europass',
    nameKey: 'templates.europass.name',
    categoryKey: 'templates.europass.category',
    descriptionKey: 'templates.europass.description',
    accentColor: '#0E4194',
    blank: europassBlank,
    ready: europassReady,
  },
  // კრეატიული (Creative) შაბლონი
  creative: {
    id: 'creative',
    nameKey: 'templates.creative.name',
    categoryKey: 'templates.creative.category',
    descriptionKey: 'templates.creative.description',
    accentColor: '#6366F1',
    blank: creativeBlank,
    ready: creativeReady,
  },
};

/**
 * ყველა შაბლონის მასივი მოდალში ან სიებში გადასავლელად
 */
export const TEMPLATE_LIST: TemplateDefinition[] = Object.values(TEMPLATES);
