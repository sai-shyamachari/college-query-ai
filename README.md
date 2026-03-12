## 📖 Overview
The Smart Assistant is a hybrid AI-powered web application designed to bridge the information gap between organizations and their users. By combining a local knowledge base with the Google Gemini API, the bot offers precise, context-aware answers to queries regarding services, statistics, and general information. It serves as a 24/7 digital guide that evolves with every interaction.

## ❓ Problem Statement
Users often struggle to navigate complex websites to find specific data, leading to frustration and increased support tickets. This project solves that by providing:

⚡ Instant Access: Immediate responses to complex data-driven queries.

🌍 Language Inclusivity: Multilingual support to assist a global or diverse user base.

🔄 Hybrid Intelligence: The reliability of a rule-based system combined with the conversational power of Generative AI.

## 📊 Dataset & Knowledge Base
The chatbot utilizes a dual-layered data approach:

Structured Intent Mapping (intents.json): A custom JSON dataset containing pre-defined patterns and responses for high-frequency queries to ensure 100% accuracy for critical facts.

Generative AI Context: A dynamic system prompt that provides the bot with its persona and core mission parameters.

Web Grounding: Integrated "Google Search" tools that allow the AI to verify real-time data against live web results when the local knowledge base is insufficient.

## 🛠 Tools and Technologies
Frontend: React.js, Tailwind CSS.

Backend: Node.js, Express.js.

AI Model: Google Gemini 1.5 Series (Generative Language API).


Environment Management: Dotenv for secure API handling.


Development Tools: Nodemon for hot-reloading and PostCSS for styling optimization.

## ⚙️ Methods
Hybrid Logic: The system first checks the intents.json file for matches. If a match isn't found, it routes the query to the Gemini API for a natural language response.

Contextual Prompting: Uses advanced system instructions to maintain a helpful and professional persona throughout the conversation.

Multilingual Processing: Implements a language mapping system (supporting Hindi, Odia, Telugu, Marathi, etc.) to detect and respond in the user's preferred tongue.


Security First: Uses .env configurations to ensure sensitive API keys are never exposed in the source code.

## 💡 Key Features & Insights
🚀 High Reliability: Fallback mechanisms ensure the bot always provides a helpful response, even when the API is unavailable.

📈 Data Driven: Easily customizable to include new statistics, contact details, or service updates via the JSON intent file.

🎨 Modern UI: A clean, responsive chat interface built with Tailwind CSS for seamless use on both mobile and desktop.

## 🖼️ Dashboard/Model/Output

<img width="1916" height="868" alt="Screenshot 2026-03-11 222811" src="https://github.com/user-attachments/assets/40508674-08cc-44b8-8943-2a5a25dba8b5" />


Chat Interface


<img width="1919" height="863" alt="Screenshot 2026-03-11 223630" src="https://github.com/user-attachments/assets/e5970376-bd88-4359-a35f-334c0fa6f857" />



Multilingual Support


<img width="691" height="311" alt="Screenshot 2026-03-11 223724" src="https://github.com/user-attachments/assets/580b8e07-c30f-41a6-b860-24e34ecfae47" />



## 🚀 How to Run this project?

### 1. Clone the Repository

git clone https://github.com/YOUR_USERNAME/smart-ai-chatbot.git
cd smart-ai-chatbot

### 2. Setup Backend

cd backend
npm install
Create a .env file in the backend folder.

Add your API key: GEMINI_API_KEY=your_key_here.

### 3. Setup Frontend

cd ../frontend
npm install

### 4. Start the Application

Backend: npm run dev or npx nodemon app.js.

Frontend: npm start.

## ✅ Results & Conclusion
The project demonstrates a robust implementation of modern AI integration in web development. By combining Generative AI with a "Source of Truth" local dataset, the bot provides a reliable, scalable solution for organizations looking to automate user support and information delivery.

## 🔮 Future Work
🎤 Voice Interaction: Implementing Web Speech API for voice-activated queries.

📊 Analytics Dashboard: A secondary UI to track common user questions and bot performance.

🤖 Agentic Workflows: Allowing the bot to perform actions like booking appointments or sending emails.

## 👤 Author & Contact
Sai Shyam Achari

GitHub: https://github.com/sai-shyamachari

LinkedIn: www.linkedin.com/in/sai-shyam-achari-5870a0373

Email: saishyamachari@gmail.com
