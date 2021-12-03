import { signIn, useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect } from "react";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn();
    }

    spotifyApi.setAccessToken(session?.accessToken);
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
