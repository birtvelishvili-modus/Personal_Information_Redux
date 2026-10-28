/**
 * მხარდაჭერილი ენების ტიპი:
 * - 'en': ინგლისური
 * - 'ka': ქართული
 * - 'ru': რუსული
 */
export type Lang = 'en' | 'ka' | 'ru';

/**
 * სამუშაო გამოცდილების ჩანაწერის ინტერფეისი
 */
export interface ExperienceItem {
  id: string;          // ჩანაწერის უნიკალური იდენტიფიკატორი
  position: string;    // დაკავებული თანამდებობა
  company: string;     // დამსაქმებელი კომპანიის სახელი
  startDate: string;   // მუშაობის დაწყების თარიღი
  endDate: string;     // მუშაობის დასრულების თარიღი
  description: string; // მოვალეობებისა და მიღწევების აღწერა
}

/**
 * განათლების ჩანაწერის ინტერფეისი
 */
export interface EducationItem {
  id: string;           // ჩანაწერის უნიკალური იდენტიფიკატორი
  institution: string;  // სასწავლებლის დასახელება
  degree: string;       // ხარისხი / სპეციალობა
  startDate?: string;   // სწავლის დაწყების თარიღი (არასავალდებულო)
  endDate: string;      // სწავლის დასრულების თარიღი
  description?: string; // დამატებითი აღწერა (არასავალდებულო)
}

/**
 * უცხო ენის ცოდნის ჩანაწერის ინტერფეისი
 */
export interface LanguageItem {
  id: string;    // ჩანაწერის უნიკალური იდენტიფიკატორი
  name: string;  // ენის დასახელება (მაგ. English, Georgian)
  level: string; // ცოდნის დონე (მაგ. Native, C1, B2 და ა.შ.)
}

/**
 * CV-ის სრული მონაცემების ინტერფეისი
 */
export interface CVData {
  // ძირითადი პირადი ინფორმაცია
  firstName: string;   // სახელი
  lastName: string;    // გვარი
  jobTitle: string;    // პროფესია / სასურველი პოზიცია
  email: string;       // ელ.ფოსტის მისამართი
  phone: string;       // ტელეფონის ნომერი
  location: string;    // ლოკაცია (ქალაქი, ქვეყანა)

  // დამატებითი / საერთაშორისო ველები (მაგ. Europass შაბლონისთვის)
  address?: string;     // საცხოვრებელი მისამართი
  nationality?: string; // მოქალაქეობა
  birthDate?: string;   // დაბადების თარიღი (YYYY-MM-DD)
  website?: string;     // პირადი ვებსაიტი / LinkedIn / Portfolio

  photo: string;        // ფოტოსურათი (Base64 ფორმატში ან URL)
  summary: string;      // მოკლე ბიოგრაფია / ჩემ შესახებ

  // CV-ის ძირითადი სექციები
  experience: ExperienceItem[]; // სამუშაო გამოცდილების სია
  education: EducationItem[];   // განათლების ისტორიის სია
  skills: string[];             // პროფესიული უნარების მასივი
  languages: LanguageItem[];    // უცხო ენების ცოდნის სია
}

/**
 * ხელმისაწვდომი CV შაბლონების ID-ები
 */
export type TemplateId = 'redberry' | 'modern' | 'twoColumn' | 'europass' | 'creative';

/**
 * შაბლონის მზა (Ready) მონაცემების ჩანაწერი თითოეული ენისთვის
 */
export type ReadyData = Record<Lang, CVData>;

/**
 * შაბლონის დეფინიციის ინტერფეისი
 */
export interface TemplateDefinition {
  id: TemplateId;            // შაბლონის უნიკალური იდენტიფიკატორი
  nameKey: string;           // სახელწოდების თარგმანის გასაღები
  categoryKey: string;       // კატეგორიის თარგმანის გასაღები
  descriptionKey: string;    // აღწერის თარგმანის გასაღები
  accentColor: string;       // დიზაინის აქცენტური ფერი
  blank: CVData;             // ცარიელი საწყისი მონაცემები
  ready: ReadyData;          // მზა მონაცემები ენების მიხედვით
}

/**
 * ფორმის ნაბიჯების ნუმერაცია:
 * 1: პირადი ინფორმაცია
 * 2: გამოცდილება
 * 3: განათლება
 * 4: უნარები და ენები
 */
export type StepType = 1 | 2 | 3 | 4;

/**
 * აპლიკაციის მიმდინარე ეკრანი (ხედი):
 * - 'landing': საწყისი გვერდი
 * - 'wizard': CV-ის შევსების ფორმა
 * - 'completed': დასრულებული რეზიუმეს გვერდი
 */
export type AppView = 'landing' | 'wizard' | 'completed';
