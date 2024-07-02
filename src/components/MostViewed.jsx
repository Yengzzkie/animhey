import { useContext } from "react";
import { PopularAnimeContext } from "../utils/context";
import { Link } from "react-router-dom";

export default function MostViewed() {
  const { popular } = useContext(PopularAnimeContext);

  return (
    <div className="flex flex-col h-full col-span-1 lg:pr-4">
      <h1 className="text-xl mb-4">Most Viewed</h1>
      {popular.slice(0, 10).map((popular, index) => (
        <Link to={`/watch/${popular.id}/${popular.title.romaji}`} key={popular.id}>
          <div className="bg-[#252525] hover:bg-[#141414] flex items-center shadow-md h-20 w-full mb-1 cursor-pointer">
            <img
              src={popular.image}
              alt={popular.title.english}
              className="w-14 h-full object-contain mr-4"
            />
            <p className="flex-grow">{popular.title.english}</p>
            <span className="bg-red-600 font-bold ml-auto mr-4 py-2 px-4 rounded-md">{index + 1}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
