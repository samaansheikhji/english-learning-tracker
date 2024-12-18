export interface WordEntry {
  id: string;
  word: string;
  meaning: string;
  exampleSentence: string;
  dateAdded: string;
  translations?: {
    [key: string]: string;
  };
}

export interface DateGroupedEntries {
  [key: string]: WordEntry[];
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface TranslationResponse {
  data: {
    translations: Array<{
      translatedText: string;
    }>;
  };
}