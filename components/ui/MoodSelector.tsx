import { useState } from "react";

const moods = [
  { name: "Happyhapppy", emoji: "😊", category: "Feliz 😀" },
  { name: "Sad", emoji: "☹️", category: "Triste 😭" },
  { name: "Motivado", emoji: "💪🏻", category: "Energizado 🔋" },
  { name: "Relax", emoji: "💆🏻", category: "Relajado🧘🏻" },
  { name: "Broken Heart", emoji: "💔", category: "Triste 😭" },
  { name: "Gym", emoji: "💪🏻", category: "Energizado 🔋" },
  { name: "Fiesta Techno", emoji: "🕺🏻", category: "Energizado Hard🔋" },
  { name: "Perreo", emoji: "🧘", category: "Latin 💃🏻" },
  { name: "Enamorado", emoji: "💌", category: "Amor 💕" },
  { name: "Boyband", emoji: "🎸", category: "Fan 🥁" },
  { name: "Girl Music", emoji: "💅🏻", category: "Fan 🥁" },
  { name: "Risa", emoji: "🤣", category: "Podcast🎤" },
  { name: "Noviazgo", emoji: "👫🏻", category: "Cartitas al amor <3" },
  { name: "Hot", emoji: "🥵", category: "Pasión 🌡️" },
  { name: "Sad", emoji: "☹️", category: "Triste 😭" },
  { name: "Cumbia", emoji: "🥳", category: "Latin 💃🏻" },
  { name: "Sad en español", emoji: "😞", category: "Triste 😭" },
  { name: "CleanHouse", emoji: "🧹", category: "Energizado 🔋" },
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
