import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiGlobe } from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/experience', label: t('nav.experience') },
    { path: '/contact', label: t('nav.contact') },
  ];

  if (isAuthenticated) {
    navLinks.push({ path: '/admin', label: t('nav.admin') });
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ibrahim Saber
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            <ul className="nav-links">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={location.pathname === link.path ? 'active' : ''}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Controls */}
            <div className="nav-controls">
              {/* Theme Toggle */}
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              {/* Language Selector */}
              <div className="language-selector">
                <button
                  className="lang-toggle"
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  aria-label="Change language"
                >
                  <FiGlobe size={20} />
                  <span>{currentLanguage.toUpperCase()}</span>
                </button>
                
                <AnimatePresence>
                  {showLangDropdown && (
                    <motion.div
                      className="lang-dropdown"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className={`lang-option ${currentLanguage === lang.code ? 'active' : ''}`}
                          onClick={() => {
                            changeLanguage(lang.code);
                            setShowLangDropdown(false);
                          }}
                        >
                          <span className="lang-flag">{lang.flag}</span>
                          <span className="lang-name">{lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="nav-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container">
              <ul className="mobile-links">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={location.pathname === link.path ? 'active' : ''}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mobile-controls">
                <button
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <div className="mobile-lang-selector">
                  <label>Language:</label>
                  <select
                    value={currentLanguage}
                    onChange={(e) => changeLanguage(e.target.value)}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;