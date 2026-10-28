import { CVData } from '../../../types/cv';

export const twoColumnBlank: CVData = {
  firstName: '',
  lastName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  address: '',
  nationality: '',
  birthDate: '',
  website: '',
  photo: '',
  summary: '',
  experience: [
    {
      id: 'exp-1',
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  skills: [],
  languages: [],
};
