import { useState } from "react";

const moods = [
  { name: "Feliz", emoji: "🎉", category: "happy" },
  { name: "Triste", emoji: "😢", category: "sad" },
  { name: "Motivado", emoji: "💪", category: "motivated" },
  { name: "Relajado", emoji: "🧘", category: "relaxed" },
];

export default function MoodSelector({ onSelect }: { onSelect: (mood: string) => void }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6">
      {moods.map((mood) => (
        <button
          key={mood.category}
          onClick={() => onSelect(mood.category)}
          className="p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition"
        >
          {mood.emoji} {mood.name}
        </button>
      ))}
    </div>
  );
}
