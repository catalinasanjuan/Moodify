export async function getPlaylistsByMood(mood: string, token: string) {
    const moodMap: Record<string, string> = {
      happy: "happy",
      sad: "sad",
      motivated: "workout",
      relaxed: "chill",
    };
  
    const query = moodMap[mood] || "chill";
    
    const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Error fetching playlists from Spotify");
    }
  
    const data = await res.json();
    return data.playlists.items;
  }
  