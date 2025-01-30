export async function getPlaylistsByMood(mood: string, token: string) {
  // 1️⃣ Mapeo de estados de ánimo a palabras clave de búsqueda
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

  // 2️⃣ Obtener la palabra clave asociada
  const query = moodMap[mood] || "chill"; 
  console.log("Selected mood:", mood);  // Verifica qué estado de ánimo se está enviando
  console.log("Query sent to Spotify API:", query); // Verifica qué palabra clave se usa en la consulta

  // 3️⃣ Hacer la consulta a la API de Spotify
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // 4️⃣ Verificar si la respuesta es válida
  if (!res.ok) {
    console.error("Error al obtener playlists:", res.statusText);
    return [];
  }

  // 5️⃣ Convertir la respuesta a JSON
  const data = await res.json();
  console.log("API Response:", data);  // 🔍 Verifica qué devuelve Spotify

  // 6️⃣ Validar que existen playlists en la respuesta
  if (!data.playlists || !data.playlists.items) {
    console.error("⚠️ No playlists found for this mood:", mood);
    return [];
  }

  return data.playlists.items; // Devuelve las playlists obtenidas
}
