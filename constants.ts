import { Question, ElementData } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Berapa jumlah maksimum elektron yang dapat menempati kulit L (n=2)?",
    options: ["2", "8", "18", "32"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Rumus untuk menentukan jumlah maksimum elektron pada kulit ke-n adalah...",
    options: ["n²", "2n", "2n²", "2n + 2"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "Konfigurasi elektron dari atom Natrium (Nomor Atom 11) adalah...",
    options: ["2.9", "2.8.1", "2.8.8", "2.8.2"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Atom dengan konfigurasi elektron 2.8.6 terletak pada golongan...",
    options: ["VI A", "IV A", "VI B", "II A"],
    correctAnswer: 0,
  },
  {
    id: 5,
    question: "Periode suatu unsur dalam tabel periodik ditentukan oleh...",
    options: ["Jumlah elektron valensi", "Jumlah kulit atom", "Jumlah proton", "Jumlah neutron"],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Jika suatu atom memiliki konfigurasi 2.8.8.2, berapakah nomor atomnya?",
    options: ["18", "19", "20", "22"],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "Elektron yang berada pada kulit terluar disebut...",
    options: ["Elektron inti", "Elektron valensi", "Elektron bebas", "Elektron terikat"],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "Kulit N adalah kulit ke...",
    options: ["1", "2", "3", "4"],
    correctAnswer: 3,
  },
  {
    id: 9,
    question: "Konfigurasi elektron dari ion Cl⁻ (Nomor atom Cl=17) adalah...",
    options: ["2.8.7", "2.8.8", "2.8.6", "2.8.8.1"],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Unsur gas mulia memiliki elektron valensi stabil sebanyak...",
    options: ["2 atau 8", "4 atau 6", "1 atau 7", "8 atau 18"],
    correctAnswer: 0,
  },
];

export const FLIPCARD_DATA: ElementData[] = [
  { symbol: "H", name: "Hidrogen", number: 1, config: "1" },
  { symbol: "He", name: "Helium", number: 2, config: "2" },
  { symbol: "Li", name: "Litium", number: 3, config: "2.1" },
  { symbol: "C", name: "Karbon", number: 6, config: "2.4" },
  { symbol: "O", name: "Oksigen", number: 8, config: "2.6" },
  { symbol: "Ne", name: "Neon", number: 10, config: "2.8" },
  { symbol: "Na", name: "Natrium", number: 11, config: "2.8.1" },
  { symbol: "Cl", name: "Klorin", number: 17, config: "2.8.7" },
  { symbol: "K", name: "Kalium", number: 19, config: "2.8.8.1" },
  { symbol: "Ca", name: "Kalsium", number: 20, config: "2.8.8.2" },
];