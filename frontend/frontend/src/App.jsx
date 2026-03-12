import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import ChatInterface from './components/ChatInterface.jsx';
import FloatingLetters from './components/FloatingLetters.jsx';
import FAQGrid from './components/FAQGrid.jsx';
import { translations } from './utils/translations.js';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: translations[currentLanguage].bot_greeting,
      timestamp: new Date()
    }
  ]);

  const chatSessionRef = useRef(null);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    // Update bot greeting message with new language
    setMessages(prev => prev.map((msg, index) => 
      index === 0 ? { ...msg, content: translations[language].bot_greeting } : msg
    ));
  };

  const handleFAQClick = async (category) => {
    setIsChatOpen(true);
    
    const faqQueries = {
      admissions: translations[currentLanguage].faq_queries?.admissions || "Tell me about the admission process at CUTM",
      courses: translations[currentLanguage].faq_queries?.courses || "What courses are available at CUTM?", 
      placements: translations[currentLanguage].faq_queries?.placements || "How are the placement opportunities at CUTM?",
      fees: translations[currentLanguage].faq_queries?.fees || "What is the fee structure and scholarship options?",
      campus: translations[currentLanguage].faq_queries?.campus || "Tell me about campus life and facilities",
      contact: translations[currentLanguage].faq_queries?.contact || "How can I contact CUTM admissions office?"
    };

    const query = faqQueries[category] || "Hello, I need help";
    
    // Add user message
    const userMessage = {
      type: 'user',
      content: query,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Call backend API instead of Gemini directly
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      const botResponse = {
        type: 'bot',
        content: data.reply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending FAQ message:', error);
      const errorResponse = {
        type: 'bot',
        content: translations[currentLanguage].error_message || "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content) => {
    const userMessage = {
      type: 'user',
      content: content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Call backend API instead of Gemini directly
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content })
      });
      const data = await res.json();
      const botMessage = {
        type: 'bot',
        content: data.reply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        type: 'bot',
        content: translations[currentLanguage].error_message || "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <FloatingLetters />
      
      <Navbar 
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        showControls={!isChatOpen}
      />

      <div className="container">
        {!isChatOpen ? (
          <div className="welcome-section">
            <h1 className="welcome-title">
              {translations[currentLanguage].welcome_title || "Welcome to CUTM Marg Darshak"}
            </h1>
            <p className="welcome-subtitle">
              {translations[currentLanguage].welcome_subtitle || "Your personal AI assistant for everything related to Centurion University. Ask me anything!"}
            </p>
            
            <FAQGrid 
              currentLanguage={currentLanguage}
              onFAQClick={handleFAQClick}
            />

            <button 
              className="start-chat-btn" 
              onClick={() => setIsChatOpen(true)}
            >
              {translations[currentLanguage].start_chat || "Start Chatting"}
            </button>
          </div>
        ) : (
          <ChatInterface
            messages={messages}
            currentLanguage={currentLanguage}
            onSendMessage={handleSendMessage}
            onClose={() => setIsChatOpen(false)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;
