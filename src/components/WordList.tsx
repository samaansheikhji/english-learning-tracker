import React from 'react';
import { Book } from 'lucide-react';
import { WordEntry, DateGroupedEntries } from '../types';
import { WordCard } from './WordCard';

interface Props {
  entries: WordEntry[];
  searchQuery: string;
  onTranslationUpdate: (id: string, lang: string, translation: string) => void;
}

export default function WordList({ entries, searchQuery, onTranslationUpdate }: Props) {
  const groupedEntries = entries.reduce((acc: DateGroupedEntries, entry) => {
    if (!acc[entry.dateAdded]) {
      acc[entry.dateAdded] = [];
    }
    acc[entry.dateAdded].push(entry);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedEntries).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  if (entries.length === 0) {
    return (
      <div className="text-center py-10">
        <Book className="w-12 h-12 mx-auto text-gray-400" />
        <p className="mt-4 text-gray-500">
          {searchQuery ? 'No words found matching your search' : 'No words added yet'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedDates.map(date => (
        <div key={date} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h3 className="text-lg font-semibold text-gray-700">
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {groupedEntries[date].map(entry => (
              <WordCard
                key={entry.id}
                entry={entry}
                onTranslationUpdate={onTranslationUpdate}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}