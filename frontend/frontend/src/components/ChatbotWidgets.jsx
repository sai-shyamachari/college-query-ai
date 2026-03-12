import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const ChatbotWidget = ({ isOpen, onToggle, language, darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize with welcome message
      const welcomeMessages = {
        en: "Hello! I'm your CUTM Assistant. How can I help you today?",
        hi: "नमस्ते! मैं आपका CUTM सहायक हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
        ta: "வணக்கம்! நான் உங்கள் CUTM உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        es: "¡Hola! Soy tu Asistente CUTM. ¿Cómo puedo ayudarte hoy?",
        fr: "Salut! Je suis votre Assistant CUTM. Comment puis-je vous aider aujourd'hui?"
      };

      setMessages([{
        id: 1,
        text: welcomeMessages[language] || welcomeMessages.en,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  }, [isOpen, language]);

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const sendMessage = (text) => {
    if (text.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate bot response
    simulateTyping();
    setTimeout(() => {
      const botResponses = {
        en: [
          "I understand you're asking about that. Let me help you with the information you need.",
          "That's a great question! I can provide you with detailed information about CUTM services.",
          "I'm here to assist you. Could you please provide more specific details about what you're looking for?",
          "Thank you for reaching out. I'll be happy to help you with your inquiry about CUTM."
        ],
        hi: [
          "मैं समझ गया कि आप इसके बारे में पूछ रहे हैं। मैं आपकी आवश्यक जानकारी के साथ सहायता करूंगा।",
          "यह एक बेहतरीन प्रश्न है! मैं आपको CUTM सेवाओं के बारे में विस्तृत जानकारी दे सकता हूं।",
          "मैं आपकी सहायता के लिए यहां हूं। कृपया बताएं कि आप क्या खोज रहे हैं?",
          "संपर्क करने के लिए धन्यवाद। मैं CUTM के बारे में आपके प्रश्न में खुशी से सहायता करूंगा।"
        ],
        ta: [
          "நீங்கள் இதைப் பற்றி கேட்கிறீர்கள் என்பதை நான் புரிந்துகொண்டேன். உங்களுக்குத் தேவையான தகவலுடன் நான் உதவுகிறேன்.",
          "அது ஒரு அருமையான கேள்வி! CUTM சேவைகளைப் பற்றி விரிவான தகவலை நான் வழங்க முடியும்.",
          "நான் உங்களுக்கு உதவ இங்கே இருக்கிறேன். நீங்கள் எதைத் தேடுகிறீர்கள் என்பதை இன்னும் குறிப்பாகச் சொல்ல முடியுமா?",
          "தொடர்பு கொண்டதற்கு நன்றி. CUTM பற்றிய உங்கள் விசாரணையில் நான் மகிழ்ச்சியுடன் உதவுவேன்."
        ],
        es: [
          "Entiendo que preguntas sobre eso. Te ayudaré con la información que necesitas.",
          "¡Esa es una gran pregunta! Puedo proporcionarte información detallada sobre los servicios de CUTM.",
          "Estoy aquí para ayudarte. ¿Podrías proporcionar más detalles específicos sobre lo que buscas?",
          "Gracias por contactarnos. Estaré encantado de ayudarte con tu consulta sobre CUTM."
        ],
        fr: [
          "Je comprends que vous posez des questions à ce sujet. Laissez-moi vous aider avec les informations dont vous avez besoin.",
          "C'est une excellente question! Je peux vous fournir des informations détaillées sur les services CUTM.",
          "Je suis là pour vous aider. Pourriez-vous fournir plus de détails spécifiques sur ce que vous recherchez?",
          "Merci de nous avoir contactés. Je serai ravi de vous aider avec votre demande concernant CUTM."
        ]
      };

      const responses = botResponses[language] || botResponses.en;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const quickActions = {
    en: [
      { text: 'Admissions Info', icon: '🎓' },
      { text: 'Course Details', icon: '📚' },
      { text: 'Campus Tour', icon: '🏫' },
      { text: 'Placement Stats', icon: '💼' }
    ],
    hi: [
      { text: 'प्रवेश जानकारी', icon: '🎓' },
      { text: 'कोर्स विवरण', icon: '📚' },
      { text: 'कैंपस टूर', icon: '🏫' },
      { text: 'प्लेसमेंट आंकड़े', icon: '💼' }
    ],
    ta: [
      { text: 'சேர்க்கை தகவல்', icon: '🎓' },
      { text: 'படிப்பு விவரங்கள்', icon: '📚' },
      { text: 'வளாக சுற்றுப்பயணம்', icon: '🏫' },
      { text: 'வேலைவாய்ப்பு புள்ளிவிவரம்', icon: '💼' }
    ],
    es: [
      { text: 'Info Admisiones', icon: '🎓' },
      { text: 'Detalles del Curso', icon: '📚' },
      { text: 'Tour del Campus', icon: '🏫' },
      { text: 'Estadísticas Laborales', icon: '💼' }
    ],
    fr: [
      { text: 'Info Admissions', icon: '🎓' },
      { text: 'Détails du Cours', icon: '📚' },
      { text: 'Visite du Campus', icon: '🏫' },
      { text: 'Statistiques Placement', icon: '💼' }
    ]
  };

  const chatHistory = {
    en: [
      'Multilingual chatbot website',
      'Admission requirements',
      'Course curriculum details',
      'Campus facilities tour',
      'Placement statistics 2024'
    ],
    hi: [
      'बहुभाषी चैटबॉट वेबसाइट',
      'प्रवेश आवश्यकताएं',
      'कोर्स पाठ्यक्रम विवरण',
      'कैंपस सुविधा दौरा',
      'प्लेसमेंट आंकड़े 2024'
    ],
    ta: [
      'பன்மொழி சாட்போட் வலைதளம்',
      'சேர்க்கை தேவைகள்',
      'படிப்பு பாடத்திட்ட விவரங்கள்',
      'வளாக வசதிகள் சுற்றுப்பயணம்',
      'வேலைவாய்ப்பு புள்ளிவிவரங்கள் 2024'
    ],
    es: [
      'Sitio web chatbot multilingüe',
      'Requisitos de admisión',
      'Detalles del plan de estudios',
      'Tour de instalaciones del campus',
      'Estadísticas de colocación 2024'
    ],
    fr: [
      'Site Web chatbot multilingue',
      'Exigences d\'admission',
      'Détails du programme d\'études',
      'Visite des installations du campus',
      'Statistiques de placement 2024'
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-widget">
      {/* Sidebar */}
      <div className={`chatbot-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>
            {language === 'en' && 'Chat History'}
            {language === 'hi' && 'चैट इतिहास'}
            {language === 'ta' && 'அரட்டை வரலாறு'}
            {language === 'es' && 'Historial de Chat'}
            {language === 'fr' && 'Historique du Chat'}
          </h3>
          <button 
            className="sidebar-close"
            onClick={() => setIsSidebarOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="sidebar-content">
          {chatHistory[language].map((item, index) => (
            <div key={index} className="history-item">
              <span className="history-icon">💬</span>
              <span className="history-text">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat */}
      <div className="chatbot-container">
        {/* Header */}
        <div className="chatbot-header">
          <button 
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          <div className="chatbot-title">
            <div className="bot-avatar">🤖</div>
            <div>
              <h3>CUTM Assistant</h3>
              <span className="online-status">
                <span className="status-dot"></span>
                {language === 'en' && 'Online'}
                {language === 'hi' && 'ऑनलाइन'}
                {language === 'ta' && 'ஆன்லைன்'}
                {language === 'es' && 'En línea'}
                {language === 'fr' && 'En ligne'}
              </span>
            </div>
          </div>

          <button className="chatbot-close" onClick={onToggle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.sender === 'bot' && <div className="message-avatar">🤖</div>}
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-time">{message.timestamp}</div>
              </div>
              {message.sender === 'user' && <div className="message-avatar">👤</div>}
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && !isTyping && (
          <div className="quick-actions">
            {quickActions[language].map((action, index) => (
              <button
                key={index}
                className="quick-action"
                onClick={() => sendMessage(action.text)}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-text">{action.text}</span>
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chatbot-input">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  language === 'en' ? 'Type your message...' :
                  language === 'hi' ? 'अपना संदेश टाइप करें...' :
                  language === 'ta' ? 'உங்கள் செய்தியை தட்டச்சு செய்யுங்கள்...' :
                  language === 'es' ? 'Escribe tu mensaje...' :
                  language === 'fr' ? 'Tapez votre message...' : 
                  'Type your message...'
                }
                rows="1"
              />
              <button type="submit" className="send-button" disabled={!inputValue.trim()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;