import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './views/Home';
import Material from './views/Material';
import Games from './views/Games';
import Quiz from './views/Quiz';
import Discussion from './views/Discussion';
import AskAI from './views/AskAI';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');

  const renderView = () => {
    switch (currentView) {
      case 'HOME': return <Home onChangeView={setCurrentView} />;
      case 'MATERIAL': return <Material />;
      case 'GAMES': return <Games />;
      case 'QUIZ': return <Quiz />;
      case 'DISCUSSION': return <Discussion />;
      case 'AI': return <AskAI />;
      default: return <Home onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-neon-cyan selection:text-black">
      <Navigation currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="min-h-[calc(100vh-64px)] pb-20 md:pb-0">
         <div className="animate-fade-in">
            {renderView()}
         </div>
      </main>

      {/* Global CSS for some utility animations not in Tailwind Config */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .perspective-1000 {
            perspective: 1000px;
        }
        .backface-hidden {
            backface-visibility: hidden;
        }
        .rotate-y-180 {
            transform: rotateY(180deg);
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default App;