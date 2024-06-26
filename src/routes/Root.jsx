import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  TrendingAnimeContext,
  RecentAnimeContext,
  PopularAnimeContext,
  SuggestedAnimeContext,
  SearchQueryContext,
  LoadingContext,
  ClicksContext,
  SearchResultContext
} from "../utils/context";
import generateRandomNumber from "../utils/RNG";

export default function Root() {
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const [recent, setRecent] = useState([]);
  const [popular, setPopular] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [RNG, setRNG] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [clicks, setClicks] = useState(null);

  useEffect(() => {
    const randomNumber = generateRandomNumber();
    setRNG(randomNumber);
  }, []);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const resData = await res.json();
        setData(resData.results || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (RNG !== null) {
      fetchData(
        "https://consumet-sandy-two.vercel.app/meta/anilist/trending?page=1&perPage=18",
        setTrending
      );
      fetchData(
        "https://consumet-sandy-two.vercel.app/meta/anilist/recent-episodes",
        setRecent
      );
      fetchData(
        "https://consumet-sandy-two.vercel.app/meta/anilist/popular",
        setPopular
      );
      fetchData(
        `https://consumet-sandy-two.vercel.app/meta/anilist/advanced-search?page=${RNG}`,
        setSuggested
      );
    }
  }, [RNG]);

  useEffect(() => {
    const fetchVisits = () => {
      fetch("https://animhey-backend.onrender.com/api/visits")
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          setClicks(data.count);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };

    fetchVisits();
  }, []);

  return (
    <div className="px-2 mx-auto xl:px-20">
      <Navigation />
      <LoadingContext.Provider value={{ loading }}>
        <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
          <SuggestedAnimeContext.Provider value={{ suggested }}>
            <PopularAnimeContext.Provider value={{ popular }}>
              <RecentAnimeContext.Provider value={{ recent }}>
                <TrendingAnimeContext.Provider value={{ trending }}>
                  <ClicksContext.Provider value={{ clicks }}>
                    <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
                      <main className="flex flex-col items-center w-full mx-auto">
                        <Outlet />
                      </main>
                    </SearchResultContext.Provider>
                  </ClicksContext.Provider>
                </TrendingAnimeContext.Provider>
              </RecentAnimeContext.Provider>
            </PopularAnimeContext.Provider>
          </SuggestedAnimeContext.Provider>
        </SearchQueryContext.Provider>
      </LoadingContext.Provider>
      <Footer />
    </div>
  );
}
