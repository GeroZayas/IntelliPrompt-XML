
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { XmlDisplay } from './components/XmlDisplay';
import { PromptSuggestions } from './components/PromptSuggestions';
import { generateXmlFromPrompt, optimizePrompt } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Create a user profile for a new social media app. It should include fields for username, full name, bio, profile picture URL, and date of birth.');
  const [xmlOutput, setXmlOutput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setXmlOutput('');
    setSuggestions([]);

    try {
      const [xmlResult, suggestionsResult] = await Promise.all([
        generateXmlFromPrompt(prompt),
        optimizePrompt(prompt),
      ]);
      setXmlOutput(xmlResult);
      setSuggestions(suggestionsResult);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);
  
  const handleSuggestionSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PromptSuggestions
              suggestions={suggestions}
              onSelect={handleSuggestionSelect}
              isLoading={isLoading}
            />
            <XmlDisplay 
              xml={xmlOutput} 
              isLoading={isLoading} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
