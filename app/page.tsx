"use client";

import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

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
            Generate personalized Spotify playlists based on your mood
          </p>
        </div>

        <div className="space-y-4">
          {session ? (
            <>
              <p>Welcome, {session.user?.name}!</p>
              <Button size="lg" className="w-full" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <Button size="lg" className="w-full" onClick={() => signIn("spotify")}>
              Sign in with Spotify
            </Button>
          )}
          <p className="text-sm text-muted-foreground">
            Connect your Spotify account to get started
          </p>
        </div>
      </div>
    </main>
  );
}
