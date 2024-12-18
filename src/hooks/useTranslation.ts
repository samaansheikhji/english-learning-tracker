import { useState } from 'react';
import { translateText } from '../services/translation';

export function useTranslation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translate = async (text: string, targetLang: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const translation = await translateText(text, targetLang);
      setIsLoading(false);
      return translation;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation failed');
      setIsLoading(false);
      return null;
    }
  };

  return { translate, isLoading, error };
}