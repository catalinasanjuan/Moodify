
//page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import MoodSelector from "@/components/ui/MoodSelector";
import { getPlaylistsByMood } from "@/lib/spotify";

export default function Home() {
  const { data: session } = useSession();

// 🔍 Agregar console.log para verificar los datos de sesión y accessToken
console.log("Session data:", session);
console.log("User AccessToken:", session?.user?.accessToken);


  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);

  
  useEffect(() => {
    console.log("Session data:", session);
    console.log("User AccessToken:", session?.user?.accessToken);
  
    if (selectedMood && session?.user?.accessToken) {
      const fetchPlaylists = async () => {
        try {
          const playlists = await getPlaylistsByMood(selectedMood, session.user.accessToken);
          setPlaylists(playlists);
        } catch (error) {
          console.error("Error fetching playlists:", error);
        }
      };
  
      fetchPlaylists();
    }
  }, [selectedMood, session]);
  
  
  
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <Music className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Moodify</h1>
          <p className="text-muted-foreground">
          Generador de Playlists por Estado de Ánimo
          </p>
        </div>

        {session ? (
          <>
            <p>Bienvenido, {session.user?.name}!</p>
            <MoodSelector onSelect={setSelectedMood} />

            {selectedMood && (
              <p className="mt-6">Seleccionaste: {selectedMood}</p>
            )}

            {playlists.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Playlists recomendadas</h2>
                <ul className="mt-4 space-y-2">
                  {playlists.map((playlist) => (
                    <li key={playlist.id}>
                      <a
                        href={playlist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {playlist.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button size="lg" className="w-full" onClick={() => signOut()}>
              Cerrar sesión
            </Button>
          
          </>
        ) : (
          <Button size="lg" className="w-full" onClick={() => signIn("spotify")}>
            Inicia sesión con Spotify
          </Button>
        )}

        <p className="text-sm text-muted-foreground">
          Inicia sesión con tu cuenta de Spotify para comenzar
        </p>
      </div>
    </main>
  );
}
