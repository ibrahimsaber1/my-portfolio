// src/components/TranslationWidget/TranslationWidget.jsx
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FiGlobe, FiCheck, FiLoader } from 'react-icons/fi';
import './TranslationWidget.css';

const TranslationWidget = ({ text, onTranslated }) => {
  const { translateText, isTranslating, languages, currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleTranslate = async (targetLang) => {
    if (targetLang === currentLanguage) return;
    
    const translatedText = await translateText(text, targetLang);
    if (onTranslated && translatedText) {
      onTranslated(translatedText);
    }
    setIsOpen(false);
  };
  
  return (
    <div className="translation-widget">
      <button 
        className="translate-button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isTranslating}
      >
        {isTranslating ? <FiLoader className="spinning" /> : <FiGlobe />}
        <span>Translate</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${currentLanguage === lang.code ? 'active' : ''}`}
              onClick={() => handleTranslate(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-name">{lang.name}</span>
              {currentLanguage === lang.code && <FiCheck />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TranslationWidget;