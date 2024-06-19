import {
  Player,
  ControlBar,
  PlayToggle,
  ReplayControl,
  ForwardControl,
  VolumeMenuButton,
  BigPlayButton,
} from "video-react";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";


export default function Watch() {
  const playerRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState("");

  const { id } = useParams();

  const baseURL = "https://consumet-sandy-two.vercel.app/meta/anilist/watch/";

  useEffect(() => {
    const fetchVideoUrl = async () => {
      const url = `${baseURL}${currentEpisode}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setVideoUrl(data.sources[3].url);
        console.log(videoUrl)
      } catch (err) {
        console.error("Error fetching video URL:", err);
      }
    };

    if (currentEpisode) {
      fetchVideoUrl();
    }
  }, [currentEpisode]);

  useEffect(() => {
    async function fetchID() {
        try {
          const ID = await fetch(
            `https://consumet-sandy-two.vercel.app/meta/anilist/info/${id}`
          );
          const response = await ID.json();
          const episodeID = response.episodes;
          console.log(episodeID)
          console.log(response)
          setCurrentEpisode(episodeID[0].id)
        } catch (err) {
          console.error("Error fetching ID:", err);
        }
      }
      fetchID();
  }, [])

  useEffect(() => {
    if (videoUrl && playerRef.current) {
      const videoElement = playerRef.current.video.video;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
        });
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = videoUrl;
        videoElement.addEventListener("canplay", () => {
        });
      }
    }
  }, [videoUrl]);

  return (
    <div>
      <h1>Anim-Hey!</h1>
      <p>by: Yengzzkie DzignTech</p>

      <Player ref={playerRef} fluid>
        <source src={videoUrl} />
        <BigPlayButton position="center" />
        <ControlBar>
          <PlayToggle />
          <ReplayControl seconds={5} />
          <ForwardControl seconds={5} />
          <VolumeMenuButton vertical />
        </ControlBar>
      </Player>
    </div>
  );
}