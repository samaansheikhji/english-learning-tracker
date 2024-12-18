import { TranslationResponse } from '../types';

// Mock translations for development
const MOCK_TRANSLATIONS: Record<string, Record<string, string>> = {
  hello: {
    ur: 'ہیلو',
    hi: 'नमस्ते',
    es: 'hola',
    fr: 'bonjour',
    de: 'hallo',
    ar: 'مرحبا',
    zh: '你好',
    ja: 'こんにちは'
  },
  world: {
    ur: 'دنیا',
    hi: 'दुनिया',
    es: 'mundo',
    fr: 'monde',
    de: 'welt',
    ar: 'عالم',
    zh: '世界',
    ja: '世界'
  }
};

const IS_DEVELOPMENT = import.meta.env.DEV;
const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
const GOOGLE_TRANSLATE_API = 'https://translation.googleapis.com/language/translate/v2';

function getMockTranslation(text: string, targetLang: string): string {
  const normalizedText = text.toLowerCase();
  if (MOCK_TRANSLATIONS[normalizedText]?.[targetLang]) {
    return MOCK_TRANSLATIONS[normalizedText][targetLang];
  }
  // If no mock translation exists, return the original text with a language indicator
  return `[${targetLang}] ${text}`;
}

export async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    // Use mock translations in development
    if (IS_DEVELOPMENT || !API_KEY) {
      return getMockTranslation(text, targetLang);
    }

    const response = await fetch(
      `${GOOGLE_TRANSLATE_API}?key=${API_KEY}&q=${encodeURIComponent(
        text
      )}&target=${targetLang}`
    );
    
    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`);
    }

    const data: TranslationResponse = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    // Return a formatted version of the original text to indicate translation failure
    return `(Translation failed) ${text}`;
  }
}