import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { mockFirebase } from '../services/mockFirebase';
import { QuizResult } from '../types';
import { Trophy, CheckCircle, XCircle } from 'lucide-react';

const Quiz: React.FC = () => {
  const [step, setStep] = useState<'NAME' | 'QUIZ' | 'RESULT'>('NAME');
  const [userName, setUserName] = useState('');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step === 'RESULT' || step === 'NAME') {
        mockFirebase.getLeaderboard().then(setLeaderboard);
    }
  }, [step]);

  const handleStart = () => {
    if (userName.trim()) {
        setStep('QUIZ');
        setScore(0);
        setCurrentQIndex(0);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const isCorrect = optionIndex === QUIZ_QUESTIONS[currentQIndex].correctAnswer;
    if (isCorrect) setScore(s => s + 10); // 10 points per question

    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQIndex(c => c + 1);
    } else {
        finishQuiz(isCorrect ? score + 10 : score);
    }
  };

  const finishQuiz = async (finalScore: number) => {
      setLoading(true);
      const result: QuizResult = {
          name: userName,
          score: finalScore,
          date: new Date().toLocaleDateString()
      };
      await mockFirebase.saveScore(result);
      setScore(finalScore);
      setStep('RESULT');
      setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-12">
      
      {step === 'NAME' && (
        <div className="bg-science-900 border border-science-700 rounded-2xl p-8 shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-neon-blue mb-6">Latihan Soal</h2>
            <div className="mb-8">
                <input 
                    type="text" 
                    placeholder="Masukkan Nama Kamu" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-science-950 border border-science-600 rounded-lg p-4 text-white text-lg focus:border-neon-blue focus:outline-none"
                />
            </div>
            <button 
                onClick={handleStart}
                disabled={!userName.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold py-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                Mulai Quiz
            </button>
            
            {/* Mini Leaderboard Preview */}
            <div className="mt-8 pt-6 border-t border-science-800">
                <h3 className="text-sm font-bold text-gray-400 mb-4 flex items-center justify-center gap-2"><Trophy size={16}/> Skor Tertinggi</h3>
                <div className="space-y-2">
                    {leaderboard.slice(0, 3).map((l, i) => (
                        <div key={i} className="flex justify-between text-sm">
                            <span className="text-white">{i+1}. {l.name}</span>
                            <span className="text-neon-cyan font-bold">{l.score}</span>
                        </div>
                    ))}
                    {leaderboard.length === 0 && <span className="text-xs text-gray-500">Belum ada data</span>}
                </div>
            </div>
        </div>
      )}

      {step === 'QUIZ' && (
        <div className="bg-science-900 border border-science-700 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 text-sm">Soal {currentQIndex + 1}/{QUIZ_QUESTIONS.length}</span>
                <span className="text-neon-purple text-sm font-mono">Skor: {score}</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-8 min-h-[80px]">
                {QUIZ_QUESTIONS[currentQIndex].question}
            </h3>

            <div className="grid gap-4">
                {QUIZ_QUESTIONS[currentQIndex].options.map((opt, idx) => (
                    <button 
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="text-left p-4 rounded-lg border border-science-600 hover:bg-science-800 hover:border-neon-cyan transition-all text-gray-200"
                    >
                        {String.fromCharCode(65 + idx)}. {opt}
                    </button>
                ))}
            </div>
        </div>
      )}

      {step === 'RESULT' && (
        <div className="bg-science-900 border border-science-700 rounded-2xl p-8 shadow-2xl text-center">
             {loading ? <div className="animate-spin h-8 w-8 border-4 border-neon-blue rounded-full border-t-transparent mx-auto"></div> : (
                 <>
                    <h2 className="text-3xl font-bold text-white mb-2">Hasil Akhir</h2>
                    <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan my-6">
                        {score} <span className="text-2xl text-gray-400 font-normal">/ 100</span>
                    </div>
                    
                    <div className="flex justify-center gap-2 mb-8">
                        {score >= 70 ? (
                            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-full">
                                <CheckCircle size={20} /> Lulus
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-full">
                                <XCircle size={20} /> Belum Lulus
                            </div>
                        )}
                    </div>

                    <div className="bg-black/20 rounded-xl p-4 mb-6">
                        <h3 className="text-left text-sm font-bold text-neon-cyan mb-3">Papan Peringkat</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                             {leaderboard.map((l, i) => (
                                <div key={i} className={`flex justify-between text-sm p-2 rounded ${l.name === userName && l.score === score ? 'bg-white/10' : ''}`}>
                                    <span className="text-gray-200">{i+1}. {l.name}</span>
                                    <span className="font-bold text-neon-purple">{l.score}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={() => {
                            setUserName('');
                            setStep('NAME');
                        }}
                        className="bg-science-800 hover:bg-science-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Coba Lagi
                    </button>
                 </>
             )}
        </div>
      )}

    </div>
  );
};

export default Quiz;