// In src/services/translationService.js
import axios from 'axios';

// Replace with your actual Google Cloud API key
const API_KEY = 'YOUR_GOOGLE_API_KEY';

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: text,
        target: targetLanguage
      }
    );
    
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

export const batchTranslate = async (texts, targetLanguage) => {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: texts,
        target: targetLanguage
      }
    );
    
    return response.data.data.translations.map(t => t.translatedText);
  } catch (error) {
    console.error('Batch translation error:', error);
    throw error;
  }
};

// Modified LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { translateText, batchTranslate } from '../services/translationService';

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    react: {
      useSuspense: false
    }
  });

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setCurrentLanguage(langCode);
    // Update document direction for RTL languages
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
  };

  // New function to translate text dynamically using Google Translation API
  const translateDynamicContent = async (text, targetLang = currentLanguage) => {
    if (!text || targetLang === 'en') return text; // Skip translation for English as source
    
    setIsTranslating(true);
    try {
      const translated = await translateText(text, targetLang);
      setIsTranslating(false);
      return translated;
    } catch (error) {
      setIsTranslating(false);
      console.error("Translation failed:", error);
      return text; // Return original text on error
    }
  };

  // New function to translate multiple texts at once (more efficient)
  const translateBatch = async (textsArray, targetLang = currentLanguage) => {
    if (!textsArray || !textsArray.length || targetLang === 'en') 
      return textsArray;
    
    setIsTranslating(true);
    try {
      const translated = await batchTranslate(textsArray, targetLang);
      setIsTranslating(false);
      return translated;
    } catch (error) {
      setIsTranslating(false);
      console.error("Batch translation failed:", error);
      return textsArray; // Return original texts on error
    }
  };

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLanguage(lng);
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, []);

  const value = {
    currentLanguage,
    changeLanguage,
    languages,
    t: i18n.t,
    translateText: translateDynamicContent,
    translateBatch,
    isTranslating
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};