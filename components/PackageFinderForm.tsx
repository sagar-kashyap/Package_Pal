
import React from 'react';
import { LanguageOption, FormField } from '../types';
import { PROGRAMMING_LANGUAGES } from '../constants';

interface PackageFinderFormProps {
  formData: {
    sourcePackage: string;
    sourceLanguage: string;
    targetLanguage: string;
  };
  onInputChange: (field: FormField, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const PackageFinderForm: React.FC<PackageFinderFormProps> = ({
  formData,
  onInputChange,
  onSubmit,
  isLoading,
}) => {
  const commonInputClasses = "w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors text-slate-100 placeholder-slate-400";
  const commonLabelClasses = "block text-sm font-medium text-slate-300 mb-1";

  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-slate-800 p-8 rounded-lg shadow-2xl">
      <div>
        <label htmlFor="sourcePackage" className={commonLabelClasses}>
          Known Package Name
        </label>
        <input
          type="text"
          id="sourcePackage"
          name="sourcePackage"
          value={formData.sourcePackage}
          onChange={(e) => onInputChange(FormField.SourcePackage, e.target.value)}
          placeholder="e.g., express, numpy, Gin"
          className={commonInputClasses}
          required
        />
      </div>

      <div>
        <label htmlFor="sourceLanguage" className={commonLabelClasses}>
          Source Language
        </label>
        <select
          id="sourceLanguage"
          name="sourceLanguage"
          value={formData.sourceLanguage}
          onChange={(e) => onInputChange(FormField.SourceLanguage, e.target.value)}
          className={commonInputClasses}
        >
          {PROGRAMMING_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="targetLanguage" className={commonLabelClasses}>
          Target Language
        </label>
        <select
          id="targetLanguage"
          name="targetLanguage"
          value={formData.targetLanguage}
          onChange={(e) => onInputChange(FormField.TargetLanguage, e.target.value)}
          className={commonInputClasses}
        >
          {PROGRAMMING_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Finding Packages...
          </>
        ) : (
          'Find Similar Packages'
        )}
      </button>
    </form>
  );
};

export default PackageFinderForm;
    