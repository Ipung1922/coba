import React, { useState, useEffect } from 'react';
import { mockFirebase } from '../services/mockFirebase';
import { DiscussionComment } from '../types';
import { Send, User, MessageSquare } from 'lucide-react';

const Discussion: React.FC = () => {
  const [comments, setComments] = useState<DiscussionComment[]>([]);
  const [newName, setNewName] = useState('');
  const [newContent, setNewContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const data = await mockFirebase.getComments();
    setComments(data);
  };

  const handleJoin = () => {
      if(newName.trim()) setHasJoined(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    setSubmitting(true);
    await mockFirebase.addComment(newName, newContent);
    setNewContent('');
    await loadComments();
    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 h-full flex flex-col">
      <div className="mb-6 border-b border-science-700 pb-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
            Ruang Diskusi
        </h1>
        <p className="text-gray-400 text-sm mt-1">Diskusikan materi konfigurasi elektron di sini.</p>
      </div>

      {!hasJoined ? (
         <div className="flex-1 flex flex-col items-center justify-center animate-float">
             <div className="bg-science-900 p-8 rounded-2xl border border-science-700 w-full max-w-md shadow-2xl">
                 <h2 className="text-xl font-bold text-white mb-4">Bergabung dalam diskusi</h2>
                 <input 
                    type="text"
                    placeholder="Nama Panggilan"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full mb-4 bg-science-950 border border-science-600 rounded-lg p-3 text-white focus:border-pink-500 focus:outline-none"
                 />
                 <button 
                    onClick={handleJoin}
                    disabled={!newName.trim()}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                 >
                    Masuk
                 </button>
             </div>
         </div>
      ) : (
         <>
            {/* Comment List */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
                {comments.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">Belum ada diskusi. Jadilah yang pertama!</div>
                ) : (
                    comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="bg-science-900 p-4 rounded-xl border border-science-700 flex gap-3 sticky bottom-0">
                <div className="flex-1">
                    <input 
                        type="text" 
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder={`Tulis pesan sebagai ${newName}...`}
                        className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={submitting || !newContent.trim()}
                    className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50"
                >
                    {submitting ? <div className="animate-spin w-5 h-5 border-2 border-white rounded-full border-t-transparent"></div> : <Send size={20} />}
                </button>
            </form>
         </>
      )}
    </div>
  );
};

const CommentItem: React.FC<{ comment: DiscussionComment }> = ({ comment }) => (
    <div className="bg-science-800/40 rounded-xl p-4 border border-science-700/50">
        <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <User size={16} className="text-white" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-baseline">
                    <span className="font-bold text-neon-cyan">{comment.name}</span>
                    <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-gray-200 mt-1">{comment.content}</p>
                
                {/* Reply Mock UI (Not fully functional deep nesting for simplicity of single file demo) */}
                <div className="mt-3 flex gap-2 items-center text-xs text-gray-500 hover:text-white cursor-pointer transition-colors w-fit">
                    <MessageSquare size={12} /> Balas
                </div>

                {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-4 mt-3 pl-4 border-l-2 border-science-700 space-y-3">
                        {comment.replies.map(r => (
                            <div key={r.id} className="text-sm">
                                <span className="font-bold text-gray-400">{r.name}: </span>
                                <span className="text-gray-300">{r.content}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default Discussion;