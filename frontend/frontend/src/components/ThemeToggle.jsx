import React from "react";

function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

export default ThemeToggle;
