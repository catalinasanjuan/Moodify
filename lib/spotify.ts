export async function getPlaylistsByMood(mood: string, token: string) {
  const moodMap: Record<string, string> = {
    happy: "happy",
    sad: "sad",
    motivated: "workout",
    relaxed: "chill",
    broken_heart: "heartbreak",
    gym: "gym",
    fiesta_techno: "techno",
    perreo: "reggaeton",
    enamorado: "love",
    boyband: "boyband",
    girl_music: "girl power",
    risa: "funny",
    noviazgo: "romantic",
    hot: "passion",
    cumbia: "cumbia",
    sad_espanol: "sad spanish",
    cleanhouse: "house",
  };

  const query = moodMap[mood] || "chill";

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error fetching playlists from Spotify");
  }

  const data = await res.json();

  // 🔍 Depuración: Verificar qué devuelve la API antes de acceder a `data.playlists.items`
  console.log("API Response:", data);

  // ✅ Validación para evitar errores cuando `data.playlists.items` no existe
  if (!data.playlists || !data.playlists.items) {
    console.error("⚠️ No playlists found in API response.");
    return [];
  }

  return data.playlists.items;
}
