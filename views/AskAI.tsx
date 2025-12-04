import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Send, Sparkles, User, Bot, Trash2 } from 'lucide-react';
import { ChatMessage } from '../types';

const AskAI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize AI Client
  // Note: Chat session state is not persisted across view changes in this simple demo,
  // but we initialize the history with a system prompt context conceptually.
  const aiRef = useRef<any>(null);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    // Scroll to bottom on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initChat = () => {
    if (!aiRef.current) {
        aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    
    chatRef.current = aiRef.current.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `Anda adalah "Profesor Atom", guru kimia virtual yang ramah, seru, dan pintar. 
            Target audiens Anda adalah siswa sekolah yang sedang belajar Konfigurasi Elektron (Model Bohr).
            
            Panduan Menjawab:
            1. Jelaskan dengan bahasa sederhana dan gunakan analogi (misal: kulit atom seperti barisan kursi di bioskop, atau lapisan bawang).
            2. Jika siswa bertanya tentang unsur tertentu, SELALU sertakan Konfigurasi Elektron Kulitnya (Contoh: Natrium (Na) = 2.8.1).
            3. Jika pertanyaan di luar topik kimia/sains, arahkan kembali ke topik atom dengan sopan dan jenaka.
            4. Gunakan format Markdown (bold, list, code block) agar mudah dibaca.
            5. Jadilah suportif dan beri semangat.`,
        }
    });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!chatRef.current) initChat();

    const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
        // Add placeholder for AI response
        const aiMsgId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, {
            id: aiMsgId,
            role: 'model',
            text: '',
            isStreaming: true
        }]);

        const result = await chatRef.current!.sendMessageStream({ message: userMsg.text });
        
        let fullText = '';
        for await (const chunk of result) {
            const c = chunk as GenerateContentResponse;
            if (c.text) {
                fullText += c.text;
                setMessages(prev => prev.map(msg => 
                    msg.id === aiMsgId 
                        ? { ...msg, text: fullText } 
                        : msg
                ));
            }
        }
        
        setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId 
                ? { ...msg, isStreaming: false } 
                : msg
        ));

    } catch (error) {
        console.error("AI Error:", error);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'model',
            text: "Maaf, sirkuit saya sedang gangguan (Error koneksi). Coba tanya lagi ya!",
            isStreaming: false
        }]);
    } finally {
        setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    chatRef.current = null; // Reset session context
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-4 flex justify-between items-center border-b border-science-700 pb-4">
        <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-green-400 flex items-center gap-2">
                <Sparkles className="text-yellow-400" /> Tanya Profesor Atom
            </h1>
            <p className="text-gray-400 text-sm mt-1">Asisten pintar untuk semua pertanyaan struktur atommu!</p>
        </div>
        {messages.length > 0 && (
            <button 
                onClick={clearChat}
                className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-900/20 transition-colors"
                title="Hapus Chat"
            >
                <Trash2 size={20} />
            </button>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-60 animate-float">
                <div className="w-24 h-24 bg-science-800 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_#0ea5e9]">
                    <Bot size={48} className="text-neon-cyan" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Halo! Saya Profesor Atom.</h3>
                <p className="max-w-md text-gray-300">
                    Bingung soal kulit K, L, M? Atau mau tau konfigurasi elektron dari Emas? Tanya saja di sini!
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {["Apa itu elektron valensi?", "Konfigurasi atom Oksigen?", "Kenapa kulit pertama cuma 2?", "Analogi kulit atom"].map(q => (
                        <button 
                            key={q}
                            onClick={() => { setInput(q); handleSend(); }} // Quick fix: handled by useEffect ideally or state logic, but this needs user click to send usually. 
                            className="bg-science-800/50 hover:bg-science-700 border border-science-600 rounded-full px-4 py-2 text-sm text-neon-cyan transition-colors"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {messages.map((msg) => (
            <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
                <div className={`w-10 h-10 min-w-[40px] rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-pink-600' : 'bg-science-700 border border-neon-cyan'}`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} className="text-neon-cyan" />}
                </div>
                
                <div className={`rounded-2xl p-4 max-w-[85%] text-sm md:text-base leading-relaxed ${
                    msg.role === 'user' 
                        ? 'bg-pink-600/20 border border-pink-500/30 text-white rounded-tr-none' 
                        : 'bg-science-800/80 border border-science-700 text-gray-100 rounded-tl-none shadow-lg'
                }`}>
                    <div className="whitespace-pre-wrap font-sans">
                        {msg.text}
                        {msg.isStreaming && <span className="inline-block w-2 h-4 ml-1 bg-neon-cyan animate-pulse"/>}
                    </div>
                </div>
            </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="relative">
         <div className="relative flex items-center gap-2 bg-science-900 border border-science-600 rounded-xl p-2 shadow-2xl focus-within:border-neon-cyan focus-within:ring-1 focus-within:ring-neon-cyan transition-all">
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pertanyaanmu tentang atom..."
                className="flex-1 bg-transparent text-white px-4 py-3 focus:outline-none placeholder-gray-500"
                disabled={isLoading}
            />
            <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className={`p-3 rounded-lg flex items-center justify-center transition-all ${
                    !input.trim() || isLoading 
                    ? 'bg-science-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-br from-neon-cyan to-blue-600 text-white hover:scale-105 shadow-[0_0_15px_rgba(14,165,233,0.4)]'
                }`}
            >
                {isLoading ? (
                    <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                ) : (
                    <Send size={20} />
                )}
            </button>
         </div>
      </form>
    </div>
  );
};

export default AskAI;