import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { SearchQueryContext, SearchResultContext } from "../utils/context";
import GalleryWithCarousel from "./Carousel";

export default function Hero() {
  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);
  const { setSearchResult } = useContext(SearchResultContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchData() {
      const url = `https://consumet-sandy-two.vercel.app/anime/gogoanime/${searchQuery}`;
      try {
        const res = await fetch(url);
        const resData = await res.json();
        setSearchResult(resData.results.filter(result => result.subOrDub === "sub"));
        console.log(resData.results.filter(result => result.subOrDub === "sub"));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    
    const debounceFetch = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  function handleSubmit(event) {
    event.preventDefault(); 
    setTimeout(() => {
      navigate(`/results`);
      setSearchQuery('');
    }, 600)
  }

  return (
    <section className="container relative bg-cover bg-center flex flex-col items-center justify-center mb-4 w-full">
      <form
        onSubmit={handleSubmit} 
        className="relative shadow-md lg:absolute bottom-full lg:left-1/2 lg:bottom-0 lg:-translate-x-1/2 lg:translate-y-1/2 w-full lg:w-3/6 mb-4 z-30"
      >
        <input
          type="text"
          placeholder="Search anime..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#242424] lg:bg-[#ffffff] text-white text-lg font-semibold lg:text-gray-500 w-full border-none p-4"
          required
        />
        
        <button
          type="submit"
          className="disable absolute top-1/2 right-2 -translate-y-1/2 bg-red-600 hover:bg-red-700 rounded-md p-2"
        >
          Search
        </button>
      </form>
      <div className="w-full relative">
        <GalleryWithCarousel className="z-50" />
      </div>
    </section>
  );
}
