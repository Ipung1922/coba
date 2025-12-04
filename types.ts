export type ViewState = 'HOME' | 'MATERIAL' | 'GAMES' | 'QUIZ' | 'DISCUSSION' | 'AI';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
}

export interface QuizResult {
  name: string;
  score: number;
  date: string;
}

export interface DiscussionComment {
  id: string;
  name: string;
  content: string;
  timestamp: string;
  replies: DiscussionComment[];
}

export interface ElementData {
  symbol: string;
  name: string;
  number: number;
  config: string; // e.g., "2.8.1"
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}