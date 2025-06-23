
import React, { useState, useCallback } from 'react';
import PackageFinderForm from './components/PackageFinderForm';
import PackageResultCard from './components/PackageResultCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { findSimilarPackages } from './services/geminiService';
import { PackageSuggestion, FormField } from './types';
import { DEFAULT_SOURCE_LANGUAGE, DEFAULT_TARGET_LANGUAGE } from './constants';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    sourcePackage: '',
    sourceLanguage: DEFAULT_SOURCE_LANGUAGE,
    targetLanguage: DEFAULT_TARGET_LANGUAGE,
  });
  const [results, setResults] = useState<PackageSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleInputChange = useCallback((field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults([]);
    setHasSearched(true);

    if (!process.env.API_KEY) {
        setError("Gemini API Key is not configured. Please ensure the API_KEY environment variable is set in your execution environment.");
        setIsLoading(false);
        return;
    }

    try {
      const { sourcePackage, sourceLanguage, targetLanguage } = formData;
      if (sourceLanguage === targetLanguage) {
        setError("Source and Target languages cannot be the same. Please select different languages.");
        setIsLoading(false);
        return;
      }
      const suggestions = await findSimilarPackages(sourcePackage, sourceLanguage, targetLanguage);
      setResults(suggestions);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 mb-2">
          Package Pal
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Discover equivalent or similar software packages across different programming languages with the power of AI.
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <PackageFinderForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {!isLoading && !error && hasSearched && results.length === 0 && (
          <div className="mt-8 text-center bg-slate-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold text-sky-400 mb-2">No Suggestions Found</h3>
            <p className="text-slate-300">
              We couldn't find any similar packages for your query. Try refining your search terms or check the languages selected.
            </p>
          </div>
        )}

        {!isLoading && !error && results.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-sky-300">
              Suggested Packages
            </h2>
            <div className="space-y-6">
              {results.map((pkg, index) => (
                <PackageResultCard key={`${pkg.name}-${index}`} packageInfo={pkg} index={index} />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Package Pal. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
    