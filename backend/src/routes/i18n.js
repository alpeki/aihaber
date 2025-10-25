import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load translations
const translations = {
  tr: JSON.parse(readFileSync(join(__dirname, '../locales/tr.json'), 'utf-8')),
  en: JSON.parse(readFileSync(join(__dirname, '../locales/en.json'), 'utf-8'))
};

// GET all translations for a language
router.get('/:lang', (req, res) => {
  const { lang } = req.params;
  
  if (!translations[lang]) {
    return res.status(404).json({ 
      error: 'Language not found',
      available: Object.keys(translations)
    });
  }
  
  res.json({
    language: lang,
    translations: translations[lang]
  });
});

// GET specific translation key
router.get('/:lang/:section/:key?', (req, res) => {
  const { lang, section, key } = req.params;
  
  if (!translations[lang]) {
    return res.status(404).json({ error: 'Language not found' });
  }
  
  if (!translations[lang][section]) {
    return res.status(404).json({ error: 'Section not found' });
  }
  
  if (key) {
    if (!translations[lang][section][key]) {
      return res.status(404).json({ error: 'Translation key not found' });
    }
    return res.json({
      language: lang,
      section,
      key,
      value: translations[lang][section][key]
    });
  }
  
  res.json({
    language: lang,
    section,
    translations: translations[lang][section]
  });
});

// GET available languages
router.get('/', (req, res) => {
  res.json({
    languages: Object.keys(translations).map(lang => ({
      code: lang,
      name: lang === 'tr' ? 'Türkçe' : 'English',
      native: lang === 'tr' ? 'Türkçe' : 'English'
    }))
  });
});

export default router;
