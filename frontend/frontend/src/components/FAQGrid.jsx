import React from 'react';
import { translations } from '../utils/translations.js';
import './FAQGrid.css';

const FAQGrid = ({ currentLanguage, onFAQClick }) => {
  const faqItems = [
    {
      id: 'admissions',
      icon: '🎓',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'courses',
      icon: '📚',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'placements',
      icon: '💼',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'fees',
      icon: '💰',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: 'campus',
      icon: '🏛️',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 'contact',
      icon: '📞',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  return (
    <div className="faq-grid">
      {faqItems.map((item) => (
        <div 
          key={item.id}
          className="faq-tile"
          onClick={() => onFAQClick(item.id)}
        >
          <div className="faq-tile-inner">
            <div className="faq-icon" style={{ background: item.gradient }}>
              <span>{item.icon}</span>
            </div>
            <h3 className="faq-title">
              {translations[currentLanguage][item.id] || item.id}
            </h3>
            <p className="faq-description">
              {translations[currentLanguage][`${item.id}_desc`] || `Learn more about ${item.id}`}
            </p>
            <div className="faq-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7,7 17,7 17,17"></polyline>
              </svg>
            </div>
          </div>
          <div className="faq-tile-background"></div>
        </div>
      ))}
    </div>
  );
};

export default FAQGrid;