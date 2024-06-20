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
import { CustomSpinner } from "./Spinner";
import { createContext } from "react";
import Hls from "hls.js";
import Recommendations from "./Recommendations";
export const RecommendationsContext = createContext();

export default function Watch() {
  const playerRef = useRef(null);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const { id } = useParams();

  const baseURL = "https://consumet-sandy-two.vercel.app/meta/anilist/watch/";

  useEffect(() => {
    const fetchVideoUrl = async () => {
      setLoading(true);
      const url = `${baseURL}${currentEpisode}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setVideoUrl(data.sources[3].url);
      } catch (err) {
        console.error("Error fetching video URL:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentEpisode) {
      fetchVideoUrl();
    }
  }, [currentEpisode]);

  useEffect(() => {
    async function fetchID() {
      setLoading(true);
      try {
        const ID = await fetch(
          `https://consumet-sandy-two.vercel.app/meta/anilist/info/${id}`
        );
        const response = await ID.json();
        const episodeID = response.episodes;
        const recommendations = response.recommendations;
        setData(response);
        console.log(response);
        setRecommendations(recommendations);
        setTitle(response.title.english);
        setEpisodes(episodeID.map((episode) => episode.id));
        setCurrentEpisode(episodeID[0].id);
      } catch (err) {
        console.error("Error fetching ID:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchID();
  }, [id]);

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

  function handleEpisodeChange(e) {
    setCurrentEpisode(e.target.value);
  }

  return (
    <div className="shadow-md w-full">
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full">
              <Player poster={data.image} ref={playerRef} fluid className="w-full">
                <source src={videoUrl} />
                <BigPlayButton position="center" />
                <ControlBar>
                  <PlayToggle />
                  <ReplayControl seconds={10} />
                  <ForwardControl seconds={10} />
                  <VolumeMenuButton vertical />
                </ControlBar>
              </Player>
              <select
                value={currentEpisode}
                onChange={handleEpisodeChange}
                className="bg-[#242424] text-white shadow-md border-none my-2"
              >
                <option value="">Select Episode</option>
                {episodes.map((episode, index) => (
                  <option key={episode} value={episode}>
                    Episode {index + 1}
                  </option>
                ))}
              </select>
              
              <h1 className="font-semibold">{title}</h1> 
              <span>Type: </span> <span className="text-gray-500 italic">{data.type}</span>
              <p className="text-gray-500">{data.description}</p>
            </div>

            <RecommendationsContext.Provider value={{ recommendations }}>
              <Recommendations className="flex-shrink" />
            </RecommendationsContext.Provider>
          </div>
        </>
      )}
    </div>
  );
}
