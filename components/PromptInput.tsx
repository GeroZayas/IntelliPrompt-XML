
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      onSubmit();
    }
  };
  
  return (
    <div>
      <label htmlFor="prompt-input" className="block text-sm font-medium text-slate-300 mb-2">
        Enter your prompt
      </label>
      <div className="relative">
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Design a database schema for a blog with posts, comments, and users..."
          className="w-full h-36 p-4 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
          disabled={isLoading}
        />
        <p className="absolute bottom-2 right-3 text-xs text-slate-500">
          ⌘+Enter to submit
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <SparklesIcon className="w-5 h-5" />
          )}
          <span>{isLoading ? 'Analyzing...' : 'Analyze & Optimize'}</span>
        </button>
      </div>
    </div>
  );
};
