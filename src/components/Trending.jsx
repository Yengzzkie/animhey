import { useContext } from "react";
import { TrendingAnimeContext } from "../utils/context";
import { Link } from "react-router-dom";

export default function Trending() {
  const { trending } = useContext(TrendingAnimeContext)

  return (
    <section className="container bg-cover bg-center flex flex-col items-center justify-center h-auto py-5">
      <div className="w-full text-white flex justify-start">
        <h1 className="text-3xl font-bold mb-4">Trending</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 w-full h-full">
        {trending.map((trending) => (
          <Link to={`/watch/${trending.id}`}>
            <div key={trending.id} className="relative flex flex-col h-auto w-full">
              {trending.status === "Ongoing" ? (<span className="bg-red-600 absolute top-0 left-0 z-20 px-2 rounded-sm">{trending.status}</span>) : (<span className="bg-green-600 absolute top-0 left-0 z-20 px-2 rounded-sm">{trending.status}</span>)}
              <img
                src={trending.image}
                alt={trending.title.english}
                className="flex-grow object-cover shadow-sm hover:scale-105 transition-transform cursor-pointer"
              />
              <h2 className="mt-2 text-[#c3c3c3] text-md font-bold truncate">
                {trending.title.english}
              </h2>
              <p className="mt-1 text-gray-600 truncate">
                {trending.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
