import React, { useState, useEffect } from 'react';
import { Search, Download } from 'lucide-react';
import WordForm from './components/WordForm';
import WordList from './components/WordList';
import Stats from './components/Stats';
import { Button } from './components/ui/Button';
import { getEntries, searchEntries, exportToCSV, updateEntry } from './utils/storage';
import { WordEntry } from './types';

function App() {
  const [entries, setEntries] = useState<WordEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadEntries = () => {
      const data = searchQuery ? searchEntries(searchQuery) : getEntries();
      setEntries(data);
    };

    loadEntries();
    window.addEventListener('storage', loadEntries);
    return () => window.removeEventListener('storage', loadEntries);
  }, [searchQuery]);

  const handleExport = () => {
    const csv = exportToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vocabulary-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleTranslationUpdate = (id: string, lang: string, translation: string) => {
    const entry = entries.find(e => e.id === id);
    if (entry) {
      const translations = { ...(entry.translations || {}), [lang]: translation };
      updateEntry(id, { translations });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">English Learning Tracker</h1>
          <Button
            onClick={handleExport}
            icon={Download}
            variant="success"
          >
            Export CSV
          </Button>
        </div>

        <Stats entries={entries} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <WordForm />
          </div>
          
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search words or meanings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <WordList
              entries={entries}
              searchQuery={searchQuery}
              onTranslationUpdate={handleTranslationUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;