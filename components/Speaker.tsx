
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

const VOICES = [
  { id: 'Kore', name: 'Kore (Balanced)' },
  { id: 'Puck', name: 'Puck (Cheerful)' },
  { id: 'Charon', name: 'Charon (Deep)' },
  { id: 'Fenrir', name: 'Fenrir (Energetic)' },
  { id: 'Zephyr', name: 'Zephyr (Smooth)' }
];

const Speaker: React.FC = () => {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('Kore');
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentSource, setCurrentSource] = useState<AudioBufferSourceNode | null>(null);

  const handleSynthesize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      if (currentSource) {
        currentSource.stop();
      }
      const { audioBuffer, audioCtx } = await GeminiService.textToSpeech(text, selectedVoice);
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.onended = () => setPlaying(false);
      
      source.start();
      setCurrentSource(source);
      setPlaying(true);
    } catch (err) {
      console.error(err);
      alert("Error generating speech.");
    } finally {
      setLoading(false);
    }
  };

  const handleStop = () => {
    if (currentSource) {
      currentSource.stop();
      setPlaying(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 max-w-4xl mx-auto">
      <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-emerald-400">Voice Synthesis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1 space-y-4">
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Select Voice</label>
            <div className="flex flex-col gap-2">
              {VOICES.map(voice => (
                <button
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  className={`px-4 py-3 rounded-xl text-left transition-all border ${
                    selectedVoice === voice.id 
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' 
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <div className="font-medium">{voice.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Speech Input</label>
            <textarea
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 focus:ring-2 focus:ring-emerald-500 outline-none transition-all h-64 resize-none leading-relaxed text-lg"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What would you like me to say? Type it here..."
            />
            
            <div className="flex gap-4">
              <button
                onClick={handleSynthesize}
                disabled={loading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.414 4.243 1 1 0 11-1.415-1.415A3.984 3.984 0 0013 10a3.984 3.984 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                )}
                {loading ? 'Synthesizing...' : 'Speak Text'}
              </button>
              
              {playing && (
                <button
                  onClick={handleStop}
                  className="px-6 py-4 bg-red-600/20 border border-red-500 text-red-400 rounded-xl hover:bg-red-600/30 transition-all font-bold"
                >
                  Stop
                </button>
              )}
            </div>
          </div>
        </div>

        {playing && (
          <div className="flex items-center justify-center p-6 bg-emerald-600/10 rounded-2xl border border-emerald-500/30 animate-pulse">
            <div className="flex gap-1 items-end h-8">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 bg-emerald-500 rounded-full" 
                  style={{ 
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s` 
                  }}
                />
              ))}
            </div>
            <span className="ml-4 text-emerald-400 font-medium tracking-wide">AI VOICE ACTIVE</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Speaker;
