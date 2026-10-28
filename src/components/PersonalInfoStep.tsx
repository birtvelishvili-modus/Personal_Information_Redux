import React, { useRef, useState } from 'react';
import {
  ChevronLeft,
  Upload,
  CheckCircle,
  AlertCircle,
  X,
  Link as LinkIcon,
} from 'lucide-react';
import { CVData, Lang } from '../types/cv';
import { validateName, validateEmail, validatePhone } from '../utils/validation';
import { getTranslation } from '../utils/i18n';

/**
 * PersonalInfoStep კომპონენტის Props ინტერფეისი
 */
interface PersonalInfoStepProps {
  formData: CVData;                   // ფორმის მონაცემები
  lang: Lang;                         // არჩეული ენა
  requireRedberryEmail?: boolean;     // Redberry ელ.ფოსტის მოთხოვნის ფლაგი
  onChange: (updated: Partial<CVData>) => void; // მონაცემების განახლების callback
  onNext: () => void;                 // შემდეგ ეტაპზე გადასვლა
  onBack: () => void;                 // წინა ეტაპზე დაბრუნება
}

/**
 * ნიმუშად გამოსაყენებელი ავატარების სია (Sample Avatars)
 */
const SAMPLE_AVATARS = [
  {
    id: 'male-1',
    name: 'Anzor',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'female-1',
    name: 'Eleanor',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'male-2',
    name: 'Marcus',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
];

/**
 * ეტაპი 1: პირადი ინფორმაცია (Personal Info Step)
 * - სახელისა და გვარის შეყვანა (ქართული ანბანის ვალიდაციით ქართულ რეჟიმში)
 * - ფოტოსურათის ატვირთვა (File Upload, URL ან Sample Avatars)
 * - პროფესიის/პოზიციის მითითება
 * - ელ.ფოსტის და ტელეფონის ნომრის ვალიდაცია
 * - მოკლე ბიოგრაფიის (Summary) ჩაწერა
 * - დამატებითი ველები (მისამართი, დაბადების თარიღი, ვებსაიტი)
 */
export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  lang,
  requireRedberryEmail = false,
  onChange,
  onNext,
  onBack,
}) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const firstNameVal = validateName(formData.firstName, lang);
  const lastNameVal = validateName(formData.lastName, lang);
  const emailVal = validateEmail(formData.email, requireRedberryEmail);
  const phoneVal = validatePhone(formData.phone);
  const hasImage = Boolean(formData.photo);

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError(getTranslation(lang, 'validation.uploadPhoto'));
      return;
    }
    setFileError(null);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange({ photo: reader.result });
        markTouched('photo');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFileError(null);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onChange({ photo: reader.result });
          markTouched('photo');
        }
      };
      reader.readAsDataURL(file);
    } else if (file) {
      setFileError(getTranslation(lang, 'validation.uploadPhoto'));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      photo: true,
    });

    if (firstNameVal.isValid && lastNameVal.isValid && emailVal.isValid && phoneVal.isValid && hasImage) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full space-y-6 pb-12">
      {/* Step Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3] focus-visible:outline-offset-2"
            title={getTranslation(lang, 'actions.back')}
            aria-label={getTranslation(lang, 'actions.back')}
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {getTranslation(lang, 'steps.personal.title')}
          </h2>
        </div>
        <span className="text-sm font-medium text-gray-500">1/4</span>
      </div>

      {/* First Name & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cv-first-name" className="block text-sm font-semibold text-gray-900 mb-1.5">
            {getTranslation(lang, 'steps.personal.firstName')}
          </label>
          <div className="relative">
            <input
              id="cv-first-name"
              type="text"
              value={formData.firstName}
              placeholder={getTranslation(lang, 'steps.personal.firstNamePlaceholder')}
              autoComplete="given-name"
              aria-describedby="cv-first-name-desc"
              aria-invalid={touched.firstName ? !firstNameVal.isValid : undefined}
              onBlur={() => markTouched('firstName')}
              onChange={(e) => onChange({ firstName: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#5E40E3] ${
                touched.firstName
                  ? firstNameVal.isValid
                    ? 'border-emerald-500 bg-emerald-50/15'
                    : 'border-red-500 bg-red-50/15'
                  : 'border-[#BCBCBC] focus:border-gray-500'
              }`}
            />
            {touched.firstName && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                {firstNameVal.isValid ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
            )}
          </div>
          <p
            id="cv-first-name-desc"
            className={`text-xs mt-1.5 min-h-[16px] ${
              touched.firstName && !firstNameVal.isValid ? 'text-red-500 font-medium' : 'text-gray-500'
            }`}
          >
            {touched.firstName && !firstNameVal.isValid
              ? getTranslation(lang, firstNameVal.errorKey || 'validation.minChars', { n: 2 })
              : getTranslation(lang, 'steps.personal.firstNameHint')}
          </p>
        </div>

        <div>
          <label htmlFor="cv-last-name" className="block text-sm font-semibold text-gray-900 mb-1.5">
            {getTranslation(lang, 'steps.personal.lastName')}
          </label>
          <div className="relative">
            <input
              id="cv-last-name"
              type="text"
              value={formData.lastName}
              placeholder={getTranslation(lang, 'steps.personal.lastNamePlaceholder')}
              autoComplete="family-name"
              aria-describedby="cv-last-name-desc"
              aria-invalid={touched.lastName ? !lastNameVal.isValid : undefined}
              onBlur={() => markTouched('lastName')}
              onChange={(e) => onChange({ lastName: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#5E40E3] ${
                touched.lastName
                  ? lastNameVal.isValid
                    ? 'border-emerald-500 bg-emerald-50/15'
                    : 'border-red-500 bg-red-50/15'
                  : 'border-[#BCBCBC] focus:border-gray-500'
              }`}
            />
            {touched.lastName && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                {lastNameVal.isValid ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
            )}
          </div>
          <p
            id="cv-last-name-desc"
            className={`text-xs mt-1.5 min-h-[16px] ${
              touched.lastName && !lastNameVal.isValid ? 'text-red-500 font-medium' : 'text-gray-500'
            }`}
          >
            {touched.lastName && !lastNameVal.isValid
              ? getTranslation(lang, lastNameVal.errorKey || 'validation.minChars', { n: 2 })
              : getTranslation(lang, 'steps.personal.lastNameHint')}
          </p>
        </div>
      </div>

      {/* Job Title */}
      <div>
        <label htmlFor="cv-job-title" className="block text-sm font-semibold text-gray-900 mb-1.5">
          {getTranslation(lang, 'steps.personal.jobTitle')}
        </label>
        <input
          id="cv-job-title"
          type="text"
          value={formData.jobTitle}
          placeholder={getTranslation(lang, 'steps.personal.jobTitlePlaceholder')}
          onChange={(e) => onChange({ jobTitle: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-[#5E40E3]"
        />
      </div>

      {/* Photo Upload Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label id="photo-upload-label" className="text-sm font-semibold text-gray-900">
            {getTranslation(lang, 'steps.personal.photo')}
          </label>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>{getTranslation(lang, 'steps.personal.orSample')}</span>
            <div className="flex items-center gap-1.5">
              {SAMPLE_AVATARS.map((avatar) => (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => {
                    onChange({ photo: avatar.url });
                    markTouched('photo');
                    setFileError(null);
                  }}
                  aria-label={avatar.name}
                  title={avatar.name}
                  className="w-7 h-7 rounded-full overflow-hidden border-2 border-transparent hover:border-[#5E40E3] focus-visible:outline-2 focus-visible:outline-[#5E40E3] transition-all cursor-pointer"
                >
                  <img
                    src={avatar.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          aria-labelledby="photo-upload-label"
          className={`border rounded-lg p-3 bg-white flex flex-wrap items-center justify-between gap-3 ${
            touched.photo && !hasImage ? 'border-red-500 bg-red-50/15' : 'border-[#BCBCBC]'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              id="file-upload-input"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-[#0E7FE1] hover:bg-[#0B6EC4] text-white text-xs sm:text-sm font-medium rounded-md flex items-center gap-2 cursor-pointer shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#0E7FE1]"
            >
              <Upload className="w-4 h-4" aria-hidden="true" />
              {getTranslation(lang, 'steps.personal.uploadBtn')}
            </button>
            <span className="text-xs text-gray-500 hidden sm:inline">
              {getTranslation(lang, 'steps.personal.uploadHint')}
            </span>
          </div>

          {formData.photo ? (
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md">
              <img
                src={formData.photo}
                alt="Selected"
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
              />
              <div className="text-left text-xs">
                <span className="font-medium text-emerald-600 block">{getTranslation(lang, 'steps.personal.photoSet')}</span>
                <span className="text-gray-400 text-[10px]">{getTranslation(lang, 'steps.personal.clickToChange')}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onChange({ photo: '' });
                  setFileError(null);
                }}
                className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                title="Remove photo"
                aria-label="Remove photo"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1 cursor-pointer rounded px-1.5 py-1"
            >
              <LinkIcon className="w-3.5 h-3.5" aria-hidden="true" />
              {getTranslation(lang, 'steps.personal.pasteUrl')}
            </button>
          )}
        </div>

        {showUrlInput && !formData.photo && (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="url"
              placeholder="https://..."
              value={formData.photo}
              onChange={(e) => onChange({ photo: e.target.value })}
              className="flex-1 text-xs border border-gray-300 rounded px-2.5 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#5E40E3]"
            />
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 cursor-pointer"
            >
              {getTranslation(lang, 'actions.close')}
            </button>
          </div>
        )}

        {fileError && (
          <p className="text-xs text-red-500 font-medium mt-1">
            {fileError}
          </p>
        )}

        {touched.photo && !hasImage && !fileError && (
          <p className="text-xs text-red-500 font-medium mt-1">
            {getTranslation(lang, 'validation.uploadPhoto')}
          </p>
        )}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cv-email" className="block text-sm font-semibold text-gray-900 mb-1.5">
            {getTranslation(lang, 'steps.personal.email')}
          </label>
          <div className="relative">
            <input
              id="cv-email"
              type="email"
              value={formData.email}
              placeholder={getTranslation(lang, 'steps.personal.emailPlaceholder')}
              autoComplete="email"
              aria-describedby="cv-email-desc"
              aria-invalid={touched.email ? !emailVal.isValid : undefined}
              onBlur={() => markTouched('email')}
              onChange={(e) => onChange({ email: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#5E40E3] ${
                touched.email
                  ? emailVal.isValid
                    ? 'border-emerald-500 bg-emerald-50/15'
                    : 'border-red-500 bg-red-50/15'
                  : 'border-[#BCBCBC] focus:border-gray-500'
              }`}
            />
            {touched.email && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                {emailVal.isValid ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
            )}
          </div>
          <p
            id="cv-email-desc"
            className={`text-xs mt-1.5 min-h-[16px] ${
              touched.email && !emailVal.isValid ? 'text-red-500 font-medium' : 'text-gray-500'
            }`}
          >
            {touched.email && !emailVal.isValid
              ? getTranslation(lang, emailVal.errorKey || 'validation.invalidEmail')
              : getTranslation(lang, 'steps.personal.emailHint')}
          </p>
        </div>

        <div>
          <label htmlFor="cv-phone" className="block text-sm font-semibold text-gray-900 mb-1.5">
            {getTranslation(lang, 'steps.personal.phone')}
          </label>
          <div className="relative">
            <input
              id="cv-phone"
              type="tel"
              inputMode="tel"
              value={formData.phone}
              placeholder={getTranslation(lang, 'steps.personal.phonePlaceholder')}
              autoComplete="tel"
              aria-describedby="cv-phone-desc"
              aria-invalid={touched.phone ? !phoneVal.isValid : undefined}
              onBlur={() => markTouched('phone')}
              onChange={(e) => onChange({ phone: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#5E40E3] ${
                touched.phone
                  ? phoneVal.isValid
                    ? 'border-emerald-500 bg-emerald-50/15'
                    : 'border-red-500 bg-red-50/15'
                  : 'border-[#BCBCBC] focus:border-gray-500'
              }`}
            />
            {touched.phone && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                {phoneVal.isValid ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
            )}
          </div>
          <p
            id="cv-phone-desc"
            className={`text-xs mt-1.5 min-h-[16px] ${
              touched.phone && !phoneVal.isValid ? 'text-red-500 font-medium' : 'text-gray-500'
            }`}
          >
            {touched.phone && !phoneVal.isValid
              ? getTranslation(lang, phoneVal.errorKey || 'validation.phoneFormat')
              : getTranslation(lang, 'steps.personal.phoneHint')}
          </p>
        </div>
      </div>

      {/* Europass & International Extended Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cv-location" className="block text-sm font-semibold text-gray-900 mb-1.5">
            {getTranslation(lang, 'steps.personal.location')}
          </label>
          <input
            id="cv-location"
            type="text"
            value={formData.location}
            placeholder={getTranslation(lang, 'steps.personal.locationPlaceholder')}
            onChange={(e) => onChange({ location: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label htmlFor="cv-address" className="block text-sm font-semibold text-gray-900 mb-1.5">
            {getTranslation(lang, 'steps.personal.address')}
          </label>
          <input
            id="cv-address"
            type="text"
            value={formData.address || ''}
            placeholder={getTranslation(lang, 'steps.personal.addressPlaceholder')}
            onChange={(e) => onChange({ address: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="cv-nationality" className="block text-sm font-semibold text-gray-900 mb-1.5">
            {getTranslation(lang, 'steps.personal.nationality')}
          </label>
          <input
            id="cv-nationality"
            type="text"
            value={formData.nationality || ''}
            placeholder={getTranslation(lang, 'steps.personal.nationalityPlaceholder')}
            onChange={(e) => onChange({ nationality: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label htmlFor="cv-birthdate" className="block text-sm font-semibold text-gray-900 mb-1.5">
            {getTranslation(lang, 'steps.personal.birthDate')}
          </label>
          <input
            id="cv-birthdate"
            type="date"
            value={formData.birthDate || ''}
            onChange={(e) => onChange({ birthDate: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label htmlFor="cv-website" className="block text-sm font-semibold text-gray-900 mb-1.5">
            {getTranslation(lang, 'steps.personal.website')}
          </label>
          <input
            id="cv-website"
            type="url"
            value={formData.website || ''}
            placeholder={getTranslation(lang, 'steps.personal.websitePlaceholder')}
            onChange={(e) => onChange({ website: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500"
          />
        </div>
      </div>

      {/* Summary */}
      <div>
        <label htmlFor="cv-summary" className="block text-sm font-semibold text-gray-900 mb-1.5">
          {getTranslation(lang, 'steps.personal.summary')}
        </label>
        <textarea
          id="cv-summary"
          rows={4}
          value={formData.summary}
          placeholder={getTranslation(lang, 'steps.personal.summaryPlaceholder')}
          onChange={(e) => onChange({ summary: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-md border border-[#BCBCBC] text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 transition-colors resize-y min-h-[100px]"
        />
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-9 py-3 bg-[#5E40E3] hover:bg-[#5033D1] active:bg-[#4327C2] text-white font-medium text-sm rounded-md shadow-sm transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5E40E3]"
        >
          {getTranslation(lang, 'actions.next')}
        </button>
      </div>
    </form>
  );
};
