
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

const Writer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('You are a creative writing assistant. Help me expand on ideas or write professional copy.');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const result = await GeminiService.generateText(prompt, systemPrompt);
      setContent(result);
    } catch (err) {
      console.error(err);
      alert("Error generating text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Writer's Studio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">AI Personality</label>
            <input 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="e.g. A helpful editor..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Write something...</label>
            <div className="flex gap-2">
              <input 
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What should we write today?"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-900/20"
              >
                {loading ? 'Thinking...' : 'Generate'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-900/80 rounded-2xl border border-slate-700 p-8 overflow-y-auto relative min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : content ? (
          <div className="prose prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-slate-200">
            {content}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
            <svg className="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <p>Your creative journey begins with a prompt above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Writer;
