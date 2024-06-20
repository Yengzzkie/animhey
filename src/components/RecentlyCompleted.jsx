import { useContext } from "react";
import { SuggestedAnimeContext } from "../utils/context";
import { Link } from "react-router-dom";

export default function RecentlyCompleted() {
  const { suggested } = useContext(SuggestedAnimeContext);

  return (
    <div className="flex flex-col h-full md:col-span-2 xl:col-span-1">
      <h1 className="text-xl mb-4">You may also like</h1>
      {suggested.slice(0, 10).map((suggested) => (
        <Link to={`/watch/${suggested.id}`} key={suggested.id}>
          <div className="bg-[#252525] hover:bg-[#141414] flex items-center shadow-md h-20 w-full mb-1">
            <img
              src={suggested.image}
              alt={suggested.title.english}
              className="w-14 h-full object-contain mr-4"
            />
            <p>{suggested.title.english}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
