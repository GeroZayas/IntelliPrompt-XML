
import React from 'react';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { Loader } from './Loader';

interface PromptSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  isLoading: boolean;
}

const SuggestionSkeleton: React.FC = () => (
  <div className="bg-slate-800 p-4 rounded-lg animate-pulse">
    <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
  </div>
);


export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ suggestions, onSelect, isLoading }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <SuggestionSkeleton />
          <SuggestionSkeleton />
          <SuggestionSkeleton />
        </div>
      );
    }
    if (suggestions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
          <LightBulbIcon className="w-16 h-16 mb-4" />
          <p className="text-lg font-medium">Prompt Suggestions</p>
          <p className="text-sm">Optimized prompts will appear here.</p>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="w-full text-left p-4 bg-slate-800 rounded-lg hover:bg-slate-700/70 border border-slate-700 hover:border-indigo-500 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <p className="text-slate-300">{suggestion}</p>
          </button>
        ))}
      </div>
    );
  };
  
  return (
     <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg h-full min-h-[400px] flex flex-col border border-slate-700">
      <h2 className="text-xl font-semibold text-slate-200 mb-4">Optimized Prompts</h2>
      <div className="flex-grow">
       {renderContent()}
      </div>
    </div>
  );
};
