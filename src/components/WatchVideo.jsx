import {
    Player,
    ControlBar,
    PlayToggle,
    ReplayControl,
    ForwardControl,
    VolumeMenuButton,
    BigPlayButton,
  } from "video-react";
  import 'video-react/dist/video-react.css';
  import { useRef, useState, useEffect } from "react";
  import { useParams } from "react-router-dom";
  import { CustomSpinner } from "./Spinner";
  import { createContext } from "react";
  import Hls from "hls.js";
  import axios from "axios";
  
  export const RecommendationsContext = createContext();
  export const RelationsContext = createContext();
  
  export default function WatchVideo() {
    const playerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("");
    const [episodes, setEpisodes] = useState([]);
    const [videoUrl, setVideoUrl] = useState("");
    const [title, setTitle] = useState("");
    const [genres, setGenres] = useState([]);
    const [description, setDescription] = useState("");
    const [animeType, setAnimeType] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [currentEpisode, setCurrentEpisode] = useState("");
    const [episodeLength, setEpisodeLength] = useState("");
    const { animetitle } = useParams();
  
    // Fetch anime ID
    useEffect(() => {
      async function fetchID() {
        try {
          setLoading(true);
          const response = await axios.get(`https://consumet-sandy-two.vercel.app/anime/gogoanime/${animetitle}`);
          const filteredResults = response.data.results.filter(result => result.subOrDub === "sub");
  
          if (filteredResults.length > 0) {
            const animeID = filteredResults[0].id;
            const animeInfoResponse = await axios.get(`https://consumet-sandy-two.vercel.app/anime/gogoanime/info/${animeID}`);
            console.log(animeInfoResponse)

            const episodeIDs = animeInfoResponse.data.episodes.map(episode => episode.id);
            setEpisodes(episodeIDs);
            setCurrentEpisode(episodeIDs[0]);
            setTitle(animeInfoResponse.data.title);
            setDescription(animeInfoResponse.data.description)
            setAnimeType(animeInfoResponse.data.type)
            setGenres(animeInfoResponse.data.genres);
            setReleaseDate(animeInfoResponse.data.releaseDate);
            setEpisodeLength(animeInfoResponse.data.totalEpisodes);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
  
      fetchID();
    }, [animetitle]);
  
    const baseURL = "https://consumet-sandy-two.vercel.app/meta/anilist/watch/";
    // Fetch video source link
    useEffect(() => {
      const fetchVideoUrl = async () => {
        if (!currentEpisode) return;
  
        setLoading(true);
        try {
          const url = `${baseURL}${currentEpisode}`;
          const response = await fetch(url);
          const data = await response.json();
          setVideoUrl(data.sources[3].url);
        } catch (err) {
          console.error("Error fetching video URL:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchVideoUrl();
    }, [currentEpisode]);
  
    // Load video URL
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
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="flex-grow flex-shrink-0" style={{ flexBasis: '60%' }}>
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
              </div>
                
              <div className="flex-grow" style={{ flexBasis: '40%' }}>
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
                <h1 className="text-xl font-semibold">{title}</h1>
                <span className="text-gray-500">Type: </span> <span>{animeType}</span> <br />
                <span className="text-gray-500">Total episodes: </span> <span>{episodeLength}</span> <br />
                <span className="text-gray-500">Original release date: </span> <span>{releaseDate.year}-{releaseDate.month}-{releaseDate.day}</span> <br />
                <span className="text-gray-500">Genre: </span> {genres.map((genre, index) => (<span key={index}>{genre}, </span>))} <br />
                <p className="text-gray-500 text-sm font-semithin mt-2">{description}</p>
              </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
  