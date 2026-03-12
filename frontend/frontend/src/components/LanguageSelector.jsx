import React, { useState } from "react";

function LanguageSelector() {
  const [lang, setLang] = useState(localStorage.getItem("chatbot-lang") || "en");

  const changeLang = (e) => {
    setLang(e.target.value);
    localStorage.setItem("chatbot-lang", e.target.value);
  };

  return (
    <select
      className="bg-gray-700 text-white p-2 rounded hover:bg-gray-600 transition"
      value={lang}
      onChange={changeLang}
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="te">తెలుగు</option>
      <option value="ta">தமிழ்</option>
      <option value="bn">বাংলা</option>
    </select>
  );
}

export default LanguageSelector;
