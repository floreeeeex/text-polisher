import axios from 'axios';
import type { HistoryItem } from '../types/index';

const API_URL = 'http://localhost:3000';

// Funzione GET (Scarica storico)
export const getHistory = async (): Promise<HistoryItem[]> => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
};

// Funzione POST (Salva nuovo testo - ci servirà dopo)
export const addToHistory = async (text: string) => {
  const newItem = {
    text: text,
    date: new Date().toISOString().split('T')[0]
  };
  return await axios.post(`${API_URL}/history`, newItem);
};