import React, { useState } from 'react';
import { FLIPCARD_DATA } from '../constants';
import { Calculator, Grid2X2, RefreshCw } from 'lucide-react';
import { ElementData } from '../types';

type GameMode = 'MENU' | 'CALCULATOR' | 'FLIPCARD';

const Games: React.FC = () => {
  const [mode, setMode] = useState<GameMode>('MENU');

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 h-full">
      {mode === 'MENU' && <GameMenu onSelect={setMode} />}
      {mode === 'CALCULATOR' && <MagicCalculator onBack={() => setMode('MENU')} />}
      {mode === 'FLIPCARD' && <FlipCardGame onBack={() => setMode('MENU')} />}
    </div>
  );
};

// --- Sub-Components ---

const GameMenu: React.FC<{ onSelect: (m: GameMode) => void }> = ({ onSelect }) => (
  <div className="flex flex-col items-center justify-center h-full space-y-8 animate-float">
    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
      Game Zone
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
      <button 
        onClick={() => onSelect('CALCULATOR')}
        className="group flex flex-col items-center p-8 bg-science-800 rounded-2xl border-2 border-transparent hover:border-neon-cyan transition-all hover:scale-105"
      >
        <Calculator size={64} className="text-neon-cyan mb-4 group-hover:rotate-12 transition-transform" />
        <h2 className="text-2xl font-bold text-white">Kalkulator Ajaib</h2>
        <p className="text-center text-gray-400 mt-2">Masukkan nomor atom, lihat konfigurasinya secara instan!</p>
      </button>

      <button 
        onClick={() => onSelect('FLIPCARD')}
        className="group flex flex-col items-center p-8 bg-science-800 rounded-2xl border-2 border-transparent hover:border-neon-purple transition-all hover:scale-105"
      >
        <Grid2X2 size={64} className="text-neon-purple mb-4 group-hover:rotate-12 transition-transform" />
        <h2 className="text-2xl font-bold text-white">Flipcard Memory</h2>
        <p className="text-center text-gray-400 mt-2">Cocokkan unsur dengan konfigurasi elektronnya.</p>
      </button>
    </div>
  </div>
);

