import { useContext } from "react";
import { RecentAnimeContext } from "../utils/context";
import { Link } from "react-router-dom";

export default function RecentlyAdded() {
  const { recent } = useContext(RecentAnimeContext);

  return (
    <div className="flex flex-col h-full col-span-1 lg:pr-4">
      <h1 className="text-xl mb-4">Recently Added Episode</h1>
      {recent.slice(0, 10).map((recent) => (
        <Link to={`/watch/${recent.id}/${recent.title}`} key={recent.id}>
          <div className="bg-[#252525] hover:bg-[#141414] flex items-center shadow-md h-20 w-full mb-1 cursor-pointer">
            <img src={recent.image} alt={recent.title} className="w-14 h-full object-contain mr-4"/>
            <div>
              <p>{recent.title}</p>
              <span className="text-sm text-gray-400 block font-thin rounded-md">Episode: {recent.episodeNumber}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
