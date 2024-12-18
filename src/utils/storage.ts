import { WordEntry } from '../types';

const STORAGE_KEY = 'wordEntries';

export const saveEntry = (entry: WordEntry): void => {
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new Event('storage'));
};

export const updateEntry = (id: string, updates: Partial<WordEntry>): void => {
  const entries = getEntries();
  const index = entries.findIndex(entry => entry.id === id);
  if (index !== -1) {
    entries[index] = { ...entries[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    window.dispatchEvent(new Event('storage'));
  }
};

export const getEntries = (): WordEntry[] => {
  const entries = localStorage.getItem(STORAGE_KEY);
  return entries ? JSON.parse(entries) : [];
};

export const searchEntries = (query: string): WordEntry[] => {
  const entries = getEntries();
  const lowercaseQuery = query.toLowerCase();
  return entries.filter(
    entry =>
      entry.word.toLowerCase().includes(lowercaseQuery) ||
      entry.meaning.toLowerCase().includes(lowercaseQuery)
  );
};

export const exportToCSV = (): string => {
  const entries = getEntries();
  const headers = ['Date', 'Word', 'Meaning', 'Example Sentence', 'Translations'];
  const csvRows = [headers];

  entries.forEach(entry => {
    const translations = entry.translations
      ? Object.entries(entry.translations)
          .map(([lang, text]) => `${lang}: ${text}`)
          .join('; ')
      : '';

    csvRows.push([
      entry.dateAdded,
      entry.word,
      entry.meaning,
      entry.exampleSentence,
      translations,
    ]);
  });

  return csvRows.map(row => row.join(',')).join('\n');
};