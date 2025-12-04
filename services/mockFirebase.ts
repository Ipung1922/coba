import { DiscussionComment, QuizResult } from "../types";

// NOTE: In a real application, replace these localStorage implementations
// with actual Firebase Firestore calls.
// Example: import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const COMMENT_STORAGE_KEY = 'chem_app_comments';
const SCORE_STORAGE_KEY = 'chem_app_scores';

export const mockFirebase = {
  // --- Discussion Services ---
  getComments: async (): Promise<DiscussionComment[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = localStorage.getItem(COMMENT_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  addComment: async (name: string, content: string): Promise<DiscussionComment> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newComment: DiscussionComment = {
      id: Date.now().toString(),
      name,
      content,
      timestamp: new Date().toISOString(),
      replies: []
    };
    
    const existing = await mockFirebase.getComments();
    const updated = [newComment, ...existing];
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(updated));
    return newComment;
  },

  replyComment: async (parentId: string, name: string, content: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const comments = await mockFirebase.getComments();
    
    const updateRecursively = (list: DiscussionComment[]): DiscussionComment[] => {
        return list.map(c => {
            if (c.id === parentId) {
                const reply: DiscussionComment = {
                    id: Date.now().toString(),
                    name,
                    content,
                    timestamp: new Date().toISOString(),
                    replies: []
                };
                return { ...c, replies: [...c.replies, reply] };
            }
            if (c.replies.length > 0) {
                return { ...c, replies: updateRecursively(c.replies) };
            }
            return c;
        });
    };

    const updated = updateRecursively(comments);
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(updated));
  },

  // --- Quiz Services ---
  saveScore: async (result: QuizResult): Promise<void> => {
     await new Promise(resolve => setTimeout(resolve, 500));
     const data = localStorage.getItem(SCORE_STORAGE_KEY);
     const scores: QuizResult[] = data ? JSON.parse(data) : [];
     scores.push(result);
     // Keep top 10 scores
     scores.sort((a, b) => b.score - a.score);
     localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scores.slice(0, 10)));
  },

  getLeaderboard: async (): Promise<QuizResult[]> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = localStorage.getItem(SCORE_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
  }
};