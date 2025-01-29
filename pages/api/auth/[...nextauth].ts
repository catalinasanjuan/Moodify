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
        token.accessToken = account.access_token; // ✅ Almacenar el access_token en token
        token.refreshToken = account.refresh_token; // ✅ Guardamos el refresh_token
        token.accessTokenExpires = account.expires_at * 1000; // Guardamos tiempo de expiración
      }

      // Si el token aún no ha expirado, lo retornamos
      if (Date.now() < token.accessTokenExpires) {
        console.log("Using existing access token:", token.accessToken);
        return token;
      }

      // Si el token ha expirado, refrescamos el token de acceso
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken; // ✅ Asegurar que se pasa a la sesión
      session.user.refreshToken = token.refreshToken;
      console.log("Session Token Data:", session);
      return session;
    },
  },
});

// Función para refrescar el token si ha expirado
async function refreshAccessToken(token) {
  try {
    const url = "https://accounts.spotify.com/api/token";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();
    console.log("Refreshed Token Data:", refreshedTokens);

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Nueva expiración
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}
