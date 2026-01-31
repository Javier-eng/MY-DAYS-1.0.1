
import React, { useState } from 'react';
import { StudioView } from './types';
import Writer from './components/Writer';
import Artist from './components/Artist';
import Speaker from './components/Speaker';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<StudioView>(StudioView.WRITER);

  const renderView = () => {
    switch (currentView) {
      case StudioView.WRITER: return <Writer />;
      case StudioView.ARTIST: return <Artist />;
      case StudioView.SPEAKER: return <Speaker />;
      default: return <Writer />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <nav className="h-20 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-2xl font-bold">L</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Lumina <span className="text-blue-500 font-medium">Studio</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <NavItem 
            active={currentView === StudioView.WRITER} 
            onClick={() => setCurrentView(StudioView.WRITER)}
            label="Writer"
            icon={<WriterIcon />}
            color="blue"
          />
          <NavItem 
            active={currentView === StudioView.ARTIST} 
            onClick={() => setCurrentView(StudioView.ARTIST)}
            label="Artist"
            icon={<ArtistIcon />}
            color="purple"
          />
          <NavItem 
            active={currentView === StudioView.SPEAKER} 
            onClick={() => setCurrentView(StudioView.SPEAKER)}
            label="Speaker"
            icon={<SpeakerIcon />}
            color="emerald"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Gemini Flash 2.5/3.0 Powered
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-950">
        <div className="max-w-7xl mx-auto h-full">
          {renderView()}
        </div>
      </main>

      {/* Mobile Nav */}
      <div className="md:hidden h-20 bg-slate-900 border-t border-slate-800 grid grid-cols-3">
        <MobileNavItem 
          active={currentView === StudioView.WRITER} 
          onClick={() => setCurrentView(StudioView.WRITER)}
          icon={<WriterIcon />}
          label="Writer"
        />
        <MobileNavItem 
          active={currentView === StudioView.ARTIST} 
          onClick={() => setCurrentView(StudioView.ARTIST)}
          icon={<ArtistIcon />}
          label="Artist"
        />
        <MobileNavItem 
          active={currentView === StudioView.SPEAKER} 
          onClick={() => setCurrentView(StudioView.SPEAKER)}
          icon={<SpeakerIcon />}
          label="Speaker"
        />
      </div>
    </div>
  );
};

// Sub-components
const NavItem = ({ active, onClick, label, icon, color }: any) => {
  const colorMap: any = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-semibold ${
        active 
        ? `${colorMap[color]} shadow-lg` 
        : 'text-slate-400 hover:text-white hover:bg-slate-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const MobileNavItem = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 transition-all ${
      active ? 'text-blue-500' : 'text-slate-500'
    }`}
  >
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

// Icons
const WriterIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const ArtistIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const SpeakerIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
);

export default App;
