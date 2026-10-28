import { CVData } from '../types/cv';
import { redberryReady } from '../components/templates/redberry/redberry.ready';
import { redberryBlank } from '../components/templates/redberry/redberry.blank';

export const SAMPLE_AVATARS = [
  {
    id: 'anzor',
    name: 'Anzor',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'eleanor',
    name: 'Eleanor',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
];

export const BLANK_CV_DATA: CVData = redberryBlank;
export const DEMO_CV_DATA: CVData = redberryReady.en;
