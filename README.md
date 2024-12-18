# English Learning Tracker

A web application to track your daily English vocabulary learning progress with translation support.

## Features

- Add new words with meanings and example sentences
- Automatic date tracking for entries
- Translation support for multiple languages
- Search functionality
- Export data to CSV
- Progress statistics

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. (Optional) Add your Google Cloud Translation API key to `.env`
   - If no API key is provided, the app will use mock translations in development

5. Start the development server:
   ```bash
   npm run dev
   ```

## Translation Service

The application supports two modes for translations:

### Development Mode
- Uses mock translations for common words
- No API key required
- Indicates translations with language codes for unknown words

### Production Mode
- Requires a Google Cloud Translation API key
- Set the API key in the `.env` file
- Provides real-time translations for any word

## Building for Production

```bash
npm run build
```

## License

MIT