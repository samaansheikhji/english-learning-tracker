import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { WordEntry } from '../types';
import { saveEntry } from '../utils/storage';

export default function WordForm() {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: WordEntry = {
      id: Date.now().toString(),
      word,
      meaning,
      exampleSentence,
      dateAdded: new Date().toISOString().split('T')[0],
    };

    saveEntry(newEntry);
    setWord('');
    setMeaning('');
    setExampleSentence('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Word</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="word" className="block text-sm font-medium text-gray-700">
            Word
          </label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="meaning" className="block text-sm font-medium text-gray-700">
            Meaning
          </label>
          <input
            type="text"
            id="meaning"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="example" className="block text-sm font-medium text-gray-700">
            Example Sentence
          </label>
          <textarea
            id="example"
            value={exampleSentence}
            onChange={(e) => setExampleSentence(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Word
        </button>
      </div>
    </form>
  );
}