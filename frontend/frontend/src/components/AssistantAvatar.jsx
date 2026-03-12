import React, { useState, useEffect } from "react";
import "./AssistantAvatar.css";

export default function AssistantAvatar() {
  const [mood, setMood] = useState("idle");

  useEffect(() => {
    const moods = ["thinking", "speaking", "idle", "hide"];
    const interval = setInterval(() => {
      setMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`assistant-avatar ${mood}`}>
      <img src="/assistant.png" alt="Assistant" />
      <p>{mood === "thinking" ? "🤔" : mood === "speaking" ? "🗣️" : mood === "hide" ? "🙈" : "😊"}</p>
    </div>
  );
}
