const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- MODIFIED: Contextual prompt for Gemini ---
function getSystemPrompt(lang) {
  let instructions = `You are "Marg Darshak," a helpful and friendly AI chatbot for Centurion University of Technology and Management (CUTM). Your goal is to provide accurate and concise information.

First, try to answer questions using the key information provided below. If the user's question cannot be answered with this information, perform a web search to find the most up-to-date and relevant answer, prioritizing the official CUTM website.

**Key Information about CUTM:**

**PLACEMENT STATISTICS (as of 2025):**
- Success Rate: 90%
- Number of Recruiters: 202
- Highest CTC: 16 LPA
- Average CTC: 4.65 LPA
- Students with CTC > 7 lakhs: 39
- Total Recruiter Network: 500+

**CONTACT & ADDRESS:**
- Toll-free Numbers: 8260077222, 7735699670
- Address: CUTM, HIG-4, Floor 1&2, Jaydev Vihar, Opp Pal Heights, Bhubaneswar, Khurda, Odisha, India

**IMPORTANT SERVICES & DATES:**
- The Career Development Cell provides skills training and company-specific training.
- Scholarship forms are available at the admin office.
- The deadline for fee payment is September 30th.

Based on this information, please answer the user's questions. `;

  // Add language-specific instruction
  const languageMap = {
    'hi': 'Please respond in Hindi (हिंदी).',
    'te': 'Please respond in Telugu (తెలుగు).',
    'or': 'Please respond in Odia (ଓଡ଼ିଆ).',
    'mr': 'Please respond in Marathi (मराठी).',
    'gu': 'Please respond in Gujarati (ગુજરાતી).',
    'kn': 'Please respond in Kannada (ಕನ್ನಡ).'
  };

  instructions += languageMap[lang] || 'Please respond in English.';
  return instructions;
}

// --- MODIFIED: Gemini API call function with Web Search ---
async function callGeminiAPI(message, lang = "en") {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Gemini API key not found in environment variables.");
    return getFallbackResponse(message, lang);
  }
  
  // Replace your old line with this one:
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const systemPrompt = getSystemPrompt(lang);
  
  const payload = {
    contents: [{ parts: [{ text: message }] }],
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    // --- NEW: This enables Google Search grounding ---
    tools: [{ "google_search": {} }],
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorBody}`);
    }

    const data = await response.json();
    // Safely access the response text
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
        throw new Error("Invalid response structure from Gemini API.");
    }
    return reply.trim();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return getFallbackResponse(message, lang); // Use fallback on error
  }
}

// Fallback response function (your original logic, no changes needed)
function getFallbackResponse(message, lang) {
  let reply = "I am here to help you with college queries."; // Default reply

  const lowerCaseMessage = message.toLowerCase();

  const feeReplies = {
    en: "The last date to pay fees is September 30.",
    hi: "शुल्क जमा करने की अंतिम तिथि 30 सितम्बर है।",
    te: "ఫీజుల చివరి తేదీ సెప్టెంబర్ 30.",
    or: "ଫି ଦେବାର ଶେଷ ତାରିଖ ସେପ୍ଟେମ୍ବର 30 ଅଟେ।",
    // Add other languages as needed
  };

  const placementReplies = {
    en: "For the 2025 batch: 90% placement rate, highest CTC 16 LPA, average CTC 4.65 lakhs with 202 recruiters.",
    // Add other languages if you have specific translations
  };

  const scholarshipReplies = {
    en: "Scholarship forms are available in the admin office.",
    // Add other languages
  };
  
  if (lowerCaseMessage.includes("fees")) {
    reply = feeReplies[lang] || feeReplies.en;
  } else if (lowerCaseMessage.includes("placement")) {
    reply = placementReplies[lang] || placementReplies.en;
  } else if (lowerCaseMessage.includes("scholarship")) {
    reply = scholarshipReplies[lang] || scholarshipReplies.en;
  }

  return reply;
}

// Main chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, lang } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Use Gemini for intelligent responses
    const reply = await callGeminiAPI(message, lang || "en");
    res.json({ reply });

  } catch (error) {
    console.error('Chat endpoint error:', error);
    const fallbackReply = getFallbackResponse(req.body.message, req.body.lang || "en");
    res.status(500).json({ reply: fallbackReply });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    gemini_configured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Chatbot backend running at http://localhost:${PORT}`);
  console.log(`🔑 Gemini API: ${process.env.GEMINI_API_KEY ? 'Configured' : 'Not configured - using fallback responses'}`);
});
