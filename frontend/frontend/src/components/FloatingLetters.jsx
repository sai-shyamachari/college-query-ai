import React, { useEffect, useState } from 'react';
import './FloatingLetters.css';

const FloatingLetters = () => {
  const [letters, setLetters] = useState([]);

  // Letters from different languages
  const languageLetters = {
    english: ['A', 'B', 'C', 'U', 'T', 'M', 'E', 'D', 'U', 'C', 'A', 'T', 'I', 'O', 'N'],
    hindi: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'क', 'ख', 'ग', 'घ', 'च'],
    telugu: ['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఎ', 'ఏ', 'ఐ', 'ఓ', 'క', 'ఖ', 'గ', 'ఘ', 'చ'],
    tamil: ['அ', 'ஆ', 'இ', 'ఈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஓ', 'க', 'ख', 'গ', 'ঘ', 'চ'],
    bengali: ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'এ', 'ঐ', 'ও', 'ঔ', 'ক', 'খ', 'গ', 'ঘ', 'চ'],
    odia: ['ଅ', 'ଆ', 'ଇ', 'ଈ', 'ଉ', 'ଊ', 'ଏ', 'ଐ', 'ଓ', 'ଔ', 'କ', 'ଖ', 'ଗ', 'ଘ', 'ଚ']
  };

  const getAllLetters = () => {
    return [
      ...languageLetters.english,
      ...languageLetters.hindi,
      ...languageLetters.telugu,
      ...languageLetters.tamil,
      ...languageLetters.bengali,
      ...languageLetters.odia
    ];
  };

  useEffect(() => {
    const createFloatingLetter = () => {
      const allLetters = getAllLetters();
      const letter = allLetters[Math.floor(Math.random() * allLetters.length)];
      const id = Math.random().toString(36).substr(2, 9);
      const left = Math.random() * 100;
      const animationDuration = 15 + Math.random() * 10; // 15-25 seconds
      const size = 16 + Math.random() * 12; // 16-28px
      const opacity = 0.15 + Math.random() * 0.15; // 0.15-0.3

      return {
        id,
        letter,
        left,
        animationDuration,
        size,
        opacity
      };
    };

    const generateLetters = () => {
      const newLetters = [];
      for (let i = 0; i < 15; i++) {
        newLetters.push(createFloatingLetter());
      }
      setLetters(newLetters);
    };

    generateLetters();

    // Add new letters periodically
    const interval = setInterval(() => {
      setLetters(prev => {
        const newLetter = createFloatingLetter();
        const updatedLetters = [...prev, newLetter];
        
        // Keep only the latest 20 letters to prevent memory issues
        return updatedLetters.slice(-20);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-letters-container">
      {letters.map((letterData) => (
        <div
          key={letterData.id}
          className="floating-letter"
          style={{
            left: `${letterData.left}%`,
            fontSize: `${letterData.size}px`,
            opacity: letterData.opacity,
            animationDuration: `${letterData.animationDuration}s`
          }}
        >
          {letterData.letter}
        </div>
      ))}
    </div>
  );
};

export default FloatingLetters;