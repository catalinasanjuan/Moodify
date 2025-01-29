//[...nextauth].ts

import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      console.log("JWT Token Data:", token); // 👀 Verifica si se asigna correctamente el accessToken
      return token;
    },
  
    async session({ session, token }) {
      console.log("Session Token Data:", token); // 👀 Verifica qué llega aquí
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken, // ✅ Debería pasar el accessToken correctamente
        },
      };
    },
  }
})