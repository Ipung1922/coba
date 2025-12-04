import React from 'react';
import { ViewState } from '../types';
import { Atom3D } from '../components/Atom3D';
import { BookOpen, Gamepad2, BrainCircuit, MessageCircle, ArrowRight } from 'lucide-react';

interface HomeProps {
  onChangeView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onChangeView }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="z-10 text-center max-w-4xl w-full">
        <div className="flex justify-center mb-8 animate-float">
            <Atom3D />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-400 to-neon-purple mb-6 drop-shadow-lg">
          Konfigurasi Elektron
        </h1>
        <h2 className="text-xl md:text-2xl text-science-100 mb-12 font-light">
          Jelajahi dunia subatomik berdasarkan <span className="text-neon-cyan font-bold">Kulit Atom (Bohr)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
           <button 
             onClick={() => onChangeView('MATERIAL')}
             className="group relative p-6 bg-science-800/40 backdrop-blur-md rounded-xl border border-science-700 hover:border-neon-cyan transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] text-left"
           >
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-neon-cyan/20 rounded-lg text-neon-cyan group-hover:scale-110 transition-transform">
                      <BookOpen size={28} />
                  </div>
                  <div>
                      <h3 className="text-xl font-bold text-white">Materi</h3>
                      <p className="text-sm text-gray-400 mt-1">Pelajari teori dasar, rumus, dan contoh.</p>
                  </div>
                  <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-neon-cyan" />
              </div>
           </button>

           <button 
             onClick={() => onChangeView('GAMES')}
             className="group relative p-6 bg-science-800/40 backdrop-blur-md rounded-xl border border-science-700 hover:border-neon-purple transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] text-left"
           >
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-neon-purple/20 rounded-lg text-neon-purple group-hover:scale-110 transition-transform">
                      <Gamepad2 size={28} />
                  </div>
                  <div>
                      <h3 className="text-xl font-bold text-white">Games Interaktif</h3>
                      <p className="text-sm text-gray-400 mt-1">Flipcard & Kalkulator Ajaib.</p>
                  </div>
                  <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-neon-purple" />
              </div>
           </button>

           <button 
             onClick={() => onChangeView('QUIZ')}
             className="group relative p-6 bg-science-800/40 backdrop-blur-md rounded-xl border border-science-700 hover:border-neon-blue transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] text-left"
           >
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-neon-blue/20 rounded-lg text-neon-blue group-hover:scale-110 transition-transform">
                      <BrainCircuit size={28} />
                  </div>
                  <div>
                      <h3 className="text-xl font-bold text-white">Latihan Soal</h3>
                      <p className="text-sm text-gray-400 mt-1">Uji pemahamanmu dengan 10 soal.</p>
                  </div>
                  <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-neon-blue" />
              </div>
           </button>

           <button 
             onClick={() => onChangeView('DISCUSSION')}
             className="group relative p-6 bg-science-800/40 backdrop-blur-md rounded-xl border border-science-700 hover:border-pink-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] text-left"
           >
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-pink-500/20 rounded-lg text-pink-500 group-hover:scale-110 transition-transform">
                      <MessageCircle size={28} />
                  </div>
                  <div>
                      <h3 className="text-xl font-bold text-white">Ruang Diskusi</h3>
                      <p className="text-sm text-gray-400 mt-1">Tanya jawab dengan teman.</p>
                  </div>
                  <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-pink-500" />
              </div>
           </button>
        </div>
      </div>
    </div>
  );
};

export default Home;