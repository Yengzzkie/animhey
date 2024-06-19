import {
  Player,
  ControlBar,
  PlayToggle,
  ReplayControl,
  ForwardControl,
  VolumeMenuButton,
  BigPlayButton,
} from "video-react";
import { useRef, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";
import { LoadingContext } from "../utils/context";
import { CustomSpinner } from "./Spinner";

export default function Watch() {
  const playerRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const baseURL = "https://consumet-sandy-two.vercel.app/meta/anilist/watch/";

  useEffect(() => {
    const fetchVideoUrl = async () => {
      setLoading(true)
      const url = `${baseURL}${currentEpisode}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setVideoUrl(data.sources[3].url);
        console.log(videoUrl);
      } catch (err) {
        console.error("Error fetching video URL:", err);
      } finally {
        setLoading(false)
      }
    };

    if (currentEpisode) {
      fetchVideoUrl();
    }
  }, [currentEpisode]);

  useEffect(() => {
    async function fetchID() {
      setLoading(true)
      try {
        const ID = await fetch(
          `https://consumet-sandy-two.vercel.app/meta/anilist/info/${id}`
        );
        const response = await ID.json();
        const episodeID = response.episodes;
        console.log(episodeID);
        console.log(response);
        setCurrentEpisode(episodeID[0].id);
      } catch (err) {
        console.error("Error fetching ID:", err);
      } finally {
        setLoading(false)
      }
    }
    fetchID();
  }, []);

  useEffect(() => {
    if (videoUrl && playerRef.current) {
      const videoElement = playerRef.current.video.video;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {});
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = videoUrl;
        videoElement.addEventListener("canplay", () => {});
      }
    }
  }, [videoUrl]);

  return (
    <div className="border w-full">
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <Player ref={playerRef} fluid className="border w-full">
            <source src={videoUrl} />
            <BigPlayButton position="center" />
            <ControlBar>
              <PlayToggle />
              <ReplayControl seconds={5} />
              <ForwardControl seconds={5} />
              <VolumeMenuButton vertical />
            </ControlBar>
          </Player>
        </>
      )}
    </div>
  );
}