const MagicCalculator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [atomicNumber, setAtomicNumber] = useState<number | ''>('');
  
  const calculateConfig = (z: number) => {
    if (z <= 0) return [];
    // Simplified Logic for Z <= 20
    const config = [];
    let electrons = z;
    
    // K Shell
    const k = Math.min(electrons, 2);
    config.push(k);
    electrons -= k;
    if (electrons === 0) return config;

    // L Shell
    const l = Math.min(electrons, 8);
    config.push(l);
    electrons -= l;
    if (electrons === 0) return config;

    // M Shell (Simplified rule: fill 8 first up to Ca=20)
    // Real chemistry is complex, but for Z<=20 (Ca), it's 2, 8, 8, 2
    if (z <= 20) {
        const m = Math.min(electrons, 8);
        config.push(m);
        electrons -= m;
        if (electrons === 0) return config;

        const n = electrons;
        config.push(n);
    } else {
        // Just a fallback for demo > 20 (not accurate for transition metals in Bohr model strictly)
        config.push(electrons); 
    }
    
    return config;
  };

  const config = typeof atomicNumber === 'number' ? calculateConfig(atomicNumber) : [];

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto bg-science-900 p-8 rounded-3xl shadow-2xl border border-science-700">
       <button onClick={onBack} className="self-start text-sm text-gray-400 hover:text-white mb-4">← Kembali</button>
       <h2 className="text-2xl font-bold text-neon-cyan mb-6">Kalkulator Konfigurasi</h2>
       
       <div className="w-full mb-8">
         <label className="block text-sm text-gray-400 mb-2">Masukkan Nomor Atom (Z ≤ 20)</label>
         <input 
           type="number" 
           max="20"
           min="1"
           value={atomicNumber}
           onChange={(e) => setAtomicNumber(Number(e.target.value))}
           className="w-full bg-science-950 border border-science-600 text-white rounded-lg p-4 text-center text-2xl focus:outline-none focus:border-neon-cyan transition-colors"
           placeholder="Contoh: 11"
         />
       </div>

       {typeof atomicNumber === 'number' && atomicNumber > 0 && atomicNumber <= 20 && (
         <div className="w-full animate-float">
            <div className="flex justify-center items-center gap-2 mb-4">
              {config.map((num, idx) => (
                <div key={idx} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold border-2 border-white/20 shadow-lg">
                      {num}
                    </div>
                    <span className="text-xs text-gray-400 mt-2">{String.fromCharCode(75+idx)}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-science-800/50 p-4 rounded-xl text-center">
               <p className="text-gray-300">
                 Elektron Valensi: <strong className="text-neon-purple">{config[config.length-1]}</strong>
               </p>
               <p className="text-gray-300">
                 Jumlah Kulit: <strong className="text-neon-blue">{config.length}</strong>
               </p>
            </div>
         </div>
       )}
       
       {typeof atomicNumber === 'number' && atomicNumber > 20 && (
           <p className="text-red-400 text-center">Untuk pemula, kalkulator ini dibatasi sampai nomor atom 20 (Kalsium).</p>
       )}
    </div>
  );
};

const FlipCardGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [cards, setCards] = useState<Array<{id: number, content: string, type: 'symbol'|'config', matched: boolean, flipped: boolean}>>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);

  // Initialize Game
  React.useEffect(() => {
    startNewGame();
    // eslint-disable-next-line
  }, []);

  const startNewGame = () => {
    // Select 6 random elements
    const shuffledData = [...FLIPCARD_DATA].sort(() => 0.5 - Math.random()).slice(0, 6);
    
    // Create pairs
    let gameCards = [];
    shuffledData.forEach((item, idx) => {
        gameCards.push({ id: idx, content: item.symbol, type: 'symbol', matched: false, flipped: false });
        gameCards.push({ id: idx, content: item.config, type: 'config', matched: false, flipped: false });
    });

    // Shuffle cards
    // @ts-ignore
    gameCards.sort(() => 0.5 - Math.random());
    // @ts-ignore
    setCards(gameCards);
    setFlippedIndices([]);
    setIsWon(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length >= 2 || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
        const idx1 = newFlipped[0];
        const idx2 = newFlipped[1];

        if (newCards[idx1].id === newCards[idx2].id) {
            // Match
            setTimeout(() => {
                const matchedCards = [...newCards];
                matchedCards[idx1].matched = true;
                matchedCards[idx2].matched = true;
                setCards(matchedCards);
                setFlippedIndices([]);
                
                if (matchedCards.every(c => c.matched)) setIsWon(true);
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                const resetCards = [...newCards];
                resetCards[idx1].flipped = false;
                resetCards[idx2].flipped = false;
                setCards(resetCards);
                setFlippedIndices([]);
            }, 1000);
        }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
        <div className="flex w-full justify-between items-center mb-6">
             <button onClick={onBack} className="text-sm text-gray-400 hover:text-white">← Kembali</button>
             <button onClick={startNewGame} className="flex items-center gap-2 bg-neon-purple hover:bg-purple-600 px-4 py-2 rounded-lg text-white font-bold transition-colors">
                <RefreshCw size={18} /> Restart
             </button>
        </div>

        {isWon ? (
            <div className="text-center animate-float py-12">
                <h2 className="text-4xl font-bold text-neon-cyan mb-4">Selamat! 🎉</h2>
                <p className="text-gray-300">Kamu berhasil mencocokkan semua konfigurasi.</p>
            </div>
        ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full">
                {cards.map((card, idx) => (
                    <div 
                        key={idx}
                        onClick={() => handleCardClick(idx)}
                        className={`aspect-square cursor-pointer perspective-1000 group relative h-24 md:h-32 rounded-xl transition-all duration-500 transform ${card.flipped || card.matched ? 'rotate-y-180' : ''}`}
                    >
                        <div className={`w-full h-full absolute transition-all duration-500 rounded-xl backface-hidden flex items-center justify-center text-2xl font-bold text-white shadow-lg 
                            ${card.flipped || card.matched 
                                ? 'bg-gradient-to-br from-neon-blue to-neon-purple rotate-y-180 opacity-100' 
                                : 'bg-science-800 hover:bg-science-700'
                            }`}
                        >
                           {/* Front content (when flipped) */}
                           {(card.flipped || card.matched) ? card.content : '?'}
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default Games;