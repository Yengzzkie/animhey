import { useContext, useEffect } from "react";
import { SearchQueryContext } from "../utils/context";
import { Link } from "react-router-dom";
import GalleryWithCarousel from "./Carousel";

export default function Hero() {
  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://consumet-sandy-two.vercel.app/meta/anilist/info/${id}`;
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
    }
    fetchData();
  }, [searchQuery])

  function handleSearchQuery(e) {
    setSearchQuery(e.target.value)
  }

  return (
    <section className="container relative bg-cover bg-center flex flex-col items-center justify-center mb-4 w-full">
      <div className="shadow-md lg:absolute bottom-full left-1/2 lg:bottom-1/2 lg:-translate-x-1/2 lg:translate-y-1/2 w-full lg:w-3/6 mb-4 z-10">
        <input
          type="text"
          placeholder="Search title"
          className="bg-[#242424] lg:bg-[#ffffff] text-white lg:text-[#242424] w-full border-none"
        />
        <Link to={"/"} className="absolute lg:top-1/2 right-0 lg:-translate-y-1/2">
          <button onClick={handleSearchQuery} className="bg-red-600 hover:bg-red-700 p-2">Search</button>
        </Link>
      </div>
      <div className="w-full relative">
        <div className="absolute inset-0 bg-[#141414] opacity-50"></div>
        <GalleryWithCarousel className="" />
      </div>
    </section>
  );
}
