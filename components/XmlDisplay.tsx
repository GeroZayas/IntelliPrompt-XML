
import React, { useState, useEffect } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { Loader } from './Loader';

interface XmlDisplayProps {
  xml: string;
  isLoading: boolean;
}

export const XmlDisplay: React.FC<XmlDisplayProps> = ({ xml, isLoading }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (xml) {
      navigator.clipboard.writeText(xml);
      setCopied(true);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader message="Generating XML Structure..." />;
    }
    if (!xml) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
          <CodeBracketIcon className="w-16 h-16 mb-4" />
          <p className="text-lg font-medium">XML Output</p>
          <p className="text-sm">Your generated XML structure will appear here.</p>
        </div>
      );
    }
    return (
      <pre className="text-sm whitespace-pre-wrap overflow-x-auto text-cyan-300">
        <code>{xml}</code>
      </pre>
    );
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg h-full min-h-[400px] flex flex-col border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-200">Semantic XML</h2>
        <button
          onClick={handleCopy}
          disabled={!xml || isLoading}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {copied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="bg-black/50 rounded-lg p-4 flex-grow overflow-auto relative">
        {renderContent()}
      </div>
    </div>
  );
};
