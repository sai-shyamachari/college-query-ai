import React from 'react';
import './Navbar.css';

const Navbar = ({ currentLanguage, onLanguageChange, isDarkMode, onThemeToggle, showControls = true }) => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' }
  ];

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="logo">
          <div className="logo-icon">
            <span>🎓</span>
          </div>
          <div className="logo-text">
            <h1>CUTM</h1>
            <span>Marg Darshak</span>
          </div>
        </div>
      </div>
      
      <div className={`navbar-controls ${!showControls ? 'hidden' : ''}`}>
        <select 
          className="language-selector"
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
        
        <button 
          className="theme-toggle"
          onClick={onThemeToggle}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <a 
          href="https://cutm.ac.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="visit-cutm-btn"
        >
          Visit CUTM
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
            <polyline points="15,3 21,3 21,9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Navbar;