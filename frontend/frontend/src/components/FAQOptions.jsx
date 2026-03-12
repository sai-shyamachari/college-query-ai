import React from "react";

function FAQOptions({ onSelect }) {
  const faqs = [
    "What is the last date for fees?",
    "How to apply for scholarship?",
    "Where can I see my timetable?",
    "How to contact admin office?",
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {faqs.map((faq, i) => (
        <button
          key={i}
          onClick={() => onSelect(faq)}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition"
        >
          {faq}
        </button>
      ))}
    </div>
  );
}

export default FAQOptions;
