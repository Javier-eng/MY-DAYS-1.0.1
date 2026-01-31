
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

const Artist: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "9:16">("1:1");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const result = await GeminiService.generateImage(prompt, aspectRatio);
      setImage(result);
    } catch (err) {
      console.error(err);
      alert("Error generating image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      <div className="w-full md:w-80 space-y-6">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-purple-400">Art Studio</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Aspect Ratio</label>
              <div className="flex gap-2">
                {(["1:1", "16:9", "9:16"] as const).map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                      aspectRatio === ratio 
                      ? 'bg-purple-600 border-purple-500 text-white' 
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Prompt</label>
              <textarea 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all h-32 resize-none text-sm"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create..."
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98]"
            >
              {loading ? 'Synthesizing...' : 'Create Masterpiece'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-900/80 rounded-2xl border border-slate-700 p-4 flex items-center justify-center relative overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="text-slate-400 animate-pulse">Painting your imagination...</p>
          </div>
        ) : image ? (
          <div className="relative group max-h-full max-w-full">
            <img 
              src={image} 
              alt="Generated" 
              className={`rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.01] object-contain ${
                aspectRatio === '16:9' ? 'aspect-video' : aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-square'
              } max-h-[70vh]`}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl backdrop-blur-[2px]">
              <a 
                href={image} 
                download={`lumina-${Date.now()}.png`}
                className="bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
              >
                Download
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto opacity-40">
              <svg className="w-12 h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-slate-500">Visualizations will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artist;
