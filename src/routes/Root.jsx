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
  LoadingContext
} from "../utils/context";
import generateRandomNumber from "../utils/RNG";
import { CustomSpinner } from "../components/Spinner";

export default function Root() {
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const [recent, setRecent] = useState([]);
  const [popular, setPopular] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [RNG, setRNG] = useState(null);

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
  }, [searchQuery, RNG]);

  return (
    <div className="container mx-auto px-4 md:px-2 xl:px-20">
      <Navigation />
      <LoadingContext.Provider value={{ loading }}>
        <SearchQueryContext.Provider value={{searchQuery, setSearchQuery}}>
          <SuggestedAnimeContext.Provider value={{ suggested }}>
            <PopularAnimeContext.Provider value={{ popular }}>
              <RecentAnimeContext.Provider value={{ recent }}>
                <TrendingAnimeContext.Provider value={{ trending }}>
                  <main className="flex flex-col items-center w-full mx-auto">
                    <Outlet />
                  </main>
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
