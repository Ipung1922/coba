import React from 'react';
import { ViewState } from '../types';
import { Home, BookOpen, Gamepad2, BrainCircuit, MessageCircle, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView }) => {
  
  const navItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'HOME', label: 'Beranda', icon: <Home size={20} /> },
    { id: 'MATERIAL', label: 'Materi', icon: <BookOpen size={20} /> },
    { id: 'GAMES', label: 'Games', icon: <Gamepad2 size={20} /> },
    { id: 'AI', label: 'Tanya AI', icon: <Sparkles size={20} /> },
    { id: 'QUIZ', label: 'Latihan', icon: <BrainCircuit size={20} /> },
    { id: 'DISCUSSION', label: 'Diskusi', icon: <MessageCircle size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-science-950/80 backdrop-blur-lg border-t border-science-800 z-50 md:sticky md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between md:justify-center md:gap-6 items-center h-16 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-all duration-300 min-w-[60px] md:min-w-0
                ${currentView === item.id 
                  ? 'text-neon-cyan bg-science-800/50 scale-105' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-science-800/30'
                }`}
            >
              {item.icon}
              <span className="text-[10px] md:text-sm font-medium whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;