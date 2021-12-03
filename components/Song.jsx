import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { msToTime } from "../lib/time";

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi
      .play({
        uris: [track.track.uri],
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="grid grid-cols-2 text-xs md:text-base text-gray-500 py-4 px-5
    hover:bg-gray-900"
      onClick={() => {
        playSong();
      }}
    >
      <div className="flex items-center space-x-4">
        <p>{order}</p>
        <img
          className="w-10 h-10"
          src={track.track.album.images[2].url}
          alt={track.track.album.names}
        />
        <div>
          <p className="w-36 text-white lg:w-64 truncate">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex md:ml-0 space-x-4 w-full pl-4 relative">
        <p className="hidden w-40 md:inline absolute left-0">
          {track.track.album.name}
        </p>
        <p className="absolute right-0">{msToTime(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
