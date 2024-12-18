import React, { useState } from 'react';
import { Globe, AlertCircle } from 'lucide-react';
import { WordEntry } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { SUPPORTED_LANGUAGES } from '../constants/languages';

interface Props {
  entry: WordEntry;
  onTranslationUpdate: (id: string, lang: string, translation: string) => void;
}

export function WordCard({ entry, onTranslationUpdate }: Props) {
  const [selectedLang, setSelectedLang] = useState<string>('ur');
  const { translate, isLoading, error } = useTranslation();

  const handleTranslate = async () => {
    const translation = await translate(entry.word, selectedLang);
    if (translation) {
      onTranslationUpdate(entry.id, selectedLang, translation);
    }
  };

  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-medium text-gray-900">{entry.word}</h4>
          <p className="mt-1 text-gray-600">{entry.meaning}</p>
          <p className="mt-2 text-sm text-gray-500 italic">"{entry.exampleSentence}"</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            options={SUPPORTED_LANGUAGES.map((lang) => ({
              value: lang.code,
              label: `${lang.name} (${lang.nativeName})`,
            }))}
            className="w-40"
          />
          <Button
            onClick={handleTranslate}
            icon={Globe}
            isLoading={isLoading}
            variant="secondary"
          >
            Translate
          </Button>
        </div>
      </div>
      {error && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
      {entry.translations && Object.entries(entry.translations).length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Translations:</h5>
          <div className="space-y-1">
            {Object.entries(entry.translations).map(([lang, text]) => {
              const language = SUPPORTED_LANGUAGES.find(l => l.code === lang);
              return (
                <p key={lang} className="text-sm">
                  <span className="font-medium">{language?.name}:</span>{' '}
                  <span className="text-gray-600">{text}</span>
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}